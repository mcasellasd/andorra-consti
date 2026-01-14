/**
 * Corpus RAG per a la Constitució d'Andorra
 * Només treballem amb la Constitució, no amb el Codi Civil
 */

import type { EmbeddingEntry, KnowledgeEntry, RetrievedContext } from './types';

// Intentar carregar el corpus unificat, si no existeix, carregar només la Constitució
let constitucioKnowledge: any;
let constitucioEmbeddings: any;

try {
  // @ts-ignore - Dynamic import per permetre fallback
  constitucioKnowledge = require('@/data/rag/constitucio-unified.json');
  // @ts-ignore
  constitucioEmbeddings = require('@/data/rag/constitucio-unified-embeddings.json');
} catch {
  // Si no existeix el corpus unificat, utilitzar només la Constitució
  try {
    constitucioKnowledge = require('@/data/rag/constitucio.json');
    constitucioEmbeddings = require('@/data/rag/constitucio-embeddings.json');
  } catch {
    constitucioKnowledge = [];
    constitucioEmbeddings = [];
  }
}

interface NormalizedEmbedding extends EmbeddingEntry {
  norm: number;
}

interface CorpusData {
  knowledge: KnowledgeEntry[];
  knowledgeById: Map<string, KnowledgeEntry>;
  embeddings: NormalizedEmbedding[];
}

// Carregar només la Constitució
const corpus: CorpusData = loadCorpus(constitucioKnowledge, constitucioEmbeddings);

function loadCorpus(
  knowledgeRaw: unknown,
  embeddingsRaw: unknown
): CorpusData {
  const knowledge = (knowledgeRaw as KnowledgeEntry[]) ?? [];

  const knowledgeById = new Map<string, KnowledgeEntry>();
  knowledge.forEach((entry) => {
    knowledgeById.set(entry.id, entry);
  });

  const embeddings = ((embeddingsRaw as EmbeddingEntry[]) ?? []).map(
    (entry) => ({
      ...entry,
      norm: vectorNorm(entry.embedding)
    })
  );

  return {
    knowledge,
    knowledgeById,
    embeddings
  };
}

export function getAvailableBooks(): string[] {
  // Retornem només 'CONSTITUCIO' per indicar que només treballem amb la Constitució
  return corpus.knowledge.length > 0 ? ['CONSTITUCIO'] : [];
}

export function getKnowledgeEntries(): KnowledgeEntry[] {
  return corpus.knowledge.slice();
}

/**
 * Busca un article específic per ID al corpus
 * @param articleId - ID de l'article (ex: "CONST_019")
 * @returns L'entrada de coneixement si es troba, null si no
 */
export function getArticleById(articleId: string): KnowledgeEntry | null {
  return corpus.knowledgeById.get(articleId) || null;
}

/**
 * Busca múltiples articles per IDs
 * @param articleIds - Array d'IDs d'articles
 * @returns Array d'entrades de coneixement trobades
 */
export function getArticlesByIds(articleIds: string[]): KnowledgeEntry[] {
  return articleIds
    .map(id => corpus.knowledgeById.get(id))
    .filter((entry): entry is KnowledgeEntry => entry !== null && entry !== undefined);
}

/**
 * Busca articles per número d'article a la Constitució
 * @param articleNumber - Número de l'article (ex: "19", "Article 19")
 * @returns L'entrada de coneixement si es troba, null si no
 */
export function getArticleByNumber(articleNumber: string): KnowledgeEntry | null {
  // Normalitzar el número (treure "Article" i espais)
  const normalizedNumber = articleNumber
    .replace(/^Article\s+/i, '')
    .trim()
    .padStart(3, '0'); // "19" -> "019"
  
  const articleId = `CONST_${normalizedNumber}`;
  return corpus.knowledgeById.get(articleId) || null;
}

export function retrieveTopMatches(
  queryEmbedding: number[],
  topK = 3,
  books?: string[] // Ara és opcional i no s'utilitza
): RetrievedContext[] {
  const queryNorm = vectorNorm(queryEmbedding);
  if (queryNorm === 0) {
    return [];
  }

  if (!corpus.embeddings.length) {
    throw new Error(
      'No hi ha embeddings disponibles per a la Constitució. Executa el script corresponent per generar-los.'
    );
  }

  const scored = corpus.embeddings
    .map((entry) => ({
      id: entry.id,
      score: cosineSimilarity(
        queryEmbedding,
        queryNorm,
        entry.embedding,
        entry.norm
      )
    }))
    .filter((item) => Number.isFinite(item.score))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  const results: RetrievedContext[] = [];
  for (const { id, score } of scored) {
    const entry = corpus.knowledgeById.get(id);
    if (entry) {
      results.push({
        bookId: 'CONSTITUCIO' as const,
        entry,
        score
      });
    }
  }
  return results;
}

function cosineSimilarity(
  vectorA: number[],
  normA: number,
  vectorB: number[],
  normB: number
): number {
  if (normA === 0 || normB === 0) {
    return 0;
  }
  const length = Math.min(vectorA.length, vectorB.length);
  let dot = 0;
  for (let i = 0; i < length; i++) {
    dot += vectorA[i] * vectorB[i];
  }
  return dot / (normA * normB);
}

function vectorNorm(vector: number[]): number {
  let sumSquares = 0;
  for (const value of vector) {
    sumSquares += value * value;
  }
  return Math.sqrt(sumSquares);
}
