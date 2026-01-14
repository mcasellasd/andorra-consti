/**
 * Script per generar embeddings del corpus del Llibre Tercer.
 *
 * Ús:
 *   node scripts/generate-embeddings-llibre-tercer.js
 */

const fs = require('fs');
const path = require('path');

const KNOWLEDGE_PATH = path.join(__dirname, '../data/rag/llibre-tercer.json');
const OUTPUT_PATH = path.join(
  __dirname,
  '../data/rag/llibre-tercer-embeddings.json'
);
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_EMBEDDINGS_MODEL || 'text-embedding-3-large';

async function main() {
  if (!OPENAI_API_KEY) {
    console.error(
      '❌ Cal definir la variable d’entorn OPENAI_API_KEY abans d’executar el script.'
    );
    process.exit(1);
  }

  if (!fs.existsSync(KNOWLEDGE_PATH)) {
    console.error(`❌ No s’ha trobat el fitxer de coneixement: ${KNOWLEDGE_PATH}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(KNOWLEDGE_PATH, 'utf8');
  const entries = JSON.parse(raw);

  console.log(`📚 Entrades carregades: ${entries.length}`);
  console.log(`🧠 Model d'embeddings: ${MODEL}`);

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
    entry.legalReference ? `Referència legal: ${entry.legalReference}` : null,
    entry.keyConcepts?.length
      ? `Conceptes clau: ${entry.keyConcepts.join(', ')}`
      : null
  ];

  return lines.filter(Boolean).join('\n');
}

async function createEmbedding(input) {
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
    throw new Error('Resposta de l’API sense embedding vàlid');
  }

  return data.data[0].embedding;
}

main().catch((error) => {
  console.error('❌ Error inesperat:', error);
  process.exit(1);
});

