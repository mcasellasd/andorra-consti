/**
 * Context estructural i força normativa dels articles de la Constitució d'Andorra.
 *
 * PROBLEMA QUE RESOL
 * ------------------
 * Els endpoints d'interpretació deien al model que interpretava el «Codi Civil
 * d'Andorra» i citaven els articles com «Article N CCA», sense indicar-li mai ni
 * el títol ni el capítol de la Constitució. Sense aquesta informació el model
 * raona amb el seu coneixement general, on la protecció del medi ambient o la
 * salut solen ser drets fonamentals, i acaba atribuint a articles del capítol V
 * una força normativa que la Constitució andorrana no els dona.
 *
 * Cas detectat: l'article 31 (medi ambient) descrit com a «dret fonamental que
 * ha de ser garantit per l'Estat». És fals. L'article 31 és al capítol V i
 * l'article 39.3 diu que aquests drets «només poden ésser invocats en els termes
 * fixats per l'ordenament jurídic».
 *
 * El problema és sistemàtic: afecta els 10 articles del capítol V, els deures del
 * capítol VI i tota la part orgànica (títols III a IX).
 *
 * REGLA CONSTITUCIONAL APLICADA
 * -----------------------------
 * Art. 39.1 · els drets dels capítols III i IV vinculen immediatament els poders
 *             públics a títol de dret directament aplicable.
 * Art. 39.3 · els drets del capítol V conformen la legislació i l'acció dels
 *             poders públics, però només poden ésser invocats en els termes
 *             fixats per l'ordenament jurídic.
 * Art. 41   · la tutela preferent i el recurs d'empara es reserven als drets
 *             dels capítols III i IV (excepte el supòsit de l'art. 22).
 */

export type ForcaNormativa =
  | 'dret-fonamental'      // Cap. III i IV: aplicació directa + empara
  | 'principi-rector'      // Cap. V: només invocable segons les lleis que el desenvolupin
  | 'deure'                // Cap. VI
  | 'principi-general'     // Cap. I i II
  | 'garantia'             // Cap. VII
  | 'organica';            // Títols I i III-IX: organització de l'Estat

export interface ContextConstitucional {
  article: number;
  titol: string;
  titolNom: string;
  capitol: string | null;
  capitolNom: string | null;
  forca: ForcaNormativa;
  /** Etiqueta curta per a la interfície. */
  etiqueta: string;
  /** Una frase, en planer, sobre què pot fer el ciutadà amb aquest article. */
  quePucFer: string;
  /** Es pot arribar al Tribunal Constitucional per empara invocant-lo? */
  empara: boolean;
  /** Articles de la Constitució que expliquen aquesta força normativa. */
  fonament: string[];
}

interface Tram { desde: number; fins: number; nom: string }

const TITOLS: Array<Tram & { id: string }> = [
  { id: 'I',    desde: 1,   fins: 3,   nom: "De la sobirania d'Andorra" },
  { id: 'II',   desde: 4,   fins: 42,  nom: 'Dels drets i llibertats' },
  { id: 'III',  desde: 43,  fins: 49,  nom: 'Dels Coprínceps' },
  { id: 'IV',   desde: 50,  fins: 71,  nom: 'Del Consell General' },
  { id: 'V',    desde: 72,  fins: 78,  nom: 'Del Govern' },
  { id: 'VI',   desde: 79,  fins: 84,  nom: "De l'estructura territorial" },
  { id: 'VII',  desde: 85,  fins: 94,  nom: 'De la Justícia' },
  { id: 'VIII', desde: 95,  fins: 104, nom: 'Del Tribunal Constitucional' },
  { id: 'IX',   desde: 105, fins: 107, nom: 'De la Reforma Constitucional' },
];

/** Capítols del títol II (l'únic amb divisió en capítols rellevant per a la força normativa). */
const CAPITOLS_TITOL_II: Array<Tram & { id: string; forca: ForcaNormativa }> = [
  { id: 'I',   desde: 4,  fins: 6,  nom: 'Principis generals',                                    forca: 'principi-general' },
  { id: 'II',  desde: 7,  fins: 7,  nom: 'De la nacionalitat andorrana',                          forca: 'principi-general' },
  { id: 'III', desde: 8,  fins: 23, nom: 'Dels drets fonamentals de la persona i de les llibertats públiques', forca: 'dret-fonamental' },
  { id: 'IV',  desde: 24, fins: 26, nom: 'Dels drets polítics dels andorrans',                     forca: 'dret-fonamental' },
  { id: 'V',   desde: 27, fins: 36, nom: 'Dels drets i principis econòmics, socials i culturals',  forca: 'principi-rector' },
  { id: 'VI',  desde: 37, fins: 38, nom: 'Dels deures dels andorrans i dels estrangers',           forca: 'deure' },
  { id: 'VII', desde: 39, fins: 42, nom: 'De les garanties dels drets i llibertats',               forca: 'garantia' },
];

const PERFIL: Record<ForcaNormativa, Omit<ContextConstitucional,
  'article' | 'titol' | 'titolNom' | 'capitol' | 'capitolNom' | 'forca'>> = {
  'dret-fonamental': {
    etiqueta: 'Dret fonamental · directament aplicable',
    quePucFer:
      'Aquest dret es pot fer valer davant dels tribunals ordinaris per un procediment urgent i preferent, ' +
      'i si es vulnera el seu contingut essencial es pot arribar al Tribunal Constitucional per la via del ' +
      'recurs d’empara.',
    empara: true,
    fonament: ['39.1', '41.1', '41.2'],
  },
  'principi-rector': {
    etiqueta: 'Principi rector · no invocable directament',
    quePucFer:
      'Aquest article obliga l’Estat i orienta la seva actuació, però no es pot invocar directament davant ' +
      'd’un tribunal com si fos un dret fonamental: només es pot fer valer en els termes que fixin les lleis ' +
      'que el desenvolupin. En la pràctica, la via sol ser la llei sectorial corresponent, no el recurs d’empara.',
    empara: false,
    fonament: ['39.3'],
  },
  'deure': {
    etiqueta: 'Deure constitucional',
    quePucFer:
      'Aquest article no reconeix un dret que es pugui reclamar, sinó una obligació que recau sobre les ' +
      'persones. El seu desplegament concret el fan les lleis.',
    empara: false,
    fonament: [],
  },
  'principi-general': {
    etiqueta: 'Principi general',
    quePucFer:
      'Aquest article fixa un principi que informa la interpretació de la resta de la Constitució. Rarament ' +
      's’invoca sol: acompanya l’article concret que s’estigui discutint.',
    empara: false,
    fonament: [],
  },
  'garantia': {
    etiqueta: 'Norma de garantia',
    quePucFer:
      'Aquest article no reconeix un dret material, sinó que estableix com es protegeixen els altres drets: ' +
      'quins vinculen directament els poders públics i quines vies existeixen per defensar-los.',
    empara: false,
    fonament: [],
  },
  'organica': {
    etiqueta: 'Norma d’organització de l’Estat',
    quePucFer:
      'Aquest article regula el funcionament de les institucions, no drets de les persones. Per això no arriba ' +
      'gairebé mai al Tribunal Constitucional per la via del recurs d’empara, que és la que fan servir els ' +
      'ciutadans.',
    empara: false,
    fonament: [],
  },
};

/** Extreu el número d'article de formats com «Article 31», «31», «CONST_031», «art. 31.2». */
export function numeroArticle(entrada: string | number): number | null {
  if (typeof entrada === 'number') return entrada;
  const m = String(entrada).match(/(\d{1,3})/);
  if (!m) return null;
  const n = parseInt(m[1], 10);
  return n >= 1 && n <= 107 ? n : null;
}

export function getContextConstitucional(entrada: string | number): ContextConstitucional | null {
  const n = numeroArticle(entrada);
  if (n === null) return null;

  const titol = TITOLS.find(t => n >= t.desde && n <= t.fins);
  if (!titol) return null;

  let capitol: string | null = null;
  let capitolNom: string | null = null;
  let forca: ForcaNormativa = 'organica';

  if (titol.id === 'II') {
    const cap = CAPITOLS_TITOL_II.find(c => n >= c.desde && n <= c.fins);
    if (cap) {
      capitol = cap.id;
      capitolNom = cap.nom;
      forca = cap.forca;
    }
  }

  return {
    article: n,
    titol: titol.id,
    titolNom: titol.nom,
    capitol,
    capitolNom,
    forca,
    ...PERFIL[forca],
  };
}

/**
 * Bloc de context per injectar al prompt. Va abans de la instrucció de tasca,
 * perquè el model sàpiga QUÈ està interpretant abans de decidir COM.
 */
export function blocContextPrompt(ctx: ContextConstitucional): string {
  const ubicacio = ctx.capitol
    ? `Títol ${ctx.titol} (${ctx.titolNom}), capítol ${ctx.capitol} (${ctx.capitolNom})`
    : `Títol ${ctx.titol} (${ctx.titolNom})`;

  const regla =
    ctx.forca === 'dret-fonamental'
      ? 'És un DRET FONAMENTAL: vincula immediatament els poders públics com a dret directament aplicable ' +
        '(art. 39.1) i està protegit per la tutela preferent dels tribunals ordinaris i pel recurs d’empara ' +
        'davant el Tribunal Constitucional (art. 41).'
      : ctx.forca === 'principi-rector'
      ? 'ATENCIÓ — NO és un dret fonamental. És un PRINCIPI RECTOR del capítol V. Segons l’article 39.3, ' +
        'els drets del capítol V «conformen la legislació i l’acció dels poders públics, però només poden ' +
        'ésser invocats en els termes fixats per l’ordenament jurídic». NO gaudeix d’aplicació directa ' +
        '(art. 39.1, limitat als capítols III i IV) ni de recurs d’empara (art. 41). No l’anomenis mai ' +
        '«dret fonamental».'
      : ctx.forca === 'deure'
      ? 'És un DEURE constitucional, no un dret reclamable.'
      : ctx.forca === 'garantia'
      ? 'És una NORMA DE GARANTIA: defineix com es protegeixen els altres drets.'
      : ctx.forca === 'principi-general'
      ? 'És un PRINCIPI GENERAL interpretatiu.'
      : 'És una NORMA ORGÀNICA sobre el funcionament de les institucions, no sobre drets de les persones. ' +
        'No té via de recurs d’empara per als ciutadans.';

  return [
    'CONTEXT NORMATIU OBLIGATORI (no el contradiguis):',
    `- Norma: Constitució del Principat d'Andorra, de 1993. Cita els articles com «article ${ctx.article} de la Constitució», MAI com «CCA».`,
    `- Ubicació: ${ubicacio}.`,
    `- Força normativa: ${regla}`,
    `- Resum per a la persona usuària: ${ctx.quePucFer}`,
  ].join('\n');
}
