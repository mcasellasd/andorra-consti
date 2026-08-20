import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { isIP } from 'node:net';
import type { NextApiRequest, NextApiResponse } from 'next';

type LimitKind = 'ai' | 'search' | 'admin' | 'admin-login';

const REDIS_KEY_PREFIX = 'andorra-consti';
const GLOBAL_AI_IDENTIFIER = 'ai:global';
export const SESSION_QUOTA_COOKIE = 'andorra_consti_session';
export const SESSION_QUOTA_LIMIT = 3;
const SESSION_QUOTA_SECONDS = 24 * 60 * 60;

const localAttempts = new Map<string, number[]>();
const localSessionQuota = new Map<string, { count: number; reset: number }>();
let redis: Redis | null | undefined;

export function getRedis(): Redis | null {
  if (redis !== undefined) return redis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  redis = url && token ? new Redis({ url, token }) : null;
  return redis;
}

export function getRequestIp(req: NextApiRequest): string {
  const realIp = req.headers['x-real-ip'];
  // Railway must overwrite this header at the trusted proxy boundary. Never
  // accept comma-separated chains or arbitrary values as client identity.
  if (typeof realIp === 'string') {
    const normalized = realIp.trim();
    if (normalized && isIP(normalized)) return normalized;
  }

  const remoteAddress = req.socket?.remoteAddress?.trim();
  return remoteAddress && isIP(remoteAddress) ? remoteAddress : 'unknown';
}

export async function enforceSessionQuota(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<boolean | null> {
  const now = Math.floor(Date.now() / 1_000);
  const session = getOrCreateSession(req, res, now);
  if (!session) {
    res.status(503).json({ error: 'El límit de sessió no està disponible temporalment.' });
    return null;
  }

  const key = `${REDIS_KEY_PREFIX}:session-quota:${session.id}`;
  const client = getRedis();

  if (client) {
    try {
      const count = await client.incr(key);
      if (count === 1) await client.expire(key, session.expiresAt - now);
      const remaining = Math.max(0, SESSION_QUOTA_LIMIT - count);
      setSessionQuotaHeaders(res, remaining, session.expiresAt);
      if (count > SESSION_QUOTA_LIMIT) {
        res.setHeader('Retry-After', String(Math.max(1, session.expiresAt - now)));
        console.warn(JSON.stringify({ event: 'session_quota_block', backend: 'redis' }));
        return false;
      }
      return true;
    } catch (error) {
      console.error(JSON.stringify({ event: 'session_quota_redis_error', error: errorMessage(error) }));
    }
  }

  const local = localSessionQuota.get(key);
  const count = local && local.reset > now ? local.count + 1 : 1;
  localSessionQuota.set(key, { count, reset: session.expiresAt });
  setSessionQuotaHeaders(res, Math.max(0, SESSION_QUOTA_LIMIT - count), session.expiresAt);
  if (count > SESSION_QUOTA_LIMIT) {
    res.setHeader('Retry-After', String(Math.max(1, session.expiresAt - now)));
    console.warn(JSON.stringify({ event: 'session_quota_block', backend: 'local' }));
    return false;
  }
  return true;
}

export async function enforceRateLimit(
  req: NextApiRequest,
  res: NextApiResponse,
  kind: LimitKind,
  weight = 1,
): Promise<boolean> {
  const identifier = `${kind}:${getRequestIp(req)}`;
  const client = getRedis();

  if (client) {
    try {
      const limiter = createLimiter(client, kind);
      const result = await limiter.limit(identifier, { rate: weight });
      setHeaders(res, result.limit, result.remaining, result.reset);
      if (!result.success) {
        console.warn(JSON.stringify({ event: 'rate_limit_block', kind, backend: 'redis' }));
        res.setHeader('Retry-After', String(Math.max(1, Math.ceil((result.reset - Date.now()) / 1_000))));
        return false;
      }

      if (kind === 'ai') {
        const globalResult = await createGlobalAiLimiter(client).limit(GLOBAL_AI_IDENTIFIER, { rate: weight });
        if (!globalResult.success) {
          setHeaders(res, globalResult.limit, globalResult.remaining, globalResult.reset);
          res.setHeader('Retry-After', String(Math.max(1, Math.ceil((globalResult.reset - Date.now()) / 1_000))));
          console.warn(JSON.stringify({ event: 'rate_limit_block', kind, backend: 'redis-global' }));
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error(JSON.stringify({ event: 'rate_limit_redis_error', kind, error: errorMessage(error) }));
    }
  }

  if (kind === 'admin' || kind === 'admin-login') return false;
  const allowedForClient = enforceEmergencyLimit(identifier, res, weight);
  if (!allowedForClient || kind !== 'ai') return allowedForClient;
  return enforceEmergencyLimit(GLOBAL_AI_IDENTIFIER, res, weight, 300, 10 * 60 * 1_000);
}

function createLimiter(client: Redis, kind: LimitKind): Ratelimit {
  if (kind === 'ai') {
    return new Ratelimit({ redis: client, limiter: Ratelimit.slidingWindow(20, '10 m'), prefix: `${REDIS_KEY_PREFIX}:rl:ai` });
  }
  if (kind === 'search') {
    return new Ratelimit({ redis: client, limiter: Ratelimit.slidingWindow(60, '1 m'), prefix: `${REDIS_KEY_PREFIX}:rl:search` });
  }
  if (kind === 'admin') {
    return new Ratelimit({ redis: client, limiter: Ratelimit.slidingWindow(2, '1 h'), prefix: `${REDIS_KEY_PREFIX}:rl:admin` });
  }
  return new Ratelimit({ redis: client, limiter: Ratelimit.slidingWindow(5, '10 m'), prefix: `${REDIS_KEY_PREFIX}:rl:admin-login` });
}

function createGlobalAiLimiter(client: Redis): Ratelimit {
  return new Ratelimit({
    redis: client,
    limiter: Ratelimit.slidingWindow(300, '10 m'),
    prefix: `${REDIS_KEY_PREFIX}:rl:global-ai`,
  });
}

function enforceEmergencyLimit(
  identifier: string,
  res: NextApiResponse,
  weight: number,
  limit = 5,
  windowMs = 60_000,
): boolean {
  const now = Date.now();
  const recent = (localAttempts.get(identifier) || []).filter((timestamp) => timestamp > now - windowMs);
  const allowed = recent.length + weight <= limit;
  const reset = recent[0] ? recent[0] + windowMs : now + windowMs;
  if (allowed) {
    for (let index = 0; index < weight; index += 1) recent.push(now);
    localAttempts.set(identifier, recent);
  }
  setHeaders(res, limit, Math.max(0, limit - recent.length), reset);
  if (!allowed) res.setHeader('Retry-After', String(Math.max(1, Math.ceil((reset - now) / 1_000))));
  if (!allowed) console.warn(JSON.stringify({ event: 'rate_limit_block', kind: identifier.split(':')[0], backend: 'local' }));
  return allowed;
}

function setHeaders(res: NextApiResponse, limit: number, remaining: number, reset: number): void {
  res.setHeader('X-RateLimit-Limit', String(limit));
  res.setHeader('X-RateLimit-Remaining', String(Math.max(0, remaining)));
  res.setHeader('X-RateLimit-Reset', String(Math.ceil(reset / 1_000)));
}

function setSessionQuotaHeaders(res: NextApiResponse, remaining: number, reset: number): void {
  res.setHeader('X-Session-Quota-Limit', String(SESSION_QUOTA_LIMIT));
  res.setHeader('X-Session-Quota-Remaining', String(Math.max(0, remaining)));
  res.setHeader('X-Session-Quota-Reset', String(reset));
}

function getOrCreateSession(
  req: NextApiRequest,
  res: NextApiResponse,
  now: number,
): { id: string; expiresAt: number } | null {
  const secret = process.env.SESSION_QUOTA_SECRET || process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;

  const existing = parseSessionCookie(req.cookies?.[SESSION_QUOTA_COOKIE], secret, now);
  if (existing) return existing;

  const id = randomUUID();
  const expiresAt = now + SESSION_QUOTA_SECONDS;
  const payload = `${id}.${expiresAt}`;
  const signature = signSession(payload, secret);
  res.setHeader(
    'Set-Cookie',
    `${SESSION_QUOTA_COOKIE}=${payload}.${signature}; Path=/; Max-Age=${SESSION_QUOTA_SECONDS}; HttpOnly; Secure; SameSite=Lax`,
  );
  return { id, expiresAt };
}

function parseSessionCookie(value: string | undefined, secret: string, now: number): { id: string; expiresAt: number } | null {
  if (!value) return null;
  const [id, expiresAtText, signature, extra] = value.split('.');
  if (extra || !id || !/^\d+$/.test(expiresAtText || '') || !signature) return null;
  const expiresAt = Number(expiresAtText);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= now || !/^[0-9a-f-]{36}$/.test(id)) return null;
  return safeEqual(signature, signSession(`${id}.${expiresAt}`, secret)) ? { id, expiresAt } : null;
}

function signSession(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

function safeEqual(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
