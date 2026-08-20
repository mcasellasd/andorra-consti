/**
 * API endpoint per generar interpretació assistida per IA
 * Segons el briefing tècnic de dretplaner.ad
 * 
 * Utilitza Groq (Llama-3.3-70B) o Hugging Face per generar resums, exemples i doctrina
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { GUIA_CATALA_JURIDIC } from '../prompts/guia-catala-juridic';
import { ASPECTES_JURISPRUDENCIA_ANDORRANA } from '../prompts/aspectes-jurisprudencia-andorra';
import { InterpretacioIA, Exemple } from '../../data/codis/types';
import { getJurisprudenciaForArticle } from '../../data/jurisprudencia-andorra';
import { getArticleById } from '../article-helpers';
import { getDoctrinaByArticleId } from '../../data/doctrina';
import { generateText } from '../llm';
import { buildInterlocutorInstructions, parseInterlocutorProfile, type InterlocutorProfile } from '../interlocutor-profile';

export interface InterpretacioRequest {
  article_id: string;
  text_oficial: string;
  numeracio: string;
  idioma: 'ca' | 'es' | 'fr';
  profile?: InterlocutorProfile;
}

// Configurar timeout màxim per Vercel (Pro: 300s, Hobby: 10s -> 60s amb config)
export const maxDuration = 60;

export async function interpretacioIAHandler(
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
    const { article_id, text_oficial, numeracio, idioma, profile: rawProfile }: InterpretacioRequest = req.body;
    const profile = parseInterlocutorProfile(rawProfile);

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
    // RAG FLOW: Recuperació de context amb XLM-RoBERTa (opcional, desactivat per defecte)
    // Activa amb RAG_ENABLED=true al .env.local si vols context addicional (carrega XLM-RoBERTa, pot trigar)
    // ============================================================================

    let ragContext = '';

    if (process.env.RAG_ENABLED === 'true') {
      try {
        const runRag = async () => {
          const { generateEmbedding } = await import('../embeddings/index');
          const { retrieveTopMatches } = await import('../rag/corpus');
          console.log(`🧠 Generant embedding RAG per a article ${article_id} amb XLM-RoBERTa...`);
          const embedding = await generateEmbedding(`${article?.titol || ''} ${text_oficial}`, 'xlm-roberta');
          return retrieveTopMatches(embedding, 5);
        };
        const timeoutPromise = new Promise<any[]>((_, reject) =>
          setTimeout(() => reject(new Error('RAG Timeout (limite excedit)')), 15000)
        );
        const matches = await Promise.race([runRag(), timeoutPromise]);
        if (matches && matches.length > 0) {
          ragContext = `\n\nCONTEXT ADDICIONAL RECUPERAT (RAG - XLM-RoBERTa):\nUtilitza aquest context per enriquir l'explicació, però prioritza el text oficial de l'article.\n`;
          matches.forEach((m: any) => {
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
      }
    }

    // ============================================================================

    // Debug: Verificar que l'article s'està passant correctament
    console.log(`📋 Article a interpretar: ${numeracio}`);
    console.log(`📝 Text oficial (primeres 200 chars): ${text_oficial.substring(0, 200)}...`);

    // Construir el prompt segons l'idioma (amb els prompts millorats)
    const prompts = {
      ca: `Ets un expert en dret andorrà. L'article següent és de la **Constitució del Principat d'Andorra**. 

⚠️ TASCA: Interpreta ÚNICAMENT aquest article específic. No parlis d'altres articles ni temes no relacionats. ⚠️

PRIORITAT ABSOLUTA: Primer interpreta el **text literal** de l’article en llenguatge planer. La jurisprudència/doctrina és **opcional** i només s'ha d'usar si apareix al context. Encara que NO hi hagi jurisprudència/doctrina, has de generar igualment la interpretació completa basada en el text de l'article.

**ARTICLE ${numeracio} A INTERPRETAR:**
"${text_oficial}"${contextNormatiu}${jurisprudenciaContext}${doctrinaContext}${ragContext}

⚠️ PROHIBICIONS ABSOLUTES ⚠️
- NO inventis informació comercial, noms de persones, advocats, despatxos o empreses.
- NO afegeixis despedides, salutacions ni informació de contacte.
- NO parlis de temes que NO estiguin explícitament a l'article proporcionat.
- NO escriguis res fora del JSON. Cap text abans ni després.
- NO copiïs ni reutilitzis frases d'exemple/plantilla del prompt (p. ex. "Resum descriptiu...", "situació concreta...", "...").
- NO diguis que “no pots” donar exemples o comentari per manca de jurisprudència/doctrina.

REGLA FONAMENTAL: Només pots parlar del que diu aquest article. Si l'article NO menciona residència, immigració, procediments administratius o altres temes, NO en parlis.

IMPORTANT: NO repeteixis el text literal de l'article. Adapta el contingut utilitzant llenguatge natural i planer, explicant amb les teves pròpies paraules què significa i què regula l'article.

LLENGUATGE PLANER I EXPLICATIU: El text oficial està en català. La teva feina és **traduir** el significat a llenguatge planer: explica què vol dir amb paraules senzilles i quotidianes, sense repetir el llenguatge jurídic. El resum ha de ser **explicatiu** (què implica en la pràctica, per què importa) i en **llenguatge planer** (vocabulari accessible, frases curtes, sense jargon sense explicar).

PÚBLIC: Hi ha usuaris que necessiten més explicació. El resum ha de ser **suficient** per a qui necessiti més detall: inclou **tots** els apartats o incisos de l'article (no només els primers). Si l'article té diversos punts numerats, menciona o resumeix cadascun en llenguatge planer. En articles densos, pots fer el resum una mica més llarg (3 a 5 frases) per cobrir-ho tot.

⚠️ ESTRUCTURA OBLIGATÒRIA: La teva resposta s'ha d'encabir en sis llocs específics ⚠️

La interpretació IA es mostra en el sidebar de l'article amb les següents seccions:
1. **RESUM**: Resum **explicatiu** en **llenguatge planer** (2 a 5 frases segons la densitat). **Traduïu** el text oficial a paraules senzilles: què vol dir, què implica en la pràctica. Inclou la interpretació **en conjunt** i **tots** els punts concrets.
2. **EXEMPLES**: Exactament 2 o 3 exemples pràctics quotidians rellevants per a l'article.
   - ⚠️ REGLA D'OR: L'exemple ha de ser sobre un tema que l'article regula EXPLÍCITAMENT.
3. **FINALITAT** ("Què et permet / què et limita"): Explica clarament què permet fer o quina limitació/prohibició estableix expressament aquest article en el dia a dia (1-2 frases clares).
4. **DESTINATARIS** ("Àmbit d'aplicació"): A qui o a què s'aplica aquest article (ex. tots els ciutadans, poders públics, coprínceps, etc.) en 1-2 frases clares.
5. **APLICACIO** ("Impacte pràctic"): Explica quin és l'impacte pràctic immediat o la utilitat directa d'aquest article per a les persones o la societat (1-2 frases clares).
6. **DOCTRINA**: Comentari doctrinal (1-3 frases) sobre els principis jurídics i fonaments de l'article, sense referències a sentències específiques.

Respon en format JSON amb aquesta estructura EXACTA (cap text abans ni després; comença per { i acaba per }):
{
  "resum": "Escriu un resum ESPECÍFIC i descriptiu d'aquest article (2 a 5 frases segons la densitat; cobreix tots els punts de l'article; sense placeholders).",
  "exemples": [
    {"cas": "Exemple aplicat: (cas realista i específic d'aquest article, 1–2 frases)", "idioma": "ca"},
    {"cas": "Exemple aplicat: (segon cas realista i específic, 1–2 frases)", "idioma": "ca"}
  ],
  "finalitat": "Explica de forma planera què permet o limita exactament l'article (1-2 frases).",
  "destinataris": "Indica de forma planera a qui o a què s'aplica el contingut de l'article (1-2 frases).",
  "aplicacio": "Explica quin és l'impacte o utilitat pràctica de l'article (1-2 frases).",
  "doctrina_jurisprudencia": "1–3 frases de comentari únicament doctrinal basat en l'article i la doctrina jurídica (sense incloure jurisprudència)."
}

⚠️ CRÍTIC: Respon ÚNICAMENT amb el JSON. El primer caràcter ha de ser { i l'últim }. Cap text abans ni després. ⚠️`,
      es: `Eres un experto en derecho andorrano. El artículo siguiente es de la **Constitución del Principado de Andorra**.

⚠️ TAREA: Interpreta ÚNICAMENTE este artículo específico. No hables de otros artículos ni temas no relacionados. ⚠️

INTERPRETACIÓN COMPLETA: Debes interpretar la norma **en conjunto** (sentido general, finalidad, coherencia con el contexto constitucional) y **también** los puntos concretos de la ley (apartados, incisos, obligaciones o derechos específicos que establece el artículo).

PRIORIDAD ABSOLUTA: Primero interpreta el **texto literal** del artículo en lenguaje llano. Aunque NO haya doctrina previa, debes generar igualmente la interpretación completa basada en el texto del artículo.

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
- NO copies ni dejes frases plantilla del prompt (p. ej. "Resumen descriptivo...", "situación concreta...", "...").
- NO digas que “no puedes” dar ejemplos o comentario por falta de doctrina.

REGLA FUNDAMENTAL: Solo puedes hablar de lo que dice este artículo. Si el artículo NO menciona residencia, inmigración, procedimientos administrativos u otros temas, NO hables de ellos.

IMPORTANTE: NO repitas el texto literal del artículo. Adapta el contenido utilizando lenguaje natural y llano, explicando con tus propias palabras qué significa y qué regula el artículo.

LENGUAJE LLANO Y EXPLICATIVO: El texto oficial está en catalán. Tu tarea es **traducir** el significado a lenguaje llano: explica qué quiere decir con palabras sencillas y cotidianas, sin repetir el lenguaje jurídico. El resumen debe ser **explicativo** (qué implica en la práctica, por qué importa) y en **lenguaje llano** (vocabulario accesible, frases cortas, sin jerga sin explicar).

PÚBLICO: Hay usuarios que necesitan más explicación. El resumen debe ser **suiciente** para quien necesite más detalle: incluye **todos** los apartados o incisos del artículo (no solo los primeros). Si el artículo tiene varios puntos de la ley, menciona o resume cada uno en lenguaje llano. En artículos densos, puedes alargar el resumen (3 a 5 frases) para verlo todo.

⚠️ ESTRUCTURA OBLIGATORIA: Tu respuesta debe encajarse en seis lugares específicos ⚠️

La interpretación IA se muestra en el sidebar con las siguientes secciones:
1. **RESUMEN**: Resumen **explicativo** en **lenguaje llano** (2 a 5 frases según la densidad). **Traduce** el texto oficial a palabras sencillas: qué quiere decir, qué implica en la práctica. Incluye la interpretación **en conjunto** y **todos** los puntos concretos.
2. **EJEMPLOS**: Exactamente 2 o 3 ejemplos prácticos cotidianos relevantes para el artículo.
   - ⚠️ REGLA DE ORO: El ejemplo debe ser sobre un tema que el artículo regula EXPLÍCITAMENTE.
3. **FINALITAT** ("Qué permite / qué limita"): Explica claramente qué permite hacer o qué limitación/prohibición establece expresamente este artículo en el día a día (1-2 frases claras).
4. **DESTINATARIS** ("Ámbito de aplicación"): A quién o a qué se aplica este artículo (ej. todos los ciudadanos, poderes públicos, copríncipes, etc.) en 1-2 frases claras.
5. **APLICACIO** ("Impacto práctico"): Explica cuál es el impacto práctico inmediato o la utilidad directa de este artículo para las personas o la sociedad (1-2 frases claras).
6. **DOCTRINA**: Comentario doctrinal (1-3 frases) sobre los principios jurídicos y fundamentos del artículo, sin referencias a sentencias específicas.

Responde en formato JSON con esta estructura EXACTA (nada antes ni después; empieza por { y acaba por }):
{
  "resum": "Escribe un resumen ESPECÍFICO y descriptivo de este artículo (2 a 5 frases según la densidad; cubre todos los puntos del artículo; sin placeholders).",
  "exemples": [
    {"cas": "Ejemplo aplicado: (caso realista y específico de este artículo, 1–2 frases)", "idioma": "es"},
    {"cas": "Ejemplo aplicado: (segundo caso realista y específico, 1–2 frases)", "idioma": "es"}
  ],
  "finalitat": "Explica de forma llana qué permite o limita exactamente el artículo (1-2 frases).",
  "destinataris": "Indica de forma llana a quién o a qué se aplica el contenido del artículo (1-2 frases).",
  "aplicacio": "Explica cuál es el impacto o utilidad práctica del artículo (1-2 frases).",
  "doctrina_jurisprudencia": "1–3 frases de comentario únicamente doctrinal basado en el artículo y la doctrina jurídica (sin incluir jurisprudencia)."
}

⚠️ CRÍTICO: Responde ÚNICAMENTE con el JSON. El primer carácter debe ser { y el último }. Nada antes ni después. ⚠️`,
      fr: `Tu es un expert en droit andorran. L'article suivant est de la **Constitution de la Principauté d'Andorre**.

⚠️ TÂCHE: Interprète UNIQUEMENT cet article spécifique. Ne parle pas d'autres articles ni de sujets non liés. ⚠️

INTERPRÉTATION COMPLÈTE: Tu dois interpréter la norme **dans son ensemble** (sens général, finalité, cohérence avec le contexte constitutionnel) et **aussi** les points concrets de la loi (paragraphes, alinéas, obligations ou droits spécifiques que l'article établit).

PRIORITÉ ABSOLUTE: Interprète d'abord le **texte littéral** de l'article en langage simple. Même s'il n'y a PAS de doctrine préalable, tu dois quand même générer la fiche d'interprétation complète basée sur le texte de l'article.

**ARTICLE ${numeracio} À INTERPRÉTER:**
"${text_oficial}"${contextNormatiu}${jurisprudenciaContext}${doctrinaContext}${ragContext}

⚠️ RÈGLE ABSOLUTE SUR LA LANGUE ET LA TRADUCTION ⚠️
- Le texte littéral de l'article est en catalan (langue officielle) et ne doit JAMAIS être traduit.
- Ta réponse (résumé, exemples, interprétation) DOIT être COMPLÈTEMENT en FRANÇAIS.
- Exemple correct: "Selon l'Art. ${numeracio}: '${text_oficial.substring(0, 50)}...' Cela signifie que..."

⚠️ INTERDICTIONS ABSOLUES ⚠️
- N'invente PAS d'information commerciale, de noms de personnes, d'avocats, de cabinets ou d'entreprises.
- N'ajoute PAS de formules de politesse, de salutations ni d'informations de contact.
- Ne parle PAS de sujets qui NE sont PAS explicitement dans l'article fourni.
- N'écris RIEN en dehors du JSON. Rien avant ni après.
- Ne copie pas / ne réutilise pas les phrases modèle du prompt (p. ex. "Résumé descriptif...", "situation concrète...", "...").
- Ne dis pas que tu “ne peux pas” donner des exemples ou un commentaire faute de doctrine.

RÈGLE FONDAMENTALE: Tu ne peux parler que de ce que dit cet article. Si l'article NE mentionne PAS la résidence, l'immigration, les procédures administratives ou d'autres sujets, N'en parle PAS.

IMPORTANT: NE répète PAS le texte littéral de l'article. Adapte le contenu en utilisant un langage naturel et simple, expliquant avec tes propres mots ce que signifie et ce que régit l'article.

LANGAGE SIMPLE ET EXPLICATIF: Le texte officiel est en catalan. Ta tâche est de **traduire** le sens en langage simple: explique ce que cela signifie avec des mots simples et quotidiens, sans répéter le langage juridique. Le résumé doit être **explicatif** (ce que cela implique en pratique, pourquoi c'est important) et en **langage simple** (vocabulaire accessible, phrases courtes, pas de jargon sans l'expliquer).

PUBLIC: Certains utilisateurs ont besoin de plus d'explication. Le résumé doit être **suffisant** pour qui a besoin de plus de détail : inclus **tous** les paragraphes ou alinéas de l'article (pas seulement les premiers). Si l'article a plusieurs points numérotés, mentionne ou résume chacun en langage simple. Pour les articles denses, tu peux allonger le résumé (3 à 5 phrases) pour tout couvrir.

⚠️ STRUCTURE OBLIGATOIRE: Ta réponse doit s'encadrer dans six endroits spécifiques ⚠️

L'interprétation IA s'affiche dans la barre latérale avec les sections suivantes:
1. **RÉSUMÉ**: Résumé **explicatif** en **langage simple** (2 à 5 phrases selon la densité). **Traduis** le texte officiel en mots simples.
2. **EXEMPLES**: Exactament 2 ou 3 exemples pratiques quotidiens pertinents pour l'article.
   - ⚠️ RÈGLE D'OR: L'exemple doit porter sur un sujet que l'article régit EXPLICITEMENT.
3. **FINALITAT** ("Ce que cela permet / limite"): Explique clairement ce que cet article permet de faire ou quelle limitation/interdiction il établit expressément au quotidien (1-2 phrases).
4. **DESTINATARIS** ("Champ d'application"): À qui ou à quoi s'applique cet article (ex. tous les citoyens, pouvoirs publics, coprinces, etc.) en 1-2 phrases.
5. **APLICACIO** ("Impact pratique"): Explique quel est l'impact pratique immédiat ou l'utilité directe de cet article pour les personnes ou la société (1-2 phrases).
6. **DOCTRINE**: Commentaire doctrinal (1-3 phrases) sur les principes juridiques et fondements de l'article, sans référence à des décisions de justice spécifiques.

Réponds en format JSON avec cette structure EXACTE (rien avant ni après; commence par { et finis par }):
{
  "resum": "Écris un résumé SPÉCIFIQUE et descriptif de cet article (2 à 5 phrases selon la densité; couvre tous les points de l'article; sans placeholders).",
  "exemples": [
    {"cas": "Exemple appliqué: (cas réaliste et spécifique à cet article, 1–2 phrases)", "idioma": "fr"},
    {"cas": "Exemple appliqué: (deuxième cas réaliste et spécifique, 1–2 phrases)", "idioma": "fr"}
  ],
  "finalitat": "Explique de manière simple ce que l'article permet ou limite exactement (1-2 phrases).",
  "destinataris": "Indique de manière simple à qui ou à quoi s'applique le contenu de l'article (1-2 phrases).",
  "aplicacio": "Explique quel est l'impact ou l'utilité pratique de l'article (1-2 phrases).",
  "doctrina_jurisprudencia": "1–3 phrases de commentaire uniquement doctrinal basé sur l'article et la doctrine juridique (sans inclure de jurisprudence)."
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
- Mantén cada camp clar: resum 2 a 5 frases; exemples és un array d'exemples pràctics reals de l'article; finalitat (què et permet/limita) en 1-2 frases; destinataris (àmbit d'aplicació) en 1-2 frases; aplicacio (impacte pràctic) en 1-2 frases; doctrina_jurisprudencia en 1-3 frases de comentari doctrinal.
- EXEMPLE DE FORMAT CORRECTE (copia aquesta estructura exacta):
{
  "resum": "...",
  "exemples": [{"cas": "Exemple aplicat: ...", "idioma": "ca"}],
  "finalitat": "...",
  "destinataris": "...",
  "aplicacio": "...",
  "doctrina_jurisprudencia": "..."
}
`;

    const REGLA_JSON_ES = `
⚠️ REGLA ABSOLUTA — FORMATO JSON OBLIGATORIO ⚠️
- Tu respuesta DEBE SER ÚNICAMENTE un objeto JSON válido. NADA antes ni después.
- El primer carácter DEBE SER { y el último DEBE SER }. Sin introducciones, conclusiones, enlaces, preguntas, explicaciones ni "Espero haber ayudado".
- NO escribas nada fuera del JSON. NO añadas comentarios ni explicaciones.
- Mantén cada campo claro: resumen 2 a 5 frases; exemples es un array de ejemplos prácticos reales del artículo; finalitat (qué permite/limita) en 1-2 frases; destinataris (ámbito de aplicación) en 1-2 frases; aplicacio (impacto práctico) en 1-2 frases; doctrina_jurisprudencia en 1-3 frases de comentario doctrinal.
- EJEMPLO DE FORMATO CORRECTO (copia esta estructura exacta):
{
  "resum": "...",
  "exemples": [{"cas": "Ejemplo aplicado: ...", "idioma": "es"}],
  "finalitat": "...",
  "destinataris": "...",
  "aplicacio": "...",
  "doctrina_jurisprudencia": "..."
}
`;

    const REGLA_JSON_FR = `
⚠️ RÈGLE ABSOLUE — FORMAT JSON OBLIGATOIRE ⚠️
- Ta réponse DOIT ÊTRE UNIQUEMENT un objet JSON valide. Rien avant ni après.
- Le premier caractère DOIT ÊTRE { et le dernier DOIT ÊTRE }. Pas d'introduction, conclusion, liens, questions ni "J'espère vous avoir aidé".
- N'écris RIEN en dehors du JSON. N'ajoute PAS de commentaires ni d'explications.
- Garde chaque champ clair: résumé 2 à 5 phrases; exemples est un tableau d'exemples pratiques réels de l'article; finalitat (ce que cela permet/limite) en 1-2 phrases; destinataris (champ d'application) en 1-2 phrases; aplicacio (impact pratique) en 1-2 phrases; doctrina_jurisprudencia en 1-3 phrases de commentaire doctrinal.
- EXEMPLE DE FORMAT CORRECT (copie cette structure exacte):
{
  "resum": "...",
  "exemples": [{"cas": "Exemple appliqué: ...", "idioma": "fr"}],
  "finalitat": "...",
  "destinataris": "...",
  "aplicacio": "...",
  "doctrina_jurisprudencia": "..."
}
`;

    // ESTRATÈGIA ONE-SHOT PROMPTING SIMPLIFICADA (Array strings per exemples)
    // Reduïm la complexitat del JSON per evitar errors de sintaxi del model.

    const systemPromptBase = idioma === 'ca'
      ? `Ets un assistent jurídic expert en dret andorrà. La teva única funció és analitzar articles de la Constitució i generar fitxes explicatives en format JSON simplificat. La teva resposta (resum, exemples, finalitat, destinataris, aplicacio, doctrina_jurisprudencia) ha de ser íntegrament en català. Respon NOMÉS en català.`
      : idioma === 'es'
        ? `Eres un asistente experto en derecho andorrano. Tu única función es analizar artículos de la Constitución y generar fichas explicativas en formato JSON simplificado. Tu respuesta (resum, exemples, finalitat, destinataris, aplicacio, doctrina_jurisprudencia) debe ser íntegramente en castellano. Responde SOLO en castellano.`
        : `Tu es un assistant expert en droit andorran. Ta seule fonction est d'analyser des articles de la Constitution et de générer des fiches explicatives en format JSON simplifié. Ta réponse (resum, exemples, finalitat, destinataris, aplicacio, doctrina_jurisprudencia) doit être entièrement en français. Réponds UNIQUEMENT en français.`;

    const interlocutorInstructions = buildInterlocutorInstructions(profile, idioma);

    // Exemple One-Shot 1 (Article 2) - EXEMPLES COM A STRINGS SIMPLES
    const exampleUser = idioma === 'ca'
      ? `Analitza l'ARTICLE 2: "1. La llengua oficial de l'Estat és el català.\n2. L'himne nacional, la bandera i l'escut d'Andorra són els tradicionals.\n3. Andorra la Vella és la capital de l'Estat."\n\nContext: (buit)`
      : idioma === 'es'
        ? `Analiza el ARTÍCULO 2: "1. La lengua oficial del Estado es el catalán..."\n\nContexto: (vacío)`
        : `Analyse l'ARTICLE 2: "1. La langue officielle de l'État est le catalan..."\n\nContexte: (vide)`;

    const exampleAssistant = idioma === 'ca'
      ? `{"resum":"Aquest article defineix els símbols d'identitat d'Andorra: el català com a única llengua oficial i els símbols tradicionals. També fixa la capitalitat a Andorra la Vella.","exemples":["Un ciutadà vol presentar una sol·licitud al Govern i té dret a ser atès en català.","En un acte oficial internacional, s'ha d'utilitzar la bandera i l'escut tradicionals d'Andorra."],"finalitat":"Permet l'ús oficial del català com a llengua de l'Estat i estableix oficialment els símbols nacionals.","destinataris":"S'aplica a totes les administracions públiques, institucions, ciutadans d'Andorra i actes oficials de l'Estat.","aplicacio":"Els tràmits oficials s'han de fer en català i les institucions han d'utilitzar exclusivament els símbols oficials definits.","doctrina_jurisprudencia":"La doctrina constitucional considera el català com a eix vertebrador de la identitat nacional andorrana i principi rector de l'activitat de totes les institucions públiques."}`
      : idioma === 'es'
        ? `{"resum":"Este artículo define los símbolos de identidad de Andorra: el catalán como única lengua oficial y los símbolos tradicionales. También fija la capitalidad en Andorra la Vella.","exemples":["Un ciudadano quiere presentar una solicitud al Gobierno y tiene derecho a ser atendido en catalán.","En un acto oficial internacional, se debe utilizar la bandera y el escudo tradicionales de Andorra."],"finalitat":"Permite el uso oficial del catalán como lengua del Estado y establece oficialmente los símbolos nacionales.","destinataris":"Se aplica a todas las administraciones públicas, instituciones, ciudadanos de Andorra y actos oficiales del Estado.","aplicacio":"Los trámites oficiales deben realizarse en catalán y las instituciones deben usar exclusivamente los símbolos oficiales definidos.","doctrina_jurisprudencia":"La doctrina constitucional considera el catalán como eje vertebrador de la identidad nacional andorrana y principio rector de la actividad de las instituciones públicas."}`
        : `{"resum":"Cet article définit les symboles d'identité de l'Andorre : le catalan comme seule langue officielle et les symboles traditionnels. Il fixe également la capitale à Andorre-la-Vieille.","exemples":["Un citoyen souhaite soumettre une demande au Gouvernement et a le droit d'être servi en catalan.","Lors d'une cérémonie officielle internationale, le drapeau et les armoiries traditionnels doivent être utilisés."],"finalitat":"Permet l'usage officiel du catalan comme langue de l'État et établit officiellement les symboles nationaux.","destinataris":"S'applique à toutes les administrations publiques, institutions, citoyens d'Andorre et actes officiels de l'État.","aplicacio":"Les démarches officielles doivent être effectuées en catalan et les institutions doivent utiliser exclusivement les symboles officiels définis.","doctrina_jurisprudencia":"La doctrine constitutionnelle considère le catalan comme l'axe vertébrateur de l'identité nationale andorrane et le principe directeur des institutions publiques."}`;

    // Exemple One-Shot 2 (Article 8) - EXEMPLES COM A STRINGS SIMPLES
    const exampleUser2 = idioma === 'ca'
      ? `Analitza l'ARTICLE 8: "1. La Constitució reconeix el dret a la vida..."\n\nContext: (buit)`
      : idioma === 'es'
        ? `Analiza el ARTÍCULO 8: "1. La Constitución reconoce el derecho a la vida..."\n\nContexto: (vacío)`
        : `Analyse l'ARTICLE 8: "1. La Constitution reconnaît le droit à la vie..."\n\nContexte: (vide)`;

    const exampleAssistant2 = idioma === 'ca'
      ? `{"resum":"Es reconeix el dret a la vida com a dret fonamental inviolable i es prohibeix absolutament la pena de mort i la tortura.","exemples":["Un presoner denuncia maltractaments físics; la Constitució ho prohibeix terminantment.","El debat sobre l'avortament es basa en la protecció de la vida en les seves diferents fases."],"finalitat":"Garanteix el dret de qualsevol persona a viure de forma segura i prohibeix qualsevol acció que atempti contra la seva integritat física.","destinataris":"Afecta totes les persones que es trobin a Andorra, així com els poders públics i forces de seguretat de l'Estat.","aplicacio":"Cap llei ni autoritat pot aplicar la pena de mort ni permetre maltractaments a detinguts o ciutadans.","doctrina_jurisprudencia":"La doctrina jurídica configura el dret a la vida com el valor suprem del sistema constitucional, del qual deriven la resta de drets fonamentals i la prohibició absoluta de la pena de mort."}`
      : idioma === 'es'
        ? `{"resum":"Se reconoce el derecho a la vida como derecho fundamental inviolable y se prohíbe absolutamente la pena de muerte y la tortura.","exemples":["Un prisionero denuncia maltratos físicos; la Constitución lo prohíbe terminantemente.","El debate sobre el aborto se basa en la protección de la vida en sus diferentes fases."],"finalitat":"Garantiza el derecho de cualquier persona a vivir de forma segura y prohíbe cualquier acción que atente contra su integridad física.","destinataris":"Afecta a todas las personas que se encuentren en Andorra, así como a los poderes públicos y fuerzas de seguridad del Estado.","aplicacio":"Ninguna ley ni autoridad puede aplicar la pena de muerte ni permitir maltratos a detenidos o ciudadanos.","doctrina_jurisprudencia":"La doctrina jurídica configura el derecho a la vida como el valor supremo del sistema constitucional, del que derivan los demás derechos fundamentales y la prohibición absoluta de la pena de muerte."}`
        : `{"resum":"Le droit à la vie est reconnu comme un droit fondamental inviolable et la peine de mort ainsi que la torture sont absolument interdites.","exemples":["Un prisonnier dénonce des mauvais traitements physiques; la Constitution l'interdit formellement.","Le débat sur l'avortement repose sur la protection de la vie dans ses différentes phases."],"finalitat":"Garantit le droit de toute personne à vivre en sécurité et interdit toute action portant atteinte à son intégrité physique.","destinataris":"Concerne toutes les personnes se trouvant en Andorre, ainsi que les pouvoirs publics et les forces de sécurité de l'État.","aplicacio":"Aucune loi ni autorité ne peut appliquer la peine de mort ni autoriser la maltraitance des détenus ou des citoyens.","doctrina_jurisprudencia":"La doctrine juridique formule le droit à la vie comme la valeur suprême du système constitutionnel, dont découlent les autres droits fondamentaux et l'interdiction absolue de la peine de mort."}`;

    // Prompt Real - Reforçat per evitar copiar exemples
    const promptReal = idioma === 'ca'
      ? `---
ARA ÉS EL TEU TORN.
TASCA ACTUAL: Analitza l'ARTICLE ${numeracio} (i cap altre).
TEXT DE L'ARTICLE: "${text_oficial}"

Genera el JSON exclusivament per a l'Article ${numeracio}.
Context Addicional (si n'hi ha):
${ragContext}`
      : idioma === 'es'
        ? `---
AHORA ES TU TURNO.
TAREA ACTUAL: Analiza el ARTÍCULO ${numeracio} (y ningún otro).
TEXTO DEL ARTÍCULO: "${text_oficial}"

Genera el JSON exclusivamente para el Artículo ${numeracio}.
Contexto Adicional (si hay):
${ragContext}`
        : `---
C'EST TON TOUR.
TÂCHE ACTUELLE: Analyse l'ARTICLE ${numeracio} (et aucun autre).
TEXTE DE L'ARTICLE: "${text_oficial}"

Génère le JSON exclusivement pour l'Article ${numeracio}.
Contexte Supplémentaire (s'il y en a):
${ragContext}`;

    const messages = [
      { role: 'system', content: `${systemPromptBase}${interlocutorInstructions}` },
      { role: 'user', content: exampleUser },
      { role: 'assistant', content: exampleAssistant },
      { role: 'user', content: exampleUser2 },
      { role: 'assistant', content: exampleAssistant2 },
      { role: 'user', content: promptReal }
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
      // La clau esperada és doctrina_jurisprudencia; el model pot retornar variants
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
      if (!clean) return { resum: '', exemples: [] as Exemple[], finalitat: '', destinataris: '', aplicacio: '', doctrina: '' };

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

      // Heurístiques per a finalitat, destinataris i aplicació
      const finalitatRegex = /(?:finali[td]a[td]|permet|limita)[:\s]+(.*?)(?=\n\s*(?:destinatari|aplicaci|doctrin|exemple|resum)|$)/i;
      const destinatarisRegex = /(?:destinatari|àmbit|ambit|aplicació|aplicacion)[:\s]+(.*?)(?=\n\s*(?:finali|aplicaci|doctrin|exemple|resum)|$)/i;
      const aplicacioRegex = /(?:aplicació|aplicacion|impacte|impacto|pràctic|practico)[:\s]+(.*?)(?=\n\s*(?:finali|destinatari|doctrin|exemple|resum)|$)/i;

      const finalitatMatch = clean.match(finalitatRegex);
      const finalitat = finalitatMatch ? finalitatMatch[1].trim() : '';

      const destinatarisMatch = clean.match(destinatarisRegex);
      const destinataris = destinatarisMatch ? destinatarisMatch[1].trim() : '';

      const aplicacioMatch = clean.match(aplicacioRegex);
      const aplicacio = aplicacioMatch ? aplicacioMatch[1].trim() : '';

      // Heurística d'extracció de doctrina: agafar l’últim paràgraf si conté "doctrina"/"jurisprud"
      const paragraphs = clean.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
      const doctrinePara =
        [...paragraphs]
          .reverse()
          .find((p) => /doctrin|jurisprud|tribunal/i.test(p) && !/format de la resposta|estructura obligat[oò]ria|respon en format|réponds en format|responde en formato/i.test(p)) || '';

      // Resum: primer paràgraf (si existeix), o tot el text si només n'hi ha un
      const resum = paragraphs[0] || clean;

      return { resum, exemples, finalitat, destinataris, aplicacio, doctrina: doctrinePara };
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
        maxTokens: 700, // Espai per resum 2-3 frases semi llargues + exemples + doctrina
        temperature: 0.1, // Molt baixa per evitar al·lucinacions als exemples
        dateString
      });
    } catch (error: any) {
      console.error('Error LLM API:', error);
      return res.status(500).json({ error: `Error al generar la interpretació: ${error.message}` });
    }

    if (!answer) {
      return res.status(500).json({ error: 'Resposta buida del model de generació' });
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
      if (t.includes('resum específic i descriptiu') && t.includes('2 a 3 frases semi llargues')) return true;
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
      console.warn('⚠️ Primer intent: el model ha retornat text pla. Intentant retry amb prompt més estricte...');

      const retryPrompt = idioma === 'ca'
        ? `${prompt}\n\n⚠️ ATENCIÓ: La teva resposta anterior NO era JSON vàlid. Respon ÚNICAMENT amb el JSON demanat. El primer caràcter ha de ser { i l'últim }. Cap text abans ni després. ⚠️`
        : idioma === 'es'
          ? `${prompt}\n\n⚠️ ATENCIÓN: Tu respuesta anterior NO era JSON válido. Responde ÚNICAMENTE con el JSON solicitado. El primer carácter debe ser { y el último }. Nada antes ni después. ⚠️`
          : `${prompt}\n\n⚠️ ATTENTION: Ta réponse précédente N'ÉTAIT PAS un JSON valide. Réponds UNIQUEMENT avec le JSON demandé. Le premier caractère doit être { et le dernier }. Rien avant ni après. ⚠️`;

      const retryMessages = [
        { role: 'system', content: `${systemPromptBase}${interlocutorInstructions}` },
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
        console.error('Error en retry LLM API:', retryError);
        return res.status(500).json({ error: `Error al generar la interpretació (retry): ${retryError.message}` });
      }
    }

    // Intento 3: Si és JSON però sembla que ha copiat la plantilla/instruccions, retry correctiu
    if (parsedContent && typeof parsedContent === 'object' && (looksLikeTemplate(answer) || looksLikeInstructions(answer))) {
      console.warn('⚠️ Contingut plantilla detectat. Retry correctiu...');

      const fixPrompt =
        idioma === 'ca'
          ? `${prompt}\n\n⚠️ IMPORTANT: La teva resposta anterior copiava frases plantilla.\n- PROHIBIT usar literalment instruccions o placeholders (\"Resum descriptiu...\", \"situació concreta\", \"...\").\n- Escriu contingut ESPECÍFIC d'aquest article: resum descriptiu (2–5 frases) + 2–3 exemples realistes + finalitat + destinataris + aplicació + doctrina.\nRespon ÚNICAMENT amb el JSON.`
          : idioma === 'es'
            ? `${prompt}\n\n⚠️ IMPORTANTE: Tu respuesta anterior copiaba frases plantilla.\n- PROHIBIDO usar literalmente instrucciones o placeholders (\"Resumen descriptivo...\", \"situación concreta\", \"...\").\n- Escribe contenido ESPECÍFICO de este artículo: resumen descriptivo (2–5 frases) + 2–3 ejemplos realistas + finalitat + destinataris + aplicació + doctrina.\nResponde ÚNICAMENTE con el JSON.`
            : `${prompt}\n\n⚠️ IMPORTANT: Ta réponse précédente copiait des phrases modèle.\n- INTERDIT d'utiliser littéralement les instructions ou placeholders (\"Résumé descriptif...\", \"situation concrète\", \"...\").\n- Écris un contenu SPÉCIFIQUE à cet article: résumé descriptif (2–5 phrases) + 2–3 exemples réalistes + finalitat + destinataris + aplicació + doctrine.\nRéponds UNIQUEMENT avec le JSON.`;

      const fixMessages = [
        { role: 'system', content: `${systemPromptBase}${interlocutorInstructions}` },
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
        console.error('Error en retry correctiu LLM API:', fixError);
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
            ? `Reescriu NOMÉS aquests camps per a l'ARTICLE ${numeracio} (sense repetir el text literal):\n\n- "exemples": Array de 2 o 3 exemples pràctics (NO placeholders).\n- "finalitat": 1-2 frases explicant què permet/limita l'article.\n- "destinataris": 1-2 frases explicant a qui/què s'aplica.\n- "aplicacio": 1-2 frases explicant l'impacte pràctic.\n- "doctrina_jurisprudencia": 1–3 frases de comentari únicament doctrinal.\n\nRespon ÚNICAMENT amb un JSON vàlid:\n{\n  "resum": "${coalesceString(parsedObj0.resum)}",\n  "exemples": ["Exemple aplicat: ...", "Exemple aplicat: ..."],\n  "finalitat": "${coalesceString(parsedObj0.finalitat)}",\n  "destinataris": "${coalesceString(parsedObj0.destinataris)}",\n  "aplicacio": "${coalesceString(parsedObj0.aplicacio)}",\n  "doctrina_jurisprudencia": "..."\n}`
            : idioma === 'es'
              ? `Reescribe SOLO estos campos para el ARTÍCULO ${numeracio}:\n\n- "exemples": Array de 2 o 3 ejemplos prácticos.\n- "finalitat": 1-2 frases explicando qué permite/limita el artículo.\n- "destinataris": 1-2 frases explicando a quién/qué se aplica.\n- "aplicacio": 1-2 frases explicando el impacto práctico.\n- "doctrina_jurisprudencia": 1–3 frases de comentario únicamente doctrinal.\n\nResponde ÚNICAMENTE con un JSON válido:\n{\n  "resum": "${coalesceString(parsedObj0.resum)}",\n  "exemples": ["Ejemplo aplicado: ...", "Ejemplo aplicado: ..."],\n  "finalitat": "${coalesceString(parsedObj0.finalitat)}",\n  "destinataris": "${coalesceString(parsedObj0.destinataris)}",\n  "aplicacio": "${coalesceString(parsedObj0.aplicacio)}",\n  "doctrina_jurisprudencia": "..."\n}`
              : `Réécris UNIQUEMENT ces champs pour l'ARTICLE ${numeracio}:\n\n- "exemples": Tableau de 2 ou 3 exemples pratiques.\n- "finalitat": 1-2 phrases (ce que cela permet/limite).\n- "destinataris": 1-2 phrases (champ d'application).\n- "aplicacio": 1-2 phrases (impact pratique).\n- "doctrina_jurisprudencia": 1–3 phrases de commentaire uniquement doctrinal.\n\nRéponds UNIQUEMENT avec un JSON valide:\n{\n  "resum": "${coalesceString(parsedObj0.resum)}",\n  "exemples": ["Exemple appliqué: ...", "Exemple appliqué: ..."],\n  "finalitat": "${coalesceString(parsedObj0.finalitat)}",\n  "destinataris": "${coalesceString(parsedObj0.destinataris)}",\n  "aplicacio": "${coalesceString(parsedObj0.aplicacio)}",\n  "doctrina_jurisprudencia": "..."\n}`;

        const fix2Messages = [
          { role: 'system', content: `${systemPromptBase}${interlocutorInstructions}` },
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
      console.warn('⚠️ El model ha retornat text pla després de retry. S\'usa fallback amb resum directe.');
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
      finalitat: String(parsedObj.finalitat ?? ''),
      destinataris: String(parsedObj.destinataris ?? ''),
      aplicacio: String(parsedObj.aplicacio ?? ''),
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

export async function generateInterpretacioIA(payload: InterpretacioRequest): Promise<InterpretacioIA> {
  let statusCode = 200;
  let responseBody: InterpretacioIA | { error: string } | null = null;

  const res = {
    status(code: number) {
      statusCode = code;
      return this;
    },
    json(body: InterpretacioIA | { error: string }) {
      responseBody = body;
      return this;
    },
    end() {
      return this;
    }
  } as unknown as NextApiResponse<InterpretacioIA | { error: string }>;

  const req = {
    method: 'POST',
    body: payload
  } as NextApiRequest;

  await interpretacioIAHandler(req, res);

  if (statusCode >= 400) {
    const errorMessage = (responseBody as { error?: string } | null)?.error || 'Error al generar la interpretació';
    throw new Error(errorMessage);
  }

  if (!responseBody || 'error' in responseBody) {
    throw new Error('Error al generar la interpretació');
  }

  return responseBody;
}
