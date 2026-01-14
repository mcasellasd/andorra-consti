/**
 * Utilitats per detectar la complexitat de les preguntes
 * i determinar quant context recuperar
 */

/**
 * Detecta si una pregunta és complexa basant-se en indicadors
 */
export function detectComplexity(message: string): {
  isComplex: boolean;
  requiresMultipleArticles: boolean;
  isJurisprudence: boolean;
  suggestedTopK: number;
} {
  const lowerMessage = message.toLowerCase();
  
  // Indicadors de preguntes complexes
  const complexIndicators = [
    'quins són', 'quines són', 'quins', 'quines',
    'expliqueu', 'descriviu', 'identifiqueu',
    'relació', 'diferència', 'comparació',
    'múltiples', 'diversos', 'tots',
    'com s\'ha', 's\'ha pronunciat', 'ha reconegut',
    'jurisprudència', 'sentències', 'tribunal',
    'bloc de constitucionalitat',
    'estats d\'excepció',
    'reforma constitucional',
    'convencions constitucionals'
  ];
  
  // Indicadors de preguntes sobre jurisprudència
  const jurisprudenceIndicators = [
    'jurisprudència',
    'sentència',
    'tribunal constitucional',
    'tribunal superior',
    'ha reconegut',
    's\'ha pronunciat',
    'decisions',
    'interpretació'
  ];
  
  // Indicadors que requereixen múltiples articles
  const multipleArticlesIndicators = [
    'quins són els',
    'quines són les',
    'tots els',
    'diversos',
    'múltiples',
    'relació entre',
    'diferència entre',
    'comparació'
  ];
  
  const hasComplexIndicators = complexIndicators.some(indicator => 
    lowerMessage.includes(indicator)
  );
  
  const hasJurisprudenceIndicators = jurisprudenceIndicators.some(indicator =>
    lowerMessage.includes(indicator)
  );
  
  const requiresMultiple = multipleArticlesIndicators.some(indicator =>
    lowerMessage.includes(indicator)
  );
  
  // Detectar preguntes que demanen llistes o enumeracions
  const asksForList = /quins? són|quines? són|enumera|llista|identifica/i.test(message);
  
  // Detectar preguntes amb múltiples parts (separades per "?" o ".")
  const hasMultipleParts = (message.match(/\?/g) || []).length > 1 || 
                          message.split(/[?.]/).length > 2;
  
  const isComplex = hasComplexIndicators || asksForList || hasMultipleParts || requiresMultiple;
  const isJurisprudence = hasJurisprudenceIndicators;
  const requiresMultipleArticles = requiresMultiple || asksForList || isJurisprudence;
  
  // Determinar quant context recuperar
  let suggestedTopK = 5; // Base
  
  if (isComplex) {
    suggestedTopK = 8;
  }
  
  if (requiresMultipleArticles) {
    suggestedTopK = 10;
  }
  
  if (isJurisprudence) {
    suggestedTopK = 12; // Les preguntes sobre jurisprudència necessiten més context
  }
  
  if (hasMultipleParts) {
    suggestedTopK = Math.max(suggestedTopK, 10);
  }
  
  return {
    isComplex,
    requiresMultipleArticles,
    isJurisprudence,
    suggestedTopK: Math.min(suggestedTopK, 15) // Cap a 15 màxim
  };
}

/**
 * Detecta si una pregunta fa referència a un article específic
 */
export function detectArticleReference(message: string): string | null {
  // Patrons per detectar referències a articles
  const patterns = [
    /article\s+(\d+)/i,
    /art\.?\s*(\d+)/i,
    /art\.\s*(\d+)/i,
    /article\s+(\d+)\s+de\s+la\s+constitució/i
  ];
  
  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

/**
 * Detecta paraules clau que poden identificar articles específics
 */
export function detectArticleByKeywords(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  const articleKeywords: { [key: string]: string[] } = {
    'CONST_001': ['sobirania', 'poble andorrà', 'article 1'],
    'CONST_002': ['capital', 'andorra la vella', 'article 2'],
    'CONST_003': ['norma suprema', 'ordenament jurídic', 'rang normatiu', 'eficàcia jurídica', 'article 3'],
    'CONST_004': ['dignitat humana', 'drets inviolables', 'article 4'],
    'CONST_006': ['igualtat', 'totes les persones són iguals', 'article 6'],
    'CONST_008': ['dret a la vida', 'article 8'],
    'CONST_010': ['procés degut', 'article 10'],
    'CONST_095': ['tribunal constitucional', 'article 95'],
    'CONST_PREAMB': ['preàmbul', 'pareatges', 'virtus unita fortior', 'lema']
  };
  
  const foundArticles: string[] = [];
  
  for (const [articleId, keywords] of Object.entries(articleKeywords)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      foundArticles.push(articleId);
    }
  }
  
  return foundArticles;
}
