const fs = require('fs');
const path = require('path');

const files = [
  '../data/rag/constitucio-unified-embeddings.json',
  '../data/rag/doctrina/20-anys-embeddings.json'
];

console.log('🔍 Verificant estat dels arxius d\'embeddings...');

files.forEach(f => {
  const fullPath = path.join(__dirname, f);
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    console.log(`\n📄 Fitxer: ${path.basename(f)}`);
    console.log(`   Mida: ${(stats.size / 1024).toFixed(2)} KB (${stats.size} bytes)`);
    
    if (stats.size > 100) {
      try {
        const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        console.log(`   Entrades: ${content.length}`);
        if (content.length > 0 && content[0].embedding) {
          const dims = content[0].embedding.length;
          console.log(`   Dimensions (Vector): ${dims}`);
          
          if (dims === 768) console.log('   🤖 Model probable: XLM-RoBERTa / BERT base');
          else if (dims === 1536) console.log('   🤖 Model probable: OpenAI text-embedding-3-small');
          else if (dims === 3072) console.log('   🤖 Model probable: OpenAI text-embedding-3-large');
          else if (dims === 384) console.log('   🤖 Model probable: all-MiniLM-L6-v2');
          else console.log('   ❓ Model desconegut');
        } else {
          console.log('   ⚠️ Format inesperat: No es troba camp embedding');
        }
      } catch (e) {
        console.log(`   ❌ Error llegint JSON: ${e.message}`);
      }
    } else {
      console.log('   ⚠️ EL FITXER ESTÀ BUIT O ÉS MASSA PETIT.');
    }
  } else {
    console.log(`❌ NO TROBAT: ${f}`);
  }
});
