import React from 'react';
import { cn } from '../../lib/utils';
import { FileText, Scale, BookOpen, Loader2, Sparkles } from 'lucide-react';
import { type Idioma, t } from '../../lib/i18n';
import { ArticleAndorra, InterpretacioIA as InterpretacioIAType } from '../../data/codis/types';
import { type DoctrinaCase } from '../../data/doctrina';
import JurisprudenciaSection from '../JurisprudenciaSection';

interface ArticleSidebarProps {
  activeTab: string | null;
  setActiveTab: (tab: string | null) => void;
  isGenerating: boolean;
  article: ArticleAndorra;
  idioma: Idioma;
  interpretacio: InterpretacioIAType | null;
  doctrina?: DoctrinaCase[];
}

const getTabs = (idioma: Idioma) => [
  { id: 'Resum', label: t(idioma, 'article.resum'), icon: FileText },
  { id: 'Exemple aplicat', label: t(idioma, 'article.exempleAplicat'), icon: BookOpen },
  { id: 'Comentari Jurídic', label: t(idioma, 'article.comentariJuridic'), icon: Scale },
];

export function ArticleSidebar({
  activeTab,
  setActiveTab,
  isGenerating,
  article,
  idioma,
  interpretacio,
  doctrina
}: ArticleSidebarProps) {
  const tabs = getTabs(idioma);
  
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden sticky top-6">
      {/* Tab buttons */}
      <nav className="border-b border-border" aria-label="Seccions de l'article">
        <div className="grid grid-cols-2 lg:grid-cols-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(isActive ? null : tab.id)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-colors text-left',
                  'hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
                  isActive
                    ? 'bg-primary/5 text-primary border-l-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground border-l-2 border-transparent',
                )}
                aria-pressed={isActive}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Tab content */}
      <div className="p-5 min-h-[200px] max-h-[600px] overflow-y-auto">
        {activeTab ? (
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{activeTab}</h3>

            {/* Contingut Golden Record (Prioritari) o AI */}
            <div className="space-y-6">
              
              {/* Tab: RESUM */}
              {activeTab === 'Resum' && (
                <div className="space-y-4">
                  {/* Simplificació Supervisada (Golden) */}
                  {article.dimensions_comprensio?.simplificacio_supervisada && (
                    <div className="bg-primary/5 p-4 rounded-md border border-primary/10">
                      <h4 className="text-sm font-semibold text-primary mb-2">{t(idioma, 'article.explicacioPlanera')}</h4>
                      <p className="text-sm text-foreground leading-relaxed">
                        {article.dimensions_comprensio.simplificacio_supervisada.nivell_planer}
                      </p>
                      {article.dimensions_comprensio.simplificacio_supervisada.termes_clau && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {article.dimensions_comprensio.simplificacio_supervisada.termes_clau.map((term, i) => (
                            <span key={i} className="text-xs bg-background px-2 py-1 rounded border border-border text-muted-foreground">
                              {term}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Resum IA */}
                  {interpretacio?.resum[idioma] ? (
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">{t(idioma, 'article.resumIA')}</h4>
                      <p className="text-sm text-foreground leading-relaxed">
                        {interpretacio.resum[idioma]}
                      </p>
                    </div>
                  ) : (
                    !article.dimensions_comprensio?.simplificacio_supervisada && (
                      isGenerating ? (
                        <div className="flex items-center gap-3 text-muted-foreground py-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm">{t(idioma, 'article.generantResum')}</span>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t(idioma, 'article.clicAssisteixMeResum')}
                        </p>
                      )
                    )
                  )}
                </div>
              )}

              {/* Tab: EXEMPLE APLICAT */}
              {activeTab === 'Exemple aplicat' && (
                <div className="space-y-4">
                   {/* Aplicabilitat (Golden) */}
                   {article.dimensions_comprensio?.aplicabilitat_residencia && (
                    <div className="bg-muted/30 p-4 rounded-md border border-border">
                      <h4 className="text-sm font-semibold text-foreground mb-2">{t(idioma, 'article.aplicabilitatPractica')}</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex gap-2">
                          <span className="font-medium min-w-[80px]">{t(idioma, 'article.ajuda')}:</span>
                          <span className="text-muted-foreground">{article.dimensions_comprensio.aplicabilitat_residencia.ajuda_practica}</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-medium min-w-[80px]">{t(idioma, 'article.subjectes')}:</span>
                          <span className="text-muted-foreground">{article.dimensions_comprensio.aplicabilitat_residencia.subjectivitat}</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* Exemples IA - només els de l'idioma de la interfície */}
                  {(() => {
                    const exemplesEnIdioma = interpretacio?.exemples?.filter((e) => e.idioma === idioma) ?? [];
                    return exemplesEnIdioma.length > 0 ? (
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-foreground">{t(idioma, 'article.exemplesGenerats')}</h4>
                        {exemplesEnIdioma.map((exemple, idx) => (
                          <div key={idx} className="space-y-2">
                            <p className="text-sm text-foreground leading-relaxed">
                              <strong className="text-foreground">{t(idioma, 'article.casPractic')}:</strong> {exemple.cas}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      !article.dimensions_comprensio?.aplicabilitat_residencia && (
                        isGenerating ? (
                          <div className="flex items-center gap-3 text-muted-foreground py-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm">{t(idioma, 'article.generantExemples')}</span>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {t(idioma, 'article.clicAssisteixMeExemples')}
                          </p>
                        )
                      )
                    );
                  })()}
                </div>
              )}

              {/* Tab: COMENTARI JURÍDIC */}
              {activeTab === 'Comentari Jurídic' && (
                <div className="space-y-6">
                  {/* Dogmàtica (Golden) */}
                  {article.dimensions_comprensio?.dogmatica && (
                    <div className="bg-muted/30 p-4 rounded-md border border-border space-y-3">
                      <h4 className="text-sm font-semibold text-foreground">{t(idioma, 'article.analisiDogmatica')}</h4>
                      
                      <div>
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t(idioma, 'article.concepteClau')}</span>
                        <p className="text-sm font-medium text-foreground mt-1">{article.dimensions_comprensio.dogmatica.concepte_clau}</p>
                      </div>
                      
                      <div>
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t(idioma, 'article.ratioLegis')}</span>
                        <p className="text-sm text-foreground mt-1">{article.dimensions_comprensio.dogmatica.ratio_legis}</p>
                      </div>

                      {article.dimensions_comprensio.dogmatica.jurisprudencia_clau && (
                         <div>
                         <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t(idioma, 'article.refJurisprudencial')}</span>
                         <p className="text-sm text-muted-foreground mt-1 italic">{article.dimensions_comprensio.dogmatica.jurisprudencia_clau}</p>
                       </div>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">{t(idioma, 'article.doctrinaJurisprudenciaIA')}</h4>
                    {interpretacio?.doctrina_jurisprudencia ? (
                      <p className="text-sm text-foreground leading-relaxed">
                        {interpretacio.doctrina_jurisprudencia}
                      </p>
                    ) : (
                      isGenerating ? (
                        <div className="flex items-center gap-3 text-muted-foreground py-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm">{t(idioma, 'article.analitzantDoctrina')}</span>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t(idioma, 'article.doctrinaDisponible')}
                        </p>
                      )
                    )}
                  </div>

                  {doctrina && doctrina.length > 0 && (
                    <div className="pt-4 border-t border-border">
                      <h4 className="text-sm font-semibold text-foreground mb-3">{t(idioma, 'article.doctrinaRelacionada')}</h4>
                      <div className="space-y-3">
                        {doctrina.map((doc) => (
                          <div key={doc.id} className="bg-muted/30 p-3 rounded text-sm">
                            <p className="font-medium text-foreground">{doc.title}</p>
                            <p className="text-muted-foreground text-xs mt-1">
                              {doc.author} · {doc.publication} ({doc.date})
                            </p>
                            <p className="text-foreground mt-2 text-xs line-clamp-3">
                              {doc.summary}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-semibold text-foreground mb-3">{t(idioma, 'article.jurisprudenciaRelacionada')}</h4>
                    <JurisprudenciaSection
                      articleId={article.id}
                      articleNumber={article.numeracio}
                      idioma={idioma}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Sparkles className="h-8 w-8 text-muted-foreground/40 mb-3" />
            <p className="text-sm text-muted-foreground">
              {t(idioma, 'article.seleccionaSeccio')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
