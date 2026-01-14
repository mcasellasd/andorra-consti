/**
 * Script per processar el text complet de la Constitució d'Andorra
 * i generar el fitxer JSON amb tots els articles
 * 
 * Requisits:
 * - docs/constitucio-andorra.txt amb el text complet de la Constitució
 * 
 * Ús:
 *   node scripts/process-constitucio-completa.js
 */

const fs = require('fs');
const path = require('path');

const INPUT_PATH = path.join(__dirname, '../docs/constitucio-andorra.txt');
const OUTPUT_PATH = path.join(__dirname, '../data/rag/constitucio.json');

function extractArticles(text) {
  const entries = [];
  
  // Netejar el text
  text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  
  // Extreure el Preàmbul (abans del primer "Article")
  const preambulMatch = text.match(/(.*?)(?=Article\s+1|TÍTOL\s+I)/is);
  if (preambulMatch) {
    const preambul = preambulMatch[1].trim();
    if (preambul.length > 50) {
      entries.push({
        id: "CONST_PREAMB",
        category: "Preàmbul",
        topic: "Preàmbul de la Constitució d'Andorra",
        content: preambul,
        legalReference: "Constitució d'Andorra, Preàmbul",
        keyConcepts: ["constitució", "preàmbul", "sobirania", "drets fonamentals", "democràcia"]
      });
    }
  }
  
  // Extreure títols i articles
  const titolRegex = /TÍTOL\s+([IVX]+)\s*[–-]\s*(.+?)(?=TÍTOL|Article|\n\n\n|$)/gis;
  const articleRegex = /Article\s+(\d+)(?:\.|:)?\s*(.+?)(?=Article\s+\d+|TÍTOL|Disposició|$)/gis;
  
  let titolActual = null;
  let titolNumero = null;
  
  // Primer, identificar tots els títols
  const titols = [];
  let match;
  while ((match = titolRegex.exec(text)) !== null) {
    titols.push({
      numero: match[1],
      nom: match[2].trim(),
      posicio: match.index
    });
  }
  
  // Processar articles
  let articleMatch;
  // Millorar la regex per capturar millor els articles
  // Utilitzem [\s\S] en lloc de . per capturar també salts de línia
  // El lookahead ha de ser més específic per capturar tot el contingut fins al següent article o títol
  const articleRegex2 = /Article\s+(\d+)(?:\.|:)?\s*([\s\S]+?)(?=\n\s*Article\s+\d+|\nTítol\s+[IVX]+|Disposició|Disposicions|$)/gi;
  
  while ((articleMatch = articleRegex2.exec(text)) !== null) {
    const numero = parseInt(articleMatch[1]);
    let contingut = articleMatch[2].trim();
    
    // Trobar a quin títol pertany aquest article
    let titolPertanyent = null;
    for (let i = titols.length - 1; i >= 0; i--) {
      if (titols[i].posicio < articleMatch.index) {
        titolPertanyent = titols[i];
        break;
      }
    }
    
    // Si no trobem títol, intentar trobar-lo pel context
    if (!titolPertanyent) {
      // Articles 1-3 són del Títol I
      if (numero <= 3) {
        titolPertanyent = { numero: 'I', nom: "Sobirania d'Andorra" };
      }
      // Articles 4-42 són del Títol II
      else if (numero >= 4 && numero <= 42) {
        titolPertanyent = { numero: 'II', nom: "Drets i llibertats" };
      }
      // Articles 43-49 són del Títol III
      else if (numero >= 43 && numero <= 49) {
        titolPertanyent = { numero: 'III', nom: "Els Coprínceps" };
      }
      // Articles 50-71 són del Títol IV
      else if (numero >= 50 && numero <= 71) {
        titolPertanyent = { numero: 'IV', nom: "El Consell General" };
      }
      // Articles 72-78 són del Títol V
      else if (numero >= 72 && numero <= 78) {
        titolPertanyent = { numero: 'V', nom: "El Govern" };
      }
      // Articles 79-84 són del Títol VI
      else if (numero >= 79 && numero <= 84) {
        titolPertanyent = { numero: 'VI', nom: "Estructura territorial" };
      }
      // Articles 85-94 són del Títol VII
      else if (numero >= 85 && numero <= 94) {
        titolPertanyent = { numero: 'VII', nom: "Justícia" };
      }
      // Articles 95-103 són del Títol VIII
      else if (numero >= 95 && numero <= 103) {
        titolPertanyent = { numero: 'VIII', nom: "Tribunal Constitucional" };
      }
      // Articles 104-107 són del Títol IX
      else if (numero >= 104 && numero <= 107) {
        titolPertanyent = { numero: 'IX', nom: "Reforma de la Constitució" };
      }
    }
    
    // Netejar el contingut - eliminar referències a capítols i títols que no pertanyen
    contingut = contingut.replace(/\n{3,}/g, '\n\n').trim();
    // Eliminar línies que són només "Capítol X..." o "Títol X..." que s'han capturat per error
    contingut = contingut.replace(/^Capítol\s+[IVX]+\.\s*[^\n]+\n?/gim, '');
    contingut = contingut.replace(/^Títol\s+[IVX]+\s*[^\n]+\n?/gim, '');
    contingut = contingut.trim();
    
    // El topic serà simplement "Article X" sense intentar extreure un títol
    // ja que els articles de la Constitució no tenen títols descriptius, només numeració
    const category = titolPertanyent 
      ? `Títol ${titolPertanyent.numero} - ${titolPertanyent.nom}`
      : "Constitució d'Andorra";
    
    const topic = `Article ${numero}`;
    const contingutArticle = contingut;
    
    // Generar conceptes clau bàsics a partir del contingut
    const keyConcepts = ["constitució", "article"];
    
    entries.push({
      id: `CONST_${numero.toString().padStart(3, '0')}`,
      category,
      topic,
      content: contingutArticle,
      legalReference: `Constitució d'Andorra, Article ${numero}`,
      keyConcepts: keyConcepts.length > 0 ? keyConcepts : ["constitució", "article"]
    });
  }
  
  return entries;
}

function main() {
  console.log('📚 Processant Constitució d\'Andorra...\n');
  
  if (!fs.existsSync(INPUT_PATH)) {
    console.error(`❌ Error: No s'ha trobat el fitxer ${INPUT_PATH}`);
    console.error('\n💡 Per completar la Constitució:');
    console.error('   1. Extreu el text del PDF: docs/Constitucio dAndorra  Catala.pdf');
    console.error('   2. Guarda\'l a: docs/constitucio-andorra.txt');
    console.error('   3. Executa novament aquest script');
    process.exit(1);
  }
  
  const text = fs.readFileSync(INPUT_PATH, 'utf8');
  console.log(`✅ Text llegit: ${text.length} caràcters\n`);
  
  const entries = extractArticles(text);
  console.log(`✅ Extrets ${entries.length} articles\n`);
  
  // Mostrar estadístiques
  const perTitol = {};
  entries.forEach(e => {
    const titol = e.category.split(' - ')[0];
    perTitol[titol] = (perTitol[titol] || 0) + 1;
  });
  
  console.log('📊 Articles per títol:');
  Object.keys(perTitol).sort().forEach(titol => {
    console.log(`   ${titol}: ${perTitol[titol]} articles`);
  });
  
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(entries, null, 2), 'utf8');
  console.log(`\n✅ Fitxer guardat a: ${OUTPUT_PATH}`);
  console.log('\n💡 Següent pas: Executa el script de generació d\'embeddings:');
  console.log('   node scripts/generate-embeddings-constitucio.js');
  console.log('\n💡 I després converteix a format ArticleAndorra:');
  console.log('   node scripts/convert-rag-to-articles.ts');
}

main();

