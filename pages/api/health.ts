import type { NextApiRequest, NextApiResponse } from 'next';
import { getRagHealth } from '@/lib/rag/corpus';
import { getRedis } from '@/lib/security/rate-limit';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  res.setHeader('Cache-Control', 'no-store');
  const vector = await getRagHealth();
  const redisClient = getRedis();
  let redis = { configured: Boolean(redisClient), reachable: false };
  if (redisClient) {
    try {
      await redisClient.ping();
      redis = { configured: true, reachable: true };
    } catch {
      redis = { configured: true, reachable: false };
    }
  }
  const healthy = vector.reachable && redis.reachable;
  return res.status(healthy ? 200 : 503).json({
    status: healthy ? 'ok' : 'degraded',
    application: 'ok',
    redis,
    vector,
  });
}
