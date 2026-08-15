import type { NextApiRequest, NextApiResponse } from 'next';
import { generateText } from '../../lib/llm';
import { checkAIActCompliance, getAIActCompliancePrompt } from '../../lib/rag/quality-assessment';
import { validateResponseQuality } from '../../lib/rag/response-quality';
import { RagUnavailableError, retrieveHybridMatches, getArticleById } from '../../lib/rag/corpus';
import { RetrievedContext } from '../../lib/rag/types';
import { detectArticleReference, detectArticleByKeywords, detectComplexity } from '../../lib/rag/detect-complexity';
import { getJurisprudenciaForArticle } from '../../data/jurisprudencia-andorra';
import { articlesConstitucio } from '../../data/codis/constitucio/articles-template';
import { InterpretacioIA } from '../../data/codis/types';
import { generateInterpretacioIA, type InterpretacioRequest } from '../../lib/services/interpretacio-ia';
import { appendTraceabilityLog, buildRagContextFingerprint } from '../../lib/traceability/audit-log';
import { unifiedChatSchema, type UnifiedChatInput } from '../../lib/api/schemas';
import { enforceRateLimit } from '../../lib/security/rate-limit';
import { logEvent, requestIdFromHeader } from '../../lib/observability/logger';

// ============================================================================
// RAG ACTIVAT - Recuperació de context de la Constitució d'Andorra
// ============================================================================

type LocaleChat = 'ca' | 'es' | 'fr';

type UnifiedChatRequest = UnifiedChatInput;

type UnifiedRequest = UnifiedChatRequest | InterpretacioRequest;

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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UnifiedChatResponse | InterpretacioIA>
) {
  return handleUnifiedChatRequest(req, res);
}

export async function handleUnifiedChatRequest(
  req: NextApiRequest,
  res: NextApiResponse<UnifiedChatResponse | InterpretacioIA>,
  skipRateLimit = false,
) {
  const requestStartedAt = Date.now();
  const requestId = requestIdFromHeader(req.headers['x-request-id']);
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const requestBody = req.body as UnifiedRequest;

  if (!skipRateLimit && !(await enforceRateLimit(req, res, 'ai', 1))) {
    return res.status(429).json({ error: buildRateLimitTrilingualMessage() });
  }

  // Compatibilitat amb l'antic endpoint /api/interpretacio-ia
  if (isInterpretacioRequest(requestBody)) {
    try {
      const interpretacio = await generateInterpretacioIA(requestBody);
      return res.status(200).json(interpretacio);
    } catch (error: any) {
      return res.status(500).json({ error: error?.message || 'Error al generar la interpretació' });
    }
  }

  const parsed = unifiedChatSchema.safeParse(requestBody);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0]?.message || 'Petició no vàlida.' });
  }

  const { message, conversationHistory, locale } = parsed.data;

  const validLocale: LocaleChat = ['ca', 'es', 'fr'].includes(locale) ? locale : 'ca';

  // Validació portada de /api/rag/chat: detectar articles inexistents abans de processar
  const invalidRequestArticles = findUnknownArticles(message);
  if (invalidRequestArticles.length) {
    const invalidMsg =
      validLocale === 'es'
        ? `Los artículos siguientes no existen en la Constitución: ${invalidRequestArticles.join(', ')}. Revisa la numeración e inténtalo de nuevo.`
        : validLocale === 'fr'
          ? `Les articles suivants n'existent pas dans la Constitution : ${invalidRequestArticles.join(', ')}. Vérifiez la numérotation et réessayez.`
          : `Els articles següents no existeixen a la Constitució: ${invalidRequestArticles.join(', ')}. Revisa la numeració i torna-ho a intentar.`;
    return res.status(400).json({ error: invalidMsg });
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
    // 2. Recuperar context híbrid a Upstash. Els articles explícits tenen fallback local.
    const articleNumber = detectArticleReference(message);
    const articleKeywords = detectArticleByKeywords(message);
    const complexity = detectComplexity(message);
    const matchesMap = new Map<string, RetrievedContext>();

    let ragUnavailable = false;
    const ragStartedAt = Date.now();
    try {
      const topK = Math.max(5, complexity.suggestedTopK);
          
          // Prioritzar articles de la Constitució només quan la consulta ho demana
          // explícitament. Les preguntes doctrinals, històriques o sobre el dret
          // andorrà en general han de poder recuperar doctrina en igualtat de condicions.
      const isConstitutionQuestion =
        message.toLowerCase().includes('article') ||
        message.toLowerCase().includes('constitució') ||
        message.toLowerCase().includes('constitución') ||
        articleNumber !== null ||
        articleKeywords.length > 0;
          
      const retrievedMatches = await retrieveHybridMatches(message, topK, isConstitutionQuestion);
      retrievedMatches.forEach((match) => matchesMap.set(match.entry.id, match));
      logEvent('rag_complete', {
        requestId,
        railwayRequestId: req.headers['x-request-id'] || null,
        backend: 'upstash',
        durationMs: Date.now() - ragStartedAt,
        sourceCount: retrievedMatches.length,
      });
    } catch (ragError: unknown) {
      ragUnavailable = true;
      console.error(JSON.stringify({
        event: 'rag_error',
        backend: 'upstash',
        error: ragError instanceof Error ? ragError.message : String(ragError),
      }));
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

    if (ragUnavailable && matchesMap.size === 0) {
      const unavailable = validLocale === 'es'
        ? 'La búsqueda jurídica no está disponible temporalmente.'
        : validLocale === 'fr'
          ? 'La recherche juridique est temporairement indisponible.'
          : 'La cerca jurídica no està disponible temporalment.';
      return res.status(503).json({ error: unavailable });
    }

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
    const defaultTopK = Math.max(5, complexity.suggestedTopK);
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
Per a la doctrina, utilitza sempre l'identificador exacte que apareix entre parèntesis
al costat del títol (per exemple, [[DOCTRINA_USOS_COSTUMS_001]]). No escriguis
només "Doctrina" ni atribueixis una afirmació a una font doctrinal sense el seu ID.

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
    const llmStartedAt = Date.now();
    const generatedText = await generateText(finalMessages, {
      maxTokens: 800,
      temperature: 0.5,
    });
    logEvent('llm_complete', {
      requestId,
      backend: process.env.LLM_PROVIDER || 'groq',
      durationMs: Date.now() - llmStartedAt,
      sourceCount: matches.length,
    });

    // Validació portada de /api/rag/chat: rebutjar respostes amb articles inexistents
    const invalidAnswerArticles = findUnknownArticles(generatedText);
    if (invalidAnswerArticles.length) {
      const invalidAnswerMsg =
        validLocale === 'es'
          ? `La respuesta generada mencionaba artículos inexistentes (${invalidAnswerArticles.join(', ')}). Reformula la consulta o especifica un artículo válido.`
          : validLocale === 'fr'
            ? `La réponse générée mentionnait des articles inexistants (${invalidAnswerArticles.join(', ')}). Reformulez la requête ou précisez un article valide.`
            : `La resposta generada mencionava articles inexistents (${invalidAnswerArticles.join(', ')}). Reformula la consulta o especifica un article vàlid.`;
      return res.status(502).json({ error: invalidAnswerMsg });
    }

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

    // Traçabilitat mínima: només hashos i metadades (sense text personal en clar)
    try {
      const ragContextFingerprint = buildRagContextFingerprint(
        matches.map((m) => ({
          id: m.entry.id,
          content: m.entry.content,
        }))
      );

      await appendTraceabilityLog({
        userMessage: message,
        ragContextFingerprint,
        generatedResponse: generatedText,
        scores: {
          aiActCompliance: {
            score: complianceResult.score,
            compliant: complianceResult.aiActCompliant,
            warnings: complianceResult.warnings,
          },
          responseQuality: {
            valid: qualityResult.valid,
            score: qualityResult.score,
            warnings: qualityResult.warnings,
            citedInResponse: qualityResult.citedInResponse,
            citedNotInContext: qualityResult.citedNotInContext,
            suggestions: qualityResult.suggestions,
          },
        },
      });
    } catch (traceabilityError: any) {
      console.error('⚠️ Error registrant traçabilitat:', traceabilityError?.message || traceabilityError);
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
    logEvent('chat_complete', {
      requestId,
      durationMs: Date.now() - requestStartedAt,
      sourceCount: sources.length,
      ragBackend: ragUnavailable ? 'local-exact-fallback' : 'upstash',
    });
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
    logEvent('chat_error', {
      requestId,
      durationMs: Date.now() - requestStartedAt,
      error: error instanceof Error ? error.name : 'UnknownError',
    });
    const messageError = error?.message || 'Error intern del servidor';
    
    if (error instanceof RagUnavailableError) {
      return res.status(503).json({ 
        error: 'La cerca jurídica no està disponible temporalment.'
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

function isInterpretacioRequest(body: UnifiedRequest): body is InterpretacioRequest {
  const candidate = body as Partial<InterpretacioRequest>;
  const validIdioma = candidate.idioma === 'ca' || candidate.idioma === 'es' || candidate.idioma === 'fr';
  return !!candidate.article_id && !!candidate.text_oficial && !!candidate.numeracio && validIdioma;
}

const articleIndex = buildArticleIndex();

function buildArticleIndex(): Set<string> {
  const set = new Set<string>();
  articlesConstitucio.forEach((article) => {
    const normalized = normalizeArticleNumber(article.numeracio);
    if (normalized) {
      set.add(normalized);
    }
  });
  return set;
}

function findUnknownArticles(text: string): string[] {
  const references = extractArticleNumbers(text);
  if (!references.length) {
    return [];
  }
  return references.filter((ref) => !articleIndex.has(ref));
}

function extractArticleNumbers(text: string): string[] {
  const pattern = /(?:article|art\.?)\s+(\d+)/gi;
  const results = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    const normalized = normalizeArticleNumber(match[1]);
    if (normalized) {
      results.add(normalized);
    }
  }
  return Array.from(results);
}

function normalizeArticleNumber(raw?: string | null): string | null {
  if (!raw) {
    return null;
  }
  return raw.replace(/^article\s+/i, '').trim();
}

function buildRateLimitTrilingualMessage(): string {
  const msgCa = 'Has superat el límit de peticions. Torna-ho a provar més tard.';
  const msgEs = 'Has superado el límite de peticiones. Vuelve a intentarlo más tarde.';
  const msgFr = 'Vous avez dépassé la limite de requêtes. Réessayez plus tard.';
  return `${msgCa} | ${msgEs} | ${msgFr}`;
}
