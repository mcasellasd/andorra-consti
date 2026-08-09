/**
 * Script per processar documents de doctrina en format .txt
 * i generar entrades de coneixement RAG
 * 
 * Ús:
 *   node scripts/processar-doctrina-txt.js [nom-document]
 * 
 * Exemple:
 *   node scripts/processar-doctrina-txt.js "20 anys"
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '../docs');
const OUTPUT_DIR = path.join(__dirname, '../data/rag/doctrina');

// Crear directori si no existeix
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Documents de doctrina disponibles
const DOCUMENTS = {
  'consuetud-estat-dret': {
    file: 'LA LLARGA RESISTÈNCIA DEL PRINCIPAT D’AN.txt',
    title: 'De la consuetud a l’Estat de dret. La llarga resistència del Principat d’Andorra a la modernització política',
    author: 'Pere Soler Paricio',
    publication: 'Université de Bretagne Sud, HCTI - EA 4249',
    date: 's.d.',
    category: 'doctrina',
    codi: 'constitucio'
  },
  '20-anys': {
    file: '20 anys.txt',
    title: 'Aspectes de la jurisprudència andorrana. Balanç de 20 anys de Constitució',
    author: 'Pere Pastor Vilanova (coordinador)',
    publication: 'Universitat d\'Andorra',
    date: '2014-06',
    category: 'jurisprudència',
    codi: 'constitucio'
  },
  'constitucio-territorial': {
    file: 'La constitución andorrana y la ordenación territorial del poder público.txt ',
    title: 'La constitución andorrana y la ordenación territorial del poder público',
    author: 'Desconegut',
    publication: 'Doctrina',
    date: '2020',
    category: 'doctrina',
    codi: 'constitucio'
  },
  // Nous documents
  'constitucionalisme-codificacio': {
    file: 'nous/00000042.txt',
    title: 'Constitucionalisme i codificació',
    author: 'Desconegut',
    publication: 'Doctrina',
    date: '2024',
    category: 'doctrina',
    codi: 'constitucio'
  },
  'usos-costums': {
    file: 'nous/00000043.txt',
    title: 'Sobre usos, costums i el codi',
    author: 'Desconegut',
    publication: 'Doctrina',
    date: '2024',
    category: 'doctrina',
    codi: 'constitucio'
  },
  'ponencia-45': {
    file: 'nous/00000045.txt',
    title: 'Ponència sobre codificació i veritat',
    author: 'Antoni Pol / Desconegut',
    publication: 'Doctrina',
    date: '2024',
    category: 'doctrina',
    codi: 'constitucio'
  },
  'manual-digest-tedh': {
    file: 'nous/00000050.txt',
    title: 'El Manual Digest i el Tribunal Europeu dels Drets Humans',
    author: 'Desconegut',
    publication: 'Doctrina',
    date: '2024',
    category: 'doctrina',
    codi: 'constitucio'
  },
  'comunicacio-lopez': {
    file: 'nous/COMUNICACIÓLopez-B.-VD.txt',
    title: 'Comunicació Lopez B.',
    author: 'Lopez B.',
    publication: 'Doctrina',
    date: '2024',
    category: 'doctrina',
    codi: 'constitucio'
  },
  'relacions-internacionals': {
    file: 'nous/Les relacions internacionals d’Andorra des de la Constituci.txt',
    title: 'Les relacions internacionals d’Andorra des de la Constitució',
    author: 'Desconegut',
    publication: 'Doctrina',
    date: '2024',
    category: 'doctrina',
    codi: 'constitucio'
  },
  'dret-processal-civil': {
    file: 'nous/LlibreCompletDretProcessalCivil.txt',
    title: 'Llibre Complet Dret Processal Civil',
    author: 'Desconegut',
    publication: 'Doctrina',
    date: '2024',
    category: 'doctrina',
    codi: 'civil'
  },
  'memoria-2023': {
    file: 'nous/MEMÒRIA 2023 DEFINITIVA.txt',
    title: 'Memòria 2023 del Tribunal Constitucional',
    author: 'Tribunal Constitucional',
    publication: 'Memòria',
    date: '2023',
    category: 'jurisprudència',
    codi: 'constitucio'
  },
  'memoria-2024': {
    file: 'nous/MEMÒRIA 2024-3.txt',
    title: 'Memòria 2024',
    author: 'Tribunal Constitucional',
    publication: 'Memòria',
    date: '2024',
    category: 'jurisprudència',
    codi: 'constitucio'
  },
  'aplicacio-directa-normes': {
    file: 'nous/aplicació directa de les normes constitucionals.txt',
    title: 'L\'aplicació directa de les normes constitucionals',
    author: 'Desconegut',
    publication: 'Doctrina',
    date: '2024',
    category: 'doctrina',
    codi: 'constitucio'
  },
  'burniol': {
    file: 'nous/burniol.txt',
    title: 'Article Burniol sobre sobirania',
    author: 'Burniol',
    publication: 'Doctrina',
    date: '2024',
    category: 'doctrina',
    codi: 'constitucio'
  },
  'joan-marti-alanis': {
    file: 'nous/joan-marti-alanis.txt',
    title: 'Joan Martí Alanis, bisbe',
    author: 'Desconegut',
    publication: 'Doctrina',
    date: '2024',
    category: 'doctrina',
    codi: 'constitucio'
  },
  'sollicitud-bisbes-urgell': {
    file: 'nous/sollicitud-bisbes-urgell.txt',
    title: 'La sol·licitud dels bisbes d\'Urgell',
    author: 'Desconegut',
    publication: 'Doctrina',
    date: '2024',
    category: 'doctrina',
    codi: 'constitucio'
  },
  'rec5-2019': {
    file: 'nous/rec5-2019.txt',
    title: 'REC5 2019',
    author: 'Desconegut',
    publication: 'Doctrina',
    date: '2019',
    category: 'doctrina',
    codi: 'constitucio'
  },
  '23-jane-ca': {
    file: 'nous/23-Jane-ca.txt',
    title: 'Document 23 de gener (català)',
    author: 'Desconegut',
    publication: 'Doctrina',
    date: '2024',
    category: 'doctrina',
    codi: 'constitucio'
  },
  'llarga-resistencia': {
    file: 'LA LLARGA RESISTÈNCIA DEL PRINCIPAT D’AN.txt',
    title: 'De la consuetud a l’Estat de dret. La llarga resistència del Principat d’Andorra a la modernització política',
    author: 'Pere Soler Parício',
    publication: 'Doctrina',
    date: '2010',
    category: 'doctrina',
    codi: 'constitucio'
  },
  'joan-marti-alanis-b': {
    file: 'Joan Martí Alanis, bisbe d\'Urgell, prínc.txt',
    title: 'Joan Martí Alanis, bisbe d\'Urgell, príncep d\'Andorra',
    author: 'Joan Bassegoda Nonell',
    publication: 'Doctrina',
    date: '2009',
    category: 'doctrina',
    codi: 'constitucio'
  },
  'emergencia-reconeixement': {
    file: 'Emergencia i reconeixement d\'Andorra.txt',
    title: 'Emergencia i reconeixement d\'Andorra com a Estat',
    author: 'Joan BECAT',
    publication: 'Doctrina',
    date: '1993',
    category: 'doctrina',
    codi: 'constitucio'
  }
};

function splitIntoChunks(text, maxChunkSize = 2000) {
  const chunks = [];
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  
  let currentChunk = '';
  let chunkId = 1;
  
  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim();
    
    // Si el paràgraf és massa llarg, dividir-lo
    if (trimmed.length > maxChunkSize) {
      // Guardar el chunk actual si té contingut
      if (currentChunk.trim().length > 0) {
        chunks.push(currentChunk.trim());
        currentChunk = '';
        chunkId++;
      }
      
      // Dividir el paràgraf llarg en frases
      const sentences = trimmed.match(/[^.!?]+[.!?]+/g) || [trimmed];
      let sentenceChunk = '';
      
      for (const sentence of sentences) {
        if ((sentenceChunk + sentence).length > maxChunkSize) {
          if (sentenceChunk.trim().length > 0) {
            chunks.push(sentenceChunk.trim());
            sentenceChunk = '';
            chunkId++;
          }
        }
        sentenceChunk += sentence + ' ';
      }
      
      if (sentenceChunk.trim().length > 0) {
        currentChunk = sentenceChunk;
      }
    } else {
      // Afegir el paràgraf al chunk actual
      if ((currentChunk + '\n\n' + trimmed).length > maxChunkSize) {
        // Guardar el chunk actual
        if (currentChunk.trim().length > 0) {
          chunks.push(currentChunk.trim());
          currentChunk = '';
          chunkId++;
        }
      }
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
  // Extreure conceptes clau basats en paraules freqüents i termes jurídics
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 4);
  
  const wordCount = {};
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  
  // Ordenar per freqüència i agafar els primers
  const sorted = Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);
  
  return sorted;
}

function isAlreadyProcessed(docId) {
  const outputPath = path.join(OUTPUT_DIR, `${docId}.json`);
  return fs.existsSync(outputPath);
}

function processDocument(docId, docInfo) {
  const inputPath = path.join(DOCS_DIR, docInfo.file);
  
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ No s'ha trobat el fitxer: ${inputPath}`);
    return null;
  }
  
  if (isAlreadyProcessed(docId)) {
    console.log(`⏭️  Ominent ${docId} (ja processat: existeix ${docId}.json)`);
    return null;
  }
  
  console.log(`📄 Processant: ${docInfo.file}...`);
  
  const text = fs.readFileSync(inputPath, 'utf8');
  
  // Netejar el text (eliminar headers, footers, etc.)
  let cleanedText = text
    .replace(/^[\s\S]*?Taula de contingut[\s\S]*?\n/im, '') // Eliminar taula de continguts
    .replace(/^[\s\S]*?Pròlegs[\s\S]*?\n/im, '') // Eliminar pròlegs
    .replace(/\n{3,}/g, '\n\n') // Normalitzar salts de línia
    .trim();
  
  // Dividir en chunks
  const chunks = splitIntoChunks(cleanedText);
  console.log(`   Dividit en ${chunks.length} chunks`);
  
  // Generar entrades de coneixement
  const entries = chunks.map((chunk, index) => {
    const entryId = `DOCTRINA_${docId.toUpperCase().replace(/-/g, '_')}_${String(index + 1).padStart(3, '0')}`;
    const keyConcepts = extractKeyConcepts(chunk);
    
    return {
      id: entryId,
      category: docInfo.category,
      topic: `${docInfo.title} - Fragment ${index + 1}`,
      content: chunk,
      keyConcepts: keyConcepts,
      legalReference: docInfo.title,
      source: docInfo.publication,
      sourceType: 'doctrina',
      year: docInfo.date.split('-')[0],
      author: docInfo.author,
      codi: docInfo.codi
    };
  });
  
  // Guardar entrades
  const outputPath = path.join(OUTPUT_DIR, `${docId}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(entries, null, 2), 'utf8');
  
  console.log(`✅ ${entries.length} entrades guardades a: ${outputPath}`);
  
  return { entries, outputPath };
}

async function main() {
  const [,, docId] = process.argv;
  
  if (docId) {
    // Processar un document específic
    const docInfo = DOCUMENTS[docId];
    if (!docInfo) {
      console.error(`❌ Document "${docId}" no trobat. Documents disponibles:`);
      Object.keys(DOCUMENTS).forEach(id => {
        console.error(`   - ${id}: ${DOCUMENTS[id].title}`);
      });
      process.exit(1);
    }
    if (isAlreadyProcessed(docId)) {
      console.log(`⏭️  "${docId}" ja està processat. No es repeteix.`);
      process.exit(0);
    }
    processDocument(docId, docInfo);
  } else {
    // Processar tots els documents
    console.log(`📚 Processant ${Object.keys(DOCUMENTS).length} documents de doctrina...\n`);
    
    for (const [id, info] of Object.entries(DOCUMENTS)) {
      try {
        const result = processDocument(id, info);
        if (result !== null) console.log();
      } catch (error) {
        console.error(`❌ Error processant ${id}:`, error.message);
      }
    }
    
    console.log('✅ Processament completat!');
    console.log(`\n💡 Per generar embeddings, executa:`);
    console.log(`   node scripts/generate-embeddings-doctrina.js`);
  }
}

main().catch(error => {
  console.error('❌ Error inesperat:', error);
  process.exit(1);
});
