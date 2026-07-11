/**
 * Script per importar sentències del TC des de constiandorra/analisi_jurisprudencia
 * Converteix fitxers .md a entrades jurisprudenciaDatabase
 * 
 * Ús: npx tsx scripts/importar-sentencies-tc.ts
 */

import fs from 'fs';
import path from 'path';

interface SentenciaRaw {
  causa: string;
  title: string;
  tipus: string;
  origen?: string;
  data_descarrega?: string;
  content: string;
}

/**
 * Parse YAML frontmatter manualment (sense dependències)
 */
function parseFrontmatter(fileContent: string): { data: Record<string, any>; content: string } {
  const lines = fileContent.split('\n');
  
  if (lines[0].trim() !== '---') {
    return { data: {}, content: fileContent };
  }
  
  let endIdx = 1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      endIdx = i;
      break;
    }
  }
  
  const yamlLines = lines.slice(1, endIdx);
  const data: Record<string, any> = {};
  
  for (const line of yamlLines) {
    const match = line.match(/^([^:]+):\s*"?(.+?)"?$/);
    if (match) {
      const [, key, value] = match;
      data[key.trim()] = value.trim().replace(/^"(.*)"$/, '$1');
    }
  }
  
  const content = lines.slice(endIdx + 1).join('\n');
  return { data, content };
}

/**
 * Extreu articles mencionats al text d'una sentència
 * Busca patrons com "article 1", "article 10", "art. 1", etc.
 */
function extractArticlesFromText(text: string): string[] {
  const articles = new Set<string>();
  
  // Pattern: "article XX", "art. XX", "l'article XX", etc.
  const patterns = [
    /article\s+(\d+)/gi,
    /art\.\s+(\d+)/gi,
    /l'article\s+(\d+)/gi,
    /els articles\s+([\d\s,i]+)/gi,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const nums = match[1].match(/\d+/g);
      if (nums) {
        nums.forEach(num => {
          articles.add(`CONST_${String(num).padStart(3, '0')}`);
        });
      }
    }
  }

  return Array.from(articles);
}

/**
 * Extreu un resum breu de la sentència
 */
function extractResume(content: string): string {
  // Agafa els primers 300 caràcters o fins al primer punt
  const text = content.replace(/^#+\s+/gm, '').trim();
  const sentences = text.split(/[.!?]+/);
  let resume = '';
  
  for (const sentence of sentences) {
    if (resume.length < 250) {
      resume += sentence.trim() + '. ';
    } else {
      break;
    }
  }
  
  return resume.slice(0, 300).trim();
}

/**
 * Converteix un fitxer markdown de sentència a entrada jurisprudenciaDatabase
 */
function convertSentenciaToEntry(filePath: string): any {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = parseFrontmatter(fileContent);

  const sentencia = data as any;
  
  // Extraer articles mencionats
  const articlesAfectats = extractArticlesFromText(content);
  
  // Generar resum
  const resum = extractResume(content);
  
  return {
    id: `TC-${sentencia.causa}`,
    tribunal: "Tribunal Constitucional d'Andorra",
    numero: sentencia.causa,
    data: sentencia.data_descarrega || '2026-01-01',
    titol: sentencia.title,
    resum: resum,
    articles_afectats: articlesAfectats,
    codi: 'constitucio',
    tags: ['tribunal constitucional', 'empara', 'inconstitucionalitat', ...articlesAfectats.map(a => `article-${a}`)]
  };
}

async function main() {
  const sentenciesDir = path.join(
    process.cwd(),
    '..',
    '..',
    '..',
    'constiandorra',
    'analisi_jurisprudencia',
    'sentencies'
  );

  if (!fs.existsSync(sentenciesDir)) {
    console.error(`❌ Directory not found: ${sentenciesDir}`);
    console.log('Expected path:', sentenciesDir);
    process.exit(1);
  }

  const files = fs.readdirSync(sentenciesDir).filter(f => f.endsWith('.md'));
  console.log(`📚 Found ${files.length} sentencies`);

  const entries: any[] = [];
  const errors: string[] = [];

  for (const file of files) {
    try {
      const filePath = path.join(sentenciesDir, file);
      const entry = convertSentenciaToEntry(filePath);
      entries.push(entry);
      console.log(`✅ ${file} -> ${entry.id}`);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      errors.push(`${file}: ${msg}`);
      console.error(`❌ ${file}: ${msg}`);
    }
  }

  // Generate TypeScript code
  const tsCode = `// AUTO-GENERATED: Imported from constiandorra/analisi_jurisprudencia
// Generated on ${new Date().toISOString()}
// Do NOT edit manually; run scripts/importar-sentencies-tc.ts instead

export const jurisprudenciaImportedTC = [
${entries.map(e => `  {
    id: ${JSON.stringify(e.id)},
    tribunal: ${JSON.stringify(e.tribunal)},
    numero: ${JSON.stringify(e.numero)},
    data: ${JSON.stringify(e.data)},
    titol: ${JSON.stringify(e.titol)},
    resum: ${JSON.stringify(e.resum)},
    articles_afectats: [${e.articles_afectats.map((a: string) => JSON.stringify(a)).join(', ')}],
    codi: ${JSON.stringify(e.codi)},
    tags: [${e.tags.map((t: string) => JSON.stringify(t)).join(', ')}]
  }`).join(',\n')}
];
`;

  // Save to file
  const outputPath = path.join(process.cwd(), 'data', 'jurisprudencia-tc-imported.ts');
  fs.writeFileSync(outputPath, tsCode);
  
  console.log(`\n📝 Generated: ${outputPath}`);
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Imported: ${entries.length}`);
  console.log(`   ❌ Errors: ${errors.length}`);
  console.log(`   Total articles found: ${new Set(entries.flatMap(e => e.articles_afectats)).size}`);

  if (errors.length > 0) {
    console.log(`\nErrors:`);
    errors.forEach(e => console.log(`  - ${e}`));
  }
}

main().catch(console.error);
