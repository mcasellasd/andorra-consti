import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ExternalLink, Lightbulb, Tag } from 'lucide-react';
import { ArticleAndorra, ConstitutionalEditorialEntry } from '../../data/codis/types';
import { type DoctrinaCase } from '../../data/doctrina';
import { type Idioma, t } from '../../lib/i18n';
import { ArticleJurisprudenceSection } from './ArticleJurisprudenceSection';
import { ArticleNavigation } from './ArticleNavigation';
import { getContextConstitucional } from '../../lib/prompts/context-constitucional';
import { getInterpretacioBaseConstitucional } from '../../lib/constitutional-interpretation';
import { openChat } from '../chatUtils';

interface ArticleContentProps {
  article: ArticleAndorra;
  idioma: Idioma;
  editorial: ConstitutionalEditorialEntry | null;
  doctrina?: DoctrinaCase[];
  previousArticle?: ArticleAndorra | null;
  nextArticle?: ArticleAndorra | null;
}

export function ArticleContent({
  article,
  idioma,
  editorial,
  doctrina,
  previousArticle,
  nextArticle,
}: ArticleContentProps) {
  const articleText = article.text_oficial;
  const contextConstitucional = article.codi === 'constitucio'
    ? getContextConstitucional(article.numeracio)
    : null;
  const interpretacioBase = article.codi === 'constitucio'
    ? getInterpretacioBaseConstitucional(article.numeracio)
    : null;
  const splitRef = useRef<HTMLDivElement | null>(null);
  const [splitPct, setSplitPct] = useState(52);
  const [isDraggingSplit, setIsDraggingSplit] = useState(false);
  const [activeApartat, setActiveApartat] = useState<number | null>(null);
  const [activeInterpretacioTab, setActiveInterpretacioTab] = useState<'essencial' | 'aplicacio' | 'context' | 'aprendre'>('essencial');
  const [revealedLearningQuestions, setRevealedLearningQuestions] = useState<Record<number, boolean>>({});

  const conceptesClau = editorial?.conceptes_clau ?? [];
  const termesSupervisats = article.dimensions_comprensio?.simplificacio_supervisada?.termes_clau ?? [];
  const etiquetes =
    idioma === 'ca'
      ? article.tags ?? []
      : article.idiomes?.tags?.[idioma] || article.tags || [];
  const glossari = Array.from(new Set([...conceptesClau, ...termesSupervisats, ...etiquetes])).slice(0, 12);
  const articlesRelacionats = Array.from(
    new Set([...(editorial?.articles_relacionats ?? []), ...(article.enllacos ?? [])])
  ).slice(0, 8);
  const articlesDeFonament = contextConstitucional?.fonament.map((articleRef) => `Article ${articleRef}`) ?? [];
  const articlesRelacionatsMostrats = articlesRelacionats.length > 0 ? articlesRelacionats : articlesDeFonament;
  const preguntesAprenentatge = (editorial?.preguntes_aprenentatge?.length
    ? editorial.preguntes_aprenentatge
    : interpretacioBase?.preguntes) ?? [
      idioma === 'ca' ? 'Quin és el nucli d’aquest article?' : idioma === 'es' ? '¿Cuál es el núcleo de este artículo?' : 'Quel est le cœur de cet article?',
      idioma === 'ca' ? 'A qui s’adreça i en quin àmbit s’aplica?' : idioma === 'es' ? '¿A quién se dirige y en qué ámbito se aplica?' : 'À qui s’adresse-t-il et dans quel domaine s’applique-t-il ?',
      idioma === 'ca' ? 'Quins límits o garanties cal tenir presents?' : idioma === 'es' ? '¿Qué límites o garantías deben tenerse presentes?' : 'Quelles limites ou garanties faut-il garder à l’esprit ?'
    ];
  const pistesAprenentatge = [
    editorial?.finalitat.ca || interpretacioBase?.destinataris || '',
    editorial?.destinataris.ca || interpretacioBase?.aplicacio || '',
    editorial?.limits.ca || interpretacioBase?.limits || '',
  ];
  const editorialText = (value?: { ca: string; es?: string; fr?: string }) => value?.[idioma] || value?.ca || '';

  useEffect(() => {
    setRevealedLearningQuestions({});
  }, [article.id, idioma]);

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
    comAprendre: idioma === 'ca' ? 'Llegeix, relaciona i comprova' : idioma === 'es' ? 'Lee, relaciona y comprueba' : 'Lis, relie et vérifie',
    progrés: idioma === 'ca' ? '3 passos per entendre aquest article' : idioma === 'es' ? '3 pasos para entender este artículo' : '3 étapes pour comprendre cet article',
    pista: idioma === 'ca' ? 'Veure una pista' : idioma === 'es' ? 'Ver una pista' : 'Voir un indice',
    amagaPista: idioma === 'ca' ? 'Amagar pista' : idioma === 'es' ? 'Ocultar pista' : 'Masquer l’indice',
    respostaOrientativa: idioma === 'ca' ? 'Orientació' : idioma === 'es' ? 'Orientación' : 'Orientation',
    pendent: idioma === 'ca' ? 'Contingut pendent de revisió editorial' : idioma === 'es' ? 'Contenido pendiente de revisión editorial' : 'Contenu en attente de révision éditoriale',
    revisio: idioma === 'ca' ? 'En revisió editorial' : idioma === 'es' ? 'En revisión editorial' : 'En révision éditoriale',
    xat: idioma === 'ca' ? 'Preguntar al xat sobre aquest article' : idioma === 'es' ? 'Preguntar al chat sobre este artículo' : 'Interroger le chat sur cet article',
    font: idioma === 'ca' ? 'Fonts verificades' : idioma === 'es' ? 'Fuentes verificadas' : 'Sources vérifiées',
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
                <div className="article-card article-guidance-card article-editorial-summary">
                  <div className="article-editorial-heading">
                    <div>
                      <h3>{t(idioma, 'article.resum')}</h3>
                      <span className={`article-editorial-status article-editorial-status--${editorial?.estat || 'pendent'}`}>
                        {editorial?.estat === 'en-revisio' ? copy.revisio : copy.pendent}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="article-chat-link"
                      onClick={() => openChat({ question: `Vull entendre millor ${article.numeracio} de la Constitució d'Andorra.`, codeScope: 'constitucio' })}
                    >
                      <Lightbulb size={15} /> {copy.xat}
                    </button>
                  </div>
                  {editorialText(editorial?.resum) ? (
                    <p>{editorialText(editorial?.resum)}</p>
                  ) : (
                    <p className="article-editorial-empty">{copy.pendent}</p>
                  )}
                </div>

                <div className="article-card article-guidance-card">
                  <h3>{copy.permetLimita}</h3>
                  <p>{editorialText(editorial?.finalitat) || interpretacioBase?.context.quePucFer || copy.noDisponible}</p>
                </div>

                <div className="article-card article-guidance-card">
                  <h3>{copy.ambitAplicacio}</h3>
                  <p>{editorialText(editorial?.destinataris) || article.ambit || interpretacioBase?.destinataris || copy.noDisponible}</p>
                </div>

                <div className="article-card article-guidance-card">
                  <h3>{copy.limitsExcepcions}</h3>
                  <p>{editorialText(editorial?.limits) || interpretacioBase?.limits || copy.limitsHint}</p>
                </div>
              </>
            )}

            {activeInterpretacioTab === 'aplicacio' && (
              <>
                <div className="article-card article-guidance-card">
                  <h3>{copy.impactePractic}</h3>
                  <p>{editorialText(editorial?.aplicacio) || article.dimensions_comprensio?.aplicabilitat_residencia?.ajuda_practica || interpretacioBase?.aplicacio || copy.noDisponible}</p>
                </div>

                <div className="article-card article-guidance-card">
                  <h3>{copy.confusions}</h3>
                  <p>{copy.confusionsHint}</p>
                  {editorial?.notes_revisio && <p className="article-editorial-note">{editorial.notes_revisio}</p>}
                </div>
              </>
            )}

            {activeInterpretacioTab === 'context' && (
              <>
                <ArticleJurisprudenceSection
                  article={article}
                  idioma={idioma}
                  doctrina={doctrina}
                />

                <div className="article-card article-guidance-card">
                  <h3>{copy.doctrinal}</h3>
                  <p>{copy.noDisponible}</p>
                </div>

                <div className="article-card article-guidance-card">
                  <h3>{copy.font}</h3>
                  {editorial?.fonts.length ? (
                    <ul className="article-guidance-list">
                      {editorial.fonts.map((font) => <li key={font.id}>{font.referencia}</li>)}
                    </ul>
                  ) : <p>{copy.noDisponible}</p>}
                </div>

                <div className="article-card article-guidance-card">
                  <h3>{copy.relacioArticles}</h3>
                  {articlesRelacionatsMostrats.length > 0 ? (
                    <ul className="article-guidance-list article-guidance-list--chips">
                      {articlesRelacionatsMostrats.map((item) => (
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
                <div className="article-learning-intro">
                  <div className="article-learning-intro__icon" aria-hidden="true"><Lightbulb size={20} /></div>
                  <div>
                    <p className="article-learning-intro__eyebrow">{copy.aprendre}</p>
                    <h3>{copy.comAprendre}</h3>
                    <p>{copy.progrés}</p>
                  </div>
                </div>

                <div className="article-card article-guidance-card article-learning-card">
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

                <div className="article-card article-guidance-card article-learning-card">
                  <h3>{copy.itinerari}</h3>
                  <ol className="article-learning-path">
                    {[
                      t(idioma, 'article.textOficial'),
                      t(idioma, 'article.resum'),
                      idioma === 'ca' ? 'Exemples i aplicació pràctica' : idioma === 'es' ? 'Ejemplos y aplicación práctica' : 'Exemples et application pratique',
                      t(idioma, 'article.jurisprudencia'),
                    ].map((step, index) => (
                      <li key={step}>
                        <span className="article-learning-path__marker"><CheckCircle2 size={15} /></span>
                        <span>{step}</span>
                        {index < 3 && <ArrowRight className="article-learning-path__arrow" size={15} aria-hidden="true" />}
                      </li>
                    ))}
                  </ol>
                  <p className="article-learning-note">
                    {idioma === 'ca' ? 'Objectiu: poder explicar la norma amb les teves paraules i situar-la dins la Constitució.' : idioma === 'es' ? 'Objetivo: poder explicar la norma con tus palabras y situarla dentro de la Constitución.' : 'Objectif : pouvoir expliquer la norme avec vos mots et la situer dans la Constitution.'}
                  </p>
                </div>

                <div className="article-card article-guidance-card article-learning-card article-learning-questions">
                  <div className="article-learning-card__heading">
                    <div>
                      <h3>{copy.autoavaluacio}</h3>
                      <p>{idioma === 'ca' ? 'Intenta respondre abans d’obrir cada pista.' : idioma === 'es' ? 'Intenta responder antes de abrir cada pista.' : 'Essayez de répondre avant d’ouvrir chaque indice.'}</p>
                    </div>
                    <span className="article-learning-count">{preguntesAprenentatge.length}</span>
                  </div>
                  <ol className="article-learning-questions-list">
                    {preguntesAprenentatge.map((pregunta, index) => {
                      const hasHint = Boolean(pistesAprenentatge[index]);
                      const isRevealed = revealedLearningQuestions[index];
                      return (
                        <li key={pregunta}>
                          <div className="article-learning-question">
                            <span>{index + 1}</span>
                            <p>{pregunta}</p>
                          </div>
                          {hasHint && (
                            <>
                              <button
                                type="button"
                                className="article-learning-hint-button"
                                onClick={() => setRevealedLearningQuestions((current) => ({ ...current, [index]: !current[index] }))}
                                aria-expanded={isRevealed}
                              >
                                <Lightbulb size={15} /> {isRevealed ? copy.amagaPista : copy.pista}
                              </button>
                              {isRevealed && (
                                <div className="article-learning-hint">
                                  <strong>{copy.respostaOrientativa}</strong>
                                  <p>{pistesAprenentatge[index]}</p>
                                </div>
                              )}
                            </>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>

      <ArticleNavigation previousArticle={previousArticle} nextArticle={nextArticle} idioma={idioma} />
    </div>
  );
}
