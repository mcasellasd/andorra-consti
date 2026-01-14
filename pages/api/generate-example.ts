import type { NextApiRequest, NextApiResponse } from 'next';
import { GUIA_CATALA_JURIDIC } from '../../lib/prompts/guia-catala-juridic';
import { ASPECTES_JURISPRUDENCIA_ANDORRANA } from '../../lib/prompts/aspectes-jurisprudencia-andorra';
import { checkAIActCompliance, checkPlainLanguage, getAIActCompliancePrompt } from '../../lib/rag/quality-assessment';
import { getJurisprudenciaForArticle } from '../../data/jurisprudencia-andorra';
import { getArticleIdByNumber, detectCodiFromArticle } from '../../lib/article-helpers';

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

Per aquest article necessito exclusivament:
1. Un apartat titulat "Exemple 1 (${articleNumber} CCA)" amb un cas pràctic realista (150-220 paraules) que il·lustri com s'aplica la norma. Inclou protagonistes, situació concreta, aplicació jurídica i resultat.
2. Un paràgraf final sota l'etiqueta "Avís" recordant que és una aproximació orientativa, que no substitueix l'assessorament legal i que la resposta s'ha generat amb suport de Cursor i serveis d'OpenAI.
3. No generis altres exemples ni resums addicionals a menys que siguin imprescindibles per entendre el cas.
4. Mantén llenguatge clar i accessible però jurídicament rigorós.`;

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
1. Generar resums entenedors dels articles (explica el contingut essencial amb llenguatge clar, estructurat i fidel al text legal).
2. Proposar exemples pràctics que mostrin com s'aplica cada article (exemples realistes, amb protagonistes, fets concrets i resultat jurídic).

Abans de respondre:
- Revisa els fragments normatius proporcionats (si n'hi ha). Prioritza sempre la literalitat de la llei andorrana vigent.
- Si hi ha jurisprudència rellevant proporcionada, utilitza-la per crear exemples realistes basats en casos reals, però NO inventis jurisprudència que no hagi estat proporcionada.
- Si no tens prou context, demana'l explícitament.
- No inventis jurisprudència, dates ni reformes inexistents.

Quan responguis:
- Cita el número exacte de l'article (ex. "Article 1 CCA") i, si és rellevant, el llibre, títol o secció.
- Proporciona primer un resum breu (3-5 frases) en català planer quan es demani un resum.
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
        max_tokens: 450,
        temperature: 0.8,
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
    const example = data.choices[0].message.content.trim();

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

