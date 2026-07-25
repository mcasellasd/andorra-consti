import React, { useState } from 'react';
import { BookOpen, Sparkles, Loader2, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { ArticleAndorra, InterpretacioIA as InterpretacioIAType } from '../../data/codis/types';
import { type Idioma, t } from '../../lib/i18n';

interface ArticleExampleSectionProps {
  article: ArticleAndorra;
  idioma: Idioma;
  interpretacio: InterpretacioIAType | null;
  onGenerateAssistencia: () => void;
  isGenerating: boolean;
}

export function ArticleExampleSection({
  article,
  idioma,
  interpretacio,
  onGenerateAssistencia,
  isGenerating,
}: ArticleExampleSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasGoldenApplicability = !!article.dimensions_comprensio?.aplicabilitat_residencia;
  const exemplesEnIdioma = interpretacio?.exemples?.filter((e) => e.idioma === idioma) ?? [];
  const hasAIExamples = exemplesEnIdioma.length > 0;

  return (
    <details
      className="group border border-amber-200 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl overflow-hidden shadow-sm transition-all mb-6"
      open={isOpen}
      onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="flex items-center justify-between gap-4 px-5 py-4 font-semibold text-amber-950 dark:text-amber-100 cursor-pointer select-none bg-amber-100/70 hover:bg-amber-100 dark:bg-amber-900/40 dark:hover:bg-amber-900/60 transition-colors list-none">
        <div className="flex items-center gap-3">
          <BookOpen className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
          <span className="text-base tracking-wide uppercase font-bold text-amber-900 dark:text-amber-200">
            {t(idioma, 'article.exempleAplicat')}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {!hasAIExamples && !hasGoldenApplicability && (
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
              className="bg-white dark:bg-slate-900 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700 hover:bg-amber-50 text-xs font-semibold gap-1.5 shadow-xs"
            >
              {isGenerating ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              )}
              <span>{t(idioma, 'article.interpretacioIA')}</span>
            </Button>
          )}

          <ChevronDown className="h-5 w-5 text-amber-700 dark:text-amber-300 transition-transform duration-200 group-open:rotate-180" />
        </div>
      </summary>

      <div className="p-5 text-foreground space-y-4 border-t border-amber-200/60 dark:border-amber-900/40">
        {/* Golden Record Aplicabilitat */}
        {hasGoldenApplicability && (
          <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-lg border border-amber-200/80 dark:border-amber-800/50 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              {t(idioma, 'article.aplicabilitatPractica')}
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <span className="font-semibold text-amber-900 dark:text-amber-200 min-w-[90px]">
                  {t(idioma, 'article.ajuda')}:
                </span>
                <span className="text-foreground/90">
                  {article.dimensions_comprensio!.aplicabilitat_residencia.ajuda_practica}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <span className="font-semibold text-amber-900 dark:text-amber-200 min-w-[90px]">
                  {t(idioma, 'article.subjectes')}:
                </span>
                <span className="text-foreground/90">
                  {article.dimensions_comprensio!.aplicabilitat_residencia.subjectivitat}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Exemples generats per IA */}
        {hasAIExamples && (
          <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-lg border border-amber-200/80 dark:border-amber-800/50 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              {t(idioma, 'article.exemplesGenerats')}
            </h4>
            <div className="space-y-3">
              {exemplesEnIdioma.map((exemple, idx) => (
                <div key={idx} className="p-3 bg-amber-50/50 dark:bg-amber-950/40 rounded border border-amber-100 dark:border-amber-900/50">
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    <strong className="text-amber-900 dark:text-amber-200">{t(idioma, 'article.casPractic')}:</strong> {exemple.cas}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Estat carregant o invitació */}
        {!hasGoldenApplicability && !hasAIExamples && (
          <div className="text-center py-6 px-4">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center gap-2 text-amber-800 dark:text-amber-300">
                <Loader2 className="h-6 w-6 animate-spin" />
                <p className="text-sm font-medium">{t(idioma, 'article.generantExemples')}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  {t(idioma, 'article.clicAssisteixMeExemples')}
                </p>
                <Button
                  onClick={onGenerateAssistencia}
                  size="sm"
                  className="bg-amber-600 hover:bg-amber-700 text-white font-medium gap-2 shadow-sm"
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
