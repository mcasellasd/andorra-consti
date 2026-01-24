/**
 * API endpoint per generar interpretació assistida per IA
 * Segons el briefing tècnic de dretplaner.ad
 * 
 * Utilitza Claude API (o OpenAI) per generar resums, exemples i conceptes clau
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { GUIA_CATALA_JURIDIC } from '../../lib/prompts/guia-catala-juridic';
import { ASPECTES_JURISPRUDENCIA_ANDORRANA } from '../../lib/prompts/aspectes-jurisprudencia-andorra';
import { InterpretacioIA } from '../../data/codis/types';
import { getJurisprudenciaForArticle } from '../../data/jurisprudencia-andorra';
import { getArticleById } from '../../lib/article-helpers';
import { getDoctrinaByArticleId } from '../../data/doctrina';

interface InterpretacioRequest {
  article_id: string;
  text_oficial: string;
  numeracio: string;
  idioma: 'ca' | 'es' | 'fr';
}

// TODO: Canviar a Claude API segons el briefing
// Per ara utilitzem OpenAI per compatibilitat amb el codi existent
const CHAT_MODEL = process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<InterpretacioIA | { error: string }>
) {
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Mètode no permès received: ${req.method}` });
  }

  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OPENAI_API_KEY no configurada' });
  }

  try {
    const { article_id, text_oficial, numeracio, idioma }: InterpretacioRequest = req.body;

    if (!article_id || !text_oficial || !numeracio || !idioma) {
      return res.status(400).json({ error: 'Paràmetres incomplets' });
    }

    // Obtenir l'article complet per obtenir metadades
    const article = getArticleById(article_id);

    // Obtenir jurisprudència relacionada
    const jurisprudencia = getJurisprudenciaForArticle(article_id);

    // Obtenir doctrina relacionada
    const doctrinaRelacionada = getDoctrinaByArticleId(article_id);

    // Construir context normatiu
    let contextNormatiu = '';
    if (article) {
      if (article.codi) {
        const nomCodi = article.codi === 'constitucio'
          ? 'Constitució del Principat d\'Andorra'
          : article.codi;

        contextNormatiu += `\n\nContext normatiu:\n`;
        contextNormatiu += `- Codi: ${nomCodi}\n`;

        if (article.llibre) {
          contextNormatiu += `- Llibre: ${article.llibre}\n`;
        }

        if (article.titol) {
          const titolTraduit = article.idiomes?.titol?.[idioma] || article.titol;
          contextNormatiu += `- Títol: ${titolTraduit}\n`;
        }

        if (article.capitol) {
          const capitolTraduit = article.idiomes?.capitol?.[idioma] || article.capitol;
          contextNormatiu += `- Capítol: ${capitolTraduit}\n`;
        }

        if (article.vigencia) {
          contextNormatiu += `- Data de vigència: ${article.vigencia}\n`;
        }

        if (article.modificacions && article.modificacions.length > 0) {
          contextNormatiu += `- Modificacions: ${article.modificacions
            .map(m => `${m.llei} (${m.data})`)
            .join(', ')}\n`;
        }

        if (article.tags && article.tags.length > 0) {
          const tagsTraduits = article.idiomes?.tags?.[idioma] || article.tags;
          contextNormatiu += `- Àmbits: ${tagsTraduits.join(', ')}\n`;
        }
      }
    }

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

    // Construir context de doctrina si n'hi ha (Manual retrieval)
    let doctrinaContext = '';
    if (doctrinaRelacionada.length > 0) {
      doctrinaContext = `\n\nDoctrina i interpretació acadèmica (Manual):\n${doctrinaRelacionada
        .slice(0, 2)
        .map(
          (doc) =>
            `- ${doc.title} (${doc.author}, ${doc.date}): ${doc.summary}`
        )
        .join('\n')}\n`;
    }

    // ============================================================================
    // RAG FLOW: Recuperació de context amb XLM-RoBERTa
    // ============================================================================

    // ============================================================================
    // RAG FLOW: Recuperació de context amb XLM-RoBERTa
    // ============================================================================

    let ragContext = '';

    // Executem RAG amb un timeout segur per evitar que la API falli (500) o trigui massa
    try {
      const runRag = async () => {
        // 1. Imports dinàmics dins del try per evitar errors de càrrega
        const { generateEmbedding } = await import('../../lib/embeddings/index');
        const { retrieveTopMatches } = await import('../../lib/rag/corpus');

        console.log(`🧠 Generant embedding RAG per a article ${article_id} amb XLM-RoBERTa...`);
        const embedding = await generateEmbedding(`${article?.titol || ''} ${text_oficial}`, 'xlm-roberta');

        // 2. Recuperar context rellevant
        return retrieveTopMatches(embedding, 5); // Top 5 resultats
      };

      // Timeout de 4 segons (Vercel Serverless té límit, millor fallar ràpid i tornar resposta)
      const timeoutPromise = new Promise<any[]>((_, reject) =>
        setTimeout(() => reject(new Error('RAG Timeout (limite excedit)')), 4000)
      );

      // Cursa entre el RAG i el Timeout
      const matches = await Promise.race([runRag(), timeoutPromise]);

      if (matches && matches.length > 0) {
        ragContext = `\n\nCONTEXT ADDICIONAL RECUPERAT (RAG - XLM-RoBERTa):\nUtilitza aquest context per enriquir l'explicació, però prioritza el text oficial de l'article.\n`;

        matches.forEach((m: any) => {
          // Evitem duplicar l'article actual si surt als resultats
          if (m.entry.id !== article_id) {
            ragContext += `- [${m.entry.category}] ${m.entry.topic}: ${m.entry.content.substring(0, 300)}...\n`;
            if (m.entry.implications) {
              ragContext += `  Implicacions: ${m.entry.implications.substring(0, 200)}...\n`;
            }
          }
        });
        console.log(`✅ RAG: ${matches.length} contextos recuperats`);
      }
    } catch (ragError) {
      console.error('⚠️ RAG Omesa (Error o Timeout):', ragError instanceof Error ? ragError.message : ragError);
      // Continuem sense context RAG si falla el timeout o el model
    }

    // ============================================================================


    // Construir el prompt segons l'idioma
    const prompts = {
      ca: `Ets un expert en dret andorrà. Explica aquest article de manera accessible seguint les normes del català jurídic:

Article ${numeracio}:
"${text_oficial}"${contextNormatiu}${jurisprudenciaContext}${doctrinaContext}${ragContext}

IMPORTANT: NO repeteixis el text literal de l'article. Adapta el contingut utilitzant llenguatge natural i planer, explicant amb les teves pròpies paraules què significa i què regula l'article. El text ha de ser fidel al significat però utilitzant un vocabulari i estructures diferents al text jurídic formal.

Proporciona:
1. Un resum en 3-4 frases clares i senzilles (utilitzant llenguatge planer diferent al text legal)
2. 2-3 exemples pràctics quotidians que il·lustrin l'aplicació de l'article
3. Els conceptes clau que cal entendre
4. Context i aplicació pràctica de l'article, incloent:
   - Per a què serveix aquesta norma (finalitat i objectiu)
   - A qui va dirigida (destinataris: ciutadans, administracions, empreses, etc.)
   - Com s'aplica (procediment, requisits, efectes pràctics)
   - Com ho veu la doctrina i la jurisprudència (si hi ha informació disponible)

Respon en format JSON amb aquesta estructura:
{
  "resum": "Resum en 3-4 frases...",
  "exemples": [
    {"cas": "Exemple pràctic 1...", "idioma": "ca"},
    {"cas": "Exemple pràctic 2...", "idioma": "ca"}
  ],
  "conceptes_clau": ["concepte1", "concepte2"],
  "diferencies": "Context i aplicació pràctica...",
  "finalitat": "Per a què serveix aquesta norma...",
  "destinataris": "A qui va dirigida (ciutadans, administracions, empreses, etc.)...",
  "aplicacio": "Com s'aplica (procediment, requisits, efectes pràctics)...",
  "doctrina_jurisprudencia": "Com ho veu la doctrina i la jurisprudència (si hi ha informació disponible)..."
}

${GUIA_CATALA_JURIDIC}`,
      es: `Eres un experto en derecho andorrano. Explica este artículo de manera accesible:

Artículo ${numeracio}:
"${text_oficial}"${contextNormatiu}${jurisprudenciaContext}${doctrinaContext}${ragContext}

IMPORTANTE: NO repitas el texto literal del artículo. Adapta el contenido utilizando lenguaje natural y llano, explicando con tus propias palabras qué significa y qué regula el artículo. El texto debe ser fiel al significado pero utilizando un vocabulario y estructuras diferentes al texto jurídico formal.

Proporciona:
1. Un resumen en 3-4 frases claras y sencillas (utilizando lenguaje llano diferente al texto legal)
2. 2-3 ejemplos prácticos cotidianos que ilustren la aplicación del artículo
3. Los conceptos clave que hay que entender
4. Contexto y aplicación práctica del artículo, incluyendo:
   - Para qué sirve esta norma (finalidad y objetivo)
   - A quién va dirigida (destinatarios: ciudadanos, administraciones, empresas, etc.)
   - Cómo se aplica (procedimiento, requisitos, efectos prácticos)
   - Cómo lo ve la doctrina y la jurisprudencia (si hay información disponible)

Responde en formato JSON con esta estructura:
{
  "resum": "Resumen en 3-4 frases...",
  "exemples": [
    {"cas": "Ejemplo práctico 1...", "idioma": "es"},
    {"cas": "Ejemplo práctico 2...", "idioma": "es"}
  ],
  "conceptes_clau": ["concepto1", "concepto2"],
  "diferencies": "Contexto y aplicación práctica...",
  "finalitat": "Para qué sirve esta norma...",
  "destinataris": "A quién va dirigida (ciudadanos, administraciones, empresas, etc.)...",
  "aplicacio": "Cómo se aplica (procedimiento, requisitos, efectos prácticos)...",
  "doctrina_jurisprudencia": "Cómo lo ve la doctrina y la jurisprudencia (si hay información disponible)..."
}`,
      fr: `Tu es un expert en droit andorran. Explique cet article de manière accessible:

Article ${numeracio}:
"${text_oficial}"${contextNormatiu}${jurisprudenciaContext}${doctrinaContext}${ragContext}

IMPORTANT: NE répète PAS le texte littéral de l'article. Adapte le contenu en utilisant un langage naturel et simple, expliquant avec tes propres mots ce que signifie et ce que régit l'article. Le texte doit être fidèle au sens mais en utilisant un vocabulaire et des structures différents du texte juridique formel.

Fournis:
1. Un résumé en 3-4 phrases claires et simples (en utilisant un langage simple différent du texte légal)
2. 2-3 exemples pratiques quotidiens qui illustrent l'application de l'article
3. Les concepts clés à comprendre
4. Contexte et application pratique de l'article, incluant:
   - À quoi sert cette norme (finalité et objectif)
   - À qui elle s'adresse (destinataires: citoyens, administrations, entreprises, etc.)
   - Comment elle s'applique (procédure, exigences, effets pratiques)
   - Comment la doctrine et la jurisprudence la voient (si des informations sont disponibles)

Réponds en format JSON avec cette structure:
{
  "resum": "Résumé en 3-4 phrases...",
  "exemples": [
    {"cas": "Exemple pratique 1...", "idioma": "fr"},
    {"cas": "Exemple pratique 2...", "idioma": "fr"}
  ],
  "conceptes_clau": ["concept1", "concept2"],
  "diferencies": "Contexte et application pratique...",
  "finalitat": "À quoi sert cette norme...",
  "destinataris": "À qui elle s'adresse (citoyens, administrations, entreprises, etc.)...",
  "aplicacio": "Comment elle s'applique (procédure, exigences, effets pratiques)...",
  "doctrina_jurisprudencia": "Comment la doctrine et la jurisprudence la voient (si des informations sont disponibles)..."
}`,
    };

    const prompt = prompts[idioma];

    // Cridar a OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        messages: [
          {
            role: 'system',
            content:
              idioma === 'ca'
                ? `Ets un assistent expert en dret andorrà. Respon sempre en format JSON vàlid.

REGLA FONAMENTAL: Quan generis resums o interpretacions, NO repeteixis el text literal de la llei. Has d'adaptar el contingut utilitzant llenguatge natural i planer, explicant amb les teves pròpies paraules què significa i què regula cada article. El text ha de ser fidel al significat però utilitzant un vocabulari i estructures diferents al text jurídic formal.

MILLORES D'APRENENTATGE:
- Adapta el contingut utilitzant llenguatge natural i planer, explicant amb les teves pròpies paraules
- El text ha de ser fidel al significat però utilitzant un vocabulari i estructures diferents al text jurídic formal
- Utilitza terminologia jurídica precisa però en un llenguatge accessible

${GUIA_CATALA_JURIDIC}

${ASPECTES_JURISPRUDENCIA_ANDORRANA}`
                : idioma === 'es'
                  ? 'Eres un asistente experto en derecho andorrano. Responde siempre en formato JSON válido.'
                  : "Tu es un assistant expert en droit andorran. Réponds toujours en format JSON valide.",
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2500, // Augmentat per incloure els nous camps de context
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Error OpenAI API:', errorData);
      return res.status(500).json({ error: 'Error al generar la interpretació' });
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      return res.status(500).json({ error: 'Resposta buida de la API' });
    }

    // Parsejar la resposta JSON
    let parsedContent;
    try {
      // Intentar extreure JSON si està envoltat de markdown
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
      const jsonString = jsonMatch ? jsonMatch[1] : content;
      parsedContent = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Error parsejant JSON:', parseError);
      return res.status(500).json({ error: 'Error al parsejar la resposta de la IA' });
    }

    // Construir la resposta segons l'esquema InterpretacioIA
    const interpretacio: InterpretacioIA = {
      article_id,
      resum: {
        ca: idioma === 'ca' ? parsedContent.resum : '',
        es: idioma === 'es' ? parsedContent.resum : '',
        fr: idioma === 'fr' ? parsedContent.resum : '',
      },
      exemples: parsedContent.exemples || [],
      conceptes_clau: parsedContent.conceptes_clau || [],
      articles_relacionats: [], // TODO: Implementar cerca d'articles relacionats
      jurisprudencia_vinculada: [],
      generat_data: new Date().toISOString().split('T')[0],
      revisat: false,
      // Nous camps de context normatiu
      finalitat: parsedContent.finalitat || '',
      destinataris: parsedContent.destinataris || '',
      aplicacio: parsedContent.aplicacio || '',
      doctrina_jurisprudencia: parsedContent.doctrina_jurisprudencia || '',
    };

    // TODO: Guardar a cache/base de dades per evitar regenerar

    return res.status(200).json(interpretacio);
  } catch (error) {
    console.error('Error en interpretacio-ia:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Error desconegut',
    });
  }
}

