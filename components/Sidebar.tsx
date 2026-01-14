import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { Article, Book } from '../data/articles';
import type { BookId } from '../data/articles';
import { openChat } from './chatUtils';

interface SidebarProps {
  books: Book[];
  articles: Article[];
}

const Sidebar: React.FC<SidebarProps> = ({ books, articles }) => {
  const router = useRouter();
  const currentPath = router.asPath;
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedBooks, setExpandedBooks] = useState<Record<string, boolean>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [conceptQuery, setConceptQuery] = useState('');
  const [conceptLoading, setConceptLoading] = useState(false);
  const [conceptError, setConceptError] = useState<string | null>(null);
  const [conceptResults, setConceptResults] = useState<
    Array<{
      conceptId: string;
      conceptTitle: string;
      snippet: string;
      score: number;
      bookId: BookId;
      articleId?: string;
      articleNumber?: string;
      articleTitle?: string;
    }>
  >([]);

  const formatSectionLabel = (raw: string) => {
    if (!raw) return 'Sense secció';
    return raw
      .split(' - ')
      .map((segment) =>
        segment
          .split(' ')
          .map((word) => {
            if (/^[IVXLCDM]+\.?$/.test(word)) {
              return word.toUpperCase();
            }
            if (word.length <= 2) {
              return word.toLowerCase();
            }
            const lower = word.toLowerCase();
            return lower.charAt(0).toUpperCase() + lower.slice(1);
          })
          .join(' ')
      )
      .join(' · ');
  };

  const bookStructure = useMemo(() => {
    return books.map((book) => {
      const bookArticles = articles.filter((article) => article.bookId === book.id);

      const sections = bookArticles.reduce((acc, article) => {
        const sectionName = article.section || 'Sense secció';
        if (!acc[sectionName]) {
          acc[sectionName] = [];
        }
        acc[sectionName].push(article);
        return acc;
      }, {} as Record<string, Article[]>);

      const normalizedSections = Object.entries(sections)
        .map(([name, sectionArticles]) => ({
          name,
          displayName: formatSectionLabel(name),
          articles: sectionArticles,
        }))
        .sort((a, b) => a.name.localeCompare(b.name, 'ca', { sensitivity: 'base', numeric: true }));

      return {
        book,
        sections: normalizedSections,
        articlesCount: bookArticles.length,
      };
    });
  }, [books, articles]);

  const filteredStructure = useMemo(() => {
    if (!searchQuery.trim()) {
      return bookStructure;
    }

    const query = searchQuery.toLowerCase();

    return bookStructure
      .map((entry) => {
        const matchesBook =
          entry.book.title.toLowerCase().includes(query) ||
          entry.book.subtitle.toLowerCase().includes(query) ||
          entry.book.number.toLowerCase().includes(query);

        const filteredSections = entry.sections
          .map((section) => {
            const sectionMatches =
              section.name.toLowerCase().includes(query) ||
              section.displayName.toLowerCase().includes(query);
            const filteredArticles = section.articles.filter(
              (article) =>
                article.title.toLowerCase().includes(query) ||
                article.number.toLowerCase().includes(query) ||
                (article.section ?? '').toLowerCase().includes(query)
            );

            if (sectionMatches && filteredArticles.length === 0) {
              return { ...section, articles: section.articles };
            }

            if (filteredArticles.length > 0) {
              return { ...section, articles: filteredArticles };
            }

            return null;
          })
          .filter(
            (section): section is { name: string; displayName: string; articles: Article[] } =>
              Boolean(section)
          );

        const hasArticles = filteredSections.some((section) => section.articles.length > 0);

        if (matchesBook && !hasArticles && entry.articlesCount === 0) {
          return { ...entry, sections: [] };
        }

        if (matchesBook || hasArticles) {
          return { ...entry, sections: filteredSections };
        }

        return null;
      })
      .filter((entry): entry is typeof bookStructure[number] => Boolean(entry));
  }, [bookStructure, searchQuery]);

  const toggleBook = (bookId: string) => {
    setExpandedBooks((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  React.useEffect(() => {
    const currentArticle = articles.find((a) => `/article/${a.id}` === currentPath);
    if (currentArticle) {
      if (currentArticle.bookId) {
        setExpandedBooks((prev) => ({
          ...prev,
          [currentArticle.bookId!]: true,
        }));
      }
      if (currentArticle.section && currentArticle.bookId) {
        const sectionKey = `${currentArticle.bookId}::${currentArticle.section}`;
        setExpandedSections((prev) => ({
          ...prev,
          [sectionKey]: true,
        }));
      }
    }
  }, [currentPath, articles]);

  const handleConceptSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = conceptQuery.trim();
    if (!query) {
      setConceptResults([]);
      setConceptError(null);
      return;
    }

    setConceptLoading(true);
    setConceptError(null);
    setConceptResults([]);

    try {
      const response = await fetch('/api/rag/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          topK: 6
        })
      });
      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Error desconegut en la cerca');
      }
      setConceptResults(data.results ?? []);
    } catch (error: any) {
      setConceptError(
        error?.message ||
          'No s’ha pogut completar la cerca semàntica. Torna-ho a intentar.'
      );
    } finally {
      setConceptLoading(false);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-box">
        <div className="sidebar-header">
          <Link href="/" className="back-to-index">
            ← Tornar a l'índex
          </Link>
          <h2 className="sidebar-title">Taula de continguts</h2>
          <div className="sidebar-search">
            <input
              type="text"
              placeholder="Cercar dins del codi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-button">Cercar</button>
          </div>
        </div>

        <div className="sidebar-smart-search">
          <h3 className="smart-search-title">Cercador intel·ligent</h3>
          <form onSubmit={handleConceptSearch} className="smart-search-form">
            <label htmlFor="smart-search-input" className="sr-only">
              Concepte o matèria
            </label>
            <input
              id="smart-search-input"
              type="text"
              placeholder="Ex. prescripció, bona fe, clàusules abusives..."
              value={conceptQuery}
              onChange={(event) => setConceptQuery(event.target.value)}
              className="smart-search-input"
            />
            <div className="smart-search-controls">
              <button
                type="submit"
                className="smart-search-button"
                disabled={conceptLoading}
              >
                {conceptLoading ? 'Cercant...' : 'Relaciona'}
              </button>
            </div>
          </form>
          {conceptError && <p className="smart-search-error">{conceptError}</p>}
          {conceptResults.length > 0 && (
            <div className="smart-search-results">
              <p className="smart-search-hint">
                Resultats semàntics ({conceptResults.length} coincidències)
              </p>
              <ul>
                {conceptResults.map((result) => (
                  <li key={result.conceptId}>
                    <button
                      type="button"
                      className="smart-search-result"
                      onClick={() => {
                        if (result.articleId) {
                          void router.push(`/article/${result.articleId}`);
                        } else {
                          openChat({
                            bookId: result.bookId,
                            maximized: true
                          });
                        }
                      }}
                    >
                      <div className="smart-result-header">
                        <span className="smart-result-topic">{result.conceptTitle}</span>
                      </div>
                      <p className="smart-result-snippet">{result.snippet}</p>
                      {result.articleNumber && (
                        <p className="smart-result-article">
                          → {result.articleNumber}
                          {result.articleTitle ? ` · ${result.articleTitle}` : ''}
                        </p>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="smart-search-open-chat"
                onClick={() =>
                  openChat({
                    maximized: true
                  })
                }
              >
                Continuar amb Prudència (xat)
              </button>
            </div>
          )}
        </div>

        <nav>
          <ul className="sidebar-nav">
            {filteredStructure.map(({ book, sections, articlesCount }) => {
              const isBookExpanded = expandedBooks[book.id] ?? true;
              const hasSections = sections.length > 0;
              return (
                <li key={book.id} className="sidebar-book">
                  <div className="book-card">
                    <button
                      className="book-toggle"
                      onClick={() => toggleBook(book.id)}
                      aria-expanded={isBookExpanded}
                    >
                      <span className="book-chevron" aria-hidden="true" />
                      <div className="book-meta">
                        <span className="book-kicker">Llibre {book.number}</span>
                        <span className="book-title">{book.title}</span>
                      </div>
                      <span className="book-count">
                        {articlesCount} {articlesCount === 1 ? 'article' : 'articles'}
                      </span>
                    </button>
                    <p className="book-subtitle">{book.subtitle}</p>
                  </div>
                  {isBookExpanded && (
                    <>
                      {!hasSections ? (
                        <p className="sidebar-empty">Encara no hi ha articles disponibles.</p>
                      ) : (
                        <div className="book-sections">
                          {sections.map((section) => {
                            const sectionKey = `${book.id}::${section.name}`;
                            const isSectionExpanded = expandedSections[sectionKey] ?? false;
                            const articleLabel =
                              section.articles.length === 1 ? 'article' : 'articles';
                            return (
                              <div key={sectionKey} className="sidebar-section">
                                <button
                                  className="section-toggle"
                                  onClick={() => toggleSection(sectionKey)}
                                  aria-expanded={isSectionExpanded}
                                >
                                  <span className="section-chevron" aria-hidden="true" />
                                  <div className="section-info">
                                    <span className="section-name">{section.displayName}</span>
                                    <span className="section-path">{section.name}</span>
                                  </div>
                                  <span className="section-count">
                                    {section.articles.length} {articleLabel}
                                  </span>
                                </button>
                                {isSectionExpanded && (
                                  <ul className="section-articles">
                                    {section.articles.map((article) => {
                                      const isActive = currentPath === `/article/${article.id}`;
                                      return (
                                        <li key={article.id}>
                                          <Link
                                            href={`/article/${article.id}`}
                                            className={isActive ? 'active' : ''}
                                          >
                                            <span className="article-number">{article.number}</span>
                                            <span className="article-title-line">{article.title}</span>
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

