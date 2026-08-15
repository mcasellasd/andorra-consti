import type { NextApiRequest, NextApiResponse } from 'next';
import { randomUUID } from 'node:crypto';
import { getRedis, enforceRateLimit } from './rate-limit';

const LOCK_KEY = 'andorra-consti:admin:evaluation:lock';

export async function acquireAdminRun(req: NextApiRequest, res: NextApiResponse): Promise<string | null> {
  const redis = getRedis();
  if (!redis) {
    res.status(503).json({ error: 'El servei administratiu no està disponible.' });
    return null;
  }
  if (!(await enforceRateLimit(req, res, 'admin'))) {
    res.status(429).json({ error: 'Límit de dues bateries per hora superat.' });
    return null;
  }
  const token = randomUUID();
  const acquired = await redis.set(LOCK_KEY, token, { nx: true, ex: 60 * 60 });
  if (!acquired) {
    res.status(409).json({ error: 'Ja hi ha una bateria d’avaluació en execució.' });
    return null;
  }
  return token;
}

export async function releaseAdminRun(token: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    const current = await redis.get<string>(LOCK_KEY);
    if (current === token) await redis.del(LOCK_KEY);
  } catch (error) {
    console.error(JSON.stringify({
      event: 'admin_lock_release_error',
      error: error instanceof Error ? error.message : String(error),
    }));
  }
}
