import type { NextApiRequest, NextApiResponse } from 'next';
import { getJurisprudenciaForArticle, type SentenciaAndorra } from '../../../data/jurisprudencia-andorra';

/**
 * Jurisprudència d'un article, servida des del servidor.
 *
 * PER QUÈ EXISTEIX
 * ----------------
 * `JurisprudenciaSection` importava `data/jurisprudencia-andorra` directament. Com
 * que és un component de client, Next empaquetava TOTA la base de sentències al
 * bundle del navegador: amb 47 sentències la pàgina d'article ja pesava 223 kB
 * (la següent pàgina del projecte en fa 8).
 *
 * Amb els 701 casos del dataset nou, això hauria pujat a diversos MB de JavaScript
 * per veure un article — inutilitzable en un mòbil amb mala connexió, que és
 * justament el públic que el projecte vol atendre.
 *
 * Servint-ho per API, el navegador només rep les sentències de l'article que mira:
 * entre cap i una desena. La resta no surt mai del servidor.
 */

interface Resposta {
  sentencies?: SentenciaAndorra[];
  error?: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Resposta>) {
  const { articleId } = req.query;

  if (typeof articleId !== 'string' || !articleId.trim()) {
    return res.status(400).json({ error: 'Falta l’identificador d’article' });
  }

  try {
    const sentencies = getJurisprudenciaForArticle(articleId);

    // El corpus és estàtic entre desplegaments: es pot cachejar amb tranquil·litat.
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
    return res.status(200).json({ sentencies });
  } catch (error: any) {
    console.error('Error servint jurisprudència:', error);
    return res.status(500).json({ error: error?.message || 'Error intern' });
  }
}
