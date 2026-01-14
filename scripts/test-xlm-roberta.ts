/**
 * Script de prova per verificar que XLM-RoBERTa funciona correctament
 * 
 * Ús:
 *   npx ts-node scripts/test-xlm-roberta.ts
 *   o
 *   node --loader ts-node/esm scripts/test-xlm-roberta.ts
 */

import { generateEmbedding } from '../lib/embeddings/xlm-roberta';

async function testXLM() {
  console.log('🧪 Provant XLM-RoBERTa...\n');
  
  const testTexts = [
    'Article 1 de la Constitució d\'Andorra',
    'Quins són els drets fonamentals?',
    'Com funciona el Tribunal Constitucional?'
  ];

  try {
    for (let i = 0; i < testTexts.length; i++) {
      const text = testTexts[i];
      console.log(`📝 Text ${i + 1}: "${text}"`);
      
      const startTime = Date.now();
      const embedding = await generateEmbedding(text);
      const endTime = Date.now();
      
      console.log(`✅ Embedding generat:`);
      console.log(`   - Dimensions: ${embedding.length}`);
      console.log(`   - Temps: ${endTime - startTime}ms`);
      console.log(`   - Primeres 5 dimensions: [${embedding.slice(0, 5).map(n => n.toFixed(4)).join(', ')}]`);
      console.log('');
    }
    
    console.log('✅ XLM-RoBERTa funciona correctament!');
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

testXLM();
