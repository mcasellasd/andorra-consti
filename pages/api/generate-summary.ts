import type { NextApiRequest, NextApiResponse } from 'next';
import { GUIA_CATALA_JURIDIC } from '../../lib/prompts/guia-catala-juridic';
import { ASPECTES_JURISPRUDENCIA_ANDORRANA } from '../../lib/prompts/aspectes-jurisprudencia-andorra';
import { checkAIActCompliance, checkPlainLanguage, getAIActCompliancePrompt } from '../../lib/rag/quality-assessment';
import { getJurisprudenciaForArticle } from '../../data/jurisprudencia-andorra';
import { getArticleIdByNumber, detectCodiFromArticle } from '../../lib/article-helpers';

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
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateSummaryResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { articleNumber, articleTitle, articleContent } = req.body as GenerateSummaryRequest;

  if (!articleNumber || !articleTitle || !articleContent) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (!openaiApiKey) {
    console.error('OPENAI_API_KEY no està configurada');
    return res.status(500).json({
      error: 'OpenAI API key no configurada. Per a producció a Vercel, configura la variable d\'entorn OPENAI_API_KEY a Project Settings > Environment Variables.'
    });
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

    const prompt = `Context normatiu:
Article: ${articleNumber}
Títol: ${articleTitle}
Contingut (fragment fins a 2.000 caràcters):
${articleContent.substring(0, 2000)}${jurisprudenciaContext}

Necessito una interpretació orientativa que segueixi estrictament aquestes indicacions:
1. Escriu un apartat titulat "Resum (${articleNumber} CCA)" amb 3 a 5 frases en català planer que expliquin els punts essencials i la finalitat de l'article. IMPORTANT: NO repeteixis el text literal de la llei. Adapta el contingut utilitzant llenguatge natural i planer, explicant amb les teves pròpies paraules què significa i què regula l'article. El text ha de ser fidel al significat i l'àmbit d'aplicació, però utilitzant un vocabulari i estructures diferents al text jurídic formal. Recorda indicar el llibre, secció o títol si aporta context.
2. Tanca la resposta amb un paràgraf breu sota l'etiqueta "Avís" que indiqui que la informació és orientativa, no constitueix assessorament legal i que ha estat generada amb suport d'IA (Cursor i OpenAI), animant a consultar professionals en cas de dubte.
3. No incloguis cap exemple pràctic en aquesta resposta. Si consideres que en caldria cap, limita't a recordar que es pot sol·licitar un exemple específic.
4. Evita cites literals llargues i no inventis dades, jurisprudència ni reformes inexistents.
5. Mantén un to respectuós, clar i didàctic.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Ets un assistent jurídic digital que ajuda a interpretar els llibres del Codi Civil d'Andorra de forma comprensible. Treballes per un equip d'estudiants de dret; la finalitat és acadèmica i divulgativa. Mantén un to respectuós, clar i didàctic.

Objectiu principal:
1. Generar resums entenedors dels articles explicant el contingut essencial amb llenguatge clar i estructurat, però sense repetir el text literal de la norma. L'objectiu és adaptar al llenguatge planer utilitzant paraules i estructures diferents al text jurídic formal, mantenint la fidelitat al significat però transformant la forma.
2. Proposar exemples pràctics que mostrin com s'aplica cada article (exemples realistes, amb protagonistes, fets concrets i resultat jurídic).

Abans de respondre:
- Revisa els fragments normatius proporcionats (si n'hi ha) per entendre el significat i l'àmbit d'aplicació. NO has de repetir el text literal, sinó explicar-lo amb llenguatge planer.
- Si hi ha jurisprudència rellevant proporcionada, utilitza-la per enriquir la interpretació, però NO inventis jurisprudència que no hagi estat proporcionada.
- Si no tens prou context, demana'l explícitament.
- No inventis jurisprudència, dates ni reformes inexistents.

Quan responguis:
- Cita el número exacte de l'article (ex. "Article 1 CCA") i, si és rellevant, el llibre, títol o secció.
- Proporciona primer un resum breu (3-5 frases) en català planer quan es demani un resum. CRÍTIC: Utilitza les teves pròpies paraules, NO repeteixis frases del text legal. Transforma el llenguatge jurídic formal en explicacions naturals i comprensibles.
- A continuació, genera un exemple pràctic numerat quan es demani un exemple o no s'especifiqui el contrari.
- Recorda sempre que això és orientatiu i no constitueix assessorament legal; recomana consultar professionals quan calgui.
- Utilitza llenguatge propi del dret civil andorrà, però amb explicacions accessibles per a un públic general.
- Sigues transparent sobre el teu funcionament: indica que ets una IA entrenada amb Cursor i serveis d'OpenAI.
- Si la petició només demana una part concreta (només resum o només exemple), centra't exclusivament en aquella part sense contradir la resta de requisits.

Si detectes contradiccions, buits legals o opcions interpretatives, exposa-les ordenadament i explica quins factors podrien decantar cada interpretació.

${getAIActCompliancePrompt()}

${GUIA_CATALA_JURIDIC}

${ASPECTES_JURISPRUDENCIA_ANDORRANA}`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 350,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Error de l'API d'OpenAI (${response.status})`;
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.error?.message) {
          errorMessage = errorData.error.message;
        }
      } catch {
        errorMessage = errorText || errorMessage;
      }
      console.error('OpenAI API error:', response.status, errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    const summary = data.choices[0].message.content.trim();

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
    });
  } catch (error: any) {
    console.error('Error generating summary:', error);
    return res.status(500).json({ error: error.message || 'Error generating summary' });
  }
}

