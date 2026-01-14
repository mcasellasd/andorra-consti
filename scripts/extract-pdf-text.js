/**
 * Script per extreure text d'un PDF utilitzant pdf-parse
 * 
 * Ús:
 * node scripts/extract-pdf-text.js [ruta-pdf] [ruta-output.txt]
 * 
 * Exemple:
 * node scripts/extract-pdf-text.js docs/codi-civil-andorra.pdf docs/codi-civil-andorra.txt
 */

const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const [,, pdfArg, outputArg] = process.argv;

if (!pdfArg) {
  console.log('❌ Has de proporcionar la ruta del PDF');
  console.log('\nÚs: node scripts/extract-pdf-text.js [ruta-pdf] [ruta-output.txt]');
  process.exit(1);
}

const pdfPath = path.resolve(process.cwd(), pdfArg);
const outputPath = outputArg 
  ? path.resolve(process.cwd(), outputArg)
  : pdfPath.replace(/\.pdf$/i, '.txt');

async function extractText() {
  try {
    if (!fs.existsSync(pdfPath)) {
      console.log(`❌ No s'ha trobat el fitxer PDF: ${pdfPath}`);
      process.exit(1);
    }

    console.log(`📄 Llegint PDF: ${pdfPath}`);
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    
    console.log(`✅ PDF llegit. Total de pàgines: ${data.numpages}`);
    console.log(`📝 Extreient text...`);
    
    const text = data.text;
    
    // Neteja el text (elimina espais excessius)
    const cleanedText = text
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\n{4,}/g, '\n\n\n')
      .trim();
    
    // Guarda el text
    fs.writeFileSync(outputPath, cleanedText, 'utf8');
    
    console.log(`✅ Text extret i guardat a: ${outputPath}`);
    console.log(`📊 Estadístiques:`);
    console.log(`   - Caràcters: ${cleanedText.length}`);
    console.log(`   - Línies: ${cleanedText.split('\n').length}`);
    console.log(`   - Paraules: ${cleanedText.split(/\s+/).length}`);
    console.log(`\n💡 Ara pots processar el text amb:`);
    console.log(`   node scripts/process-codi-civil-andorra.js ${outputPath}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.message.includes('pdf-parse')) {
      console.error('\n💡 Assegura\'t que tens instal·lat pdf-parse:');
      console.error('   npm install pdf-parse');
    }
    process.exit(1);
  }
}

extractText();

