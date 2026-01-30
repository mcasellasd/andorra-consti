/**
 * Validació qualitativa de les respostes del xat
 * Comprova que els articles citats estan al context, no s'inventen referències, etc.
 */

import { getArticleById } from './corpus';

export interface ResponseQualityResult {
  valid: boolean;
  score: number;
  warnings: string[];
  /** Articles o IDs citats a la resposta (ex: "19", "3", "CONST_PREAMB") */
  citedInResponse: string[];
  /** Articles citats que NO estaven al context (possibles al·lucinacions) */
  citedNotInContext: string[];
  /** IDs del context que són articles de la Constitució (CONST_XXX) */
  contextArticleIds: string[];
  /** Recomanacions per millorar la resposta (ex. "No citis articles que no estan al context") */
  suggestions: string[];
}

/** Normalitza un número d'article a ID de corpus (ex: "19" -> "CONST_019") */
function toContextId(articleNumOrId: string): string {
  if (articleNumOrId === 'Preàmbul' || articleNumOrId.toUpperCase() === 'CONST_PREAMB') {
    return 'CONST_PREAMB';
  }
  const num = articleNumOrId.replace(/^CONST_/i, '').replace(/^0+/, '') || articleNumOrId;
  if (/^\d+$/.test(num)) {
    return `CONST_${num.padStart(3, '0')}`;
  }
  return articleNumOrId.toUpperCase().startsWith('CONST_') ? articleNumOrId : `CONST_${articleNumOrId.padStart(3, '0')}`;
}

/**
 * Extrau tots els números d'article o IDs citats a la resposta
 * (ex: "Article 19", "l'article 3", "articles 4 i 5", "CONST_019")
 */
export function extractCitedArticlesFromResponse(response: string): string[] {
  const cited = new Set<string>();
  const text = response;

  // Article N, l'article N, Article N, art. N, art N
  const articlePatterns = [
    /\barticle\s+(\d+)(?:\.\d+)?/gi,
    /\bl'article\s+(\d+)(?:\.\d+)?/gi,
    /\barticles\s+(\d+)(?:\s*(?:,|i|y)\s*(\d+))*(?:\s*i\s*(\d+))?/gi,
    /\bart\.?\s*(\d+)(?:\.\d+)?/gi,
  ];

  for (const pattern of articlePatterns) {
    let m: RegExpExecArray | null;
    const re = new RegExp(pattern.source, pattern.flags);
    while ((m = re.exec(text)) !== null) {
      cited.add(m[1]);
      if (m[2]) cited.add(m[2]);
      if (m[3]) cited.add(m[3]);
    }
  }

  // CONST_019, CONST_PREAMB
  const constIdPattern = /CONST_(?:PREAMB|\d{3})/gi;
  let match: RegExpExecArray | null;
  while ((match = constIdPattern.exec(text)) !== null) {
    const id = match[0].toUpperCase();
    const num = id.replace('CONST_', '').replace(/^0+/, '') || id;
    cited.add(id === 'CONST_PREAMB' ? 'CONST_PREAMB' : num);
  }

  // Preàmbul
  if (/\bpreàmbul\b/i.test(text)) {
    cited.add('CONST_PREAMB');
  }

  return Array.from(cited);
}

/**
 * Retorna els IDs de context que corresponen a articles de la Constitució (CONST_*)
 */
function getContextConstitutionIds(contextEntryIds: string[]): string[] {
  return contextEntryIds.filter(
    (id) =>
      id.startsWith('CONST_') &&
      !id.startsWith('DOCTRINA_') &&
      !id.startsWith('DOC_')
  );
}

/**
 * Valida qualitativament una resposta respecte al context RAG utilitzat
 * @param response Text de la resposta generada
 * @param contextEntryIds IDs de les entrades del corpus que s'han passat com a context (ex: CONST_019, DOCTRINA_...)
 */
export function validateResponseQuality(
  response: string,
  contextEntryIds: string[]
): ResponseQualityResult {
  const citedInResponse = extractCitedArticlesFromResponse(response);
  const contextArticleIds = getContextConstitutionIds(contextEntryIds);

  const citedNotInContext: string[] = [];
  for (const cited of citedInResponse) {
    const idForm = toContextId(cited);
    const inContext =
      contextArticleIds.includes(idForm) ||
      contextArticleIds.some(
        (cid) =>
          cid === idForm ||
          cid.replace('CONST_', '').replace(/^0+/, '') === String(cited).replace(/^0+/, '')
      );
    // Només avisar si l'article no estava al context I no existeix al corpus (possibles al·lucinacions).
    // Si l'article existeix a la Constitució (corpus), no mostrem avís: el model pot haver-lo citat correctament.
    const existsInCorpus = getArticleById(idForm) !== null;
    if (!inContext && !existsInCorpus) {
      citedNotInContext.push(cited);
    }
  }

  const warnings: string[] = [];
  const suggestions: string[] = [];

  if (citedNotInContext.length > 0) {
    warnings.push(
      `La resposta cita articles que no estaven al context proporcionat: ${citedNotInContext.join(', ')}. Això pot indicar confusió o invenció d'articles.`
    );
    suggestions.push(
      'Cita només articles que apareguin al context. Si no n’has al context, no en mencionis per número.'
    );
  }

  if (citedInResponse.length > 0 && citedNotInContext.length === 0) {
    // Tots els citats estan al context: bé
  }

  if (citedInResponse.length === 0 && contextArticleIds.length > 0) {
    suggestions.push(
      'Considera citar els articles de la Constitució quan facis referència al seu contingut (ex: "Article 19").'
    );
  }

  // Score: 100 si no hi ha cites fora de context, penalització per cada cite fora
  const penaltyPerCite = 25;
  const score = Math.max(
    0,
    100 - citedNotInContext.length * penaltyPerCite
  );
  const valid = citedNotInContext.length === 0;

  return {
    valid,
    score,
    warnings,
    citedInResponse: Array.from(new Set(citedInResponse)),
    citedNotInContext,
    contextArticleIds,
    suggestions,
  };
}
