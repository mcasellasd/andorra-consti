"use client"

import { cn } from "@/lib/utils"
import { FileText, Scale, BookOpen, Loader2 } from "lucide-react"

interface ArticleSidebarProps {
  activeTab: string | null
  setActiveTab: (tab: string | null) => void
  isGenerating: boolean
}

const tabs = [
  { id: "Resum", label: "Resum", icon: FileText },
  { id: "Exemple aplicat", label: "Exemple aplicat", icon: BookOpen },
  { id: "Jurisprudència", label: "Jurisprudència", icon: Scale },
  { id: "Doctrina", label: "Doctrina", icon: BookOpen },
]

export function ArticleSidebar({ activeTab, setActiveTab, isGenerating }: ArticleSidebarProps) {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden sticky top-6">
      {/* Tab buttons */}
      <nav className="border-b border-border" aria-label="Seccions de l'article">
        <div className="grid grid-cols-2 lg:grid-cols-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(isActive ? null : tab.id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-colors text-left",
                  "hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                  isActive
                    ? "bg-primary/5 text-primary border-l-2 border-primary"
                    : "text-muted-foreground hover:text-foreground border-l-2 border-transparent",
                )}
                aria-pressed={isActive}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Tab content */}
      <div className="p-5 min-h-[200px]">
        {activeTab ? (
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{activeTab}</h3>

            {isGenerating ? (
              <div className="flex items-center gap-3 text-muted-foreground py-8">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm">Generant contingut amb IA...</span>
              </div>
            ) : (
              <div className="space-y-3">
                {activeTab === "Resum" && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    L'article 111-4 estableix que el dret civil català actua com a dret comú i supletori a Catalunya.
                    Això significa que les seves normes tenen preferència sobre qualsevol altra legislació, excepte en
                    casos específics previstos per llei o en matèries reservades a l'Estat.
                  </p>
                )}

                {activeTab === "Exemple aplicat" && (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Cas pràctic:</strong> En una successió hereditària a
                      Catalunya, s'aplicarà primer el Llibre IV del Codi Civil de Catalunya. Només si hi ha un buit
                      legal, es recorrerà supletòriament al Codi Civil espanyol.
                    </p>
                  </div>
                )}

                {activeTab === "Jurisprudència" && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">STSJC 45/2023</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      El Tribunal Superior de Justícia de Catalunya reitera el caràcter preferent del dret civil català
                      en matèria de successions...
                    </p>
                  </div>
                )}

                {activeTab === "Doctrina" && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Comentaris al Codi Civil de Catalunya</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      La doctrina majoritària interpreta aquest article com una manifestació de la competència exclusiva
                      de Catalunya en matèria de dret civil propi...
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground py-4">
            Selecciona una secció per veure el contingut ampliat de l'article.
          </p>
        )}
      </div>
    </div>
  )
}
