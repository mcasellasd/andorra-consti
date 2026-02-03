/**
 * Utilitat per generar text amb Salamandra-7b-instruct
 * Model especialitzat en català i altres llengües ibèriques
 * Desenvolupat per BSC (Barcelona Supercomputing Center)
 */

/**
 * Formata missatges en format ChatML (com utilitza Salamandra)
 */
function formatChatML(
  messages: Array<{ role: string; content: string }>,
  dateString?: string
): string {
  const date = dateString || new Date().toISOString().split('T')[0];

  let formatted = '';

  // System message
  if (messages[0]?.role === 'system') {
    formatted += `<|im_start|>system\n${messages[0].content}<|im_end|>\n`;
    messages = messages.slice(1);
  } else {
    formatted += `<|im_start|>system\nEts un assistent útil i respectuós.<|im_end|>\n`;
  }

  // User/Assistant alternats
  messages.forEach(msg => {
    if (msg.role === 'user' || msg.role === 'assistant') {
      formatted += `<|im_start|>${msg.role}\n${msg.content}<|im_end|>\n`;
    }
  });

  // Generation prompt
  formatted += `<|im_start|>assistant\n`;

  return formatted;
}

/**
 * Genera text utilitzant Salamandra via endpoint personalitzat (ex: Google Colab)
 * Utilitza SALAMANDRA_API_URL del .env.local
 */
async function generateWithSalamandraCustom(
  messages: Array<{ role: string; content: string }>,
  options: {
    maxTokens?: number;
    temperature?: number;
    dateString?: string;
  } = {}
): Promise<string> {
  const customApiUrl = process.env.SALAMANDRA_API_URL;

  if (!customApiUrl) {
    throw new Error('SALAMANDRA_API_URL no configurada. Configura-la al .env.local amb la URL del teu endpoint (ex: https://xxxx.ngrok.io/generate)');
  }

  console.log(`🌐 Utilitzant endpoint personalitzat: ${customApiUrl}`);

  // Retry amb backoff exponencial per errors de connexió
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(customApiUrl, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true', // Necessari per ngrok-free.app
        },
        method: 'POST',
        body: JSON.stringify({
          messages: messages,
          maxTokens: options.maxTokens || 350,
          temperature: options.temperature || 0.7,
          dateString: options.dateString,
        }),
        // Timeout de 60 segons
        signal: AbortSignal.timeout(60000),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `Salamandra API error (${response.status})`;

        try {
          const errorData = JSON.parse(errorText);
          if (errorData.error) {
            errorMessage = errorData.error;
          } else if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch {
          errorMessage = errorText || errorMessage;
        }

        console.error(`❌ Salamandra Custom API Error (${response.status}):`, errorMessage);
        throw new Error(errorMessage);
      }

      // Si arribem aquí, la resposta és OK
      const data = await response.json();

      // L'API personalitzada hauria de retornar { generated_text: "..." }
      if (data.generated_text) {
        return data.generated_text.trim();
      }

      // Fallback: potser retorna directament el text
      if (typeof data === 'string') {
        return data.trim();
      }

      throw new Error('Resposta de l\'API sense generated_text vàlid.');

    } catch (error: any) {
      lastError = error;

      // Errors de connexió que poden ser temporals
      const isConnectionError =
        error.code === 'ECONNRESET' ||
        error.code === 'ETIMEDOUT' ||
        error.code === 'ENOTFOUND' ||
        error.message?.includes('fetch failed') ||
        error.message?.includes('ECONNRESET') ||
        error.name === 'AbortError' ||
        error.name === 'TimeoutError';

      if (isConnectionError && attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000); // Backoff exponencial, màx 5s
        console.warn(`⚠️ Error de connexió (intent ${attempt}/${maxRetries}). Reintentant en ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      // Si no és un error de connexió o ja hem fet tots els intents, llançar l'error
      if (!isConnectionError) {
        throw error;
      }

      // Si és un error de connexió després de tots els intents
      console.error(`❌ Error Salamandra API després de ${maxRetries} intents:`, error.message);
      throw new Error(
        `Error de connexió amb Salamandra API després de ${maxRetries} intents. ` +
        `Verifica que el servidor de Colab estigui actiu i que l'URL ngrok sigui vàlida. ` +
        `Error: ${error.message || 'Connexió tancada o timeout'}`
      );
    }
  }

  // Això no hauria d'arribar mai, però TypeScript ho demana
  throw lastError || new Error('Error desconegut');


}

/**
 * Genera text utilitzant Salamandra via Hugging Face Inference API
 * Si SALAMANDRA_API_URL està configurada, utilitza l'endpoint personalitzat (ex: Google Colab)
 */
export async function generateWithSalamandra(
  messages: Array<{ role: string; content: string }>,
  options: {
    maxTokens?: number;
    temperature?: number;
    dateString?: string;
  } = {}
): Promise<string> {
  // Si hi ha un endpoint personalitzat configurat (ex: Google Colab), usar-lo
  if (process.env.SALAMANDRA_API_URL) {
    return generateWithSalamandraCustom(messages, options);
  }

  // Si no, intentar amb Hugging Face API
  const hfApiKey = process.env.HUGGINGFACE_API_KEY;

  if (!hfApiKey) {
    throw new Error('HUGGINGFACE_API_KEY és necessària. Obtén-la a https://huggingface.co/settings/tokens (gratuïta)');
  }

  const formattedPrompt = formatChatML(messages, options.dateString);

  // Provar amb l'endpoint original primer, després router si falla
  let response: Response;

  // Opció 1: Endpoint original
  response = await fetch(
    'https://api-inference.huggingface.co/models/BSC-LT/salamandra-7b-instruct',
    {
      headers: {
        'Authorization': `Bearer ${hfApiKey}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        inputs: formattedPrompt,
        parameters: {
          max_new_tokens: options.maxTokens || 350,
          temperature: options.temperature || 0.7,
          return_full_text: false,
        }
      })
    }
  );

  // Si l'error diu que cal usar router, provem amb router
  if (!response.ok) {
    const errorText = await response.text();
    const needsRouter = errorText.includes('router.huggingface.co') ||
      errorText.includes('no longer supported') ||
      response.status === 404;

    if (needsRouter) {
      console.log('🔄 Endpoint original no disponible, provant amb router.huggingface.co...');
      response = await fetch(
        'https://router.huggingface.co/models/BSC-LT/salamandra-7b-instruct',
        {
          headers: {
            'Authorization': `Bearer ${hfApiKey}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            inputs: formattedPrompt,
            parameters: {
              max_new_tokens: options.maxTokens || 350,
              temperature: options.temperature || 0.7,
              return_full_text: false,
            }
          })
        }
      );
    }
  }

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `Hugging Face API error (${response.status})`;

    try {
      const errorData = JSON.parse(errorText);
      if (errorData.error) {
        errorMessage = errorData.error;
      } else if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch {
      errorMessage = errorText || errorMessage;
    }

    // Log detallat de l'error per debugging
    console.error(`❌ Hugging Face API Error (${response.status}):`, errorMessage);
    console.error('Response text:', errorText.substring(0, 500));

    // Si el model està carregant, esperar i tornar a intentar
    if (response.status === 503) {
      console.log('⏳ Model Salamandra carregant, esperant 30 segons...');
      await new Promise(resolve => setTimeout(resolve, 30000));
      return generateWithSalamandra(messages, options);
    }

    // Si l'error menciona router o endpoint no suportat, llançar error més clar
    if (errorMessage.includes('router') || errorMessage.includes('no longer supported') || response.status === 404) {
      throw new Error(`Hugging Face API endpoint no disponible. Error: ${errorMessage}. Potser cal actualitzar l'endpoint o el model no està disponible.`);
    }

    throw new Error(errorMessage);
  }

  const data = await response.json();

  // Salamandra retorna un array amb generated_text
  if (Array.isArray(data) && data[0]?.generated_text) {
    return data[0].generated_text.trim();
  }

  // O pot retornar directament generated_text
  if (data.generated_text) {
    return data.generated_text.trim();
  }

  // Fallback
  return data[0]?.generated_text?.trim() || '';
}

/**
 * Genera text utilitzant Salamandra localment (opcional, més lent)
 * Requereix més recursos però és completament privat
 * NOTA: Usa Salamandra 2B (menys memòria que 7B, adequat per T4/Colab)
 */
export async function generateWithSalamandraLocal(
  messages: Array<{ role: string; content: string }>,
  options: {
    maxTokens?: number;
    temperature?: number;
    dateString?: string;
  } = {}
): Promise<string> {
  // Importació dinàmica per evitar que Next.js bundli @xenova/transformers
  const { pipeline } = await import('@xenova/transformers');

  const generator = await pipeline('text-generation', 'BSC-LT/salamandra-2b-instruct', {
    quantized: true, // Necessari per estalviar memòria
  });

  const prompt = formatChatML(messages, options.dateString);
  const output = await generator(prompt, {
    max_new_tokens: options.maxTokens || 350,
    temperature: options.temperature || 0.7,
  });

  return (output as any)[0]?.generated_text?.trim() || '';
}
