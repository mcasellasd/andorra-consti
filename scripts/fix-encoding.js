/**
 * Eina ràpida per arreglar text mal codificat (per exemple, seqüències tipus "clÃ usules")
 *
 * Ús:
 *   node scripts/fix-encoding.js input.jsonl output.jsonl
 *
 * El script interpreta el fitxer d'entrada com a text mal decodificat en UTF-8
 * i prova de recuperar la codificació correcta aplicant encode('latin1') + decode('utf8').
 */

const fs = require('fs');
const path = require('path');

const [, , inputPath, outputPath] = process.argv;

if (!inputPath || !outputPath) {
  console.error('❌ Cal indicar fitxer d’entrada i de sortida');
  console.error('Exemple: node scripts/fix-encoding.js data/original.jsonl data/fixat.jsonl');
  process.exit(1);
}

const absoluteInput = path.resolve(process.cwd(), inputPath);
const absoluteOutput = path.resolve(process.cwd(), outputPath);

if (!fs.existsSync(absoluteInput)) {
  console.error(`❌ No s’ha trobat el fitxer d’entrada: ${absoluteInput}`);
  process.exit(1);
}

try {
  const rawContent = fs.readFileSync(absoluteInput, 'utf8');
  const fixedContent = Buffer.from(rawContent, 'utf8').toString('latin1');
  const redecodedContent = Buffer.from(fixedContent, 'latin1').toString('utf8');

  fs.writeFileSync(absoluteOutput, redecodedContent, 'utf8');
  console.log(`✅ Fitxer generat a: ${absoluteOutput}`);
  console.log('Pots revisar-lo i, si cal, substituir-lo pel nou fitxer corregit.');
} catch (error) {
  console.error('❌ Error arreglant la codificació:', error);
  process.exit(1);
}


