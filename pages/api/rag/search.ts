import type { NextApiRequest, NextApiResponse } from 'next';
import { articlesConstitucio } from '@/data/codis/constitucio/articles-template';
import { retrieveTopMatches } from '@/lib/rag/corpus';
import type { RetrievedContext } from '@/lib/rag/types';
import { generateEmbedding, getEmbeddingProvider } from '@/lib/embeddings';

interface SearchRequestBody {
  query?: string;
  topK?: number;
}

interface SearchResponse {
  results?: Array<{
    conceptId: string;
    conceptTitle: string;
    snippet: string;
    score: number;
    articleId?: string;
    articleNumber?: string;
    articleTitle?: string;
    /** Tipus de font per enllaç i etiqueta: constitucio | doctrina */
    sourceType: 'constitucio' | 'doctrina';
    /** ID de l'entrada al corpus (ex: CONST_019, DOCTRINA_...) per enllaçar */
    entryId: string;
  }>;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query, topK = 6 } = req.body as SearchRequestBody;

  if (!query || typeof query !== 'string' || !query.trim()) {
    return res.status(400).json({ error: 'Cal indicar un concepte o matèria.' });
  }

  try {
    if (process.env.RAG_ENABLED !== 'true') {
      return res.status(200).json({ results: [] });
    }
    const provider = getEmbeddingProvider();
    const queryEmbedding = await generateEmbedding(query, provider);
    const matches = retrieveTopMatches(
      queryEmbedding,
      Math.max(1, Math.min(topK, 24)),
      undefined,
      false
    );
    const results = matches.map((match) => mapResult(match));
    return res.status(200).json({ results });
  } catch (error: any) {
    console.error('Error al cercador semàntic:', error);
    const message =
      error?.message ??
      'No s\'ha pogut processar la cerca. Torna-ho a intentar més tard.';
    return res.status(500).json({ error: message });
  }
}

function mapResult(match: RetrievedContext) {
  const { entry, score, bookId } = match;
  const articleInfo = findArticleByReference(entry.legalReference);
  const sourceType = bookId === 'DOCTRINA' ? 'doctrina' : 'constitucio';

  return {
    conceptId: entry.id,
    conceptTitle: entry.topic,
    snippet: buildSnippet(entry.content, entry.implications),
    score,
    articleId: articleInfo?.id,
    articleNumber: articleInfo?.numeracio,
    articleTitle: articleInfo?.titol,
    sourceType,
    entryId: entry.id,
  };
}

function findArticleByReference(reference?: string | null) {
  if (!reference) {
    return undefined;
  }
  // Buscar referències com "Article 1", "Article 2", etc.
  const match = reference.match(/Article\s+(\d+)/i);
  if (!match) {
    return undefined;
  }
  const number = `Article ${match[1]}`;
  // Els articles de la Constitució utilitzen 'numeracio' en lloc de 'number'
  return articlesConstitucio.find((article) => article.numeracio === number);
}

function buildSnippet(content?: string, implications?: string) {
  const source = implications || content || '';
  if (!source) {
    return '';
  }
  const clean = source.replace(/\s+/g, ' ').trim();
  return clean.length > 240 ? `${clean.slice(0, 240)}…` : clean;
}
