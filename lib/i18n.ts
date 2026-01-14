/**
 * Sistema d'internacionalització (i18n) per a prudencia.ad
 * Suporta: Català (ca), Castellà (es), Francès (fr)
 */

export type Idioma = 'ca' | 'es' | 'fr';

export const idiomesDisponibles: Idioma[] = ['ca', 'es', 'fr'];

export const nomsIdiomes: Record<Idioma, string> = {
  ca: 'Català',
  es: 'Castellà',
  fr: 'Francès',
};

// Traduccions de la UI
export const traduccions = {
  ca: {
    nav: {
      inici: 'Inici',
      codis: 'Codis',
      constitucio: 'Constitució',
      codiCivil: 'Procediment Civil',
      codiPenal: 'Codi Penal',
      jurisprudencia: 'Jurisprudència',
      cerca: 'Cerca',
      comparador: 'Comparador',
      guies: 'Guies',
      about: 'Sobre',
      paper: 'Paper Acadèmic',
      preguntesControl: 'Preguntes de Control',
      comEstaFet: 'Com està fet',
    },
    footer: {
      titol: 'prudencia.ad',
      descripcio: 'Portal d\'Accessibilitat Jurídica Assistida per IA per al Principat d\'Andorra.',
      avis: 'Avís',
      avisText: 'La informació és orientativa i no constitueix assessorament legal. Per a consultes específiques, adreça\'t a professionals titulats.',
      contacte: 'Contacte',
    },
    article: {
      interpretacioIA: 'Mostrar interpretació assistida per IA',
      resum: 'Resum',
      exemples: 'Exemples pràctics',
      conceptesClau: 'Conceptes clau',
      articlesRelacionats: 'Articles relacionats',
      textOficial: 'Text oficial',
      etiquetes: 'Etiquetes',
      vigencia: 'Vigència',
      anterior: '← Anterior',
      seguent: 'Següent →',
      constitucio: 'Constitució d\'Andorra',
      codiCivil: 'Codi Civil d\'Andorra',
      llibre: 'Llibre',
      capitol: 'Capítol',
      constitucioBreadcrumb: 'Constitució',
      jurisprudencia: 'Jurisprudència',
      tribunal: 'Tribunal',
      dataSentencia: 'Data',
      numeroSentencia: 'Número',
      noJurisprudencia: 'No s\'ha trobat jurisprudència relacionada amb aquest article.',
      buscarJurisprudencia: 'Cercar jurisprudència',
    },
    cerca: {
      titol: 'Cerca',
      descripcio: 'Cerca articles de la Constitució i del Codi Civil d\'Andorra',
      cercaText: 'Cerca',
      placeholder: 'Introdueix paraules clau, títols, numeracions...',
      filtrarPer: 'Filtrar per',
      tots: 'Tots',
      constitucio: 'Constitució',
      civil: 'Codi Civil',
      cercar: 'Cercar',
      resultat: 'resultat trobat',
      resultats: 'resultats trobats',
      noResultats: 'No s\'han trobat resultats',
      provaAltres: 'Prova amb altres paraules clau o canvia els filtres',
      veureArticle: 'Veure article complet',
    },
  },
  es: {
    nav: {
      inici: 'Inicio',
      codis: 'Códigos',
      codiCivil: 'Procedimiento Civil',
      codiPenal: 'Código Penal',
      codiConsum: 'Código de Consumo',
      jurisprudencia: 'Jurisprudencia',
      cerca: 'Búsqueda',
      comparador: 'Comparador',
      guies: 'Guías',
      about: 'Acerca de',
      paper: 'Paper Académico',
      preguntesControl: 'Preguntas de Control',
      comEstaFet: 'Cómo está hecho',
    },
    footer: {
      titol: 'prudencia.ad',
      descripcio: 'Portal de Accesibilidad Jurídica Asistida por IA para el Principado de Andorra.',
      avis: 'Aviso',
      avisText: 'La información es orientativa y no constituye asesoramiento legal. Para consultas específicas, dirígete a profesionales titulados.',
      contacte: 'Contacto',
    },
    article: {
      interpretacioIA: 'Mostrar interpretación asistida por IA',
      resum: 'Resumen',
      exemples: 'Ejemplos prácticos',
      conceptesClau: 'Conceptos clave',
      articlesRelacionats: 'Artículos relacionados',
      textOficial: 'Texto oficial',
      etiquetes: 'Etiquetas',
      vigencia: 'Vigencia',
      anterior: '← Anterior',
      seguent: 'Siguiente →',
      constitucio: 'Constitución de Andorra',
      codiCivil: 'Código Civil de Andorra',
      llibre: 'Libro',
      capitol: 'Capítulo',
      constitucioBreadcrumb: 'Constitución',
      jurisprudencia: 'Jurisprudencia',
      tribunal: 'Tribunal',
      dataSentencia: 'Fecha',
      numeroSentencia: 'Número',
      noJurisprudencia: 'No se ha encontrado jurisprudencia relacionada con este artículo.',
      buscarJurisprudencia: 'Buscar jurisprudencia',
    },
    cerca: {
      titol: 'Búsqueda',
      descripcio: 'Busca artículos de la Constitución y del Código Civil de Andorra',
      cercaText: 'Buscar',
      placeholder: 'Introduce palabras clave, títulos, numeraciones...',
      filtrarPer: 'Filtrar por',
      tots: 'Todos',
      constitucio: 'Constitución',
      civil: 'Código Civil',
      cercar: 'Buscar',
      resultat: 'resultado encontrado',
      resultats: 'resultados encontrados',
      noResultats: 'No se han encontrado resultados',
      provaAltres: 'Prueba con otras palabras clave o cambia los filtros',
      veureArticle: 'Ver artículo completo',
    },
  },
  fr: {
    nav: {
      inici: 'Accueil',
      codis: 'Codes',
      constitucio: 'Constitution',
      codiCivil: 'Procédure Civile',
      codiPenal: 'Code Pénal',
      codiConsum: 'Code de la Consommation',
      jurisprudencia: 'Jurisprudence',
      cerca: 'Recherche',
      comparador: 'Comparateur',
      guies: 'Guides',
      about: 'À propos',
      paper: 'Article Académique',
      preguntesControl: 'Questions de Contrôle',
      comEstaFet: 'Comment c\'est fait',
    },
    footer: {
      titol: 'prudencia.ad',
      descripcio: 'Portail d\'Accessibilité Juridique Assistée par IA pour la Principauté d\'Andorre.',
      avis: 'Avis',
      avisText: 'Les informations sont indicatives et ne constituent pas un conseil juridique. Pour des consultations spécifiques, adressez-vous à des professionnels titulaires.',
      contacte: 'Contact',
    },
    article: {
      interpretacioIA: 'Afficher l\'interprétation assistée par IA',
      resum: 'Résumé',
      exemples: 'Exemples pratiques',
      conceptesClau: 'Concepts clés',
      articlesRelacionats: 'Articles liés',
      textOficial: 'Texte officiel',
      etiquetes: 'Étiquettes',
      vigencia: 'Vigueur',
      anterior: '← Précédent',
      seguent: 'Suivant →',
      constitucio: 'Constitution d\'Andorre',
      codiCivil: 'Code Civil d\'Andorre',
      llibre: 'Livre',
      capitol: 'Chapitre',
      constitucioBreadcrumb: 'Constitution',
      jurisprudencia: 'Jurisprudence',
      tribunal: 'Tribunal',
      dataSentencia: 'Date',
      numeroSentencia: 'Numéro',
      noJurisprudencia: 'Aucune jurisprudence liée à cet article n\'a été trouvée.',
      buscarJurisprudencia: 'Rechercher la jurisprudence',
    },
    cerca: {
      titol: 'Recherche',
      descripcio: 'Rechercher des articles de la Constitution et du Code Civil d\'Andorre',
      cercaText: 'Rechercher',
      placeholder: 'Entrez des mots-clés, titres, numéros...',
      filtrarPer: 'Filtrer par',
      tots: 'Tous',
      constitucio: 'Constitution',
      civil: 'Code Civil',
      cercar: 'Rechercher',
      resultat: 'résultat trouvé',
      resultats: 'résultats trouvés',
      noResultats: 'Aucun résultat trouvé',
      provaAltres: 'Essayez d\'autres mots-clés ou changez les filtres',
      veureArticle: 'Voir l\'article complet',
    },
  },
};

/**
 * Obté l'idioma actual des de la URL o localStorage
 */
export function getIdiomaActual(): Idioma {
  if (typeof window === 'undefined') return 'ca';

  // Intentar obtenir de la URL
  const path = window.location.pathname;
  const match = path.match(/^\/(ca|es|fr)\//);
  if (match) {
    return match[1] as Idioma;
  }

  // Intentar obtenir de localStorage
  const stored = localStorage.getItem('prudencia.idioma');
  if (stored && idiomesDisponibles.includes(stored as Idioma)) {
    return stored as Idioma;
  }

  // Per defecte: català
  return 'ca';
}

/**
 * Estableix l'idioma i el guarda a localStorage
 */
export function setIdioma(idioma: Idioma): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('prudencia.idioma', idioma);
}

/**
 * Obté la traducció per a una clau
 */
export function t(idioma: Idioma, clau: string): string {
  const keys = clau.split('.');
  let value: any = traduccions[idioma];

  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) {
      // Fallback a català
      value = traduccions.ca;
      for (const k of keys) {
        value = value?.[k];
      }
      break;
    }
  }

  return typeof value === 'string' ? value : clau;
}

// ============================================================================
// FUNCIONS AUXILIARS PER A TRADUCCIONS DE CONTINGUT
// ============================================================================

/**
 * Interfície per a objectes amb traduccions de text
 */
export interface Traduible {
  idiomes?: {
    ca?: string;
    es?: string;
    fr?: string;
  };
}

/**
 * Obté el text traduït d'un article segons l'idioma actual
 * Si no hi ha traducció, retorna el text oficial (català)
 */
export function getArticleText(
  article: { idiomes?: { ca?: string; es?: string; fr?: string }; text_oficial: string },
  idioma: Idioma
): string {
  return article.idiomes?.[idioma] || article.text_oficial;
}

/**
 * Obté traducció amb fallback automàtic
 * Utilitzat per qualsevol objecte amb estructura idiomes
 */
export function getTranslation(
  obj: Traduible,
  defaultValue: string,
  idioma: Idioma
): string {
  return obj.idiomes?.[idioma] || defaultValue;
}

/**
 * Verifica si existeix traducció per a un idioma
 */
export function hasTranslation(
  obj: Traduible,
  idioma: Idioma
): boolean {
  return !!obj.idiomes?.[idioma];
}

/**
 * Retorna tots els idiomes disponibles per a un objecte
 */
export function getAvailableLanguages(obj: Traduible): Idioma[] {
  const available: Idioma[] = ['ca']; // Català sempre disponible
  if (obj.idiomes) {
    if (obj.idiomes.es) available.push('es');
    if (obj.idiomes.fr) available.push('fr');
  }
  return available;
}

