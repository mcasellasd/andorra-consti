/**
 * Script per extreure el text del PDF de la Constitució d'Andorra
 * 
 * Requisits:
 * - pdf-parse instal·lat: npm install pdf-parse
 * 
 * Ús:
 *   node scripts/extract-constitucio-text.js
 */

const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const PDF_PATH = path.join(__dirname, '../docs/Constitucio dAndorra  Catala.pdf');
const OUTPUT_PATH = path.join(__dirname, '../docs/constitucio-andorra.txt');

async function extractText() {
  try {
    console.log('📄 Llegint PDF de la Constitució...');
    const dataBuffer = fs.readFileSync(PDF_PATH);
    const data = await pdf(dataBuffer);
    
    console.log(`✅ Text extret: ${data.text.length} caràcters`);
    console.log(`📊 Pàgines: ${data.numpages}`);
    
    // Netejar el text
    let text = data.text;
    
    // Guardar el text brut
    fs.writeFileSync(OUTPUT_PATH, text, 'utf8');
    console.log(`✅ Text guardat a ${OUTPUT_PATH}`);
    
    // Mostrar una mostra
    console.log('\n📝 Mostra del text extret:');
    console.log(text.substring(0, 500));
    
  } catch (error) {
    console.error('❌ Error extreient text:', error.message);
    if (error.message.includes('Cannot find module')) {
      console.error('\n💡 Instal·la pdf-parse: npm install pdf-parse');
    }
    process.exit(1);
  }
}

extractText();

