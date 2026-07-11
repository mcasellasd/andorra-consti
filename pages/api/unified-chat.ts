import type { NextApiRequest, NextApiResponse } from 'next';
import { generateText } from '../../lib/llm';
import { checkAIActCompliance, getAIActCompliancePrompt } from '../../lib/rag/quality-assessment';
import { validateResponseQuality } from '../../lib/rag/response-quality';
import { generateEmbedding, getEmbeddingProvider } from '../../lib/embeddings';
import { retrieveTopMatches, getArticleByNumber, getArticleById } from '../../lib/rag/corpus';
import { RetrievedContext } from '../../lib/rag/types';
import { detectArticleReference, detectArticleByKeywords, detectComplexity } from '../../lib/rag/detect-complexity';
import { getJurisprudenciaForArticle } from '../../data/jurisprudencia-andorra';

// ============================================================================
// RAG ACTIVAT - Recuperació de context de la Constitució d'Andorra
// ============================================================================

type LocaleChat = 'ca' | 'es' | 'fr';

interface UnifiedChatRequest {
  message: string;
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  locale?: LocaleChat;
  maxTokens?: number;
  temperature?: number;
}

interface UnifiedChatResponse {
  response?: string;
  sources?: Array<any>;
  aiActCompliance?: {
    score: number;
    compliant: boolean;
    warnings: string[];
  };
  responseQuality?: {
    valid: boolean;
    score: number;
    warnings: string[];
    citedInResponse: string[];
    citedNotInContext: string[];
    suggestions: string[];
  };
  error?: string;
}

/**
 * Valida si una pregunta és sobre la Constitució d'Andorra o temes relacionats
 */
function isValidConstitutionQuestion(message: string): boolean {
  const messageLower = message.toLowerCase();

  // Paraules clau bàsiques
  const keywords = ['constituci', 'dret', 'andorra', 'principat', 'llei', 'govern', 'consell general', 'copríncep', 'tribunal'];
  if (keywords.some(k => messageLower.includes(k))) return true;

  // Si no té paraules clau pero és una pregunta raonable, deixem passar
  // (La IA ja filtrarà si no té sentit)
  return true;
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
    locale = 'ca',
    maxTokens = 800,
    temperature = 0.5
  } = req.body as UnifiedChatRequest;

  const validLocale: LocaleChat = ['ca', 'es', 'fr'].includes(locale) ? locale : 'ca';

  if (!message || !message.trim()) {
    const errMsg = validLocale === 'es' ? 'Mensaje vacío.' : validLocale === 'fr' ? 'Message vide.' : 'Missatge buit.';
    return res.status(400).json({ error: errMsg });
  }

  // 1. Validació bàsica
  if (!isValidConstitutionQuestion(message)) {
    const outOfScopeMsg =
      validLocale === 'es'
        ? "Lo siento, solo puedo contestar sobre la Constitución de Andorra."
        : validLocale === 'fr'
          ? "Désolé, je ne peux répondre que sur la Constitution d'Andorre."
          : "Ho sento, només puc contestar sobre la Constitució d'Andorra.";
    return res.status(200).json({
      response: outOfScopeMsg,
      sources: []
    });
  }

  try {
    // 2. RAG (opcional): Generar embedding i recuperar context. Desactivat per defecte (RAG_ENABLED=true per activar)
    const articleNumber = detectArticleReference(message);
    const articleKeywords = detectArticleByKeywords(message);
    const complexity = detectComplexity(message);
    const matchesMap = new Map<string, RetrievedContext>();

    if (process.env.RAG_ENABLED === 'true') {
      const provider = getEmbeddingProvider();
      const openaiApiKey = process.env.OPENAI_API_KEY;
      
      // ⚠️ VERCEL WORKAROUND: Si no hi ha OPENAI_API_KEY, RAG es desactiva automàticament
      if (!openaiApiKey && provider === 'xlm-roberta') {
        console.warn('⚠️ RAG desactivat: No hi ha OPENAI_API_KEY a Vercel. Usant només mode sense context.');
      } else {
        try {
          console.log('🔍 Generant embedding i cercant context RAG...');
          const queryEmbedding = await generateEmbedding(message, provider, openaiApiKey);
          const topK = Math.max(5, complexity.suggestedTopK);
          
          // Prioritzar articles de la Constitució quan la pregunta és clarament constitucional
          // Detectem si la pregunta menciona "article", "constitució", o pregunta directament sobre la Constitució
          const isConstitutionQuestion = 
            message.toLowerCase().includes('article') ||
            message.toLowerCase().includes('constitució') ||
            message.toLowerCase().includes('constitución') ||
            articleNumber !== null ||
            articleKeywords.length > 0 ||
            isValidConstitutionQuestion(message);
          
          if (isConstitutionQuestion) {
            console.log('📜 Prioritzant articles de la Constitució sobre doctrina');
          }
          
          const semanticMatches = retrieveTopMatches(queryEmbedding, topK, undefined, isConstitutionQuestion);
          semanticMatches.forEach(match => matchesMap.set(match.entry.id, match));
        } catch (ragError: any) {
          // Si RAG falla (ex: out of memory, API error), continuar sense context
          console.error('❌ Error RAG (continuar sense context):', ragError?.message || ragError);
          // matchesMap es queda buit, el chat continuarà sense context del RAG
        }
      }

    // Si es detecta un article específic per número, afegir-lo (funciona amb o sense RAG)
    if (articleNumber) {
      const articleId = `CONST_${articleNumber.padStart(3, '0')}`;
      const specificArticle = getArticleById(articleId);
      if (specificArticle) {
        // Crear un RetrievedContext amb score alt per assegurar que s'inclou
        const articleContext: RetrievedContext = {
          entry: specificArticle,
          score: 1.0, // Score màxim per assegurar que s'inclou
          bookId: 'CONSTITUCIO'
        };
        matchesMap.set(articleId, articleContext);
        console.log(`✅ Article específic detectat i afegit: ${articleId}`);
      }
    }
    
    // Si es detecten articles per paraules clau, afegir-los també
    articleKeywords.forEach(articleId => {
      const specificArticle = getArticleById(articleId);
      if (specificArticle && !matchesMap.has(articleId)) {
        const articleContext: RetrievedContext = {
          entry: specificArticle,
          score: 0.95, // Score alt per assegurar que s'inclou
          bookId: 'CONSTITUCIO'
        };
        matchesMap.set(articleId, articleContext);
        console.log(`✅ Article detectat per paraules clau i afegit: ${articleId}`);
      }
    });

    // 🔍 Recuperar jurisprudència relacionada amb l'article detectat
    if (articleNumber) {
      const articleId = `CONST_${articleNumber.padStart(3, '0')}`;
      const relatedJurisprudence = getJurisprudenciaForArticle(articleId);
      
      if (relatedJurisprudence.length > 0) {
        console.log(`📋 Trobades ${relatedJurisprudence.length} sentències TC relacionades amb Article ${articleNumber}`);
        
        // Convertir sentències a KnowledgeEntry compatible amb RAG
        relatedJurisprudence.forEach((sentencia, idx) => {
          const sentenciaEntry = {
            id: sentencia.id,
            category: 'Jurisprudència',
            topic: sentencia.titol || `Sentència ${sentencia.numero}`,
            content: `${sentencia.tribunal} (${sentencia.data}): ${sentencia.resum}`,
            legalReference: sentencia.numero,
            keyConcepts: sentencia.tags || [],
          };
          
          const jurisprudenceContext: RetrievedContext = {
            entry: sentenciaEntry,
            score: 0.88 - (idx * 0.02), // Decreix lleument per cada sentència (0.88, 0.86, 0.84...)
            bookId: 'DOCTRINA' // Les sentències es categoritzen com doctrina per mantenir compatibilitat
          };
          
          // Afegir només si no está ja al map (evitar duplicats)
          if (!matchesMap.has(sentencia.id)) {
            matchesMap.set(sentencia.id, jurisprudenceContext);
            console.log(`  ✅ Sentència afegida: ${sentencia.id} - ${sentencia.tribunal}`);
          }
        });
      }
    }

    // Quan es pregunta per un article concret, reduïm el nombre de fonts per evitar confusions
    const defaultTopK = process.env.RAG_ENABLED === 'true' ? Math.max(5, complexity.suggestedTopK) : 10;
    const topK = articleNumber ? Math.min(5, defaultTopK) : defaultTopK;
    const matches = Array.from(matchesMap.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    // Construir bloc de context
    const contextBlock = buildContextBlock(matches);

    // Per locale es/fr: bloc amb el text oficial en català de cada article del context, per citar literalment (no traduir)
    const constitutionArticlesInContext = matches
      .filter((m) => isConstitutionArticle(m.entry))
      .map((m) => m.entry);
    const officialTextBlock =
      (validLocale === 'es' || validLocale === 'fr') && constitutionArticlesInContext.length > 0
        ? buildOfficialTextBlock(constitutionArticlesInContext, validLocale)
        : '';

    // 3. Construcció del Prompt amb RAG
    const aiActPrompt = getAIActCompliancePrompt();

    // Convertim l'historial del xat
    const messages = conversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // Instrucció d'idioma: explicació en la llengua de la interfície; el text literal de la llei NO es tradueix NUNCA
    const languageInstruction =
      validLocale === 'es'
        ? `[REGLA OBLIGATÒRIA - NO IGNORIS]
Respon la teva explicació en castellano, PERÒ:
- NUNCA traduzcas palabras, frases ni párrafos de la Constitución. La Constitución de Andorra está redactada en catalán y tiene valor jurídico solo en ese texto.
- Cuando cites un artículo, COPIA EXACTAMENTE el texto de la sección "TEXTOS OFICIALES PARA CITAR" más abajo (en catalán). No lo traduzcas.
- Solo tu comentario, explicación o resumen puede estar en castellano. El texto normativo entre comillas SIEMPRE en catalán.

${officialTextBlock}
`
        : validLocale === 'fr'
          ? `[RÈGLE OBLIGATOIRE - NE PAS IGNORER]
Réponds ton explication en français, MAIS:
- Ne traduis JAMAIS les mots, phrases ou paragraphes de la Constitution. La Constitution d'Andorre est rédigée en catalan.
- Quand tu cites un article, COPIE EXACTEMENT le texte de la section "TEXTES OFFICIELS À CITER" ci-dessous (en catalan). Ne le traduis pas.
- Seul ton commentaire, explication ou résumé peut être en français. Le texte normatif entre guillemets TOUJOURS en catalan.

${officialTextBlock}
`
          : '';

    // Instrucció extra quan la pregunta es refereix a un article concret
    const articleFocusInstruction = articleNumber
      ? `\nLa pregunta es refereix a l'Article ${articleNumber}. Assegura't que la teva resposta reflecteixi el contingut de l'Article ${articleNumber} del context i no atribueixis cap contingut d'un altre article a l'Article ${articleNumber}.\n`
      : '';

    // Prompt del Sistema amb context RAG
    const systemPrompt = `${languageInstruction}Ets un expert en la Constitució d'Andorra i Dret Andorrà.
Respon de manera clara, concisa i precisa.
Utilitza llenguatge planer (fàcil d'entendre).
Si no saps la resposta, digues-ho honestament.

${aiActPrompt}

IMPORTAT: Utilitza ÚNICAMENT la informació del context proporcionat. NO inventis articles ni lleis.
Si la informació del context no és suficient per respondre, digues-ho honestament.
El context pot incloure tant articles de la Constitució (CONST_XXX) com fragments de doctrina o jurisprudència (DOCTRINA_XXX). Has d’utilitzar totes les fonts rellevants del context per respondre; no t’limitïs només als articles si hi ha doctrina rellevant.

CITA ELS ARTICLES CORRECTAMENT:
- Quan citis la Constitució, indica SEMPRE el número d'article exacte (ex: "Article 19", "Article 3").
- El text literal dels articles (el que va entre cometes) ha de ser SEMPRE el del context, en català. No tradueixis mai les frases de la Constitució a un altre idioma.
- NO atribueixis mai el contingut d'un article a un altre. Cada bloc del context correspon a UN sol article o font; no barregis el contingut entre blocs.
- Si parles de més d'un article, indica clarament quin contingut pertany a quin article.
${articleFocusInstruction}

JERARQUIA NORMATIVA:
- La Constitució és la NORMA SUPREMA de l'ordenament jurídic andorrà (Article 3).
- Totes les lleis i normes deriven de la Constitució i estan subordinades a ella.
- Quan expliquis qualsevol dret, llibertat o norma, SEMPRE menciona que prové de la Constitució.
- Exemple: Si es diu que el català és la llengua oficial, ho és perquè ho estableix la Constitució (Article 2).
- Les lleis que emanen de la Constitució són norma superior respecte a altres normes, però sempre estan subordinades a la pròpia Constitució.

PLURALISME INTERPRETATIU:
- Si detectes que la doctrina o la jurisprudència presenten interpretacions diferents sobre un punt, NO ofereixis una única "veritat oficial".
- Exposa les diferents postures (ex: "Existeix debat doctrinal sobre...", "El Tribunal Constitucional ha matisat que...").
- Evita la "canonització" de conceptes jurídics oberts; mostra la complexitat quan sigui necessari.

CITACIONS EN EL TEXT (OBLIGATORI):
Quan utilitzis informació d'una font específica del context (sigui article o doctrina), has d'inserir l'ID de la font entre dobles claudàtors al final de la frase o paràgraf corresponent.
Format: [[ID]]
Exemple: "La sobirania resideix en el poble andorrà [[CONST_003]]."

Context (Constitució i doctrina):
${contextBlock}`;

    // Construïm la llista final de missatges
    const finalMessages = [
      { role: 'system', content: systemPrompt },
      ...messages,
      { role: 'user', content: message }
    ];

    // 4. Generació de Text (LLM) - Groq Llama-3.3-70B o fallback Hugging Face
    console.log('🤖 Generant resposta amb LLM i context RAG...');
    const generatedText = await generateText(finalMessages, {
      maxTokens,
      temperature,
    });

    // 5. Validació AI Act (Post-processat ràpid)
    const complianceResult = checkAIActCompliance(generatedText);

    // 6. Validació qualitativa: articles citats correctes respecte al context
    const contextEntryIds = matches.map((m) => m.entry.id);
    const qualityResult = validateResponseQuality(generatedText, contextEntryIds);

    // Si la resposta cita articles que no estaven al context, afegir avís visible
    let responseToReturn = generatedText;
    if (!qualityResult.valid && qualityResult.citedNotInContext.length > 0) {
      const articlesList = qualityResult.citedNotInContext.join(', ');
      const warningMsg =
        validLocale === 'es'
          ? `**Aviso:** La respuesta menciona el artículo o artículos ${articlesList}, que no constaban en el contexto consultado. Comprueba las referencias con la Constitución.\n\n`
          : validLocale === 'fr'
            ? `**Avertissement :** La réponse mentionne l'article ou les articles ${articlesList}, qui ne figuraient pas dans le contexte consulté. Vérifiez les références avec la Constitution.\n\n`
            : `**Avís:** La resposta menciona l'article o els articles ${articlesList}, que no figuraven en el context consultat. Verifiqueu les referències amb la Constitució.\n\n`;
      responseToReturn = warningMsg + generatedText;
    }

    // 7. Preparar fonts per retornar (tipus real: Constitució o Doctrina segons bookId)
    const sources = matches.map(({ entry, score, bookId }) => {
      const code = bookId === 'DOCTRINA' ? 'doctrina' : 'constitucio';
      return {
        type: code as 'constitucio' | 'doctrina',
        code,
        id: entry.id,
        title: entry.topic,
        number: entry.legalReference || undefined,
        score,
        content: entry.content?.substring(0, 200) || undefined
      };
    });

    // 8. Retornar resposta (inclou validació qualitativa)
    return res.status(200).json({
      response: responseToReturn,
      sources: sources,
      aiActCompliance: {
        score: complianceResult.score,
        compliant: complianceResult.aiActCompliant,
        warnings: complianceResult.warnings
      },
      responseQuality: {
        valid: qualityResult.valid,
        score: qualityResult.score,
        warnings: qualityResult.warnings,
        citedInResponse: qualityResult.citedInResponse,
        citedNotInContext: qualityResult.citedNotInContext,
        suggestions: qualityResult.suggestions
      }
    });

  } catch (error: any) {
    console.error('❌ Error API Chat:', error);
    const messageError = error?.message || 'Error intern del servidor';
    
    // Si és un error de RAG (embeddings no disponibles), retornar error específic
    if (messageError.includes('No hi ha embeddings disponibles')) {
      return res.status(503).json({ 
        error: 'El sistema RAG no està disponible. Assegura\'t que els embeddings estan generats.' 
      });
    }
    
    return res.status(500).json({ error: messageError });
  }
}

/**
 * Indica si una entrada del corpus és un article de la Constitució (CONST_XXX)
 */
function isConstitutionArticle(entry: { id: string; category?: string }): boolean {
  if (!entry.id.startsWith('CONST_')) return false;
  if (entry.id.startsWith('DOCTRINA_') || entry.id.startsWith('DOC_')) return false;
  const cat = (entry.category || '').toLowerCase();
  return cat !== 'doctrina' && cat !== 'jurisprudència';
}

/**
 * Extrau el número d'article des de l'ID (ex: CONST_019 -> 19, CONST_PREAMB -> Preàmbul)
 */
function articleNumberFromId(id: string): string {
  if (id === 'CONST_PREAMB') return 'Preàmbul';
  const match = id.match(/^CONST_(\d+)$/);
  return match ? match[1].replace(/^0+/, '') || match[1] : id;
}

/**
 * Per locale es/fr: bloc amb el text oficial en català de cada article, perquè el model el citi literalment (no tradueixi).
 */
function buildOfficialTextBlock(
  constitutionEntries: Array<{ id: string; content: string; legalReference?: string }>,
  locale: 'es' | 'fr'
): string {
  const title =
    locale === 'es'
      ? 'TEXTOS OFICIALES PARA CITAR (copia EXACTAMENTE entre comillas, en catalán):'
      : 'TEXTES OFFICIELS À CITER (copie EXACTEMENT entre guillemets, en catalan):';
  const lines = constitutionEntries.map((entry) => {
    const num = articleNumberFromId(entry.id);
    const label = locale === 'es' ? `Artículo ${num}` : locale === 'fr' ? `Article ${num}` : `Article ${num}`;
    const text = (entry.content || '').trim();
    return `- ${label}: «${text}»`;
  });
  return `\n${title}\n${lines.join('\n')}\n`;
}

/**
 * Construeix un bloc de context a partir dels resultats RAG.
 * Per articles de la Constitució, usa capçaleres clares per evitar que el model confongui articles.
 */
function buildContextBlock(matches: RetrievedContext[]): string {
  if (!matches.length) {
    return "No s'han trobat entrades de coneixement relacionades amb la Constitució.";
  }

  const sections = matches.map(({ entry }, index) => {
    const numLabel = articleNumberFromId(entry.id);
    const isConst = isConstitutionArticle(entry);

    const header = isConst
      ? `=== ARTICLE ${numLabel} (id: ${entry.id}) ===\nAquest text correspon únicament a l'Article ${numLabel}. No el confongueu amb altres articles.`
      : `Font ${index + 1}: ${entry.topic} (${entry.id})`;

    const details = [
      `Categoria: ${entry.category}`,
      entry.legalReference ? `Referència legal: ${entry.legalReference}` : null,
      entry.keyConcepts?.length
        ? `Conceptes clau: ${entry.keyConcepts.join(', ')}`
        : null,
      `Contingut: ${entry.content}`,
      entry.implications ? `Implicacions: ${entry.implications}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    return `${header}\n${details}`;
  });

  return sections.join('\n\n');
}

export const config = {
  maxDuration: 60,
};
