/**
 * Component de jurisprudència per articles legals d'Andorra
 */

import React, { useState, useEffect } from 'react';
import { getJurisprudenciaForArticle, type SentenciaAndorra } from '../data/jurisprudencia-andorra';
import { t, type Idioma } from '../lib/i18n';

interface JurisprudenciaSectionProps {
  articleId: string;
  articleNumber: string;
  idioma: Idioma;
}

const JurisprudenciaSection: React.FC<JurisprudenciaSectionProps> = ({
  articleId,
  articleNumber,
  idioma,
}) => {
  const [sentencies, setSentencies] = useState<SentenciaAndorra[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Carregar jurisprudència relacionada amb l'article
    const relatedJurisprudence = getJurisprudenciaForArticle(articleId);
    setSentencies(relatedJurisprudence);
    
    // Obrir automàticament si hi ha sentències
    if (relatedJurisprudence.length > 0) {
      setIsOpen(true);
    }
  }, [articleId]);

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(idioma === 'ca' ? 'ca-ES' : idioma === 'es' ? 'es-ES' : 'fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  if (sentencies.length === 0) {
    return null; // No mostrar res si no hi ha jurisprudència
  }

  return (
    <section className="article-jurisprudencia">
      <details open={isOpen} onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}>
        <summary className="jurisprudencia-toggle">
          <span className="section-label">{t(idioma, 'article.jurisprudencia')}</span>
          <span className="jurisprudencia-count">({sentencies.length})</span>
        </summary>
        
        <div className="jurisprudencia-content">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {sentencies.map((sentencia) => (
              <li key={sentencia.id} className="jurisprudencia-case" style={{
                marginBottom: '1.5rem',
                padding: '1rem',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                backgroundColor: '#fafafa',
              }}>
                <div className="jurisprudencia-case-header" style={{
                  marginBottom: '0.75rem',
                }}>
                  <h4 className="jurisprudencia-case-title" style={{
                    margin: 0,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                  }}>
                    {sentencia.titol ? (
                      sentencia.text_complet_url ? (
                        <a 
                          href={sentencia.text_complet_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: '#6c5ce7', textDecoration: 'none' }}
                        >
                          {sentencia.titol}
                        </a>
                      ) : (
                        sentencia.titol
                      )
                    ) : (
                      `Sentència ${sentencia.numero}`
                    )}
                  </h4>
                  {sentencia.numero && (
                    <span className="jurisprudencia-case-number" style={{
                      fontSize: '0.85rem',
                      color: '#666',
                      fontFamily: 'monospace',
                    }}>
                      {sentencia.numero}
                    </span>
                  )}
                </div>
                
                <div className="jurisprudencia-case-meta" style={{
                  display: 'flex',
                  gap: '1.5rem',
                  marginBottom: '0.75rem',
                  fontSize: '0.9rem',
                  color: '#666',
                  flexWrap: 'wrap',
                }}>
                  <span className="jurisprudencia-court">
                    <strong>{t(idioma, 'article.tribunal')}:</strong> {sentencia.tribunal}
                  </span>
                  <span className="jurisprudencia-date">
                    <strong>{t(idioma, 'article.dataSentencia')}:</strong> {formatDate(sentencia.data)}
                  </span>
                  {sentencia.numero && (
                    <span className="jurisprudencia-case-number">
                      <strong>{t(idioma, 'article.numeroSentencia')}:</strong> {sentencia.numero}
                    </span>
                  )}
                </div>
                
                {sentencia.resum && (
                  <p className="jurisprudencia-resum" style={{
                    margin: 0,
                    lineHeight: '1.6',
                    color: '#444',
                  }}>
                    {sentencia.resum}
                  </p>
                )}
                
                {sentencia.text_complet_url && (
                  <div style={{ marginTop: '0.75rem' }}>
                    <a 
                      href={sentencia.text_complet_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        color: '#6c5ce7',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                      }}
                    >
                      → Veure sentència completa
                    </a>
                  </div>
                )}
              </li>
            ))}
          </ul>
          
          <div className="jurisprudencia-disclaimer" style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: '#f0f4ff',
            border: '1px solid #c3dafe',
            borderRadius: '4px',
            fontSize: '0.85rem',
            color: '#333',
          }}>
            <strong>Avís:</strong> La informació de jurisprudència és orientativa i no constitueix assessorament legal. Per a consultes específiques, adreça't a professionals titulats.
          </div>
        </div>
      </details>
    </section>
  );
};

export default JurisprudenciaSection;
