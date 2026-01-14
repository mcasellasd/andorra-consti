/**
 * Script per processar text extret del PDF de la Constitució d'Andorra
 * i generar articles en format ArticleAndorra
 * 
 * La Constitució té una estructura diferent als codis:
 * - Articles numerats (Article 1, Article 2, etc.)
 * - Títols (Títol I, Títol II, etc.) sense llibres
 * - Capítols dins dels títols
 * 
 * Ús:
 * node scripts/process-constitucio-andorra.js [ruta-text.txt] [ruta-output.ts]
 * 
 * Exemple:
 * node scripts/process-constitucio-andorra.js docs/constitucio-andorra.txt data/codis/constitucio/articles.ts
 */

const fs = require('fs');
const path = require('path');

const defaultTextPath = path.join(__dirname, '../docs/constitucio-andorra.txt');
const defaultOutputPath = path.join(__dirname, '../data/codis/constitucio/articles.ts');

const [,, inputArg, outputArg] = process.argv;
const textPath = inputArg ? path.resolve(process.cwd(), inputArg) : defaultTextPath;
const outputPath = outputArg ? path.resolve(process.cwd(), outputArg) : defaultOutputPath;

function processText() {
  try {
    // Llegeix el text extret
    if (!fs.existsSync(textPath)) {
      console.log(`❌ No s'ha trobat el fitxer de text: ${textPath}`);
      console.log(`\n💡 Per obtenir el text del PDF:`);
      console.log(`   node scripts/extract-pdf-text.js "docs/Constitucio dAndorra  Catala.pdf" docs/constitucio-andorra.txt`);
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
    line.match(/^\d+\s*$/) || // Només números
    line.match(/^Pàgina\s+\d+/i) ||
    line.match(/^Constitució\s+d'Andorra/i);
  
  // Detecta Preàmbul
  const preambulMatch = (line) => line.match(/^Preàmbul/i);
  
  // Detecta Títols (Títol I, Títol II, etc.)
  const titolMatch = (line) => line.match(/^Títol\s+([IVXLCDM]+)\.?\s*(.*)$/i);
  
  // Detecta Capítols (Capítol I, Capítol II, etc.)
  const capitolMatch = (line) => line.match(/^Capítol\s+([IVXLCDM]+)\.?\s*(.*)$/i);

  // Detecta Seccions (Secció primera, Secció segona, etc.)
  const seccioMatch = (line) => line.match(/^(Secció|Secció)\s+(primera|segona|tercera|quarta|quinta|sexta|setena|vuitena|novena|desena|Primera|Segona|Tercera|Quarta|Quinta|Sexta|Setena|Vuitena|Novena|Desena)\.?\s*(.*)$/i);

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].replace(/\f/g, ' ').trim();
    if (!line || isHeaderFooterLine(line)) {
      continue;
    }

    // Detecta Preàmbul
    if (preambulMatch(line)) {
      if (collectingContent) {
        flushCurrentArticle();
      }
      currentTitol = 'Preàmbul';
      currentCapitol = '';
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
      console.log(`📚 ${currentTitol}`);
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

    // Detecta Secció
    const seccio = seccioMatch(line);
    if (seccio) {
      if (collectingContent) {
        flushCurrentArticle();
      }
      const seccioNum = seccio[2].toLowerCase();
      const seccioTitle = seccio[3] ? seccio[3].trim() : '';
      currentCapitol = seccioTitle || `Secció ${seccioNum}`;
      continue;
    }

    // Detecta Article (format: Article 1, Article 2, etc.)
    // La Constitució pot tenir formats com: "Article 1", "Art. 1", "Article 1.", etc.
    const articleMatch = line.match(/^(Article|Art\.?)\s+(\d+)[:\.]?\s*(.*)$/i);
    if (articleMatch) {
      flushCurrentArticle();
      
      const articleNum = articleMatch[2];
      let articleTitle = articleMatch[3] ? articleMatch[3].trim() : '';
      
      // Intenta obtenir el títol de la línia següent si no està a la mateixa línia
      if (!articleTitle && i + 1 < lines.length) {
        const nextLine = lines[i + 1].trim();
        if (nextLine && 
            !nextLine.match(/^(Article|Art\.?)\s+/i) && 
            !nextLine.match(/^Títol\s+/i) && 
            !nextLine.match(/^Capítol\s+/i) &&
            !nextLine.match(/^(Secció|Secció)\s+/i) &&
            nextLine.length > 0 && 
            nextLine.length < 200 &&
            !nextLine.match(/^\d+$/) &&
            !isHeaderFooterLine(nextLine)) {
          articleTitle = nextLine;
          i++; // Salta la línia del títol
        }
      }
      
      // Crea nou article en format ArticleAndorra
      // La Constitució no té "llibre", utilitzem "Constitució" com a identificador
      currentArticle = {
        id: `const-art-${articleNum}`,
        codi: 'constitucio',
        numeracio: `Article ${articleNum}`,
        llibre: 'Constitució', // La Constitució no té llibres, utilitzem aquest camp per identificar-la
        titol: currentTitol || 'Preàmbul',
        capitol: currentCapitol || null,
        text_oficial: '',
        vigencia: '1993-05-04', // Data d'aprovació de la Constitució d'Andorra
        modificacions: [],
        enllacos: [],
        tags: ['constitució', 'dret constitucional'],
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
      // Si trobem un nou article, títol, capítol o secció, finalitzem
      if (line.match(/^(Article|Art\.?)\s+/i) || 
          line.match(/^Títol\s+/i) || 
          line.match(/^Capítol\s+/i) ||
          line.match(/^(Secció|Secció)\s+/i) ||
          preambulMatch(line)) {
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
    
    // Genera tags segons el títol
    const titolLower = article.titol.toLowerCase();
    if (titolLower.includes('drets') || titolLower.includes('derechos')) {
      article.tags.push('drets fonamentals');
    } else if (titolLower.includes('organització') || titolLower.includes('organización')) {
      article.tags.push('organització territorial');
    } else if (titolLower.includes('reform')) {
      article.tags.push('reforma constitucional');
    }
    
    // Limita la longitud del títol
    article.titol = article.titol.substring(0, 200);
  });
  
  // Ordena per número d'article
  articles.sort((a, b) => {
    const numA = a.numeracio.match(/Article\s+(\d+)/);
    const numB = b.numeracio.match(/Article\s+(\d+)/);
    if (numA && numB) {
      return parseInt(numA[1]) - parseInt(numB[1]);
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
  
  const content = `${imports}export const articlesConstitucio: ArticleAndorra[] = [\n${articlesCode}\n];\n`;
  
  fs.writeFileSync(outputPath, content, 'utf8');
}

// Executa el processament
processText();

