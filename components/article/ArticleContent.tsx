import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ExternalLink, Tag } from 'lucide-react';
import { ArticleAndorra, InterpretacioIA as InterpretacioIAType } from '../../data/codis/types';
import { type DoctrinaCase } from '../../data/doctrina';
import { type Idioma, t } from '../../lib/i18n';
import { ArticleSummarySection } from './ArticleSummarySection';
import { ArticleExampleSection } from './ArticleExampleSection';
import { ArticleJurisprudenceSection } from './ArticleJurisprudenceSection';
import { ArticleNavigation } from './ArticleNavigation';

interface ArticleContentProps {
  article: ArticleAndorra;
  idioma: Idioma;
  interpretacio: InterpretacioIAType | null;
  doctrina?: DoctrinaCase[];
  previousArticle?: ArticleAndorra | null;
  nextArticle?: ArticleAndorra | null;
  onGenerateAssistencia: () => void;
  isGenerating: boolean;
}

export function ArticleContent({
  article,
  idioma,
  interpretacio,
  doctrina,
  previousArticle,
  nextArticle,
  onGenerateAssistencia,
  isGenerating,
}: ArticleContentProps) {
  const articleText = article.text_oficial;
  const splitRef = useRef<HTMLDivElement | null>(null);
  const [splitPct, setSplitPct] = useState(52);
  const [isDraggingSplit, setIsDraggingSplit] = useState(false);
  const [activeApartat, setActiveApartat] = useState<number | null>(null);
  const [activeInterpretacioTab, setActiveInterpretacioTab] = useState<'essencial' | 'aplicacio' | 'context' | 'aprendre'>('essencial');

  const exemplesEnIdioma = interpretacio?.exemples?.filter((e) => e.idioma === idioma) ?? [];
  const conceptesClau = interpretacio?.conceptes_clau ?? [];
  const termesSupervisats = article.dimensions_comprensio?.simplificacio_supervisada?.termes_clau ?? [];
  const etiquetes =
    idioma === 'ca'
      ? article.tags ?? []
      : article.idiomes?.tags?.[idioma] || article.tags || [];
  const glossari = Array.from(new Set([...conceptesClau, ...termesSupervisats, ...etiquetes])).slice(0, 12);
  const articlesRelacionats = Array.from(
    new Set([...(interpretacio?.articles_relacionats ?? []), ...(article.enllacos ?? [])])
  ).slice(0, 8);

  const copy = {
    essencial: idioma === 'ca' ? 'Essencial' : idioma === 'es' ? 'Esencial' : 'Essentiel',
    aplicacio: idioma === 'ca' ? 'Aplicació' : idioma === 'es' ? 'Aplicación' : 'Application',
    context: idioma === 'ca' ? 'Context' : idioma === 'es' ? 'Contexto' : 'Contexte',
    aprendre: idioma === 'ca' ? 'Aprendre' : idioma === 'es' ? 'Aprender' : 'Apprendre',
    permetLimita: idioma === 'ca' ? 'Què et permet / què et limita' : idioma === 'es' ? 'Qué permite / qué limita' : 'Ce que cela permet / limite',
    ambitAplicacio: idioma === 'ca' ? 'Àmbit d\'aplicació' : idioma === 'es' ? 'Ámbito de aplicación' : 'Champ d\'application',
    limitsExcepcions: idioma === 'ca' ? 'Límits i excepcions' : idioma === 'es' ? 'Límites y excepciones' : 'Limites et exceptions',
    impactePractic: idioma === 'ca' ? 'Impacte pràctic' : idioma === 'es' ? 'Impacto práctico' : 'Impact pratique',
    confusions: idioma === 'ca' ? 'Confusions freqüents' : idioma === 'es' ? 'Confusiones frecuentes' : 'Confusions fréquentes',
    relacioArticles: idioma === 'ca' ? 'Relació amb altres articles' : idioma === 'es' ? 'Relación con otros artículos' : 'Lien avec d\'autres articles',
    vigencia: idioma === 'ca' ? 'Estat normatiu i vigència' : idioma === 'es' ? 'Estado normativo y vigencia' : 'État normatif et vigueur',
    doctrinal: idioma === 'ca' ? 'Context doctrinal' : idioma === 'es' ? 'Contexto doctrinal' : 'Contexte doctrinal',
    paraulesClau: idioma === 'ca' ? 'Paraules jurídiques clau' : idioma === 'es' ? 'Palabras jurídicas clave' : 'Mots juridiques clés',
    itinerari: idioma === 'ca' ? 'Itinerari recomanat' : idioma === 'es' ? 'Itinerario recomendado' : 'Itinéraire recommandé',
    autoavaluacio: idioma === 'ca' ? 'Autoavaluació ràpida' : idioma === 'es' ? 'Autoevaluación rápida' : 'Autoévaluation rapide',
    noDisponible: idioma === 'ca' ? 'No disponible encara.' : idioma === 'es' ? 'Aún no disponible.' : 'Pas encore disponible.',
    jurisprudenciaHint:
      idioma === 'ca'
        ? 'La secció de jurisprudència es manté minimitzada per defecte.'
        : idioma === 'es'
          ? 'La sección de jurisprudencia se mantiene minimizada por defecto.'
          : 'La section de jurisprudence reste réduite par défaut.',
    limitsHint:
      idioma === 'ca'
        ? 'Revisa el text literal i les excepcions explícites ("excepte", "sense perjudici", etc.).'
        : idioma === 'es'
          ? 'Revisa el texto literal y las excepciones expresas ("salvo", etc.).'
          : 'Vérifier le texte littéral et les exceptions explicites.',
    confusionsHint:
      idioma === 'ca'
        ? 'No confonguis explicació pedagògica amb criteri vinculant: en cas de dubte, preval el text oficial.'
        : idioma === 'es'
          ? 'No confundas explicación pedagógica con criterio vinculante: en caso de duda, prevalece el texto oficial.'
          : 'Ne pas confondre explication pédagogique et critère contraignant: en cas de doute, le texte officiel prévaut.',
  };

  const clampSplit = useCallback((value: number) => {
    const min = 36;
    const max = 66;
    return Math.min(max, Math.max(min, value));
  }, []);

  const updateSplitFromPointer = useCallback((clientX: number) => {
    if (!splitRef.current) return;
    const rect = splitRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const rawPct = ((clientX - rect.left) / rect.width) * 100;
    setSplitPct(clampSplit(rawPct));
  }, [clampSplit]);

  const handleDividerPointerDown = useCallback((event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDraggingSplit(true);
  }, []);

  useEffect(() => {
    if (!isDraggingSplit) return;

    const handlePointerMove = (event: PointerEvent) => {
      updateSplitFromPointer(event.clientX);
    };

    const handlePointerUp = () => {
      setIsDraggingSplit(false);
    };

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [isDraggingSplit, updateSplitFromPointer]);

  return (
    <div className="article-shell">
      <div
        ref={splitRef}
        className="article-split-grid"
        style={{ '--article-split': `${splitPct}%` } as React.CSSProperties}
      >
        <section className="article-doc-column">
          {idioma !== 'ca' && (
            <div className="article-language-note">
              {idioma === 'es'
                ? 'Texto oficial en catalán (lengua oficial del Principado de Andorra).'
                : 'Texte officiel en catalan (langue officielle de la Principauté d\'Andorre).'}
            </div>
          )}

          <div className="article-card article-text-card">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2>{t(idioma, 'article.textOficial')}</h2>

              <div className="article-text-body">
                {articleText.split('\n').map((line, index) => {
                  const trimmed = line.trim();
                  if (!trimmed) return null;

                  const apartatMatch = trimmed.match(/^(\d+)\./);
                  const apartatNumber = apartatMatch ? Number(apartatMatch[1]) : null;
                  const isNumbered = /^\d+\./.test(trimmed);
                  const isLettered = /^[a-z]\)/i.test(trimmed);
                  const isDashed = /^[-•·]/.test(trimmed);

                  let paragraphClasses = 'article-text-paragraph';

                  if (index === 0) {
                    paragraphClasses += ' article-text-paragraph--lead';
                  }

                  if (isNumbered || isLettered || isDashed) {
                    paragraphClasses += ' article-text-paragraph--indented';
                  }

                  if (apartatNumber !== null) {
                    paragraphClasses += ' article-text-paragraph--apartat';
                    if (activeApartat === apartatNumber) {
                      paragraphClasses += ' article-text-paragraph--apartat-active';
                    }
                  }

                  return (
                    <p
                      key={index}
                      className={paragraphClasses}
                      onClick={() => {
                        if (apartatNumber === null) return;
                        setActiveApartat((prev) => (prev === apartatNumber ? null : apartatNumber));
                      }}
                      role={apartatNumber !== null ? 'button' : undefined}
                      tabIndex={apartatNumber !== null ? 0 : undefined}
                      onKeyDown={(event) => {
                        if (apartatNumber === null) return;
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          setActiveApartat((prev) => (prev === apartatNumber ? null : apartatNumber));
                        }
                      }}
                    >
                      {trimmed}
                    </p>
                  );
                })}
              </div>

              {(() => {
                const tags =
                  idioma === 'ca'
                    ? article.tags
                    : article.idiomes?.tags?.[idioma] || article.tags;
                return tags && tags.length > 0 ? (
                  <div className="article-tags">
                    <Tag className="article-tags-icon" />
                    <span>{t(idioma, 'article.etiquetes')}:</span>
                    {tags.map((tag, i) => (
                      <span key={i} className="article-tag-pill">{tag}</span>
                    ))}
                  </div>
                ) : null;
              })()}
            </div>
          </div>

          <div className="article-source-card">
            <div className="article-source-icon">
              <ExternalLink size={16} />
            </div>
            <div>
              <p className="article-source-title">Font oficial consolidada:</p>
              <p>
                Aquest text literal prové del{' '}
                <a href="https://www.bopa.ad" target="_blank" rel="noopener noreferrer">
                  Butlletí Oficial del Principat d'Andorra (BOPA)
                </a>{' '}
                i de les publicacions legislatives del{' '}
                <a href="https://www.consellgeneral.ad" target="_blank" rel="noopener noreferrer">
                  Consell General d'Andorra
                </a>
                . Per a la màxima validesa jurídica en tràmits o litigis, consulteu sempre la publicació oficial.
              </p>
            </div>
          </div>
        </section>

        <button
          type="button"
          className={`article-split-divider ${isDraggingSplit ? 'is-dragging' : ''}`}
          onPointerDown={handleDividerPointerDown}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault();
              setSplitPct((value) => clampSplit(value - 2));
            }
            if (event.key === 'ArrowRight') {
              event.preventDefault();
              setSplitPct((value) => clampSplit(value + 2));
            }
            if (event.key === 'Home') {
              event.preventDefault();
              setSplitPct(52);
            }
          }}
          role="separator"
          aria-orientation="vertical"
          aria-label="Amplada de les columnes"
          aria-valuemin={36}
          aria-valuemax={66}
          aria-valuenow={Math.round(splitPct)}
        >
          <span className="article-split-divider-grip" />
        </button>

        <aside className="article-interpretacio-column" aria-label="Interpretació de l'article">
          <nav className="article-segmented-tabs" aria-label="Tipus d'interpretació">
            {[
              { id: 'essencial' as const, label: copy.essencial },
              { id: 'aplicacio' as const, label: copy.aplicacio },
              { id: 'context' as const, label: copy.context },
              { id: 'aprendre' as const, label: copy.aprendre },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`article-segmented-tab ${activeInterpretacioTab === tab.id ? 'article-segmented-tab--active' : ''}`}
                onClick={() => setActiveInterpretacioTab(tab.id)}
                aria-pressed={activeInterpretacioTab === tab.id}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {activeApartat !== null && (
            <div className="article-apartat-filter-note">
              <span>
                Mostrant amb prioritat l'apartat <strong>{activeApartat}</strong>
              </span>
              <button type="button" onClick={() => setActiveApartat(null)}>
                Veure-ho tot
              </button>
            </div>
          )}

          <div className="article-section-stack">
            {activeInterpretacioTab === 'essencial' && (
              <>
                <ArticleSummarySection
                  article={article}
                  idioma={idioma}
                  interpretacio={interpretacio}
                  onGenerateAssistencia={onGenerateAssistencia}
                  isGenerating={isGenerating}
                />

                <div className="article-card article-guidance-card">
                  <h3>{copy.permetLimita}</h3>
                  <p>{interpretacio?.finalitat || interpretacio?.aplicacio || article.norma || copy.noDisponible}</p>
                </div>

                <div className="article-card article-guidance-card">
                  <h3>{copy.ambitAplicacio}</h3>
                  <p>{interpretacio?.destinataris || article.ambit || copy.noDisponible}</p>
                </div>

                <div className="article-card article-guidance-card">
                  <h3>{copy.limitsExcepcions}</h3>
                  <p>{copy.limitsHint}</p>
                </div>
              </>
            )}

            {activeInterpretacioTab === 'aplicacio' && (
              <>
                <ArticleExampleSection
                  article={article}
                  idioma={idioma}
                  interpretacio={interpretacio}
                  onGenerateAssistencia={onGenerateAssistencia}
                  isGenerating={isGenerating}
                />

                <div className="article-card article-guidance-card">
                  <h3>{copy.impactePractic}</h3>
                  <p>{article.dimensions_comprensio?.aplicabilitat_residencia?.ajuda_practica || interpretacio?.aplicacio || copy.noDisponible}</p>
                </div>

                <div className="article-card article-guidance-card">
                  <h3>{copy.confusions}</h3>
                  <p>{copy.confusionsHint}</p>
                  {exemplesEnIdioma.length > 0 && (
                    <ul className="article-guidance-list">
                      {exemplesEnIdioma.slice(0, 2).map((exemple, index) => (
                        <li key={index}>{exemple.cas}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}

            {activeInterpretacioTab === 'context' && (
              <>
                <ArticleJurisprudenceSection
                  article={article}
                  idioma={idioma}
                  interpretacio={interpretacio}
                  doctrina={doctrina}
                  onGenerateAssistencia={onGenerateAssistencia}
                  isGenerating={isGenerating}
                />

                <div className="article-card article-guidance-card">
                  <h3>{copy.doctrinal}</h3>
                  <p>{interpretacio?.doctrina_jurisprudencia || copy.noDisponible}</p>
                </div>

                <div className="article-card article-guidance-card">
                  <h3>{copy.relacioArticles}</h3>
                  {articlesRelacionats.length > 0 ? (
                    <ul className="article-guidance-list article-guidance-list--chips">
                      {articlesRelacionats.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{copy.noDisponible}</p>
                  )}
                </div>

                <div className="article-card article-guidance-card">
                  <h3>{copy.vigencia}</h3>
                  <p>{article.vigencia ? `${article.vigencia}. ${copy.jurisprudenciaHint}` : copy.jurisprudenciaHint}</p>
                </div>
              </>
            )}

            {activeInterpretacioTab === 'aprendre' && (
              <>
                <div className="article-card article-guidance-card">
                  <h3>{copy.paraulesClau}</h3>
                  {glossari.length > 0 ? (
                    <ul className="article-guidance-list article-guidance-list--chips">
                      {glossari.map((terme) => (
                        <li key={terme}>{terme}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{copy.noDisponible}</p>
                  )}
                </div>

                <div className="article-card article-guidance-card">
                  <h3>{copy.itinerari}</h3>
                  <ul className="article-guidance-list">
                    <li>{t(idioma, 'article.textOficial')}</li>
                    <li>{t(idioma, 'article.resum')}</li>
                    <li>{idioma === 'ca' ? 'Exemples i aplicació pràctica' : idioma === 'es' ? 'Ejemplos y aplicación práctica' : 'Exemples et application pratique'}</li>
                    <li>{t(idioma, 'article.jurisprudencia')}</li>
                  </ul>
                </div>

                <div className="article-card article-guidance-card">
                  <h3>{copy.autoavaluacio}</h3>
                  <ul className="article-guidance-list">
                    <li>{idioma === 'ca' ? 'Qui és el destinatari principal d\'aquest article?' : idioma === 'es' ? '¿Quién es el destinatario principal de este artículo?' : 'Qui est le destinataire principal de cet article?'}</li>
                    <li>{idioma === 'ca' ? 'Quina acció o limitació estableix expressament?' : idioma === 'es' ? '¿Qué acción o limitación establece expresamente?' : 'Quelle action ou limitation établit-il explicitement?'}</li>
                    <li>{idioma === 'ca' ? 'Hi ha excepcions textuals a tenir presents?' : idioma === 'es' ? '¿Hay excepciones textuales a tener presentes?' : 'Y a-t-il des exceptions textuelles à prendre en compte?'}</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <ArticleNavigation previousArticle={previousArticle} nextArticle={nextArticle} idioma={idioma} />
    </div>
  );
}
