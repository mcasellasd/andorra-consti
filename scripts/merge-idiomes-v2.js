/**
 * Script per fusionar idiomes duplicats al fitxer de constitució
 * Versió 2: Llegeix amb VM, fusiona, i regenera el JSON correctament
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const filePath = path.join(__dirname, '../data/codis/constitucio/articles.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Extreure el JSON array
const match = content.match(/export const articlesConstitucio: ArticleAndorra\[\] = (\[[\s\S]*\]);/);
if (!match) {
  console.log('❌ No s\'ha trobat el JSON array');
  process.exit(1);
}

const arrayContent = match[1];

// Llegir el JSON però extreure idiomes del text en brut per mantenir tots
let articles;
try {
  articles = vm.runInNewContext(arrayContent, {});
} catch (e) {
  console.log('❌ Error parsejant JSON:', e.message);
  process.exit(1);
}

// Llegir idiomes duplicats del text en brut
let fixedCount = 0;
articles.forEach((art, idx) => {
  // Buscar al text en brut si hi ha múltiples objectes idiomes per aquest article
  const articleIdPattern = `"id"\\s*:\\s*"${art.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`;
  const articleMatch = arrayContent.match(new RegExp(`${articleIdPattern}[\\s\\S]*?(?="id"\\s*:|$)`, 'g'));
  
  if (articleMatch) {
    const articleText = articleMatch[0];
    const idiomesMatches = articleText.match(/"idiomes"\s*:\s*\{[^}]*\}/g);
    
    if (idiomesMatches && idiomesMatches.length > 1) {
      // Hi ha múltiples objectes idiomes, fusionar-los
      const allIdiomes = {};
      
      idiomesMatches.forEach(idiomesObj => {
        // Extreure es i ca d'aquest objecte
        const esMatch = idiomesObj.match(/"es"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/);
        const caMatch = idiomesObj.match(/"ca"\s*:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/);
        
        if (esMatch) {
          allIdiomes.es = esMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        if (caMatch) {
          allIdiomes.ca = caMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
      });
      
      if (Object.keys(allIdiomes).length > 0) {
        art.idiomes = allIdiomes;
        fixedCount++;
      }
    }
  }
});

if (fixedCount > 0) {
  // Crear backup
  const backupPath = filePath + `.backup.before-merge-v2.${Date.now()}`;
  fs.writeFileSync(backupPath, content, 'utf-8');
  console.log(`📦 Backup creat: ${path.basename(backupPath)}`);
  
  // Regenerar el JSON
  const newJSON = JSON.stringify(articles, null, 2);
  const newContent = content.replace(
    /export const articlesConstitucio: ArticleAndorra\[\] = \[[\s\S]*\];/,
    `export const articlesConstitucio: ArticleAndorra[] = ${newJSON};`
  );
  
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`✅ Fusionats ${fixedCount} articles amb idiomes duplicats`);
} else {
  console.log('✅ No hi ha idiomes duplicats per fusionar');
}
