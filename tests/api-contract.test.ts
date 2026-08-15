import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/llm', () => ({
  generateText: async () => "L’Article 1 defineix Andorra com un Estat independent [[CONST_001]].",
}));
import unifiedChat from '@/pages/api/unified-chat';
import adminLogin from '@/pages/api/admin/login';

function mockResponse() {
  let status = 200;
  let body: unknown;
  const headers = new Map<string, unknown>();
  const response = {
    status(code: number) { status = code; return this; },
    json(value: unknown) { body = value; return this; },
    setHeader(name: string, value: unknown) { headers.set(name, value); return this; },
    end() { return this; },
  };
  return { response: response as never, result: () => ({ status, body, headers }) };
}

describe('API contracts', () => {
  it('rejects wrong methods', async () => {
    const res = mockResponse();
    await unifiedChat({ method: 'GET', headers: {}, socket: {} } as never, res.response);
    expect(res.result().status).toBe(405);
  });

  it('rejects oversized public input before invoking RAG or LLM', async () => {
    const res = mockResponse();
    await unifiedChat({
      method: 'POST', body: { message: 'x'.repeat(2_001) },
      headers: { 'x-real-ip': '192.0.2.44' }, socket: {},
    } as never, res.response);
    expect(res.result().status).toBe(400);
  });

  it('keeps admin login closed without Redis', async () => {
    delete process.env.ADMIN_API_TOKEN;
    const res = mockResponse();
    await adminLogin({ method: 'POST', body: { token: 'guess' }, headers: {}, socket: {} } as never, res.response);
    expect(res.result().status).toBe(503);
  });

  it('returns 503 for semantic questions when Vector is unavailable', async () => {
    delete process.env.UPSTASH_VECTOR_REST_URL;
    delete process.env.UPSTASH_VECTOR_REST_TOKEN;
    const res = mockResponse();
    await unifiedChat({
      method: 'POST', body: { message: 'Explica la doctrina de la separació de poders' },
      headers: { 'x-real-ip': '192.0.2.45' }, socket: {},
    } as never, res.response);
    expect(res.result().status).toBe(503);
  });

  it('keeps the public response compatible for an explicit local article fallback', async () => {
    const res = mockResponse();
    await unifiedChat({
      method: 'POST', body: { message: 'Què estableix l’article 1?' },
      headers: { 'x-real-ip': '192.0.2.46' }, socket: {},
    } as never, res.response);
    expect(res.result().status).toBe(200);
    expect(res.result().body).toMatchObject({ response: expect.any(String), sources: expect.any(Array) });
  });
});
