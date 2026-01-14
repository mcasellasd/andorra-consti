"use client"

import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ArticleContentProps {
  onGenerate: (type: "resum" | "exemple") => void
  isGenerating: boolean
}

export function ArticleContent({ onGenerate, isGenerating }: ArticleContentProps) {
  return (
    <article className="space-y-8">
      {/* Legal text block */}
      <div className="bg-card rounded-lg border border-border p-8 lg:p-10">
        <div className="prose prose-lg max-w-none">
          <p className="font-serif text-lg lg:text-xl leading-relaxed text-foreground/90 first-letter:text-3xl first-letter:font-semibold first-letter:text-primary">
            El dret civil de Catalunya és el dret comú, i s'aplica supletòriament a la resta de lleis.
          </p>

          <div className="mt-8 pt-8 border-t border-border/50 space-y-6">
            <p className="font-serif text-base lg:text-lg leading-relaxed text-foreground/85">
              En conseqüència, les disposicions del dret civil de Catalunya s'apliquen amb preferència a qualsevol altra
              norma, llevat que una llei especial disposi expressament el contrari o que es tracti de matèries
              reservades a l'Estat per la Constitució.
            </p>

            <p className="font-serif text-base lg:text-lg leading-relaxed text-foreground/85">
              El dret supletori només s'aplica en defecte de normes pròpies del dret civil de Catalunya i d'acord amb
              els principis generals que l'informen.
            </p>
          </div>
        </div>
      </div>

      {/* AI Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={() => onGenerate("resum")}
          disabled={isGenerating}
          className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium gap-2"
        >
          <Sparkles className="h-4 w-4" />
          <span>RESUM</span>
        </Button>

        <Button
          onClick={() => onGenerate("exemple")}
          disabled={isGenerating}
          variant="outline"
          className="flex-1 h-12 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium gap-2 transition-colors"
        >
          <Sparkles className="h-4 w-4" />
          <span>EXEMPLE APLICAT</span>
        </Button>
      </div>
    </article>
  )
}
