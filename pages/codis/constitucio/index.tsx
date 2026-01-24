/**
 * Pàgina d'índex de la Constitució d'Andorra
 */

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { getIdiomaActual, t } from '../../../lib/i18n';
import { articlesConstitucio } from '../../../data/codis/constitucio/articles-template';

const ConstitucioPage: React.FC = () => {
  const idioma = getIdiomaActual();

  // Agrupar articles per títol i capítol
  const estructura = articlesConstitucio.reduce((acc, article) => {
    const titol = article.titol;
    const capitol = article.capitol || 'Sense capítol';

    if (!acc[titol]) {
      acc[titol] = {};
    }
    if (!acc[titol][capitol]) {
      acc[titol][capitol] = [];
    }
    acc[titol][capitol].push(article);
    return acc;
  }, {} as Record<string, Record<string, typeof articlesConstitucio>>);

  return (
    <>
      <Head>
        <title>Constitució d&apos;Andorra | dretplaner.ad</title>
        <meta
          name="description"
          content="Navega per la Constitució del Principat d'Andorra amb interpretació assistida per IA."
        />
      </Head>
      <Layout>
        <div className="constitucio-page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
          <header style={{ marginBottom: '3rem' }}>
            <nav className="breadcrumb" style={{ marginBottom: '1rem' }}>
              <Link href="/">Inici</Link>
              <span> / </span>
              <Link href="/codis">Codis</Link>
              <span> / </span>
              <span>Constitució</span>
            </nav>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
              Constitució del Principat d&apos;Andorra
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#64748b' }}>
              {idioma === 'ca' && 'Constitució aprovada el 4 de maig de 1993'}
              {idioma === 'es' && 'Constitución aprobada el 4 de mayo de 1993'}
              {idioma === 'fr' && 'Constitution approuvée le 4 mai 1993'}
            </p>
            <p style={{ color: '#475569', marginTop: '0.5rem' }}>
              {articlesConstitucio.length} {idioma === 'ca' ? 'articles' : idioma === 'es' ? 'artículos' : 'articles'}
            </p>
          </header>

          {articlesConstitucio.length === 0 ? (
            <div style={{
              background: '#f8fafc',
              borderRadius: '12px',
              padding: '3rem',
              textAlign: 'center',
              border: '1px dashed #cbd5e1'
            }}>
              <p style={{ color: '#64748b', marginBottom: '1rem' }}>
                {idioma === 'ca' && 'Encara no hi ha articles processats.'}
                {idioma === 'es' && 'Aún no hay artículos procesados.'}
                {idioma === 'fr' && 'Aucun article n\'a encore été traité.'}
              </p>
              <p style={{ color: '#475569', fontSize: '0.875rem' }}>
                {idioma === 'ca' && 'Per processar la Constitució, executa:'}
                {idioma === 'es' && 'Para procesar la Constitución, ejecuta:'}
                {idioma === 'fr' && 'Pour traiter la Constitution, exécutez:'}
              </p>
              <code style={{
                display: 'block',
                marginTop: '1rem',
                padding: '1rem',
                background: 'white',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                node scripts/process-constitucio-andorra.js docs/constitucio-andorra.txt data/codis/constitucio/articles.ts
              </code>
            </div>
          ) : (
            (() => {
              // Ordenar títols: Preàmbul primer, després Títol I, II, III, etc.
              const ordenarTitols = (titols: string[]): string[] => {
                const preambul = titols.find(t => t === 'Preàmbul');
                const altres = titols.filter(t => t !== 'Preàmbul');

                // Extreure número de títol per ordenar
                const altresOrdenats = altres.sort((a, b) => {
                  const numA = a.match(/Títol\s+([IVX]+)/i)?.[1];
                  const numB = b.match(/Títol\s+([IVX]+)/i)?.[1];

                  if (!numA && !numB) return a.localeCompare(b);
                  if (!numA) return 1;
                  if (!numB) return -1;

                  // Convertir números romans a números per comparar
                  const romanToNum: Record<string, number> = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10 };
                  const numAVal = romanToNum[numA] || 999;
                  const numBVal = romanToNum[numB] || 999;

                  return numAVal - numBVal;
                });

                return preambul ? [preambul, ...altresOrdenats] : altresOrdenats;
              };

              return ordenarTitols(Object.keys(estructura)).map((titol) => {
                const capitols = estructura[titol];
                return (
                  <section key={titol} style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                      {titol}
                    </h2>

                    {Object.keys(capitols).map((capitol) => {
                      const articles = capitols[capitol];
                      return (
                        <div
                          key={capitol}
                          style={{
                            background: 'white',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            marginBottom: '1.5rem',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            border: '1px solid #e2e8f0'
                          }}
                        >
                          {capitol !== 'Sense capítol' && (
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: '#1e293b' }}>
                              {capitol}
                            </h3>
                          )}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '0.75rem' }}>
                            {articles.map((article) => (
                              <Link
                                key={article.id}
                                href={`/codis/constitucio/article/${article.id}`}
                                style={{
                                  padding: '0.75rem 1rem',
                                  background: '#f8fafc',
                                  borderRadius: '8px',
                                  border: '1px solid #e2e8f0',
                                  textDecoration: 'none',
                                  color: 'inherit',
                                  display: 'block',
                                  transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#f1f5f9';
                                  e.currentTarget.style.borderColor = '#3b82f6';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#f8fafc';
                                  e.currentTarget.style.borderColor = '#e2e8f0';
                                }}
                              >
                                <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: '#3b82f6' }}>
                                  {article.numeracio}
                                </div>
                                {article.text_oficial && (
                                  <div style={{
                                    fontSize: '0.875rem', color: '#475569', marginTop: '0.5rem',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical'
                                  }}>
                                    {article.text_oficial.substring(0, 150)}...
                                  </div>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </section>
                );
              });
            })()
          )}
        </div>
      </Layout>
    </>
  );
};

export default ConstitucioPage;

