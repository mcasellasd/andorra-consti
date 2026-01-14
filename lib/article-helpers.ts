/**
 * Funcions helper per treballar amb articles i jurisprudència
 */

import { articlesConstitucio } from '../data/codis/constitucio/articles';
import type { ArticleAndorra } from '../data/codis/types';

/**
 * Troba l'article per número i retorna el seu ID
 * @param articleNumber - Número de l'article (ex: "Article 1", "Article 47")
 * @param codi - Codi del text legal ("constitucio") - el civil ha estat eliminat
 * @returns ID de l'article o null si no es troba
 */
export function getArticleIdByNumber(
  articleNumber: string,
  codi: 'constitucio'
): string | null {
  // Normalitzar el número d'article (treure "Article" i espais)
  const normalizedNumber = articleNumber
    .replace(/^Article\s+/i, '')
    .trim();

  if (codi === 'constitucio') {
    const article = articlesConstitucio.find((art) => {
      const artNumber = art.numeracio.replace(/^Article\s+/i, '').trim();
      return artNumber === normalizedNumber;
    });
    return article?.id || null;
  }

  return null;
}

/**
 * Determina el codi (constitucio) a partir del número d'article o títol
 * @param articleNumber - Número de l'article
 * @param articleTitle - Títol de l'article (opcional, per ajudar a determinar)
 * @returns 'constitucio' | null
 */
export function detectCodiFromArticle(
  articleNumber: string,
  articleTitle?: string
): 'constitucio' | null {
  // Intentar buscar només a la base de dades de la constitució
  const normalizedNumber = articleNumber.replace(/^Article\s+/i, '').trim();

  const foundInConstitucio = articlesConstitucio.some((art) => {
    const artNumber = art.numeracio.replace(/^Article\s+/i, '').trim();
    return artNumber === normalizedNumber;
  });

  if (foundInConstitucio) return 'constitucio';

  return null;
}

/**
 * Valida que un article ID existeixi a la base de dades
 * @param articleId - ID de l'article a validar
 * @returns true si existeix, false si no
 */
export function validateArticleId(articleId: string): boolean {
  // Verificar si existeix a la Constitució
  if (articlesConstitucio.some((art) => art.id === articleId)) {
    return true;
  }

  return false;
}

/**
 * Valida que tots els articles mencionats en un array d'IDs existeixin
 * @param articleIds - Array d'IDs d'articles a validar
 * @returns Objecte amb isValid (boolean) i invalidIds (array d'IDs no vàlids)
 */
export function validateArticleIds(articleIds: string[]): {
  isValid: boolean;
  invalidIds: string[];
} {
  const invalidIds: string[] = [];

  for (const id of articleIds) {
    if (!validateArticleId(id)) {
      invalidIds.push(id);
    }
  }

  return {
    isValid: invalidIds.length === 0,
    invalidIds,
  };
}

/**
 * Obté l'article complet per ID
 * @param articleId - ID de l'article
 * @returns L'article complet o null si no es troba
 */
export function getArticleById(articleId: string): ArticleAndorra | null {
  // Buscar a la Constitució
  const articleConst = articlesConstitucio.find((art) => art.id === articleId);
  if (articleConst) return articleConst;

  return null;
}
