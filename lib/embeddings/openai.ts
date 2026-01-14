/**
 * Utilitat per generar embeddings amb OpenAI API
 */

const EMBEDDING_MODEL = process.env.OPENAI_EMBEDDINGS_MODEL || 'text-embedding-3-large';

/**
 * Genera un embedding per a un text utilitzant OpenAI API
 * @param text Text per generar l'embedding
 * @param apiKey Clau API d'OpenAI
 * @returns Array de números
 */
export async function generateEmbedding(
  text: string,
  apiKey: string
): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: text,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error generant embedding amb OpenAI (${response.status}): ${errorText}`
    );
  }

  const data = await response.json();
  const embedding = data?.data?.[0]?.embedding;

  if (!embedding) {
    throw new Error('Resposta de l\'API sense embedding vàlid.');
  }

  return embedding;
}
