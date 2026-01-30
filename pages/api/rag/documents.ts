import type { NextApiRequest, NextApiResponse } from 'next';
import { getCorpusDocumentsList } from '@/lib/rag/corpus';

interface DocumentsResponse {
  documents?: Array<{
    id: string;
    name: string;
    description: string;
    count: number;
  }>;
  error?: string;
}

/**
 * GET /api/rag/documents
 * Retorna la llista de documents/fonts que el RAG pot consultar abans de contestar.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DocumentsResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const documents = getCorpusDocumentsList();
    return res.status(200).json({ documents });
  } catch (error: unknown) {
    console.error('Error al llistar documents RAG:', error);
    const message = error instanceof Error ? error.message : 'Error inesperat';
    return res.status(500).json({ error: message });
  }
}
