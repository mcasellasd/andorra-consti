/**
 * Script per crear un fitxer JSON unificat amb totes les entrades de legislació
 * 
 * Ús:
 *   node scripts/load-legislacio-corpus.js
 * 
 * Això crearà un fitxer data/rag/legislacio-andorrana-unified.json
 * amb totes les entrades de coneixement de tots els documents
 */

const fs = require('fs');
const path = require('path');

const RAG_DIR = path.join(__dirname, '../data/rag/legislacio-andorrana');
const OUTPUT_PATH = path.join(__dirname, '../data/rag/legislacio-andorrana-unified.json');
const EMBEDDINGS_OUTPUT_PATH = path.join(__dirname, '../data/rag/legislacio-andorrana-unified-embeddings.json');

function main() {
  if (!fs.existsSync(RAG_DIR)) {
    console.error(`❌ No s'ha trobat el directori RAG: ${RAG_DIR}`);
    console.error('💡 Executa primer: node scripts/process-legislacio-pdfs.js');
    process.exit(1);
  }

  // Llegir tots els fitxers JSON (excloent embeddings)
  const files = fs.readdirSync(RAG_DIR)
    .filter(file => file.endsWith('.json') && !file.endsWith('-embeddings.json'));
  
  console.log(`📚 Carregant ${files.length} fitxers de legislació...\n`);
  
  const allEntries = [];
  const allEmbeddings = [];
  
  for (const file of files) {
    const knowledgePath = path.join(RAG_DIR, file);
    const embeddingsPath = path.join(RAG_DIR, file.replace('.json', '-embeddings.json'));
    
    try {
      // Carregar entrades de coneixement
      const knowledgeRaw = fs.readFileSync(knowledgePath, 'utf8');
      const knowledge = JSON.parse(knowledgeRaw);
      
      if (Array.isArray(knowledge)) {
        allEntries.push(...knowledge);
        console.log(`✅ ${file}: ${knowledge.length} entrades`);
      }
      
      // Carregar embeddings si existeixen
      if (fs.existsSync(embeddingsPath)) {
        const embeddingsRaw = fs.readFileSync(embeddingsPath, 'utf8');
        const embeddings = JSON.parse(embeddingsRaw);
        
        if (Array.isArray(embeddings)) {
          allEmbeddings.push(...embeddings);
        }
      }
      
    } catch (error) {
      console.error(`❌ Error processant ${file}:`, error.message);
    }
  }
  
  // Guardar fitxers unificats
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(allEntries, null, 2), 'utf8');
  console.log(`\n✅ Entrades unificades: ${allEntries.length}`);
  console.log(`📄 Guardades a: ${OUTPUT_PATH}`);
  
  if (allEmbeddings.length > 0) {
    fs.writeFileSync(EMBEDDINGS_OUTPUT_PATH, JSON.stringify(allEmbeddings, null, 2), 'utf8');
    console.log(`✅ Embeddings unificats: ${allEmbeddings.length}`);
    console.log(`📄 Guardats a: ${EMBEDDINGS_OUTPUT_PATH}`);
  } else {
    console.log(`\n⚠️  No s'han trobat embeddings. Executa:`);
    console.log(`   node scripts/generate-embeddings-legislacio.js`);
  }
}

main();
