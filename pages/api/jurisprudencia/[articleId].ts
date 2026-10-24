import type { NextApiRequest, NextApiResponse } from 'next';
import { getJurisprudenciaForArticle } from '../../../data/jurisprudencia-andorra';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const articleId = Array.isArray(req.query.articleId)
    ? req.query.articleId[0]
    : req.query.articleId;
  if (!articleId || !/^[A-Za-z0-9_-]+$/.test(articleId)) {
    return res.status(400).json({ error: 'Invalid article id' });
  }

  return res.status(200).json({ sentencies: getJurisprudenciaForArticle(articleId) });
}
