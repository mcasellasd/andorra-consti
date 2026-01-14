import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { ArticleAndorra } from '../../data/codis/types';
import { type Idioma } from '../../lib/i18n';

interface ArticleContentProps {
  article: ArticleAndorra;
  idioma: Idioma;
  onGenerateAssistencia: () => void;
  isGenerating: boolean;
}

export function ArticleContent({
  article,
  idioma,
  onGenerateAssistencia,
  isGenerating
}: ArticleContentProps) {
  const articleText = article.idiomes?.[idioma] || article.text_oficial;

  return (
    <article className="space-y-8">
      {/* Legal text block */}
      <div className="bg-card rounded-lg border border-border p-8 lg:p-10">
        <div className="prose prose-lg max-w-none">
          {articleText.split('\n').map((line, index) => {
            const trimmed = line.trim();
            if (!trimmed) return null;

            const isNumbered = /^\d+\./.test(trimmed);
            const isLettered = /^[a-z]\)/i.test(trimmed);
            const isDashed = /^[-•·]/.test(trimmed);

            let className = 'font-serif text-lg lg:text-xl leading-relaxed text-foreground/90';
            if (index === 0) {
              className += ' first-letter:text-3xl first-letter:font-semibold first-letter:text-primary';
            } else {
              className += ' text-base lg:text-lg text-foreground/85';
            }

            if (isNumbered || isLettered || isDashed) {
              className += ' ml-4';
            }

            return (
              <p key={index} className={className} style={{ marginBottom: index < articleText.split('\n').length - 1 ? '1.5rem' : '0' }}>
                {trimmed}
              </p>
            );
          })}

          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Etiquetes:</strong> {article.tags.join(', ')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* AI Action buttons */}
      {/* AI Action buttons */}
      <div className="flex justify-center">
        <Button
          onClick={onGenerateAssistencia}
          disabled={isGenerating}
          className="w-full sm:w-auto min-w-[200px] h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium gap-2 shadow-lg hover:shadow-xl transition-all"
        >
          <Sparkles className="h-4 w-4" />
          <span>Assisteix-me</span>
        </Button>
      </div>
    </article>
  );
}
