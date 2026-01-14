/**
 * Script per convertir les dades JSON de RAG al format ArticleAndorra
 * que esperen les pàgines de visualització
 */

import * as fs from 'fs';
import * as path from 'path';

interface RAGEntry {
  id: string;
  category: string;
  topic: string;
  content: string;
  legalReference: string;
  keyConcepts: string[];
}

interface ArticleAndorra {
  id: string;
  codi: string;
  numeracio: string;
  llibre: string;
  titol: string;
  capitol: string | null;
  text_oficial: string;
  vigencia: string;
  modificacions?: any[];
  enllacos?: string[];
  tags?: string[];
  idiomes?: {
    ca?: string;
    es?: string;
    fr?: string;
  };
}

function extractLlibreFromID(id: string): string | null {
  // "CCA_LI_A001" -> "I", "CCA_LII_A001" -> "II", etc.
  const match = id.match(/CCA_L([IVX]+)_/);
  if (match) {
    return match[1];
  }
  return null;
}

function extractLlibreFromCategory(category: string): string {
  // "Llibre I - Disposicions generals..." -> "I"
  const match = category.match(/Llibre\s+([IVX]+)/i);
  if (match) {
    return match[1];
  }
  return 'I'; // Default
}

function extractNumeracioFromTopic(topic: string): string {
  // "Article 1: Dret a la jurisdicció..." -> "Article 1"
  const match = topic.match(/Article\s+(\d+[^:]*)/i);
  if (match) {
    return `Article ${match[1].trim()}`;
  }
  // Si és el preàmbul o altres
  if (topic.includes('Preàmbul')) {
    return 'Preàmbul';
  }
  if (topic.includes('Disposició')) {
    const match = topic.match(/(Disposició[^:]+)/i);
    if (match) {
      return match[1].trim();
    }
  }
  return topic.split(':')[0].trim();
}

function extractTitolFromTopic(topic: string): string {
  // "Article 1: Dret a la jurisdicció..." -> "Dret a la jurisdicció..."
  const parts = topic.split(':');
  if (parts.length > 1) {
    return parts.slice(1).join(':').trim();
  }
  return topic;
}

function extractCapitolFromCategory(category: string): string | null {
  // Buscar referències a capítols
  const match = category.match(/Capítol[^-\n]+/i);
  if (match) {
    return match[0].trim();
  }
  return null;
}

function extractTitolFromCategory(category: string): string {
  // "Llibre I - Disposicions generals i principis del procés" -> "Disposicions generals i principis del procés"
  const match = category.match(/Llibre\s+[IVX]+\s*-\s*(.+)/i);
  if (match) {
    return match[1].trim();
  }
  return category;
}

function convertRAGToArticle(entry: RAGEntry, codi: 'civil' | 'constitucio'): ArticleAndorra {
  const llibre = codi === 'constitucio' ? 'CONST' : extractLlibreFromID(entry.id) || extractLlibreFromCategory(entry.category);
  const numeracio = extractNumeracioFromTopic(entry.topic);
  const titol = extractTitolFromTopic(entry.topic);
  const capitol = extractCapitolFromCategory(entry.category);
  const titolSeccio = codi === 'civil' ? extractTitolFromCategory(entry.category) : entry.category;

  return {
    id: entry.id,
    codi,
    numeracio,
    llibre,
    titol: titolSeccio, // Utilitzem el títol de la secció com a títol principal
    capitol,
    text_oficial: entry.content,
    vigencia: codi === 'constitucio' ? '1993-05-04' : '2021-09-17',
    modificacions: [],
    enllacos: [],
    tags: entry.keyConcepts || [],
    idiomes: {
      ca: entry.content
    }
  };
}

function convertCodiCivil() {
  const inputPath = path.join(__dirname, '../data/rag/codi-civil-andorra.json');
  const outputPath = path.join(__dirname, '../data/codis/codi-civil/articles.ts');

  console.log('Llegint dades del Codi Civil...');
  const ragData: RAGEntry[] = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  console.log(`Trobats ${ragData.length} articles`);

  const articles: ArticleAndorra[] = ragData.map(entry => convertRAGToArticle(entry, 'civil'));

  // Agrupar per llibre per generar títols
  const articlesPerLlibre: Record<string, ArticleAndorra[]> = {};
  articles.forEach(article => {
    if (!articlesPerLlibre[article.llibre]) {
      articlesPerLlibre[article.llibre] = [];
    }
    articlesPerLlibre[article.llibre].push(article);
  });

  // Generar el fitxer TypeScript
  const tsContent = `/**
 * Articles del Codi Civil d'Andorra
 * Generat automàticament des de data/rag/codi-civil-andorra.json
 * Data de generació: ${new Date().toISOString()}
 */

import { ArticleAndorra } from '../types';

export const articlesCodiCivil: ArticleAndorra[] = ${JSON.stringify(articles, null, 2)};
`;

  fs.writeFileSync(outputPath, tsContent, 'utf8');
  console.log(`✅ Generats ${articles.length} articles a ${outputPath}`);
  
  // Estadístiques
  Object.keys(articlesPerLlibre).forEach(llibre => {
    console.log(`  - Llibre ${llibre}: ${articlesPerLlibre[llibre].length} articles`);
  });
}

function convertConstitucio() {
  const inputPath = path.join(__dirname, '../data/rag/constitucio.json');
  const outputPath = path.join(__dirname, '../data/codis/constitucio/articles.ts');

  console.log('\nLlegint dades de la Constitució...');
  const ragData: RAGEntry[] = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  console.log(`Trobats ${ragData.length} articles`);

  // Ordenar articles: Preàmbul primer, després articles numerats en ordre
  const preambul = ragData.find(e => e.id === 'CONST_PREAMB');
  const articlesNumerats = ragData
    .filter(e => e.id.startsWith('CONST_') && /^CONST_\d+$/.test(e.id))
    .sort((a, b) => {
      const numA = parseInt(a.id.replace('CONST_', ''));
      const numB = parseInt(b.id.replace('CONST_', ''));
      return numA - numB;
    });
  
  const ragDataOrdenat = preambul 
    ? [preambul, ...articlesNumerats]
    : articlesNumerats;

  const articles: ArticleAndorra[] = ragDataOrdenat.map(entry => convertRAGToArticle(entry, 'constitucio'));

  // Generar el fitxer TypeScript
  const tsContent = `/**
 * Articles de la Constitució d'Andorra
 * Generat automàticament des de data/rag/constitucio.json
 * Data de generació: ${new Date().toISOString()}
 */

import { ArticleAndorra } from '../types';

export const articlesConstitucio: ArticleAndorra[] = ${JSON.stringify(articles, null, 2)};
`;

  fs.writeFileSync(outputPath, tsContent, 'utf8');
  console.log(`✅ Generats ${articles.length} articles a ${outputPath}`);
}

// Executar conversions
console.log('🔄 Convertint dades RAG a format ArticleAndorra...\n');
convertCodiCivil();
convertConstitucio();
console.log('\n✅ Conversió completada!');

