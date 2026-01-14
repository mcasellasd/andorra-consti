/**
 * Script per generar embeddings del corpus del Llibre Primer
 *
 * Ús:
 *   node scripts/generate-embeddings-llibre-primer.js
 *
 * Requisits:
 *   - Variable d'entorn OPENAI_API_KEY establerta.
 *   - Arxiu data/rag/llibre-primer.json amb les entrades de coneixement.
 */

const fs = require('fs');
const path = require('path');

const KNOWLEDGE_PATH = path.join(__dirname, '../data/rag/llibre-primer.json');
const OUTPUT_PATH = path.join(__dirname, '../data/rag/llibre-primer-embeddings.json');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const EMBEDDING_PROVIDER = process.env.EMBEDDING_PROVIDER || (OPENAI_API_KEY ? 'openai' : 'xlm-roberta');
const MODEL = process.env.OPENAI_EMBEDDINGS_MODEL || 'text-embedding-3-large';

async function main() {
  if (EMBEDDING_PROVIDER === 'openai' && !OPENAI_API_KEY) {
    console.error('❌ Fes servir la variable d\'entorn OPENAI_API_KEY abans d\'executar el script.');
    console.error('   O configura EMBEDDING_PROVIDER=xlm-roberta per utilitzar el model local.');
    process.exit(1);
  }

  if (!fs.existsSync(KNOWLEDGE_PATH)) {
    console.error(`❌ No s'ha trobat l'arxiu de coneixement: ${KNOWLEDGE_PATH}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(KNOWLEDGE_PATH, 'utf8');
  const entries = JSON.parse(raw);

  console.log(`📚 Entrades carregades: ${entries.length}`);
  console.log(`🧠 Proveïdor d'embeddings: ${EMBEDDING_PROVIDER}`);
  if (EMBEDDING_PROVIDER === 'openai') {
    console.log(`🧠 Model d'embeddings: ${MODEL}`);
  } else {
    console.log(`🧠 Model: XLM-RoBERTa-base (local)`);
  }

  const results = [];

  for (const entry of entries) {
    const text = buildEmbeddingText(entry);
    console.log(`➡️  Generant embedding per ${entry.id} - ${entry.topic}`);

    const embedding = await createEmbedding(text);
    results.push({
      id: entry.id,
      topic: entry.topic,
      category: entry.category,
      embedding,
      text
    });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2), 'utf8');
  console.log(`✅ Embeddings guardats a ${OUTPUT_PATH}`);
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

async function createEmbedding(input) {
  if (EMBEDDING_PROVIDER === 'xlm-roberta') {
    // Utilitzar XLM-RoBERTa local
    const { pipeline } = require('@xenova/transformers');
    const MODEL_NAME = 'Xenova/xlm-roberta-base';
    
    if (!createEmbedding.modelCache) {
      console.log(`📦 Carregant model ${MODEL_NAME}...`);
      createEmbedding.modelCache = await pipeline('feature-extraction', MODEL_NAME, {
        quantized: true,
      });
      console.log(`✅ Model carregat`);
    }

    const output = await createEmbedding.modelCache(input, {
      pooling: 'mean',
      normalize: true,
    });

    return Array.from(output.data);
  } else {
    // Utilitzar OpenAI API
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        input
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error generant embedding (${response.status}): ${errorText}`
      );
    }

    const data = await response.json();
    if (!data.data?.[0]?.embedding) {
      throw new Error('Resposta de l\'API sense embedding vàlid');
    }

    return data.data[0].embedding;
  }
}

// Cache per al model XLM-RoBERTa
createEmbedding.modelCache = null;

main().catch((error) => {
  console.error('❌ Error inesperat:', error);
  process.exit(1);
});

