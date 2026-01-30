/**
 * Pàgina de cerca d'articles legals
 */

import React, { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import { articlesConstitucio } from '../data/codis/constitucio/articles-template';
import { ArticleAndorra } from '../data/codis/types';
import { getIdiomaActual, t, type Idioma } from '../lib/i18n';

type TipusCerca = 'constitucio';

interface ResultatCerca {
  article: ArticleAndorra;
  tipus: 'constitucio';
  coincidencies: string[];
  relevancia: number;
}

const CercaPage: React.FC = () => {
  const idioma = getIdiomaActual();
  const [query, setQuery] = useState('');
  const [cercaFet, setCercaFet] = useState(false);

  // Obtenir text de l'article segons idioma
  const getTextArticle = (article: ArticleAndorra, lang: Idioma): string => {
    if (lang === 'ca') return article.text_oficial;
    return article.idiomes?.[lang] || article.text_oficial;
  };

  // Obtenir títol de l'article segons idioma
  const getTitolArticle = (article: ArticleAndorra, lang: Idioma): string => {
    if (lang === 'ca') return article.titol;
    return article.idiomes?.titol?.[lang] || article.titol;
  };

  // Obtenir tags de l'article segons idioma
  const getTagsArticle = (article: ArticleAndorra, lang: Idioma): string[] => {
    if (lang === 'ca') return article.tags || [];
    return article.idiomes?.tags?.[lang] || article.tags || [];
  };

  // Funció de cerca
  const resultats = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    const queryLower = query.toLowerCase().trim();
    const paraules = queryLower.split(/\s+/).filter(p => p.length > 0);

    const resultats: ResultatCerca[] = [];

    // Cercar en Constitució
    articlesConstitucio.forEach((article) => {
      const textArticle = getTextArticle(article, idioma);
      const titolArticle = getTitolArticle(article, idioma);
      const tagsArticle = getTagsArticle(article, idioma);
      const numeracio = article.numeracio.toLowerCase();
      const textComplet = `${titolArticle} ${textArticle} ${numeracio} ${tagsArticle.join(' ')}`.toLowerCase();

      const coincidencies: string[] = [];
      let relevancia = 0;

      // Comptar coincidències
      paraules.forEach(paraula => {
        let comptador = 0;

        // Cerca al títol (més rellevant)
        if (titolArticle.toLowerCase().includes(paraula)) {
          comptador += 5;
          coincidencies.push(`Títol: "${paraula}"`);
        }

        // Cerca a la numeració
        if (numeracio.includes(paraula)) {
          comptador += 3;
          coincidencies.push(`Numeració: "${paraula}"`);
        }

        // Cerca al text
        const index = textArticle.toLowerCase().indexOf(paraula);
        if (index !== -1) {
          comptador += 1;
          // Bonus si està al principi del text
          if (index < 100) comptador += 1;
        }

        // Cerca a tags
        if (tagsArticle.some(tag => tag.toLowerCase().includes(paraula))) {
          comptador += 2;
          coincidencies.push(`Etiqueta: "${paraula}"`);
        }

        relevancia += comptador;
      });

      if (relevancia > 0) {
        resultats.push({
          article,
          tipus: 'constitucio',
          coincidencies: Array.from(new Set(coincidencies)),
          relevancia,
        });
      }
    });

    // Ordenar per rellevància (descendent)
    return resultats.sort((a, b) => b.relevancia - a.relevancia);
  }, [query, idioma]);

  const paraules = query.toLowerCase().trim().split(/\s+/).filter(p => p.length > 0);

  // Snippet del text amb destacat
  const getSnippet = (text: string, query: string, maxLength: number = 200): string => {
    if (!query.trim()) {
      return text.substring(0, maxLength) + (text.length > maxLength ? '...' : '');
    }

    const queryLower = query.toLowerCase();
    const textLower = text.toLowerCase();
    const index = textLower.indexOf(queryLower);

    if (index === -1) {
      return text.substring(0, maxLength) + (text.length > maxLength ? '...' : '');
    }

    const start = Math.max(0, index - 50);
    const end = Math.min(text.length, index + query.length + 150);

    let snippet = text.substring(start, end);
    if (start > 0) snippet = '...' + snippet;
    if (end < text.length) snippet = snippet + '...';

    // Destacar paraules de cerca
    paraules.forEach(paraula => {
      const regex = new RegExp(`(${paraula.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      snippet = snippet.replace(regex, '<mark>$1</mark>');
    });

    return snippet;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCercaFet(true);
  };

  useEffect(() => {
    // Si hi ha query a la URL, establir-la
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const q = urlParams.get('q');
      if (q) {
        setQuery(q);
        setCercaFet(true);
      }
    }
  }, []);

  const getArticleUrl = (article: ArticleAndorra, tipus: 'constitucio'): string => {
    return `/codis/constitucio/article/${article.id}`;
  };

  return (
    <>
      <Head>
        <title>{t(idioma, 'cerca.titol')} - dretplaner.ad</title>
        <meta name="description" content={t(idioma, 'cerca.descripcio')} />
      </Head>
      <Layout>
        <div className="main-container">
          <div className="content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
              <h1 style={{
                fontSize: '2.5rem',
                marginBottom: '0.5rem',
                color: '#1a1a1a',
                fontWeight: 700,
              }}>
                {t(idioma, 'cerca.titol')}
              </h1>
              <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '1.5rem' }}>
                {t(idioma, 'cerca.descripcio')}
              </p>

              {/* Formulari de cerca */}
              <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  alignItems: 'flex-end',
                }}>
                  <div style={{ flex: '1', minWidth: '300px' }}>
                    <label htmlFor="query" style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      color: '#666',
                      fontWeight: 500,
                    }}>
                      {t(idioma, 'cerca.cercaText')}
                    </label>
                    <input
                      id="query"
                      type="text"
                      placeholder={t(idioma, 'cerca.placeholder')}
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setCercaFet(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        fontSize: '1rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#7c3aed'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                      autoFocus
                    />
                  </div>


                  <button
                    type="submit"
                    style={{
                      padding: '0.75rem 2rem',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'white',
                      backgroundColor: '#7c3aed',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6d28d9'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#7c3aed'}
                  >
                    {t(idioma, 'cerca.cercar')}
                  </button>
                </div>
              </form>
            </div>

            {/* Resultats */}
            {cercaFet && query.trim() && (
              <div>
                <div style={{
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                }}>
                  <strong style={{ fontSize: '1.1rem', color: '#374151' }}>
                    {resultats.length === 0
                      ? t(idioma, 'cerca.noResultats')
                      : `${resultats.length} ${resultats.length === 1 ? t(idioma, 'cerca.resultat') : t(idioma, 'cerca.resultats')}`
                    }
                  </strong>
                </div>

                {resultats.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {resultats.map((resultat, index) => {
                      const article = resultat.article;
                      const titol = getTitolArticle(article, idioma);
                      const text = getTextArticle(article, idioma);
                      const url = getArticleUrl(article, resultat.tipus);

                      return (
                        <div
                          key={`${resultat.tipus}-${article.id}-${index}`}
                          style={{
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            padding: '1.5rem',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            transition: 'box-shadow 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                          }}
                        >
                          <div style={{ marginBottom: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                              <span style={{
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                color: '#059669',
                                backgroundColor: '#d1fae5',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '12px',
                              }}>
                                {t(idioma, 'cerca.constitucio')}
                              </span>
                              <span style={{
                                fontSize: '0.9rem',
                                color: '#666',
                                fontWeight: 600,
                              }}>
                                {article.numeracio}
                              </span>
                            </div>
                            <h3 style={{
                              fontSize: '1.25rem',
                              margin: 0,
                              fontWeight: 600,
                              color: '#1a1a1a',
                              lineHeight: '1.4',
                            }}>
                              <Link
                                href={url}
                                style={{
                                  color: '#1a1a1a',
                                  textDecoration: 'none',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = '#7c3aed';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = '#1a1a1a';
                                }}
                              >
                                {titol}
                              </Link>
                            </h3>
                          </div>

                          <div style={{
                            marginBottom: '0.75rem',
                            color: '#666',
                            fontSize: '0.95rem',
                            lineHeight: '1.6',
                          }}>
                            <div dangerouslySetInnerHTML={{
                              __html: getSnippet(text, query, 250)
                            }} />
                          </div>

                          {resultat.coincidencies.length > 0 && (
                            <div style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: '0.5rem',
                              marginBottom: '0.75rem',
                            }}>
                              {resultat.coincidencies.slice(0, 3).map((coincidencia, idx) => (
                                <span
                                  key={idx}
                                  style={{
                                    fontSize: '0.8rem',
                                    color: '#6b7280',
                                    backgroundColor: '#f3f4f6',
                                    padding: '0.2rem 0.5rem',
                                    borderRadius: '4px',
                                  }}
                                >
                                  {coincidencia}
                                </span>
                              ))}
                            </div>
                          )}

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Link
                              href={url}
                              style={{
                                color: '#7c3aed',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#6d28d9';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#7c3aed';
                              }}
                            >
                              {t(idioma, 'cerca.veureArticle')} →
                            </Link>
                            {(() => {
                              const tags = getTagsArticle(article, idioma);
                              return tags.length > 0 ? (
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                  {tags.slice(0, 3).map((tag, idx) => (
                                  <span
                                    key={idx}
                                    style={{
                                      fontSize: '0.75rem',
                                      color: '#6b7280',
                                      backgroundColor: '#f9fafb',
                                      padding: '0.2rem 0.5rem',
                                      borderRadius: '4px',
                                      border: '1px solid #e5e7eb',
                                    }}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              ) : null;
                            })()}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    color: '#999',
                  }}>
                    <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                      {t(idioma, 'cerca.noResultats')}
                    </p>
                    <p style={{ fontSize: '0.9rem' }}>
                      {t(idioma, 'cerca.provaAltres')}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Estils per al destacat */}
            <style jsx>{`
              :global(mark) {
                background-color: #fef08a;
                padding: 0.1rem 0.2rem;
                border-radius: 3px;
                font-weight: 500;
              }
            `}</style>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CercaPage;
