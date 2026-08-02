/**
 * Detecció de calc literal entre el text de la norma i l'explicació generada.
 *
 * PROBLEMA
 * --------
 * El prompt demanava «no repeteixis el text literal» i «utilitza les teves pròpies
 * paraules». Les instruccions negatives no funcionen: el model comprimeix la frase
 * legal traient-ne incisos, i el resultat conserva l'estructura i el vocabulari.
 *
 * Article 31 · text oficial:
 *   «És funció de l'Estat vetllar per la utilització racional del sòl i de tots els
 *    recursos naturals, amb la finalitat de garantir a tothom una qualitat de vida
 *    digna…»
 * Resum generat:
 *   «L'Estat d'Andorra té la funció de vetllar per la utilització racional del sòl i
 *    dels recursos naturals per garantir una qualitat de vida digna…»
 *
 * No és una explicació: és la mateixa frase amb menys paraules. Qui no entenia
 * l'article segueix sense entendre'l.
 *
 * `checkPlainLanguage()` ja puntua la resposta, però ho fa amb una crida a un model i
 * el resultat només s'informa: no rebutja res. Aquesta comprovació és determinista,
 * no costa cap crida i serveix de porta.
 */

export interface ResultatSolapament {
  /** Percentatge de n-grames de l'explicació que ja són al text legal (0-100). */
  percentatge: number;
  /** Fragments literals detectats, per retornar-los al model com a prohibits. */
  fragments: string[];
  /** true si supera el llindar acceptable. */
  excessiu: boolean;
}

/** Per sobre d'aquest percentatge, l'explicació és un calc i s'ha de refer. */
export const LLINDAR_SOLAPAMENT = 14;

const N = 5;

function normalitza(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[«»"'()[\]{}.,;:!?—–-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);
}

function ngrames(paraules: string[], n: number): string[] {
  if (paraules.length < n) return [];
  const out: string[] = [];
  for (let i = 0; i <= paraules.length - n; i++) out.push(paraules.slice(i, i + n).join(' '));
  return out;
}

/**
 * Compara l'explicació generada amb el text oficial de la norma.
 * Ignora les citacions entre cometes: citar literalment un tros és legítim si
 * s'explica; el que no ho és, és que tota l'explicació sigui la norma reescrita.
 */
export function solapamentLiteral(textLegal: string, explicacio: string): ResultatSolapament {
  const senseCitacions = explicacio.replace(/«[^»]*»|"[^"]*"/g, ' ');

  const gramesLegal = new Set(ngrames(normalitza(textLegal), N));
  const gramesExpl = ngrames(normalitza(senseCitacions), N);

  if (gramesExpl.length === 0) {
    return { percentatge: 0, fragments: [], excessiu: false };
  }

  const coincidents = gramesExpl.filter(g => gramesLegal.has(g));
  const percentatge = Math.round((coincidents.length / gramesExpl.length) * 100);

  // Fusiona n-grames encavalcats en fragments llegibles.
  const fragments: string[] = [];
  let actual: string[] = [];
  for (const g of gramesExpl) {
    if (gramesLegal.has(g)) {
      const mots = g.split(' ');
      if (actual.length === 0) actual = mots;
      else actual.push(mots[mots.length - 1]);
    } else if (actual.length) {
      fragments.push(actual.join(' '));
      actual = [];
    }
  }
  if (actual.length) fragments.push(actual.join(' '));

  return {
    percentatge,
    fragments: fragments.slice(0, 6),
    excessiu: percentatge > LLINDAR_SOLAPAMENT,
  };
}

/** Instrucció correctiva per a la segona passada, amb els calcs detectats. */
export function instruccioReescriptura(r: ResultatSolapament): string {
  return [
    `La versió anterior era un calc del text legal (${r.percentatge}% de coincidència literal). No serveix.`,
    '',
    'Aquestes seqüències són al text oficial i NO poden aparèixer a la teva explicació:',
    ...r.fragments.map(f => `  · «${f}»`),
    '',
    'Torna a escriure-ho des de zero. No parteixis de la frase legal per anar-la retallant:',
    'parteix de la pregunta «què vol dir això per a una persona que no ha estudiat dret?».',
    'Canvia el subjecte, l\'ordre i el vocabulari. Fes servir verbs en lloc de noms abstractes',
    '(«fer servir bé» en comptes de «utilització racional»).',
  ].join('\n');
}
