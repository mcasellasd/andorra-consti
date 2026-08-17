import type { NextApiRequest, NextApiResponse } from 'next';
import { GUIA_CATALA_JURIDIC } from '../../lib/prompts/guia-catala-juridic';
import { ASPECTES_JURISPRUDENCIA_ANDORRANA } from '../../lib/prompts/aspectes-jurisprudencia-andorra';
import { checkAIActCompliance, checkPlainLanguage, getAIActCompliancePrompt } from '../../lib/rag/quality-assessment';
import { getJurisprudenciaForArticle } from '../../data/jurisprudencia-andorra';
import { getArticleIdByNumber, detectCodiFromArticle } from '../../lib/article-helpers';
import { getContextConstitucional, blocContextPrompt } from '../../lib/prompts/context-constitucional';
import { REGLES_DRET_PLANER } from '../../lib/prompts/dret-planer';
import { solapamentLiteral, instruccioReescriptura } from '../../lib/rag/solapament-literal';
import { generateText } from '../../lib/llm';
import { articleGenerationSchema } from '@/lib/api/schemas';
import { enforceRateLimit } from '@/lib/security/rate-limit';

interface GenerateSummaryRequest {
  articleNumber: string;
  articleTitle: string;
  articleContent: string;
}

interface GenerateSummaryResponse {
  summary?: string;
  aiActCompliance?: {
    score: number;
    compliant: boolean;
    warnings: string[];
  };
  plainLanguage?: {
    score: number;
    compliant: boolean;
    issues: string[];
  };
  /** Coincidència literal amb el text de la norma. Per sobre del llindar, s'ha refet. */
  solapamentLiteral?: {
    percentatge: number;
    excessiu: boolean;
    fragments: string[];
  };
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateSummaryResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!(await enforceRateLimit(req, res, 'ai', 2))) return res.status(429).json({ error: 'Rate limit exceeded' });
  const parsed = articleGenerationSchema.safeParse(req.body as GenerateSummaryRequest);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0]?.message });
  const { articleNumber, articleTitle, articleContent } = parsed.data;

  try {
    // Obtenir article_id per buscar jurisprudència
    const codi = detectCodiFromArticle(articleNumber, articleTitle) || 'constitucio';
    const articleId = getArticleIdByNumber(articleNumber, codi);
    const jurisprudencia = articleId ? getJurisprudenciaForArticle(articleId) : [];

    // Construir context de jurisprudència si n'hi ha
    let jurisprudenciaContext = '';
    if (jurisprudencia.length > 0) {
      jurisprudenciaContext = `\n\nJurisprudència rellevant:\n${jurisprudencia
        .slice(0, 3) // Limitar a les 3 més rellevants
        .map(
          (sent) =>
            `- ${sent.tribunal} (${sent.data}): ${sent.resum}${sent.articles_afectats.length > 0 ? ` (Articles: ${sent.articles_afectats.join(', ')})` : ''
            }`
        )
        .join('\n')}\n`;
    }

    // Context estructural: títol, capítol i força normativa reals de l'article.
    // Sense això el model atribueix caràcter de dret fonamental a principis rectors.
    const ctxConst = codi === 'constitucio' ? getContextConstitucional(articleNumber) : null;
    const blocContext = ctxConst ? `${blocContextPrompt(ctxConst)}\n\n` : '';

    const prompt = `${blocContext}Article: ${articleNumber}
Títol: ${articleTitle}
Contingut (fragment fins a 2.000 caràcters):
${articleContent.substring(0, 2000)}${jurisprudenciaContext}

Necessito una interpretació orientativa que segueixi estrictament aquestes indicacions:
1. Escriu un apartat titulat "Resum (${ctxConst ? `article ${ctxConst.article} de la Constitució` : articleNumber})" amb 4 a 6 frases seguint les regles de dret planer i els tres moviments (què obliga i a qui / per a què serveix / què vol dir a la pràctica). Ha de ser fidel al significat, però NO pot conservar l'estructura ni el vocabulari de la frase legal: si el resultat es pot obtenir esborrant paraules de l'article original, no serveix.
2. Tanca la resposta amb un paràgraf breu sota l'etiqueta "Avís" que indiqui que la informació és orientativa, no constitueix assessorament legal i que ha estat generada amb suport d'intel·ligència artificial (Llama-3.3-70B de Groq), animant a consultar professionals en cas de dubte.
3. No incloguis cap exemple pràctic en aquesta resposta. Si consideres que en caldria cap, limita't a recordar que es pot sol·licitar un exemple específic.
4. Evita cites literals llargues i no inventis dades, jurisprudència ni reformes inexistents.
5. Mantén un to respectuós, clar i didàctic.`;

    const normaNom = codi === 'constitucio'
      ? "la Constitució del Principat d'Andorra"
      : "els llibres del Codi Civil d'Andorra";

    const systemMessage = `Ets un assistent jurídic digital que ajuda a interpretar ${normaNom} de forma comprensible. Treballes per un equip d'estudiants de dret; la finalitat és acadèmica i divulgativa. Mantén un to respectuós, clar i didàctic.

REGLA INNEGOCIABLE SOBRE LA FORÇA NORMATIVA:
Si el context indica que l'article és un principi rector, un deure o una norma orgànica, NO el pots
descriure com un «dret fonamental» ni suggerir que es pot reclamar davant dels tribunals com si ho fos.
Aquesta distinció és el punt on més fàcilment s'indueix la persona a error, i és més important que la
fluïdesa de l'explicació. Si dubtes, atén-te literalment al bloc de context normatiu.

Objectiu principal:
1. Generar resums entenedors dels articles explicant el contingut essencial amb llenguatge clar i estructurat, però sense repetir el text literal de la norma. L'objectiu és adaptar al llenguatge planer utilitzant paraules i estructures diferents al text jurídic formal, mantenint la fidelitat al significat però transformant la forma.

Abans de respondre:
- Revisa els fragments normatius proporcionats (si n'hi ha) per entendre el significat i l'àmbit d'aplicació. NO has de repetir el text literal, sinó explicar-lo amb llenguatge planer.
- Si hi ha jurisprudència rellevant proporcionada, utilitza-la per enriquir la interpretació, però NO inventis jurisprudència que no hagi estat proporcionada.
- No inventis jurisprudència, dates ni reformes inexistents.

Quan responguis:
- Cita el número exacte de l'article i, si és rellevant, el títol, capítol o llibre. Per a la Constitució digues "article N de la Constitució"; no facis servir mai l'abreviatura "CCA", que designa el Codi Civil.
- Proporciona primer un resum descriptiu (4-6 frases, o més si cal) en català planer quan es demani un resum. CRÍTIC: Utilitza les teves pròpies paraules, NO repeteixis frases del text legal. Transforma el llenguatge jurídic formal en explicacions naturals i comprensibles.
- Recorda sempre que això és orientatiu i no constitueix assessorament legal; recomana consultar professionals quan calgui.
- Utilitza llenguatge propi del dret civil andorrà, però amb explicacions accessibles per a un públic general.

${REGLES_DRET_PLANER}

${getAIActCompliancePrompt()}

${GUIA_CATALA_JURIDIC}

${ASPECTES_JURISPRUDENCIA_ANDORRANA}`;

    const messages = [
      { role: 'system', content: systemMessage },
      { role: 'user', content: prompt },
    ];

    let summary = await generateText(messages, {
      maxTokens: 450,
      temperature: 0.7,
    });

    // Porta determinista: si l'explicació és un calc del text legal, es refà una
    // vegada retornant al model els fragments literals detectats. Sense això, la
    // instrucció «no copiïs» es queda en intenció.
    let solapament = solapamentLiteral(articleContent, summary);
    if (solapament.excessiu) {
      summary = await generateText(
        [
          ...messages,
          { role: 'assistant', content: summary },
          { role: 'user', content: instruccioReescriptura(solapament) },
        ],
        { maxTokens: 450, temperature: 0.85 }
      );
      solapament = solapamentLiteral(articleContent, summary);
    }

    // Validar compliment amb AI Act
    const aiActValidation = checkAIActCompliance(summary);

    // Validar llenguatge planer (guardrail)
    const plainLanguageValidation = await checkPlainLanguage(summary);

    return res.status(200).json({
      summary,
      aiActCompliance: {
        score: aiActValidation.score,
        compliant: aiActValidation.aiActCompliant,
        warnings: aiActValidation.warnings,
      },
      plainLanguage: {
        score: plainLanguageValidation.score,
        compliant: plainLanguageValidation.compliant,
        issues: plainLanguageValidation.issues,
      },
      solapamentLiteral: {
        percentatge: solapament.percentatge,
        excessiu: solapament.excessiu,
        fragments: solapament.fragments,
      },
    });
  } catch (error: any) {
    console.error('Error generating summary:', error);
    return res.status(500).json({ error: error.message || 'Error generating summary' });
  }
}
