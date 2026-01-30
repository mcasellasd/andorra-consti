/**
 * Revisió completa: indexació i embeddings de tots els documents del RAG
 *
 * Comprova:
 * - Fonts originals (docs, doctrina, aprenentatge)
 * - Fitxers de coneixement (knowledge JSON)
 * - Fitxers d'embeddings i coherència amb el knowledge
 * - Corpus unificat (constitucio-unified.json + embeddings)
 *
 * Ús: node scripts/check-rag-indexacio-completa.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA_RAG = path.join(ROOT, 'data/rag');
const DOCS = path.join(ROOT, 'docs');

function exists(p) {
  return fs.existsSync(p);
}

function readJson(p, def = null) {
  if (!exists(p)) return def;
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {
    return def;
  }
}

function fileSize(p) {
  if (!exists(p)) return 0;
  return fs.statSync(p).size;
}

function inferModel(dims) {
  if (dims === 768) return 'XLM-RoBERTa / BERT base';
  if (dims === 1536) return 'OpenAI text-embedding-3-small';
  if (dims === 3072) return 'OpenAI text-embedding-3-large';
  if (dims === 384) return 'all-MiniLM-L6-v2';
  return `Desconegut (${dims}d)`;
}

const report = [];
let hasErrors = false;
let hasWarnings = false;

function ok(msg) {
  report.push({ type: 'ok', msg });
}
function warn(msg) {
  report.push({ type: 'warn', msg });
  hasWarnings = true;
}
function err(msg) {
  report.push({ type: 'err', msg });
  hasErrors = true;
}

// ---- 1. Fonts originals ----
report.push({ type: 'section', msg: '1. Fonts originals (dades d\'entrada)' });

if (exists(path.join(DOCS, 'constitucio-andorra.txt'))) {
  const size = fileSize(path.join(DOCS, 'constitucio-andorra.txt'));
  ok(`docs/constitucio-andorra.txt: present (${(size / 1024).toFixed(1)} KB)`);
} else {
  err('docs/constitucio-andorra.txt: NO TROBAT (necessari per process-constitucio-completa.js)');
}

if (exists(path.join(DATA_RAG, 'doctrina'))) {
  const files = fs.readdirSync(path.join(DATA_RAG, 'doctrina'))
    .filter(f => f.endsWith('.json') && !f.endsWith('-embeddings.json'));
  if (files.length) {
    ok(`data/rag/doctrina/: ${files.length} fitxer(s) de coneixement: ${files.join(', ')}`);
  } else {
    warn('data/rag/doctrina/: directori existeix però no hi ha .json (sense -embeddings)');
  }
} else {
  warn('data/rag/doctrina/: directori no existeix (opcional)');
}

if (exists(path.join(DATA_RAG, 'aprenentatge'))) {
  const hasKn = exists(path.join(DATA_RAG, 'aprenentatge', 'aprenentatge.json'));
  if (hasKn) ok('data/rag/aprenentatge/aprenentatge.json: present');
  else warn('data/rag/aprenentatge/: directori existeix però no hi ha aprenentatge.json');
} else {
  warn('data/rag/aprenentatge/: directori no existeix (opcional)');
}

// ---- 2. Constitució: knowledge + embeddings ----
report.push({ type: 'section', msg: '2. Constitució (indexació + embeddings)' });

const constitucioPath = path.join(DATA_RAG, 'constitucio.json');
const constitucioEmbPath = path.join(DATA_RAG, 'constitucio-embeddings.json');

const constitucioKn = readJson(constitucioPath);
if (!constitucioKn || !Array.isArray(constitucioKn)) {
  err('data/rag/constitucio.json: NO TROBAT o no és un array. Executa: node scripts/process-constitucio-completa.js');
} else {
  ok(`data/rag/constitucio.json: ${constitucioKn.length} entrades`);
  const ids = constitucioKn.map(e => e.id).filter(Boolean);
  if (ids.length) {
    const sample = ids.slice(0, 3).join(', ') + (ids.length > 3 ? '...' : '');
    report.push({ type: 'info', msg: `   IDs (mostra): ${sample}` });
  }
}

const constitucioEmb = readJson(constitucioEmbPath);
if (!constitucioEmb || !Array.isArray(constitucioEmb)) {
  if (constitucioKn && constitucioKn.length) {
    err('data/rag/constitucio-embeddings.json: NO TROBAT o no és un array. Executa: node scripts/generate-embeddings-constitucio.js');
  }
} else {
  ok(`data/rag/constitucio-embeddings.json: ${constitucioEmb.length} embeddings`);
  const dims = constitucioEmb[0]?.embedding?.length;
  if (dims) {
    report.push({ type: 'info', msg: `   Dimensions: ${dims} (${inferModel(dims)})` });
  }
  if (constitucioKn && Array.isArray(constitucioKn)) {
    const knIds = new Set(constitucioKn.map(e => e.id));
    const embIds = new Set(constitucioEmb.map(e => e.id));
    const missingInEmb = [...knIds].filter(id => !embIds.has(id));
    const extraInEmb = [...embIds].filter(id => !knIds.has(id));
    if (missingInEmb.length) err(`   Entrades sense embedding: ${missingInEmb.length} (ex: ${missingInEmb.slice(0, 3).join(', ')})`);
    if (extraInEmb.length) warn(`   Embeddings sense entrada de coneixement: ${extraInEmb.length}`);
    if (missingInEmb.length === 0 && extraInEmb.length === 0 && knIds.size === embIds.size) {
      ok('   Coherència: totes les entrades tenen embedding');
    }
  }
}

// ---- 3. Doctrina: cada fitxer .json + el seu -embeddings.json ----
report.push({ type: 'section', msg: '3. Doctrina (per fitxer)' });

const doctrinaDir = path.join(DATA_RAG, 'doctrina');
if (exists(doctrinaDir)) {
  const docFiles = fs.readdirSync(doctrinaDir)
    .filter(f => f.endsWith('.json') && !f.endsWith('-embeddings.json'));
  for (const f of docFiles) {
    const knPath = path.join(doctrinaDir, f);
    const embPath = path.join(doctrinaDir, f.replace('.json', '-embeddings.json'));
    const kn = readJson(knPath);
    const emb = readJson(embPath);
    const knLen = Array.isArray(kn) ? kn.length : 0;
    const embLen = Array.isArray(emb) ? emb.length : 0;
    if (knLen === 0) {
      warn(`doctrina/${f}: no és un array o està buit`);
    } else {
      ok(`doctrina/${f}: ${knLen} entrades`);
      if (embLen === 0) {
        err(`doctrina/${f.replace('.json', '-embeddings.json')}: NO TROBAT o buit. Executa: node scripts/generate-embeddings-doctrina.js`);
      } else {
        ok(`   → embeddings: ${embLen}`);
        if (knLen !== embLen) warn(`   Coherència: ${knLen} entrades vs ${embLen} embeddings`);
      }
    }
  }
}

// ---- 4. Aprenentatge ----
report.push({ type: 'section', msg: '4. Aprenentatge' });

const aprenentatgeKnPath = path.join(DATA_RAG, 'aprenentatge', 'aprenentatge.json');
const aprenentatgeEmbPath = path.join(DATA_RAG, 'aprenentatge', 'aprenentatge-embeddings.json');
const apKn = readJson(aprenentatgeKnPath);
const apEmb = readJson(aprenentatgeEmbPath);
const apKnLen = Array.isArray(apKn) ? apKn.length : 0;
const apEmbLen = Array.isArray(apEmb) ? apEmb.length : 0;
if (apKnLen) {
  ok(`aprenentatge/aprenentatge.json: ${apKnLen} entrades`);
  if (apEmbLen === 0) err('aprenentatge/aprenentatge-embeddings.json: NO TROBAT. Executa: node scripts/generate-embeddings-aprenentatge.js');
  else {
    ok(`aprenentatge/aprenentatge-embeddings.json: ${apEmbLen} embeddings`);
    if (apKnLen !== apEmbLen) warn(`Coherència: ${apKnLen} entrades vs ${apEmbLen} embeddings`);
  }
} else if (exists(path.join(DATA_RAG, 'aprenentatge'))) {
  warn('aprenentatge: directori existeix però aprenentatge.json buit o absent');
}

// ---- 5. Corpus unificat (el que carrega l'app) ----
report.push({ type: 'section', msg: '5. Corpus unificat (el que utilitza l\'app RAG)' });

const unifiedKnPath = path.join(DATA_RAG, 'constitucio-unified.json');
const unifiedEmbPath = path.join(DATA_RAG, 'constitucio-unified-embeddings.json');
let unifiedKn = null;
let unifiedEmb = null;
try {
  unifiedKn = readJson(unifiedKnPath);
  unifiedEmb = readJson(unifiedEmbPath);
} catch (e) {
  warn(`Error carregant corpus unificat (fitxers grans): ${e.message}`);
}
const unifiedKnLen = Array.isArray(unifiedKn) ? unifiedKn.length : 0;
const unifiedEmbLen = Array.isArray(unifiedEmb) ? unifiedEmb.length : 0;

if (unifiedKnLen === 0) {
  err('data/rag/constitucio-unified.json: NO TROBAT o buit. Executa: node scripts/unificar-corpus-doctrina.js (després de tenir constitucio.json + embeddings)');
} else {
  ok(`data/rag/constitucio-unified.json: ${unifiedKnLen} entrades`);
}

if (unifiedEmbLen === 0) {
  if (unifiedKnLen) err('data/rag/constitucio-unified-embeddings.json: NO TROBAT o buit. Executa: node scripts/unificar-corpus-doctrina.js després de generar tots els embeddings.');
} else {
  ok(`data/rag/constitucio-unified-embeddings.json: ${unifiedEmbLen} embeddings`);
  const dims = unifiedEmb[0]?.embedding?.length;
  if (dims) report.push({ type: 'info', msg: `   Dimensions: ${dims} (${inferModel(dims)})` });
  if (unifiedKnLen !== unifiedEmbLen) {
    err(`Coherència: ${unifiedKnLen} entrades de coneixement vs ${unifiedEmbLen} embeddings (han de coincidir)`);
  } else {
    const knIds = new Set(unifiedKn.map(e => e.id));
    const embIds = new Set(unifiedEmb.map(e => e.id));
    const missing = [...knIds].filter(id => !embIds.has(id));
    if (missing.length) err(`   Entrades sense embedding al unificat: ${missing.length} (ex: ${missing.slice(0, 5).join(', ')})`);
    else ok('   Coherència: totes les entrades tenen embedding al corpus unificat');
  }
}

// ---- Resum ----
report.push({ type: 'section', msg: 'Resum' });

const summary = [];
if (unifiedKnLen && unifiedEmbLen && unifiedKnLen === unifiedEmbLen) {
  summary.push(`Corpus unificat: ${unifiedKnLen} entrades indexades i ${unifiedEmbLen} embeddings (llest per RAG).`);
} else {
  summary.push('Corpus unificat incomplet: cal generar/ unificar knowledge i embeddings.');
}
if (hasErrors) summary.push('Hi ha errors: revisa els passos indicats.');
if (hasWarnings) summary.push('Hi ha avisos opcionals (doctrina/ aprenentatge).');

report.push({ type: 'info', msg: summary.join(' ') });

// ---- Sortida ----
console.log('\n🔍 Revisió indexació i embeddings RAG\n');

for (const r of report) {
  if (r.type === 'section') console.log(`\n${r.msg}`);
  else if (r.type === 'ok') console.log(`   ✅ ${r.msg}`);
  else if (r.type === 'warn') console.log(`   ⚠️  ${r.msg}`);
  else if (r.type === 'err') console.log(`   ❌ ${r.msg}`);
  else if (r.type === 'info') console.log(`   ℹ️  ${r.msg}`);
}

console.log('\n');
process.exit(hasErrors ? 1 : 0);
