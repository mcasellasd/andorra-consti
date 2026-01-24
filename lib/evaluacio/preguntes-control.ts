/**
 * Sistema d'avaluació de preguntes de control
 * Avaluem les respostes del sistema segons criteris objectius
 */

import type { PreguntaControl } from '@/data/preguntes-control';

export interface ResultatAvaluacio {
  preguntaId: string;
  pregunta: string;
  resposta: string;
  fonts: Array<{ id: string; title: string; score?: number }>;

  // Mètriques d'avaluació
  articlesTrobats: string[]; // Articles que s'han trobat a les fonts
  articlesEsperats: string[]; // Articles que s'esperaven
  articlesCorrectes: string[]; // Articles esperats que s'han trobat
  paraulesClauTrobades: string[]; // Paraules clau que apareixen a la resposta
  paraulesClauEsperades: string[]; // Paraules clau que s'esperaven
  paraulesProhibidesTrobades: string[]; // Paraules prohibides que apareixen

  // Informació de la pregunta (per al informe)
  categoria?: string;
  dificultat?: string;

  // Scores
  scoreArticles: number; // 0-100: % d'articles esperats trobats
  scoreParaulesClau: number; // 0-100: % de paraules clau trobades
  scoreParaulesProhibides: number; // 0-100: 100 si no n'hi ha, 0 si n'hi ha
  scoreGlobal: number; // 0-100: mitjana ponderada

  // Validacions
  valid: boolean; // true si scoreGlobal >= 70
  warnings: string[]; // Advertències sobre la resposta
  errors: string[]; // Errors crítics
}

/**
 * Avaluar una resposta segons els criteris d'una pregunta de control
 */
export function avaluarResposta(
  preguntaControl: PreguntaControl,
  resposta: string,
  fonts: Array<{ id: string; title: string; score?: number }>
): ResultatAvaluacio {
  // Extreure IDs d'articles de les fonts
  const articlesTrobats = fonts.map(f => f.id).filter(id => id.startsWith('CONST_'));

  // Calcular score d'articles
  const articlesEsperatsSet = new Set(preguntaControl.articlesEsperats);
  const articlesTrobatsSet = new Set(articlesTrobats);

  const articlesCorrectes = preguntaControl.articlesEsperats.filter(
    id => articlesTrobatsSet.has(id)
  );

  const scoreArticles = preguntaControl.articlesEsperats.length > 0
    ? (articlesCorrectes.length / preguntaControl.articlesEsperats.length) * 100
    : 50; // Si no hi ha articles esperats, donem 50 punts

  // Calcular score de paraules clau
  const respostaLower = resposta.toLowerCase();
  const paraulesClauTrobades = preguntaControl.paraulesClau.filter(
    paraula => respostaLower.includes(paraula.toLowerCase())
  );

  const scoreParaulesClau = preguntaControl.paraulesClau.length > 0
    ? (paraulesClauTrobades.length / preguntaControl.paraulesClau.length) * 100
    : 50;

  // Calcular score de paraules prohibides
  const paraulesProhibidesTrobades = preguntaControl.paraulesProhibides
    ? preguntaControl.paraulesProhibides.filter(
      paraula => respostaLower.includes(paraula.toLowerCase())
    )
    : [];

  const scoreParaulesProhibides = paraulesProhibidesTrobades.length === 0 ? 100 : 0;

  // Calcular score global (ponderat)
  // Articles: 40%, Paraules clau: 40%, Paraules prohibides: 20%
  const scoreGlobal = (
    scoreArticles * 0.4 +
    scoreParaulesClau * 0.4 +
    scoreParaulesProhibides * 0.2
  );

  // Generar warnings i errors
  const warnings: string[] = [];
  const errors: string[] = [];

  if (scoreArticles < 50) {
    warnings.push(`Només s'han trobat ${articlesCorrectes.length} de ${preguntaControl.articlesEsperats.length} articles esperats`);
  }

  if (scoreParaulesClau < 50) {
    warnings.push(`Només s'han trobat ${paraulesClauTrobades.length} de ${preguntaControl.paraulesClau.length} paraules clau esperades`);
  }

  if (paraulesProhibidesTrobades.length > 0) {
    errors.push(`S'han trobat paraules prohibides: ${paraulesProhibidesTrobades.join(', ')}`);
  }

  if (articlesTrobats.length === 0) {
    errors.push('No s\'han trobat cap article a les fonts');
  }

  if (resposta.trim().length < 50) {
    warnings.push('La resposta és massa curta (menys de 50 caràcters)');
  }

  const valid = scoreGlobal >= 70 && errors.length === 0;

  return {
    preguntaId: preguntaControl.id,
    pregunta: preguntaControl.pregunta,
    resposta,
    fonts,
    articlesTrobats,
    articlesEsperats: preguntaControl.articlesEsperats,
    articlesCorrectes,
    paraulesClauTrobades,
    paraulesClauEsperades: preguntaControl.paraulesClau,
    paraulesProhibidesTrobades,
    categoria: preguntaControl.categoria,
    dificultat: preguntaControl.dificultat,
    scoreArticles,
    scoreParaulesClau,
    scoreParaulesProhibides,
    scoreGlobal,
    valid,
    warnings,
    errors
  };
}

/**
 * Avaluar múltiples respostes i generar un informe agregat
 */
export interface InformeAvaluacio {
  dataExecucio: string;
  totalPreguntes: number;
  preguntesValides: number;
  preguntesInvalides: number;
  scoreMitja: number;
  resultats: ResultatAvaluacio[];

  // Desglossament per categoria
  perCategoria: {
    [categoria: string]: {
      total: number;
      valides: number;
      scoreMitja: number;
    };
  };

  // Desglossament per dificultat
  perDificultat: {
    [dificultat: string]: {
      total: number;
      valides: number;
      scoreMitja: number;
    };
  };
}

export function generarInformeAvaluacio(
  resultats: ResultatAvaluacio[]
): InformeAvaluacio {
  const totalPreguntes = resultats.length;
  const preguntesValides = resultats.filter(r => r.valid).length;
  const preguntesInvalides = totalPreguntes - preguntesValides;
  const scoreMitja = resultats.reduce((sum, r) => sum + r.scoreGlobal, 0) / totalPreguntes;

  // Agrupar per categoria
  const perCategoria: { [key: string]: { total: number; valides: number; scores: number[] } } = {};

  resultats.forEach(resultat => {
    const categoria = resultat.categoria || 'unknown';

    if (!perCategoria[categoria]) {
      perCategoria[categoria] = { total: 0, valides: 0, scores: [] };
    }

    perCategoria[categoria].total++;
    if (resultat.valid) {
      perCategoria[categoria].valides++;
    }
    perCategoria[categoria].scores.push(resultat.scoreGlobal);
  });

  const perCategoriaFinal: { [key: string]: { total: number; valides: number; scoreMitja: number } } = {};

  Object.keys(perCategoria).forEach(cat => {
    const data = perCategoria[cat];
    perCategoriaFinal[cat] = {
      total: data.total,
      valides: data.valides,
      scoreMitja: data.scores.reduce((a, b) => a + b, 0) / data.scores.length
    };
  });

  // Per dificultat
  const perDificultat: { [key: string]: { total: number; valides: number; scores: number[] } } = {};

  resultats.forEach(resultat => {
    const dificultat = resultat.dificultat || 'unknown';

    if (!perDificultat[dificultat]) {
      perDificultat[dificultat] = { total: 0, valides: 0, scores: [] };
    }

    perDificultat[dificultat].total++;
    if (resultat.valid) {
      perDificultat[dificultat].valides++;
    }
    perDificultat[dificultat].scores.push(resultat.scoreGlobal);
  });

  const perDificultatFinal: { [key: string]: { total: number; valides: number; scoreMitja: number } } = {};

  Object.keys(perDificultat).forEach(dif => {
    const data = perDificultat[dif];
    perDificultatFinal[dif] = {
      total: data.total,
      valides: data.valides,
      scoreMitja: data.scores.reduce((a, b) => a + b, 0) / data.scores.length
    };
  });

  return {
    dataExecucio: new Date().toISOString(),
    totalPreguntes,
    preguntesValides,
    preguntesInvalides,
    scoreMitja,
    resultats,
    perCategoria: perCategoriaFinal,
    perDificultat: perDificultatFinal
  };
}
