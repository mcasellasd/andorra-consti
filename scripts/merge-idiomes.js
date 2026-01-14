/**
 * Script per fusionar idiomes duplicats al fitxer de constitució
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/codis/constitucio/articles.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Trobar articles amb idiomes duplicats
// Patró: article amb dos objectes "idiomes" separats
const articleWithDuplicateIdiomes = /("id"\s*:\s*"[^"]+",[\s\S]*?)"idiomes"\s*:\s*\{([^}]*)\}([\s\S]*?)"idiomes"\s*:\s*\{([^}]*)\}/g;

let fixedCount = 0;
const fixedContent = content.replace(articleWithDuplicateIdiomes, (match, articleStart, idiomes1Content, middle, idiomes2Content) => {
  // Extreure idiomes del primer objecte
  const esMatch = idiomes1Content.match(/"es"\s*:\s*"([^"]*(?:\\.[^"]*)*)"/);
  const caMatch1 = idiomes1Content.match(/"ca"\s*:\s*"([^"]*(?:\\.[^"]*)*)"/);
  
  // Extreure idiomes del segon objecte
  const caMatch2 = idiomes2Content.match(/"ca"\s*:\s*"([^"]*(?:\\.[^"]*)*)"/);
  const esMatch2 = idiomes2Content.match(/"es"\s*:\s*"([^"]*(?:\\.[^"]*)*)"/);
  
  // Fusionar tots els idiomes
  const mergedIdiomes = [];
  if (esMatch || esMatch2) {
    const esText = esMatch ? esMatch[1] : esMatch2[1];
    mergedIdiomes.push(`      "es": "${esText}"`);
  }
  if (caMatch1 || caMatch2) {
    const caText = caMatch1 ? caMatch1[1] : caMatch2[1];
    mergedIdiomes.push(`      "ca": "${caText}"`);
  }
  
  if (mergedIdiomes.length > 0) {
    fixedCount++;
    const mergedObj = `    "idiomes": {\n${mergedIdiomes.join(',\n')}\n    }`;
    // Eliminar el segon objecte idiomes
    const cleanedMiddle = middle.replace(/,\s*"idiomes"\s*:\s*\{[^}]*\}\s*,?/g, '');
    return articleStart + mergedObj + cleanedMiddle;
  }
  
  return match;
});

if (fixedCount > 0) {
  // Crear backup
  const backupPath = filePath + `.backup.before-merge.${Date.now()}`;
  fs.writeFileSync(backupPath, content, 'utf-8');
  console.log(`📦 Backup creat: ${backupPath}`);
  
  fs.writeFileSync(filePath, fixedContent, 'utf8');
  console.log(`✅ Fusionats ${fixedCount} articles amb idiomes duplicats`);
} else {
  console.log('✅ No hi ha idiomes duplicats per fusionar');
}
