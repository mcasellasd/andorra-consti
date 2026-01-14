import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ArticleAndorra } from '../../data/codis/types';

interface ArticleBreadcrumbProps {
  article: ArticleAndorra;
}

export function ArticleBreadcrumb({ article }: ArticleBreadcrumbProps) {
  return (
    <nav aria-label="Camí jeràrquic" className="w-full border-b border-border bg-card">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4">
        <ol className="flex items-center gap-2 text-sm">
          <li className="flex items-center gap-2">
            <Link 
              href="/codis/constitucio" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Constitució d&apos;Andorra
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
