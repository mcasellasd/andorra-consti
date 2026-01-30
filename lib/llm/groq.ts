/**
 * Utilitat per generar text amb LLM
 * Prioritat: Groq (Llama-3.3-70B-Versatile) > Hugging Face (Mistral-7B) > local (opcional)
 */

/**
 * Formata missatges en format ChatML (compatibilitat amb alguns models)
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
 * Formata missatges en format Mistral [INST] (més robust per a Mistral-7B)
 */
function formatMistral(
  messages: Array<{ role: string; content: string }>,
  dateString?: string
): string {
  // Mistral v0.3 fusiona system amb user
  let formatted = '<s>';
  let systemContent = '';

  if (messages[0]?.role === 'system') {
    systemContent = messages[0].content + '\n\n';
    messages = messages.slice(1);
  } else {
    systemContent = 'Ets un assistent útil expert en dret andorrà.\n\n';
  }

  messages.forEach((msg, index) => {
    if (msg.role === 'user') {
      const content = index === 0 ? systemContent + msg.content : msg.content;
      formatted += `[INST] ${content} [/INST]`;
    } else if (msg.role === 'assistant') {
      formatted += ` ${msg.content} </s>`;
    }
  });

  return formatted;
}

/**
 * Genera text amb LLM. Prioritat: Groq (Llama-3.3-70B) > Hugging Face (Mistral-7B)
 */
export async function generateWithGroq(
  messages: Array<{ role: string; content: string }>,
  options: {
    maxTokens?: number;
    temperature?: number;
    dateString?: string;
  } = {}
): Promise<string> {
  // 1. Groq API (recomanat: ràpid i gratuït)
  const groqApiKey = process.env.GROQ_API_KEY;
  if (groqApiKey && groqApiKey.startsWith('gsk_')) {
    const modelId = 'llama-3.3-70b-versatile'; // Potent i ràpid (Actualitzat v3.3)

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        model: modelId,
        messages: messages,
        max_tokens: options.maxTokens || 500,
        temperature: options.temperature || 0.5,
        stream: false
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('❌ Groq API Error:', err);
      throw new Error(`Groq API Error: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.choices && data.choices[0]?.message?.content) {
      return data.choices[0].message.content.trim();
    }
  }

  // 2. Fallback: Hugging Face API (Serverless Router)
  const hfApiKey = process.env.HUGGINGFACE_API_KEY;

  if (!hfApiKey) {
    throw new Error('Cal configurar GROQ_API_KEY (recomanat) o HUGGINGFACE_API_KEY al .env.local');
  }

  // Model a utilitzar (Mistral-7B via Router v1/chat/completions)
  // Requereix que el token tingui permissos d'Inference Providers
  const modelId = 'mistralai/Mistral-7B-Instruct-v0.3'; // O 'meta-llama/Meta-Llama-3-8B-Instruct'

  // Opció 1: Endpoint Mistral (via Router / OpenAI Compatible)
  const response = await fetch(
    'https://router.huggingface.co/v1/chat/completions',
    {
      headers: {
        'Authorization': `Bearer ${hfApiKey}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        model: modelId,
        messages: messages,
        max_tokens: options.maxTokens || 350,
        temperature: options.temperature || 0.7,
        stream: false
      })
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `Hugging Face API error (${response.status})`;

    try {
      const errorData = JSON.parse(errorText);
      if (errorData.error) {
        // De vegades error.message, de vegades error (string o objecte)
        errorMessage = typeof errorData.error === 'string' ? errorData.error : JSON.stringify(errorData.error);
      } else if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch {
      errorMessage = errorText || errorMessage;
    }

    // Log detallat
    console.error(`❌ Hugging Face API Error (${response.status}):`, errorMessage);

    // Gestió de 503 (Model loading)
    if (response.status === 503) {
      console.log('⏳ Model carregant, esperant 20 segons...');
      await new Promise(resolve => setTimeout(resolve, 20000));
      return generateWithGroq(messages, options); // Recursivitat limitada
    }

    throw new Error(`Error Hugging Face API: ${errorMessage}`);
  }

  const data = await response.json();

  // Parsing de resposta format OpenAI (Router)
  if (data.choices && data.choices[0]?.message?.content) {
    return data.choices[0].message.content.trim();
  }

  // Fallback: format antic generated_text (poc probable amb endpoint v1/chat)
  if (Array.isArray(data) && data[0]?.generated_text) {
    return data[0].generated_text.trim();
  }
  if (data.generated_text) {
    return data.generated_text.trim();
  }

  throw new Error('Format de resposta desconegut rebut de Hugging Face.');
}

/**
 * Genera text amb model local (opcional, més lent). Usa Salamandra 2B via @xenova/transformers.
 * NOTA: Aquesta opció local encara utilitza el model Salamandra per compatibilitat.
 */
export async function generateWithGroqLocal(
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
