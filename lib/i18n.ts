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
      dretPlaner: 'Dret Planer',
      privacitat: 'Privacitat',
    },
    footer: {
      titol: 'dretplaner.ad',
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
      exempleAplicat: 'Exemple aplicat',
      comentariJuridic: 'Comentari Jurídic',
      assisteixMe: 'Assisteix-me',
      seleccionaSeccio: 'Selecciona una secció per veure el contingut ampliat de l\'article.',
      resumIA: 'Resum IA',
      generantResum: 'Generant resum...',
      generantExemples: 'Generant exemples...',
      analitzantDoctrina: 'Analitzant doctrina...',
      clicAssisteixMeResum: 'Fes clic al botó "Assisteix-me" per generar una explicació detallada d\'aquest article amb IA.',
      clicAssisteixMeExemples: 'Fes clic al botó "Assisteix-me" per generar exemples pràctics amb IA.',
      doctrinaDisponible: 'Informació de doctrina disponible després de generar la interpretació IA.',
      explicacioPlanera: 'Explicació Planera',
      aplicabilitatPractica: 'Aplicabilitat Pràctica',
      ajuda: 'Ajuda',
      subjectes: 'Subjectes',
      analisiDogmatica: 'Anàlisi Dogmàtica',
      concepteClau: 'Concepte Clau',
      ratioLegis: 'Ratio Legis',
      refJurisprudencial: 'Ref. Jurisprudencial',
      doctrinaJurisprudenciaIA: 'Doctrina i Jurisprudència IA',
      doctrinaRelacionada: 'Doctrina Relacionada (Articles)',
      jurisprudenciaRelacionada: 'Jurisprudència Relacionada (Sentències)',
      exemplesGenerats: 'Exemples Generats',
      casPractic: 'Cas pràctic',
    },
    cerca: {
      titol: 'Cerca',
      descripcio: 'Cerca articles de la Constitució, doctrina i jurisprudència d\'Andorra',
      cercaText: 'Cerca',
      placeholder: 'Introdueix paraules clau o una pregunta (cerca per significat)',
      filtrarPer: 'Filtrar per',
      tots: 'Tots',
      constitucio: 'Constitució',
      civil: 'Codi Civil',
      doctrina: 'Doctrina',
      cercar: 'Cercar',
      resultat: 'resultat trobat',
      resultats: 'resultats trobats',
      noResultats: 'No s\'han trobat resultats',
      provaAltres: 'Prova amb altres paraules clau o activa la cerca per significat',
      veureArticle: 'Veure article complet',
      modeParaules: 'Per paraules',
      modeSignificat: 'Per significat',
      modeTots: 'Paraules i significat',
      semanticaDesc: 'Cerca per significat troba contingut relacionat encara que no coincideixin les paraules exactes.',
      carregantSemantica: 'Cercant per significat...',
    },
    home: {
      titol: 'La Constitució d\'Andorra',
      subtitol: 'explicada per a tothom.',
      descripcio: 'Entén els teus drets constitucionals amb guies clares i pràctiques.',
      comença: 'Comença',
      aprenDret: 'Aprèn dret',
      estructuraTitol: 'Estructura de la Constitució',
      dretsFonamentals: 'Drets fonamentals',
      dretsFonamentalsDesc: 'Títol II - Drets i llibertats (Arts. 4-43)',
      nacionalitat: 'Nacionalitat',
      nacionalitatDesc: 'Títol I - Sobirania i ciutadania (Arts. 1-3)',
      poderJudicial: 'Poder judicial',
      poderJudicialDesc: 'Títol VII - Justícia (Arts. 85-94)',
      consellGeneral: 'Consell General',
      consellGeneralDesc: 'Títol IV - Parlament (Arts. 50-71)',
      govern: 'Govern',
      governDesc: 'Títol V - Poder executiu (Arts. 72-78)',
      preguntesRapides: 'Preguntes ràpides',
      pregunta1: 'Què són els drets fonamentals?',
      pregunta2: 'Com funciona el Consell General?',
      pregunta3: 'Els Coprínceps: funció i poders',
      pregunta4: 'El Tribunal Constitucional explicat',
      pregunta5: 'Drets i deures dels ciutadans',
      pregunta6: 'Com es reforma la Constitució?',
      dretsAccio: 'Drets en acció',
      dretIntimitat: 'Drets a la intimitat',
      llibertatExpressio: 'Llibertat d\'expressió',
      dretReunio: 'Dret de reunió',
      estudiaConstitucio: 'Estudia la Constitució',
      preambul: 'Preàmbul',
      titolsI_IV: 'Títols I-IV',
      titolsV_X: 'Títols V-X',
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
      dretPlaner: 'Dret Planer',
      privacitat: 'Privacidad',
    },
    footer: {
      titol: 'dretplaner.ad',
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
      exempleAplicat: 'Ejemplo aplicado',
      comentariJuridic: 'Comentario Jurídico',
      assisteixMe: 'Asísteme',
      seleccionaSeccio: 'Selecciona una sección para ver el contenido ampliado del artículo.',
      resumIA: 'Resumen IA',
      generantResum: 'Generando resumen...',
      generantExemples: 'Generando ejemplos...',
      analitzantDoctrina: 'Analizando doctrina...',
      clicAssisteixMeResum: 'Haz clic en el botón "Asísteme" para generar una explicación detallada de este artículo con IA.',
      clicAssisteixMeExemples: 'Haz clic en el botón "Asísteme" para generar ejemplos prácticos con IA.',
      doctrinaDisponible: 'Información de doctrina disponible después de generar la interpretación IA.',
      explicacioPlanera: 'Explicación Llana',
      aplicabilitatPractica: 'Aplicabilidad Práctica',
      ajuda: 'Ayuda',
      subjectes: 'Sujetos',
      analisiDogmatica: 'Análisis Dogmático',
      concepteClau: 'Concepto Clave',
      ratioLegis: 'Ratio Legis',
      refJurisprudencial: 'Ref. Jurisprudencial',
      doctrinaJurisprudenciaIA: 'Doctrina y Jurisprudencia IA',
      doctrinaRelacionada: 'Doctrina Relacionada (Artículos)',
      jurisprudenciaRelacionada: 'Jurisprudencia Relacionada (Sentencias)',
      exemplesGenerats: 'Ejemplos Generados',
      casPractic: 'Caso práctico',
    },
    cerca: {
      titol: 'Búsqueda',
      descripcio: 'Busca artículos de la Constitución, doctrina y jurisprudencia de Andorra',
      cercaText: 'Buscar',
      placeholder: 'Introduce palabras clave o una pregunta (búsqueda por significado)',
      filtrarPer: 'Filtrar por',
      tots: 'Todos',
      constitucio: 'Constitución',
      civil: 'Código Civil',
      doctrina: 'Doctrina',
      cercar: 'Buscar',
      resultat: 'resultado encontrado',
      resultats: 'resultados encontrados',
      noResultats: 'No se han encontrado resultados',
      provaAltres: 'Prueba con otras palabras clave o activa la búsqueda por significado',
      veureArticle: 'Ver artículo completo',
      modeParaules: 'Por palabras',
      modeSignificat: 'Por significado',
      modeTots: 'Palabras y significado',
      semanticaDesc: 'La búsqueda por significado encuentra contenido relacionado aunque no coincidan las palabras exactas.',
      carregantSemantica: 'Buscando por significado...',
    },
    home: {
      titol: 'La Constitución de Andorra',
      subtitol: 'explicada para todos.',
      descripcio: 'Entiende tus derechos constitucionales con guías claras y prácticas.',
      comença: 'Comenzar',
      aprenDret: 'Aprende derecho',
      estructuraTitol: 'Estructura de la Constitución',
      dretsFonamentals: 'Derechos fundamentales',
      dretsFonamentalsDesc: 'Título II - Derechos y libertades (Arts. 4-43)',
      nacionalitat: 'Nacionalidad',
      nacionalitatDesc: 'Título I - Soberanía y ciudadanía (Arts. 1-3)',
      poderJudicial: 'Poder judicial',
      poderJudicialDesc: 'Título VII - Justicia (Arts. 85-94)',
      consellGeneral: 'Consejo General',
      consellGeneralDesc: 'Título IV - Parlamento (Arts. 50-71)',
      govern: 'Gobierno',
      governDesc: 'Título V - Poder ejecutivo (Arts. 72-78)',
      preguntesRapides: 'Preguntas rápidas',
      pregunta1: '¿Qué son los derechos fundamentales?',
      pregunta2: '¿Cómo funciona el Consejo General?',
      pregunta3: 'Los Copríncipes: función y poderes',
      pregunta4: 'El Tribunal Constitucional explicado',
      pregunta5: 'Derechos y deberes de los ciudadanos',
      pregunta6: '¿Cómo se reforma la Constitución?',
      dretsAccio: 'Derechos en acción',
      dretIntimitat: 'Derechos a la intimidad',
      llibertatExpressio: 'Libertad de expresión',
      dretReunio: 'Derecho de reunión',
      estudiaConstitucio: 'Estudia la Constitución',
      preambul: 'Preámbulo',
      titolsI_IV: 'Títulos I-IV',
      titolsV_X: 'Títulos V-X',
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
      dretPlaner: 'Dret Planer',
      privacitat: 'Confidentialité',
    },
    footer: {
      titol: 'dretplaner.ad',
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
      exempleAplicat: 'Exemple appliqué',
      comentariJuridic: 'Commentaire Juridique',
      assisteixMe: 'Assiste-moi',
      seleccionaSeccio: 'Sélectionnez une section pour voir le contenu élargi de l\'article.',
      resumIA: 'Résumé IA',
      generantResum: 'Génération du résumé...',
      generantExemples: 'Génération d\'exemples...',
      analitzantDoctrina: 'Analyse de la doctrine...',
      clicAssisteixMeResum: 'Cliquez sur le bouton "Assiste-moi" pour générer une explication détaillée de cet article avec l\'IA.',
      clicAssisteixMeExemples: 'Cliquez sur le bouton "Assiste-moi" pour générer des exemples pratiques avec l\'IA.',
      doctrinaDisponible: 'Informations de doctrine disponibles après avoir généré l\'interprétation IA.',
      explicacioPlanera: 'Explication Simple',
      aplicabilitatPractica: 'Applicabilité Pratique',
      ajuda: 'Aide',
      subjectes: 'Sujets',
      analisiDogmatica: 'Analyse Dogmatique',
      concepteClau: 'Concept Clé',
      ratioLegis: 'Ratio Legis',
      refJurisprudencial: 'Réf. Jurisprudentielle',
      doctrinaJurisprudenciaIA: 'Doctrine et Jurisprudence IA',
      doctrinaRelacionada: 'Doctrine Liée (Articles)',
      jurisprudenciaRelacionada: 'Jurisprudence Liée (Arrêts)',
      exemplesGenerats: 'Exemples Générés',
      casPractic: 'Cas pratique',
    },
    cerca: {
      titol: 'Recherche',
      descripcio: 'Rechercher des articles de la Constitution, doctrine et jurisprudence d\'Andorre',
      cercaText: 'Rechercher',
      placeholder: 'Entrez des mots-clés ou une question (recherche par sens)',
      filtrarPer: 'Filtrer par',
      tots: 'Tous',
      constitucio: 'Constitution',
      civil: 'Code Civil',
      doctrina: 'Doctrine',
      cercar: 'Rechercher',
      resultat: 'résultat trouvé',
      resultats: 'résultats trouvés',
      noResultats: 'Aucun résultat trouvé',
      provaAltres: 'Essayez d\'autres mots-clés ou activez la recherche par sens',
      veureArticle: 'Voir l\'article complet',
      modeParaules: 'Par mots',
      modeSignificat: 'Par sens',
      modeTots: 'Mots et sens',
      semanticaDesc: 'La recherche par sens trouve du contenu lié même si les mots exacts ne correspondent pas.',
      carregantSemantica: 'Recherche par sens...',
    },
    home: {
      titol: 'La Constitution d\'Andorre',
      subtitol: 'expliquée pour tous.',
      descripcio: 'Comprends tes droits constitutionnels avec des guides clairs et pratiques.',
      comença: 'Commencer',
      aprenDret: 'Apprends le droit',
      estructuraTitol: 'Structure de la Constitution',
      dretsFonamentals: 'Droits fondamentaux',
      dretsFonamentalsDesc: 'Titre II - Droits et libertés (Arts. 4-43)',
      nacionalitat: 'Nationalité',
      nacionalitatDesc: 'Titre I - Souveraineté et citoyenneté (Arts. 1-3)',
      poderJudicial: 'Pouvoir judiciaire',
      poderJudicialDesc: 'Titre VII - Justice (Arts. 85-94)',
      consellGeneral: 'Conseil Général',
      consellGeneralDesc: 'Titre IV - Parlement (Arts. 50-71)',
      govern: 'Gouvernement',
      governDesc: 'Titre V - Pouvoir exécutif (Arts. 72-78)',
      preguntesRapides: 'Questions rapides',
      pregunta1: 'Quels sont les droits fondamentaux?',
      pregunta2: 'Comment fonctionne le Conseil Général?',
      pregunta3: 'Les Coprinces: fonction et pouvoirs',
      pregunta4: 'Le Tribunal Constitutionnel expliqué',
      pregunta5: 'Droits et devoirs des citoyens',
      pregunta6: 'Comment la Constitution est-elle réformée?',
      dretsAccio: 'Droits en action',
      dretIntimitat: 'Droits à l\'intimité',
      llibertatExpressio: 'Liberté d\'expression',
      dretReunio: 'Droit de réunion',
      estudiaConstitucio: 'Étudie la Constitution',
      preambul: 'Préambule',
      titolsI_IV: 'Titres I-IV',
      titolsV_X: 'Titres V-X',
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
  const stored = localStorage.getItem('dretplaner.idioma');
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
  localStorage.setItem('dretplaner.idioma', idioma);
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

