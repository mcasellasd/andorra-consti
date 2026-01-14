import { ChevronLeft, ChevronRight } from "lucide-react"

export function ArticleNavigation() {
  return (
    <nav aria-label="Navegació entre articles" className="mt-10 pt-8 border-t border-border">
      <div className="flex items-center justify-between">
        <a
          href="#"
          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          <span>Article anterior</span>
          <span className="hidden sm:inline text-muted-foreground/60">· 111-3</span>
        </a>

        <a
          href="#"
          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="hidden sm:inline text-muted-foreground/60">111-5 ·</span>
          <span>Article següent</span>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
      </div>
    </nav>
  )
}
