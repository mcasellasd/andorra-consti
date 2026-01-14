/**
 * Script per generar embeddings del corpus de la Constitució d'Andorra
 *
 * Ús:
 *   node scripts/generate-embeddings-constitucio.js
 *
 * Requisits:
 *   - Variable d'entorn OPENAI_API_KEY establerta.
 *   - Arxiu data/rag/constitucio.json amb les entrades de coneixement.
 */

const fs = require('fs');
const path = require('path');

// Carregar variables d'entorn des de .env.local si existeix
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const KNOWLEDGE_PATH = path.join(__dirname, '../data/rag/constitucio.json');
const OUTPUT_PATH = path.join(__dirname, '../data/rag/constitucio-embeddings.json');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_EMBEDDINGS_MODEL || 'text-embedding-3-large';

async function main() {
  if (!OPENAI_API_KEY) {
    console.error('❌ Fes servir la variable d\'entorn OPENAI_API_KEY abans d\'executar el script.');
    process.exit(1);
  }

  if (!fs.existsSync(KNOWLEDGE_PATH)) {
    console.error(`❌ No s'ha trobat l'arxiu de coneixement: ${KNOWLEDGE_PATH}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(KNOWLEDGE_PATH, 'utf8');
  const entries = JSON.parse(raw);

  console.log(`📚 Entrades carregades: ${entries.length}`);
  console.log(`🧠 Model d'embeddings: ${MODEL}`);

  const results = [];

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const text = buildEmbeddingText(entry);
    console.log(`➡️  [${i + 1}/${entries.length}] Generant embedding per ${entry.id} - ${entry.topic}`);

    try {
      const embedding = await createEmbedding(text);
      results.push({
        id: entry.id,
        topic: entry.topic,
        category: entry.category,
        embedding,
        text
      });
      
      // Petita pausa per evitar rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`❌ Error generant embedding per ${entry.id}:`, error.message);
      // Continuem amb el següent
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
    entry.legalReference ? `Referència legal: ${entry.legalReference}` : null,
    entry.keyConcepts && entry.keyConcepts.length
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
    throw new Error('Resposta de l\'API sense embedding vàlid');
  }

  return data.data[0].embedding;
}

main().catch((error) => {
  console.error('❌ Error inesperat:', error);
  process.exit(1);
});

