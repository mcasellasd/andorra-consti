/**
 * Script per convertir els articles del Llibre Segon en entrades de coneixement per al RAG.
 *
 * Ús:
 *   node scripts/build-llibre-segon-knowledge.js
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SOURCE_PATH = path.join(
  __dirname,
  '../data/chapters/extracted-articles-llibre-segon.ts'
);
const OUTPUT_PATH = path.join(__dirname, '../data/rag/llibre-segon.json');

function main() {
  if (!fs.existsSync(SOURCE_PATH)) {
    console.error(`❌ No s'ha trobat el fitxer d'origen: ${SOURCE_PATH}`);
    process.exit(1);
  }

  const code = fs.readFileSync(SOURCE_PATH, 'utf8');
  const sanitized = sanitizeSource(code);
  const articles = executeModule(sanitized);

  if (!Array.isArray(articles)) {
    console.error('❌ No s’han pogut obtenir els articles del Llibre Segon.');
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
      filename: 'llibre-segon-articles.js'
    });
    script.runInContext(sandbox);
  } catch (error) {
    console.error('❌ Error executant el codi sanititzat:', error);
    process.exit(1);
  }

  return sandbox.module.exports;
}

function toKnowledgeEntry(article) {
  const section = article.section || 'Llibre segon';
  const normalizedTitle = deriveTitle(article);
  const topic = `${article.number}: ${normalizedTitle}`;
  const normalizedId = normalizeId(article.number);
  const keyConcepts = extractKeyConcepts(normalizedTitle);
  const content = normalizeContent(article, normalizedTitle);

  return {
    id: normalizedId,
    category: section,
    topic,
    content,
    implications: article.summary ? article.summary.trim() : undefined,
    legalReference: article.number,
    keyConcepts
  };
}

function deriveTitle(article) {
  const incomingTitle = article?.title?.trim();
  if (incomingTitle && incomingTitle !== article.number) {
    return incomingTitle;
  }

  const candidate = (article.content || '')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)[0];

  if (candidate) {
    const cleaned = candidate.replace(/^Article\s+\S+\s*/i, '').trim();
    if (cleaned.length > 0) {
      return cleaned;
    }
  }

  return incomingTitle || article.number;
}

function normalizeContent(article, normalizedTitle) {
  if (!article.content) {
    return '';
  }

  const lines = article.content
    .split('\n')
    .map((line) => line.trim());

  if (
    normalizedTitle &&
    lines.length > 0 &&
    lines[0].toLowerCase() === normalizedTitle.toLowerCase()
  ) {
    lines.shift();
  }

  return lines.join('\n').trim();
}

function normalizeId(number) {
  return `LII_${number.replace(/\s+/g, '_').replace(/[^\w\-À-ÿ]/g, '')}`;
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


