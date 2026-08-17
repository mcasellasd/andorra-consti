require('dotenv').config({ path: '.env.local' });
const https = require('https');

const API_KEY = process.env.GROQ_API_KEY;

console.log('🔑 Llegint GROQ_API_KEY del .env.local...');

if (!API_KEY || !API_KEY.startsWith('gsk_')) {
  console.error('❌ Error: GROQ_API_KEY no trobada o format incorrecte (ha de començar per gsk_)');
  console.log(`Valor llegit: ${API_KEY ? API_KEY.substring(0, 5) + '...' : 'undefined'}`);
  process.exit(1);
}

console.log('✅ Clau detectada. Provant connexió a Groq...');

const data = JSON.stringify({
  model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
  messages: [{ role: "user", content: "Digues 'Hola' si em sents." }]
});

const options = {
  hostname: 'api.groq.com',
  path: '/openai/v1/chat/completions',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(body);
      if (json.choices && json.choices.length > 0) {
        console.log(`🎉 ÈXIT! Resposta: "${json.choices[0].message.content}"`);
      } else {
        console.log('⚠️ Resposta inesperada:', body);
      }
    } catch (e) {
      console.log('⚠️ Error parsejant JSON:', body);
    }
  });
});

req.on('error', (e) => {
  console.error('❌ Error de xarxa:', e);
});

req.write(data);
req.end();
