/**
 * Script per processar els PDFs de legislació andorrana i generar entrades RAG
 * 
 * Ús:
 * node scripts/process-legislacio-pdfs.js [norma-id]
 * 
 * Si no es proporciona norma-id, processa totes les normes
 */

const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

// Importar les dades de legislació
const legislacioPath = path.join(__dirname, '../data/legislacio-andorrana.ts');
const legislacioCode = fs.readFileSync(legislacioPath, 'utf8');

// Extreure les normes del codi TypeScript
const normes = [];
const regex = /id:\s*['"]([^'"]+)['"],\s*nom:\s*['"]([^'"]+)['"],\s*url:\s*['"]([^'"]+)['"],\s*tipus:\s*['"]([^'"]+)['"](?:,\s*any:\s*(\d+))?/g;
let match;
while ((match = regex.exec(legislacioCode)) !== null) {
  normes.push({
    id: match[1],
    nom: match[2],
    url: match[3],
    tipus: match[4],
    any: match[5] ? parseInt(match[5]) : undefined
  });
}

const PDFS_DIR = path.join(__dirname, '../docs/legislacio-andorrana');
const RAG_DIR = path.join(__dirname, '../data/rag/legislacio-andorrana');

// Crear directori RAG si no existeix
if (!fs.existsSync(RAG_DIR)) {
  fs.mkdirSync(RAG_DIR, { recursive: true });
}

function extractTextFromPDF(pdfPath) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(pdfPath)) {
      reject(new Error(`PDF no trobat: ${pdfPath}`));
      return;
    }

    const dataBuffer = fs.readFileSync(pdfPath);
    pdf(dataBuffer)
      .then(data => {
        const text = data.text
          .replace(/\r\n/g, '\n')
          .replace(/\r/g, '\n')
          .replace(/\n{4,}/g, '\n\n\n')
          .trim();
        resolve(text);
      })
      .catch(reject);
  });
}

function splitIntoChunks(text, maxChunkSize = 2000) {
  const chunks = [];
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  
  let currentChunk = '';
  
  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim();
    
    // Si afegir aquest paràgraf faria el chunk massa gran, guardar el chunk actual
    if (currentChunk.length + trimmed.length > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = trimmed;
    } else {
      currentChunk += (currentChunk ? '\n\n' : '') + trimmed;
    }
  }
  
  // Afegir l'últim chunk
  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
}

function extractKeyConcepts(text) {
  // Paraules comuns a ignorar
  const stopWords = new Set([
    'el', 'la', 'els', 'les', 'de', 'del', 'dels', 'de la', 'de les',
    'i', 'o', 'un', 'una', 'uns', 'unes', 'en', 'per', 'amb', 'sense',
    'a', 'al', 'als', 'a la', 'a les', 'que', 'com', 'quan', 'on',
    'és', 'són', 'ser', 'estar', 'ha', 'han', 'haver', 'tenir', 'té',
    'aquest', 'aquesta', 'aquests', 'aquestes', 'això', 'allò',
    'article', 'articles', 'llei', 'lleis', 'reglament', 'reglaments',
    'decret', 'decrets', 'secció', 'seccions', 'capítol', 'capítols',
    'títol', 'títols', 'disposició', 'disposicions'
  ]);
  
  // Extreure paraules significatives
  const words = text
    .toLowerCase()
    .replace(/[^\wà-ÿ\s-]/gi, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word));
  
  // Comptar freqüències
  const frequencies = {};
  words.forEach(word => {
    frequencies[word] = (frequencies[word] || 0) + 1;
  });
  
  // Ordenar per freqüència i retornar els més comuns
  return Object.entries(frequencies)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([word]) => word);
}

function generateKnowledgeEntries(norma, text) {
  const chunks = splitIntoChunks(text);
  const entries = [];
  
  chunks.forEach((chunk, index) => {
    const keyConcepts = extractKeyConcepts(chunk);
    
    // Intentar extreure un títol del chunk
    const firstLine = chunk.split('\n')[0].trim();
    const topic = firstLine.length > 100 
      ? `${norma.nom} - Secció ${index + 1}`
      : firstLine;
    
    const entry = {
      id: `${norma.id}_${index + 1}`,
      category: norma.tipus === 'llei' ? 'Llei' : norma.tipus === 'reglament' ? 'Reglament' : 'Norma',
      topic: topic.length > 150 ? topic.substring(0, 150) : topic,
      content: chunk,
      legalReference: norma.nom,
      keyConcepts: keyConcepts.length > 0 ? keyConcepts : [norma.tipus, 'legislació andorrana'],
      source: norma.nom,
      sourceUrl: norma.url,
      sourceType: norma.tipus,
      year: norma.any
    };
    
    entries.push(entry);
  });
  
  return entries;
}

async function processNorma(norma) {
  const pdfPath = path.join(PDFS_DIR, `${norma.id}.pdf`);
  const outputPath = path.join(RAG_DIR, `${norma.id}.json`);
  
  if (!fs.existsSync(pdfPath)) {
    console.log(`⏭️  Saltant ${norma.nom}: PDF no trobat`);
    return;
  }
  
  try {
    console.log(`📄 Processant: ${norma.nom}...`);
    const text = await extractTextFromPDF(pdfPath);
    
    if (text.length < 100) {
      console.log(`⚠️  ${norma.nom}: Text massa curt (${text.length} caràcters)`);
      return;
    }
    
    const entries = generateKnowledgeEntries(norma, text);
    
    fs.writeFileSync(
      outputPath,
      JSON.stringify(entries, null, 2),
      'utf8'
    );
    
    console.log(`✅ ${norma.nom}: ${entries.length} entrades generades`);
    
  } catch (error) {
    console.error(`❌ Error processant ${norma.nom}:`, error.message);
  }
}

async function main() {
  const [,, normaId] = process.argv;
  
  const normesToProcess = normaId
    ? normes.filter(n => n.id === normaId)
    : normes;
  
  if (normesToProcess.length === 0) {
    console.log('❌ No s\'han trobat normes per processar');
    process.exit(1);
  }
  
  console.log(`📚 Processant ${normesToProcess.length} normes...\n`);
  
  for (const norma of normesToProcess) {
    await processNorma(norma);
  }
  
  console.log(`\n✅ Processament completat!`);
  console.log(`📁 Entrades RAG guardades a: ${RAG_DIR}`);
}

main().catch(console.error);
