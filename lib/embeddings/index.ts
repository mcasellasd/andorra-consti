/**
 * Utilitat unificada per generar embeddings
 * Suporta tant OpenAI com XLM-RoBERTa-base
 */

import { generateEmbedding as generateOpenAIEmbedding } from './openai';
// NO importar xlm-roberta estàticament - usar importació dinàmica

export type EmbeddingProvider = 'openai' | 'xlm-roberta';

/**
 * Genera un embedding utilitzant el proveïdor especificat
 */
export async function generateEmbedding(
  text: string,
  provider: EmbeddingProvider = 'openai',
  apiKey?: string
): Promise<number[]> {
  switch (provider) {
    case 'openai':
      if (!apiKey) {
        throw new Error(
          'OPENAI_API_KEY és necessària per utilitzar el proveïdor OpenAI'
        );
      }
      return generateOpenAIEmbedding(text, apiKey);

    case 'xlm-roberta':
      // Importació dinàmica per evitar que Next.js bundli @xenova/transformers
      const { generateEmbedding: generateXLMEmbedding } = await import('./xlm-roberta');
      return generateXLMEmbedding(text);

    default:
      throw new Error(`Proveïdor d'embeddings desconegut: ${provider}`);
  }
}

/**
 * Determina el proveïdor d'embeddings basant-se en les variables d'entorn
 * 
 * IMPORTANT per Vercel:
 * - Sempre prioritza OpenAI si hi ha clau API (evita carregar XLM-RoBERTa que causa OOM)
 * - XLM-RoBERTa només es usa localment amb EMBEDDING_PROVIDER=xlm-roberta
 */
export function getEmbeddingProvider(): EmbeddingProvider {
  // Si explícitament es demana XLM-RoBERTa, usar-lo (només per desenvolvimento local)
  if (process.env.EMBEDDING_PROVIDER === 'xlm-roberta') {
    return 'xlm-roberta';
  }
  
  // Per defecte: usar OpenAI si hi ha clau API (recomanat per Vercel)
  if (process.env.OPENAI_API_KEY) {
    return 'openai';
  }
  
  // Fallback local: XLM-RoBERTa
  // NOTA: A Vercel, si no hi ha OPENAI_API_KEY, el RAG es deshabilitarà
  return 'xlm-roberta';
}
