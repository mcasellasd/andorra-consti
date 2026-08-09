/**
 * Genera embeddings locals XLM-RoBERTa per a un o més fitxers de doctrina.
 *
 * Ús:
 *   node scripts/generate-embeddings-doctrina-local.js doc-id [doc-id ...]
 */

const fs = require('fs');
const path = require('path');

const RAG_DIR = path.join(__dirname, '../data/rag/doctrina');
const MODEL_NAME = 'Xenova/xlm-roberta-base';
const MAX_INPUT_CHARS = 2000;

function buildEmbeddingText(entry) {
  return [
    `ID: ${entry.id}`,
    `Categoria: ${entry.category}`,
    `Tema: ${entry.topic}`,
    entry.content ? `Contingut: ${entry.content}` : null,
    entry.legalReference ? `Referència legal: ${entry.legalReference}` : null,
    entry.author ? `Autor: ${entry.author}` : null,
    entry.source ? `Font: ${entry.source}` : null,
    entry.sourceType ? `Tipus: ${entry.sourceType}` : null,
    entry.year ? `Any: ${entry.year}` : null,
    entry.keyConcepts?.length ? `Conceptes clau: ${entry.keyConcepts.join(', ')}` : null
  ].filter(Boolean).join('\n');
}

async function main() {
  const ids = process.argv.slice(2);
  if (!ids.length) {
    console.error('Cal indicar almenys un identificador de document.');
    process.exit(1);
  }

  const { pipeline, env } = await import('@xenova/transformers');
  env.cacheDir = path.join(process.cwd(), '.cache', 'xenova');
  env.allowLocalModels = false;
  env.useBrowserCache = false;

  console.log(`Carregant ${MODEL_NAME}...`);
  const model = await pipeline('feature-extraction', MODEL_NAME, { quantized: true });
  console.log('Model carregat.');

  for (const id of ids) {
    const inputPath = path.join(RAG_DIR, `${id}.json`);
    const outputPath = path.join(RAG_DIR, `${id}-embeddings.json`);
    if (!fs.existsSync(inputPath)) {
      throw new Error(`No s'ha trobat ${inputPath}`);
    }

    const entries = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
    const results = [];
    console.log(`Processant ${id}: ${entries.length} fragments`);

    for (let i = 0; i < entries.length; i++) {
      const text = buildEmbeddingText(entries[i]).slice(0, MAX_INPUT_CHARS);
      const output = await model(text, { pooling: 'mean', normalize: true });
      const vector = Array.from(output.data).slice(0, 768);
      while (vector.length < 768) vector.push(0);
      results.push({
        id: entries[i].id,
        topic: entries[i].topic,
        category: entries[i].category,
        embedding: vector,
        text: text.substring(0, 200)
      });
      if ((i + 1) % 10 === 0 || i + 1 === entries.length) {
        console.log(`  ${i + 1}/${entries.length}`);
      }
    }

    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');
    console.log(`Guardat: ${outputPath}`);
  }
}

main().catch((error) => {
  console.error('Error generant embeddings:', error);
  process.exit(1);
});
