const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = dotenv.parse(fs.readFileSync(envPath));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
} else {
  console.error("❌ No s'ha trobat el fitxer .env.local");
  process.exit(1);
}

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  console.error("❌ GROQ_API_KEY no trobada a .env.local");
  process.exit(1);
}

// Mask key for display
const maskedKey = apiKey.substring(0, 7) + '...' + apiKey.substring(apiKey.length - 4);
console.log(`🔑 Provant connexió amb clau Groq: ${maskedKey}`);

async function testConnection() {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Connexió amb Groq EXITOSA!");
      const expectedModel = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';
      const hasModel = data.data.some(m => m.id === expectedModel);
      if (hasModel) {
        console.log(`✅ Model '${expectedModel}' disponible.`);
      } else {
        console.log(`⚠️ Model '${expectedModel}' NO trobat a la llista de models disponibles.`);
        console.log("Models disponibles:", data.data.map(m => m.id).join(', '));
      }
    } else {
      const errorText = await response.text();
      console.error("❌ Error API Groq:", response.status, response.statusText);
      console.error("Detalls:", errorText);
    }
  } catch (error) {
    console.error("❌ Error de xarxa o execució:", error.message);
  }
}

testConnection();
