/**
 * Utilitat unificada per generar text.
 *
 * Proveïdors disponibles:
 *   'openai-compatible' → qualsevol API OpenAI-compatible (Scaleway, OVHcloud,
 *                         Mistral, vLLM autoallotjat...). Recomanat per sobirania.
 *   'groq'              → Groq (Llama-3.3-70B). Llegat, es manté per compatibilitat.
 *   'groq-local'        → generació local via @xenova/transformers.
 *
 * Selecció automàtica: si hi ha LLM_BASE_URL al .env → 'openai-compatible'.
 * Si no → 'groq' (comportament antic intacte).
 */

import { generateWithGroq, generateWithGroqLocal } from './groq';
import { generateWithOpenAICompatible } from './openai-compatible';

export type LLMProvider = 'openai-compatible' | 'groq' | 'groq-local' | 'salamandra'; // 'salamandra' = àlies llegat

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
    model?: string;
  } = {}
): Promise<string> {
  const provider = options.provider || getLLMProvider();

  switch (provider) {
    case 'openai-compatible':
      return generateWithOpenAICompatible(messages, options);
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
 * Determina el proveïdor de LLM basant-se en les variables d'entorn.
 * Prioritat: LLM_PROVIDER explícit > LLM_BASE_URL present > groq (llegat).
 */
export function getLLMProvider(): LLMProvider {
  const provider = process.env.LLM_PROVIDER?.toLowerCase();

  if (provider === 'openai-compatible') return 'openai-compatible';
  if (provider === 'groq-local') return 'groq-local';
  if (provider === 'groq') return 'groq';
  if (provider === 'salamandra') return 'groq'; // àlies llegat

  // Sense LLM_PROVIDER explícit: si hi ha base URL configurada, fem servir
  // el proveïdor genèric. Així la migració és només afegir 3 línies al .env.
  if (process.env.LLM_BASE_URL) return 'openai-compatible';

  return 'groq';
}
