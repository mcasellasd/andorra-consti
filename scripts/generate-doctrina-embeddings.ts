
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { generateEmbedding } from '../lib/embeddings';

// Carregar variables d'entorn
dotenv.config({ path: '.env.local' });

const DOCTRINA_FILE = '../data/rag/doctrina/20-anys.json';
const OUTPUT_FILE = '../data/rag/doctrina/20-anys-embeddings.json';

async function generateEmbeddings() {
    console.log('🚀 Iniciant generació d\'embeddings per a DOCTRINA...');

    // 1. Verificar API Key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.error('❌ Error: OPENAI_API_KEY no trobada a .env.local');
        process.exit(1);
    }

    // 2. Carregar dades
    const jsonPath = path.join(__dirname, DOCTRINA_FILE);
    if (!fs.existsSync(jsonPath)) {
        console.error(`❌ Fitxer no trobat: ${jsonPath}`);
        process.exit(1);
    }

    const documents = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    console.log(`📄 Carregats ${documents.length} documents de doctrina.`);

    const embeddings = [];

    // 3. Generar embeddings
    console.log(`🧠 Generant embeddings amb model OpenAI text-embedding-3-large (3072 dims)...`);

    for (let i = 0; i < documents.length; i++) {
        const doc = documents[i];
        const contentToEmbed = `${doc.topic}\n\n${doc.content}`;

        try {
            if (i % 10 === 0) console.log(`   Processant ${i + 1}/${documents.length}...`);

            // Forcem 'openai' per assegurar compatibilitat amb el corpus existent
            const embedding = await generateEmbedding(contentToEmbed, 'openai', apiKey);

            embeddings.push({
                id: doc.id,
                embedding: embedding
            });

            // Petit delay per evitar rate limits
            await new Promise(resolve => setTimeout(resolve, 200));

        } catch (error: any) {
            console.error(`❌ Error generant embedding per ${doc.id}: ${error.message}`);
        }
    }

    // 4. Guardar resultat
    const outputPath = path.join(__dirname, OUTPUT_FILE);
    fs.writeFileSync(outputPath, JSON.stringify(embeddings, null, 2));

    console.log(`✅ Embeddings generats i guardats a: ${OUTPUT_FILE}`);
    console.log(`📊 Total: ${embeddings.length} embeddings.`);
}

generateEmbeddings().catch(console.error);
