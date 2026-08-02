import React from 'react';
import { ShieldCheck, Scale, AlertCircle, Building2, BookOpen } from 'lucide-react';
import { getContextConstitucional, type ForcaNormativa } from '../../lib/prompts/context-constitucional';

/**
 * Franja de força normativa.
 *
 * És la primera informació que ha de rebre la persona usuària: si l'article és un
 * dret que pot reclamar o un mandat dirigit a l'Estat. Fins ara la fitxa començava
 * pel resum, i aquesta distinció —la més accionable de totes— no apareixia enlloc.
 *
 * El cas que ho va destapar: l'article 31 (medi ambient) descrit com a «dret
 * fonamental» quan és un principi rector del capítol V, no invocable directament
 * (art. 39.3) ni emparable (art. 41).
 */

interface Props {
  /** Número o identificador de l'article: «Article 31», «31» o «CONST_031». */
  articleNumber: string;
  /** Només s'aplica a la Constitució. */
  codi?: string;
  className?: string;
}

const ESTIL: Record<ForcaNormativa, {
  Icon: typeof ShieldCheck;
  caixa: string;
  text: string;
  accent: string;
}> = {
  'dret-fonamental': {
    Icon: ShieldCheck,
    caixa: 'bg-emerald-50 border-emerald-500 dark:bg-emerald-950/30 dark:border-emerald-600',
    text: 'text-emerald-900 dark:text-emerald-200',
    accent: 'text-emerald-700 dark:text-emerald-400',
  },
  'principi-rector': {
    Icon: Scale,
    caixa: 'bg-amber-50 border-amber-500 dark:bg-amber-950/30 dark:border-amber-600',
    text: 'text-amber-900 dark:text-amber-200',
    accent: 'text-amber-700 dark:text-amber-400',
  },
  'deure': {
    Icon: AlertCircle,
    caixa: 'bg-slate-50 border-slate-400 dark:bg-slate-900/50 dark:border-slate-600',
    text: 'text-slate-800 dark:text-slate-200',
    accent: 'text-slate-600 dark:text-slate-400',
  },
  'principi-general': {
    Icon: BookOpen,
    caixa: 'bg-slate-50 border-slate-400 dark:bg-slate-900/50 dark:border-slate-600',
    text: 'text-slate-800 dark:text-slate-200',
    accent: 'text-slate-600 dark:text-slate-400',
  },
  'garantia': {
    Icon: ShieldCheck,
    caixa: 'bg-sky-50 border-sky-500 dark:bg-sky-950/30 dark:border-sky-600',
    text: 'text-sky-900 dark:text-sky-200',
    accent: 'text-sky-700 dark:text-sky-400',
  },
  'organica': {
    Icon: Building2,
    caixa: 'bg-slate-50 border-slate-400 dark:bg-slate-900/50 dark:border-slate-600',
    text: 'text-slate-800 dark:text-slate-200',
    accent: 'text-slate-600 dark:text-slate-400',
  },
};

export function ArticleForcaNormativa({ articleNumber, codi = 'constitucio', className = '' }: Props) {
  if (codi !== 'constitucio') return null;

  const ctx = getContextConstitucional(articleNumber);
  if (!ctx) return null;

  const { Icon, caixa, text, accent } = ESTIL[ctx.forca];

  const ubicacio = ctx.capitol
    ? `Títol ${ctx.titol} · capítol ${ctx.capitol} — ${ctx.capitolNom}`
    : `Títol ${ctx.titol} — ${ctx.titolNom}`;

  return (
    <div className={`border-l-4 ${caixa} px-4 py-3.5 mb-6 ${className}`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${accent}`} aria-hidden />
        <div className="min-w-0">
          <p className={`text-sm font-semibold ${text}`}>{ctx.etiqueta}</p>
          <p className={`text-xs mt-0.5 ${accent}`}>{ubicacio}</p>
          <p className={`text-sm mt-2 leading-relaxed ${text} opacity-90`}>{ctx.quePucFer}</p>
          {ctx.fonament.length > 0 && (
            <p className={`text-xs mt-2 ${accent}`}>
              Fonament: {ctx.fonament.map(f => `article ${f}`).join(', ')} de la Constitució
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleForcaNormativa;
