
import { retrieveTopMatches } from '../lib/rag/corpus';
import { generateEmbedding, EmbeddingProvider } from '../lib/embeddings';
import dotenv from 'dotenv';

// Carregar variables d'entorn
dotenv.config({ path: '.env.local' });

async function testRagDoctrina() {
    const query = "quin és el termini de prescripció de les accions a andorra segons la jurisprudència";
    console.log(`🔎 Testejant RAG amb la consulta: "${query}"`);

    // 1. Generar embedding de la consulta
    console.log('🧠 Generant embedding...');

    // Determinar proveïdor segons env
    const providerEnv = process.env.EMBEDDING_PROVIDER || 'openai';

    let provider: EmbeddingProvider = 'openai';
    if (providerEnv === 'xlm-roberta' || providerEnv === 'xlm') {
        provider = 'xlm-roberta';
    }
    console.log(`🔌 Proveïdor utilitzat: ${provider}`);

    const apiKey = process.env.OPENAI_API_KEY;

    // Generar embedding
    const embedding = await generateEmbedding(query, provider, apiKey);

    // 2. Recuperar documents rellevants
    console.log('📚 Recuperant documents...');
    const results = retrieveTopMatches(embedding, 5);

    // 3. Mostrar resultats
    console.log(`\n✅ S'han trobat ${results.length} resultats:\n`);

    results.forEach((result, index) => {
        console.log(`Resultat ${index + 1}:`);
        console.log(`  - ID: ${result.entry.id}`);
        console.log(`  - Llibre/Origen: ${result.bookId}`);
        console.log(`  - Títol: ${result.entry.topic}`);
        console.log(`  - Categoria: ${result.entry.category}`);
        console.log(`  - Score: ${result.score.toFixed(4)}`);
        const content = result.entry.content || "";
        console.log(`  - Snippet: ${content.substring(0, 150).replace(/\n/g, ' ')}...`);
        console.log('-----------------------------------');
    });

    // Verificar si s'ha trobat doctrina
    const hasDoctrina = results.some(r => r.bookId === 'DOCTRINA');
    if (hasDoctrina) {
        console.log('\n🎉 ÈXIT: S\'han recuperat documents de DOCTRINA!');
    } else {
        console.log('\n⚠️ ALERTA: No s\'ha recuperat cap document de DOCTRINA en el top 5.');
        console.log('Comprova si els embeddings de doctrina estan carregats correctament.');
    }
}

testRagDoctrina().catch(console.error);
