import type { NextApiRequest, NextApiResponse } from 'next';
import { legislacioKnowledge } from '../../../../data/knowledge/legal';
import type { LegalKnowledgeDocument } from '../../../../data/codis/types';

export default function handler(req: NextApiRequest, res: NextApiResponse<LegalKnowledgeDocument[] | { error: string }>) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400');
  return res.status(200).json(legislacioKnowledge);
}
