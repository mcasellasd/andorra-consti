import React, { useState } from 'react';
import Link from 'next/link';
import { Copy, Check, Sparkles, ChevronRight, Scale, Calendar, Tag, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/button';
import { ArticleAndorra } from '../../data/codis/types';
import { t, type Idioma } from '../../lib/i18n';

interface ArticleHeaderProps {
  article: ArticleAndorra;
  idioma?: Idioma;
  previousArticle?: ArticleAndorra | null;
  nextArticle?: ArticleAndorra | null;
  onGenerateAssistencia?: () => void;
  isGenerating?: boolean;
}

export function ArticleHeader({
  article,
  idioma = 'ca',
  onGenerateAssistencia,
  isGenerating,
}: ArticleHeaderProps) {
  const [copied, setCopied] = useState(false);

  const titol =
    idioma === 'ca'
      ? article.titol
      : article.idiomes?.titol?.[idioma] || article.titol;

  const capitol =
    idioma === 'ca'
      ? article.capitol
      : article.idiomes?.capitol?.[idioma] || article.capitol;

  const handleCopyUrl = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const constitucioLabel =
    idioma === 'ca'
      ? "Constitució d'Andorra"
      : idioma === 'es'
      ? 'Constitución de Andorra'
      : "Constitution d'Andorre";

  return (
    <header className="w-full bg-card border-b border-border/80 shadow-2xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-6">
        {/* Top Action Bar & Breadcrumb Row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Breadcrumbs */}
          <nav aria-label="Camí jeràrquic" className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href="/codis/constitucio"
              className="hover:text-primary transition-colors font-medium"
            >
              {constitucioLabel}
            </Link>
            {capitol && (
              <>
                <ChevronRight className="h-3.5 w-3.5 opacity-60 shrink-0" aria-hidden="true" />
                <span className="truncate max-w-[200px] sm:max-w-none">{capitol}</span>
              </>
            )}
            <ChevronRight className="h-3.5 w-3.5 opacity-60 shrink-0" aria-hidden="true" />
            <span className="font-semibold text-foreground" aria-current="page">
              {article.numeracio}
            </span>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopyUrl}
              className="gap-1.5 text-xs font-medium border-border hover:bg-accent hover:text-accent-foreground shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-400">Copiat!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Copiar URL</span>
                </>
              )}
            </Button>

            {onGenerateAssistencia && (
              <Button
                type="button"
                size="sm"
                onClick={onGenerateAssistencia}
                disabled={isGenerating}
                className="bg-red-600 hover:bg-red-700 text-white font-medium gap-1.5 text-xs shadow-xs"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>{t(idioma, 'article.assisteixMe')}</span>
              </Button>
            )}
          </div>
        </div>

        {/* Article Title Header */}
        <div className="space-y-3">
          <div className="inline-block px-3 py-1 rounded-md bg-red-100/80 dark:bg-red-950/60 text-red-800 dark:text-red-300 text-xs font-bold uppercase tracking-wider border border-red-200 dark:border-red-900/50">
            {article.numeracio}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground font-serif leading-tight">
            {article.numeracio}: {titol}
          </h1>

          {capitol && (
            <p className="text-base lg:text-lg text-muted-foreground font-normal italic">
              {capitol}
            </p>
          )}
        </div>

        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
          {article.norma && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/60 text-muted-foreground font-medium border border-border/60">
              <Scale className="h-3.5 w-3.5 text-primary shrink-0" />
              <span>
                <strong className="text-foreground font-semibold">Norma:</strong> {article.norma}
              </span>
            </div>
          )}

          {article.rang && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/60 text-muted-foreground font-medium border border-border/60">
              <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
              <span>
                <strong className="text-foreground font-semibold">Rang:</strong> {article.rang}
              </span>
            </div>
          )}

          {article.ambit && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/60 text-muted-foreground font-medium border border-border/60">
              <Tag className="h-3.5 w-3.5 text-primary shrink-0" />
              <span>
                <strong className="text-foreground font-semibold">Àmbit:</strong> {article.ambit}
              </span>
            </div>
          )}

          {article.vigencia && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/60 text-muted-foreground font-medium border border-border/60">
              <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
              <span>
                <strong className="text-foreground font-semibold">Vigència:</strong> {article.vigencia}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
