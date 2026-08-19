const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const sourcePath = path.join(root, 'docs/constitucio-andorra.txt');
const articlesPath = path.join(root, 'data/codis/constitucio/articles.ts');
const ragPath = path.join(root, 'data/rag/constitucio.json');

function extractSourceArticles(text) {
  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  const result = new Map();
  let current = null;
  let skipNextAfterTitle = false;

  const isStructural = (line) =>
    /^(Títol|Capítol|Secció)\s+/i.test(line) ||
    /^Preàmbul$/i.test(line) ||
    /^BOPA|^Butlletí Oficial|^Constitució d'Andorra|^Pàgina\s+\d+/i.test(line) ||
    /^\d+$/.test(line);

  for (const raw of lines) {
    const line = raw.replace(/\f/g, ' ').trim();
    const heading = line.match(/^Article\s+(\d+)\s*[:.]?$/i);
    if (heading) {
      if (current) result.set(current.number, current.lines.join('\n').trim());
      current = { number: Number(heading[1]), lines: [] };
      skipNextAfterTitle = false;
      continue;
    }
    if (/^Títol\s+/i.test(line)) {
      skipNextAfterTitle = true;
      continue;
    }
    if (skipNextAfterTitle && line) {
      skipNextAfterTitle = false;
      continue;
    }
    if (/^Disposició\s+/i.test(line)) {
      if (current) result.set(current.number, current.lines.join('\n').trim());
      current = null;
      continue;
    }
    if (current && line && !isStructural(line)) current.lines.push(line);
  }
  if (current) result.set(current.number, current.lines.join('\n').trim());
  return result;
}

function readArticlesTs() {
  const source = fs.readFileSync(articlesPath, 'utf8');
  const match = source.match(/export const articlesConstitucio: ArticleAndorra\[\] = (\[[\s\S]*\]);\s*$/);
  if (!match) throw new Error('No s\'ha pogut llegir l\'array d\'articles');
  return { source, articles: JSON.parse(match[1]) };
}

const sourceArticles = extractSourceArticles(fs.readFileSync(sourcePath, 'utf8'));
const { articles } = readArticlesTs();
let repaired = 0;
const missing = [];

for (const article of articles) {
  const numberMatch = article.numeracio.match(/(\d+)/);
  if (!numberMatch) continue;
  const number = Number(numberMatch[1]);
  const fullText = sourceArticles.get(number);
  if (!fullText) {
    missing.push(number);
    continue;
  }
  if (article.text_oficial !== fullText || article.idiomes?.ca !== fullText) repaired++;
  article.text_oficial = fullText;
  article.idiomes = { ...(article.idiomes || {}), ca: fullText };
}

if (missing.length) throw new Error(`Falten articles a la font: ${missing.join(', ')}`);

const header = "import { ArticleAndorra } from '../types';\n\n";
fs.writeFileSync(articlesPath, `${header}export const articlesConstitucio: ArticleAndorra[] = ${JSON.stringify(articles, null, 2)};\n`);

const rag = JSON.parse(fs.readFileSync(ragPath, 'utf8'));
for (const entry of rag) {
  const numberMatch = String(entry.topic || '').match(/(\d+)/);
  if (!numberMatch) continue;
  const fullText = sourceArticles.get(Number(numberMatch[1]));
  if (fullText) entry.content = fullText;
}
fs.writeFileSync(ragPath, `${JSON.stringify(rag, null, 2)}\n`);

console.log(`Articles actualitzats: ${repaired}`);
console.log(`Articles verificats: ${articles.length}`);
console.log(`Article 9: ${sourceArticles.get(9).length} caràcters`);
