/**
 * Proveïdor genèric per a qualsevol API compatible amb el format OpenAI.
 *
 * Funciona amb: Scaleway Generative APIs, OVHcloud AI Endpoints, Mistral AI,
 * Groq, Hugging Face Router, vLLM/llama.cpp autoallotjat... Tots exposen
 * el mateix endpoint /chat/completions.
 *
 * Configuració via .env.local:
 *   LLM_BASE_URL  → arrel de l'API, acabada en /v1 (ex: https://api.mistral.ai/v1)
 *   LLM_API_KEY   → clau del proveïdor (opcional si és un vLLM local sense auth)
 *   LLM_MODEL     → identificador del model segons el catàleg del proveïdor
 *
 * Canviar de proveïdor = editar el .env. Zero canvis de codi.
 */

interface ChatMessage {
  role: string;
  content: string;
}

interface GenerateOptions {
  maxTokens?: number;
  temperature?: number;
  dateString?: string;
  /** Permet sobreescriure el model per crida (ex: model barat per a batch) */
  model?: string;
  /** Timeout en ms (per defecte 60s; els models de raonament poden trigar) */
  timeoutMs?: number;
}

/**
 * Llegeix i valida la configuració del proveïdor des de l'entorn
 */
function getProviderConfig(): { baseUrl: string; apiKey: string; model: string } {
  const baseUrl = process.env.LLM_BASE_URL?.replace(/\/+$/, ''); // treu barres finals
  const apiKey = process.env.LLM_API_KEY || '';
  const model = process.env.LLM_MODEL || '';

  if (!baseUrl) {
    throw new Error(
      'Cal configurar LLM_BASE_URL al .env.local (ex: https://api.mistral.ai/v1). ' +
      'Veure .env.example per a presets de proveïdors sobirans.'
    );
  }
  if (!model) {
    throw new Error(
      'Cal configurar LLM_MODEL al .env.local amb l\'identificador del model ' +
      'segons el catàleg del proveïdor.'
    );
  }

  return { baseUrl, apiKey, model };
}

/**
 * Genera text contra qualsevol endpoint /chat/completions compatible amb OpenAI.
 * Mateixa signatura que generateWithGroq per ser un drop-in replacement.
 */
export async function generateWithOpenAICompatible(
  messages: ChatMessage[],
  options: GenerateOptions = {}
): Promise<string> {
  const { baseUrl, apiKey, model } = getProviderConfig();
  const modelId = options.model || model;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  // vLLM local pot no requerir clau; només enviem el header si n'hi ha
  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  // Timeout defensiu: evita requests penjats si el proveïdor no respon
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs || 60000);

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers,
      signal: controller.signal,
      body: JSON.stringify({
        model: modelId,
        messages: messages,
        max_tokens: options.maxTokens || 500,
        temperature: options.temperature ?? 0.5,
        stream: false,
      }),
    });
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      throw new Error(`LLM timeout: ${modelId} no ha respost en ${options.timeoutMs || 60000}ms`);
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `LLM API error (${response.status})`;

    try {
      const errorData = JSON.parse(errorText);
      if (errorData.error) {
        errorMessage = typeof errorData.error === 'string'
          ? errorData.error
          : errorData.error.message || JSON.stringify(errorData.error);
      } else if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch {
      errorMessage = errorText || errorMessage;
    }

    console.error(`❌ LLM API Error (${response.status}) [${modelId} @ ${baseUrl}]:`, errorMessage);

    // 429: rate limit → reintent únic amb backoff curt
    if (response.status === 429) {
      console.log('⏳ Rate limit, reintentant en 5 segons...');
      await new Promise(resolve => setTimeout(resolve, 5000));
      return generateWithOpenAICompatible(messages, { ...options, timeoutMs: options.timeoutMs });
    }

    throw new Error(`Error LLM API: ${errorMessage}`);
  }

  const data = await response.json();

  if (data.choices && data.choices[0]?.message?.content) {
    return data.choices[0].message.content.trim();
  }

  throw new Error(`Format de resposta desconegut rebut de ${baseUrl}.`);
}
