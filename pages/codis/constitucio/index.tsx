/**
 * Pàgina d'índex de la Constitució d'Andorra
 */

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { getIdiomaActual } from '../../../lib/i18n';
import { articlesConstitucio } from '../../../data/codis/constitucio/articles-template';

const getCapitolConstitucio = (titol: string, articleId: string, idioma: string): string => {
  const articleNumber = Number(articleId.match(/^CONST_(\d+)$/)?.[1]);
  const chapters: Record<string, Array<{ from: number; to: number; ca: string; es: string; fr: string }>> = {
    'Títol II - Drets i llibertats': [
      { from: 4, to: 6, ca: 'I. Principis generals', es: 'I. Principios generales', fr: 'I. Principes généraux' },
      { from: 7, to: 7, ca: 'II. De la nacionalitat andorrana', es: 'II. De la nacionalidad andorrana', fr: 'II. De la nationalité andorrane' },
      { from: 8, to: 23, ca: 'III. Dels drets fonamentals de la persona i de les llibertats públiques', es: 'III. De los derechos fundamentales de la persona y de las libertades públicas', fr: 'III. Des droits fondamentaux de la personne et des libertés publiques' },
      { from: 24, to: 26, ca: 'IV. Dels drets polítics dels andorrans', es: 'IV. De los derechos políticos de los andorranos', fr: 'IV. Des droits politiques des Andorrans' },
      { from: 27, to: 36, ca: 'V. Dels drets i principis econòmics, socials i culturals', es: 'V. De los derechos y principios económicos, sociales y culturales', fr: 'V. Des droits et principes économiques, sociaux et culturels' },
      { from: 37, to: 38, ca: 'VI. Dels deures dels andorrans i dels estrangers', es: 'VI. De los deberes de los andorranos y de los extranjeros', fr: 'VI. Des devoirs des Andorrans et des étrangers' },
      { from: 39, to: 42, ca: 'VII. De les garanties dels drets i llibertats', es: 'VII. De las garantías de los derechos y libertades', fr: 'VII. Des garanties des droits et libertés' },
    ],
    'Títol IV - El Consell General': [
      { from: 50, to: 57, ca: 'I. De l’organització del Consell General', es: 'I. De la organización del Consejo General', fr: 'I. De l’organisation du Conseil général' },
      { from: 58, to: 63, ca: 'II. Del procediment legislatiu', es: 'II. Del procedimiento legislativo', fr: 'II. De la procédure législative' },
      { from: 64, to: 67, ca: 'III. Dels tractats internacionals', es: 'III. De los tratados internacionales', fr: 'III. Des traités internationaux' },
      { from: 68, to: 71, ca: 'IV. De les relacions del Consell General amb el Govern', es: 'IV. De las relaciones del Consejo General con el Gobierno', fr: 'IV. Des relations du Conseil général avec le Gouvernement' },
    ],
  };
  const chapterGroup = Object.entries(chapters).find(([title]) => titol.trim().startsWith(title.split(' - ')[0]));
  const chapter = chapterGroup?.[1].find(({ from, to }) => articleNumber >= from && articleNumber <= to);
  return chapter ? chapter[idioma as 'ca' | 'es' | 'fr'] || chapter.ca : 'Sense capítol';
};

const getPartConstitucio = (titol: string): 'dogmatica' | 'organica' | null => {
  if (/^Títol\s+(I|II)\b/i.test(titol.trim())) return 'dogmatica';
  if (/^Títol\s+(III|IV|V|VI|VII|VIII|IX)\b/i.test(titol.trim())) return 'organica';
  return null;
};

const ConstitucioPage: React.FC = () => {
  const idioma = getIdiomaActual();
  const totalArticles = articlesConstitucio.filter(art => art.id !== 'CONST_PREAMB').length;

  const estructura = articlesConstitucio.reduce((acc, article) => {
    const titol = idioma === 'ca'
      ? article.titol
      : article.idiomes?.titol?.[idioma] || article.titol;
    const capitol = idioma === 'ca'
      ? article.capitol || getCapitolConstitucio(article.titol, article.id, idioma)
      : article.idiomes?.capitol?.[idioma] || article.capitol || getCapitolConstitucio(article.titol, article.id, idioma);

    if (!acc[titol]) {
      acc[titol] = {};
    }
    if (!acc[titol][capitol]) {
      acc[titol][capitol] = [];
    }
    acc[titol][capitol].push(article);
    return acc;
  }, {} as Record<string, Record<string, typeof articlesConstitucio>>);

  const ordenarTitols = (titols: string[]): string[] => {
    const preambul = titols.find((t) => t === 'Preàmbul');
    const altres = titols.filter((t) => t !== 'Preàmbul');
    const altresOrdenats = altres.sort((a, b) => {
      const numA = a.match(/Títol\s+([IVX]+)/i)?.[1];
      const numB = b.match(/Títol\s+([IVX]+)/i)?.[1];
      if (!numA && !numB) return a.localeCompare(b);
      if (!numA) return 1;
      if (!numB) return -1;
      const romanToNum: Record<string, number> = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10 };
      const numAVal = romanToNum[numA] || 999;
      const numBVal = romanToNum[numB] || 999;
      return numAVal - numBVal;
    });
    return preambul ? [preambul, ...altresOrdenats] : altresOrdenats;
  };

  const renderTitol = (titol: string) => {
    const capitols = estructura[titol];
    return (
      <section key={titol} className="constitution-section-card">
        <header className="constitution-title-heading">
          <span className="constitution-title-mark" aria-hidden="true">§</span>
          <h2>{titol}</h2>
          <span className="constitution-title-count">
            {Object.values(capitols).reduce((total, articles) => total + articles.length, 0)} {idioma === 'ca' ? 'articles' : idioma === 'es' ? 'artículos' : 'articles'}
          </span>
        </header>
        {Object.keys(capitols).map((capitol) => {
          const articles = capitols[capitol];
          return (
            <div key={capitol} className="constitution-chapter-card">
              {capitol !== 'Sense capítol' && (
                <header className="constitution-chapter-heading">
                  <span className="constitution-chapter-label">{idioma === 'ca' ? 'CAPÍTOL' : idioma === 'es' ? 'CAPÍTULO' : 'CHAPITRE'}</span>
                  <h3>{capitol}</h3>
                  <span className="constitution-chapter-count">{articles.length} {idioma === 'ca' ? 'articles' : idioma === 'es' ? 'artículos' : 'articles'}</span>
                </header>
              )}
              <div className="constitution-article-grid">
                {articles.map((article) => (
                  <Link key={article.id} href={`/codis/constitucio/article/${article.id}`} className="constitution-article-card">
                    <span className="constitution-article-number">{article.numeracio}</span>
                    {article.text_oficial && <p>{article.text_oficial.substring(0, 140)}...</p>}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    );
  };

  return (
    <>
      <Head>
        <title>Constitució d&apos;Andorra | dretplaner.ad</title>
        <meta name="description" content="Navega per la Constitució del Principat d'Andorra amb interpretació assistida per IA." />
      </Head>
      <Layout>
        <div className="constitution-index-shell">
          <header className="constitution-index-hero">
            <div>
              <p className="constitution-index-kicker">Constitució d&apos;Andorra</p>
              <h1>Explora la Constitució article per article</h1>
              <p>
                {idioma === 'ca' && 'Constitució aprovada el 4 de maig de 1993'}
                {idioma === 'es' && 'Constitución aprobada el 4 de mayo de 1993'}
                {idioma === 'fr' && 'Constitution approuvée le 4 mai 1993'}
              </p>
            </div>
            <div className="constitution-index-pill">{totalArticles} {idioma === 'ca' ? 'articles' : idioma === 'es' ? 'artículos' : 'articles'}</div>
          </header>

          {articlesConstitucio.length === 0 ? (
            <div className="constitution-empty">
              <p>{idioma === 'ca' ? 'Encara no hi ha articles processats.' : idioma === 'es' ? 'Aún no hay artículos procesados.' : 'Aucun article n\'a encore été traité.'}</p>
            </div>
          ) : (
            <>
              {estructura['Preàmbul'] && renderTitol('Preàmbul')}
              {(['dogmatica', 'organica'] as const).map((part) => {
                const titolsPart = ordenarTitols(Object.keys(estructura).filter((titol) => getPartConstitucio(titol) === part));
                if (!titolsPart.length) return null;
                return (
                  <section key={part} className={`constitution-part constitution-part-${part}`}>
                    <h2 className="constitution-part-heading">
                      {part === 'dogmatica'
                        ? (idioma === 'ca' ? 'Part dogmàtica' : idioma === 'es' ? 'Parte dogmática' : 'Partie dogmatique')
                        : (idioma === 'ca' ? 'Part orgànica' : idioma === 'es' ? 'Parte orgánica' : 'Partie organique')}
                    </h2>
                    {titolsPart.map(renderTitol)}
                  </section>
                );
              })}
              {ordenarTitols(Object.keys(estructura).filter((titol) => titol !== 'Preàmbul' && !getPartConstitucio(titol))).map(renderTitol)}
            </>
          )}
        </div>
      </Layout>
    </>
  );
};

export default ConstitucioPage;

