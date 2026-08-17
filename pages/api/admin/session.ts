import type { NextApiRequest, NextApiResponse } from 'next';
import { ADMIN_COOKIE, verifyAdminSession } from '@/lib/security/admin-session';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  return res.status(verifyAdminSession(req.cookies?.[ADMIN_COOKIE]) ? 200 : 401).json({
    authenticated: verifyAdminSession(req.cookies?.[ADMIN_COOKIE]),
  });
}
