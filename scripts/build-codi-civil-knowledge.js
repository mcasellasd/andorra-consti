/**
 * Script per generar el fitxer JSON de coneixement del Codi Civil d'Andorra
 * a partir del text extret del PDF
 *
 * Ús:
 *   node scripts/build-codi-civil-knowledge.js
 */

const fs = require('fs');
const path = require('path');

const TEXT_PATH = path.join(__dirname, '../docs/codi-civil-andorra.txt');
const OUTPUT_PATH = path.join(__dirname, '../data/rag/codi-civil-andorra.json');

// Mapeig de números de llibre
const llibreMap = {
  'primer': 'I',
  'segon': 'II',
  'tercer': 'III',
  'quart': 'IV',
  'cinquè': 'V',
  'sisè': 'VI'
};

function parseTextFile() {
  const content = fs.readFileSync(TEXT_PATH, 'utf8');
  const lines = content.split('\n');
  
  const entries = [];
  let currentLlibre = null;
  let currentTitol = null;
  let currentCapitol = null;
  let currentArticle = null;
  let articleContent = [];
  let articleNumber = null;
  let articleTitle = null;
  let inArticleContent = false;
  let skipUntilContent = true; // Saltar la primera part que només té títols
  
  // Detectar quan comença el contingut real (quan trobem "Llibre primer" seguit d'articles amb contingut)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : '';
    const nextNextLine = i < lines.length - 2 ? lines[i + 2].trim() : '';
    
    // Detectar quan comença el contingut real (Llibre primer seguit de Títol i Article amb contingut)
    if (skipUntilContent && 
        line.match(/^Llibre\s+primer\./i) && 
        nextLine.match(/^Títol\s+I\./i) && 
        nextNextLine.match(/^Article\s+\d+\./) &&
        i + 3 < lines.length && lines[i + 3].trim().match(/^\d+\./)) {
      skipUntilContent = false;
    }
    
    if (skipUntilContent) continue; // Saltar fins trobar el contingut real
    
    // Detectar Llibre (només si no estem dins d'un article o si és un nou llibre)
    const llibreMatch = line.match(/^Llibre\s+(primer|segon|tercer|quart|cinquè|sisè)\.\s*(.+)$/i);
    if (llibreMatch && (!inArticleContent || articleContent.length === 0)) {
      // Guardar article anterior si existeix
      if (currentArticle && articleNumber && articleContent.length > 0) {
        entries.push(createEntry(currentLlibre, currentTitol, currentCapitol, articleNumber, articleTitle, articleContent.join(' ')));
      }
      
      currentLlibre = llibreMap[llibreMatch[1].toLowerCase()] || llibreMatch[1];
      currentTitol = null;
      currentCapitol = null;
      currentArticle = null;
      articleContent = [];
      articleNumber = null;
      articleTitle = null;
      inArticleContent = false;
      continue;
    }
    
    // Detectar Títol
    const titolMatch = line.match(/^Títol\s+([IVX]+)\.\s*(.+)$/i);
    if (titolMatch && (!inArticleContent || articleContent.length === 0)) {
      // Guardar article anterior si existeix
      if (currentArticle && articleNumber && articleContent.length > 0) {
        entries.push(createEntry(currentLlibre, currentTitol, currentCapitol, articleNumber, articleTitle, articleContent.join(' ')));
      }
      
      currentTitol = titolMatch[2];
      currentCapitol = null;
      currentArticle = null;
      articleContent = [];
      articleNumber = null;
      articleTitle = null;
      inArticleContent = false;
      continue;
    }
    
    // Detectar Capítol
    const capitolMatch = line.match(/^Capítol\s+(primer|segon|tercer|quart|cinquè|sisè|setè|vuitè|novè|desè)\.\s*(.+)$/i);
    if (capitolMatch && (!inArticleContent || articleContent.length === 0)) {
      // Guardar article anterior si existeix
      if (currentArticle && articleNumber && articleContent.length > 0) {
        entries.push(createEntry(currentLlibre, currentTitol, currentCapitol, articleNumber, articleTitle, articleContent.join(' ')));
      }
      
      currentCapitol = capitolMatch[2];
      currentArticle = null;
      articleContent = [];
      articleNumber = null;
      articleTitle = null;
      inArticleContent = false;
      continue;
    }
    
    // Detectar Article
    const articleMatch = line.match(/^Article\s+(\d+)\.?\s*(.+)$/i);
    if (articleMatch) {
      // Guardar article anterior si existeix
      if (currentArticle && articleNumber && articleContent.length > 0) {
        entries.push(createEntry(currentLlibre, currentTitol, currentCapitol, articleNumber, articleTitle, articleContent.join(' ')));
      }
      
      articleNumber = articleMatch[1];
      articleTitle = articleMatch[2];
      articleContent = [];
      currentArticle = true;
      inArticleContent = true;
      continue;
    }
    
    // Si estem dins d'un article, afegir contingut
    if (inArticleContent && line) {
      // Ignorar línies de capçalera del document
      if (!line.match(/^(Consell General|Lleis|www\.bopa\.ad|Núm\.|Dipòsit legal|Secció|Índex)/) && 
          line.length > 2 && 
          !line.match(/^\d+\/\d+$/)) { // Ignorar números de pàgina
        articleContent.push(line);
      }
    }
  }
  
  // Guardar últim article
  if (currentArticle && articleNumber && articleContent.length > 0) {
    entries.push(createEntry(currentLlibre, currentTitol, currentCapitol, articleNumber, articleTitle, articleContent.join(' ')));
  }
  
  return entries;
}

function createEntry(llibre, titol, capitol, articleNumber, articleTitle, content) {
  const category = [llibre ? `Llibre ${llibre}` : null, titol, capitol].filter(Boolean).join(' - ');
  
  // Generar conceptes clau a partir del títol i contingut
  const keyConcepts = extractKeyConcepts(articleTitle, content);
  
  return {
    id: `CCA_L${llibre || 'I'}_A${articleNumber.padStart(3, '0')}`,
    category: category || 'General',
    topic: `Article ${articleNumber}: ${articleTitle}`,
    content: content.trim() || articleTitle,
    legalReference: `Codi Civil d'Andorra, Llibre ${llibre || 'I'}, Article ${articleNumber}`,
    keyConcepts: keyConcepts
  };
}

function extractKeyConcepts(title, content) {
  const concepts = [];
  const text = `${title} ${content}`.toLowerCase();
  
  // Conceptes comuns del dret processal
  const commonConcepts = [
    'jurisdicció', 'competència', 'procés', 'demanda', 'sentència', 'recurs',
    'notificació', 'resolució', 'tribunal', 'part', 'advocat', 'procurador',
    'prova', 'testimoni', 'perit', 'execució', 'mesures cautelars',
    'caducitat', 'suspensió', 'nul·litat', 'legitimació', 'capacitat'
  ];
  
  commonConcepts.forEach(concept => {
    if (text.includes(concept)) {
      concepts.push(concept);
    }
  });
  
  // Afegir paraules clau del títol
  const titleWords = title.toLowerCase().split(/[,\s]+/).filter(w => w.length > 4);
  concepts.push(...titleWords.slice(0, 3));
  
  return [...new Set(concepts)].slice(0, 8); // Limitar a 8 conceptes
}

function main() {
  console.log('📚 Processant Codi Civil d\'Andorra...');
  console.log(`📄 Llegint fitxer: ${TEXT_PATH}`);
  
  if (!fs.existsSync(TEXT_PATH)) {
    console.error(`❌ No s'ha trobat el fitxer: ${TEXT_PATH}`);
    process.exit(1);
  }
  
  const entries = parseTextFile();
  
  console.log(`✅ Extrets ${entries.length} articles`);
  
  // Filtrar entrades buides o sense contingut
  const validEntries = entries.filter(e => e.content && e.content.trim().length > 10);
  
  console.log(`✅ ${validEntries.length} articles vàlids`);
  
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(validEntries, null, 2), 'utf8');
  console.log(`✅ Fitxer guardat a: ${OUTPUT_PATH}`);
  console.log('\n💡 Següent pas: Executa el script de generació d\'embeddings:');
  console.log('   node scripts/generate-embeddings-codi-civil.js');
}

main();

