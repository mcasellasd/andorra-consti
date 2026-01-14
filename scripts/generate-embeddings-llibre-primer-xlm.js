/**
 * Script per generar embeddings del corpus del Llibre Primer
 * Utilitza XLM-RoBERTa-base (local, sense API)
 *
 * Ús:
 *   node scripts/generate-embeddings-llibre-primer-xlm.js
 *
 * Requisits:
 *   - Node.js amb suport per ES modules o CommonJS
 *   - Arxiu data/rag/llibre-primer.json amb les entrades de coneixement.
 */

const fs = require('fs');
const path = require('path');

// Importar la funció d'embeddings (necessitem usar dynamic import per @xenova/transformers)
async function loadEmbeddingFunction() {
  // En un entorn Node.js, podem usar require si configurem correctament
  // Per ara, farem servir una implementació directa
  const { pipeline } = require('@xenova/transformers');
  
  const MODEL_NAME = 'Xenova/xlm-roberta-base';
  let embeddingPipeline = null;

  async function generateEmbedding(text) {
    if (!embeddingPipeline) {
      console.log(`📦 Carregant model ${MODEL_NAME}...`);
      embeddingPipeline = await pipeline('feature-extraction', MODEL_NAME, {
        quantized: true,
      });
      console.log(`✅ Model carregat`);
    }

    const output = await embeddingPipeline(text, {
      pooling: 'mean',
      normalize: true,
    });

    return Array.from(output.data);
  }

  return generateEmbedding;
}

const KNOWLEDGE_PATH = path.join(__dirname, '../data/rag/llibre-primer.json');
const OUTPUT_PATH = path.join(__dirname, '../data/rag/llibre-primer-embeddings.json');

async function main() {
  if (!fs.existsSync(KNOWLEDGE_PATH)) {
    console.error(`❌ No s'ha trobat l'arxiu de coneixement: ${KNOWLEDGE_PATH}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(KNOWLEDGE_PATH, 'utf8');
  const entries = JSON.parse(raw);

  console.log(`📚 Entrades carregades: ${entries.length}`);
  console.log(`🧠 Model: XLM-RoBERTa-base (local)`);

  const generateEmbedding = await loadEmbeddingFunction();
  const results = [];

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const text = buildEmbeddingText(entry);
    console.log(`➡️  Generant embedding ${i + 1}/${entries.length}: ${entry.id} - ${entry.topic}`);

    try {
      const embedding = await generateEmbedding(text);
      results.push({
        id: entry.id,
        topic: entry.topic,
        category: entry.category,
        embedding,
        text
      });
    } catch (error) {
      console.error(`❌ Error generant embedding per ${entry.id}:`, error.message);
      // Continuar amb la següent entrada
    }
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2), 'utf8');
  console.log(`✅ Embeddings guardats a ${OUTPUT_PATH}`);
  console.log(`📊 Total embeddings generats: ${results.length}/${entries.length}`);
}

function buildEmbeddingText(entry) {
  const lines = [
    `ID: ${entry.id}`,
    `Categoria: ${entry.category}`,
    `Tema: ${entry.topic}`,
    entry.content ? `Contingut: ${entry.content}` : null,
    entry.implications ? `Implicacions: ${entry.implications}` : null,
    entry.methodology ? `Metodologia: ${entry.methodology}` : null,
    entry.hierarchicalOrder ? `Ordre jeràrquic: ${entry.hierarchicalOrder}` : null,
    entry.distinction ? `Distinció: ${entry.distinction}` : null,
    entry.corollaries ? `Corol·laris: ${entry.corollaries}` : null,
    entry.enforcement ? `Aplicació i sancions: ${entry.enforcement}` : null,
    entry.applicationFields ? `Àmbits d'aplicació: ${entry.applicationFields.join(', ')}` : null,
    entry.practicalUse ? `Ús pràctic: ${entry.practicalUse}` : null,
    entry.rationale ? `Racionalitat: ${entry.rationale}` : null,
    entry.proceduralConsequence ? `Conseqüència processal: ${entry.proceduralConsequence}` : null,
    entry.evidenceRequirement ? `Requisits de prova: ${entry.evidenceRequirement}` : null,
    entry.commonErrors ? `Errors habituals: ${entry.commonErrors}` : null,
    entry.practicalImplication ? `Implicació pràctica: ${entry.practicalImplication}` : null,
    entry.judicialDuty ? `Deure judicial: ${entry.judicialDuty}` : null,
    entry.historicalContext ? `Context històric: ${entry.historicalContext}` : null,
    entry.legalReference ? `Referència legal: ${entry.legalReference}` : null,
    entry.keyConcepts && entry.keyConcepts.length
      ? `Conceptes clau: ${entry.keyConcepts.join(', ')}`
      : null
  ];

  return lines.filter(Boolean).join('\n');
}

main().catch((error) => {
  console.error('❌ Error inesperat:', error);
  process.exit(1);
});
