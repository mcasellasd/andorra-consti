/**
 * Utilitat per generar embeddings amb XLM-RoBERTa-base
 * Model multilingüe que funciona localment sense necessitat d'API
 * 
 * IMPORTANT: Utilitza import dinàmic per evitar que Next.js intenti bundlar
 * @xenova/transformers durant la compilació (només funciona a Node.js)
 */

// Model a utilitzar
const MODEL_NAME = 'Xenova/xlm-roberta-base';

// Cache del model carregat
let embeddingPipeline: any = null;

/**
 * Carrega el model XLM-RoBERTa (lazy loading amb import dinàmic)
 */
async function loadModel() {
  if (!embeddingPipeline) {
    console.log(`📦 Carregant model ${MODEL_NAME}...`);
    // Import dinàmic per evitar que Next.js bundli aquest paquet durant la compilació
    const { pipeline, env } = await import('@xenova/transformers');

    // Configuració específica per Vercel/Production
    if (process.env.NODE_ENV === 'production') {
      env.cacheDir = '/tmp/.cache';
      env.allowLocalModels = false;
      env.useBrowserCache = false;
    }

    embeddingPipeline = await pipeline('feature-extraction', MODEL_NAME, {
      quantized: true, // Utilitza versió quantitzada (més petita i ràpida)
    });
    console.log(`✅ Model ${MODEL_NAME} carregat`);
  }
  return embeddingPipeline;
}

/**
 * Genera un embedding per a un text utilitzant XLM-RoBERTa-base
 * @param text Text per generar l'embedding
 * @returns Array de números (768 dimensions)
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const model = await loadModel();

  // Generar l'embedding
  const output = await model(text, {
    pooling: 'mean', // Mitjana de tots els tokens
    normalize: true,  // Normalitzar el vector
  });

  // Convertir Tensor a array de números
  // Nota: A vegades el pooling retorna una forma incorrecta [1, vocab_size]
  // en lloc de [1, 768], per tant agafem només les primeres 768 dimensions
  const embedding = Array.from(output.data) as number[];

  // Assegurar-nos que l'embedding té exactament 768 dimensions (XLM-RoBERTa-base)
  if (embedding.length > 768) {
    return embedding.slice(0, 768);
  } else if (embedding.length < 768) {
    // Si és més petit, omplir amb zeros (no hauria de passar)
    return [...embedding, ...new Array(768 - embedding.length).fill(0)];
  }

  return embedding;
}

/**
 * Genera embeddings per múltiples textos (batch processing)
 * @param texts Array de textos
 * @returns Array d'embeddings
 */
export async function generateEmbeddingsBatch(
  texts: string[],
  batchSize: number = 10
): Promise<number[][]> {
  const model = await loadModel();
  const embeddings: number[][] = [];

  // Processar en lots per evitar sobrecarregar la memòria
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    console.log(`📊 Processant lot ${Math.floor(i / batchSize) + 1}/${Math.ceil(texts.length / batchSize)}`);

    const batchPromises = batch.map(async (text) => {
      const output = await model(text, {
        pooling: 'mean',
        normalize: true,
      });
      const embedding = Array.from(output.data) as number[];
      // Assegurar-nos que l'embedding té exactament 768 dimensions
      return embedding.length > 768 ? embedding.slice(0, 768) : embedding;
    });

    const batchEmbeddings = await Promise.all(batchPromises);
    embeddings.push(...batchEmbeddings);
  }

  return embeddings;
}

/**
 * Calcula la similitud cosinus entre dos embeddings
 */
export function cosineSimilarity(
  embeddingA: number[],
  embeddingB: number[]
): number {
  if (embeddingA.length !== embeddingB.length) {
    throw new Error('Els embeddings han de tenir la mateixa dimensió');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < embeddingA.length; i++) {
    dotProduct += embeddingA[i] * embeddingB[i];
    normA += embeddingA[i] * embeddingA[i];
    normB += embeddingB[i] * embeddingB[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) {
    return 0;
  }

  return dotProduct / denominator;
}
