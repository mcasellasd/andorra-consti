import { describe, expect, it } from 'vitest';
import { enforceRateLimit, getRequestIp } from '@/lib/security/rate-limit';

describe('Railway client identity', () => {
  it('trusts X-Real-IP instead of client-controlled forwarding chains', () => {
    const req = {
      headers: { 'x-real-ip': '203.0.113.7', 'x-forwarded-for': '198.51.100.4' },
      socket: { remoteAddress: '127.0.0.1' },
    } as never;
    expect(getRequestIp(req)).toBe('203.0.113.7');
  });

  it('rejects invalid or multi-value X-Real-IP and falls back to the socket address', () => {
    expect(getRequestIp({
      headers: { 'x-real-ip': 'not-an-ip' },
      socket: { remoteAddress: '198.51.100.8' },
    } as never)).toBe('198.51.100.8');
    expect(getRequestIp({
      headers: { 'x-real-ip': '203.0.113.7, 198.51.100.8' },
      socket: { remoteAddress: '198.51.100.9' },
    } as never)).toBe('198.51.100.9');
  });

  it('charges weighted AI operations in the emergency limiter', async () => {
    const headers = new Map<string, string>();
    const req = { headers: { 'x-real-ip': '203.0.113.99' }, socket: {} } as never;
    const res = { setHeader: (name: string, value: string) => headers.set(name, value) } as never;
    expect(await enforceRateLimit(req, res, 'ai', 2)).toBe(true);
    expect(await enforceRateLimit(req, res, 'ai', 2)).toBe(true);
    expect(await enforceRateLimit(req, res, 'ai', 2)).toBe(false);
    expect(headers.get('Retry-After')).toBeDefined();
  });
});
