import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ArticleAndorra } from '../../data/codis/types';
import { type Idioma, t } from '../../lib/i18n';

interface ArticleNavigationProps {
  previousArticle?: ArticleAndorra | null;
  nextArticle?: ArticleAndorra | null;
  idioma?: Idioma;
}

export function ArticleNavigation({
  previousArticle,
  nextArticle,
  idioma = 'ca',
}: ArticleNavigationProps) {
  if (!previousArticle && !nextArticle) return null;

  return (
    <nav
      aria-label="Navegació entre articles"
      className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-stretch justify-between gap-4"
    >
      {previousArticle ? (
        <Link
          href={`/codis/constitucio/article/${previousArticle.id}`}
          className="group flex-1 flex flex-col p-4 rounded-xl border border-border bg-card hover:bg-accent/50 transition-all hover:shadow-md text-left"
        >
          <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 mb-1">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            {t(idioma, 'article.anterior')}
          </span>
          <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {previousArticle.numeracio}
            {previousArticle.titol ? `: ${previousArticle.titol}` : ''}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {nextArticle && (
        <Link
          href={`/codis/constitucio/article/${nextArticle.id}`}
          className="group flex-1 flex flex-col p-4 rounded-xl border border-border bg-card hover:bg-accent/50 transition-all hover:shadow-md text-right sm:items-end"
        >
          <span className="text-xs font-semibold text-muted-foreground flex items-center justify-end gap-1 mb-1">
            {t(idioma, 'article.seguent')}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
          <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {nextArticle.numeracio}
            {nextArticle.titol ? `: ${nextArticle.titol}` : ''}
          </span>
        </Link>
      )}
    </nav>
  );
}
