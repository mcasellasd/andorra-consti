import type { NextApiRequest, NextApiResponse } from 'next';
import { articlesConstitucio } from '../../../../data/codis/constitucio/articles-template';
import { getEditorialConstitucional } from '../../../../data/codis/constitucio/editorial';
import type { ConstitutionalKnowledgeDocument } from '../../../../data/codis/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ConstitutionalKnowledgeDocument | { error: string }>
) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const article = articlesConstitucio.find((item) => item.id === req.query.id);
  if (!article) return res.status(404).json({ error: 'Article no trobat' });

  const editorial = getEditorialConstitucional(article.id);
  const document: ConstitutionalKnowledgeDocument = {
    id: article.id,
    type: 'article',
    title: article.titol,
    officialText: article.text_oficial,
    editorial: editorial || undefined,
    relatedIds: Array.from(new Set([...(article.enllacos || []), ...(editorial?.articles_relacionats || [])])),
    version: editorial?.versio || '1.0.0',
    updatedAt: editorial?.actualitzat_el || article.vigencia,
  };

  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=86400');
  return res.status(200).json(document);
}
