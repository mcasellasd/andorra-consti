/**
 * API endpoint per generar interpretació assistida per IA
 * Segons el briefing tècnic de dretplaner.ad
 * 
 * Utilitza Salamandra (model local/open source per català) per generar resums, exemples i doctrina
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { GUIA_CATALA_JURIDIC } from '../../lib/prompts/guia-catala-juridic';
import { ASPECTES_JURISPRUDENCIA_ANDORRANA } from '../../lib/prompts/aspectes-jurisprudencia-andorra';
import { InterpretacioIA, Exemple } from '../../data/codis/types';
import { getJurisprudenciaForArticle } from '../../data/jurisprudencia-andorra';
import { getArticleById } from '../../lib/article-helpers';
import { getDoctrinaByArticleId } from '../../data/doctrina';
import { generateText } from '../../lib/llm';

interface InterpretacioRequest {
  article_id: string;
  text_oficial: string;
  numeracio: string;
  idioma: 'ca' | 'es' | 'fr';
}

// Configurar timeout màxim per Vercel (Pro: 300s, Hobby: 10s -> 60s amb config)
export const maxDuration = 60;

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
        .slice(0, 1) // OPTIMITZACIÓ: Limitar a 1 per reduir tokens i temps de resposta (<60s)
        .map(
          (sent) =>
            `- ${sent.tribunal} (${sent.data}): ${sent.resum}`
        )
        .join('\n')}\n`;
    }

    // Construir context de doctrina si n'hi ha (Manual retrieval)
    let doctrinaContext = '';
    if (doctrinaRelacionada.length > 0) {
      doctrinaContext = `\n\nDoctrina acadèmica:\n${doctrinaRelacionada
        .slice(0, 1) // OPTIMITZACIÓ: Limitar a 1
        .map(
          (doc) =>
            `- ${doc.title}: ${doc.summary}`
        )
        .join('\n')}\n`;
    }

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

      const timeoutPromise = new Promise<any[]>((_, reject) =>
        setTimeout(() => reject(new Error('RAG Timeout (limite excedit)')), 15000) // 15s a local està bé
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

    // Debug: Verificar que l'article s'està passant correctament
    console.log(`📋 Article a interpretar: ${numeracio}`);
    console.log(`📝 Text oficial (primeres 200 chars): ${text_oficial.substring(0, 200)}...`);

    // Construir el prompt segons l'idioma (amb els prompts millorats)
    const prompts = {
      ca: `Ets un expert en dret andorrà. L'article següent és de la **Constitució del Principat d'Andorra**. 

⚠️ TASCA: Interpreta ÚNICAMENT aquest article específic. No parlis d'altres articles ni temes no relacionats. ⚠️

PRIORITAT ABSOLUTA: Primer interpreta el **text literal** de l’article en llenguatge planer. La jurisprudència/doctrina és **opcional** i només s'ha d'usar si apareix al context. Encara que NO hi hagi jurisprudència/doctrina, has de generar igualment el resum, els exemples i un comentari jurídic basat en el text de l'article.

**ARTICLE ${numeracio} A INTERPRETAR:**
"${text_oficial}"${contextNormatiu}${jurisprudenciaContext}${doctrinaContext}${ragContext}

⚠️ PROHIBICIONS ABSOLUTES ⚠️
- NO inventis informació comercial, noms de persones, advocats, despatxos o empreses.
- NO afegeixis despedides, salutacions ni informació de contacte.
- NO parlis de temes que NO estiguin explícitament a l'article proporcionat.
- NO escriguis res fora del JSON. Cap text abans ni després.
- NO copiïs ni reutilitzis frases d'exemple/plantilla del prompt (p. ex. "Resum molt concret...", "situació concreta...", "...").
- NO diguis que “no pots” donar exemples o comentari per manca de jurisprudència/doctrina.

REGLA FONAMENTAL: Només pots parlar del que diu aquest article. Si l'article NO menciona residència, immigració, procediments administratius o altres temes, NO en parlis.

IMPORTANT: NO repeteixis el text literal de l'article. Adapta el contingut utilitzant llenguatge natural i planer, explicant amb les teves pròpies paraules què significa i què regula l'article.

⚠️ ESTRUCTURA OBLIGATÒRIA: La teva resposta s'ha d'encabir en TRES llocs específics ⚠️

La interpretació IA es mostra en tres seccions del sidebar:
1. **RESUM**: Resum molt concret en COM A MÀXIM 3 frases curtes i clares (utilitzant llenguatge planer diferent al text legal).
2. **EXEMPLES**: Exactament 2 o 3 exemples pràctics quotidians.
   - ⚠️ REGLA D'OR: L'exemple ha de ser sobre un tema que l'article regula EXPLÍCITAMENT. Si l'article parla de detenció, no parlis d'impostos.
   - Cada exemple ha de començar amb "Exemple aplicat:" seguit de la situació concreta derivada directament del text legal.
3. **DOCTRINA**: Comentari jurídic breu (1-3 frases) basat en el text de l’article:
   - Sempre escriu un comentari jurídic basat en el text literal (abast, límits, obligacions/drets i conseqüències pràctiques).
   - Si el context inclou jurisprudència o doctrina rellevant, integra-la com a suport en 1 frase (sense inventar ni exagerar).
   - No facis disclaimers del tipus "no hi ha jurisprudència" ni "no puc fer anàlisi": has de produir comentari jurídic igualment.

Respon en format JSON amb aquesta estructura EXACTA (cap text abans ni després; comença per { i acaba per }):
{
  "resum": "Escriu un resum ESPECÍFIC d'aquest article (màxim 3 frases, sense placeholders).",
  "exemples": [
    {"cas": "Exemple aplicat: (cas realista i específic d'aquest article, 1–2 frases)", "idioma": "ca"},
    {"cas": "Exemple aplicat: (segon cas realista i específic, 1–2 frases)", "idioma": "ca"}
  ],
  "doctrina_jurisprudencia": "1–3 frases de comentari jurídic basat en l'article; si hi ha jurisprudència/doctrina al context, integra-la breument (sense inventar)."
}

⚠️ CRÍTIC: Respon ÚNICAMENT amb el JSON. El primer caràcter ha de ser { i l'últim }. Cap text abans ni després. ⚠️

${GUIA_CATALA_JURIDIC}
${ASPECTES_JURISPRUDENCIA_ANDORRANA}`,
      es: `Eres un experto en derecho andorrano. El artículo siguiente es de la **Constitución del Principado de Andorra**.

⚠️ TAREA: Interpreta ÚNICAMENTE este artículo específico. No hables de otros artículos ni temas no relacionados. ⚠️

PRIORIDAD ABSOLUTA: Primero interpreta el **texto literal** del artículo en lenguaje llano. La jurisprudencia/doctrina es **opcional** y solo debe usarse si aparece en el contexto. Aunque NO haya jurisprudencia/doctrina, debes generar igualmente el resumen, los ejemplos y un comentario jurídico basado en el texto del artículo.

**ARTÍCULO ${numeracio} A INTERPRETAR:**
"${text_oficial}"${contextNormatiu}${jurisprudenciaContext}${doctrinaContext}${ragContext}

⚠️ REGLA ABSOLUTA SOBRE IDIOMA Y TRADUCCIÓN ⚠️
- El texto literal del artículo está en catalán (idioma oficial) y NUNCA debe traducirse.
- Tu respuesta (resumen, ejemplos, interpretación) DEBE estar COMPLETAMENTE en CASTELLANO.
- Ejemplo correcto: "Según el Art. ${numeracio}: '${text_oficial.substring(0, 50)}...' Esto significa que..."

⚠️ PROHIBICIONES ABSOLUTAS ⚠️
- NO inventes información comercial, nombres de personas, abogados, despachos o empresas.
- NO añadas despedidas, saludos ni información de contacto.
- NO hables de temas que NO estén explícitamente en el artículo proporcionado.
- NO escribas nada fuera del JSON. Nada antes ni después.
- NO copies ni reutilices frases plantilla del prompt (p. ej. "Resumen muy concreto...", "situación concreta...", "...").
- NO digas que “no puedes” dar ejemplos o comentario por falta de jurisprudencia/doctrina.

REGLA FUNDAMENTAL: Solo puedes hablar de lo que dice este artículo. Si el artículo NO menciona residencia, inmigración, procedimientos administrativos u otros temas, NO hables de ellos.

IMPORTANTE: NO repitas el texto literal del artículo. Adapta el contenido utilizando lenguaje natural y llano, explicando con tus propias palabras qué significa y qué regula el artículo.

⚠️ ESTRUCTURA OBLIGATORIA: Tu respuesta debe encajarse en TRES lugares específicos ⚠️

La interpretación IA se muestra en tres secciones del sidebar:
1. **RESUMEN**: Resumen muy concreto de COMO MÁXIMO 3 frases cortas y claras (utilizando lenguaje llano diferente al texto legal).
2. **EJEMPLOS**: Exactamente 2 o 3 ejemplos prácticos cotidianos.
   - ⚠️ REGLA DE ORO: El ejemplo debe ser sobre un tema que el artículo regula EXPLÍCITAMENTE. Si el artículo habla de detención, no hables de impuestos.
   - Cada ejemplo debe empezar con "Ejemplo aplicado:" seguido de la situación concreta derivada directamente del texto legal.
3. **DOCTRINA**: Comentario jurídico breve (1-3 frases) basado en el texto del artículo:
   - Escribe siempre un comentario jurídico basado en el texto literal (alcance, límites, obligaciones/derechos y consecuencias prácticas).
   - Si el contexto incluye jurisprudencia o doctrina relevante, intégrala como apoyo en 1 frase (sin inventar ni exagerar).
   - No hagas disclaimers del tipo "no hay jurisprudencia" ni "no puedo hacer análisis": debes producir comentario jurídico igualmente.

Responde en formato JSON con esta estructura EXACTA (nada antes ni después; empieza por { y acaba por }):
{
  "resum": "Escribe un resumen ESPECÍFICO de este artículo (máx. 3 frases, sin placeholders).",
  "exemples": [
    {"cas": "Ejemplo aplicado: (caso realista y específico de este artículo, 1–2 frases)", "idioma": "es"},
    {"cas": "Ejemplo aplicado: (segundo caso realista y específico, 1–2 frases)", "idioma": "es"}
  ],
  "doctrina_jurisprudencia": "1–3 frases de comentario jurídico basado en el artículo; si hay jurisprudencia/doctrina en el contexto, intégrala brevemente (sin inventar)."
}

⚠️ CRÍTICO: Responde ÚNICAMENTE con el JSON. El primer carácter debe ser { y el último }. Nada antes ni después. ⚠️`,
      fr: `Tu es un expert en droit andorran. L'article suivant est de la **Constitution de la Principauté d'Andorre**.

⚠️ TÂCHE: Interprète UNIQUEMENT cet article spécifique. Ne parle pas d'autres articles ni de sujets non liés. ⚠️

PRIORITÉ ABSOLUE: Interprète d'abord le **texte littéral** de l'article en langage simple. La jurisprudence/doctrine est **optionnelle** et ne doit être utilisée que si elle apparaît dans le contexte. Même s'il n'y a PAS de jurisprudence/doctrine, tu dois quand même générer le résumé, les exemples et un commentaire juridique basé sur le texte de l'article.

**ARTICLE ${numeracio} À INTERPRÉTER:**
"${text_oficial}"${contextNormatiu}${jurisprudenciaContext}${doctrinaContext}${ragContext}

⚠️ RÈGLE ABSOLUE SUR LA LANGUE ET LA TRADUCTION ⚠️
- Le texte littéral de l'article est en catalan (langue officielle) et ne doit JAMAIS être traduit.
- Ta réponse (résumé, exemples, interprétation) DOIT être COMPLÈTEMENT en FRANÇAIS.
- Exemple correct: "Selon l'Art. ${numeracio}: '${text_oficial.substring(0, 50)}...' Cela signifie que..."

⚠️ INTERDICTIONS ABSOLUES ⚠️
- N'invente PAS d'information commerciale, de noms de personnes, d'avocats, de cabinets ou d'entreprises.
- N'ajoute PAS de formules de politesse, de salutations ni d'informations de contact.
- Ne parle PAS de sujets qui NE sont PAS explicitement dans l'article fourni.
- N'écris RIEN en dehors du JSON. Rien avant ni après.
- Ne copie pas / ne réutilise pas les phrases modèle du prompt (p. ex. "Résumé très concret...", "situation concrète...", "...").
- Ne dis pas que tu “ne peux pas” donner des exemples ou un commentaire faute de jurisprudence/doctrine.

RÈGLE FONDAMENTALE: Tu ne peux parler que de ce que dit cet article. Si l'article NE mentionne PAS la résidence, l'immigration, les procédures administratives ou d'autres sujets, N'en parle PAS.

IMPORTANT: NE répète PAS le texte littéral de l'article. Adapte le contenu en utilisant un langage naturel et simple, expliquant avec tes propres mots ce que signifie et ce que régit l'article.

⚠️ STRUCTURE OBLIGATOIRE: Ta réponse doit s'encadrer dans TROIS endroits spécifiques ⚠️

L'interprétation IA s'affiche dans trois sections de la barre latérale:
1. **RÉSUMÉ**: Résumé très concret en AU MAXIMUM 3 phrases courtes et claires (en utilisant un langage simple différent du texte légal).
2. **EXEMPLES**: Exactement 2 ou 3 exemples pratiques quotidiens.
   - ⚠️ RÈGLE D'OR: L'exemple doit porter sur un sujet que l'article régit EXPLICITEMENT. Si l'article parle de détention, ne parle pas d'impôts.
   - Chaque exemple doit commencer par "Exemple appliqué:" suivi de la situation concrète directement dérivée du texte légal.
3. **DOCTRINE**: Commentaire juridique bref (1-3 phrases) basé sur le texte de l'article:
   - Écris toujours un commentaire juridique basé sur le texte littéral (portée, limites, obligations/droits et conséquences pratiques).
   - Si le contexte contient une jurisprudence ou une doctrine pertinente, intègre-la comme appui en 1 phrase (sans inventer ni exagérer).
   - Ne fais pas de disclaimers du type "pas de jurisprudence" ni "je ne peux pas analyser": tu dois produire le commentaire juridique quand même.

Réponds en format JSON avec cette structure EXACTE (rien avant ni après; commence par { et finis par }):
{
  "resum": "Écris un résumé SPÉCIFIQUE de cet article (max. 3 phrases, sans placeholders).",
  "exemples": [
    {"cas": "Exemple appliqué: (cas réaliste et spécifique à cet article, 1–2 phrases)", "idioma": "fr"},
    {"cas": "Exemple appliqué: (deuxième cas réaliste et spécifique, 1–2 phrases)", "idioma": "fr"}
  ],
  "doctrina_jurisprudencia": "1–3 phrases de commentaire juridique basé sur l'article; si le contexte contient jurisprudence/doctrine, intègre-la brièvement (sans inventer)."
}

⚠️ CRITIQUE: Réponds UNIQUEMENT avec le JSON. Le premier caractère doit être { et le dernier }. Rien avant ni après. ⚠️`,
    };

    const prompt = prompts[idioma];

    // Construir system message
    const CONST_NOMES = 'Només interpretem articles de la **Constitució del Principat d\'Andorra** (Article 1–107 i preàmbul). Cap altre codi ni norma.';
    const CONST_NOMES_ES = 'Solo interpretamos artículos de la **Constitución del Principado de Andorra** (Artículo 1–107 y preámbulo). Ningún otro código ni norma.';
    const CONST_NOMES_FR = 'Nous n\'interprétons que les articles de la **Constitution de la Principauté d\'Andorre** (Article 1–107 et préambule). Aucun autre code ni norme.';

    // Regles JSON per cada idioma
    const REGLA_JSON_CA = `
⚠️ REGLA ABSOLUTA — FORMAT JSON OBLIGATORI ⚠️
- La teva resposta HA DE SER ÚNICAMENT un objecte JSON vàlid. CAP text abans ni després.
- El primer caràcter HA DE SER { i l'últim HA DE SER }. Sense introduccions, conclusions, enllaços, preguntes, explicacions ni "Espero haver ajudat".
- NO escriguis res fora del JSON. NO afegeixis comentaris ni explicacions.
- Mantén cada camp concís: resum MÀXIM 3 frases; cada exemple ha de començar amb "Exemple aplicat:" i tenir 1–2 frases; doctrina_jurisprudencia 1–3 frases.
- EXEMPLE DE FORMAT CORRECTE (copia aquesta estructura exacta):
{
  "resum": "...",
  "exemples": [{"cas": "Exemple aplicat: ...", "idioma": "ca"}],
  "doctrina_jurisprudencia": "..."
}
`;

    const REGLA_JSON_ES = `
⚠️ REGLA ABSOLUTA — FORMATO JSON OBLIGATORIO ⚠️
- Tu respuesta DEBE SER ÚNICAMENTE un objeto JSON válido. NADA antes ni después.
- El primer carácter DEBE SER { y el último DEBE SER }. Sin introducciones, conclusiones, enlaces, preguntas, explicaciones ni "Espero haber ayudado".
- NO escribas nada fuera del JSON. NO añadas comentarios ni explicaciones.
- Mantén cada campo conciso: resumen MÁXIMO 3 frases; cada ejemplo debe empezar con "Ejemplo aplicado:" y tener 1–2 frases; doctrina_jurisprudencia 1–3 frases.
- EJEMPLO DE FORMATO CORRECTO (copia esta estructura exacta):
{
  "resum": "...",
  "exemples": [{"cas": "Ejemplo aplicado: ...", "idioma": "es"}],
  "doctrina_jurisprudencia": "..."
}
`;

    const REGLA_JSON_FR = `
⚠️ RÈGLE ABSOLUE — FORMAT JSON OBLIGATOIRE ⚠️
- Ta réponse DOIT ÊTRE UNIQUEMENT un objet JSON valide. Rien avant ni après.
- Le premier caractère DOIT ÊTRE { et le dernier DOIT ÊTRE }. Pas d'introduction, conclusion, liens, questions ni "J'espère vous avoir aidé".
- N'écris RIEN en dehors du JSON. N'ajoute PAS de commentaires ni d'explications.
- Garde chaque champ concis: résumé AU MAXIMUM 3 phrases; chaque exemple doit commencer par "Exemple appliqué:" et avoir 1–2 phrases; doctrina_jurisprudencia 1–3 phrases.
- EXEMPLE DE FORMAT CORRECT (copie cette structure exacte):
{
  "resum": "...",
  "exemples": [{"cas": "Exemple appliqué: ...", "idioma": "fr"}],
  "doctrina_jurisprudencia": "..."
}
`;

    // SYSTEM PROMPT COMPLET (Qualitat màxima a costa de temps)
    const systemMessage = idioma === 'ca'
      ? `Ets un assistent expert en dret andorrà. Respon SIEMPRE en format JSON vàlid.\n\n${CONST_NOMES}\n\n⚠️ REGLA CRÍTICA — FORMAT JSON OBLIGATORI ⚠️\n- La teva resposta HA DE SER ÚNICAMENT un objecte JSON vàlid. CAP text abans ni després.\n- El primer caràcter HA DE SER { i l'últim HA DE SER }. Sense introduccions, conclusions, enllaços, preguntes, explicacions ni "Espero haver ajudat".\n- NO escriguis res fora del JSON. NO afegeixis comentaris ni explicacions.\n- Mantén cada camp concís: resum MÀXIM 3 frases; cada exemple ha de començar amb "Exemple aplicat:" i tenir 1–2 frases; doctrina_jurisprudencia 1–3 frases.\n- EXEMPLE DE FORMAT CORRECTE (copia aquesta estructura exacta):\n{\n  "resum": "...",\n  "exemples": [{"cas": "Exemple aplicat: ...", "idioma": "ca"}],\n  "doctrina_jurisprudencia": "..."\n}\n\n${GUIA_CATALA_JURIDIC}\n${ASPECTES_JURISPRUDENCIA_ANDORRANA}`
      : idioma === 'es'
        ? `Eres un asistente experto en derecho andorrano. Responde SIEMPRE en formato JSON válido.\n\n${CONST_NOMES_ES}\n\n⚠️ REGLA CRÍTICA — FORMATO JSON OBLIGATORIO ⚠️\n- Tu respuesta DEBE SER ÚNICAMENTE un objeto JSON válido.\n- El primer carácter DEBE SER { y el último DEBE SER }.\n- NADA antes ni después del JSON. Sin introducciones, conclusiones, enlaces ni preguntas.\n\n${REGLA_JSON_ES}`
        : `Tu es un assistant expert en droit andorran. Réponds TOUJOURS en format JSON valide.\n\n${CONST_NOMES_FR}\n\n⚠️ RÈGLE CRITIQUE — FORMAT JSON OBLIGATOIRE ⚠️\n- Ta réponse DOIT ÊTRE UNIQUEMENT un objet JSON valide.\n- Le premier caractère DOIT ÊTRE { et le dernier DOIT ÊTRE }.\n- RIEN avant ni après le JSON. Pas d'introduction, conclusion, liens ni questions.\n\n${REGLA_JSON_FR}`;

    const messages = [
      { role: 'system', content: systemMessage },
      { role: 'user', content: prompt },
    ];

    // Debug: Log del prompt per veure què s'està enviant
    console.log(`📤 Prompt length: ${prompt.length} chars`);
    console.log(`📤 Article inclòs al prompt: ${prompt.includes(text_oficial.substring(0, 50)) ? '✅ SÍ' : '❌ NO'}`);

    let answer: string;
    const dateString = new Date().toISOString().split('T')[0];

    const coalesceString = (...values: Array<unknown>): string => {
      for (const v of values) {
        if (typeof v === 'string' && v.trim()) return v.trim();
      }
      return '';
    };

    const normalizeExamples = (raw: unknown, idiomaActual: 'ca' | 'es' | 'fr'): Exemple[] => {
      if (!raw) return [];

      // Acceptar diferents formes:
      // - ["Exemple aplicat: ...", ...]
      // - [{ cas: "...", idioma: "ca" }, ...]
      // - [{ example: "...", lang: "ca" }, ...] (tolerància)
      if (!Array.isArray(raw)) return [];

      const out: Exemple[] = [];
      for (const item of raw) {
        if (typeof item === 'string' && item.trim()) {
          out.push({ cas: item.trim(), idioma: idiomaActual });
          continue;
        }

        if (item && typeof item === 'object') {
          const obj = item as Record<string, unknown>;
          const cas = coalesceString(
            obj.cas,
            obj.example,
            obj.exemple,
            obj.ejemplo,
            obj.text,
            obj.texte
          );
          if (!cas) continue;

          const lang = coalesceString(obj.idioma, obj.lang, obj.language) as unknown;
          const idiomaNormalized: Exemple['idioma'] =
            lang === 'ca' || lang === 'es' || lang === 'fr' ? (lang as Exemple['idioma']) : idiomaActual;

          out.push({ cas, idioma: idiomaNormalized });
        }
      }

      // Limitar a 3 per evitar que el sidebar s’allargui massa
      return out.slice(0, 3);
    };

    const normalizeDoctrine = (rawObj: Record<string, unknown>): string => {
      // La clau esperada és doctrina_jurisprudencia, però Salamandra pot retornar variants
      return coalesceString(
        rawObj.doctrina_jurisprudencia,
        rawObj['doctrina_jurisprudència'],
        rawObj.doctrina,
        rawObj.comentari_juridic,
        rawObj.comentariJuridic,
        rawObj.jurisprudencia,
        rawObj.jurisprudència
      );
    };

    const extractFromPlainText = (text: string, idiomaActual: 'ca' | 'es' | 'fr') => {
      const clean = (text || '').trim();
      if (!clean) return { resum: '', exemples: [] as Exemple[], doctrina: '' };

      // Heurística d'extracció d'exemples més flexible:
      // Accepta: "Exemple aplicat:", "Exemple:", "Exemple 1:", "- Exemple:", etc.
      const exampleLineRegex =
        idiomaActual === 'es'
          ? /(^|\n)\s*(?:-\s*|\d+\.\s*)?(?:Ejemplo(?: aplicado)?|Caso pr[áa]ctico)(?:\s+\d+)?[:\s]+(.*?)(?=\n|$)/gi
          : idiomaActual === 'fr'
            ? /(^|\n)\s*(?:-\s*|\d+\.\s*)?(?:Exemple(?: appliqu[ée])?|Cas pratique)(?:\s+\d+)?[:\s]+(.*?)(?=\n|$)/gi
            : /(^|\n)\s*(?:-\s*|\d+\.\s*)?(?:Exemple(?: aplicat)?|Cas pràctic)(?:\s+\d+)?[:\s]+(.*?)(?=\n|$)/gi;

      const exemples: Exemple[] = [];
      let match: RegExpExecArray | null;

      // Reiniciar lastIndex per si de cas es reutilitza la regex (encara que sigui const local)
      exampleLineRegex.lastIndex = 0;

      while ((match = exampleLineRegex.exec(clean)) && exemples.length < 3) {
        // match[2] conté el text de l'exemple (el grup de captura després del prefix)
        const cas = (match[2] || '').trim();
        // Filtrar exemples buits o massa curts
        if (cas && cas.length > 10) {
          exemples.push({ cas, idioma: idiomaActual });
        }
      }

      // Heurística d'extracció de doctrina: agafar l’últim paràgraf si conté "doctrina"/"jurisprud"
      const paragraphs = clean.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
      const doctrinePara =
        [...paragraphs]
          .reverse()
          .find((p) => /doctrin|jurisprud|tribunal/i.test(p) && !/format de la resposta|estructura obligat[oò]ria|respon en format|réponds en format|responde en formato/i.test(p)) || '';

      // Resum: primer paràgraf (si existeix), o tot el text si només n'hi ha un
      const resum = paragraphs[0] || clean;

      return { resum, exemples, doctrina: doctrinePara };
    };

    // Funció helper per parsejar JSON amb múltiples estratègies
    const parseJSONResponse = (text: string): Record<string, unknown> | null => {
      if (!text || !text.trim()) return null;

      // 1. Intentar extreure JSON si està envoltat de markdown
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/);
      const jsonString = jsonMatch ? jsonMatch[1].trim() : text.trim();

      try {
        return JSON.parse(jsonString) as Record<string, unknown>;
      } catch {
        // 2. Intentar extreure objecte JSON brut (primer { ... darrer })
        const firstBrace = jsonString.indexOf('{');
        const lastBrace = jsonString.lastIndexOf('}');

        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
          try {
            return JSON.parse(jsonString.substring(firstBrace, lastBrace + 1)) as Record<string, unknown>;
          } catch {
            // 3. Buscar el bloc JSON més llarg si n'hi ha múltiples
            const jsonBlocks = jsonString.match(/\{[\s\S]*?\}/g);
            if (jsonBlocks && jsonBlocks.length > 0) {
              // Intentar parsejar el bloc més llarg
              const longestBlock = jsonBlocks.reduce((a, b) => a.length > b.length ? a : b);
              try {
                return JSON.parse(longestBlock) as Record<string, unknown>;
              } catch {
                // Fallback: retornar null
              }
            }
          }
        }
      }
      return null;
    };

    // Intento 1: Generació inicial
    try {
      answer = await generateText(messages, {
        maxTokens: 450, // Reduït per garantir resposta en <60s
        temperature: 0.1, // Molt baixa per evitar al·lucinacions als exemples
        dateString
      });
    } catch (error: any) {
      console.error('Error Salamandra API:', error);
      return res.status(500).json({ error: `Error al generar la interpretació: ${error.message}` });
    }

    if (!answer) {
      return res.status(500).json({ error: 'Resposta buida de Salamandra' });
    }

    const looksLikeInstructions = (text: string): boolean => {
      const t = (text || '').toLowerCase();
      // Frases meta que estem veient al UI (descriu el format en comptes de respondre)
      if (t.includes('format de la resposta')) return true;
      if (t.includes('la meva resposta serà')) return true;
      if (t.includes('mi respuesta será')) return true;
      if (t.includes('ma réponse sera')) return true;
      if (t.includes('en format json vàlid')) return true;
      if (t.includes('en formato json válido')) return true;
      if (t.includes('en format json valide')) return true;
      if (t.includes('comença amb {')) return true;
      if (t.includes('empieza con {')) return true;
      if (t.includes('commence par {')) return true;
      if (t.includes('la resposta seguirà')) return true;
      if (t.includes('incloent-hi un resum')) return true;
      if (t.includes('estructura obligat')) return true;
      if (t.includes('respon en format json')) return true;
      if (t.includes('responde en formato json')) return true;
      if (t.includes('réponds en format json')) return true;
      if (t.includes('cap text abans ni després')) return true;
      if (t.includes('nada antes ni después')) return true;
      if (t.includes('rien avant ni après')) return true;
      return false;
    };

    const looksLikeTemplate = (text: string): boolean => {
      const t = (text || '').toLowerCase();
      if (t.includes('resum molt concret')) return true;
      if (t.includes("escriu un resum específic")) return true;
      if (t.includes('màxim 3 frases')) return true;
      if (t.includes('sense placeholder')) return true;
      if (t.includes("cas realista i específic")) return true;
      if (t.includes('1-2 frases')) return true;
      if (t.includes('1–2 frases')) return true;
      if (t.includes('situació concreta')) return true;
      if (t.includes('situacion concreta')) return true;
      if (t.includes('situation concrète')) return true;
      if (t.includes('exemple aplicat: situació concreta')) return true;
      if (t.includes('ejemplo aplicado: situación concreta')) return true;
      if (t.includes('exemple appliqué: situation concrète')) return true;
      if (t.includes('escribe un resumen específico')) return true;
      if (t.includes('máx. 3 frases')) return true;
      if (t.includes('sin placeholders')) return true;
      if (t.includes('caso realista y específico')) return true;
      if (t.includes('1-2 frases')) return true;
      if (t.includes('1–2 frases')) return true;
      if (t.includes('écris un résumé spécifique')) return true;
      if (t.includes('max. 3 phrases')) return true;
      if (t.includes('sans placeholders')) return true;
      if (t.includes('cas réaliste et spécifique')) return true;
      if (t.includes('1-2 phrases')) return true;
      if (t.includes('1–2 phrases')) return true;
      const ellipsisCount = (text.match(/\.\.\./g) || []).length;
      if (ellipsisCount >= 2) return true;
      return false;
    };

    // Intentar parsejar JSON
    let parsedContent = parseJSONResponse(answer);

    // Intento 2: Si no s'ha obtingut JSON vàlid, retry amb prompt més estricte
    if (!parsedContent || typeof parsedContent !== 'object') {
      console.warn('⚠️ Primer intent: Salamandra ha retornat text pla. Intentant retry amb prompt més estricte...');

      const retryPrompt = idioma === 'ca'
        ? `${prompt}\n\n⚠️ ATENCIÓ: La teva resposta anterior NO era JSON vàlid. Respon ÚNICAMENT amb el JSON demanat. El primer caràcter ha de ser { i l'últim }. Cap text abans ni després. ⚠️`
        : idioma === 'es'
          ? `${prompt}\n\n⚠️ ATENCIÓN: Tu respuesta anterior NO era JSON válido. Responde ÚNICAMENTE con el JSON solicitado. El primer carácter debe ser { y el último }. Nada antes ni después. ⚠️`
          : `${prompt}\n\n⚠️ ATTENTION: Ta réponse précédente N'ÉTAIT PAS un JSON valide. Réponds UNIQUEMENT avec le JSON demandé. Le premier caractère doit être { et le dernier }. Rien avant ni après. ⚠️`;

      const retryMessages = [
        { role: 'system', content: systemMessage },
        { role: 'user', content: retryPrompt },
      ];

      try {
        answer = await generateText(retryMessages, {
          maxTokens: 600,
          temperature: 0.2, // Encara més baixa per ser més determinista
          dateString
        });
        parsedContent = parseJSONResponse(answer);
      } catch (retryError: any) {
        console.error('Error en retry Salamandra API:', retryError);
        return res.status(500).json({ error: `Error al generar la interpretació (retry): ${retryError.message}` });
      }
    }

    // Intento 3: Si és JSON però sembla que ha copiat la plantilla/instruccions, retry correctiu
    if (parsedContent && typeof parsedContent === 'object' && (looksLikeTemplate(answer) || looksLikeInstructions(answer))) {
      console.warn('⚠️ Contingut plantilla detectat. Retry correctiu...');

      const fixPrompt =
        idioma === 'ca'
          ? `${prompt}\n\n⚠️ IMPORTANT: La teva resposta anterior copiava frases plantilla.\n- PROHIBIT usar literalment: \"Resum molt concret\", \"situació concreta\", \"...\".\n- Escriu contingut ESPECÍFIC d'aquest article (resum + 2–3 exemples realistes), sense placeholders.\nRespon ÚNICAMENT amb el JSON.`
          : idioma === 'es'
            ? `${prompt}\n\n⚠️ IMPORTANTE: Tu respuesta anterior copiaba frases plantilla.\n- PROHIBIDO usar literalmente: \"Resumen muy concreto\", \"situación concreta\", \"...\".\n- Escribe contenido ESPECÍFICO de este artículo (resumen + 2–3 ejemplos realistas), sin placeholders.\nResponde ÚNICAMENTE con el JSON.`
            : `${prompt}\n\n⚠️ IMPORTANT: Ta réponse précédente copiait des phrases modèle.\n- INTERDIT d'utiliser littéralement: \"Résumé très concret\", \"situation concrète\", \"...\".\n- Écris un contenu SPÉCIFIQUE à cet article (résumé + 2–3 exemples réalistes), sans placeholders.\nRéponds UNIQUEMENT avec le JSON.`;

      const fixMessages = [
        { role: 'system', content: systemMessage },
        { role: 'user', content: fixPrompt },
      ];

      try {
        answer = await generateText(fixMessages, {
          maxTokens: 650,
          temperature: 0.15,
          dateString
        });
        parsedContent = parseJSONResponse(answer);
      } catch (fixError: any) {
        console.error('Error en retry correctiu Salamandra API:', fixError);
      }
    }

    // Revalidació: si el JSON és vàlid però falten camps clau (exemples/doctrina) o són meta-instruccions, retry específic
    if (parsedContent && typeof parsedContent === 'object') {
      const parsedObj0 = parsedContent as Record<string, unknown>;
      const exemples0 = normalizeExamples(
        parsedObj0.exemples ?? parsedObj0.examples ?? parsedObj0.ejemplos,
        idioma
      );
      const doctrina0 = normalizeDoctrine(parsedObj0);

      const exemplesHavePlaceholders = exemples0.some((e) =>
        /situaci[oó]n concreta|situació concreta|situation concr[eè]te|cas realista|caso realista|cas réaliste|1[-–]2 (?:frases|phrases)|sense placeholder|sin placeholders|sans placeholders|\.\.\./i.test(e.cas)
      );
      const doctrinaIsMeta = !doctrina0 || looksLikeInstructions(doctrina0) || /format de la resposta|la resposta seguir[aà]|estructura obligat/i.test(doctrina0);

      if (exemples0.length < 2 || exemplesHavePlaceholders || doctrinaIsMeta) {
        console.warn('⚠️ Camps incomplets o meta detectats (exemples/doctrina). Retry específic...');

        const fix2 =
          idioma === 'ca'
            ? `Reescriu NOMÉS aquests camps per a l'ARTICLE ${numeracio} (sense repetir el text literal):\n\n- "exemples": 2 o 3 exemples reals i específics (NO placeholders, NO "situació concreta", NO "(cas realista...)", NO "...").\n- "doctrina_jurisprudencia": 1–3 frases de comentari jurídic basat en el text de l'article; si el context conté doctrina/jurisprudència rellevant, integra-la breument (sense inventar). NO diguis "no hi ha jurisprudència".\n\nPROHIBIT descriure el format o les instruccions. Produeix contingut.\n\nRespon ÚNICAMENT amb un JSON vàlid amb aquesta estructura exacta:\n{\n  "resum": "${coalesceString(parsedObj0.resum)}",\n  "exemples": [{\"cas\": \"Exemple aplicat: ...\", \"idioma\": \"ca\"}],\n  "doctrina_jurisprudencia": \"...\"\n}`
            : idioma === 'es'
              ? `Reescribe SOLO estos campos para el ARTÍCULO ${numeracio} (sin repetir el texto literal):\n\n- "exemples": 2 o 3 ejemplos reales y específicos (NO placeholders, NO "situación concreta", NO "...").\n- "doctrina_jurisprudencia": 1–3 frases de comentario jurídico basado en el texto del artículo; si el contexto contiene doctrina/jurisprudencia relevante, intégrala brevemente (sin inventar). NO digas "no hay jurisprudencia".\n\nPROHIBIDO describir el formato o las instrucciones. Produce contenido.\n\nResponde ÚNICAMENTE con un JSON válido con esta estructura exacta:\n{\n  \"resum\": \"${coalesceString(parsedObj0.resum)}\",\n  \"exemples\": [{\"cas\": \"Ejemplo aplicado: ...\", \"idioma\": \"es\"}],\n  \"doctrina_jurisprudencia\": \"...\"\n}`
              : `Réécris UNIQUEMENT ces champs pour l'ARTICLE ${numeracio} (sans répéter le texte littéral):\n\n- \"exemples\": 2 ou 3 exemples réels et spécifiques (PAS de placeholders, PAS \"situation concrète\", PAS \"...\").\n- \"doctrina_jurisprudencia\": 1–3 phrases de commentaire juridique basé sur le texte de l'article; si le contexte contient une doctrine/jurisprudence pertinente, intègre-la brièvement (sans inventer). Ne dis pas \"pas de jurisprudence\".\n\nINTERDIT de décrire le format ou les instructions. Produis du contenu.\n\nRéponds UNIQUEMENT avec un JSON valide avec cette structure exacte:\n{\n  \"resum\": \"${coalesceString(parsedObj0.resum)}\",\n  \"exemples\": [{\"cas\": \"Exemple appliqué: ...\", \"idioma\": \"fr\"}],\n  \"doctrina_jurisprudencia\": \"...\"\n}`;

        const fix2Messages = [
          { role: 'system', content: systemMessage },
          { role: 'user', content: `${prompt}\n\n---\n\n${fix2}` },
        ];

        try {
          const answer2 = await generateText(fix2Messages, {
            maxTokens: 500,
            temperature: 0.1,
            dateString
          });
          const parsed2 = parseJSONResponse(answer2);
          if (parsed2 && typeof parsed2 === 'object') {
            parsedContent = parsed2;
            answer = answer2;
          }
        } catch (e) {
          console.error('Error retry específic exemples/doctrina:', e);
        }
      }
    }

    // Fallback final: Si encara no hi ha JSON vàlid, usar text pla com a resum
    if (!parsedContent || typeof parsedContent !== 'object') {
      console.warn('⚠️ Salamandra ha retornat text pla després de retry. S\'usa fallback amb resum directe.');
      const rawResum = answer.length > 6000 ? answer.slice(0, 5997) + '...' : answer;

      const extracted = extractFromPlainText(rawResum, idioma);

      const interpretacio: InterpretacioIA = {
        article_id,
        resum: {
          ca: idioma === 'ca' ? (extracted.resum || rawResum) : '',
          es: idioma === 'es' ? (extracted.resum || rawResum) : '',
          fr: idioma === 'fr' ? (extracted.resum || rawResum) : '',
        },
        exemples: extracted.exemples,
        conceptes_clau: [],
        articles_relacionats: [],
        jurisprudencia_vinculada: [],
        generat_data: new Date().toISOString().split('T')[0],
        revisat: false,
        finalitat: '',
        destinataris: '',
        aplicacio: '',
        doctrina_jurisprudencia: extracted.doctrina,
      };
      return res.status(200).json(interpretacio);
    }

    // Construir la resposta segons l'esquema InterpretacioIA
    const parsedObj = parsedContent as Record<string, unknown>;
    const resumStr = coalesceString(
      parsedObj.resum,
      parsedObj.resumen,
      parsedObj.resume,
      parsedObj.summary
    );
    const exemplesArr = normalizeExamples(
      parsedObj.exemples ?? parsedObj.examples ?? parsedObj.ejemplos ?? parsedObj.exemples_practics ?? parsedObj.exemples_practiques,
      idioma
    );
    const conceptesArr = Array.isArray(parsedContent.conceptes_clau) ? (parsedContent.conceptes_clau as string[]) : [];

    const interpretacio: InterpretacioIA = {
      article_id,
      resum: {
        ca: idioma === 'ca' ? resumStr : '',
        es: idioma === 'es' ? resumStr : '',
        fr: idioma === 'fr' ? resumStr : '',
      },
      exemples: exemplesArr,
      conceptes_clau: conceptesArr,
      articles_relacionats: [],
      jurisprudencia_vinculada: [],
      generat_data: new Date().toISOString().split('T')[0],
      revisat: false,
      finalitat: String(parsedContent.finalitat ?? ''),
      destinataris: String(parsedContent.destinataris ?? ''),
      aplicacio: String(parsedContent.aplicacio ?? ''),
      doctrina_jurisprudencia: normalizeDoctrine(parsedObj),
    };

    return res.status(200).json(interpretacio);
  } catch (error) {
    console.error('Error en interpretacio-ia:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Error desconegut',
    });
  }
}
