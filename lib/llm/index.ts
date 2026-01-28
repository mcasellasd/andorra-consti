/**
 * Utilitat unificada per generar text
 * Suporta Salamandra (recomanat per català) i altres proveïdors
 */

import { generateWithSalamandra, generateWithSalamandraLocal } from './salamandra';

export type LLMProvider = 'salamandra' | 'salamandra-local';

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
    case 'salamandra':
      return generateWithSalamandra(messages, options);
    
    case 'salamandra-local':
      return generateWithSalamandraLocal(messages, options);
    
    default:
      throw new Error(`Proveïdor de LLM desconegut: ${provider}`);
  }
}

/**
 * Determina el proveïdor de LLM basant-se en les variables d'entorn
 */
export function getLLMProvider(): LLMProvider {
  const provider = process.env.LLM_PROVIDER?.toLowerCase();
  
  if (provider === 'salamandra-local') {
    return 'salamandra-local';
  }
  
  // Per defecte, utilitza Salamandra via API (gratuïta amb Hugging Face)
  return 'salamandra';
}

/**
 * Funció de compatibilitat amb l'API antiga d'OpenAI
 * Permet migrar gradualment els endpoints
 */
export async function generateChatCompletion(
  apiKey: string | undefined,
  messages: Array<{ role: string; content: string }>,
  options: {
    model?: string;
    maxTokens?: number;
    temperature?: number;
    dateString?: string;
  } = {}
): Promise<string> {
  // Si no hi ha API key, utilitzar Salamandra (per defecte)
  if (!apiKey) {
    return generateText(messages, {
      maxTokens: options.maxTokens,
      temperature: options.temperature,
      dateString: options.dateString,
    });
  }
  
  // Si hi ha API key, potser volen usar OpenAI (per compatibilitat)
  // Però recomanem usar Salamandra
  console.warn('⚠️  OpenAI API key detectada. Considera migrar a Salamandra per models locals.');
  
  // Per defecte, usar Salamandra igualment
  return generateText(messages, {
    maxTokens: options.maxTokens,
    temperature: options.temperature,
    dateString: options.dateString,
  });
}
