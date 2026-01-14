import React, { useState, useEffect, useRef } from 'react';
import { getJurisprudenceForArticle, type JurisprudenceCase } from '../data/jurisprudence';

interface JurisprudenceSectionProps {
  articleId: string;
  articleNumber: string;
  articleTitle: string;
  articleContent: string;
}

const JurisprudenceSection: React.FC<JurisprudenceSectionProps> = ({
  articleId,
  articleNumber,
  articleTitle,
  articleContent,
}) => {
  const [results, setResults] = useState<JurisprudenceCase[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const previousArticleId = useRef<string | null>(null);

  // Carregar jurisprudència quan canvia l'article
  useEffect(() => {
    // Si canvia l'article, netejar els resultats
    if (previousArticleId.current !== null && previousArticleId.current !== articleId) {
      setResults([]);
      setIsOpen(false);
    }

    // Buscar jurisprudència relacionada amb aquest article
    const jurisprudenceResults = getJurisprudenceForArticle(articleId, articleNumber);
    setResults(jurisprudenceResults);

    // Si hi ha resultats, obrir la secció automàticament
    if (jurisprudenceResults.length > 0) {
      setIsOpen(true);
    }

    previousArticleId.current = articleId;
  }, [articleId, articleNumber]);

  // Si no hi ha resultats, no mostrar res
  if (results.length === 0) {
    return null;
  }

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ca-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <details className="article-jurisprudence" open={isOpen} onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}>
      <summary className="jurisprudence-toggle">
        <div className="article-panel-header">
          <strong>JURISPRUDÈNCIA</strong>
          <span className="jurisprudence-count">{results.length} {results.length === 1 ? 'cas' : 'casos'}</span>
          <span className="article-panel-icon jurisprudence-icon">{isOpen ? '−' : '+'}</span>
        </div>
      </summary>
      <div className="jurisprudence-content">
        <div className="jurisprudence-results">
          <p style={{ marginBottom: '1rem', color: '#666', fontSize: '0.9rem' }}>
            S'han trobat {results.length} {results.length === 1 ? 'cas relacionat' : 'casos relacionats'} amb l'article {articleNumber}:
          </p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {results.map((result) => (
              <li key={result.id} className="jurisprudence-case">
                <div className="jurisprudence-case-header">
                  <h4 className="jurisprudence-case-title">
                    {result.url ? (
                      <a 
                        href={result.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="jurisprudence-link"
                      >
                        {result.title}
                      </a>
                    ) : (
                      result.title
                    )}
                  </h4>
                  {result.caseNumber && (
                    <span className="jurisprudence-case-number">{result.caseNumber}</span>
                  )}
                </div>
                <div className="jurisprudence-case-meta">
                  <span className="jurisprudence-court">
                    <strong>Tribunal:</strong> {result.court}
                  </span>
                  <span className="jurisprudence-date">
                    <strong>Data:</strong> {formatDate(result.date)}
                  </span>
                </div>
                {result.snippet && (
                  <p className="jurisprudence-snippet">{result.snippet}</p>
                )}
              </li>
            ))}
          </ul>
          <div className="jurisprudence-disclaimer">
            <strong>Avís:</strong> La informació de jurisprudència és orientativa i no constitueix assessorament legal. Per a consultes específiques, adreça't a professionals titulats.
          </div>
        </div>
      </div>
    </details>
  );
};

export default JurisprudenceSection;

