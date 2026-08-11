/**
 * Component d'Interpretació Assistida per IA
 * Segons el briefing tècnic de dretplaner.ad
 * 
 * Genera resums, exemples i conceptes clau per a cada article legal
 */

import React, { useState, useEffect } from 'react';
import { ArticleAndorra, InterpretacioIA as InterpretacioIAType } from '../../data/codis/types';

interface InterpretacioIAProps {
  article: ArticleAndorra;
  idioma: 'ca' | 'es' | 'fr';
  onToggle?: (activat: boolean) => void;
}

const InterpretacioIA: React.FC<InterpretacioIAProps> = ({ article, idioma, onToggle }) => {
  const [activat, setActivat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [interpretacio, setInterpretacio] = useState<InterpretacioIAType | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Reset de l'estat quan canvia l'article o l'idioma
  useEffect(() => {
    setActivat(false);
    setInterpretacio(null);
    setError(null);
    setLoading(false);
    onToggle?.(false);
  }, [article.id, idioma, onToggle]);

  useEffect(() => {
    if (activat && !interpretacio && !loading) {
      generarInterpretacio();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activat, article.id, idioma]);

  const generarInterpretacio = async () => {
    setLoading(true);
    setError(null);

    try {
      const resposta = await fetch('/api/unified-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          article_id: article.id,
          text_oficial: article.text_oficial,
          numeracio: article.numeracio,
          idioma,
        }),
      });

      if (!resposta.ok) {
        let errorMessage = 'Error al generar la interpretació';
        try {
          const errorData = await resposta.json();
          if (errorData.error) errorMessage = errorData.error;
        } catch (e) {
          // Si falla el parseig JSON, mantenim el missatge per defecte
        }
        throw new Error(errorMessage);
      }

      const data = await resposta.json();
      setInterpretacio(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconegut');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    const nouEstat = !activat;
    setActivat(nouEstat);
    onToggle?.(nouEstat);
  };

  return (
    <div className="interpretacio-ia">
      <div className="interpretacio-ia__toggle">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={activat}
            onChange={handleToggle}
            aria-label="Mostrar interpretació amb IA"
          />
          <span>
            {idioma === 'ca' && 'Mostrar interpretació assistida per IA'}
            {idioma === 'es' && 'Mostrar interpretación asistida por IA'}
            {idioma === 'fr' && 'Afficher l\'interprétation assistée par IA'}
          </span>
        </label>
      </div>

      {activat && (
        <div className="interpretacio-ia__content">
          {loading && (
            <div className="interpretacio-ia__loading">
              <p>
                {idioma === 'ca' && 'Generant interpretació...'}
                {idioma === 'es' && 'Generando interpretación...'}
                {idioma === 'fr' && 'Génération de l\'interprétation...'}
              </p>
            </div>
          )}

          {error && (
            <div className="interpretacio-ia__error">
              <p>{error}</p>
            </div>
          )}

          {interpretacio && !loading && (
            <div className="interpretacio-ia__sections">
              {/* Resum */}
              <section className="interpretacio-section">
                <h3>
                  {idioma === 'ca' && 'Resum'}
                  {idioma === 'es' && 'Resumen'}
                  {idioma === 'fr' && 'Résumé'}
                </h3>
                <p>{interpretacio.resum[idioma]}</p>
              </section>

              {/* Exemples pràctics */}
              {interpretacio.exemples.length > 0 && (
                <section className="interpretacio-section">
                  <h3>
                    {idioma === 'ca' && 'Exemples pràctics'}
                    {idioma === 'es' && 'Ejemplos prácticos'}
                    {idioma === 'fr' && 'Exemples pratiques'}
                  </h3>
                  <ul>
                    {interpretacio.exemples
                      .filter((ex) => ex.idioma === idioma)
                      .map((exemple, index) => (
                        <li key={index}>{exemple.cas}</li>
                      ))}
                  </ul>
                </section>
              )}

              {/* Conceptes clau */}
              {interpretacio.conceptes_clau.length > 0 && (
                <section className="interpretacio-section">
                  <h3>
                    {idioma === 'ca' && 'Conceptes clau'}
                    {idioma === 'es' && 'Conceptos clave'}
                    {idioma === 'fr' && 'Concepts clés'}
                  </h3>
                  <div className="conceptes-tags">
                    {interpretacio.conceptes_clau.map((concepte, index) => (
                      <span key={index} className="concepte-tag">
                        {concepte}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Finalitat */}
              {interpretacio.finalitat && (
                <section className="interpretacio-section">
                  <h3>
                    {idioma === 'ca' && 'Per a què serveix aquesta norma'}
                    {idioma === 'es' && 'Para qué sirve esta norma'}
                    {idioma === 'fr' && 'À quoi sert cette norme'}
                  </h3>
                  <p>{interpretacio.finalitat}</p>
                </section>
              )}

              {/* Destinataris */}
              {interpretacio.destinataris && (
                <section className="interpretacio-section">
                  <h3>
                    {idioma === 'ca' && 'A qui va dirigida'}
                    {idioma === 'es' && 'A quién va dirigida'}
                    {idioma === 'fr' && 'À qui elle s\'adresse'}
                  </h3>
                  <p>{interpretacio.destinataris}</p>
                </section>
              )}

              {/* Aplicació */}
              {interpretacio.aplicacio && (
                <section className="interpretacio-section">
                  <h3>
                    {idioma === 'ca' && 'Com s\'aplica'}
                    {idioma === 'es' && 'Cómo se aplica'}
                    {idioma === 'fr' && 'Comment elle s\'applique'}
                  </h3>
                  <p>{interpretacio.aplicacio}</p>
                </section>
              )}

              {/* Límits i context */}
              {interpretacio.limits && (
                <section className="interpretacio-section">
                  <h3>
                    {idioma === 'ca' && 'Límits i excepcions'}
                    {idioma === 'es' && 'Límites y excepciones'}
                    {idioma === 'fr' && 'Limites et exceptions'}
                  </h3>
                  <p>{interpretacio.limits}</p>
                </section>
              )}

              {interpretacio.context && (
                <section className="interpretacio-section">
                  <h3>
                    {idioma === 'ca' && 'Context constitucional'}
                    {idioma === 'es' && 'Contexto constitucional'}
                    {idioma === 'fr' && 'Contexte constitutionnel'}
                  </h3>
                  <p>{interpretacio.context}</p>
                </section>
              )}

              {/* Preguntes d'aprenentatge */}
              {interpretacio.preguntes_aprenentatge && interpretacio.preguntes_aprenentatge.length > 0 && (
                <section className="interpretacio-section">
                  <h3>
                    {idioma === 'ca' && 'Per pensar-hi'}
                    {idioma === 'es' && 'Para reflexionar'}
                    {idioma === 'fr' && 'Pour réfléchir'}
                  </h3>
                  <ul>
                    {interpretacio.preguntes_aprenentatge.map((pregunta, index) => (
                      <li key={index}>{pregunta}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Comentari Doctrinal IA */}
              {interpretacio.doctrina_jurisprudencia && (
                <section className="interpretacio-section">
                  <h3>
                    {idioma === 'ca' && 'Comentari doctrinal IA'}
                    {idioma === 'es' && 'Comentario doctrinal IA'}
                    {idioma === 'fr' && 'Commentaire doctrinal IA'}
                  </h3>
                  <p>{interpretacio.doctrina_jurisprudencia}</p>
                </section>
              )}

              {/* Fonts declarades */}
              {interpretacio.fonts && interpretacio.fonts.length > 0 && (
                <section className="interpretacio-section">
                  <h3>
                    {idioma === 'ca' && 'Fonts utilitzades'}
                    {idioma === 'es' && 'Fuentes utilizadas'}
                    {idioma === 'fr' && 'Sources utilisées'}
                  </h3>
                  <ul>
                    {interpretacio.fonts.map((font) => (
                      <li key={`${font.tipus}-${font.id}`}>
                        <span>{font.referencia}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Articles relacionats */}
              {interpretacio.articles_relacionats.length > 0 && (
                <section className="interpretacio-section">
                  <h3>
                    {idioma === 'ca' && 'Articles relacionats'}
                    {idioma === 'es' && 'Artículos relacionados'}
                    {idioma === 'fr' && 'Articles liés'}
                  </h3>
                  <ul>
                    {interpretacio.articles_relacionats.map((articleId) => (
                      <li key={articleId}>
                        <a href={articleId.startsWith('CONST_')
                          ? `/codis/constitucio/article/${articleId}`
                          : `/codis/civil/article/${articleId}`}>{articleId}</a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InterpretacioIA;
