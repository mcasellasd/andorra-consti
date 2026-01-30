const https = require('https');

const API_KEY = process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN || "";
const MODEL = 'mistralai/Mistral-7B-Instruct-v0.2';

const data = JSON.stringify({
  model: MODEL,
  messages: [
    { role: "system", content: "Ets un assistent." },
    { role: "user", content: "Hola!" }
  ],
  max_tokens: 50
});

const options = {
  hostname: 'router.huggingface.co',
  path: '/v1/chat/completions',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log(`📡 Testejant connexió a ${MODEL}...`);

const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('Response Body:', body);
  });
});

req.on('error', (error) => {
  console.error('Error de connexió:', error);
});

req.write(data);
req.end();
