/**
 * Script per arreglar idiomes duplicats al fitxer de constitució
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/codis/constitucio/articles.ts');

let content = fs.readFileSync(filePath, 'utf8');

// Trobar articles amb idiomes duplicats i fusionar-los
// Patró: "idiomes": {...}, seguit d'altres camps, després altre "idiomes": {...}
const articlePattern = /("id"\s*:\s*"[^"]+"[^}]*?)("idiomes"\s*:\s*\{[^}]*?\}\s*,?\s*)([^}]*?)("idiomes"\s*:\s*\{[^}]*?\}\s*,?\s*)/g;

let fixedContent = content;
let fixedCount = 0;

fixedContent = fixedContent.replace(articlePattern, (match, articleStart, idiomes1, middle, idiomes2) => {
  // Extreure els idiomes dels dos objectes
  const idiomes1Match = idiomes1.match(/"([^"]+)"\s*:\s*"([^"]*(?:\\.[^"]*)*)"/);
  const idiomes2Match = idiomes2.match(/"([^"]+)"\s*:\s*"([^"]*(?:\\.[^"]*)*)"/);
  
  if (idiomes1Match && idiomes2Match) {
    const lang1 = idiomes1Match[1];
    const text1 = idiomes1Match[2];
    const lang2 = idiomes2Match[1];
    const text2 = idiomes2Match[2];
    
    // Fusionar en un sol objecte idiomes
    const mergedIdiomes = `    "idiomes": {\n      "${lang1}": "${text1}",\n      "${lang2}": "${text2}"\n    }`;
    
    fixedCount++;
    console.log(`✅ Fusionant idiomes per article (${lang1} + ${lang2})`);
    
    return articleStart + mergedIdiomes + ',' + middle;
  }
  
  return match;
});

if (fixedCount > 0) {
  fs.writeFileSync(filePath, fixedContent, 'utf8');
  console.log(`\n✅ Arreglats ${fixedCount} articles amb idiomes duplicats`);
} else {
  console.log('✅ No hi ha idiomes duplicats per arreglar');
}
