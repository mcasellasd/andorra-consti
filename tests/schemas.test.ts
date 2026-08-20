import { describe, expect, it } from 'vitest';
import { articleGenerationSchema, interpretacioRequestSchema, unifiedChatSchema } from '@/lib/api/schemas';

describe('API schemas', () => {
  it('ignores legacy model controls', () => {
    const result = unifiedChatSchema.parse({ message: 'Article 1', maxTokens: 99_999, temperature: 2 });
    expect(result).toEqual({ message: 'Article 1', conversationHistory: [], locale: 'ca' });
  });

  it('limits message and aggregate history lengths', () => {
    expect(unifiedChatSchema.safeParse({ message: 'x'.repeat(2_001) }).success).toBe(false);
    expect(unifiedChatSchema.safeParse({
      message: 'Article 1',
      conversationHistory: Array.from({ length: 5 }, () => ({ role: 'user', content: 'x'.repeat(1_700) })),
    }).success).toBe(false);
  });

  it('limits article generation inputs', () => {
    expect(articleGenerationSchema.safeParse({
      articleNumber: '1', articleTitle: 't', articleContent: 'x'.repeat(10_001),
    }).success).toBe(false);
  });

  it('validates legacy interpretation requests and bounds client-controlled fields', () => {
    const valid = interpretacioRequestSchema.safeParse({
      article_id: 'CONST_001',
      text_oficial: 'Text aportat pel client que el servidor no farà servir com a font canònica.',
      numeracio: 'Article 1',
      idioma: 'ca',
    });
    expect(valid.success).toBe(true);
    expect(interpretacioRequestSchema.safeParse({
      article_id: 'CONST_001', text_oficial: 'x'.repeat(10_001), numeracio: 'Article 1', idioma: 'ca',
    }).success).toBe(false);
    expect(interpretacioRequestSchema.safeParse({
      article_id: 'unknown article', text_oficial: 'x', numeracio: 'Article 1', idioma: 'ca',
    }).success).toBe(false);
    expect(interpretacioRequestSchema.safeParse({
      article_id: 'CONST_001', text_oficial: 'x', numeracio: 'Article 1', idioma: 'en',
    }).success).toBe(false);
  });
});
