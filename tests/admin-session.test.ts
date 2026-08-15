import { afterEach, describe, expect, it } from 'vitest';
import { createAdminSession, isValidAdminToken, verifyAdminSession } from '@/lib/security/admin-session';

afterEach(() => {
  delete process.env.ADMIN_API_TOKEN;
  delete process.env.ADMIN_SESSION_SECRET;
});

describe('admin session', () => {
  it('validates tokens without accepting missing configuration', () => {
    expect(isValidAdminToken('anything')).toBe(false);
    process.env.ADMIN_API_TOKEN = 'secret-token';
    expect(isValidAdminToken('secret-token')).toBe(true);
    expect(isValidAdminToken('wrong')).toBe(false);
  });

  it('signs, expires and rejects modified sessions', () => {
    process.env.ADMIN_SESSION_SECRET = 'a-long-independent-session-secret';
    const now = Date.now();
    const session = createAdminSession(now);
    expect(verifyAdminSession(session, now + 1_000)).toBe(true);
    expect(verifyAdminSession(`${session}x`, now + 1_000)).toBe(false);
    expect(verifyAdminSession(session, now + 9 * 60 * 60 * 1_000)).toBe(false);
  });
});
