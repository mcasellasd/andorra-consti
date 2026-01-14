/**
 * Base de dades de jurisprudència del Principat d'Andorra
 * Relacionada amb articles de la Constitució i el Codi Civil
 */

export interface SentenciaAndorra {
  id: string; // Ex: "TSA-2023-045"
  tribunal: string; // "Tribunal Superior d'Andorra", "Tribunal de Corts", etc.
  numero: string; // "45/2023"
  data: string; // "2023-06-15" (format YYYY-MM-DD)
  titol?: string; // Títol descriptiu de la sentència
  resum: string; // Resum de la sentència
  text_complet_url?: string; // URL a la sentència completa (si està disponible)
  articles_afectats: string[]; // IDs d'articles relacionats (ex: ["CONST_001", "CCA_LI_A001"])
  codi?: string; // "constitucio", "civil", etc.
  tags?: string[]; // Paraules clau per facilitar la cerca
}

/**
 * Base de dades de jurisprudència d'Andorra
 * Afegir nous casos segons es vagin trobant
 * 
 * IMPORTANT: Abans d'afegir una nova sentència, assegurar-se que tots els articles_afectats
 * existeixen a la base de dades d'articles. Utilitzar el script validate-jurisprudencia.ts
 * per validar tota la base de dades.
 */
export const jurisprudenciaDatabase: SentenciaAndorra[] = [
  // Aquí s'afegiran els casos de jurisprudència d'Andorra
  // Exemple de format:
  // {
  //   id: "TSA-2023-001",
  //   tribunal: "Tribunal Superior d'Andorra",
  //   numero: "001/2023",
  //   data: "2023-01-15",
  //   titol: "Sentència sobre interpretació de l'article 1 de la Constitució",
  //   resum: "La sentència interpreta l'article 1 de la Constitució d'Andorra establint...",
  //   articles_afectats: ["CONST_001"],
  //   codi: "constitucio",
  //   tags: ["sobirania", "estat", "interpretació"]
  // }
];

/**
 * Funció helper per validar una sentència abans d'afegir-la a la base de dades
 * Utilitza aquesta funció en desenvolupament per assegurar que els articles siguin correctes
 * 
 * @param sentencia - Sentència a validar
 * @param validateArticleId - Funció que valida si un article ID existeix
 * @returns true si tots els articles són vàlids, false si n'hi ha algun invàlid
 */
export function validateSentenciaBeforeAdding(
  sentencia: SentenciaAndorra,
  validateArticleId: (id: string) => boolean
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!sentencia.id || sentencia.id.trim() === '') {
    errors.push('La sentència ha de tenir un ID vàlid');
  }

  if (!sentencia.articles_afectats || sentencia.articles_afectats.length === 0) {
    errors.push(`La sentència ${sentencia.id} no té articles associats`);
  } else {
    for (const articleId of sentencia.articles_afectats) {
      if (!validateArticleId(articleId)) {
        errors.push(
          `La sentència ${sentencia.id} fa referència a l'article "${articleId}" que NO EXISTEIX`
        );
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Busca jurisprudència relacionada amb un article específic
 * @param articleId - ID de l'article (ex: "CONST_001", "CCA_LI_A001")
 * @returns Array de sentències relacionades
 */
export function getJurisprudenciaForArticle(articleId: string): SentenciaAndorra[] {
  return jurisprudenciaDatabase.filter((sentencia) => 
    sentencia.articles_afectats.includes(articleId)
  );
}

/**
 * Busca jurisprudència per paraules clau
 * @param keywords - Array de paraules clau per cercar
 * @returns Array de sentències relacionades
 */
export function searchJurisprudencia(keywords: string[]): SentenciaAndorra[] {
  if (keywords.length === 0) return [];
  
  const keywordsLower = keywords.map(k => k.toLowerCase());
  
  return jurisprudenciaDatabase.filter((sentencia) => {
    // Buscar en tags
    if (sentencia.tags) {
      const tagsMatch = sentencia.tags.some(tag => 
        keywordsLower.some(kw => tag.toLowerCase().includes(kw))
      );
      if (tagsMatch) return true;
    }
    
    // Buscar en resum
    const resumLower = sentencia.resum.toLowerCase();
    if (keywordsLower.some(kw => resumLower.includes(kw))) return true;
    
    // Buscar en títol
    if (sentencia.titol) {
      const titolLower = sentencia.titol.toLowerCase();
      if (keywordsLower.some(kw => titolLower.includes(kw))) return true;
    }
    
    return false;
  });
}

/**
 * Busca jurisprudència per codi (constitució, civil, etc.)
 * @param codi - Codi del text legal
 * @returns Array de sentències relacionades
 */
export function getJurisprudenciaByCodi(codi: string): SentenciaAndorra[] {
  return jurisprudenciaDatabase.filter((sentencia) => 
    sentencia.codi === codi
  );
}
