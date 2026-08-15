import { describe, expect, it } from 'vitest';
import { articleGenerationSchema, unifiedChatSchema } from '@/lib/api/schemas';

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
});
