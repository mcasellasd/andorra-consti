/**
 * Pàgina d'índex de la Constitució d'Andorra
 */

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { getIdiomaActual } from '../../../lib/i18n';
import { articlesConstitucio } from '../../../data/codis/constitucio/articles-template';

const ConstitucioPage: React.FC = () => {
  const idioma = getIdiomaActual();

  const estructura = articlesConstitucio.reduce((acc, article) => {
    const titol = idioma === 'ca'
      ? article.titol
      : article.idiomes?.titol?.[idioma] || article.titol;
    const capitol = idioma === 'ca'
      ? article.capitol || 'Sense capítol'
      : article.idiomes?.capitol?.[idioma] || article.capitol || (idioma === 'es' ? 'Sin capítulo' : 'Sans chapitre');

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
            <div className="constitution-index-pill">{articlesConstitucio.length} {idioma === 'ca' ? 'articles' : idioma === 'es' ? 'artículos' : 'articles'}</div>
          </header>

          {articlesConstitucio.length === 0 ? (
            <div className="constitution-empty">
              <p>{idioma === 'ca' ? 'Encara no hi ha articles processats.' : idioma === 'es' ? 'Aún no hay artículos procesados.' : 'Aucun article n\'a encore été traité.'}</p>
            </div>
          ) : (
            ordenarTitols(Object.keys(estructura)).map((titol) => {
              const capitols = estructura[titol];
              return (
                <section key={titol} className="constitution-section-card">
                  <h2>{titol}</h2>
                  {Object.keys(capitols).map((capitol) => {
                    const articles = capitols[capitol];
                    return (
                      <div key={capitol} className="constitution-chapter-card">
                        {capitol !== 'Sense capítol' && <h3>{capitol}</h3>}
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
            })
          )}
        </div>
      </Layout>
    </>
  );
};

export default ConstitucioPage;

