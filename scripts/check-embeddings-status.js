const fs = require('fs');
const path = require('path');

// Fitxers que l'app RAG pot carregar (corpus unificat primer; fallback Constitució)
const files = [
  '../data/rag/constitucio-unified-embeddings.json',
  '../data/rag/constitucio-unified.json',
  '../data/rag/constitucio-embeddings.json',
  '../data/rag/constitucio.json',
  '../data/rag/doctrina/20-anys-embeddings.json',
  '../data/rag/doctrina/20-anys.json'
];

console.log('🔍 Verificant estat dels arxius d\'embeddings i knowledge...');
console.log('   (Revisió completa: node scripts/check-rag-indexacio-completa.js)\n');

files.forEach(f => {
  const fullPath = path.join(__dirname, f);
  const isEmbeddings = f.includes('-embeddings.json');
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    console.log(`\n📄 ${path.basename(f)}`);
    console.log(`   Mida: ${(stats.size / 1024).toFixed(2)} KB (${stats.size} bytes)`);
    
    if (stats.size > 100) {
      try {
        const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        const len = Array.isArray(content) ? content.length : 0;
        console.log(`   Entrades: ${len}`);
        if (isEmbeddings && len > 0 && content[0].embedding) {
          const dims = content[0].embedding.length;
          console.log(`   Dimensions: ${dims}`);
          if (dims === 768) console.log('   🤖 Model probable: XLM-RoBERTa / BERT base');
          else if (dims === 1536) console.log('   🤖 Model probable: OpenAI text-embedding-3-small');
          else if (dims === 3072) console.log('   🤖 Model probable: OpenAI text-embedding-3-large');
          else if (dims === 384) console.log('   🤖 Model probable: all-MiniLM-L6-v2');
          else console.log('   ❓ Model desconegut');
        } else if (isEmbeddings && len > 0) {
          console.log('   ⚠️ Format inesperat: no es troba camp embedding');
        }
      } catch (e) {
        console.log(`   ❌ Error llegint JSON: ${e.message}`);
      }
    } else {
      console.log('   ⚠️ Fitxer buit o massa petit');
    }
  } else {
    console.log(`\n❌ NO TROBAT: ${path.basename(f)}`);
  }
});
