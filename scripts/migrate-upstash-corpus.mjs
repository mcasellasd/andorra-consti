import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { Index, FusionAlgorithm, QueryMode } from '@upstash/vector';

const sourceUrl = new URL('../data/rag/constitucio-unified.json', import.meta.url);
const raw = await readFile(sourceUrl);
const entries = JSON.parse(raw.toString('utf8'));
const namespace = process.env.UPSTASH_VECTOR_NAMESPACE || 'corpus-v1';
const expectedCount = 1_041;
const validateOnly = process.env.UPSTASH_VECTOR_VALIDATE_ONLY === '1';

if (!process.env.UPSTASH_VECTOR_REST_URL || !process.env.UPSTASH_VECTOR_REST_TOKEN) {
  throw new Error('Cal configurar UPSTASH_VECTOR_REST_URL i UPSTASH_VECTOR_REST_TOKEN.');
}
if (!Array.isArray(entries) || entries.length !== expectedCount) {
  throw new Error(`El corpus ha de contenir exactament ${expectedCount} registres; en conté ${entries.length}.`);
}
const ids = entries.map((entry) => String(entry.id));
if (new Set(ids).size !== ids.length) throw new Error('El corpus conté IDs duplicats.');

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

if (!validateOnly) {
  for (let offset = 0; offset < entries.length; offset += 100) {
    const batch = entries.slice(offset, offset + 100).map(({ id, content, ...metadata }) => ({
      id: String(id),
      data: content,
      metadata: {
        ...metadata,
        sourceType: String(id).startsWith('CONST_') ? 'constitucio' : 'doctrina',
      },
    }));
    await index.upsert(batch, { namespace });
    process.stdout.write(`\rCarregats ${Math.min(offset + batch.length, entries.length)}/${entries.length}`);
  }
  process.stdout.write('\n');
}

let indexedIds = new Set();
for (let attempt = 0; attempt < 30; attempt += 1) {
  indexedIds = await listIds(index, namespace);
  if (indexedIds.size === expectedCount) break;
  await new Promise((resolve) => setTimeout(resolve, 2_000));
}
if (indexedIds.size !== expectedCount) {
  throw new Error(`Validació fallida: Upstash conté ${indexedIds.size}/${expectedCount} registres al namespace ${namespace}.`);
}

const samples = [entries[0], entries[Math.floor(entries.length / 2)], entries.at(-1)];
for (const sample of samples) {
  const results = await index.query({
    data: sample.content.slice(0, 1_000),
    topK: 5,
    includeData: true,
    includeMetadata: true,
    queryMode: QueryMode.HYBRID,
    fusionAlgorithm: FusionAlgorithm.RRF,
  }, { namespace });
  if (!results.some((result) => String(result.id) === String(sample.id))) {
    throw new Error(`La mostra ${sample.id} no apareix al top-5.`);
  }
}

console.log(JSON.stringify({
  namespace,
  count: expectedCount,
  sha256: createHash('sha256').update(raw).digest('hex'),
  verifiedAt: new Date().toISOString(),
}, null, 2));

async function listIds(vectorIndex, targetNamespace) {
  const found = new Set();
  let cursor = '0';
  while (true) {
    const page = await vectorIndex.range(
      { cursor, limit: 1_000, includeVectors: false, includeMetadata: false, includeData: false },
      { namespace: targetNamespace },
    );
    page.vectors.forEach((vector) => found.add(String(vector.id)));
    if (!page.nextCursor || String(page.nextCursor) === '0') break;
    cursor = String(page.nextCursor);
  }
  return found;
}
