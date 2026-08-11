/**
 * Sincronitza només el text oficial dels articles de la Constitució.
 *
 * Manté les metadades pedagògiques i doctrinals que ja existeixen a
 * data/codis/constitucio/articles.ts. És deliberadament separat de la
 * conversió general del RAG, que no ha d'esborrar aquest enriquiment.
 */

const fs = require('fs');
const path = require('path');

const RAG_PATH = path.join(__dirname, '../data/rag/constitucio.json');
const ARTICLES_PATH = path.join(__dirname, '../data/codis/constitucio/articles.ts');

function readArticlesTs() {
  const source = fs.readFileSync(ARTICLES_PATH, 'utf8');
  const start = source.indexOf('= ') + 2;
  const end = source.lastIndexOf(';');
  if (start < 2 || end <= start) {
    throw new Error('No s’ha pogut localitzar l’array d’articles a articles.ts');
  }
  return JSON.parse(source.slice(start, end));
}

function main() {
  const rag = JSON.parse(fs.readFileSync(RAG_PATH, 'utf8'));
  const articles = readArticlesTs();
  const texts = new Map(rag.map((entry) => [entry.id, entry.content]));
  const missing = [];
  let changed = 0;

  const updated = articles.map((article) => {
    const text = texts.get(article.id);
    if (typeof text !== 'string') {
      missing.push(article.id);
      return article;
    }
    if (article.text_oficial !== text) changed += 1;
    return { ...article, text_oficial: text, idiomes: { ...(article.idiomes || {}), ca: text } };
  });

  if (missing.length > 0) {
    throw new Error(`No hi ha text RAG per als articles: ${missing.join(', ')}`);
  }

  const header = `/**
 * Articles de la Constitució d'Andorra
 * Sincronitzats des de data/rag/constitucio.json; les metadades enriquides es preserven.
 */

import { ArticleAndorra } from '../types';

export const articlesConstitucio: ArticleAndorra[] = `;

  fs.writeFileSync(ARTICLES_PATH, `${header}${JSON.stringify(updated, null, 2)};\n`, 'utf8');
  console.log(`✅ Textos sincronitzats: ${changed} articles actualitzats; ${updated.length} articles totals.`);
}

main();
