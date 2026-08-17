
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load env
dotenv.config({ path: '.env.local' });

const apiKey = process.env.GROQ_API_KEY;
if (!apiKey) {
  console.error('❌ GROQ_API_KEY is not set in .env.local');
  process.exit(1);
}

const INPUT_FILE = path.join(process.cwd(), 'data', 'rag', 'constitucio-unified.json');
const OUTPUT_FILE = path.join(process.cwd(), 'data', 'evaluation', 'golden-dataset-title-i.json');

async function main() {
  console.log('📖 Loading constitution data...');
  const rawData = fs.readFileSync(INPUT_FILE, 'utf-8');
  const allArticles = JSON.parse(rawData);

  // Filter for Title I (Articles 1-3)
  const titleIArticles = allArticles.filter(a => ['CONST_001', 'CONST_002', 'CONST_003'].includes(a.id));
  console.log(`🔍 Found ${titleIArticles.length} articles for Title I.`);

  const dataset = [];

  for (const article of titleIArticles) {
    console.log(`🤖 Generant QA per a l'Article ${article.id.replace('CONST_', '')}...`);
    
    const articleNum = parseInt(article.id.replace('CONST_', ''), 10);
    
    // Prompt for clean JSON output
    const prompt = `
    Ets un expert en dret andorrà.
    Analitza el següent text de la Constitució:
    "${article.content}"
    
    Genera 3 parells de pregunta-resposta basats ÚNICAMENT en aquest text.
    Les preguntes han de ser en català i rellevants jurídicament.
    Les respostes (ground truth) han de ser precises i literals si cal.
    
    Important: Retorna ÚNICAMENT un array JSON vàlid amb aquest format, sense markdown ni explicacions prèvies:
    [
      { "question": "...", "answer": "..." },
      { "question": "...", "answer": "..." },
      { "question": "...", "answer": "..." }
    ]
    `;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.1,
          response_format: { type: 'json_object' } // Force JSON mode
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Groq API error: ${response.status} ${errText}`);
      }

      const data = await response.json();
      let content = data.choices[0].message.content;
      
      // Parse JSON
      let qaPairs;
      try {
        // Handle "obj" wrapper if returned, or extract array
        const parsed = JSON.parse(content);
        // Sometimes LLM returns { "pairs": [...] } or just [...]
        qaPairs = Array.isArray(parsed) ? parsed : (parsed.pairs || parsed.items || parsed.qa || Object.values(parsed)[0]);
        if (!Array.isArray(qaPairs)) throw new Error('Format JSON inesperat');
      } catch (e) {
        console.warn('⚠️ Error parsejant JSON, intentant neteja manual...', e);
        // Fallback cleanup
        content = content.replace(/```json/g, '').replace(/```/g, '').trim();
        qaPairs = JSON.parse(content);
      }

      qaPairs.forEach((pair, index) => {
        dataset.push({
          number: articleNum,
          id: `${article.id}_Q${index + 1}`,
          context: article.content,
          question: pair.question,
          ground_truth: pair.answer
        });
      });

      console.log(`✅ ${qaPairs.length} preguntes generades.`);

    } catch (error) {
      console.error(`❌ Error generant per a ${article.id}:`, error.message);
    }
  }

  // Ensure dir exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(dataset, null, 2));
  console.log(`💾 Golden Dataset guardat a: ${OUTPUT_FILE}`);
}

main().catch(console.error);
