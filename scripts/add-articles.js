/**
 * Script d'ajuda per afegir articles des d'un fitxer JSON o CSV
 * 
 * Ús:
 * node scripts/add-articles.js data/articles-import.json
 */

const fs = require('fs');
const path = require('path');

// Llegeix el fitxer d'articles existent
const articlesPath = path.join(__dirname, '../data/articles.ts');
const articlesContent = fs.readFileSync(articlesPath, 'utf8');

// Extreu els articles existents
const existingArticlesMatch = articlesContent.match(/export const articles: Article\[\] = \[([\s\S]*?)\];/);
const existingArticles = existingArticlesMatch ? existingArticlesMatch[1] : '';

console.log('Articles existents trobats:', existingArticles.split('},').length);

// Si es passa un fitxer JSON com a argument
if (process.argv[2]) {
  const importPath = path.join(__dirname, '..', process.argv[2]);
  if (fs.existsSync(importPath)) {
    const importData = JSON.parse(fs.readFileSync(importPath, 'utf8'));
    console.log(`S'han trobat ${importData.length} articles per importar.`);
    console.log('\nExemple de com afegir-los manualment a articles.ts:');
    console.log(JSON.stringify(importData[0], null, 2));
  }
}

