/**
 * Script per generar traduccions d'articles legals amb OpenAI
 * 
 * Ús:
 *   node scripts/generate-translations.js --lang=es --start=1 --end=10
 *   node scripts/generate-translations.js --lang=fr --file=data/codis/codi-civil/articles.ts
 */

const fs = require('fs');
const path = require('path');

// Carregar variables d'entorn des de .env.local si existeix
try {
  require('dotenv').config({ path: path.join(__dirname, '../.env.local') });
} catch (e) {
  // dotenv no disponible, continuar
}

// Configuració
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Parse arguments
const args = process.argv.slice(2);
const lang = args.find(arg => arg.startsWith('--lang='))?.split('=')[1] || 'es';
const start = parseInt(args.find(arg => arg.startsWith('--start='))?.split('=')[1] || '1');
const end = parseInt(args.find(arg => arg.startsWith('--end='))?.split('=')[1] || '100');
const filePath = args.find(arg => arg.startsWith('--file='))?.split('=')[1] || 'data/codis/codi-civil/articles.ts';

const langNames = {
  es: 'castellà',
  fr: 'francès'
};

/**
 * Genera traducció amb OpenAI
 */
async function translateText(text, targetLang, context = 'article') {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY no està configurada. Configura-la amb: export OPENAI_API_KEY="tu-api-key"');
  }

  const langName = langNames[targetLang] || targetLang;
  
  let prompt = '';
  let maxTokens = 4000;
  
  if (context === 'article') {
    prompt = `Ets un traductor jurídic professional. Tradueix aquest article legal de la legislació andorrana del català al ${langName}.

IMPORTANT:
- Mantén la terminologia jurídica precisa i oficial
- Conserva la numeració i estructura exacta de l'article
- Utilitza terminologia legal consistent amb la legislació andorrana
- No afegeixis cap comentari, només la traducció

Article a traduir:
${text}`;
  } else if (context === 'title') {
    prompt = `Ets un traductor jurídic professional. Tradueix aquest títol d'article legal del català al ${langName}.

IMPORTANT:
- Mantén la terminologia jurídica precisa
- Conserva el significat exacte
- No afegeixis cap comentari, només la traducció

Títol a traduir:
${text}`;
    maxTokens = 200;
  } else if (context === 'chapter') {
    prompt = `Ets un traductor jurídic professional. Tradueix aquest títol de capítol legal del català al ${langName}.

IMPORTANT:
- Mantén la terminologia jurídica precisa
- Conserva el significat exacte
- No afegeixis cap comentari, només la traducció

Capítol a traduir:
${text}`;
    maxTokens = 200;
  } else if (context === 'tags') {
    prompt = `Ets un traductor jurídic professional. Tradueix aquestes etiquetes jurídiques del català al ${langName}.

IMPORTANT:
- Traduïx cada etiqueta mantent la terminologia jurídica precisa
- Retorna només les etiquetes traduïdes separades per comes
- No afegeixis cap comentari ni numeració, només les etiquetes separades per comes

Etiquetes a traduir (separades per comes):
${Array.isArray(text) ? text.join(', ') : text}`;
    maxTokens = 500;
  }

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `Ets un traductor jurídic expert en legislació andorrana. Traduïx textos legals mantenint la precisió jurídica i la terminologia oficial.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3, // Baixa temperatura per mantenir precisió
        max_tokens: maxTokens
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message || JSON.stringify(error)}`);
    }

    const data = await response.json();
    const result = data.choices[0].message.content.trim();
    
    // Per tags, separar per comes i netejar
    if (context === 'tags') {
      return result.split(',').map(t => t.trim()).filter(t => t.length > 0);
    }
    
    return result;
  } catch (error) {
    console.error('Error traduint:', error.message);
    throw error;
  }
}

/**
 * Llegeix i parseja el fitxer d'articles
 * Suporta tant format JSON dins TypeScript com format amb cometes simples
 */
function readArticlesFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Fitxer no trobat: ${fullPath}`);
  }

  // Llegir el fitxer
  const content = fs.readFileSync(fullPath, 'utf-8');
  
  // Trobar l'export d'articles (buscar articlesCodiCivil, articlesConstitucio, etc.)
  // Suportar dos formats:
  // 1. export const articles: ArticleAndorra[] = [...];
  // 2. export const articles = [...];
  
  let exportMatch = content.match(/export\s+const\s+(\w+)\s*:\s*\w+\[\]\s*=\s*\[([\s\S]*)\];/);
  
  if (!exportMatch) {
    // Intentar altre format sense tipus
    exportMatch = content.match(/export\s+const\s+(\w+)\s*=\s*\[([\s\S]*)\];/);
    if (!exportMatch) {
      throw new Error('No s\'ha trobat l\'export d\'articles al fitxer');
    }
  }
  
  const match = exportMatch;

  let arrayContent = match[2].trim();
  
  // Intentar parsejar com JSON (per constitució que té format JSON)
  // El format és: export const articlesConstitucio: ArticleAndorra[] = [{...}, {...}];
  
  // Primer intent: usar vm per evaluar el JSON (funciona millor amb salts de línia dins strings)
  try {
    const vm = require('vm');
    const context = {};
    const articles = vm.runInNewContext(arrayContent, context);
    
    if (Array.isArray(articles) && articles.length > 0 && articles[0] && typeof articles[0].id === 'string') {
      return {
        articles: articles.map(art => ({
          id: art.id,
          text_oficial: art.text_oficial,
          titol: art.titol,
          capitol: art.capitol,
          tags: art.tags,
          _fullArticle: art
        })),
        content,
        exportName: match[1],
        isJSONFormat: true
      };
    }
  } catch (e) {
    // VM ha fallat, provar amb JSON.parse
  }
  
  // Segon intent: parsejar directament com JSON
  try {
    const articles = JSON.parse(arrayContent);
    if (Array.isArray(articles) && articles.length > 0) {
      return {
        articles: articles.map(art => ({
          id: art.id,
          text_oficial: art.text_oficial,
          titol: art.titol,
          capitol: art.capitol,
          tags: art.tags,
          _fullArticle: art
        })),
        content,
        exportName: match[1],
        isJSONFormat: true
      };
    }
  } catch (e2) {
    // No funciona, continuar amb parsing manual
  }

  // Parsejar manualment (per codi civil que pot tenir format diferent)
  const articles = [];
  let braceCount = 0;
  let inArticle = false;
  let currentArticleText = '';
  let articleId = null;

  const lines = arrayContent.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detectar inici d'article
    if (line.trim().startsWith('{') && !inArticle) {
      inArticle = true;
      currentArticleText = line;
      braceCount = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      
      // Buscar ID
      const idMatch = line.match(/["']id["']\s*:\s*["']([^"']+)["']/);
      if (idMatch) articleId = idMatch[1];
    } else if (inArticle) {
      currentArticleText += '\n' + line;
      braceCount += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      
      // Detectar fi d'article
      if (braceCount === 0 && currentArticleText.includes('}')) {
        // Intentar extreure ID i text (suportar tant cometes dobles com simples)
        const idMatch = currentArticleText.match(/["']id["']\s*:\s*["']([^"']+)["']/);
        const textMatch = currentArticleText.match(/["']text_oficial["']\s*:\s*["']([\s\S]*?)["'],?\s*$/m);
        
        if (idMatch) {
          articles.push({
            id: idMatch[1],
            text_oficial: textMatch ? textMatch[1].replace(/\\n/g, '\n') : '',
            _rawText: currentArticleText
          });
        }
        
        inArticle = false;
        currentArticleText = '';
        articleId = null;
      }
    }
  }

  return { articles, content, exportName: match[1], isJSONFormat: false };
}

/**
 * Actualitza el fitxer amb les traduccions
 */
function updateArticlesFile(filePath, translations, originalContent, isJSONFormat, articles) {
  let updatedContent = originalContent;
  
  if (isJSONFormat && articles) {
    // Per format JSON (constitució), actualitzar l'array i regenerar el JSON
    translations.forEach(({ articleId, translation, titol, capitol, tags }) => {
      const article = articles.find(a => a.id === articleId);
      if (article && article._fullArticle) {
        if (!article._fullArticle.idiomes) {
          article._fullArticle.idiomes = {};
        }
        // Text de l'article
        if (translation) {
          article._fullArticle.idiomes[lang] = translation;
        }
        // Títol
        if (titol) {
          if (!article._fullArticle.idiomes.titol) {
            article._fullArticle.idiomes.titol = {};
          }
          article._fullArticle.idiomes.titol[lang] = titol;
        }
        // Capítol
        if (capitol) {
          if (!article._fullArticle.idiomes.capitol) {
            article._fullArticle.idiomes.capitol = {};
          }
          article._fullArticle.idiomes.capitol[lang] = capitol;
        }
        // Tags
        if (tags && tags.length > 0) {
          if (!article._fullArticle.idiomes.tags) {
            article._fullArticle.idiomes.tags = {};
          }
          article._fullArticle.idiomes.tags[lang] = tags;
        }
      }
    });
    
    // Regenerar el JSON
    const jsonContent = JSON.stringify(
      articles.map(a => {
        const art = { ...a._fullArticle };
        delete art._fullArticle;
        return art;
      }),
      null,
      2
    );
    
    // Reemplaçar el JSON dins el fitxer TypeScript
    updatedContent = updatedContent.replace(
      /export\s+const\s+\w+\s*:\s*\w+\[\]\s*=\s*\[[\s\S]*?\];/,
      `export const ${articles[0] ? (originalContent.match(/export\s+const\s+(\w+)/)?.[1] || 'articles') : 'articles'}: ArticleAndorra[] = ${jsonContent};`
    );
  } else {
    // Per format manual (codi civil)
    translations.forEach(({ articleId, translation }) => {
      // Escapar per JSON
      const escapedTranslation = translation
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n');
      
      // Buscar l'article per ID
      const escapedId = articleId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const articleRegex = new RegExp(
        `("id"\\s*:\\s*"${escapedId}"[\\s\\S]*?)(?:"idiomes"\\s*:\\s*\\{([\\s\\S]*?)\\})?`,
        'g'
      );
      
      updatedContent = updatedContent.replace(articleRegex, (match, articleStart, existingIdiomesContent) => {
        if (existingIdiomesContent) {
          // Afegir la traducció a idiomes existents
          // Verificar si ja existeix la traducció
          if (existingIdiomesContent.includes(`"${lang}"`)) {
            // Reemplaçar la traducció existent
            return articleStart.replace(
              new RegExp(`"${lang}"\\s*:\\s*"[^"]*"`, 'g'),
              `"${lang}": "${escapedTranslation}"`
            ) + `"idiomes": {${existingIdiomesContent.replace(
              new RegExp(`"${lang}"\\s*:\\s*"[^"]*"`, 'g'),
              `"${lang}": "${escapedTranslation}"`
            )}}`;
          } else {
            // Afegir nova traducció
            const newIdiomes = existingIdiomesContent.trim();
            const comma = newIdiomes.endsWith(',') ? '' : ',';
            return articleStart + `"idiomes": {${newIdiomes}${comma}\n      "${lang}": "${escapedTranslation}"\n    }`;
          }
        } else {
          // Afegir nou objecte idiomes
          return articleStart + `,\n    "idiomes": {\n      "${lang}": "${escapedTranslation}"\n    }`;
        }
      });
    });
  }
  
  return updatedContent;
}

/**
 * Funció principal
 */
async function main() {
  console.log(`🚀 Generant traduccions al ${langNames[lang]}...`);
  console.log(`📁 Fitxer: ${filePath}`);
  console.log(`📊 Rang: articles ${start} a ${end}`);
  console.log('');

  try {
    // Llegir articles
    console.log('📖 Llegint articles...');
    const { articles, content, exportName, isJSONFormat } = readArticlesFile(filePath);
    console.log(`✅ Trobats ${articles.length} articles`);
    console.log(`📋 Format: ${isJSONFormat ? 'JSON' : 'Manual'}\n`);

    // Filtrar articles dins del rang i sense traducció completa
    const articlesToTranslate = articles
      .slice(start - 1, Math.min(end, articles.length))
      .filter(article => {
        // Verificar si ja té traducció completa (text, titol, capitol, tags)
        if (isJSONFormat && article._fullArticle) {
          const idiomes = article._fullArticle.idiomes;
          // Considerar que necessita traducció si falta qualsevol part
          if (!idiomes || !idiomes[lang]) return true; // Falta text
          if (article.titol && (!idiomes.titol || !idiomes.titol[lang])) return true; // Falta titol
          if (article.capitol && (!idiomes.capitol || !idiomes.capitol[lang])) return true; // Falta capitol
          if (article.tags && article.tags.length > 0 && (!idiomes.tags || !idiomes.tags[lang])) return true; // Falten tags
          return false; // Tot traduït
        } else {
          // Buscar si ja té la traducció al contingut
          const articleBlock = article._rawText || '';
          return !articleBlock.includes(`"${lang}"`) && !articleBlock.includes(`'${lang}'`);
        }
      });

    if (articlesToTranslate.length === 0) {
      console.log('✅ Tots els articles del rang ja tenen traducció o no hi ha articles per traduir.');
      return;
    }

    console.log(`📝 Articles a traduir: ${articlesToTranslate.length}\n`);

    // Traduir articles
    const translations = [];
    for (let i = 0; i < articlesToTranslate.length; i++) {
      const article = articlesToTranslate[i];
      console.log(`[${i + 1}/${articlesToTranslate.length}] Traduint article ${article.id}...`);
      
      try {
        const translationData = {
          articleId: article.id,
          translation: null,
          titol: null,
          capitol: null,
          tags: null
        };
        
        // Verificar què cal traduir
        let needsTranslation = {
          text: !(isJSONFormat && article._fullArticle?.idiomes?.[lang]),
          titol: article.titol && !(isJSONFormat && article._fullArticle?.idiomes?.titol?.[lang]),
          capitol: article.capitol && !(isJSONFormat && article._fullArticle?.idiomes?.capitol?.[lang]),
          tags: article.tags && article.tags.length > 0 && !(isJSONFormat && article._fullArticle?.idiomes?.tags?.[lang])
        };
        
        // Traduir text de l'article
        if (needsTranslation.text) {
          console.log(`  📄 Traduint text de l'article...`);
          translationData.translation = await translateText(article.text_oficial, lang, 'article');
          await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar entre traduccions
        }
        
        // Traduir títol
        if (needsTranslation.titol) {
          console.log(`  📝 Traduint títol...`);
          translationData.titol = await translateText(article.titol, lang, 'title');
          await new Promise(resolve => setTimeout(resolve, 800));
        }
        
        // Traduir capítol
        if (needsTranslation.capitol) {
          console.log(`  📑 Traduint capítol...`);
          translationData.capitol = await translateText(article.capitol, lang, 'chapter');
          await new Promise(resolve => setTimeout(resolve, 800));
        }
        
        // Traduir etiquetes
        if (needsTranslation.tags) {
          console.log(`  🏷️  Traduint etiquetes...`);
          translationData.tags = await translateText(article.tags, lang, 'tags');
          await new Promise(resolve => setTimeout(resolve, 800));
        }
        
        translations.push(translationData);
        console.log(`  ✅ Traduït completament\n`);
        
        // Esperar una mica abans del següent article
        if (i < articlesToTranslate.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error(`  ❌ Error: ${error.message}\n`);
      }
    }

    // Actualitzar fitxer
    if (translations.length > 0) {
      console.log('💾 Actualitzant fitxer...');
      const updatedContent = updateArticlesFile(filePath, translations, content, isJSONFormat, articles);
      
      // Crear backup
      const backupPath = filePath + `.backup.${Date.now()}`;
      fs.writeFileSync(backupPath, content, 'utf-8');
      console.log(`📦 Backup creat: ${backupPath}`);
      
      // Escriure fitxer actualitzat
      fs.writeFileSync(path.join(process.cwd(), filePath), updatedContent, 'utf-8');
      console.log(`✅ Fitxer actualitzat amb ${translations.length} traduccions\n`);
    } else {
      console.log('⚠️  No s\'han generat traduccions');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Executar
if (require.main === module) {
  main();
}

module.exports = { translateText, readArticlesFile };
