
import { getKnowledgeEntries, getAvailableBooks } from '../lib/rag/corpus';

// Debug script per comprovar què s'ha carregat al corpus
console.log('📚 Comprovant estat del Corpus RAG...');

const books = getAvailableBooks();
console.log('📕 Llibres disponibles:', books);

const entries = getKnowledgeEntries();
console.log(`📄 Total entrades carregades: ${entries.length}`);

// Comptar per tipus/origen
const summary = entries.reduce((acc, entry) => {
    const isDoctrina = entry.id.startsWith('DOCTRINA') || entry.id.startsWith('DOC_') || entry.category === 'Jurisprudència' || entry.category === 'jurisprudència';
    const key = isDoctrina ? 'DOCTRINA' : 'CONSTITUCIO';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
}, {} as Record<string, number>);

console.log('📊 Resum per tipus:', summary);

// Mostrar un exemple de doctrina si n'hi ha
const doctrinaExemple = entries.find(e => e.id.startsWith('DOCTRINA') || e.id.startsWith('DOC_'));
if (doctrinaExemple) {
    console.log('\n📝 Exemple de Doctrina carregada:');
    console.log(`  - ID: ${doctrinaExemple.id}`);
    console.log(`  - Títol: ${doctrinaExemple.topic}`);
    console.log(`  - Content length: ${doctrinaExemple.content.length}`);
} else {
    console.log('\n❌ NO s\'ha trobat cap entrada de DOCTRINA al corpus carregat.');
}
