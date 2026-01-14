/**
 * Script per convertir els articles del Llibre Tercer en entrades de coneixement per al RAG.
 *
 * Ús:
 *   node scripts/build-llibre-tercer-knowledge.js
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SOURCE_PATH = path.join(
  __dirname,
  '../data/chapters/extracted-articles-llibre-tercer.ts'
);
const OUTPUT_PATH = path.join(__dirname, '../data/rag/llibre-tercer.json');

function main() {
  if (!fs.existsSync(SOURCE_PATH)) {
    console.error(`❌ No s'ha trobat el fitxer d'origen: ${SOURCE_PATH}`);
    process.exit(1);
  }

  const code = fs.readFileSync(SOURCE_PATH, 'utf8');
  const sanitized = sanitizeSource(code);
  const articles = executeModule(sanitized);

  if (!Array.isArray(articles)) {
    console.error('❌ No s’han pogut obtenir els articles del Llibre Tercer.');
    process.exit(1);
  }

  const knowledgeEntries = articles.map((article) => toKnowledgeEntry(article));

  fs.writeFileSync(
    OUTPUT_PATH,
    JSON.stringify(knowledgeEntries, null, 2),
    'utf8'
  );

  console.log(`✅ Entrades de coneixement generades: ${knowledgeEntries.length}`);
  console.log(`📄 Guardades a ${OUTPUT_PATH}`);
}

function sanitizeSource(code) {
  return (
    code
      // elimina import
      .replace(/import\s+\{[^}]+\}\s+from\s+['"][^'"]+['"];?\s*/g, '')
      // substitueix export
      .replace(
        /export\s+const\s+extractedArticles\s*:\s*[^=]+=\s*/,
        'module.exports = '
      )
  );
}

function executeModule(sanitizedCode) {
  const sandbox = { module: { exports: {} }, exports: {} };
  vm.createContext(sandbox);

  try {
    const script = new vm.Script(sanitizedCode, {
      filename: 'llibre-tercer-articles.js'
    });
    script.runInContext(sandbox);
  } catch (error) {
    console.error('❌ Error executant el codi sanititzat:', error);
    process.exit(1);
  }

  return sandbox.module.exports;
}

function toKnowledgeEntry(article) {
  const section = article.section || 'Llibre tercer';
  const topic = `${article.number}: ${article.title}`;
  const normalizedId = normalizeId(article.number);
  const keyConcepts = extractKeyConcepts(article.title);

  return {
    id: normalizedId,
    category: section,
    topic,
    content: article.content ? article.content.trim() : '',
    implications: article.summary ? article.summary.trim() : undefined,
    legalReference: article.number,
    keyConcepts
  };
}

function normalizeId(number) {
  return `LIII_${number.replace(/\s+/g, '_').replace(/[^\w\-À-ÿ]/g, '')}`;
}

function extractKeyConcepts(title) {
  if (!title) {
    return [];
  }

  const rawWords = title
    .toLowerCase()
    .replace(/[^a-zà-ÿ0-9\s-]/gi, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2);

  const unique = Array.from(new Set(rawWords));
  return unique.slice(0, 6);
}

main();

