import React from 'react';
import { ArticleAndorra } from '../../data/codis/types';
import { type Idioma } from '../../lib/i18n';

interface ArticleHeaderProps {
  article: ArticleAndorra;
  idioma?: Idioma;
}

export function ArticleHeader({ article, idioma = 'ca' }: ArticleHeaderProps) {
  const titol = idioma === 'ca' 
    ? article.titol 
    : article.idiomes?.titol?.[idioma] || article.titol;
  const capitol = idioma === 'ca'
    ? article.capitol
    : article.idiomes?.capitol?.[idioma] || article.capitol;

  return (
    <header className="w-full bg-card border-b border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8 lg:py-12">
        <div className="space-y-3">
          <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground tracking-tight text-balance">
            {article.numeracio}
          </h1>
          {titol && (
            <p className="text-lg lg:text-xl text-muted-foreground font-light">{titol}</p>
          )}
          {capitol && (
            <p className="text-base lg:text-lg text-muted-foreground/80 font-light italic">{capitol}</p>
          )}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mt-4">
            {article.norma && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Norma:</span>
                <span>{article.norma}</span>
              </div>
            )}
            {article.rang && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Rang:</span>
                <span>{article.rang}</span>
              </div>
            )}
            {article.ambit && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Àmbit:</span>
                <span>{article.ambit}</span>
              </div>
            )}
            {article.vigencia && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Vigència:</span>
                <span>{article.vigencia}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
