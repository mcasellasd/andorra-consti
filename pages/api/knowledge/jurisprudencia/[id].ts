import type { NextApiRequest, NextApiResponse } from 'next';
import { getJurisprudenciaKnowledge } from '../../../../data/knowledge/legal';
import type { LegalKnowledgeDocument } from '../../../../data/codis/types';

export default function handler(req: NextApiRequest, res: NextApiResponse<LegalKnowledgeDocument | { error: string }>) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const document = typeof req.query.id === 'string' ? getJurisprudenciaKnowledge(req.query.id) : undefined;
  if (!document) return res.status(404).json({ error: 'Resolució no trobada' });
  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400');
  return res.status(200).json(document);
}
