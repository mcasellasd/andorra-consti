/**
 * Script per generar embeddings per als documents de doctrina
 * 
 * Ús:
 *   node scripts/generate-embeddings-doctrina.js [doc-id]
 * 
 * Requisits:
 *   - Variable d'entorn OPENAI_API_KEY establerta
 *   - Fitxers JSON de RAG a data/rag/doctrina/
 */

const fs = require('fs');
const path = require('path');

// Carregar variables d'entorn: primer .env.local, després .env
const envLocal = path.join(__dirname, '../.env.local');
const env = path.join(__dirname, '../.env');
if (fs.existsSync(envLocal)) require('dotenv').config({ path: envLocal });
if (fs.existsSync(env)) require('dotenv').config({ path: env });

const RAG_DIR = path.join(__dirname, '../data/rag/doctrina');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_EMBEDDINGS_MODEL || 'text-embedding-3-large';

async function main() {
  if (!OPENAI_API_KEY) {
    console.error('❌ No s\'ha trobat OPENAI_API_KEY.');
    console.error('   Configura la clau: export OPENAI_API_KEY="..." o afegeix OPENAI_API_KEY=... a .env o .env.local');
    process.exit(1);
  }

  if (!fs.existsSync(RAG_DIR)) {
    console.error(`❌ No s'ha trobat el directori RAG: ${RAG_DIR}`);
    console.error('💡 Executa primer: node scripts/processar-doctrina-txt.js');
    process.exit(1);
  }

  const [,, docId] = process.argv;
  
  // Llegir tots els fitxers JSON del directori
  const files = fs.readdirSync(RAG_DIR)
    .filter(file => file.endsWith('.json') && !file.endsWith('-embeddings.json'));
  
  const filesToProcess = docId
    ? files.filter(f => f === `${docId}.json`)
    : files;
  
  if (filesToProcess.length === 0) {
    console.log('❌ No s\'han trobat fitxers per processar');
    process.exit(1);
  }

  console.log(`📚 Processant ${filesToProcess.length} fitxers...`);
  console.log(`🧠 Model d'embeddings: ${MODEL}`);
  console.log();

  for (const file of filesToProcess) {
    const knowledgePath = path.join(RAG_DIR, file);
    const outputPath = path.join(RAG_DIR, file.replace('.json', '-embeddings.json'));
    
    // Saltar si ja existeix
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Ja existeix: ${file.replace('.json', '-embeddings.json')}`);
      continue;
    }
    
    try {
      console.log(`📄 Processant: ${file}...`);
      const raw = fs.readFileSync(knowledgePath, 'utf8');
      const entries = JSON.parse(raw);
      
      console.log(`   Entrades: ${entries.length}`);
      
      const results = [];
      
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const text = buildEmbeddingText(entry);
        
        process.stdout.write(`   [${i + 1}/${entries.length}] ${entry.id}... `);
        
        try {
          const embedding = await createEmbedding(text);
          results.push({
            id: entry.id,
            topic: entry.topic,
            category: entry.category,
            embedding,
            text: text.substring(0, 200) // Guardar només un resum per estalviar espai
          });
          
          console.log('✅');
          
          // Petita pausa per no sobrecarregar l'API
          await new Promise(resolve => setTimeout(resolve, 100));
          
        } catch (error) {
          console.log(`❌ Error: ${error.message}`);
          // Continuar amb la següent entrada
        }
      }
      
      fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');
      console.log(`   ✅ Embeddings guardats: ${results.length}/${entries.length}\n`);
      
    } catch (error) {
      console.error(`   ❌ Error processant ${file}:`, error.message);
    }
  }
  
  console.log('✅ Processament completat!');
  console.log(`\n💡 Per unificar amb el corpus de la Constitució, executa:`);
  console.log(`   node scripts/unificar-corpus-doctrina.js`);
}

function buildEmbeddingText(entry) {
  const lines = [
    `ID: ${entry.id}`,
    `Categoria: ${entry.category}`,
    `Tema: ${entry.topic}`,
    entry.content ? `Contingut: ${entry.content}` : null,
    entry.legalReference ? `Referència legal: ${entry.legalReference}` : null,
    entry.author ? `Autor: ${entry.author}` : null,
    entry.source ? `Font: ${entry.source}` : null,
    entry.sourceType ? `Tipus: ${entry.sourceType}` : null,
    entry.year ? `Any: ${entry.year}` : null,
    entry.keyConcepts && entry.keyConcepts.length
      ? `Conceptes clau: ${entry.keyConcepts.join(', ')}`
      : null
  ];

  return lines.filter(Boolean).join('\n');
}

async function createEmbedding(input) {
  // Utilitzar OpenAI (requerit per scripts Node.js)
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      input
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error generant embedding (${response.status}): ${errorText}`
    );
  }

  const data = await response.json();
  if (!data.data?.[0]?.embedding) {
    throw new Error('Resposta de l\'API sense embedding vàlid');
  }

  return data.data[0].embedding;
}

main().catch((error) => {
  console.error('❌ Error inesperat:', error);
  process.exit(1);
});
