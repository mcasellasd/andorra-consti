import React, { useState } from 'react';
import { FileText, Sparkles, Loader2, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { ArticleAndorra, InterpretacioIA as InterpretacioIAType } from '../../data/codis/types';
import { type Idioma, t } from '../../lib/i18n';

interface ArticleSummarySectionProps {
  article: ArticleAndorra;
  idioma: Idioma;
  interpretacio: InterpretacioIAType | null;
  onGenerateAssistencia: () => void;
  isGenerating: boolean;
}

export function ArticleSummarySection({
  article,
  idioma,
  interpretacio,
  onGenerateAssistencia,
  isGenerating,
}: ArticleSummarySectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasGoldenSummary = !!article.dimensions_comprensio?.simplificacio_supervisada;
  const hasAISummary = !!interpretacio?.resum?.[idioma];

  return (
    <details
      className="group border border-sky-200 dark:border-sky-900/60 bg-sky-50/60 dark:bg-sky-950/20 rounded-xl overflow-hidden shadow-sm transition-all mb-6"
      open={isOpen}
      onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="flex items-center justify-between gap-4 px-5 py-4 font-semibold text-sky-950 dark:text-sky-100 cursor-pointer select-none bg-sky-100/70 hover:bg-sky-100 dark:bg-sky-900/40 dark:hover:bg-sky-900/60 transition-colors list-none">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-sky-600 dark:text-sky-400 shrink-0" />
          <span className="text-base tracking-wide uppercase font-bold text-sky-900 dark:text-sky-200">
            {t(idioma, 'article.resum')}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {!hasAISummary && !hasGoldenSummary && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onGenerateAssistencia();
                setIsOpen(true);
              }}
              disabled={isGenerating}
              className="bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-700 hover:bg-sky-50 text-xs font-semibold gap-1.5 shadow-xs"
            >
              {isGenerating ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Sparkles className="h-3.5 w-3.5 text-sky-500" />
              )}
              <span>{t(idioma, 'article.interpretacioIA')}</span>
            </Button>
          )}

          <ChevronDown className="h-5 w-5 text-sky-700 dark:text-sky-300 transition-transform duration-200 group-open:rotate-180" />
        </div>
      </summary>

      <div className="p-5 text-foreground space-y-4 border-t border-sky-200/60 dark:border-sky-900/40">
        {/* Golden Record Supervisat */}
        {hasGoldenSummary && (
          <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-lg border border-sky-200/80 dark:border-sky-800/50 shadow-xs space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
              {t(idioma, 'article.explicacioPlanera')}
            </h4>
            <p className="text-sm lg:text-base text-foreground/90 leading-relaxed">
              {article.dimensions_comprensio!.simplificacio_supervisada.nivell_planer}
            </p>
            {article.dimensions_comprensio!.simplificacio_supervisada.termes_clau?.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-1.5">
                {article.dimensions_comprensio!.simplificacio_supervisada.termes_clau.map((term, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium bg-sky-100/80 dark:bg-sky-900/60 text-sky-800 dark:text-sky-200 px-2.5 py-0.5 rounded-full border border-sky-200 dark:border-sky-700"
                  >
                    {term}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Resum generat per IA */}
        {hasAISummary && (
          <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-lg border border-sky-200/80 dark:border-sky-800/50 shadow-xs space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-sky-500" />
              {t(idioma, 'article.resumIA')}
            </h4>
            <p className="text-sm lg:text-base text-foreground/90 leading-relaxed whitespace-pre-line">
              {interpretacio!.resum[idioma]}
            </p>
          </div>
        )}

        {/* Estat carregant o invitació */}
        {!hasGoldenSummary && !hasAISummary && (
          <div className="text-center py-6 px-4">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center gap-2 text-sky-700 dark:text-sky-300">
                <Loader2 className="h-6 w-6 animate-spin" />
                <p className="text-sm font-medium">{t(idioma, 'article.generantResum')}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  {t(idioma, 'article.clicAssisteixMeResum')}
                </p>
                <Button
                  onClick={onGenerateAssistencia}
                  size="sm"
                  className="bg-sky-600 hover:bg-sky-700 text-white font-medium gap-2 shadow-sm"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{t(idioma, 'article.assisteixMe')}</span>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </details>
  );
}
