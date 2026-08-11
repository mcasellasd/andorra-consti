/**
 * Repara embeddings després d'una correcció selectiva del corpus constitucional.
 * Manté vectors vàlids, elimina IDs duplicats i regenera només els articles canviats.
 */

const fs = require('fs');
const path = require('path');

const envLocal = path.join(__dirname, '../.env.local');
const env = path.join(__dirname, '../.env');
if (fs.existsSync(envLocal)) require('dotenv').config({ path: envLocal });
if (fs.existsSync(env)) require('dotenv').config({ path: env });

const KNOWLEDGE_PATH = path.join(__dirname, '../data/rag/constitucio.json');
const EMBEDDINGS_PATH = path.join(__dirname, '../data/rag/constitucio-embeddings.json');
const MODEL = process.env.OPENAI_EMBEDDINGS_MODEL || 'text-embedding-3-large';
const CHANGED_IDS = new Set(['CONST_003', 'CONST_009', 'CONST_045', 'CONST_064', 'CONST_102']);

function embeddingText(entry) {
  return [
    `ID: ${entry.id}`,
    `Categoria: ${entry.category}`,
    `Tema: ${entry.topic}`,
    entry.content ? `Contingut: ${entry.content}` : null,
    entry.legalReference ? `Referència legal: ${entry.legalReference}` : null,
    entry.keyConcepts?.length ? `Conceptes clau: ${entry.keyConcepts.join(', ')}` : null,
  ].filter(Boolean).join('\n');
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('No s’ha trobat OPENAI_API_KEY');

  const knowledge = JSON.parse(fs.readFileSync(KNOWLEDGE_PATH, 'utf8'));
  const existing = JSON.parse(fs.readFileSync(EMBEDDINGS_PATH, 'utf8'));
  const byId = new Map();
  for (const item of existing) {
    if (!byId.has(item.id)) byId.set(item.id, item);
  }

  const changed = knowledge.filter((entry) => CHANGED_IDS.has(entry.id));
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: MODEL, input: changed.map(embeddingText) }),
  });
  if (!response.ok) throw new Error(`OpenAI embeddings ${response.status}: ${await response.text()}`);
  const payload = await response.json();
  if (!Array.isArray(payload.data) || payload.data.length !== changed.length) {
    throw new Error('La resposta d’embeddings no coincideix amb els articles canviats');
  }

  changed.forEach((entry, index) => {
    byId.set(entry.id, {
      id: entry.id,
      topic: entry.topic,
      category: entry.category,
      embedding: payload.data[index].embedding,
      text: embeddingText(entry),
    });
  });

  const repaired = knowledge.map((entry) => byId.get(entry.id)).filter(Boolean);
  if (repaired.length !== knowledge.length) {
    throw new Error(`Falten embeddings: ${repaired.length}/${knowledge.length}`);
  }

  fs.writeFileSync(EMBEDDINGS_PATH, JSON.stringify(repaired, null, 2), 'utf8');
  console.log(`✅ Embeddings reparats: ${repaired.length}; articles regenerats: ${changed.length}.`);
}

main().catch((error) => {
  console.error(`❌ ${error.message}`);
  process.exit(1);
});
