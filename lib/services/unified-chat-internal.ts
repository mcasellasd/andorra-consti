import type { NextApiRequest, NextApiResponse } from 'next';
import { handleUnifiedChatRequest } from '@/pages/api/unified-chat';

interface InternalChatBody extends Record<string, unknown> {
  response?: string;
  answer?: string;
  sources?: Array<{ id: string; title: string; score?: number }>;
  error?: unknown;
}

interface InternalChatResult {
  status: number;
  body: InternalChatBody;
}

export async function generateInternalChatResponse(message: string, locale: 'ca' | 'es' | 'fr' = 'ca') {
  let status = 200;
  let body: InternalChatBody = {};
  const req = {
    method: 'POST',
    body: { message, locale, conversationHistory: [] },
    headers: {},
    cookies: {},
    socket: {},
  } as unknown as NextApiRequest;
  const res = {
    status(code: number) {
      status = code;
      return this;
    },
    json(payload: InternalChatBody) {
      body = payload;
      return this;
    },
    setHeader() {
      return this;
    },
  } as unknown as NextApiResponse;

  await handleUnifiedChatRequest(req, res, true);
  const result: InternalChatResult = { status, body };
  if (result.status >= 400) throw new Error(String(result.body.error || `HTTP ${result.status}`));
  return result.body;
}
