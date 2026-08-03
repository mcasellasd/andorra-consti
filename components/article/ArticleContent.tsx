import React from 'react';
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

  return (
    <div className="article-shell">
      {idioma !== 'ca' && (
        <div className="article-language-note">
          {idioma === 'es'
            ? 'Texto oficial en catalán (lengua oficial del Principado de Andorra).'
            : 'Texte officiel en catalan (langue officielle de la Principauté d\'Andorre).'}
        </div>
      )}

      <div className="article-section-stack">
        <ArticleSummarySection
          article={article}
          idioma={idioma}
          interpretacio={interpretacio}
          onGenerateAssistencia={onGenerateAssistencia}
          isGenerating={isGenerating}
        />

        <ArticleExampleSection
          article={article}
          idioma={idioma}
          interpretacio={interpretacio}
          onGenerateAssistencia={onGenerateAssistencia}
          isGenerating={isGenerating}
        />

        <ArticleJurisprudenceSection
          article={article}
          idioma={idioma}
          interpretacio={interpretacio}
          doctrina={doctrina}
          onGenerateAssistencia={onGenerateAssistencia}
          isGenerating={isGenerating}
        />
      </div>

      <div className="article-card article-text-card">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <h2>{t(idioma, 'article.textOficial')}</h2>

          <div className="article-text-body">
            {articleText.split('\n').map((line, index) => {
              const trimmed = line.trim();
              if (!trimmed) return null;

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

              return (
                <p key={index} className={paragraphClasses}>
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

      <ArticleNavigation previousArticle={previousArticle} nextArticle={nextArticle} idioma={idioma} />
    </div>
  );
}
