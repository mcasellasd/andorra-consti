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
    'CONST_PREAMB': ['preàmbul', 'pareatges', 'virtus unita fortior', 'lema', 'article 0', 'aprovació constitució', '1993'],
    'CONST_001': ['sobirania', 'poble andorrà', 'coprincipat parlamentari', 'parròquies', 'principat', 'article 1'],
    'CONST_002': ['capital', 'andorra la vella', 'llengua oficial', 'català oficial', 'himne nacional', 'bandera', 'escut', 'article 2'],
    'CONST_003': ['norma suprema', 'ordenament jurídic', 'rang normatiu', 'eficàcia jurídica', 'legalitat', 'jerarquia', 'no retroactivitat', 'article 3'],
    'CONST_004': ['dignitat humana', 'drets inviolables', 'imprescriptibles', 'article 4'],
    'CONST_005': ['declaració universal dels drets humans', 'declaració universal', 'dudh', 'drets humans vigent', 'article 5'],
    'CONST_006': ['igualtat', 'totes les persones són iguals', 'discriminat', 'article 6'],
    'CONST_007': ['nacionalitat andorrana', 'nacional andorrà', 'adquisició nacionalitat', 'pèrdua nacionalitat', 'nacionalitat diferent', 'llei qualificada nacionalitat', 'article 7'],
    'CONST_008': ['dret a la vida', 'pena de mort', 'prohibeix pena de mort', 'integritat física', 'tortures', 'article 8'],
    'CONST_009': ['detenció governativa', 'quaranta-vuit hores', '48 hores', 'llibertat i seguretat', 'article 9'],
    'CONST_010': ['procés degut', 'jurisdicció', 'tutela judicial', 'presumpció innocència', 'article 10'],
    'CONST_039': ['dret directament aplicable', 'capítol iii', 'capítol iv', 'estrangers residents drets', 'article 39'],
    'CONST_040': ['lleis qualificades drets', 'regular exercici drets', 'drets capítols iii iv', 'article 40'],
    'CONST_042': ['estat d\'alarma', 'estat d\'emergència', 'estats excepció', 'article 42'],
    'CONST_043': ['coprínceps són', 'bisbe d\'urgell', 'president república francesa', 'cap de l\'estat andorra', 'article 43'],
    'CONST_050': ['consell general', 'potestat legislativa', 'pressupostos estat', 'control govern', 'article 50'],
    'CONST_057': ['lleis qualificades aprovació', 'majoria absoluta consellers', 'article 57'],
    'CONST_072': ['govern andorra', 'cap de govern', 'potestat reglamentària', 'article 72'],
    'CONST_085': ['justícia andorra', 'jutges independents', 'organització judicial', 'títol vii justícia', 'article 85'],
    'CONST_095': ['tribunal constitucional', 'intèrpret suprem constitució', 'article 95'],
    'CONST_098': ['inconstitucionalitat', 'empara constitucional', 'conflictes competències', 'article 98'],
    'CONST_105': ['reforma constitucional', 'títol ix', 'article 105'],
    'CONST_106': ['revisió constitucional', 'article 106'],
    'CONST_107': ['reforma constitució', 'article 107']
  };
  
  const foundArticles: string[] = [];
  
  for (const [articleId, keywords] of Object.entries(articleKeywords)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      foundArticles.push(articleId);
    }
  }
  
  return foundArticles;
}
