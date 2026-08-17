import type { NextApiRequest, NextApiResponse } from 'next';
import { createAdminSession, isValidAdminToken, setAdminCookie } from '@/lib/security/admin-session';
import { enforceRateLimit, getRedis } from '@/lib/security/rate-limit';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!getRedis()) return res.status(503).json({ error: 'L’autenticació administrativa no està disponible.' });
  if (!(await enforceRateLimit(req, res, 'admin-login'))) {
    return res.status(429).json({ error: 'Massa intents d’accés. Torna-ho a provar més tard.' });
  }
  if (!isValidAdminToken(req.body?.token)) return res.status(401).json({ error: 'Credencial no vàlida.' });
  try {
    setAdminCookie(res, createAdminSession());
    return res.status(204).end();
  } catch {
    return res.status(503).json({ error: 'L’autenticació administrativa no està configurada.' });
  }
}
