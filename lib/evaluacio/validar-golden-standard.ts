/**
 * Sistema de validació automàtica contra Golden Standard
 * Detecta errors, validacions i genera recomanacions d'aprenentatge
 */

import { PreguntaControl } from '../../data/preguntes-control';
import { preguntesGoldenStandard } from '../../data/preguntes-golden-standard';
import { articlesConstitucio } from '../../data/codis/constitucio/articles';

export interface ResultatValidacio {
  preguntaId: string;
  valid: boolean;
  score: number; // 0-100
  errors: ErrorValidacio[];
  advertiments: AdvertimentValidacio[];
  millores: RecomanacioMillora[];
  detall: DetallValidacio;
}

export interface ErrorValidacio {
  tipus: 'article_incorrecte' | 'article_falta' | 'paraula_prohibida' | 'contingut_incorrecte' | 'similitud_baixa';
  severitat: 'alta' | 'mitjana' | 'baixa';
  descripcio: string;
  articleEsperat?: string;
  articleMencionat?: string;
  paraulaProhibida?: string;
  context?: string;
}

export interface AdvertimentValidacio {
  tipus: 'article_optatiu_falta' | 'paraula_clau_falta' | 'similitud_mitjana';
  descripcio: string;
  recomanacio?: string;
}

export interface RecomanacioMillora {
  tipus: 'afegir_article' | 'eliminar_referencia' | 'millorar_context' | 'corregir_contingut';
  prioritat: 'alta' | 'mitjana' | 'baixa';
  descripcio: string;
  accio?: string;
  exemple?: string;
}

export interface DetallValidacio {
  articlesMencionats: string[];
  articlesEsperats: string[];
  articlesCorrectes: string[];
  articlesIncorrectes: string[];
  articlesFaltants: string[];
  paraulesClauCoincidents: number;
  paraulesClauTotals: number;
  paraulesProhibidesTrobades: string[];
  similitudTextual: number; // 0-100
}

/**
 * Valida una resposta del sistema contra una pregunta Golden Standard
 */
export function validarContraGoldenStandard(
  respostaSistema: string,
  preguntaGoldenStandard: PreguntaControl
): ResultatValidacio {
  const errors: ErrorValidacio[] = [];
  const advertiments: AdvertimentValidacio[] = [];
  const millores: RecomanacioMillora[] = [];

  // Extreure articles mencionats a la resposta
  const articlesMencionats = extreureArticles(respostaSistema);
  const articlesEsperats = preguntaGoldenStandard.articlesEsperats || [];
  
  // Validar articles
  const articlesCorrectes: string[] = [];
  const articlesIncorrectes: string[] = [];
  const articlesFaltants: string[] = [];

  // Verificar articles esperats
  articlesEsperats.forEach(articleId => {
    if (articlesMencionats.includes(articleId)) {
      articlesCorrectes.push(articleId);
    } else {
      articlesFaltants.push(articleId);
      errors.push({
        tipus: 'article_falta',
        severitat: 'alta',
        descripcio: `S'esperava la menció de l'Article ${articleIdToNumber(articleId)}, però no s'ha mencionat a la resposta`,
        articleEsperat: articleId
      });
    }
  });

  // Verificar articles incorrectes (detectar referències errònies)
  articlesMencionats.forEach(articleId => {
    if (!articlesEsperats.includes(articleId)) {
      // Verificar si és un article prohibit específicament
      if (preguntaGoldenStandard.paraulesProhibides) {
        const articleNumber = articleIdToNumber(articleId);
        if (preguntaGoldenStandard.paraulesProhibides.some(
          prohibida => prohibida.includes(articleNumber) || prohibida.includes(articleId)
        )) {
          articlesIncorrectes.push(articleId);
          errors.push({
            tipus: 'article_incorrecte',
            severitat: 'alta',
            descripcio: `S'ha mencionat l'Article ${articleNumber} (${articleId}), però aquest article NO és rellevant per a aquesta pregunta. ${getRacioArticle(articleId)}`,
            articleMencionat: articleId,
            articleEsperat: articlesEsperats[0] // Primer article esperat com a referència
          });

          millores.push({
            tipus: 'eliminar_referencia',
            prioritat: 'alta',
            descripcio: `Eliminar la referència a l'Article ${articleNumber} d'aquesta resposta, ja que no és rellevant per a la pregunta sobre ${preguntaGoldenStandard.descripcio}`,
            accio: `Buscar i eliminar totes les referències a "${articleId}" o "Article ${articleNumber}" de la resposta`,
            exemple: `En comptes de mencionar l'Article ${articleNumber}, referir-se als articles: ${articlesEsperats.slice(0, 3).map(a => articleIdToNumber(a)).join(', ')}`
          });
        }
      }
    }
  });

  // Validar paraules prohibides
  const paraulesProhibidesTrobades: string[] = [];
  if (preguntaGoldenStandard.paraulesProhibides) {
    preguntaGoldenStandard.paraulesProhibides.forEach(paraula => {
      if (respostaSistema.toLowerCase().includes(paraula.toLowerCase())) {
        paraulesProhibidesTrobades.push(paraula);
        errors.push({
          tipus: 'paraula_prohibida',
          severitat: 'alta',
          descripcio: `La resposta conté la paraula/frase prohibida "${paraula}" que no hauria d'aparèixer`,
          paraulaProhibida: paraula,
          context: extreureContext(respostaSistema, paraula)
        });

        millores.push({
          tipus: 'corregir_contingut',
          prioritat: 'alta',
          descripcio: `Eliminar o corregir la referència a "${paraula}" de la resposta`,
          accio: `Buscar i substituir "${paraula}" per la terminologia correcta`
        });
      }
    });
  }

  // Validar paraules clau esperades
  const paraulesClauEsperades = preguntaGoldenStandard.paraulesClau || [];
  const paraulesClauCoincidents = paraulesClauEsperades.filter(
    paraula => respostaSistema.toLowerCase().includes(paraula.toLowerCase())
  ).length;

  if (paraulesClauCoincidents < paraulesClauEsperades.length * 0.5) {
    advertiments.push({
      tipus: 'paraula_clau_falta',
      descripcio: `Només s'han trobat ${paraulesClauCoincidents} de ${paraulesClauEsperades.length} paraules clau esperades`,
      recomanacio: `Incloure més paraules clau esperades com: ${paraulesClauEsperades.filter(p => !respostaSistema.toLowerCase().includes(p.toLowerCase())).slice(0, 3).join(', ')}`
    });
  }

  // Validar similitud textual amb resposta esperada
  let similitudTextual = 0;
  if (preguntaGoldenStandard.respostaEsperada) {
    similitudTextual = calcularSimilitudTextual(
      respostaSistema,
      preguntaGoldenStandard.respostaEsperada
    );

    if (similitudTextual < 30) {
      errors.push({
        tipus: 'similitud_baixa',
        severitat: 'alta',
        descripcio: `La similitud textual amb la resposta esperada és molt baixa (${similitudTextual.toFixed(1)}%). La resposta pot no estar abordant correctament la pregunta.`
      });
    } else if (similitudTextual < 50) {
      advertiments.push({
        tipus: 'similitud_mitjana',
        descripcio: `La similitud textual amb la resposta esperada és mitjana (${similitudTextual.toFixed(1)}%). La resposta podria millorar-se per ser més completa.`
      });
    }
  }

  // Calcular score
  const score = calcularScore(
    errors,
    advertiments,
    articlesCorrectes.length,
    articlesEsperats.length,
    paraulesClauCoincidents,
    paraulesClauEsperades.length,
    similitudTextual
  );

  // Generar recomanacions addicionals
  if (articlesFaltants.length > 0) {
    millores.push({
      tipus: 'afegir_article',
      prioritat: 'alta',
      descripcio: `Afegir referències als articles: ${articlesFaltants.slice(0, 3).map(a => articleIdToNumber(a)).join(', ')}`,
      accio: `Incloure informació dels articles ${articlesFaltants.slice(0, 3).join(', ')} a la resposta`,
      exemple: `Segons l'Article ${articleIdToNumber(articlesFaltants[0])}, ...`
    });
  }

  const valid = errors.filter(e => e.severitat === 'alta').length === 0 && score >= 60;

  return {
    preguntaId: preguntaGoldenStandard.id,
    valid,
    score: Math.round(score),
    errors,
    advertiments,
    millores,
    detall: {
      articlesMencionats,
      articlesEsperats,
      articlesCorrectes,
      articlesIncorrectes,
      articlesFaltants,
      paraulesClauCoincidents,
      paraulesClauTotals: paraulesClauEsperades.length,
      paraulesProhibidesTrobades,
      similitudTextual
    }
  };
}

/**
 * Extreu els IDs d'articles mencionats a un text
 */
function extreureArticles(text: string): string[] {
  const articleIds: string[] = [];
  
  // Buscar patrons com "Article 94", "Article 101", "CONST_094", etc.
  const patterns = [
    /Article\s+(\d+)/gi,
    /CONST[_\s]*(\d+)/gi,
    /article\s+(\d+)/gi
  ];

  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const number = match[1];
      const articleId = `CONST_${number.padStart(3, '0')}`;
      if (!articleIds.includes(articleId)) {
        articleIds.push(articleId);
      }
    }
  });

  return articleIds;
}

/**
 * Converteix un ID d'article a número
 */
function articleIdToNumber(articleId: string): string {
  if (articleId === 'CONST_PREAMB') return 'Preàmbul';
  const match = articleId.match(/CONST_(\d+)/);
  return match ? match[1] : articleId;
}

/**
 * Obté la raó per la qual un article no és rellevant
 */
function getRacioArticle(articleId: string): string {
  const article = articlesConstitucio.find(a => a.id === articleId);
  if (!article) return 'Aquest article no existeix a la Constitució.';

  // Raons específiques per articles coneguts
  const raons: Record<string, string> = {
    'CONST_094': 'L\'Article 94 parla sobre policia judicial i direcció de la policia en matèria judicial, NO sobre tractats internacionals. Per tractats internacionals, s\'han de consultar els articles 66, 67, 68, 98 i 101.',
    'CONST_085': 'L\'Article 85 tracta sobre l\'organització general del poder judicial, no sobre drets específics.',
    'CONST_086': 'L\'Article 86 tracta sobre normes de procediment judicial general, no sobre drets específics.'
  };

  return raons[articleId] || `Aquest article tracta sobre "${article.titol || article.capitol || 'altres matèries'}", que no és rellevant per a aquesta pregunta específica.`;
}

/**
 * Extreu el context al voltant d'una paraula
 */
function extreureContext(text: string, paraula: string, longitud: number = 100): string {
  const index = text.toLowerCase().indexOf(paraula.toLowerCase());
  if (index === -1) return '';

  const start = Math.max(0, index - longitud);
  const end = Math.min(text.length, index + paraula.length + longitud);
  
  return text.substring(start, end);
}

/**
 * Calcula similitud textual entre dues respostes
 */
function calcularSimilitudTextual(text1: string, text2: string): number {
  // Similitud simple basada en paraules comunes
  const words1 = new Set(text1.toLowerCase().split(/\s+/));
  const words2 = new Set(text2.toLowerCase().split(/\s+/));
  
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return union.size > 0 ? (intersection.size / union.size) * 100 : 0;
}

/**
 * Calcula el score de validació (0-100)
 */
function calcularScore(
  errors: ErrorValidacio[],
  advertiments: AdvertimentValidacio[],
  articlesCorrectes: number,
  articlesEsperats: number,
  paraulesClauCoincidents: number,
  paraulesClauTotals: number,
  similitudTextual: number
): number {
  let score = 100;

  // Penalitzar errors
  errors.forEach(error => {
    switch (error.severitat) {
      case 'alta':
        score -= 20;
        break;
      case 'mitjana':
        score -= 10;
        break;
      case 'baixa':
        score -= 5;
        break;
    }
  });

  // Penalitzar advertiments
  score -= advertiments.length * 3;

  // Bonificar articles correctes
  if (articlesEsperats > 0) {
    const ratioArticles = articlesCorrectes / articlesEsperats;
    score += (ratioArticles * 30) - 15; // Ajustar per centrar-se en 0
  }

  // Bonificar paraules clau
  if (paraulesClauTotals > 0) {
    const ratioParaules = paraulesClauCoincidents / paraulesClauTotals;
    score += (ratioParaules * 20) - 10;
  }

  // Bonificar similitud textual
  score += (similitudTextual / 100) * 10 - 5;

  return Math.max(0, Math.min(100, score));
}

/**
 * Genera un informe de validació per a totes les preguntes Golden Standard
 */
export async function validarTotesLesPreguntes(
  obtenirResposta: (pregunta: PreguntaControl) => Promise<string>
): Promise<{
  resultats: ResultatValidacio[];
  resum: {
    totals: number;
    valides: number;
    invalides: number;
    scoreMitja: number;
    errorsFreqüents: Array<{ error: string; count: number }>;
    milloresPrioritaries: RecomanacioMillora[];
  };
}> {
  const resultats: ResultatValidacio[] = [];

  for (const pregunta of preguntesGoldenStandard) {
    try {
      const resposta = await obtenirResposta(pregunta);
      const validacio = validarContraGoldenStandard(resposta, pregunta);
      resultats.push(validacio);
    } catch (error) {
      console.error(`Error validant pregunta ${pregunta.id}:`, error);
    }
  }

  // Generar resum
  const valides = resultats.filter(r => r.valid).length;
  const invalides = resultats.length - valides;
  const scoreMitja = resultats.reduce((sum, r) => sum + r.score, 0) / resultats.length;

  // Errors freqüents
  const errorsFreqüents: Record<string, number> = {};
  resultats.forEach(r => {
    r.errors.forEach(e => {
      const key = `${e.tipus}_${e.severitat}`;
      errorsFreqüents[key] = (errorsFreqüents[key] || 0) + 1;
    });
  });

  // Millores prioritaries (errors de severitat alta)
  const milloresPrioritaries = resultats
    .flatMap(r => r.millores.filter(m => m.prioritat === 'alta'))
    .slice(0, 10);

  return {
    resultats,
    resum: {
      totals: resultats.length,
      valides,
      invalides,
      scoreMitja: Math.round(scoreMitja * 10) / 10,
      errorsFreqüents: Object.entries(errorsFreqüents)
        .map(([error, count]) => ({ error, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5),
      milloresPrioritaries
    }
  };
}
