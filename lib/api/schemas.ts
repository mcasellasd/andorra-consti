import { z } from 'zod';

export const localeSchema = z.enum(['ca', 'es', 'fr']);

const conversationMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(2_000),
});

export const unifiedChatSchema = z
  .object({
    message: z.string().trim().min(1).max(2_000),
    conversationHistory: z.array(conversationMessageSchema).max(10).default([]),
    locale: localeSchema.default('ca'),
  })
  .strip()
  .superRefine((value, context) => {
    const historyLength = value.conversationHistory.reduce(
      (total, item) => total + item.content.length,
      0,
    );
    if (historyLength > 8_000) {
      context.addIssue({
        code: 'custom',
        path: ['conversationHistory'],
        message: 'L’historial no pot superar els 8.000 caràcters.',
      });
    }
  });

export const ragSearchSchema = z.object({
  query: z.string().trim().min(1).max(2_000),
  topK: z.coerce.number().int().min(1).max(24).default(6),
});

export const articleGenerationSchema = z.object({
  articleNumber: z.union([z.string().min(1), z.number()]).transform(String).refine((value) => value.length <= 32),
  articleTitle: z.string().min(1).max(300),
  articleContent: z.string().min(1).max(10_000),
});

export const interpretacioRequestSchema = z.object({
  article_id: z.string().trim().min(1).max(80).regex(/^[A-Za-z0-9_-]+$/),
  text_oficial: z.string().min(1).max(10_000),
  numeracio: z.string().trim().min(1).max(64),
  idioma: localeSchema,
});

export type UnifiedChatInput = z.infer<typeof unifiedChatSchema>;
