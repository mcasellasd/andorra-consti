import React, { useState } from 'react';
import { Scale, Sparkles, Loader2, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { ArticleAndorra, InterpretacioIA as InterpretacioIAType } from '../../data/codis/types';
import { type DoctrinaCase } from '../../data/doctrina';
import { type Idioma, t } from '../../lib/i18n';
import JurisprudenciaSection from '../JurisprudenciaSection';

interface ArticleJurisprudenceSectionProps {
  article: ArticleAndorra;
  idioma: Idioma;
  interpretacio: InterpretacioIAType | null;
  doctrina?: DoctrinaCase[];
  onGenerateAssistencia: () => void;
  isGenerating: boolean;
}

export function ArticleJurisprudenceSection({
  article,
  idioma,
  interpretacio,
  doctrina,
  onGenerateAssistencia,
  isGenerating,
}: ArticleJurisprudenceSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasDogmatica = !!article.dimensions_comprensio?.dogmatica;
  const hasAIDoctrina = !!interpretacio?.doctrina_jurisprudencia;
  const hasDoctrinaCases = !!(doctrina && doctrina.length > 0);

  return (
    <details
      className="group border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/60 dark:bg-indigo-950/20 rounded-xl overflow-hidden shadow-sm transition-all mb-6"
      open={isOpen}
      onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="flex items-center justify-between gap-4 px-5 py-4 font-semibold text-indigo-950 dark:text-indigo-100 cursor-pointer select-none bg-indigo-100/70 hover:bg-indigo-100 dark:bg-indigo-900/40 dark:hover:bg-indigo-900/60 transition-colors list-none">
        <div className="flex items-center gap-3">
          <Scale className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span className="text-base tracking-wide uppercase font-bold text-indigo-900 dark:text-indigo-200">
            {t(idioma, 'article.comentariJuridic')} / {t(idioma, 'article.jurisprudencia')}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {!hasAIDoctrina && !hasDogmatica && (
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
              className="bg-white dark:bg-slate-900 text-indigo-800 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700 hover:bg-indigo-50 text-xs font-semibold gap-1.5 shadow-xs"
            >
              {isGenerating ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              )}
              <span>{t(idioma, 'article.interpretacioIA')}</span>
            </Button>
          )}

          <ChevronDown className="h-5 w-5 text-indigo-700 dark:text-indigo-300 transition-transform duration-200 group-open:rotate-180" />
        </div>
      </summary>

      <div className="p-5 text-foreground space-y-5 border-t border-indigo-200/60 dark:border-indigo-900/40">
        {/* Golden Record Dogmàtica */}
        {hasDogmatica && (
          <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-lg border border-indigo-200/80 dark:border-indigo-800/50 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300">
              {t(idioma, 'article.analisiDogmatica')}
            </h4>
            <div className="space-y-2.5 text-sm">
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  {t(idioma, 'article.concepteClau')}
                </span>
                <p className="font-semibold text-indigo-950 dark:text-indigo-200 mt-0.5">
                  {article.dimensions_comprensio!.dogmatica.concepte_clau}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  {t(idioma, 'article.ratioLegis')}
                </span>
                <p className="text-foreground/90 mt-0.5">
                  {article.dimensions_comprensio!.dogmatica.ratio_legis}
                </p>
              </div>

              {article.dimensions_comprensio!.dogmatica.jurisprudencia_clau && (
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    {t(idioma, 'article.refJurisprudencial')}
                  </span>
                  <p className="text-muted-foreground italic mt-0.5">
                    {article.dimensions_comprensio!.dogmatica.jurisprudencia_clau}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Doctrina IA */}
        {hasAIDoctrina && (
          <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-lg border border-indigo-200/80 dark:border-indigo-800/50 shadow-xs space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              {t(idioma, 'article.doctrinaJurisprudenciaIA')}
            </h4>
            <p className="text-sm lg:text-base text-foreground/90 leading-relaxed whitespace-pre-line">
              {interpretacio!.doctrina_jurisprudencia}
            </p>
          </div>
        )}

        {/* Doctrina Relacionada (Articles d'opinió / estudis) */}
        {hasDoctrinaCases && (
          <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-lg border border-indigo-200/80 dark:border-indigo-800/50 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300">
              {t(idioma, 'article.doctrinaRelacionada')}
            </h4>
            <div className="space-y-3">
              {doctrina!.map((doc) => (
                <div key={doc.id} className="bg-indigo-50/50 dark:bg-indigo-950/40 p-3 rounded-md border border-indigo-100 dark:border-indigo-900/50 text-sm">
                  <p className="font-semibold text-indigo-950 dark:text-indigo-200">{doc.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {doc.author} · {doc.publication} ({doc.date})
                  </p>
                  <p className="text-xs text-foreground/80 mt-2 line-clamp-3 leading-relaxed">
                    {doc.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sentències / Jurisprudencia Relacionada */}
        <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-lg border border-indigo-200/80 dark:border-indigo-800/50 shadow-xs space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300">
            {t(idioma, 'article.jurisprudenciaRelacionada')}
          </h4>
          <JurisprudenciaSection
            articleId={article.id}
            articleNumber={article.numeracio}
            idioma={idioma}
          />
        </div>

        {!hasDogmatica && !hasAIDoctrina && (
          <div className="text-center py-4">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center gap-2 text-indigo-800 dark:text-indigo-300">
                <Loader2 className="h-6 w-6 animate-spin" />
                <p className="text-sm font-medium">{t(idioma, 'article.analitzantDoctrina')}</p>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                {t(idioma, 'article.doctrinaDisponible')}
              </p>
            )}
          </div>
        )}
      </div>
    </details>
  );
}
