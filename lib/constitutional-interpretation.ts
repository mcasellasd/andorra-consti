import { getContextConstitucional, type ContextConstitucional, type ForcaNormativa } from './prompts/context-constitucional';

export interface InterpretacioBaseConstitucional {
  context: ContextConstitucional;
  destinataris: string;
  aplicacio: string;
  limits: string;
  preguntes: string[];
  articlesRelacionats: string[];
}

function destinatarisPerForca(forca: ForcaNormativa): string {
  switch (forca) {
    case 'dret-fonamental':
      return 'S’adreça a totes les persones i vincula immediatament els poders públics.';
    case 'principi-rector':
      return 'Orienta la legislació i l’acció dels poders públics; només es pot invocar en els termes que estableixi l’ordenament jurídic.';
    case 'deure':
      return 'Estableix una obligació constitucional per a les persones a qui es refereix i que les lleis poden concretar.';
    case 'garantia':
      return 'S’adreça principalment als òrgans encarregats de protegir els drets i les llibertats.';
    case 'principi-general':
      return 'Informa la interpretació de la Constitució i l’actuació dels poders públics.';
    case 'organica':
      return 'S’adreça a les institucions i òrgans constitucionals que regula.';
  }
}

function aplicacioPerForca(forca: ForcaNormativa): string {
  switch (forca) {
    case 'dret-fonamental':
      return 'Es pot fer valer davant els tribunals ordinaris mitjançant les garanties previstes a la Constitució i, quan correspongui, mitjançant el recurs d’empara.';
    case 'principi-rector':
      return 'La seva aplicació depèn del desplegament legal i de les polítiques públiques que el concretin.';
    case 'deure':
      return 'La seva aplicació concreta depèn de les lleis que desenvolupin el deure constitucional.';
    case 'garantia':
      return 'S’aplica quan cal determinar quina via protegeix un dret o quina institució és competent per intervenir.';
    case 'principi-general':
      return 'S’utilitza com a criteri d’interpretació juntament amb l’article específic que sigui aplicable.';
    case 'organica':
      return 'S’aplica mitjançant les competències, procediments i relacions institucionals que estableix.';
  }
}

function limitsPerForca(forca: ForcaNormativa): string {
  switch (forca) {
    case 'dret-fonamental':
      return 'Cal llegir els límits i les excepcions del text literal i de les lleis que desenvolupen les seves garanties. Aquesta explicació no substitueix la interpretació judicial.';
    case 'principi-rector':
      return 'No es pot presentar com un dret fonamental directament exigible: l’article 39.3 remet als termes fixats per l’ordenament jurídic.';
    case 'deure':
      return 'No és, per si sol, un dret subjectiu que una persona pugui reclamar davant els tribunals.';
    case 'garantia':
      return 'No reconeix necessàriament un dret material nou; defineix les vies i condicions de protecció dels altres drets.';
    case 'principi-general':
      return 'Normalment no s’ha d’interpretar de manera aïllada, sinó en relació amb els drets i normes que concreta.';
    case 'organica':
      return 'No és una via ordinària de reclamació individual; regula l’organització i el funcionament de l’Estat.';
  }
}

function preguntesPerForca(forca: ForcaNormativa): string[] {
  switch (forca) {
    case 'dret-fonamental':
      return ['Quin dret protegeix?', 'Qui pot veure’l afectat?', 'Quines garanties i límits estableix el text?'];
    case 'principi-rector':
      return ['Quina actuació exigeix als poders públics?', 'Quina llei o política pública el desenvolupa?', 'Es pot invocar directament o cal una norma de desplegament?'];
    case 'deure':
      return ['A qui imposa l’obligació?', 'Quina llei en concreta el contingut?', 'Quina diferència hi ha entre aquest deure i un dret?'];
    case 'garantia':
      return ['Quin dret protegeix?', 'Quina institució és competent?', 'Quina via processal correspon?'];
    case 'principi-general':
      return ['Quin valor constitucional expressa?', 'Com ajuda a interpretar altres articles?', 'Quina relació té amb la supremacia constitucional?'];
    case 'organica':
      return ['Quina institució regula?', 'Quina competència o procediment estableix?', 'Com es relaciona amb els altres òrgans constitucionals?'];
  }
}

export function getInterpretacioBaseConstitucional(articleNumber: string | number): InterpretacioBaseConstitucional | null {
  const context = getContextConstitucional(articleNumber);
  if (!context) return null;

  return {
    context,
    destinataris: destinatarisPerForca(context.forca),
    aplicacio: aplicacioPerForca(context.forca),
    limits: limitsPerForca(context.forca),
    preguntes: preguntesPerForca(context.forca),
    articlesRelacionats: context.fonament.map((article) => `Article ${article}`),
  };
}
