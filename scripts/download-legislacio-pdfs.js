/**
 * Script per descarregar tots els PDFs de la legislació andorrana
 * 
 * Ús:
 * node scripts/download-legislacio-pdfs.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// Importar les dades de legislació
const legislacioPath = path.join(__dirname, '../data/legislacio-andorrana.ts');
const legislacioCode = fs.readFileSync(legislacioPath, 'utf8');

// Extreure les normes del codi TypeScript (parsing simple)
const normes = [];
const regex = /id:\s*['"]([^'"]+)['"],\s*nom:\s*['"]([^'"]+)['"],\s*url:\s*['"]([^'"]+)['"]/g;
let match;
while ((match = regex.exec(legislacioCode)) !== null) {
  normes.push({
    id: match[1],
    nom: match[2],
    url: match[3]
  });
}

const PDFS_DIR = path.join(__dirname, '../docs/legislacio-andorrana');

// Crear directori si no existeix
if (!fs.existsSync(PDFS_DIR)) {
  fs.mkdirSync(PDFS_DIR, { recursive: true });
}

function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const client = parsedUrl.protocol === 'https:' ? https : http;
    
    const file = fs.createWriteStream(outputPath);
    
    const request = client.get(url, (response) => {
      // Seguir redireccions
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(outputPath);
        return downloadFile(response.headers.location, outputPath)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(outputPath);
        reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
    });
    
    request.on('error', (err) => {
      file.close();
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
      reject(err);
    });
    
    request.setTimeout(30000, () => {
      request.destroy();
      file.close();
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
      reject(new Error('Timeout'));
    });
  });
}

async function downloadAll() {
  console.log(`📥 Descarregant ${normes.length} PDFs de legislació andorrana...\n`);
  
  let successCount = 0;
  let errorCount = 0;
  const errors = [];
  
  for (let i = 0; i < normes.length; i++) {
    const norma = normes[i];
    const filename = `${norma.id}.pdf`;
    const outputPath = path.join(PDFS_DIR, filename);
    
    // Saltar si ja existeix
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      if (stats.size > 0) {
        console.log(`⏭️  [${i + 1}/${normes.length}] Ja existeix: ${filename}`);
        successCount++;
        continue;
      }
    }
    
    try {
      process.stdout.write(`📥 [${i + 1}/${normes.length}] Descarregant: ${norma.nom.substring(0, 50)}... `);
      await downloadFile(norma.url, outputPath);
      
      const stats = fs.statSync(outputPath);
      if (stats.size === 0) {
        throw new Error('Fitxer buit');
      }
      
      console.log(`✅ (${(stats.size / 1024).toFixed(1)} KB)`);
      successCount++;
      
      // Petita pausa per no sobrecarregar el servidor
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
      errors.push({ norma: norma.nom, error: error.message });
      errorCount++;
    }
  }
  
  console.log(`\n📊 Resum:`);
  console.log(`   ✅ Descarregats: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  
  if (errors.length > 0) {
    console.log(`\n❌ Errors detallats:`);
    errors.forEach(({ norma, error }) => {
      console.log(`   - ${norma}: ${error}`);
    });
  }
  
  console.log(`\n💡 PDFs guardats a: ${PDFS_DIR}`);
}

downloadAll().catch(console.error);
