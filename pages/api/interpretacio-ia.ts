/**
 * API endpoint per generar interpretació assistida per IA
 * Segons el briefing tècnic de dretplaner.ad
 * 
 * Utilitza Groq (Llama-3.3-70B) o Hugging Face per generar resums, exemples i doctrina
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
    // RAG FLOW: Recuperació de context amb XLM-RoBERTa (opcional, desactivat per defecte)
    // Activa amb RAG_ENABLED=true al .env.local si vols context addicional (carrega XLM-RoBERTa, pot trigar)
    // ============================================================================

    let ragContext = '';

    if (process.env.RAG_ENABLED === 'true') {
      try {
        const runRag = async () => {
          const { generateEmbedding } = await import('../../lib/embeddings/index');
          const { retrieveTopMatches } = await import('../../lib/rag/corpus');
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

PRIORITAT ABSOLUTA: Primer interpreta el **text literal** de l’article en llenguatge planer. La jurisprudència/doctrina és **opcional** i només s'ha d'usar si apareix al context. Encara que NO hi hagi jurisprudència/doctrina, has de generar igualment el resum, els exemples i un comentari jurídic basat en el text de l'article.

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

⚠️ ESTRUCTURA OBLIGATÒRIA: La teva resposta s'ha d'encabir en TRES llocs específics ⚠️

La interpretació IA es mostra en tres seccions del sidebar:
1. **RESUM**: Resum descriptiu de 4 a 6 frases (o més si l'article és dens), en llenguatge planer, que expliqui què diu l'article, què regula, a qui afecta i quines implicacions pràctiques té. No copiïs el text literal; adapta el contingut amb les teves paraules.
2. **EXEMPLES**: Exactament 2 o 3 exemples pràctics quotidians.
   - ⚠️ REGLA D'OR: L'exemple ha de ser sobre un tema que l'article regula EXPLÍCITAMENT. Si l'article parla de detenció, no parlis d'impostos.
   - Cada exemple ha de començar amb "Exemple aplicat:" seguit de la situació concreta derivada directament del text legal.
3. **DOCTRINA**: Comentari jurídic breu (1-3 frases) basat en el text de l’article:
   - Sempre escriu un comentari jurídic basat en el text literal (abast, límits, obligacions/drets i conseqüències pràctiques).
   - Si el context inclou jurisprudència o doctrina rellevant, integra-la com a suport en 1 frase (sense inventar ni exagerar).
   - No facis disclaimers del tipus "no hi ha jurisprudència" ni "no puc fer anàlisi": has de produir comentari jurídic igualment.

Respon en format JSON amb aquesta estructura EXACTA (cap text abans ni després; comença per { i acaba per }):
{
  "resum": "Escriu un resum ESPECÍFIC i descriptiu d'aquest article (4 a 6 frases, o més si cal; sense placeholders).",
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
- NO copies ni reutilices frases plantilla del prompt (p. ej. "Resumen descriptivo...", "situación concreta...", "...").
- NO digas que “no puedes” dar ejemplos o comentario por falta de jurisprudencia/doctrina.

REGLA FUNDAMENTAL: Solo puedes hablar de lo que dice este artículo. Si el artículo NO menciona residencia, inmigración, procedimientos administrativos u otros temas, NO hables de ellos.

IMPORTANTE: NO repitas el texto literal del artículo. Adapta el contenido utilizando lenguaje natural y llano, explicando con tus propias palabras qué significa y qué regula el artículo.

⚠️ ESTRUCTURA OBLIGATORIA: Tu respuesta debe encajarse en TRES lugares específicos ⚠️

La interpretación IA se muestra en tres secciones del sidebar:
1. **RESUMEN**: Resumen descriptivo de 4 a 6 frases (o más si el artículo es denso), en lenguaje llano, que explique qué dice el artículo, qué regula, a quién afecta y qué implicaciones prácticas tiene. No copies el texto literal; adapta el contenido con tus propias palabras.
2. **EJEMPLOS**: Exactamente 2 o 3 ejemplos prácticos cotidianos.
   - ⚠️ REGLA DE ORO: El ejemplo debe ser sobre un tema que el artículo regula EXPLÍCITAMENTE. Si el artículo habla de detención, no hables de impuestos.
   - Cada ejemplo debe empezar con "Ejemplo aplicado:" seguido de la situación concreta derivada directamente del texto legal.
3. **DOCTRINA**: Comentario jurídico breve (1-3 frases) basado en el texto del artículo:
   - Escribe siempre un comentario jurídico basado en el texto literal (alcance, límites, obligaciones/derechos y consecuencias prácticas).
   - Si el contexto incluye jurisprudencia o doctrina relevante, intégrala como apoyo en 1 frase (sin inventar ni exagerar).
   - No hagas disclaimers del tipo "no hay jurisprudencia" ni "no puedo hacer análisis": debes producir comentario jurídico igualmente.

Responde en formato JSON con esta estructura EXACTA (nada antes ni después; empieza por { y acaba por }):
{
  "resum": "Escribe un resumen ESPECÍFICO y descriptivo de este artículo (4 a 6 frases, o más si procede; sin placeholders).",
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
- Ne copie pas / ne réutilise pas les phrases modèle du prompt (p. ex. "Résumé descriptif...", "situation concrète...", "...").
- Ne dis pas que tu “ne peux pas” donner des exemples ou un commentaire faute de jurisprudence/doctrine.

RÈGLE FONDAMENTALE: Tu ne peux parler que de ce que dit cet article. Si l'article NE mentionne PAS la résidence, l'immigration, les procédures administratives ou d'autres sujets, N'en parle PAS.

IMPORTANT: NE répète PAS le texte littéral de l'article. Adapte le contenu en utilisant un langage naturel et simple, expliquant avec tes propres mots ce que signifie et ce que régit l'article.

⚠️ STRUCTURE OBLIGATOIRE: Ta réponse doit s'encadrer dans TROIS endroits spécifiques ⚠️

L'interprétation IA s'affiche dans trois sections de la barre latérale:
1. **RÉSUMÉ**: Résumé descriptif de 4 à 6 phrases (ou plus si l'article est dense), en langage simple, qui explique ce que dit l'article, ce qu'il régit, à qui il s'applique et quelles implications pratiques il a. Ne copie pas le texte littéral; adapte le contenu avec tes propres mots.
2. **EXEMPLES**: Exactement 2 ou 3 exemples pratiques quotidiens.
   - ⚠️ RÈGLE D'OR: L'exemple doit porter sur un sujet que l'article régit EXPLICITEMENT. Si l'article parle de détention, ne parle pas d'impôts.
   - Chaque exemple doit commencer par "Exemple appliqué:" suivi de la situation concrète directement dérivée du texte légal.
3. **DOCTRINE**: Commentaire juridique bref (1-3 phrases) basé sur le texte de l'article:
   - Écris toujours un commentaire juridique basé sur le texte littéral (portée, limites, obligations/droits et conséquences pratiques).
   - Si le contexte contient une jurisprudence ou une doctrine pertinente, intègre-la comme appui en 1 phrase (sans inventer ni exagérer).
   - Ne fais pas de disclaimers du type "pas de jurisprudence" ni "je ne peux pas analyser": tu dois produire le commentaire juridique quand même.

Réponds en format JSON avec cette structure EXACTE (rien avant ni après; commence par { et finis par }):
{
  "resum": "Écris un résumé SPÉCIFIQUE et descriptif de cet article (4 à 6 phrases, ou plus si besoin; sans placeholders).",
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
- Mantén cada camp clar: resum 4 a 6 frases (descriptiu); cada exemple ha de començar amb "Exemple aplicat:" i tenir 1–2 frases; doctrina_jurisprudencia 1–3 frases.
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
- Mantén cada campo claro: resumen 4 a 6 frases (descriptivo); cada ejemplo debe empezar con "Ejemplo aplicado:" y tener 1–2 frases; doctrina_jurisprudencia 1–3 frases.
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
- Garde chaque champ clair: résumé 4 à 6 phrases (descriptif); chaque exemple doit commencer par "Exemple appliqué:" et avoir 1–2 phrases; doctrina_jurisprudencia 1–3 phrases.
- EXEMPLE DE FORMAT CORRECT (copie cette structure exacte):
{
  "resum": "...",
  "exemples": [{"cas": "Exemple appliqué: ...", "idioma": "fr"}],
  "doctrina_jurisprudencia": "..."
}
`;

    // ESTRATÈGIA ONE-SHOT PROMPTING SIMPLIFICADA (Array strings per exemples)
    // Reduïm la complexitat del JSON per evitar errors de sintaxi del model.

    const systemPromptBase = idioma === 'ca'
      ? `Ets un assistent jurídic expert en dret andorrà. La teva única funció és analitzar articles de la Constitució i generar fitxes explicatives en format JSON simplificat. La teva resposta (resum, exemples, doctrina_jurisprudencia) ha de ser íntegrament en català. Respon NOMÉS en català.`
      : idioma === 'es'
        ? `Eres un asistente experto en derecho andorrano. Tu única función es analizar artículos de la Constitución y generar fichas explicativas en formato JSON simplificado. Tu respuesta (resum, exemples, doctrina_jurisprudencia) debe ser íntegramente en castellano. Responde SOLO en castellano.`
        : `Tu es un assistant expert en droit andorran. Ta seule fonction est d'analyser des articles de la Constitution et de générer des fiches explicatives en format JSON simplifié. Ta réponse (resum, exemples, doctrina_jurisprudencia) doit être entièrement en français. Réponds UNIQUEMENT en français.`;

    // Exemple One-Shot 1 (Article 2) - EXEMPLES COM A STRINGS SIMPLES
    const exampleUser = idioma === 'ca'
      ? `Analitza l'ARTICLE 2: "1. La llengua oficial de l'Estat és el català.\n2. L'himne nacional, la bandera i l'escut d'Andorra són els tradicionals.\n3. Andorra la Vella és la capital de l'Estat."\n\nContext: (buit)`
      : idioma === 'es'
        ? `Analiza el ARTÍCULO 2: "1. La lengua oficial del Estado es el catalán..."\n\nContexto: (vacío)`
        : `Analyse l'ARTICLE 2: "1. La langue officielle de l'État est le catalan..."\n\nContexte: (vide)`;

    const exampleAssistant = idioma === 'ca'
      ? `{"resum":"Aquest article defineix els símbols d'identitat d'Andorra: el català com a única llengua oficial i els símbols tradicionals. També fixa la capitalitat a Andorra la Vella.","exemples":["Un ciutadà vol presentar una sol·licitud al Govern i té dret a ser atès en català.","En un acte oficial internacional, s'ha d'utilitzar la bandera i l'escut tradicionals d'Andorra."],"doctrina_jurisprudencia":"La cooficialitat d'altres llengües no està reconeguda constitucionalment. El català és l'única llengua de l'administració."}`
      : idioma === 'es'
        ? `{"resum":"Este artículo define los símbolos de identidad de Andorra: el catalán como única lengua oficial y los símbolos tradicionales. También fija la capitalidad en Andorra la Vella.","exemples":["Un ciudadano quiere presentar una solicitud al Gobierno y tiene derecho a ser atendido en catalán.","En un acto oficial internacional, se debe utilizar la bandera y el escudo tradicionales de Andorra."],"doctrina_jurisprudencia":"La cooficialidad de otras lenguas no está reconocida constitucionalmente."}`
        : `{"resum":"Cet article définit les symboles d'identité de l'Andorre : le catalan comme seule langue officielle et les symboles traditionnels. Il fixe également la capitale à Andorre-la-Vieille.","exemples":["Un citoyen souhaite soumettre une demande au Gouvernement et a le droit d'être servi en catalan.","Lors d'une cérémonie officielle internationale, le drapeau et les armoiries traditionnels doivent être utilisés."],"doctrina_jurisprudencia":"La co-officialité d'autres langues n'est pas reconnue constitutionnellement."}`;

    // Exemple One-Shot 2 (Article 8) - EXEMPLES COM A STRINGS SIMPLES
    const exampleUser2 = idioma === 'ca'
      ? `Analitza l'ARTICLE 8: "1. La Constitució reconeix el dret a la vida..."\n\nContext: (buit)`
      : idioma === 'es'
        ? `Analiza el ARTÍCULO 8: "1. La Constitución reconoce el derecho a la vida..."\n\nContexto: (vacío)`
        : `Analyse l'ARTICLE 8: "1. La Constitution reconnaît le droit à la vie..."\n\nContexte: (vide)`;

    const exampleAssistant2 = idioma === 'ca'
      ? `{"resum":"Es reconeix el dret a la vida com a dret fonamental inviolable i es prohibeix absolutament la pena de mort i la tortura.","exemples":["Un presoner denuncia maltractaments físics; la Constitució ho prohibeix terminantment.","El debat sobre l'avortament es basa en la protecció de la vida en les seves diferents fases."],"doctrina_jurisprudencia":"La prohibició de la pena de mort és absoluta. La protecció en 'diferents fases' fonamenta la restricció de l'avortament."}`
      : idioma === 'es'
        ? `{"resum":"Se reconoce el derecho a la vida como derecho fundamental inviolable y se prohíbe absolutamente la pena de muerte y la tortura.","exemples":["Un prisionero denuncia maltratos físicos; la Constitución lo prohíbe terminantemente.","El debate sobre el aborto se basa en la protección de la vida en sus diferentes fases."],"doctrina_jurisprudencia":"La prohibición de la pena de muerte es absoluta."}`
        : `{"resum":"Le droit à la vie est reconnu comme un droit fondamental inviolable et la peine de mort ainsi que la torture sont absolument interdites.","exemples":["Un prisonnier dénonce des mauvais traitements physiques; la Constitution l'interdit formellement.","Le débat sur l'avortement repose sur la protection de la vie dans ses différentes phases."],"doctrina_jurisprudencia":"L'interdiction de la peine de mort est absolue."}`;

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
      { role: 'system', content: systemPromptBase },
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
      if (t.includes('resum específic i descriptiu') && t.includes('4 a 6 frases')) return true;
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
        { role: 'system', content: systemPromptBase },
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
          ? `${prompt}\n\n⚠️ IMPORTANT: La teva resposta anterior copiava frases plantilla.\n- PROHIBIT usar literalment instruccions o placeholders (\"Resum descriptiu...\", \"situació concreta\", \"...\").\n- Escriu contingut ESPECÍFIC d'aquest article: resum descriptiu (4–6 frases) + 2–3 exemples realistes.\nRespon ÚNICAMENT amb el JSON.`
          : idioma === 'es'
            ? `${prompt}\n\n⚠️ IMPORTANTE: Tu respuesta anterior copiaba frases plantilla.\n- PROHIBIDO usar literalmente instrucciones o placeholders (\"Resumen descriptivo...\", \"situación concreta\", \"...\").\n- Escribe contenido ESPECÍFICO de este artículo: resumen descriptivo (4–6 frases) + 2–3 ejemplos realistas.\nResponde ÚNICAMENTE con el JSON.`
            : `${prompt}\n\n⚠️ IMPORTANT: Ta réponse précédente copiait des phrases modèle.\n- INTERDIT d'utiliser littéralement les instructions ou placeholders (\"Résumé descriptif...\", \"situation concrète\", \"...\").\n- Écris un contenu SPÉCIFIQUE à cet article: résumé descriptif (4–6 phrases) + 2–3 exemples réalistes.\nRéponds UNIQUEMENT avec le JSON.`;

      const fixMessages = [
        { role: 'system', content: systemPromptBase },
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
            ? `Reescriu NOMÉS aquests camps per a l'ARTICLE ${numeracio} (sense repetir el text literal):\n\n- "exemples": Array de 2 o 3 frases simples explicant exemples pràctics (NO placeholders).\n- "doctrina_jurisprudencia": 1–3 frases de comentari jurídic.\n\nRespon ÚNICAMENT amb un JSON vàlid:\n{\n  "resum": "${coalesceString(parsedObj0.resum)}",\n  "exemples": ["Exemple aplicat: ...", "Exemple aplicat: ..."],\n  "doctrina_jurisprudencia": "..."\n}`
            : idioma === 'es'
              ? `Reescribe SOLO estos campos para el ARTÍCULO ${numeracio}:\n\n- "exemples": Array de 2 o 3 frases simples (Ejemplos prácticos).\n- "doctrina_jurisprudencia": 1–3 frases de comentario jurídico.\n\nResponde ÚNICAMENTE con un JSON válido:\n{\n  "resum": "${coalesceString(parsedObj0.resum)}",\n  "exemples": ["Ejemplo aplicado: ...", "Ejemplo aplicado: ..."],\n  "doctrina_jurisprudencia": "..."\n}`
              : `Réécris UNIQUEMENT ces champs pour l'ARTICLE ${numeracio}:\n\n- "exemples": Tableau de 2 ou 3 phrases simples (Exemples pratiques).\n- "doctrina_jurisprudencia": 1–3 phrases de commentaire juridique.\n\nRéponds UNIQUEMENT avec un JSON valide:\n{\n  "resum": "${coalesceString(parsedObj0.resum)}",\n  "exemples": ["Exemple appliqué: ...", "Exemple appliqué: ..."],\n  "doctrina_jurisprudencia": "..."\n}`;

        const fix2Messages = [
          { role: 'system', content: systemPromptBase },
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
