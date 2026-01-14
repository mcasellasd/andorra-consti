/**
 * Script per processar text extret del PDF i generar articles
 * 
 * Ús:
 * node scripts/process-text-to-articles.js
 */

const fs = require('fs');
const path = require('path');

const defaultTextPath = path.join(__dirname, '../docs/extracted-text.txt');
const defaultOutputPath = path.join(__dirname, '../data/chapters/extracted-articles.ts');

const [,, inputArg, outputArg] = process.argv;
const textPath = inputArg ? path.resolve(process.cwd(), inputArg) : defaultTextPath;
const outputPath = outputArg ? path.resolve(process.cwd(), outputArg) : defaultOutputPath;

function processText() {
  try {
    // Llegeix el text extret
    if (!fs.existsSync(textPath)) {
      console.log(`❌ No s'ha trobat el fitxer de text: ${textPath}`);
      return;
    }

    const text = fs.readFileSync(textPath, 'utf8');
    console.log(`✅ Text llegit (${text.length} caràcters)`);

    // Processa el text per identificar articles
    const articles = extractArticles(text);
    
    console.log(`\n✅ S'han trobat ${articles.length} articles\n`);

    // Mostra un resum
    articles.slice(0, 10).forEach(article => {
      console.log(`- ${article.number}: ${article.title.substring(0, 60)}...`);
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
  let currentTitle = null;
  let currentTitol = '';
  let currentChapter = '';
  let currentSection = '';
  let currentDisposicioLabel = '';
  let articleId = 1;
  let collectingContent = false;

  const flushCurrentArticle = () => {
    if (currentArticle) {
      currentArticle.content = currentArticle.content.trim();
      if (currentArticle.content.length > 0) {
        articles.push(currentArticle);
      }
    }
    currentArticle = null;
    collectingContent = false;
  };
  const isFooterLine = (line) =>
    line.startsWith('DL B') ||
    line.startsWith('Núm.') ||
    line.includes('gencat.cat/dogc') ||
    line.includes('Diari Oficial de la Generalitat de Catalunya') ||
    line.includes('CVE-DOGC');

  const buildSectionPath = (...parts) => parts.filter(Boolean).join(' - ');

  const getNextDescriptiveLine = (currentIndex) => {
    for (let j = currentIndex + 1; j < lines.length; j++) {
      const raw = lines[j].replace(/\f/g, ' ').trim();
      if (!raw) {
        continue;
      }
      if (
        isFooterLine(raw) ||
        /^Títol\s+/i.test(raw) ||
        /^Capítol\s+/i.test(raw) ||
        /^(Secció|Subsecció)\s+/i.test(raw) ||
        /^Article\s+/i.test(raw) ||
        /^Disposicions?\s+/i.test(raw.toLowerCase())
      ) {
        return null;
      }
      return { text: raw.replace(/\s+/g, ' '), index: j };
    }
    return null;
  };

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].replace(/\f/g, ' ').trim();
    if (!line) {
      continue;
    }

    if (isFooterLine(line)) {
      continue;
    }
    
    const normalizedLine = line.replace(/\s+/g, ' ').trim().toLowerCase();
    if (normalizedLine.startsWith('seguint el procés d’elaboració del codi civil')) {
      break;
    }
    if (normalizedLine === 'disposicions addicionals' ||
        normalizedLine === 'disposicions transitòries' ||
        normalizedLine === 'disposicions derogatòries' ||
        normalizedLine === 'disposicions finals') {
      currentTitol = line.replace(/\s+/g, ' ').trim();
      currentChapter = '';
      currentSection = currentTitol;
      const base = normalizedLine.split(' ')[1];
      const labelMap = {
        'addicionals': 'Disposició addicional',
        'transitòries': 'Disposició transitòria',
        'derogatòries': 'Disposició derogatòria',
        'finals': 'Disposició final',
      };
      currentDisposicioLabel = labelMap[base] || 'Disposició';
      flushCurrentArticle();
      continue;
    }
    
    const ordinalMatch = line.match(/^(Primera|Segona|Tercera|Quarta|Cinquena|Sisena|Setena|Vuitena|Novena|Desena)\.\s*(.*)$/i);
    if (ordinalMatch && currentDisposicioLabel) {
      flushCurrentArticle();
      const ordinal = ordinalMatch[1].toLowerCase();
      const remainder = ordinalMatch[2] ? ordinalMatch[2].trim().replace(/\s+/g, ' ') : '';
      const titleText = remainder || '';
      currentArticle = {
        id: articleId.toString(),
        number: `${currentDisposicioLabel} ${ordinal}`,
        title: titleText || `${currentDisposicioLabel} ${ordinal}`,
        section: currentSection || currentTitol || currentDisposicioLabel,
        content: '',
        summary: '',
      };
      collectingContent = true;
      articleId++;
      continue;
    }
    
    // Ignora línies buides, números sols, o "Portal Jurídic"
    if (!line || 
        line.match(/^\d+$/) || 
        line === 'Portal Jurídic de Catalunya' ||
        line.match(/^Portal Jurídic/)) {
      continue;
    }
    
    // Detecta Títols (Títol I, Títol II, etc.)
    const titolMatch = line.match(/^Títol\s+([IVXLCDM]+)\.?\s*(.*)$/i);
    if (titolMatch) {
      if (collectingContent) {
        flushCurrentArticle();
      }
      const roman = titolMatch[1].toUpperCase();
      let titleText = titolMatch[2] ? titolMatch[2].trim().replace(/\s+/g, ' ') : '';
      if (!titleText) {
        const nextInfo = getNextDescriptiveLine(i);
        if (nextInfo) {
          titleText = nextInfo.text;
          i = nextInfo.index;
        }
      }
      currentTitol = `Títol ${roman}${titleText ? ': ' + titleText : ''}`;
      currentChapter = '';
      currentSection = currentTitol;
      currentDisposicioLabel = '';
      continue;
    }
    
    // Detecta Capítols (Capítol I, Capítol II, etc.)
    const chapterMatch = line.match(/^Capítol\s+([IVXLCDM]+)\.?\s*(.*)$/i);
    if (chapterMatch) {
      if (collectingContent) {
        flushCurrentArticle();
      }
      const roman = chapterMatch[1].toUpperCase();
      let chapterTitle = chapterMatch[2] ? chapterMatch[2].trim().replace(/\s+/g, ' ') : '';
      if (!chapterTitle) {
        const nextInfo = getNextDescriptiveLine(i);
        if (nextInfo) {
          chapterTitle = nextInfo.text;
          i = nextInfo.index;
        }
      }
      currentChapter = `Capítol ${roman}${chapterTitle ? ': ' + chapterTitle : ''}`;
      currentSection = buildSectionPath(currentTitol, currentChapter);
      currentDisposicioLabel = '';
      continue;
    }
    
    // Detecta Seccions
    const sectionMatch = line.match(/^(Secció|Subsecció)\s+(primera|segona|tercera|quarta|quinta|sexta|primera|segunda|tercera|quarta|quinta|sexta)\s*(.+)$/i);
    if (sectionMatch) {
      if (collectingContent) {
        flushCurrentArticle();
      }
      const sectionType = sectionMatch[1];
      const sectionNum = sectionMatch[2];
      let rawSectionTitle = sectionMatch[3] || '';
      let sectionTitle = rawSectionTitle.trim().replace(/^[\s\.\-:]+/, '');
      if (!sectionTitle) {
        const nextInfo = getNextDescriptiveLine(i);
        if (nextInfo) {
          sectionTitle = nextInfo.text;
          i = nextInfo.index;
        }
      }
      const formattedNum = sectionNum ? sectionNum.charAt(0).toUpperCase() + sectionNum.slice(1) : '';
      const sectionLabel = `${sectionType} ${formattedNum}${sectionTitle ? ': ' + sectionTitle : ''}`;
      currentSection = buildSectionPath(currentTitol, currentChapter, sectionLabel);
      continue;
    }
    
    // Detecta inici d'article (format: Article 511-1)
    const articleMatch = line.match(/^Article\s+(\d{3}-\d+)(?:\s*[\.\-:]\s*(.+))?$/);
    if (articleMatch) {
      flushCurrentArticle();
      
      // Llegeix el títol de la línia següent
      currentTitle = articleMatch[2] ? articleMatch[2].trim() : null;
      if (!currentTitle) {
        if (i + 1 < lines.length) {
          const nextLine = lines[i + 1].trim();
          // Si la següent línia no és un altre article ni un títol/capítol/secció, és el títol
          if (!nextLine.match(/^Article\s+/) && 
              !nextLine.match(/^Títol\s+/) && 
              !nextLine.match(/^Capítol\s+/) &&
              !nextLine.match(/^(Secció|Subsecció)\s+/) &&
              nextLine.length > 0 && 
              nextLine.length < 300 &&
              !nextLine.match(/^\d+$/) &&
              nextLine !== 'Portal Jurídic de Catalunya') {
            currentTitle = nextLine;
            i++; // Salta la línia del títol
          }
        }
      }
      // Comprova si hi ha una línia de continuació del títol (per exemple, tall de línia)
      if (currentTitle && i + 1 < lines.length) {
        const continuationLine = lines[i + 1].trim();
        if (continuationLine &&
            !continuationLine.match(/^Article\s+/i) &&
            !continuationLine.match(/^Títol\s+/i) &&
            !continuationLine.match(/^Capítol\s+/i) &&
            !continuationLine.match(/^(Secció|Subsecció)\s+/i) &&
            !continuationLine.match(/^\d/) &&
            continuationLine[0] === continuationLine[0].toLowerCase()) {
          currentTitle = `${currentTitle} ${continuationLine}`;
          i++;
        }
      }
      
      // Crea nou article
      currentArticle = {
        id: articleId.toString(),
        number: `Article ${articleMatch[1]}`,
        title: currentTitle || `Article ${articleMatch[1]}`,
        section: currentSection || currentChapter || currentTitol || 'Disposicions generals',
        content: '',
        summary: '',
      };
      
      collectingContent = true;
      articleId++;
      continue;
    }
    
    // Si estem dins d'un article, afegeix el contingut
    if (currentArticle && collectingContent) {
      // Si trobem un nou article, títol, capítol o secció, finalitzem la recollida de contingut
      if (line.match(/^Article\s+/) || 
          line.match(/^Títol\s+/) || 
          line.match(/^Capítol\s+/) ||
          line.match(/^(Secció|Subsecció)\s+/)) {
        collectingContent = false;
        continue;
      }
      
      // Afegeix la línia al contingut
      if (line.length > 0) {
        currentArticle.content += line + '\n';
      }
    }
  }
  
  // Afegeix l'últim article
  if (currentArticle) {
    flushCurrentArticle();
  }
  
  // Neteja el contingut dels articles
  articles.forEach(article => {
    // Elimina línies buides excessives
    article.content = article.content.replace(/\n{3,}/g, '\n\n');
    // Elimina espais al principi i final
    article.content = article.content.trim();
    // Limita la longitud del títol
    article.title = article.title.substring(0, 200);
    
    // Genera un resum automàtic si no en té
    if (!article.summary && article.content.length > 0) {
      const firstSentence = article.content.split('\n')[0].substring(0, 150);
      article.summary = firstSentence + (firstSentence.length < article.content.length ? '...' : '');
    }
  });
  
  // Ordena per número d'article (considerant el format 511-1) i manté l'ordre original per als altres casos
  articles.forEach((article, index) => {
    article.originalIndex = index;
  });
  articles.sort((a, b) => {
    const numA = a.number.match(/(\d+)-(\d+)/);
    const numB = b.number.match(/(\d+)-(\d+)/);
    if (numA && numB) {
      const titleA = parseInt(numA[1]);
      const titleB = parseInt(numB[1]);
      if (titleA !== titleB) return titleA - titleB;
      return parseInt(numA[2]) - parseInt(numB[2]);
    }
    if (!numA && !numB) {
      return (a.originalIndex ?? 0) - (b.originalIndex ?? 0);
    }
    if (numA) return -1;
    if (numB) return 1;
    return (a.originalIndex ?? 0) - (b.originalIndex ?? 0);
  });
  
  // Reassigna IDs seqüencials
  articles.forEach((article, index) => {
    article.id = (index + 1).toString();
  });
  
  return articles;
}

function generateTypeScriptFile(articles, outputPath) {
  const imports = `import { Article } from '../articles';\n\n`;
  
  const articlesCode = articles.map(article => {
    // Escapa el contingut correctament per JSON
    const content = article.content
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\${/g, '\\${');
    
    return `  {
    id: '${article.id}',
    number: '${article.number}',
    title: ${JSON.stringify(article.title)},
    section: ${JSON.stringify(article.section)},
    content: \`${content}\`,
    summary: ${article.summary ? JSON.stringify(article.summary) : 'undefined'},
  }`;
  }).join(',\n');
  
  const content = `${imports}export const extractedArticles: Article[] = [\n${articlesCode}\n];\n`;
  
  fs.writeFileSync(outputPath, content, 'utf8');
}

// Executa el processament
processText();
