/**
 * Script per processar text extret del PDF del Codi Civil d'Andorra
 * i generar articles en format ArticleAndorra
 * 
 * Ús:
 * node scripts/process-codi-civil-andorra.js [ruta-text.txt] [ruta-output.ts]
 * 
 * Exemple:
 * node scripts/process-codi-civil-andorra.js docs/codi-civil-andorra.txt data/codis/codi-civil/articles.ts
 */

const fs = require('fs');
const path = require('path');

const defaultTextPath = path.join(__dirname, '../docs/codi-civil-andorra.txt');
const defaultOutputPath = path.join(__dirname, '../data/codis/codi-civil/articles.ts');

const [,, inputArg, outputArg] = process.argv;
const textPath = inputArg ? path.resolve(process.cwd(), inputArg) : defaultTextPath;
const outputPath = outputArg ? path.resolve(process.cwd(), outputArg) : defaultOutputPath;

function processText() {
  try {
    // Llegeix el text extret
    if (!fs.existsSync(textPath)) {
      console.log(`❌ No s'ha trobat el fitxer de text: ${textPath}`);
      console.log(`\n💡 Per obtenir el text del PDF:`);
      console.log(`   1. Descarrega el PDF del Codi Civil d'Andorra del BOPA`);
      console.log(`   2. Extreu el text amb pdfminer o copia manualment`);
      console.log(`   3. Guarda'l a: ${textPath}`);
      return;
    }

    const text = fs.readFileSync(textPath, 'utf8');
    console.log(`✅ Text llegit (${text.length} caràcters)`);

    // Processa el text per identificar articles
    const articles = extractArticles(text);
    
    console.log(`\n✅ S'han trobat ${articles.length} articles\n`);

    // Mostra un resum
    articles.slice(0, 10).forEach(article => {
      console.log(`- ${article.numeracio}: ${article.titol.substring(0, 60)}...`);
    });
    if (articles.length > 10) {
      console.log(`... i ${articles.length - 10} més`);
    }

    // Genera el fitxer TypeScript
    generateTypeScriptFile(articles, outputPath);
    
    console.log(`\n✅ Articles generats a: ${outputPath}`);
    console.log('\n⚠️  Revisa i ajusta els articles generats abans d\'usar-los.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

function extractArticles(text) {
  const articles = [];
  const lines = text.split('\n');
  
  let currentArticle = null;
  let currentLlibre = '';
  let currentTitol = '';
  let currentCapitol = '';
  let articleId = 1;
  let collectingContent = false;

  const flushCurrentArticle = () => {
    if (currentArticle) {
      currentArticle.text_oficial = currentArticle.text_oficial.trim();
      if (currentArticle.text_oficial.length > 0) {
        articles.push(currentArticle);
      }
    }
    currentArticle = null;
    collectingContent = false;
  };

  // Detecta línies de peu de pàgina o headers
  const isHeaderFooterLine = (line) =>
    line.startsWith('BOPA') ||
    line.startsWith('Butlletí Oficial') ||
    line.includes('Principat d\'Andorra') ||
    line.match(/^\d+\s*$/); // Només números

  // Detecta Llibres (Llibre I, Llibre II, etc.)
  const llibreMatch = (line) => line.match(/^Llibre\s+([IVXLCDM]+)\.?\s*(.*)$/i);
  
  // Detecta Títols (Títol I, Títol II, etc.)
  const titolMatch = (line) => line.match(/^Títol\s+([IVXLCDM]+)\.?\s*(.*)$/i);
  
  // Detecta Capítols (Capítol I, Capítol II, etc.)
  const capitolMatch = (line) => line.match(/^Capítol\s+([IVXLCDM]+)\.?\s*(.*)$/i);

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].replace(/\f/g, ' ').trim();
    if (!line || isHeaderFooterLine(line)) {
      continue;
    }

    // Detecta Llibre
    const llibre = llibreMatch(line);
    if (llibre) {
      if (collectingContent) {
        flushCurrentArticle();
      }
      const roman = llibre[1].toUpperCase();
      const llibreTitle = llibre[2] ? llibre[2].trim() : '';
      currentLlibre = roman;
      currentTitol = '';
      currentCapitol = '';
      console.log(`📚 Llibre ${roman}${llibreTitle ? ': ' + llibreTitle : ''}`);
      continue;
    }

    // Detecta Títol
    const titol = titolMatch(line);
    if (titol) {
      if (collectingContent) {
        flushCurrentArticle();
      }
      const roman = titol[1].toUpperCase();
      const titolTitle = titol[2] ? titol[2].trim() : '';
      currentTitol = titolTitle || `Títol ${roman}`;
      currentCapitol = '';
      continue;
    }

    // Detecta Capítol
    const capitol = capitolMatch(line);
    if (capitol) {
      if (collectingContent) {
        flushCurrentArticle();
      }
      const roman = capitol[1].toUpperCase();
      const capitolTitle = capitol[2] ? capitol[2].trim() : '';
      currentCapitol = capitolTitle || `Capítol ${roman}`;
      continue;
    }

    // Detecta Article (format: Article 1, Article 412-15, etc.)
    const articleMatch = line.match(/^Article\s+(\d+(?:-\d+)?)[:\.]?\s*(.*)$/i);
    if (articleMatch) {
      flushCurrentArticle();
      
      const articleNum = articleMatch[1];
      let articleTitle = articleMatch[2] ? articleMatch[2].trim() : '';
      
      // Intenta obtenir el títol de la línia següent si no està a la mateixa línia
      if (!articleTitle && i + 1 < lines.length) {
        const nextLine = lines[i + 1].trim();
        if (nextLine && 
            !nextLine.match(/^Article\s+/i) && 
            !nextLine.match(/^Llibre\s+/i) &&
            !nextLine.match(/^Títol\s+/i) && 
            !nextLine.match(/^Capítol\s+/i) &&
            nextLine.length > 0 && 
            nextLine.length < 200 &&
            !nextLine.match(/^\d+$/)) {
          articleTitle = nextLine;
          i++; // Salta la línia del títol
        }
      }
      
      // Crea nou article en format ArticleAndorra
      currentArticle = {
        id: `cc-art-${articleNum.replace(/-/g, '-')}`,
        codi: 'civil',
        numeracio: `Article ${articleNum}`,
        llibre: currentLlibre || 'I',
        titol: currentTitol || 'Disposicions generals',
        capitol: currentCapitol || null,
        text_oficial: '',
        vigencia: '2022-12-15', // Data per defecte, ajustar segons el PDF
        modificacions: [],
        enllacos: [],
        tags: [],
        idiomes: {
          ca: '', // S'omplirà amb el text_oficial
        },
      };
      
      collectingContent = true;
      articleId++;
      continue;
    }
    
    // Si estem dins d'un article, afegeix el contingut
    if (currentArticle && collectingContent) {
      // Si trobem un nou article, llibre, títol o capítol, finalitzem
      if (line.match(/^Article\s+/i) || 
          line.match(/^Llibre\s+/i) ||
          line.match(/^Títol\s+/i) || 
          line.match(/^Capítol\s+/i)) {
        collectingContent = false;
        continue;
      }
      
      // Afegeix la línia al contingut
      if (line.length > 0) {
        currentArticle.text_oficial += line + '\n';
      }
    }
  }
  
  // Afegeix l'últim article
  if (currentArticle) {
    flushCurrentArticle();
  }
  
  // Neteja i processa els articles
  articles.forEach(article => {
    // Neteja el contingut
    article.text_oficial = article.text_oficial
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    
    // Omple idiomes.ca amb el text_oficial
    article.idiomes.ca = article.text_oficial;
    
    // Genera tags bàsics segons el títol
    if (article.titol.toLowerCase().includes('matrimoni')) {
      article.tags.push('matrimoni', 'família');
    } else if (article.titol.toLowerCase().includes('divorci')) {
      article.tags.push('divorci', 'família');
    } else if (article.titol.toLowerCase().includes('contracte')) {
      article.tags.push('contractes', 'obligacions');
    } else if (article.titol.toLowerCase().includes('propietat')) {
      article.tags.push('propietat', 'drets reals');
    }
    
    // Limita la longitud del títol
    article.titol = article.titol.substring(0, 200);
  });
  
  // Ordena per número d'article
  articles.sort((a, b) => {
    const numA = a.numeracio.match(/Article\s+(\d+)(?:-(\d+))?/);
    const numB = b.numeracio.match(/Article\s+(\d+)(?:-(\d+))?/);
    if (numA && numB) {
      const mainA = parseInt(numA[1]);
      const mainB = parseInt(numB[1]);
      if (mainA !== mainB) return mainA - mainB;
      const subA = numA[2] ? parseInt(numA[2]) : 0;
      const subB = numB[2] ? parseInt(numB[2]) : 0;
      return subA - subB;
    }
    return 0;
  });
  
  return articles;
}

function generateTypeScriptFile(articles, outputPath) {
  // Crea el directori si no existeix
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const imports = `import { ArticleAndorra } from '../types';\n\n`;
  
  const articlesCode = articles.map(article => {
    // Escapa el contingut correctament
    const textOficial = article.text_oficial
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\${/g, '\\${');
    
    const idiomesCa = article.idiomes.ca
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\${/g, '\\${');
    
    return `  {
    id: '${article.id}',
    codi: '${article.codi}',
    numeracio: '${article.numeracio}',
    llibre: '${article.llibre}',
    titol: ${JSON.stringify(article.titol)},
    capitol: ${article.capitol ? JSON.stringify(article.capitol) : 'null'},
    text_oficial: \`${textOficial}\`,
    vigencia: '${article.vigencia}',
    modificacions: ${JSON.stringify(article.modificacions)},
    enllacos: ${JSON.stringify(article.enllacos)},
    tags: ${JSON.stringify(article.tags)},
    idiomes: {
      ca: \`${idiomesCa}\`,
    },
  }`;
  }).join(',\n');
  
  const content = `${imports}export const articlesCodiCivil: ArticleAndorra[] = [\n${articlesCode}\n];\n`;
  
  fs.writeFileSync(outputPath, content, 'utf8');
}

// Executa el processament
processText();

