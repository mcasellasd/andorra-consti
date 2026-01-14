/**
 * Script de prova per verificar que XLM-RoBERTa funciona correctament
 * 
 * Ús:
 *   node scripts/test-xlm-roberta.js
 */

async function testXLM() {
  console.log('🧪 Provant XLM-RoBERTa...\n');
  
  // Importar dinàmicament @xenova/transformers (és un mòdul ES)
  const { pipeline } = await import('@xenova/transformers');
  
  const MODEL_NAME = 'Xenova/xlm-roberta-base';
  let embeddingPipeline = null;

  async function generateEmbedding(text) {
    if (!embeddingPipeline) {
      console.log(`📦 Carregant model ${MODEL_NAME}...`);
      embeddingPipeline = await pipeline('feature-extraction', MODEL_NAME, {
        quantized: true,
      });
      console.log(`✅ Model carregat\n`);
    }

    // Provar amb opcions diferents
    // Opció 1: Amb pooling mean
    const output1 = await embeddingPipeline(text, {
      pooling: 'mean',
      normalize: true,
    });
    
    console.log(`   Opció 1 (pooling: mean) - shape:`, output1.dims);
    
    // Opció 2: Sense pooling, agafar la mitjana manualment
    const output2 = await embeddingPipeline(text, {
      normalize: false,
    });
    
    console.log(`   Opció 2 (sense pooling) - shape:`, output2.dims);
    
    // Si output2 és [1, num_tokens, hidden_size], agafar la mitjana
    let embedding;
    if (output2.dims && output2.dims.length === 3) {
      const [batchSize, numTokens, hiddenSize] = output2.dims;
      console.log(`   Debug - batchSize: ${batchSize}, numTokens: ${numTokens}, hiddenSize: ${hiddenSize}`);
      
      if (hiddenSize === 768) {
        // Agafar la mitjana de tots els tokens manualment
        const data = Array.from(output2.data);
        embedding = new Array(768).fill(0);
        
        // Calcular la mitjana per cada dimensió
        for (let i = 0; i < 768; i++) {
          let sum = 0;
          for (let j = 0; j < numTokens; j++) {
            sum += data[j * 768 + i];
          }
          embedding[i] = sum / numTokens;
        }
        
        // Normalitzar
        const norm = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
        embedding = embedding.map(val => val / norm);
      } else {
        // Fallback: usar output1 i agafar les primeres 768 dimensions
        console.log(`   ⚠️  Usant fallback: agafant primeres 768 dimensions`);
        embedding = Array.from(output1.data.slice(0, 768));
      }
    } else {
      // Fallback: usar output1
      embedding = Array.from(output1.data.slice(0, 768));
    }

    return embedding;
  }

  const testTexts = [
    'Article 1 de la Constitució d\'Andorra'
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
      console.log(`   - Últimes 5 dimensions: [${embedding.slice(-5).map(n => n.toFixed(4)).join(', ')}]`);
      console.log('');
    }
    
    console.log('✅ XLM-RoBERTa funciona correctament!');
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
    if (error.stack) {
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

testXLM().catch((error) => {
  console.error('❌ Error inesperat:', error);
  process.exit(1);
});
