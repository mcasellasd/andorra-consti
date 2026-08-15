import { createHmac, timingSafeEqual } from 'node:crypto';
import type { NextApiRequest, NextApiResponse } from 'next';

export const ADMIN_COOKIE = 'andorra_consti_admin';
const SESSION_SECONDS = 8 * 60 * 60;

export function isValidAdminToken(token: unknown): boolean {
  const expected = process.env.ADMIN_API_TOKEN;
  if (!expected || typeof token !== 'string') return false;
  return safeEqual(token, expected);
}

export function createAdminSession(now = Date.now()): string {
  const secret = requireSecret();
  const expiresAt = Math.floor(now / 1_000) + SESSION_SECONDS;
  const payload = String(expiresAt);
  return `${payload}.${sign(payload, secret)}`;
}

export function verifyAdminSession(value: string | undefined, now = Date.now()): boolean {
  if (!value || !process.env.ADMIN_SESSION_SECRET) return false;
  const [payload, signature, extra] = value.split('.');
  if (!payload || !signature || extra || !/^\d+$/.test(payload)) return false;
  if (Number(payload) <= Math.floor(now / 1_000)) return false;
  return safeEqual(signature, sign(payload, process.env.ADMIN_SESSION_SECRET));
}

export function requireAdmin(req: NextApiRequest, res: NextApiResponse): boolean {
  const cookie = req.cookies?.[ADMIN_COOKIE];
  if (verifyAdminSession(cookie)) return true;
  res.status(401).json({ error: 'Sessió administrativa requerida.' });
  return false;
}

export function setAdminCookie(res: NextApiResponse, session: string): void {
  res.setHeader(
    'Set-Cookie',
    `${ADMIN_COOKIE}=${session}; Path=/; Max-Age=${SESSION_SECONDS}; HttpOnly; Secure; SameSite=Strict`,
  );
}

export function clearAdminCookie(res: NextApiResponse): void {
  res.setHeader('Set-Cookie', `${ADMIN_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`);
}

function requireSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('ADMIN_SESSION_SECRET no està configurat.');
  return secret;
}

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

function safeEqual(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}
