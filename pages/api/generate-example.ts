import type { NextApiRequest, NextApiResponse } from 'next';
import { GUIA_CATALA_JURIDIC } from '../../lib/prompts/guia-catala-juridic';
import { ASPECTES_JURISPRUDENCIA_ANDORRANA } from '../../lib/prompts/aspectes-jurisprudencia-andorra';
import { checkAIActCompliance, checkPlainLanguage, getAIActCompliancePrompt } from '../../lib/rag/quality-assessment';
import { getJurisprudenciaForArticle } from '../../data/jurisprudencia-andorra';
import { getArticleIdByNumber, detectCodiFromArticle } from '../../lib/article-helpers';
import { getContextConstitucional, blocContextPrompt } from '../../lib/prompts/context-constitucional';
import { generateText } from '../../lib/llm';

interface GenerateExampleRequest {
  articleNumber: string;
  articleTitle: string;
  articleContent: string;
}

interface GenerateExampleResponse {
  example?: string;
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
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateExampleResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { articleNumber, articleTitle, articleContent } = req.body as GenerateExampleRequest;

  if (!articleNumber || !articleTitle || !articleContent) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

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

    const ctxConst = codi === 'constitucio' ? getContextConstitucional(articleNumber) : null;
    const blocContext = ctxConst ? `${blocContextPrompt(ctxConst)}\n\n` : '';

    // Per als principis rectors, el segon exemple és el que evita el malentès més
    // freqüent: creure que l'article es pot invocar sol davant d'un tribunal.
    const exempleContrast = ctxConst && !ctxConst.empara
      ? `\n2. Un segon apartat titulat "Què NO permet aquest article" (60-100 paraules) amb un cas realista d'algú que intenta fer valer l'article directament davant d'un tribunal i per què no prospera, indicant quina seria la via correcta (la llei sectorial que el desenvolupa, la via administrativa, etc.). Aquest apartat és obligatori.`
      : '';

    const prompt = `${blocContext}Article: ${articleNumber}
Títol: ${articleTitle}
Contingut (fragment fins a 2.000 caràcters):
${articleContent.substring(0, 2000)}${jurisprudenciaContext}

Per aquest article necessito exclusivament:
1. Un apartat titulat "Exemple 1 (article ${ctxConst ? ctxConst.article + ' de la Constitució' : articleNumber})" amb un cas pràctic realista (150-220 paraules) que il·lustri com s'aplica la norma. Inclou protagonistes, situació concreta, aplicació jurídica i resultat. Evita exemples genèrics del tipus "el Govern aprova polítiques": ha de ser una situació concreta d'una persona o entitat identificable.${exempleContrast}
2. Un paràgraf final sota l'etiqueta "Avís" recordant que és una aproximació orientativa, que no substitueix l'assessorament legal i que la resposta s'ha generat amb suport d'intel·ligència artificial (Llama-3.3-70B de Groq).
3. No generis altres exemples ni resums addicionals a menys que siguin imprescindibles per entendre el cas.
4. Mantén llenguatge clar i accessible però jurídicament rigorós.`;

    const normaNom = codi === 'constitucio'
      ? "la Constitució del Principat d'Andorra"
      : "els llibres del Codi Civil d'Andorra";

    const systemMessage = `Ets un assistent jurídic digital que ajuda a interpretar ${normaNom} de forma comprensible. Treballes per un equip d'estudiants de dret; la finalitat és acadèmica i divulgativa. Mantén un to respectuós, clar i didàctic.

REGLA INNEGOCIABLE SOBRE LA FORÇA NORMATIVA:
Si el context indica que l'article és un principi rector, un deure o una norma orgànica, els exemples NO
poden donar a entendre que una persona pot reclamar-lo davant dels tribunals com si fos un dret fonamental.

Objectiu principal:
1. Proposar exemples pràctics que mostrin com s'aplica cada article (exemples realistes, amb protagonistes, fets concrets i resultat jurídic).

Abans de respondre:
- Revisa els fragments normatius proporcionats (si n'hi ha). Prioritza sempre la literalitat de la llei andorrana vigent.
- Si hi ha jurisprudència rellevant proporcionada, utilitza-la per crear exemples realistes basats en casos reals, però NO inventis jurisprudència que no hagi estat proporcionada.
- No inventis jurisprudència, dates ni reformes inexistents.

Quan responguis:
- Cita el número exacte de l'article i, si és rellevant, el títol, capítol o llibre. Per a la Constitució digues "article N de la Constitució"; no facis servir mai l'abreviatura "CCA", que designa el Codi Civil.
- Genera un exemple pràctic numerat quan es demani un exemple.
- Recorda sempre que això és orientatiu i no constitueix assessorament legal; recomana consultar professionals quan calgui.
- Utilitza llenguatge propi del dret civil andorrà, però amb explicacions accessibles per a un públic general.

${getAIActCompliancePrompt()}

${GUIA_CATALA_JURIDIC}

${ASPECTES_JURISPRUDENCIA_ANDORRANA}`;

    const messages = [
      { role: 'system', content: systemMessage },
      { role: 'user', content: prompt },
    ];

    const example = await generateText(messages, {
      maxTokens: 450,
      temperature: 0.8,
    });

    // Validar compliment amb AI Act
    const aiActValidation = checkAIActCompliance(example);

    // Validar llenguatge planer (guardrail)
    const plainLanguageValidation = await checkPlainLanguage(example);

    return res.status(200).json({
      example,
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
    });
  } catch (error: any) {
    console.error('Error generating example:', error);
    return res.status(500).json({ error: error.message || 'Error generating example' });
  }
}

