/**
 * Script per unificar el corpus de doctrina amb el corpus de la Constitució
 * Això permet que les entrades de doctrina siguin disponibles al sistema RAG
 */

const fs = require('fs');
const path = require('path');

const DOCTRINA_DIR = path.join(__dirname, '../data/rag/doctrina');
const APRENENTATGE_DIR = path.join(__dirname, '../data/rag/aprenentatge');
const CONSTITUCIO_KNOWLEDGE = path.join(__dirname, '../data/rag/constitucio.json');
const CONSTITUCIO_EMBEDDINGS = path.join(__dirname, '../data/rag/constitucio-embeddings.json');
const OUTPUT_KNOWLEDGE = path.join(__dirname, '../data/rag/constitucio-unified.json');
const OUTPUT_EMBEDDINGS = path.join(__dirname, '../data/rag/constitucio-unified-embeddings.json');

function main() {
  console.log('🔄 Unificant corpus de doctrina amb Constitució...\n');
  
  // Carregar corpus de la Constitució
  if (!fs.existsSync(CONSTITUCIO_KNOWLEDGE)) {
    console.error(`❌ No s'ha trobat: ${CONSTITUCIO_KNOWLEDGE}`);
    process.exit(1);
  }
  
  const constitucioKnowledge = JSON.parse(fs.readFileSync(CONSTITUCIO_KNOWLEDGE, 'utf8'));
  const constitucioEmbeddings = fs.existsSync(CONSTITUCIO_EMBEDDINGS)
    ? JSON.parse(fs.readFileSync(CONSTITUCIO_EMBEDDINGS, 'utf8'))
    : [];
  
  console.log(`📚 Constitució: ${constitucioKnowledge.length} entrades, ${constitucioEmbeddings.length} embeddings`);
  
  // Carregar totes les entrades de doctrina
  const doctrinaKnowledge = [];
  const doctrinaEmbeddings = [];
  
  if (fs.existsSync(DOCTRINA_DIR)) {
    const files = fs.readdirSync(DOCTRINA_DIR)
      .filter(file => file.endsWith('.json') && !file.endsWith('-embeddings.json'));
    
    for (const file of files) {
      const knowledgePath = path.join(DOCTRINA_DIR, file);
      const embeddingsPath = path.join(DOCTRINA_DIR, file.replace('.json', '-embeddings.json'));
      
      try {
        // Carregar entrades de coneixement
        const knowledge = JSON.parse(fs.readFileSync(knowledgePath, 'utf8'));
        if (Array.isArray(knowledge)) {
          doctrinaKnowledge.push(...knowledge);
          console.log(`   ✅ ${file}: ${knowledge.length} entrades`);
        }
        
        // Carregar embeddings si existeixen
        if (fs.existsSync(embeddingsPath)) {
          const embeddings = JSON.parse(fs.readFileSync(embeddingsPath, 'utf8'));
          if (Array.isArray(embeddings)) {
            doctrinaEmbeddings.push(...embeddings);
            console.log(`   ✅ ${file.replace('.json', '-embeddings.json')}: ${embeddings.length} embeddings`);
          }
        }
      } catch (error) {
        console.error(`   ❌ Error processant ${file}:`, error.message);
      }
    }
  }
  
  console.log(`\n📚 Doctrina: ${doctrinaKnowledge.length} entrades, ${doctrinaEmbeddings.length} embeddings`);
  
  // Carregar entrades d'aprenentatge
  const aprenentatgeKnowledge = [];
  const aprenentatgeEmbeddings = [];
  
  if (fs.existsSync(APRENENTATGE_DIR)) {
    const aprenentatgeKnowledgePath = path.join(APRENENTATGE_DIR, 'aprenentatge.json');
    const aprenentatgeEmbeddingsPath = path.join(APRENENTATGE_DIR, 'aprenentatge-embeddings.json');
    
    if (fs.existsSync(aprenentatgeKnowledgePath)) {
      try {
        const knowledge = JSON.parse(fs.readFileSync(aprenentatgeKnowledgePath, 'utf8'));
        if (Array.isArray(knowledge)) {
          aprenentatgeKnowledge.push(...knowledge);
          console.log(`📚 Aprenentatge: ${knowledge.length} entrades`);
        }
      } catch (error) {
        console.error(`   ❌ Error carregant aprenentatge:`, error.message);
      }
    }
    
    if (fs.existsSync(aprenentatgeEmbeddingsPath)) {
      try {
        const embeddings = JSON.parse(fs.readFileSync(aprenentatgeEmbeddingsPath, 'utf8'));
        if (Array.isArray(embeddings)) {
          aprenentatgeEmbeddings.push(...embeddings);
          console.log(`   ✅ Aprenentatge: ${embeddings.length} embeddings`);
        }
      } catch (error) {
        console.error(`   ❌ Error carregant embeddings d'aprenentatge:`, error.message);
      }
    }
  }
  
  // Unificar tot
  const unifiedKnowledge = [...constitucioKnowledge, ...doctrinaKnowledge, ...aprenentatgeKnowledge];
  const unifiedEmbeddings = [...constitucioEmbeddings, ...doctrinaEmbeddings, ...aprenentatgeEmbeddings];
  
  // Guardar fitxers unificats
  fs.writeFileSync(OUTPUT_KNOWLEDGE, JSON.stringify(unifiedKnowledge, null, 2), 'utf8');
  console.log(`\n✅ Entrades unificades: ${unifiedKnowledge.length}`);
  console.log(`📄 Guardades a: ${OUTPUT_KNOWLEDGE}`);
  
  if (unifiedEmbeddings.length > 0) {
    fs.writeFileSync(OUTPUT_EMBEDDINGS, JSON.stringify(unifiedEmbeddings, null, 2), 'utf8');
    console.log(`✅ Embeddings unificats: ${unifiedEmbeddings.length}`);
    console.log(`📄 Guardats a: ${OUTPUT_EMBEDDINGS}`);
  }
  
  console.log('\n✅ Unificació completada!');
  console.log('\n💡 Per utilitzar el corpus unificat, actualitza lib/rag/corpus.ts per carregar els fitxers unificats.');
}

if (typeof require !== 'undefined' && require.main === module) {
  main().catch(error => {
    console.error('❌ Error inesperat:', error);
    process.exit(1);
  });
}
