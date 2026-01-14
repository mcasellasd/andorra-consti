/**
 * EXEMPLE: Com afegir jurisprudència a la base de dades
 * 
 * Aquest fitxer mostra com afegir casos de jurisprudència a data/jurisprudence.ts
 * 
 * Per afegir un cas:
 * 1. Obre data/jurisprudence.ts
 * 2. Afegeix un objecte al array jurisprudenceDatabase
 * 3. Assegura't d'incloure l'ID de l'article relacionat al camp relatedArticles
 */

import type { JurisprudenceCase } from './jurisprudence';

// Exemple de casos de jurisprudència que pots afegir a jurisprudence.ts
export const exampleJurisprudenceCases: JurisprudenceCase[] = [
  {
    id: 'jpr-001',
    title: 'Sentència sobre interpretació del Codi Civil de Catalunya',
    court: 'TSJC',
    date: '2023-05-15',
    caseNumber: 'STSJ CAT 1234/2023',
    url: 'https://example.com/sentencia-1234',
    snippet: 'La sentència interpreta l\'article 1-1 del CCCat establint que el costum només opera quan manca norma aplicable i que els principis generals actuen com a supletori.',
    relatedArticles: ['I-1'], // ID de l'article relacionat
    bookId: 'I',
    keywords: ['interpretació', 'fonts del dret', 'costum', 'principis generals']
  },
  {
    id: 'jpr-002',
    title: 'Sentència sobre prescripció en el dret civil català',
    court: 'Tribunal Suprem',
    date: '2022-11-20',
    caseNumber: 'STS 5678/2022',
    url: 'https://example.com/sentencia-5678',
    snippet: 'El Tribunal Suprem confirma la doctrina sobre la prescripció adquisitiva segons el Codi Civil de Catalunya, aplicant l\'article 541-1.',
    relatedArticles: ['I-541-1'], // Si l'article té un ID com 'I-541-1'
    bookId: 'I',
    keywords: ['prescripció', 'adquisitiva', 'doctrina']
  },
  // Pots afegir més casos aquí...
];

/**
 * INSTRUCCIONS PER AFEGIR JURISPRUDÈNCIA:
 * 
 * 1. Obre el fitxer data/jurisprudence.ts
 * 2. Dins de l'array jurisprudenceDatabase, afegeix nous objectes seguint aquest format:
 * 
 * {
 *   id: 'jpr-XXX',                    // ID únic (incrementa el número)
 *   title: 'Títol de la sentència',   // Títol descriptiu
 *   court: 'TSJC',                     // Tribunal (TSJC, Tribunal Suprem, etc.)
 *   date: 'YYYY-MM-DD',                // Data de la sentència
 *   caseNumber: 'STSJ CAT XXX/YYYY',   // Número de la sentència (opcional)
 *   url: 'https://...',                // URL a la sentència completa (opcional)
 *   snippet: 'Fragment rellevant...',  // Fragment que explica la rellevància
 *   relatedArticles: ['I-1'],          // Array amb IDs dels articles relacionats
 *   bookId: 'I',                       // Llibre relacionat (opcional)
 *   keywords: ['paraula1', 'paraula2'] // Paraules clau per facilitar la cerca (opcional)
 * }
 * 
 * IMPORTANT:
 * - El camp relatedArticles ha de contenir l'ID exacte de l'article (ex: 'I-1', 'II-5', etc.)
 * - Pots relacionar un cas amb múltiples articles afegint múltiples IDs: ['I-1', 'I-2']
 * - Si no tens URL, pots deixar el camp url sense definir o buit
 * - El snippet hauria de ser breu però descriptiu de la rellevància del cas
 */

