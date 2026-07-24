/**
 * Genera els fitxers JSON del corpus RAG des de:
 *   - data/codis/constitucio/articles.ts (Constitució completa, 108 articles)
 *   - data/doctrina.ts (Doctrina i jurisprudència acadèmica)
 * No necessita OpenAI ni embeddings — genera knowledge sense vectors.
 *
 * Ús: node scripts/generate-rag-from-articles.js
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_KNOWLEDGE = path.join(__dirname, '../data/rag/constitucio.json');
const OUTPUT_EMBEDDINGS = path.join(__dirname, '../data/rag/constitucio-embeddings.json');

// Llegir el fitxer articles.ts com a text i parsejar les dades via regex
const articlesPath = path.join(__dirname, '../data/codis/constitucio/articles.ts');
const articlesText = fs.readFileSync(articlesPath, 'utf8');

// Extreure el array JSON del fitxer TypeScript
// El fitxer té: export const articlesConstitucio: ArticleAndorra[] = [ ... ];
const match = articlesText.match(/export const articlesConstitucio[^=]+=\s*(\[[\s\S]*\]);?\s*$/);
if (!match) {
  console.error('❌ No s\'ha pogut extreure el array d\'articles del fitxer TS');
  process.exit(1);
}

let articles;
try {
  // Eliminar comentaris de TypeScript si n'hi ha
  const jsonLike = match[1]
    .replace(/\/\/.*$/gm, '') // comentaris línia
    .replace(/\/\*[\s\S]*?\*\//g, ''); // comentaris bloc
  articles = JSON.parse(jsonLike);
} catch (e) {
  console.error('❌ Error parsejant el JSON dels articles:', e.message);
  process.exit(1);
}

console.log(`📚 Articles carregats: ${articles.length}`);

// Convertir a format KnowledgeEntry per al RAG
const knowledge = articles.map(article => {
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

// Guardar knowledge JSON (només Constitució)
fs.writeFileSync(OUTPUT_KNOWLEDGE, JSON.stringify(knowledge, null, 2), 'utf8');
console.log(`✅ Corpus Constitució guardat: ${OUTPUT_KNOWLEDGE} (${knowledge.length} entrades)`);

// Embeddings buits
const emptyEmbeddings = [];
fs.writeFileSync(OUTPUT_EMBEDDINGS, JSON.stringify(emptyEmbeddings, null, 2), 'utf8');
console.log(`✅ Embeddings buits guardats: ${OUTPUT_EMBEDDINGS}`);

// ============================================================
// Carregar doctrina des de data/doctrina.ts
// ============================================================
const doctrinaPath = path.join(__dirname, '../data/doctrina.ts');
const doctrinaText = fs.readFileSync(doctrinaPath, 'utf8');

// Cerca l'array real: salta el tipus (DoctrinaCase[]) i busca el '= ['
const doctrinaStart = doctrinaText.indexOf('export const doctrinaDatabase');
let doctrinaMatch = null;
if (doctrinaStart !== -1) {
  const eqBracket = doctrinaText.indexOf('= [', doctrinaStart);
  if (eqBracket !== -1) {
    const afterEq = eqBracket + 2; // posició del '['
    // Trobar el ] de tancament, saltant template literals i strings
    let depth = 0, end = -1;
    let i = afterEq;
    while (i < doctrinaText.length) {
      const ch = doctrinaText[i];
      if (ch === '`') {
        // Saltar template literal complet
        i++;
        while (i < doctrinaText.length && doctrinaText[i] !== '`') {
          if (doctrinaText[i] === '\\') i++; // escape
          i++;
        }
      } else if (ch === "'") {
        // Saltar string cometa simple
        i++;
        while (i < doctrinaText.length && doctrinaText[i] !== "'") {
          if (doctrinaText[i] === '\\') i++;
          i++;
        }
      } else if (ch === '"') {
        // Saltar string cometa doble
        i++;
        while (i < doctrinaText.length && doctrinaText[i] !== '"') {
          if (doctrinaText[i] === '\\') i++;
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
    if (end !== -1) {
      doctrinaMatch = [null, doctrinaText.slice(afterEq, end + 1)];
    }
  }
}
let doctrinaKnowledge = [];

if (doctrinaMatch) {
  try {
    const vm = require('vm');
    const rawArray = doctrinaMatch[1];
    // Eliminar comentaris de línia i bloc
    const cleaned = rawArray
      .replace(/\/\/.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '');
    // Evaluar com a JS (suporta cometes simples, template literals, keys sense cometes)
    const doctrinaCases = vm.runInNewContext('(' + cleaned + ')', {});
    console.log(`📖 Doctrina carregada: ${doctrinaCases.length} entrades`);

    doctrinaKnowledge = doctrinaCases.map((doc, idx) => ({
      id: `DOCTRINA_${String(idx + 1).padStart(4, '0')}`,
      category: 'Doctrina',
      topic: doc.title,
      content: `${doc.author} (${doc.date}). ${doc.publication}.\n\n${doc.summary}\n\n${doc.content ? doc.content.substring(0, 2000) : ''}`,
      legalReference: doc.citation || doc.publication,
      keyConcepts: doc.keywords || [],
      implications: undefined
    }));
    console.log(`✅ Doctrina convertida: ${doctrinaKnowledge.length} entrades al corpus`);
  } catch (e) {
    console.warn(`⚠️  Error parsejant doctrina.ts (continuant sense doctrina): ${e.message}`);
  }
} else {
  console.warn('⚠️  No s\'ha pogut extreure doctrinaDatabase de doctrina.ts');
}

// ============================================================
// Corpus unificat: Constitució + Doctrina
// ============================================================
const OUTPUT_UNIFIED = path.join(__dirname, '../data/rag/constitucio-unified.json');
const OUTPUT_UNIFIED_EMB = path.join(__dirname, '../data/rag/constitucio-unified-embeddings.json');

const unifiedKnowledge = [...knowledge, ...doctrinaKnowledge];
fs.writeFileSync(OUTPUT_UNIFIED, JSON.stringify(unifiedKnowledge, null, 2), 'utf8');
fs.writeFileSync(OUTPUT_UNIFIED_EMB, JSON.stringify(emptyEmbeddings, null, 2), 'utf8');
console.log(`✅ Corpus unificat guardat: ${OUTPUT_UNIFIED} (${unifiedKnowledge.length} entrades total)`);
console.log('');
console.log(`🎉 Corpus RAG generat:`);
console.log(`   - Constitució: ${knowledge.length} articles`);
console.log(`   - Doctrina:    ${doctrinaKnowledge.length} entrades`);
console.log(`   - TOTAL:       ${unifiedKnowledge.length} entrades`);
console.log('ℹ️  Embeddings buits — cerca semàntica (RAG_ENABLED=true) desactivada');
console.log('ℹ️  Cerca per article (detectArticleReference) i BM25 text-search funcionen');
