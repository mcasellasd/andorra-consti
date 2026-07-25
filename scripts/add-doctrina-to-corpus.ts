/**
 * Extreu la doctrina des de data/doctrina.ts i l'afegeix al corpus unificat.
 * Usa ts-node per importar el mòdul TypeScript directament.
 *
 * Ús: npx ts-node scripts/add-doctrina-to-corpus.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { doctrinaDatabase } from '../data/doctrina';

const OUTPUT_UNIFIED = path.join(__dirname, '../data/rag/constitucio-unified.json');
const OUTPUT_UNIFIED_EMB = path.join(__dirname, '../data/rag/constitucio-unified-embeddings.json');

// Llegir corpus existent (Constitució)
if (!fs.existsSync(OUTPUT_UNIFIED)) {
  console.error('❌ No existeix constitucio-unified.json. Executa primer generate-rag-from-articles.js');
  process.exit(1);
}

const existingKnowledge: any[] = JSON.parse(fs.readFileSync(OUTPUT_UNIFIED, 'utf8'));
const constitucioEntries = existingKnowledge.filter((e: any) => !e.id.startsWith('DOCTRINA_'));
console.log(`📚 Constitució: ${constitucioEntries.length} articles`);
console.log(`📖 Doctrina a processar: ${doctrinaDatabase.length} entrades`);

// Convertir doctrina al format KnowledgeEntry
const doctrinaKnowledge = doctrinaDatabase.map((doc, idx) => ({
  id: `DOCTRINA_${String(idx + 1).padStart(4, '0')}`,
  category: 'Doctrina',
  topic: doc.title,
  content: [
    `${doc.author} (${doc.date}). ${doc.publication}.`,
    doc.summary,
    doc.content ? doc.content.substring(0, 3000) : ''
  ].filter(Boolean).join('\n\n'),
  legalReference: doc.citation || `${doc.author}, "${doc.title}", ${doc.publication} (${doc.date})`,
  keyConcepts: doc.keywords || [],
  implications: undefined
}));

const unified = [...constitucioEntries, ...doctrinaKnowledge];
fs.writeFileSync(OUTPUT_UNIFIED, JSON.stringify(unified, null, 2), 'utf8');
fs.writeFileSync(OUTPUT_UNIFIED_EMB, JSON.stringify([], null, 2), 'utf8');

console.log(`✅ Corpus unificat guardat: ${unified.length} entrades total`);
console.log(`   - Constitució: ${constitucioEntries.length} articles`);
console.log(`   - Doctrina:    ${doctrinaKnowledge.length} entrades`);
