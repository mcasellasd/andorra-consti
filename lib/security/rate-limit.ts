import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import type { NextApiRequest, NextApiResponse } from 'next';

type LimitKind = 'ai' | 'search' | 'admin' | 'admin-login';

const REDIS_KEY_PREFIX = 'andorra-consti';

const localAttempts = new Map<string, number[]>();
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
  if (realIp) return (Array.isArray(realIp) ? realIp[0] : realIp).trim();
  return req.socket?.remoteAddress || 'unknown';
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
      return true;
    } catch (error) {
      console.error(JSON.stringify({ event: 'rate_limit_redis_error', kind, error: errorMessage(error) }));
    }
  }

  if (kind === 'admin' || kind === 'admin-login') return false;
  return enforceEmergencyLimit(identifier, res, weight);
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

function enforceEmergencyLimit(identifier: string, res: NextApiResponse, weight: number): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const recent = (localAttempts.get(identifier) || []).filter((timestamp) => timestamp > now - windowMs);
  const allowed = recent.length + weight <= 5;
  const reset = recent[0] ? recent[0] + windowMs : now + windowMs;
  if (allowed) {
    for (let index = 0; index < weight; index += 1) recent.push(now);
    localAttempts.set(identifier, recent);
  }
  setHeaders(res, 5, Math.max(0, 5 - recent.length), reset);
  if (!allowed) res.setHeader('Retry-After', String(Math.max(1, Math.ceil((reset - now) / 1_000))));
  if (!allowed) console.warn(JSON.stringify({ event: 'rate_limit_block', kind: identifier.split(':')[0], backend: 'local' }));
  return allowed;
}

function setHeaders(res: NextApiResponse, limit: number, remaining: number, reset: number): void {
  res.setHeader('X-RateLimit-Limit', String(limit));
  res.setHeader('X-RateLimit-Remaining', String(Math.max(0, remaining)));
  res.setHeader('X-RateLimit-Reset', String(Math.ceil(reset / 1_000)));
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
