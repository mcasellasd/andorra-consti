import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ArticleAndorra } from '../../data/codis/types';
import { t, type Idioma } from '../../lib/i18n';

interface ArticleNavigationProps {
  previousArticle: ArticleAndorra | null;
  nextArticle: ArticleAndorra | null;
  idioma: Idioma;
}

export function ArticleNavigation({ previousArticle, nextArticle, idioma }: ArticleNavigationProps) {
  return (
    <nav aria-label="Navegació entre articles" className="mt-10 pt-8 border-t border-border">
      <div className="flex items-center justify-between">
        {previousArticle ? (
          <Link
            href={`/codis/constitucio/article/${previousArticle.id}`}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
            <span>{t(idioma, 'article.anterior')}</span>
            <span className="hidden sm:inline text-muted-foreground/60">· {previousArticle.numeracio}</span>
          </Link>
        ) : (
          <div></div>
        )}

        {nextArticle && (
          <Link
            href={`/codis/constitucio/article/${nextArticle.id}`}
            className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="hidden sm:inline text-muted-foreground/60">{nextArticle.numeracio} ·</span>
            <span>{t(idioma, 'article.seguent')}</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        )}
      </div>
    </nav>
  );
}
