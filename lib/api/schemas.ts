import { z } from 'zod';

export const localeSchema = z.enum(['ca', 'es', 'fr']);

export const interpretacioRequestSchema = z.object({
  article_id: z.string().trim().min(1).max(80).regex(/^[A-Za-z0-9_-]+$/),
  text_oficial: z.string().min(1).max(10_000),
  numeracio: z.string().trim().min(1).max(64),
  idioma: localeSchema,
});