const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/chapters/extracted-articles.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Funció per determinar el títol segons el número d'article
function getTitleFromArticleNumber(number) {
  const match = number.match(/Article (5\d{2})-/);
  if (!match) return null;
  const prefix = parseInt(match[1]);
  
  if (prefix === 511) return 'Títol I: Dels béns';
  if (prefix >= 521 && prefix <= 522) return 'Títol II: De la possessió';
  if (prefix >= 531 && prefix <= 532) return 'Títol III: De l\'adquisició, la transmissió i l\'extinció del dret real';
  if (prefix >= 541 && prefix <= 547) return 'Títol IV: Del dret de propietat';
  if (prefix >= 551 && prefix <= 554) return 'Títol V: De les situacions de comunitat';
  if (prefix >= 561 && prefix <= 569) return 'Títol VI: Dels drets reals limitats';
  
  return null;
}

// Trobar tots els articles amb regex
const articleRegex = /number:\s*['"](Article \d+-\d+)['"],\s*title:[^,]+,\s*section:\s*['"]([^'"]+)['"]/g;
let match;
let corrections = 0;
const replacements = [];

while ((match = articleRegex.exec(content)) !== null) {
  const articleNumber = match[1];
  const currentSection = match[2];
  const correctTitle = getTitleFromArticleNumber(articleNumber);
  
  if (correctTitle && currentSection !== correctTitle) {
    // Netejar la secció actual (pot tenir " - Capítol..." o altres coses)
    const cleanCurrentSection = currentSection.split(' - ')[0].trim();
    // Si la secció neta no coincideix amb el títol correcte, o si conté "Títol I" però l'article no és del Títol I
    if (cleanCurrentSection !== correctTitle || (cleanCurrentSection === 'Títol I: Dels béns' && prefix !== 511)) {
      replacements.push({
        articleNumber,
        oldSection: currentSection,
        newSection: correctTitle
      });
      corrections++;
    }
  }
}

// Aplicar les correccions
replacements.forEach(({ articleNumber, oldSection, newSection }) => {
  // Escapar caràcters especials per al regex
  const escapedOld = oldSection.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedArticle = articleNumber.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Crear el patró de cerca
  const pattern = new RegExp(
    `(number:\\s*['"]${escapedArticle}['"],\\s*title:[^,]+,\\s*section:\\s*)['"]${escapedOld}['"]`,
    'g'
  );
  
  content = content.replace(pattern, `$1'${newSection}'`);
  console.log(`Corregint: ${articleNumber} de '${oldSection}' a '${newSection}'`);
});

if (corrections > 0) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`\n✅ Total correccions: ${corrections}`);
} else {
  console.log('\n✅ No s\'han trobat correccions necessàries');
}

