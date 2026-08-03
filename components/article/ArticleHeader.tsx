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
    <header className="article-hero">
      <div className="article-hero-inner">
        <div className="article-hero-top">
          <nav aria-label="Camí jeràrquic" className="article-breadcrumb">
            <Link href="/codis/constitucio">{constitucioLabel}</Link>
            {capitol && (
              <>
                <ChevronRight size={14} aria-hidden="true" />
                <span>{capitol}</span>
              </>
            )}
            <ChevronRight size={14} aria-hidden="true" />
            <span className="article-breadcrumb-current">{article.numeracio}</span>
          </nav>

          <div className="article-actions">
            <Button type="button" variant="outline" size="sm" onClick={handleCopyUrl} className="article-action-btn">
              {copied ? (
                <>
                  <Check className="article-action-icon" />
                  <span>Copiat!</span>
                </>
              ) : (
                <>
                  <Copy className="article-action-icon" />
                  <span>Copiar URL</span>
                </>
              )}
            </Button>

            {onGenerateAssistencia && (
              <Button type="button" size="sm" onClick={onGenerateAssistencia} disabled={isGenerating} className="article-action-btn article-action-btn--primary">
                <Sparkles className="article-action-icon" />
                <span>{t(idioma, 'article.assisteixMe')}</span>
              </Button>
            )}
          </div>
        </div>

        <div className="article-hero-body">
          <span className="article-pill">{article.numeracio}</span>
          <h1>{article.numeracio}: {titol}</h1>
          {capitol && <p>{capitol}</p>}
          <div className="article-meta-row">
            {article.norma && (
              <div className="article-meta-pill">
                <Scale size={14} />
                <span><strong>Norma:</strong> {article.norma}</span>
              </div>
            )}
            {article.rang && (
              <div className="article-meta-pill">
                <ShieldCheck size={14} />
                <span><strong>Rang:</strong> {article.rang}</span>
              </div>
            )}
            {article.ambit && (
              <div className="article-meta-pill">
                <Tag size={14} />
                <span><strong>Àmbit:</strong> {article.ambit}</span>
              </div>
            )}
            {article.vigencia && (
              <div className="article-meta-pill">
                <Calendar size={14} />
                <span><strong>Vigència:</strong> {article.vigencia}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
