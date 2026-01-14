/**
 * Script per extreure articles del PDF del Llibre Cinquè
 * 
 * Ús:
 * node scripts/extract-pdf-articles.js
 */

const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const pdfPath = path.join(__dirname, '../docs/llibre cinquè.pdf');
const outputPath = path.join(__dirname, '../data/chapters/extracted-articles.ts');

async function extractArticles() {
  try {
    console.log('Llegint el PDF...');
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    
    console.log(`PDF llegit. Total de pàgines: ${data.numpages}`);
    console.log(`Extreient text...`);
    
    const text = data.text;
    
    // Guarda el text extret per depuració
    fs.writeFileSync(
      path.join(__dirname, '../docs/extracted-text.txt'),
      text,
      'utf8'
    );
    
    console.log('Text extret i guardat a docs/extracted-text.txt');
    console.log('\nPrimeres 500 paraules del text extret:');
    console.log(text.substring(0, 500));
    console.log('\n...\n');
    
    // Processa el text per identificar articles
    const articles = parseArticles(text);
    
    console.log(`\nS'han trobat ${articles.length} articles`);
    
    // Genera el fitxer TypeScript
    generateTypeScriptFile(articles, outputPath);
    
    console.log(`\nArticles generats a: ${outputPath}`);
    console.log('\nRevisa el fitxer i ajusta\'l segons sigui necessari.');
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

function parseArticles(text) {
  const articles = [];
  
  // Patrons per identificar articles
  // Ajusta aquests patrons segons el format del teu PDF
  const articlePattern = /Article\s+(\d+)[:\.]?\s+(.+?)(?=Article\s+\d+|$)/gis;
  
  let match;
  let articleId = 1;
  
  while ((match = articlePattern.exec(text)) !== null) {
    const number = match[1];
    const content = match[2].trim();
    
    // Intenta extreure el títol (primeres línies)
    const lines = content.split('\n').filter(l => l.trim());
    const title = lines[0] || `Article ${number}`;
    const articleContent = lines.slice(1).join('\n').trim();
    
    // Intenta identificar el capítol (busca "Capítol" al voltant)
    const chapterMatch = text.substring(0, match.index).match(/Capítol\s+[IVX]+[:\s]+([^\n]+)/i);
    const section = chapterMatch 
      ? `Capítol ${chapterMatch[0].match(/Capítol\s+([IVX]+)/i)?.[1] || 'I'}: ${chapterMatch[1].trim()}`
      : 'Capítol I: Disposicions Generals';
    
    articles.push({
      id: articleId.toString(),
      number: `Article ${number}`,
      title: title.substring(0, 100), // Limita la longitud del títol
      section: section,
      content: articleContent || content,
      summary: '', // S'ha d'omplir manualment
    });
    
    articleId++;
  }
  
  // Si no s'han trobat articles amb el patró, intenta un altre mètode
  if (articles.length === 0) {
    console.log('No s\'han trobat articles amb el patró estàndard. Intentant mètode alternatiu...');
    
    // Divideix per línies i busca articles
    const lines = text.split('\n');
    let currentArticle = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Detecta inici d'article
      const articleMatch = line.match(/^Article\s+(\d+)[:\.]?\s*(.+)$/i);
      if (articleMatch) {
        // Guarda l'article anterior si existeix
        if (currentArticle) {
          articles.push(currentArticle);
        }
        
        // Crea nou article
        currentArticle = {
          id: articles.length + 1,
          number: `Article ${articleMatch[1]}`,
          title: articleMatch[2] || `Article ${articleMatch[1]}`,
          section: 'Capítol I: Disposicions Generals', // S'ha d'ajustar manualment
          content: '',
          summary: '',
        };
      } else if (currentArticle && line) {
        // Afegeix contingut a l'article actual
        currentArticle.content += line + '\n';
      }
    }
    
    // Afegeix l'últim article
    if (currentArticle) {
      articles.push(currentArticle);
    }
  }
  
  return articles;
}

function generateTypeScriptFile(articles, outputPath) {
  const imports = `import { Article } from '../articles';\n\n`;
  
  const articlesCode = articles.map(article => {
    return `  {
    id: '${article.id}',
    number: '${article.number}',
    title: ${JSON.stringify(article.title)},
    section: ${JSON.stringify(article.section)},
    content: ${JSON.stringify(article.content)},
    summary: ${article.summary ? JSON.stringify(article.summary) : 'undefined'},
  }`;
  }).join(',\n');
  
  const content = `${imports}export const extractedArticles: Article[] = [\n${articlesCode}\n];\n`;
  
  fs.writeFileSync(outputPath, content, 'utf8');
}

// Executa l'extracció
extractArticles();

