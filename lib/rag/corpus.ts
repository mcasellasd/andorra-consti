/**
 * Corpus RAG per a la Constitució d'Andorra
 * Només treballem amb la Constitució, no amb el Codi Civil
 */

import type { EmbeddingEntry, KnowledgeEntry, RetrievedContext } from './types';
import { BM25 } from './bm25';

// Intentar carregar el corpus unificat, si no existeix, carregar només la Constitució
let constitucioKnowledge: any;
let constitucioEmbeddings: any;
let unifiedLoaded = false;

try {
  // @ts-ignore - Dynamic import per permetre fallback
  constitucioKnowledge = require('../../data/rag/constitucio-unified.json');
  // @ts-ignore
  constitucioEmbeddings = require('../../data/rag/constitucio-unified-embeddings.json');
  unifiedLoaded = true;
} catch {
  // Si no existeix el corpus unificat, utilitzar només la Constitució
  try {
    constitucioKnowledge = require('../../data/rag/constitucio.json');
    constitucioEmbeddings = require('../../data/rag/constitucio-embeddings.json');
  } catch {
    constitucioKnowledge = [];
    constitucioEmbeddings = [];
  }
}

// Carregar doctrina (només si no tenim el corpus unificat, per evitar duplicats i permetre fallback)
// Nota: El corpus unificat JA inclou la doctrina processada.
// Hem eliminat la càrrega legacy de '20-anys.json' per evitar errors de build si no existeix.
let doctrinaKnowledge: any = [];
let doctrinaEmbeddings: any = [];

interface NormalizedEmbedding extends EmbeddingEntry {
  norm: number;
}

interface CorpusData {
  knowledge: KnowledgeEntry[];
  knowledgeById: Map<string, KnowledgeEntry>;
  embeddings: NormalizedEmbedding[];
}

// Carregar Constitució i Doctrina
const corpus: CorpusData = loadCorpus(
  [...(constitucioKnowledge as KnowledgeEntry[]), ...(doctrinaKnowledge as KnowledgeEntry[])],
  [...(constitucioEmbeddings as EmbeddingEntry[]), ...(doctrinaEmbeddings as EmbeddingEntry[])]
);

// Inicialitzar índex de cerca híbrida (BM25)
const bm25 = new BM25();
bm25.buildIndex(corpus.knowledge.map(entry => ({
  id: entry.id,
  content: entry.content,
  topic: entry.topic
})));

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
  // Retornem també DOCTRINA si n'hi ha
  return corpus.knowledge.length > 0 ? ['CONSTITUCIO', 'DOCTRINA'] : [];
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
      // Determinar l'ID del llibre segons l'ID de l'entrada
      let bookId: 'CONSTITUCIO' | 'DOCTRINA' = 'CONSTITUCIO';
      if (entry.id.startsWith('DOC_') || entry.category === 'Doctrina') {
        bookId = 'DOCTRINA';
      }

      results.push({
        bookId,
        entry,
        score
      });
    }
  }
  return results;
}

/**
 * Cerca híbrida combinant vectors (semàntica) i BM25 (paraules clau)
 * Utilitza Reciprocal Rank Fusion (RRF) per combinar els resultats
 */
export function retrieveHybridMatches(
  queryEmbedding: number[],
  queryText: string,
  topK = 5
): RetrievedContext[] {
  const queryNorm = vectorNorm(queryEmbedding);
  const k = 60; // Constant RRF estàndard

  // 1. Obtenir resultats semàntics (Top 50)
  // Reutilitzem la lògica de retrieveTopMatches però interna
  const semanticScores = new Map<string, number>();
  if (queryNorm !== 0 && corpus.embeddings.length > 0) {
    corpus.embeddings
      .map(entry => ({
        id: entry.id,
        score: cosineSimilarity(queryEmbedding, queryNorm, entry.embedding, entry.norm)
      }))
      .filter(item => item.score > 0.1) // Filtrar soroll
      .sort((a, b) => b.score - a.score)
      .slice(0, 50)
      .forEach((item, rank) => {
        // Guardem el rank semàntic (0-indexed)
        semanticScores.set(item.id, rank);
      });
  }

  // 2. Obtenir resultats BM25 (Top 50)
  const bm25Results = bm25.search(queryText, 50);
  const bm25Scores = new Map<string, number>();
  bm25Results.forEach((item, rank) => {
    bm25Scores.set(item.id, rank); // Guardem el rank BM25
  });

  // 3. Fusionar amb RRF
  // Score = 1/(k + rank_sem) + 1/(k + rank_bm25)
  const allIds = Array.from(new Set([...Array.from(semanticScores.keys()), ...Array.from(bm25Scores.keys())]));
  const fusedResults: Array<{ id: string, score: number, debug?: string }> = [];

  allIds.forEach(id => {
    const semanticRank = semanticScores.has(id) ? semanticScores.get(id)! : 1000; // Penalització si no hi és
    const bm25Rank = bm25Scores.has(id) ? bm25Scores.get(id)! : 1000;

    const rrfScore = (1 / (k + semanticRank)) + (1 / (k + bm25Rank));

    // Normalitzar score per ser semblant a cosine (0-1) encara que RRF és petit
    // Simplement passem el RRF score, però l'ordenem bé
    fusedResults.push({ id, score: rrfScore });
  });

  // Ordenar i agafar Top K
  const topResults = fusedResults
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  // Construir resposta final
  const results: RetrievedContext[] = [];
  for (const { id, score } of topResults) {
    const entry = corpus.knowledgeById.get(id);
    if (entry) {
      // Determinar ID del llibre
      let bookId: 'CONSTITUCIO' | 'DOCTRINA' = 'CONSTITUCIO';
      if (entry.id.startsWith('DOCTRINA') || entry.id.startsWith('DOC_') || entry.category === 'Doctrina' || entry.category === 'jurisprudència' || entry.category === 'Jurisprudència') {
        bookId = 'DOCTRINA';
      }

      results.push({
        bookId,
        entry,
        score: score * 100 // Escalem per tenir números més llegibles, tot i que el valor absolut no importa tant en RRF
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
