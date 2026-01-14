/**
 * Script per generar embeddings de les recomanacions d'aprenentatge
 * Això permet que les millores identificades siguin disponibles al sistema RAG
 */

const fs = require('fs');
const path = require('path');

const APrenentatge_DIR = path.join(__dirname, '../aprenentatge');
const OUTPUT_DIR = path.join(__dirname, '../data/rag/aprenentatge');

// Crear directori si no existeix
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const EMBEDDING_PROVIDER = process.env.EMBEDDING_PROVIDER || (OPENAI_API_KEY ? 'openai' : 'xlm-roberta');
const MODEL = process.env.OPENAI_EMBEDDINGS_MODEL || 'text-embedding-3-large';

async function main() {
  if (EMBEDDING_PROVIDER === 'openai' && !OPENAI_API_KEY) {
    console.error('❌ Fes servir la variable d\'entorn OPENAI_API_KEY abans d\'executar el script.');
    console.error('   O configura EMBEDDING_PROVIDER=xlm-roberta per utilitzar el model local.');
    process.exit(1);
  }

  console.log('📚 Generant embeddings de recomanacions d\'aprenentatge...\n');
  console.log(`🧠 Proveïdor d'embeddings: ${EMBEDDING_PROVIDER}`);
  if (EMBEDDING_PROVIDER === 'openai') {
    console.log(`🧠 Model d'embeddings: ${MODEL}`);
  } else {
    console.log(`🧠 Model: XLM-RoBERTa-base (local)`);
  }
  console.log();

  // Buscar informes d'aprenentatge
  if (!fs.existsSync(APrenentatge_DIR)) {
    console.log('⚠️  No s\'ha trobat el directori d\'aprenentatge. Executa primer el sistema d\'aprenentatge.');
    process.exit(0);
  }

  const files = fs.readdirSync(APrenentatge_DIR)
    .filter(file => file.startsWith('informe-avaluacio-') && file.endsWith('.json'));

  if (files.length === 0) {
    console.log('⚠️  No s\'han trobat informes d\'avaluació. Executa primer el sistema d\'aprenentatge.');
    process.exit(0);
  }

  // Agafar l'informe més recent
  const latestFile = files.sort().reverse()[0];
  const informePath = path.join(APrenentatge_DIR, latestFile);

  console.log(`📄 Processant: ${latestFile}...`);

  const informe = JSON.parse(fs.readFileSync(informePath, 'utf8'));

  // Generar entrades de coneixement a partir de les recomanacions
  const entries = [];

  if (informe.analisi && informe.analisi.recomanacions) {
    informe.analisi.recomanacions.forEach((rec, index) => {
      const entryId = `APRENENTATGE_${String(index + 1).padStart(3, '0')}`;
      
      const content = `
Tipus: ${rec.tipus}
Àrea: ${rec.area}
Prioritat: ${rec.prioritat}

Problema identificat: ${rec.problema}

Recomanació: ${rec.recomanacio}

Evidència:
${rec.evidencia.map(e => `- ${e}`).join('\n')}
      `.trim();

      entries.push({
        id: entryId,
        category: 'aprenentatge',
        topic: `Recomanació de millora: ${rec.problema}`,
        content: content,
        keyConcepts: [
          rec.tipus,
          rec.area,
          rec.prioritat,
          ...rec.problema.toLowerCase().split(/\s+/).filter(w => w.length > 4)
        ],
        legalReference: 'Sistema d\'aprenentatge',
        source: 'Avaluació de preguntes de control',
        sourceType: 'aprenentatge',
        year: new Date().getFullYear().toString()
      });
    });
  }

  if (informe.millores) {
    if (informe.millores.promptChatMillorat) {
      entries.push({
        id: 'APRENENTATGE_PROMPT_CHAT',
        category: 'aprenentatge',
        topic: 'Millores de prompt per al xat',
        content: informe.millores.promptChatMillorat,
        keyConcepts: ['prompt', 'chat', 'millora', 'aprenentatge'],
        legalReference: 'Sistema d\'aprenentatge',
        source: 'Avaluació de preguntes de control',
        sourceType: 'aprenentatge',
        year: new Date().getFullYear().toString()
      });
    }

    if (informe.millores.promptInterpretacioMillorat) {
      entries.push({
        id: 'APRENENTATGE_PROMPT_INTERPRETACIO',
        category: 'aprenentatge',
        topic: 'Millores de prompt per a la interpretació',
        content: informe.millores.promptInterpretacioMillorat,
        keyConcepts: ['prompt', 'interpretació', 'millora', 'aprenentatge'],
        legalReference: 'Sistema d\'aprenentatge',
        source: 'Avaluació de preguntes de control',
        sourceType: 'aprenentatge',
        year: new Date().getFullYear().toString()
      });
    }
  }

  if (entries.length === 0) {
    console.log('⚠️  No s\'han trobat recomanacions per processar.');
    process.exit(0);
  }

  console.log(`   Generant embeddings per ${entries.length} entrades...\n`);

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
        text: text.substring(0, 200)
      });
      
      console.log('✅');
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
  }

  // Guardar entrades i embeddings
  const knowledgePath = path.join(OUTPUT_DIR, 'aprenentatge.json');
  const embeddingsPath = path.join(OUTPUT_DIR, 'aprenentatge-embeddings.json');

  fs.writeFileSync(knowledgePath, JSON.stringify(entries, null, 2), 'utf8');
  fs.writeFileSync(embeddingsPath, JSON.stringify(results, null, 2), 'utf8');

  console.log(`\n✅ ${entries.length} entrades guardades a: ${knowledgePath}`);
  console.log(`✅ ${results.length} embeddings guardats a: ${embeddingsPath}`);
  console.log(`\n💡 Per unificar amb el corpus, executa:`);
  console.log(`   node scripts/unificar-corpus-doctrina.js`);
}

function buildEmbeddingText(entry) {
  const lines = [
    `ID: ${entry.id}`,
    `Categoria: ${entry.category}`,
    `Tema: ${entry.topic}`,
    entry.content ? `Contingut: ${entry.content}` : null,
    entry.legalReference ? `Referència: ${entry.legalReference}` : null,
    entry.source ? `Font: ${entry.source}` : null,
    entry.keyConcepts && entry.keyConcepts.length
      ? `Conceptes clau: ${entry.keyConcepts.join(', ')}`
      : null
  ];

  return lines.filter(Boolean).join('\n');
}

async function createEmbedding(input) {
  if (EMBEDDING_PROVIDER === 'xlm-roberta') {
    const { generateEmbedding } = require('../lib/embeddings/xlm-roberta');
    return await generateEmbedding(input);
  } else {
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
      throw new Error(`Error generant embedding (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    if (!data.data?.[0]?.embedding) {
      throw new Error('Resposta de l\'API sense embedding vàlid');
    }

    return data.data[0].embedding;
  }
}

main().catch((error) => {
  console.error('❌ Error inesperat:', error);
  process.exit(1);
});
