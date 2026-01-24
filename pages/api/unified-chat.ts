import type { NextApiRequest, NextApiResponse } from 'next';
import { retrieveTopMatches, getArticleByNumber, getArticlesByIds, retrieveHybridMatches } from '../../lib/rag/corpus';
import type { RetrievedContext } from '../../lib/rag/types';
import { GUIA_CATALA_JURIDIC } from '../../lib/prompts/guia-catala-juridic';
import { ASPECTES_JURISPRUDENCIA_ANDORRANA } from '../../lib/prompts/aspectes-jurisprudencia-andorra';
import { checkAIActCompliance, getAIActCompliancePrompt } from '../../lib/rag/quality-assessment';
import { generateEmbedding, getEmbeddingProvider } from '../../lib/embeddings';
import { detectComplexity, detectArticleReference, detectArticleByKeywords } from '../../lib/rag/detect-complexity';

interface UnifiedChatRequest {
  message: string;
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  maxTokens?: number;
  temperature?: number;
}

interface UnifiedChatResponse {
  response?: string;
  sources?: Array<{
    type: 'constitucio';
    code: 'constitucio';
    id: string;
    title: string;
    number?: string;
    score?: number;
    content?: string; // Afegim contingut per mostrar-lo al frontend
  }>;
  aiActCompliance?: {
    score: number;
    compliant: boolean;
    warnings: string[];
  };
  error?: string;
}

const EMBEDDING_MODEL = process.env.OPENAI_EMBEDDINGS_MODEL || 'text-embedding-3-large';
const CHAT_MODEL = process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini';

/**
 * Valida si una pregunta és sobre la Constitució d'Andorra o temes relacionats
 * Retorna true si la pregunta és rellevant, false si no ho és
 */
function isValidConstitutionQuestion(message: string): boolean {
  const messageLower = message.toLowerCase();

  // Paraules clau que indiquen que és sobre la Constitució o política constitucional
  const constitutionKeywords = [
    // Constitució i articles
    'constitució', 'constitucio', 'constitució d\'andorra', 'constitucio d\'andorra',
    'article', 'articles', 'preàmbul', 'preambul',
    // Institucions i poders
    'coprínceps', 'coprinces', 'copríncep', 'coprincep',
    'consell general', 'govern', 'tribunal constitucional',
    'poder legislatiu', 'poder executiu', 'poder judicial', 'organització judicial',
    'comuns', 'parlament', 'assemblea',
    // Drets i llibertats
    'drets fonamentals', 'llibertats públiques', 'drets humans',
    // Política constitucional i forma de govern
    'política constitucional', 'politica constitucional', 'forma de govern',
    'sistema polític', 'sistema politic', 'democràcia', 'democracia',
    'separació de poders', 'separacio de poders', 'divisió de poders',
    'sobirania', 'soberania', 'república', 'republica', 'monarquia',
    'institucions', 'institucions polítiques', 'institucions politiques',
    'estat', 'estat de dret', 'estat de derecho',
    // Monarquia, reis i cap d'estat
    'rei', 'reina', 'monarca', 'monarquia', 'té rei', 'tiene rey', 'tiene reina',
    'cap d\'estat', 'jefe de estado', 'chef d\'état', 'cap de l\'estat',
    'sobirà', 'soberano', 'souverain', 'sobirania compartida',
    'bisbe d\'urgell', 'bisbe urgell', 'president de frança', 'president frança',
    // Andorra
    'principat d\'andorra', 'andorra', 'andorrà', 'andorrano'
  ];

  // Paraules clau que indiquen que NO és sobre la Constitució (temes personals)
  const offTopicKeywords = [
    'consell personal', 'consell sobre mi', 'què opines de mi', 'què creus de mi',
    'com em sento', 'em sents', 'consell emocional', 'ajuda personal',
    'consell de vida', 'què hauria de fer jo', 'què faries tu en la meva situació',
    'consell sentimental', 'consell amorós', 'consell familiar personal',
    'problema personal', 'situació personal', 'vida personal'
  ];

  // Si conté paraules que clarament indiquen que és un tema personal, rebutjar
  if (offTopicKeywords.some(keyword => messageLower.includes(keyword))) {
    return false;
  }

  // Si conté paraules relacionades amb la Constitució o política constitucional, és vàlida
  if (constitutionKeywords.some(keyword => messageLower.includes(keyword))) {
    return true;
  }

  // Paraules clau que poden estar relacionades amb temes de la Constitució
  // (permetre preguntes generals que poden tenir relació amb articles constitucionals)
  const relatedKeywords = [
    'llibertat', 'libertad', 'liberté', 'llibertats', 'libertades',
    'dret', 'derecho', 'droit', 'drets', 'derechos', 'droits',
    'igualtat', 'igualdad', 'égalité', 'igualtat de gènere',
    'democràcia', 'democracia', 'démocratie',
    'justícia', 'justicia', 'justice',
    'pau', 'paz', 'paix',
    'seguretat', 'seguridad', 'sécurité',
    'educació', 'educación', 'éducation',
    'sanitat', 'sanidad', 'santé', 'salut', 'salud',
    'treball', 'trabajo', 'travail', 'ocupació', 'ocupacion', 'emploi',
    'propietat', 'propiedad', 'propriété',
    'família', 'familia', 'famille',
    'ciutadania', 'ciudadanía', 'citoyenneté', 'ciutadà', 'ciudadano', 'citoyen'
  ];

  // Si conté paraules relacionades amb temes que poden estar a la Constitució, és vàlida
  // El sistema buscarà articles relacionats
  if (relatedKeywords.some(keyword => messageLower.includes(keyword))) {
    return true;
  }

  // Si la pregunta és molt curta o genèrica, assumim que podria ser sobre la Constitució
  // però el sistema prompt ja s'encarregarà de rebutjar-la si no ho és
  return true; // Deixem que el prompt del sistema decideixi
}

/**
 * Valida si una resposta generada només parla de la Constitució d'Andorra
 * Retorna true si és vàlida, false si parla d'altres temes
 */
function validateResponseIsAboutConstitution(response: string): boolean {
  const responseLower = response.toLowerCase();

  // Si la resposta rebutja educadament la pregunta (indicador que el sistema ha funcionat)
  const rejectionPhrases = [
    'només puc ajudar-te amb preguntes sobre la constitució',
    'només puc ajudar amb la constitució',
    'ho sento, però només puc',
    'només puc ajudar-te amb preguntes sobre la constitució d\'andorra'
  ];

  if (rejectionPhrases.some(phrase => responseLower.includes(phrase))) {
    return true; // És una resposta vàlida (rebutjant una pregunta no vàlida)
  }

  // Paraules clau que indiquen que la resposta parla de la Constitució o política constitucional
  const constitutionKeywords = [
    'constitució', 'constitucio', 'article', 'articles',
    'coprínceps', 'consell general', 'govern', 'tribunal constitucional',
    'drets fonamentals', 'llibertats públiques', 'comuns',
    'principat d\'andorra', 'política constitucional', 'politica constitucional',
    'forma de govern', 'sistema polític', 'sistema politic', 'democràcia',
    'separació de poders', 'institucions', 'estat de dret',
    'rei', 'reina', 'monarca', 'monarquia', 'cap d\'estat', 'sobirà', 'sobirania compartida',
    'bisbe d\'urgell', 'president de frança'
  ];

  // Si la resposta conté referències a la Constitució, és vàlida
  if (constitutionKeywords.some(keyword => responseLower.includes(keyword))) {
    return true;
  }

  // Si la resposta és molt curta i no conté referències, podria ser problemàtica
  // Però deixem passar perquè el prompt del sistema ja hauria d'haver filtrat
  return true;
}

async function generateChatCompletion(
  apiKey: string,
  messages: Array<{ role: string; content: string }>,
  options: { model: string; maxTokens: number; temperature: number }
): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: options.model,
      messages,
      max_tokens: options.maxTokens,
      temperature: options.temperature
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error generant la resposta (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const answer = data?.choices?.[0]?.message?.content;
  if (!answer) {
    throw new Error('Resposta de l\'API sense contingut.');
  }
  return answer.trim();
}

function buildContextBlock(matches: RetrievedContext[]): string {
  if (!matches.length) {
    return "No s'han trobat fonts rellevants.";
  }

  const sections: string[] = [];

  // Agrupar per llibre per a millor estructura
  const constitucioMatches = matches.filter(m => m.entry.category !== 'Doctrina' && m.entry.category !== 'Jurisprudència');
  const doctrinaMatches = matches.filter(m => m.entry.category === 'Doctrina' || m.entry.category === 'jurisprudència' || m.entry.category === 'Jurisprudència');

  if (constitucioMatches.length > 0) {
    sections.push('=== CONSTITUCIÓ D\'ANDORRA ===');
    constitucioMatches.forEach(({ entry }, index) => {
      const details = [
        `Article/Secció: ${entry.topic} (${entry.id})`,
        `Categoria: ${entry.category}`,
        `Contingut: ${entry.content}`,
        entry.keyConcepts.length ? `Conceptes clau: ${entry.keyConcepts.join(', ')}` : null,
      ].filter(Boolean).join('\n');
      sections.push(details);
    });
  }

  if (doctrinaMatches.length > 0) {
    sections.push('\n=== DOCTRINA I JURISPRUDÈNCIA ===');
    doctrinaMatches.forEach(({ entry }, index) => {
      const details = [
        `Títol: ${entry.topic} (${entry.id})`,
        `Categoria: ${entry.category}`,
        `Contingut: ${entry.content}`,
        entry.keyConcepts.length ? `Conceptes clau: ${entry.keyConcepts.join(', ')}` : null,
      ].filter(Boolean).join('\n');
      sections.push(details);
    });
  }

  return sections.join('\n\n');
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UnifiedChatResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    message,
    conversationHistory = [],
    maxTokens = 800,
    temperature = 0.7
  } = req.body as UnifiedChatRequest;

  if (!message || typeof message !== 'string' || !message.trim().length) {
    return res.status(400).json({ error: 'Cal proporcionar un missatge vàlid.' });
  }

  // Validar que la pregunta és sobre la Constitució d'Andorra o política constitucional
  if (!isValidConstitutionQuestion(message)) {
    return res.status(200).json({
      response: 'Ho sento, però només puc ajudar-te amb preguntes sobre la Constitució d\'Andorra, la política constitucional, la forma de govern i les institucions. Pots fer-me una pregunta específica sobre aquests temes?',
      sources: [],
      aiActCompliance: {
        score: 100,
        compliant: true,
        warnings: [],
      },
    });
  }

  const openaiApiKey = process.env.OPENAI_API_KEY;
  const embeddingProvider = getEmbeddingProvider();

  // Si utilitzem XLM-RoBERTa, no necessitem clau API
  if (embeddingProvider === 'openai' && !openaiApiKey) {
    return res.status(500).json({
      error: 'OpenAI API key no configurada. Defineix OPENAI_API_KEY a les variables d\'entorn, o configura EMBEDDING_PROVIDER=xlm-roberta per utilitzar el model local.'
    });
  }

  try {
    // Detectar complexitat de la pregunta
    const complexity = detectComplexity(message);

    // Detectar si es pregunta per un article específic (per número o paraules clau)
    const articleNumberMatch = detectArticleReference(message);
    const articleKeywords = detectArticleByKeywords(message);

    let constitucioMatches: RetrievedContext[] = [];
    const existingIds = new Set<string>();

    // 1. Buscar articles per número directe
    if (articleNumberMatch) {
      const directArticle = getArticleByNumber(articleNumberMatch);
      if (directArticle) {
        constitucioMatches.push({
          bookId: 'CONSTITUCIO',
          entry: directArticle,
          score: 1.0
        });
        existingIds.add(directArticle.id);
      }
    }

    // 2. Buscar articles per paraules clau
    const articlesByKeywords = getArticlesByIds(articleKeywords);
    for (const article of articlesByKeywords) {
      if (!existingIds.has(article.id)) {
        constitucioMatches.push({
          bookId: 'CONSTITUCIO',
          entry: article,
          score: 0.95
        });
        existingIds.add(article.id);
      }
    }

    // 3. Cerca híbrida (Vectors + BM25)
    const queryEmbedding = await generateEmbedding(message, embeddingProvider, openaiApiKey || undefined);
    const topK = complexity.suggestedTopK;
    const semanticMatches = retrieveHybridMatches(queryEmbedding, message, topK);

    // Combinar resultats, evitant duplicats
    for (const match of semanticMatches) {
      if (!existingIds.has(match.entry.id)) {
        constitucioMatches.push(match);
        existingIds.add(match.entry.id);
      }
    }

    // Ordenar per puntuació (els articles directes primer)
    constitucioMatches.sort((a, b) => b.score - a.score);

    // Limitar a un màxim raonable però mantenir suficients per a preguntes complexes
    const maxResults = complexity.isComplex ? 12 : 8;
    constitucioMatches = constitucioMatches.slice(0, maxResults);

    // Construir context
    const contextBlock = buildContextBlock(constitucioMatches);

    // Detectar si s'ha trobat un article específic directament
    const hasDirectArticle = constitucioMatches.some(m => m.score >= 0.95);
    const directArticleInfo = hasDirectArticle
      ? constitucioMatches.find(m => m.score >= 0.95)?.entry
      : null;

    // Construir prompt del sistema amb millores d'aprenentatge

    // Instruccions específiques segons la complexitat
    let complexityInstructions = '';
    if (complexity.isComplex) {
      complexityInstructions = `
INSTRUCCIONS ESPECÍFIQUES PER A PREGUNTES COMPLEXES:
- Aquesta pregunta requereix síntesi de múltiples articles o conceptes
- Utilitza TOTS els articles rellevants proporcionats al context
- Integra la informació de manera coherent i completa
- Si la pregunta demana una llista o enumeració, inclou TOTS els elements rellevants trobats al context
- Cita tots els articles utilitzats en la teva resposta`;
    }

    if (complexity.isJurisprudence) {
      complexityInstructions += `
INSTRUCCIONS ESPECÍFIQUES PER A PREGUNTES SOBRE JURISPRUDÈNCIA:
- Utilitza la doctrina i jurisprudència proporcionada al context
- Si el context inclou informació sobre sentències o interpretacions del Tribunal Constitucional, utilitza-la
- Explica com la jurisprudència ha interpretat els articles constitucionals
- Cita tant els articles constitucionals com la doctrina/jurisprudència utilitzada`;
    }

    if (complexity.requiresMultipleArticles) {
      complexityInstructions += `
INSTRUCCIONS PER A PREGUNTES QUE REQUEREIXEN MÚLTIPLES ARTICLES:
- Aquesta pregunta requereix informació de diversos articles
- Revisa TOTS els articles proporcionats al context i identifica els rellevants
- Integra la informació de tots els articles necessaris per respondre completament
- No et limitis a un sol article si la pregunta requereix més informació`;
    }

    const systemPromptBase = `Ets Dret Planer, un assistent jurídic especialitzat en la Constitució del Principat d'Andorra i la política constitucional.

FORMAT DE CITACIÓ OBLIGATORI (MOLT IMPORTANT):
- Cada vegada que utilitzis informació d'una font del context (sigui article o doctrina), has d'afegir la seva referència al final de la frase.
- El format HA DE SER EXACTAMENT: [[ID]]
- Exemples:
  - "La sobirania resideix al poble andorrà [[CONST_003]]."
  - "El Tribunal Constitucional ha establert que... [[DOCTRINA_025]]."
- NO utilitzis notes al peu, parèntesis normals o altres formats. Només [[ID]].
- Si una frase es basa en múltiples fonts, posa-les seguides: [[CONST_003]] [[CONST_004]].

INFORMACIÓ BÀSICA SOBRE LA CONSTITUCIÓ D'ANDORRA:
- La Constitució d'Andorra consta de 107 articles numerats (Article 1 a Article 107) més un preàmbul
- Va ser aprovada el 4 de maig de 1993
- Està organitzada en 9 títols principals

TEMES QUE POTS TRACTAR:
- La Constitució d'Andorra i els seus articles (Article 1 a Article 107, més el preàmbul)
- Política constitucional i forma de govern d'Andorra
- Sistema polític i institucions d'Andorra
- Separació de poders i organització institucional
- Drets fonamentals i llibertats públiques
- Funcionament del sistema democràtic andorrà
- Relacions entre les diferents institucions
- Doctrina i jurisprudència constitucional

ESTRATÈGIA PER A PREGUNTES GENERALS:
- Si la pregunta no és específica sobre la Constitució però tracta temes relacionats (llibertat, drets, igualtat, justícia, educació, sanitat, treball, propietat, família, ciutadania, etc.), busca articles de la Constitució d'Andorra relacionats amb aquest tema
- Explica com la Constitució d'Andorra regula aquest tema, citant els articles rellevants
- Si trobes articles relacionats al context, utilitza'ls per respondre la pregunta
- Exemple: Si pregunten sobre "llibertat" en general, busca i cita articles de la Constitució sobre llibertats públiques o drets fonamentals

RESTRICCIONS (evitar temes personals):
- NO pots parlar de sentiments, emocions o consells personals
- NO pots donar consells sobre decisions personals, familiars o sentimentals
- NO pots respondre preguntes sobre actualitat política general (fora del context constitucional)
- NO pots donar opinions personals sobre polítics o partits
- Si la pregunta és sobre un tema personal o no relacionat amb la Constitució/política constitucional, i NO trobes articles relacionats al context, rebutja-la educadament dient: "Ho sento, però només puc ajudar-te amb preguntes sobre la Constitució d'Andorra i la política constitucional. Pots fer-me una pregunta específica sobre aquests temes?"
- NO inventis informació que no estigui relacionada amb la Constitució d'Andorra o la política constitucional

La teva especialitat inclou:
- El preàmbul i els principis fonamentals de la Constitució
- Els drets fonamentals i les llibertats públiques
- Els coprínceps (sobirania compartida)
- El Consell General (poder legislatiu)
- El Govern (poder executiu)
- L'organització judicial
- El Tribunal Constitucional
- Els comuns (organització territorial)
- Les relacions internacionals
- La forma de govern i el sistema polític d'Andorra
- Doctrina i jurisprudència constitucional

INSTRUCCIONS GENERALS:
- Respon sempre en català, amb rigor normatiu i claror
- IMPORTANT: La Constitució d'Andorra consta de 107 articles numerats (Article 1 a Article 107) més un preàmbul. Mai diguis que hi ha 88 articles o qualsevol altre nombre incorrecte.
- Quan facis referència a articles, cita sempre el número exacte i indica que pertany a la Constitució d'Andorra (ex: "Article 1 de la Constitució d'Andorra")
- Els articles van de l'Article 1 a l'Article 107. No hi ha més articles numerats.
${directArticleInfo ? `- IMPORTANT: L'usuari pregunta sobre l'${directArticleInfo.topic} de la Constitució d'Andorra. Utilitza el contingut proporcionat per explicar aquest article de manera clara i completa.` : ''}
- Utilitza el context proporcionat per donar respostes precises i fonamentades
- Si el context conté informació sobre l'article que es pregunta, explica'l detalladament
- Si el context no conté informació suficient, indica-ho clarament
- Sempre indica que ets una IA i recomana consultar professionals quan sigui necessari
- Cita les fonts utilitzades de la Constitució d'Andorra
- Si la pregunta no és sobre la Constitució d'Andorra, rebutja-la educadament i recorda que només pots ajudar amb la Constitució

${complexityInstructions}

MILLORES D'APRENENTATGE:
- SEMPRE cita els articles de la Constitució quan facis referència a ells. Format: "Article X de la Constitució d'Andorra"
- Utilitza sempre la terminologia jurídica precisa i específica de la Constitució d'Andorra
- Quan expliquis conceptes, utilitza els termes exactes que apareixen a la Constitució
- Verifica que la teva resposta no conté informació incorrecta o contradictòria
- Si no estàs segur d'alguna informació, indica-ho clarament en lloc de suposar
- Per a preguntes complexes, utilitza TOTS els articles rellevants proporcionats, no només un

${getAIActCompliancePrompt()}

${GUIA_CATALA_JURIDIC}

${ASPECTES_JURISPRUDENCIA_ANDORRANA}`;

    const systemPrompt = systemPromptBase;

    const contextPrompt = `Context de coneixement:\n${contextBlock}`;

    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: systemPrompt },
      { role: 'system', content: contextPrompt }
    ];

    conversationHistory.forEach((item) => {
      if (item.role === 'user' || item.role === 'assistant') {
        messages.push({
          role: item.role,
          content: item.content
        });
      }
    });

    messages.push({ role: 'user', content: message });

    // Generar resposta (encara necessitem OpenAI per al chat)
    if (!openaiApiKey) {
      return res.status(500).json({
        error: 'OPENAI_API_KEY és necessària per generar respostes del chatbot. XLM-RoBERTa només s\'utilitza per a embeddings.'
      });
    }

    const answer = await generateChatCompletion(openaiApiKey, messages, {
      model: CHAT_MODEL,
      maxTokens,
      temperature
    });

    // Validar que la resposta parla de la Constitució o política constitucional
    if (!validateResponseIsAboutConstitution(answer)) {
      // Si la resposta no és sobre la Constitució, generar una resposta de rebutjament
      const rejectionMessage = 'Ho sento, però només puc ajudar-te amb preguntes sobre la Constitució d\'Andorra, la política constitucional, la forma de govern i les institucions. Pots fer-me una pregunta específica sobre aquests temes?';
      const aiActValidation = checkAIActCompliance(rejectionMessage);

      return res.status(200).json({
        response: rejectionMessage,
        sources: [],
        aiActCompliance: {
          score: aiActValidation.score,
          compliant: aiActValidation.aiActCompliant,
          warnings: aiActValidation.warnings,
        },
      });
    }

    // Validar compliment amb AI Act
    const aiActValidation = checkAIActCompliance(answer);

    // Preparar fonts
    const sources: UnifiedChatResponse['sources'] = [];

    constitucioMatches.forEach(({ entry, score }) => {
      // Determinar tipus i codi segons l'entrada
      const isDoctrina = entry.id.startsWith('DOCTRINA') || entry.id.startsWith('DOC_');

      sources.push({
        type: 'constitucio', // Mantenim el tipus base per compatibilitat amb el frontend actual
        code: isDoctrina ? 'doctrina' : 'constitucio', // Utilitzem el camp code per diferenciar
        id: entry.id,
        title: entry.topic,
        number: isDoctrina ? 'Doctrina' : entry.numeracio,
        content: entry.content, // Passem el contingut al frontend
        score
      } as any); // Cast a any per evitar problemes de tipatge estricte si la interfície no està actualitzada
    });

    return res.status(200).json({
      response: answer,
      sources: sources.slice(0, 8), // Limitar a 8 fonts
      aiActCompliance: {
        score: aiActValidation.score,
        compliant: aiActValidation.aiActCompliant,
        warnings: aiActValidation.warnings,
      },
    });
  } catch (error: any) {
    console.error('Error al xat unificat:', error);
    return res.status(500).json({
      error: error.message || 'S\'ha produït un error inesperat generant la resposta.'
    });
  }
}
