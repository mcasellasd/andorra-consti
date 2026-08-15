import { FusionAlgorithm, Index, QueryMode, type QueryResult } from '@upstash/vector';
import { articlesConstitucio } from '../../data/codis/constitucio/articles';
import type { KnowledgeEntry, RetrievedContext } from './types';

export const DEFAULT_CORPUS_NAMESPACE = 'corpus-v1';

export class RagUnavailableError extends Error {
  constructor(message = 'El servei de recuperació semàntica no està disponible') {
    super(message);
    this.name = 'RagUnavailableError';
  }
}

interface RagMetadata {
  [key: string]: unknown;
  category?: string;
  topic?: string;
  keyConcepts?: string[];
  legalReference?: string;
  implications?: string;
  section?: string;
  methodology?: string;
  hierarchicalOrder?: string;
  distinction?: string;
  corollaries?: string;
  enforcement?: string;
  applicationFields?: string[];
  practicalUse?: string;
  rationale?: string;
  proceduralConsequence?: string;
  evidenceRequirement?: string;
  commonErrors?: string;
  practicalImplication?: string;
  judicialDuty?: string;
  historicalContext?: string;
  bookId?: string;
  numeracio?: string;
  sourceType: 'constitucio' | 'doctrina';
}

let vectorIndex: Index<RagMetadata> | null = null;

function getVectorIndex(): Index<RagMetadata> {
  const url = process.env.UPSTASH_VECTOR_REST_URL;
  const token = process.env.UPSTASH_VECTOR_REST_TOKEN;
  if (!url || !token) {
    throw new RagUnavailableError('Falten UPSTASH_VECTOR_REST_URL o UPSTASH_VECTOR_REST_TOKEN');
  }

  vectorIndex ??= new Index<RagMetadata>({ url, token });
  return vectorIndex;
}

function articleToKnowledgeEntry(articleId: string): KnowledgeEntry | null {
  const article = articlesConstitucio.find((candidate) => candidate.id === articleId);
  if (!article) return null;

  return {
    id: article.id,
    category: 'Constitució',
    topic: article.titol || article.numeracio,
    content: article.text_oficial,
    keyConcepts: article.tags || [],
    legalReference: article.numeracio,
    section: article.capitol || article.titol,
    bookId: 'CONSTITUCIO',
    numeracio: article.numeracio,
  };
}

function mapQueryResult(result: QueryResult<RagMetadata>): RetrievedContext | null {
  const metadata = result.metadata;
  if (!metadata || !result.data) return null;

  const bookId = metadata.sourceType === 'doctrina' ? 'DOCTRINA' : 'CONSTITUCIO';
  return {
    bookId,
    score: result.score,
    entry: {
      id: String(result.id),
      category: metadata.category || (bookId === 'DOCTRINA' ? 'Doctrina' : 'Constitució'),
      topic: metadata.topic || String(result.id),
      content: result.data,
      keyConcepts: metadata.keyConcepts || [],
      legalReference: metadata.legalReference,
      implications: metadata.implications,
      section: metadata.section,
      methodology: metadata.methodology,
      hierarchicalOrder: metadata.hierarchicalOrder,
      distinction: metadata.distinction,
      corollaries: metadata.corollaries,
      enforcement: metadata.enforcement,
      applicationFields: metadata.applicationFields,
      practicalUse: metadata.practicalUse,
      rationale: metadata.rationale,
      proceduralConsequence: metadata.proceduralConsequence,
      evidenceRequirement: metadata.evidenceRequirement,
      commonErrors: metadata.commonErrors,
      practicalImplication: metadata.practicalImplication,
      judicialDuty: metadata.judicialDuty,
      historicalContext: metadata.historicalContext,
      bookId,
      numeracio: metadata.numeracio,
    },
  };
}

async function queryBySource(
  query: string,
  sourceType: RagMetadata['sourceType'],
  topK: number
): Promise<RetrievedContext[]> {
  const results = await getVectorIndex().query({
    data: query,
    topK,
    filter: `sourceType = '${sourceType}'`,
    includeData: true,
    includeMetadata: true,
    queryMode: QueryMode.HYBRID,
    fusionAlgorithm: FusionAlgorithm.RRF,
  }, {
    namespace: process.env.UPSTASH_VECTOR_NAMESPACE || DEFAULT_CORPUS_NAMESPACE,
  });

  return results.map(mapQueryResult).filter((item): item is RetrievedContext => item !== null);
}

/** Cerca híbrida remota. No genera ni carrega embeddings dins del procés Next.js. */
export async function retrieveHybridMatches(
  queryText: string,
  topK = 5,
  prioritizeConstitution = false
): Promise<RetrievedContext[]> {
  if (!queryText.trim()) return [];

  try {
    if (!prioritizeConstitution) {
      const results = await getVectorIndex().query({
        data: queryText,
        topK,
        includeData: true,
        includeMetadata: true,
        queryMode: QueryMode.HYBRID,
        fusionAlgorithm: FusionAlgorithm.RRF,
      }, {
        namespace: process.env.UPSTASH_VECTOR_NAMESPACE || DEFAULT_CORPUS_NAMESPACE,
      });
      return results.map(mapQueryResult).filter((item): item is RetrievedContext => item !== null);
    }

    const constitutionTarget = Math.max(1, Math.ceil(topK * 0.6));
    const doctrineTarget = Math.max(0, topK - constitutionTarget);
    const [constitution, doctrine] = await Promise.all([
      queryBySource(queryText, 'constitucio', constitutionTarget),
      doctrineTarget ? queryBySource(queryText, 'doctrina', doctrineTarget) : Promise.resolve([]),
    ]);
    return [...constitution, ...doctrine].slice(0, topK);
  } catch (error) {
    if (error instanceof RagUnavailableError) throw error;
    const detail = error instanceof Error ? error.message : 'Error desconegut';
    throw new RagUnavailableError(detail);
  }
}

/** Àlies temporal per als consumidors antics. */
export async function retrieveTopMatches(
  queryText: string,
  topK = 3,
  _books?: string[],
  prioritizeConstitution = false
): Promise<RetrievedContext[]> {
  return retrieveHybridMatches(queryText, topK, prioritizeConstitution);
}

export function getArticleById(articleId: string): KnowledgeEntry | null {
  return articleToKnowledgeEntry(articleId);
}

export function getArticlesByIds(articleIds: string[]): KnowledgeEntry[] {
  return articleIds.map(articleToKnowledgeEntry).filter((entry): entry is KnowledgeEntry => entry !== null);
}

export function getArticleByNumber(articleNumber: string): KnowledgeEntry | null {
  const normalized = articleNumber.replace(/^Article\s+/i, '').trim().padStart(3, '0');
  return articleToKnowledgeEntry(`CONST_${normalized}`);
}

export function getKnowledgeEntries(): KnowledgeEntry[] {
  return articlesConstitucio
    .map((article) => articleToKnowledgeEntry(article.id))
    .filter((entry): entry is KnowledgeEntry => entry !== null);
}

export function getAvailableBooks(): string[] {
  return ['CONSTITUCIO', 'DOCTRINA'];
}

export interface CorpusDocumentSummary {
  id: string;
  name: string;
  description: string;
  count: number;
}

export function getCorpusDocumentsList(): CorpusDocumentSummary[] {
  return [
    { id: 'CONSTITUCIO', name: "Constitució d'Andorra", description: 'Preàmbul i articles 1–98', count: 99 },
    { id: 'TRIBUNAL_CONSTITUCIONAL', name: 'Llei del Tribunal Constitucional', description: 'Llei 21/2023 de text consolidat del Tribunal Constitucional', count: 10 },
    { id: 'DOCTRINA', name: 'Doctrina i jurisprudència', description: 'Textos doctrinaris, comentaris i jurisprudència relacionada', count: 932 },
  ];
}

export async function getRagHealth(): Promise<{ configured: boolean; reachable: boolean; namespace: string }> {
  const configured = Boolean(process.env.UPSTASH_VECTOR_REST_URL && process.env.UPSTASH_VECTOR_REST_TOKEN);
  const namespace = process.env.UPSTASH_VECTOR_NAMESPACE || DEFAULT_CORPUS_NAMESPACE;
  if (!configured) return { configured, reachable: false, namespace };

  try {
    await getVectorIndex().info();
    return { configured, reachable: true, namespace };
  } catch {
    return { configured, reachable: false, namespace };
  }
}
