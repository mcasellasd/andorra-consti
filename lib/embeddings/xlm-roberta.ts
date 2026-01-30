
/**
 * Utilitat per generar embeddings amb XLM-RoBERTa-base
 * Model multilingüe que funciona localment sense necessitat d'API
 * 
 * IMPORTANT: Utilitza import dinàmic per evitar que Next.js intenti bundlar
 * @xenova/transformers durant la compilació (només funciona a Node.js)
 */

import path from 'path';
import fs from 'fs';

// Model a utilitzar
const MODEL_NAME = 'Xenova/xlm-roberta-base';

/** Màxim de caràcters per text abans d'embedar (XLM-RoBERTa ~512 tokens; ~4 chars/token → ~2000) */
const MAX_INPUT_CHARS = 2000;

// Cache del model carregat
let embeddingPipeline: any = null;

/**
 * Trunca el text per no sobrecarregar el model (més caràcters = més lent).
 * XLM-RoBERTa té màx 514 tokens; truncar per caràcters és ràpid sense tokenizer.
 */
function truncateForEmbedding(text: string): string {
  if (!text || text.length <= MAX_INPUT_CHARS) return text;
  return text.slice(0, MAX_INPUT_CHARS);
}

/**
 * Carrega el model XLM-RoBERTa (lazy loading amb import dinàmic)
 */
async function loadModel() {
  if (!embeddingPipeline) {
    console.log(`📦 Carregant model ${MODEL_NAME}...`);
    // Import dinàmic per evitar que Next.js bundli aquest paquet durant la compilació
    // @ts-ignore
    const transformers = await import('@xenova/transformers');

    const { pipeline, env } = transformers;

    // Configuració del directori de cache
    // Local: utilitzem un directori persistent del projecte per evitar re-descàrregues
    // Producció (Vercel): utilitzem /tmp perquè és l'únic directori escrivible
    const isVercel = process.env.VERCEL === '1';
    
    if (isVercel) {
      // Producció: Vercel només permet escriure a /tmp
      env.cacheDir = '/tmp/.cache';
    } else {
      // Local: directori persistent al projecte per evitar re-descàrregues
      const projectRoot = process.cwd();
      const cacheDir = path.join(projectRoot, '.cache', 'xenova');
      
      // Crear directori si no existeix
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }
      
      env.cacheDir = cacheDir;
    }
    
    env.allowLocalModels = false;
    env.useBrowserCache = false;

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
  const truncated = truncateForEmbedding(text);

  // Generar l'embedding
  const output = await model(truncated, {
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

  // Processar en lots i en seqüència dins del lot (evita pics de memòria i pot ser més ràpid que Promise.all a CPU)
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    console.log(`📊 Processant lot ${Math.floor(i / batchSize) + 1}/${Math.ceil(texts.length / batchSize)}`);

    for (const text of batch) {
      const truncated = truncateForEmbedding(text);
      const output = await model(truncated, {
        pooling: 'mean',
        normalize: true,
      });
      const embedding = Array.from(output.data) as number[];
      embeddings.push(embedding.length > 768 ? embedding.slice(0, 768) : embedding);
    }
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
