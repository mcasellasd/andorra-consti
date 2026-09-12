import React, { useEffect, useMemo, useState } from 'react';
import { BookOpen, Brain, Landmark, MessageCircle, Scale } from 'lucide-react';
import { articlesConstitucio } from '../../data/codis/constitucio/articles-template';
import { getIdiomaActual, type Idioma } from '../../lib/i18n';
import { ArticleLearningChat } from './ArticleLearningChat';

type Tab = 'essencial' | 'aplicacio' | 'context' | 'aprendre';

export function ArticleInterpretacioDemo() {
  const [idioma, setIdioma] = useState<Idioma>('ca');
  const [activeTab, setActiveTab] = useState<Tab>('essencial');
  const article = useMemo(() => articlesConstitucio.find((item) => item.id === 'CONST_002'), []);

  useEffect(() => {
    setIdioma(getIdiomaActual());
    const handleLanguageChange = () => setIdioma(getIdiomaActual());
    window.addEventListener('idiomaChanged', handleLanguageChange);
    window.addEventListener('storage', handleLanguageChange);
    return () => {
      window.removeEventListener('idiomaChanged', handleLanguageChange);
      window.removeEventListener('storage', handleLanguageChange);
    };
  }, []);

  if (!article) return null;

  const tabs: Array<{ id: Tab; label: string; icon: React.ReactNode }> = [
    { id: 'essencial', label: idioma === 'ca' ? 'Essencial' : idioma === 'es' ? 'Esencial' : 'Essentiel', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'aplicacio', label: idioma === 'ca' ? 'Aplicació' : idioma === 'es' ? 'Aplicación' : 'Application', icon: <Scale className="h-4 w-4" /> },
    { id: 'context', label: idioma === 'ca' ? 'Context' : idioma === 'es' ? 'Contexto' : 'Contexte', icon: <Landmark className="h-4 w-4" /> },
    { id: 'aprendre', label: idioma === 'ca' ? 'Aprendre' : idioma === 'es' ? 'Aprender' : 'Apprendre', icon: <MessageCircle className="h-4 w-4" /> },
  ];

  const isCa = idioma === 'ca';

  return (
    <section className="legal-section rounded-2xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/40 sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <div className="rounded-xl bg-sky-100 p-2.5 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300"><Brain className="h-5 w-5" /></div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">Article 2 · demostració dins l’app</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">{isCa ? 'Fitxa d’interpretació per capes' : idioma === 'es' ? 'Ficha de interpretación por capas' : 'Fiche d’interprétation par couches'}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{isCa ? 'El text, l’aplicació, el context i la conversa d’aprenentatge no tenen el mateix valor ni la mateixa autoritat.' : idioma === 'es' ? 'El texto, la aplicación, el contexto y la conversación de aprendizaje no tienen el mismo valor ni la misma autoridad.' : 'Le texte, l’application, le contexte et la conversation d’apprentissage n’ont pas la même valeur ni la même autorité.'}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1 rounded-xl border border-slate-200 bg-slate-200/70 p-1 dark:border-slate-700 dark:bg-slate-800/70" role="tablist" aria-label="Camps de la interpretació de l’article 2">
        {tabs.map((tab) => (
          <button key={tab.id} type="button" role="tab" aria-selected={activeTab === tab.id} onClick={() => setActiveTab(tab.id)} className={`inline-flex items-center justify-center gap-2 rounded-lg px-2 py-3 text-sm font-semibold transition ${activeTab === tab.id ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white' : 'text-slate-600 hover:bg-white/60 dark:text-slate-300 dark:hover:bg-slate-900/50'}`}>
            {tab.icon}<span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-4">
        {activeTab === 'essencial' && (
          <div role="tabpanel" className="space-y-4">
            <div className="rounded-xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-900/60 dark:bg-sky-950/20">
              <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-sky-800 dark:text-sky-300">Resum fidel del text</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-800 dark:text-slate-100">{article.text_oficial}</p>
              <p className="mt-4 border-t border-sky-200 pt-3 text-xs text-sky-800 dark:border-sky-900 dark:text-sky-300">Font: Constitució d’Andorra · Article 2 · vigència {article.vigencia}</p>
            </div>
            <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900 dark:bg-amber-950/20 dark:text-amber-200"><strong>Control hermenèutic:</strong> aquest camp explica què diu l’article. No hi afegeix finalitats o conseqüències que no estiguin justificades en un altre camp.</div>
          </div>
        )}

        {activeTab === 'aplicacio' && (
          <div role="tabpanel" className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-700 dark:text-slate-300">Què pot significar jurídicament</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">L’article proporciona el marc constitucional per identificar la llengua oficial, els símbols de l’Estat i la capitalitat. No resol per si sol totes les qüestions sobre l’ús social d’altres llengües ni determina una situació individual concreta.</p></div>
            <div className="grid gap-4 sm:grid-cols-2"><div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900/60 dark:bg-emerald-950/20"><h3 className="font-semibold text-emerald-900 dark:text-emerald-200">Permet orientar-se</h3><p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-100/80">Localitzar normes i institucions que desenvolupen aquests elements constitucionals.</p></div><div className="rounded-xl border border-rose-200 bg-rose-50 p-5 dark:border-rose-900/60 dark:bg-rose-950/20"><h3 className="font-semibold text-rose-900 dark:text-rose-200">No permet concloure</h3><p className="mt-2 text-sm text-rose-900/80 dark:text-rose-100/80">Que qualsevol conflicte lingüístic o administratiu quedi resolt només amb aquest article.</p></div></div>
          </div>
        )}

        {activeTab === 'context' && (
          <div role="tabpanel" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-emerald-200 bg-white p-5 dark:border-emerald-900/60 dark:bg-slate-900"><span className="inline-block rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">Fonts disponibles</span><h3 className="mt-3 font-semibold">Fonts relacionades</h3><ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground"><li>Constitució d’Andorra, article 2</li><li><a className="text-sky-700 underline dark:text-sky-300" href="https://portaljuridicandorra.ad/L2024006" target="_blank" rel="noreferrer">Llei 6/2024, de la llengua pròpia i oficial</a></li><li><a className="text-sky-700 underline dark:text-sky-300" href="https://portaljuridicandorra.ad/R20250305D" target="_blank" rel="noreferrer">Reglament de 2025 sobre l’ús del català</a></li><li><a className="text-sky-700 underline dark:text-sky-300" href="https://www.govern.ad/documents/d/guest/llei_se_versio_consolidada_2022?download=true" target="_blank" rel="noreferrer">Llei sobre la utilització dels signes d’Estat</a></li><li><a className="text-sky-700 underline dark:text-sky-300" href="https://www.govern.ad/ca/tematiques/cultura-i-esports/patrimoni-cultural/himne-d-andorra" target="_blank" rel="noreferrer">Himne d’Andorra · Govern</a></li></ul></div>
              <div className="rounded-xl border border-emerald-200 bg-white p-5 dark:border-emerald-900/60 dark:bg-slate-900"><span className="inline-block rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">Institucions identificables</span><h3 className="mt-3 font-semibold">Aplicació institucional</h3><ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground"><li><strong>Consell General:</strong> legislació lingüística i signes d’Estat</li><li><strong>Govern:</strong> desplegament, administració i autoritzacions</li><li><strong>Comuns:</strong> funcions pròpies dins la política lingüística</li><li><strong>Administració i justícia:</strong> ús del català en les comunicacions</li></ul></div>
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/60 dark:bg-amber-950/20"><span className="inline-block rounded-full bg-amber-100 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">Base parcial</span><h3 className="mt-3 font-semibold">Lectura doctrinal</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">El manuscrit ofereix una lectura sobre llengua, identitat i integració jurídica, però encara no una base doctrinal específica i contrastada de l’article 2.</p></div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/40"><span className="inline-block rounded-full bg-slate-200 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-700 dark:bg-slate-800 dark:text-slate-300">Pendent de validar</span><h3 className="mt-3 font-semibold">Dimensió social</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Podem formular una hipòtesi sobre la tensió entre oficialitat del català i pluralitat lingüística, però no afirmar encara quines tensions socials genera l’article.</p></div>
            </div>
            <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900 dark:bg-amber-950/20 dark:text-amber-200"><strong>Pluralitat sense confusió d’autoritats:</strong> la fitxa mostra què està documentat, què és una lectura parcial i què continua pendent.</div>
          </div>
        )}

        {activeTab === 'aprendre' && (
          <div role="tabpanel" className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-700 dark:text-slate-300">Per continuar comprenent</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">La comprensió no acaba amb una resposta: la conversa ajuda a formular una pregunta millor i tornar a les fonts.</p><ul className="mt-4 space-y-2 text-sm text-muted-foreground"><li>• Quina diferència hi ha entre llengua oficial i ús social?</li><li>• Quines normes desenvolupen l’article 2?</li><li>• Quina institució és competent en cada qüestió?</li></ul></div>
            <ArticleLearningChat articleId={article.id} articleNumber={article.numeracio} articleText={article.text_oficial} idioma={idioma} />
          </div>
        )}
      </div>
    </section>
  );
}
