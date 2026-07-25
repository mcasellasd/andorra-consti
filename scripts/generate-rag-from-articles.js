/**
 * Genera els fitxers JSON del corpus RAG des de:
 *   - data/codis/constitucio/articles.ts (Constitució completa, 108 articles)
 *   - data/codis/tribunal-constitucional/articles.ts (Llei 21/2023 TC, 97 articles)
 *   - data/doctrina.ts (Doctrina i jurisprudència acadèmica)
 * No necessita OpenAI ni embeddings — genera knowledge sense vectors.
 *
 * Ús: node scripts/generate-rag-from-articles.js
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const OUTPUT_KNOWLEDGE = path.join(__dirname, '../data/rag/constitucio.json');
const OUTPUT_EMBEDDINGS = path.join(__dirname, '../data/rag/constitucio-embeddings.json');
const OUTPUT_UNIFIED = path.join(__dirname, '../data/rag/constitucio-unified.json');
const OUTPUT_UNIFIED_EMB = path.join(__dirname, '../data/rag/constitucio-unified-embeddings.json');

/**
 * Funció auxiliar per parsejar arrays exportats en fitxers TypeScript
 */
function parseTsArray(filePath, exportName) {
  if (!fs.existsSync(filePath)) return [];
  const text = fs.readFileSync(filePath, 'utf8');
  const start = text.indexOf('export const ' + exportName);
  if (start === -1) return [];
  const eqBracket = text.indexOf('= [', start);
  if (eqBracket === -1) return [];
  const afterEq = eqBracket + 2;

  let depth = 0, end = -1, i = afterEq;
  while (i < text.length) {
    const ch = text[i];
    if (ch === '`') {
      i++;
      while (i < text.length && text[i] !== '`') {
        if (text[i] === '\\') i++;
        i++;
      }
    } else if (ch === "'") {
      i++;
      while (i < text.length && text[i] !== "'") {
        if (text[i] === '\\') i++;
        i++;
      }
    } else if (ch === '"') {
      i++;
      while (i < text.length && text[i] !== '"') {
        if (text[i] === '\\') i++;
        i++;
      }
    } else if (ch === '[') {
      depth++;
    } else if (ch === ']') {
      depth--;
      if (depth === 0) { end = i; break; }
    }
    i++;
  }
  if (end === -1) return [];

  const cleaned = text.slice(afterEq, end + 1)
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '');

  return vm.runInNewContext('(' + cleaned + ')', {});
}

// 1. Constitució d'Andorra
const constiPath = path.join(__dirname, '../data/codis/constitucio/articles.ts');
const articlesConsti = parseTsArray(constiPath, 'articlesConstitucio');
console.log(`📚 Articles Constitució carregats: ${articlesConsti.length}`);

const constiKnowledge = articlesConsti.map(article => {
  const numMatch = article.id.match(/^CONST_(\d+)$/);
  const numStr = numMatch ? parseInt(numMatch[1], 10).toString() : null;
  const topicBase = article.titol || (numStr ? `Article ${numStr}` : article.numeracio || article.id);

  return {
    id: article.id,
    category: article.titol || 'Constitució d\'Andorra',
    topic: topicBase,
    content: article.text_oficial || (article.idiomes && article.idiomes.ca) || '',
    legalReference: article.numeracio || undefined,
    keyConcepts: article.tags || [],
    implications: undefined
  };
});

// Guardar corpus només Constitució
fs.writeFileSync(OUTPUT_KNOWLEDGE, JSON.stringify(constiKnowledge, null, 2), 'utf8');
const emptyEmbeddings = [];
fs.writeFileSync(OUTPUT_EMBEDDINGS, JSON.stringify(emptyEmbeddings, null, 2), 'utf8');
console.log(`✅ Corpus Constitució guardat: ${OUTPUT_KNOWLEDGE} (${constiKnowledge.length} entrades)`);

// 2. Llei del Tribunal Constitucional (Llei 21/2023)
const tcPath = path.join(__dirname, '../data/codis/tribunal-constitucional/articles.ts');
const articlesTC = parseTsArray(tcPath, 'articlesTribunalConstitucional');
console.log(`⚖️ Articles Tribunal Constitucional carregats: ${articlesTC.length}`);

const tcKnowledge = articlesTC.map(article => {
  return {
    id: article.id,
    category: 'Llei 21/2023 del Tribunal Constitucional',
    topic: article.numeracio ? `Llei del Tribunal Constitucional - ${article.numeracio}` : article.titol || article.id,
    content: `${article.numeracio ? article.numeracio + ': ' : ''}${article.titol ? article.titol + '\n\n' : ''}${article.text_oficial || ''}`,
    legalReference: article.numeracio ? `Llei 21/2023 (${article.numeracio})` : 'Llei 21/2023 del Tribunal Constitucional',
    keyConcepts: article.tags || ['tribunal constitucional', 'llei 21/2023'],
    implications: undefined
  };
});

// 3. Doctrina
const doctrinaPath = path.join(__dirname, '../data/doctrina.ts');
const doctrinaCases = parseTsArray(doctrinaPath, 'doctrinaDatabase');
console.log(`📖 Doctrina carregada: ${doctrinaCases.length} entrades`);

const doctrinaKnowledge = doctrinaCases.map((doc, idx) => ({
  id: `DOCTRINA_${String(idx + 1).padStart(4, '0')}`,
  category: 'Doctrina',
  topic: doc.title,
  content: `${doc.author} (${doc.date}). ${doc.publication}.\n\n${doc.summary}\n\n${doc.content ? doc.content.substring(0, 2000) : ''}`,
  legalReference: doc.citation || doc.publication,
  keyConcepts: doc.keywords || [],
  implications: undefined
}));

// ============================================================
// Corpus unificat: Constitució + Tribunal Constitucional + Doctrina
// ============================================================
const unifiedKnowledge = [...constiKnowledge, ...tcKnowledge, ...doctrinaKnowledge];
fs.writeFileSync(OUTPUT_UNIFIED, JSON.stringify(unifiedKnowledge, null, 2), 'utf8');
fs.writeFileSync(OUTPUT_UNIFIED_EMB, JSON.stringify(emptyEmbeddings, null, 2), 'utf8');
console.log(`✅ Corpus unificat guardat: ${OUTPUT_UNIFIED} (${unifiedKnowledge.length} entrades total)`);
console.log('');
console.log(`🎉 Corpus RAG generat amb èxit:`);
console.log(`   - Constitució:             ${constiKnowledge.length} articles`);
console.log(`   - Tribunal Constitucional: ${tcKnowledge.length} articles (Llei 21/2023)`);
console.log(`   - Doctrina:                ${doctrinaKnowledge.length} entrades`);
console.log(`   - TOTAL:                   ${unifiedKnowledge.length} entrades`);
console.log('ℹ️  Embeddings buits — cerca semàntica (RAG_ENABLED=true) desactivada');
console.log('ℹ️  Cerca per article i BM25 text-search funcionen sobre tot el corpus');
