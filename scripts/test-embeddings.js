const { pipeline } = require('@xenova/transformers');

async function test() {
  console.log('📦 Carregant model d\'embeddings local (XLM-RoBERTa)...');
  console.time('Load Model');
  
  // Utilitzar el mateix model que l'app (comprovem quin és, normalment 'Xenova/xlm-roberta-base')
  const extractor = await pipeline('feature-extraction', 'Xenova/xlm-roberta-base');
  
  console.timeEnd('Load Model');
  console.log('✅ Model carregat.');

  console.log('🧠 Generant embedding de prova...');
  console.time('Generate Embedding');
  
  const output = await extractor('Això és una prova de text.', { pooling: 'mean', normalize: true });
  
  console.timeEnd('Generate Embedding');
  console.log('✅ Embedding generat amb èxit. Dimensions:', output.dims);
}

test().catch(err => {
  console.error('❌ Error crític en Embeddings:', err);
});
