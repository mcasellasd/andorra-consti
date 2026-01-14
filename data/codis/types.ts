/**
 * Tipus de dades per als articles legals andorrans
 * Segons l'esquema del briefing tècnic de prudencia.ad
 */

export interface ArticleAndorra {
  id: string; // Ex: "cc-art-001"
  codi: string; // "civil", "penal", "consum", etc.
  numeracio: string; // "Article 1", "Article 412-15"
  llibre: string; // "I", "II", etc.
  titol: string; // "Disposicions generals"
  capitol: string | null;
  text_oficial: string; // Text literal de l'article
  vigencia: string; // "2022-12-15"
  modificacions?: Modificacio[];
  enllacos?: string[]; // IDs d'articles relacionats
  tags?: string[]; // ["dret civil", "àmbit aplicació"]
  idiomes?: {
    // Traducció del text de l'article
    ca?: string;
    es?: string;
    fr?: string;
    // Traduccions de metadades
    titol?: {
      ca?: string;
      es?: string;
      fr?: string;
    };
    capitol?: {
      ca?: string;
      es?: string;
      fr?: string;
    };
    tags?: {
      ca?: string[];
      es?: string[];
      fr?: string[];
    };
  };
  
  // New fields for extended metadata
  norma?: string;
  rang?: string;
  ambit?: string;
  dimensions_comprensio?: {
    dogmatica: {
      concepte_clau: string;
      ratio_legis: string;
      jurisprudencia_clau: string;
    };
    simplificacio_supervisada: {
      nivell_planer: string;
      termes_clau: string[];
    };
    aplicabilitat_residencia: {
      subjectivitat: string;
      ajuda_practica: string;
    };
  };
  relacions?: {
    tipus: string; // "desplegament", "analogia", etc.
    desti: string;
  }[];
}

export interface Modificacio {
  data: string;
  llei: string; // "Llei qualificada 35/2022"
}

export interface InterpretacioIA {
  article_id: string;
  resum: {
    ca: string;
    es: string;
    fr: string;
  };
  exemples: Exemple[];
  conceptes_clau: string[];
  articles_relacionats: string[];
  jurisprudencia_vinculada?: string[];
  generat_data: string;
  revisat: boolean;
  // Nous camps per a context normatiu
  finalitat?: string; // Per a què serveix la norma
  destinataris?: string; // A qui va dirigida
  aplicacio?: string; // Com s'aplica
  doctrina_jurisprudencia?: string; // Com ho veu la doctrina i jurisprudència
}

export interface Exemple {
  cas: string;
  idioma: "ca" | "es" | "fr";
}

export interface Sentencia {
  id: string; // "tsa-2023-045"
  tribunal: string; // "Tribunal Superior d'Andorra"
  numero: string; // "45/2023"
  data: string; // "2023-06-15"
  articles_afectats: string[]; // ["cc-art-412-15"]
  resum_ia: string;
  text_complet_url?: string;
  tags: string[];
}

export interface CodiMetadata {
  id: string;
  titol: string;
  data_vigencia: string;
  ultima_modificacio: string;
  descripcio: string;
  idiomes: {
    ca: string;
    es: string;
    fr: string;
  };
}

