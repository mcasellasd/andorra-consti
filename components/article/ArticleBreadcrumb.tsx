import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ArticleAndorra } from '../../data/codis/types';
import { type Idioma } from '../../lib/i18n';

interface ArticleBreadcrumbProps {
  article: ArticleAndorra;
  idioma?: Idioma;
}

export function ArticleBreadcrumb({ article, idioma = 'ca' }: ArticleBreadcrumbProps) {
  const constitucioLabel = idioma === 'ca' 
    ? 'Constitució d\'Andorra'
    : idioma === 'es'
    ? 'Constitución de Andorra'
    : 'Constitution d\'Andorre';

  return (
    <nav aria-label="Camí jeràrquic" className="w-full border-b border-border bg-card">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4">
        <ol className="flex items-center gap-2 text-sm">
          <li className="flex items-center gap-2">
            <Link 
              href="/codis/constitucio" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {constitucioLabel}
            </Link>
          </li>
          {article.titol && (
            <>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" aria-hidden="true" />
                <span className="font-medium text-foreground" aria-current="page">
                  {article.numeracio}
                </span>
              </li>
            </>
          )}
        </ol>
      </div>
    </nav>
  );
}
