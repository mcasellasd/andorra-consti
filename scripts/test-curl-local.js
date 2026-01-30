const http = require('http');

const data = JSON.stringify({
  message: "Què diu la constitució sobre la sobirania?",
  conversationHistory: []
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/unified-chat',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log('🔗 Connectant a http://localhost:3000/api/unified-chat ...');

const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('📦 Body:', body.substring(0, 500)); // Només els primers 500 chars
  });
});

req.on('error', (e) => {
  console.error('❌ Error connectant a localhost:', e.message);
});

req.write(data);
req.end();
