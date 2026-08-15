import { describe, expect, it } from 'vitest';
import { getArticleById, RagUnavailableError, retrieveHybridMatches } from '@/lib/rag/corpus';

describe('RAG degradation', () => {
  it('keeps official articles available locally', () => {
    expect(getArticleById('CONST_001')?.content).toContain('Andorra');
  });

  it('fails semantic retrieval explicitly without credentials', async () => {
    delete process.env.UPSTASH_VECTOR_REST_URL;
    delete process.env.UPSTASH_VECTOR_REST_TOKEN;
    await expect(retrieveHybridMatches('sobirania')).rejects.toBeInstanceOf(RagUnavailableError);
  });
});
