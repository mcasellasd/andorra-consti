/**
 * Utilitat unificada per generar text
 * Prioritat: Groq (Llama-3.3-70B) > Hugging Face (Mistral-7B) > local (opcional)
 */

import { generateWithGroq, generateWithGroqLocal } from './groq';

export type LLMProvider = 'groq' | 'groq-local' | 'salamandra'; // 'salamandra' = àlies de groq (compatibilitat .env)

/**
 * Genera text utilitzant el proveïdor especificat
 */
export async function generateText(
  messages: Array<{ role: string; content: string }>,
  options: { 
    maxTokens?: number; 
    temperature?: number;
    provider?: LLMProvider;
    dateString?: string;
  } = {}
): Promise<string> {
  const provider = options.provider || getLLMProvider();
  
  switch (provider) {
    case 'groq':
    case 'salamandra': // àlies per compatibilitat amb .env antic
      return generateWithGroq(messages, options);
    case 'groq-local':
      return generateWithGroqLocal(messages, options);
    default:
      throw new Error(`Proveïdor de LLM desconegut: ${provider}`);
  }
}

/**
 * Determina el proveïdor de LLM basant-se en les variables d'entorn
 */
export function getLLMProvider(): LLMProvider {
  const provider = process.env.LLM_PROVIDER?.toLowerCase();
  if (provider === 'groq-local') return 'groq-local';
  if (provider === 'salamandra') return 'groq'; // àlies
  return 'groq';
}

