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
  // El text normatiu oficial és sempre en català (llengua oficial d'Andorra).
  const articleText = article.text_oficial;

  return (
    <div className="space-y-8">
      {/* Idioma note if not Catalan */}
      {idioma !== 'ca' && (
        <div className="p-3 bg-muted/60 rounded-lg border border-border/60 text-xs text-muted-foreground">
          {idioma === 'es'
            ? 'Texto oficial en catalán (lengua oficial del Principado de Andorra).'
            : 'Texte officiel en catalan (langue officielle de la Principauté d\'Andorre).'}
        </div>
      )}

      {/* Accordion / Expandable enriched sections */}
      <div className="space-y-4">
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

      {/* Main Legal Text Container */}
      <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 lg:p-10 shadow-2xs">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 pb-2 border-b border-border">
            {t(idioma, 'article.textOficial')}
          </h2>

          <div className="space-y-4 font-serif text-lg leading-relaxed text-foreground/90">
            {articleText.split('\n').map((line, index) => {
              const trimmed = line.trim();
              if (!trimmed) return null;

              const isNumbered = /^\d+\./.test(trimmed);
              const isLettered = /^[a-z]\)/i.test(trimmed);
              const isDashed = /^[-•·]/.test(trimmed);

              let paragraphClasses = 'leading-relaxed text-foreground/90';

              if (index === 0) {
                paragraphClasses += ' text-lg sm:text-xl font-normal';
              } else {
                paragraphClasses += ' text-base sm:text-lg';
              }

              if (isNumbered || isLettered || isDashed) {
                paragraphClasses += ' pl-6 sm:pl-8 -indent-4 sm:-indent-6';
              }

              return (
                <p key={index} className={paragraphClasses}>
                  {trimmed}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          {(() => {
            const tags =
              idioma === 'ca'
                ? article.tags
                : article.idiomes?.tags?.[idioma] || article.tags;
            return tags && tags.length > 0 ? (
              <div className="mt-8 pt-6 border-t border-border flex items-center gap-2 flex-wrap">
                <Tag className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-1">
                  {t(idioma, 'article.etiquetes')}:
                </span>
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null;
          })()}
        </div>
      </div>

      {/* Official Source Note Box */}
      <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 shrink-0">
            <ExternalLink className="h-4 w-4" />
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              Font oficial consolidada:
            </p>
            <p>
              Aquest text literal prové del{' '}
              <a
                href="https://www.bopa.ad"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline inline-flex items-center gap-0.5"
              >
                Butlletí Oficial del Principat d'Andorra (BOPA)
              </a>{' '}
              i de les publicacions legislatives del{' '}
              <a
                href="https://www.consellgeneral.ad"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline inline-flex items-center gap-0.5"
              >
                Consell General d'Andorra
              </a>
              . Per a la màxima validesa jurídica en tràmits o litigis, consulteu sempre la publicació oficial.
            </p>
          </div>
        </div>
      </div>

      {/* Article Navigation Bar */}
      <ArticleNavigation
        previousArticle={previousArticle}
        nextArticle={nextArticle}
        idioma={idioma}
      />
    </div>
  );
}
