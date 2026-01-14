import { ChevronRight } from "lucide-react"

export function ArticleBreadcrumb() {
  const pathSegments = [
    { label: "Llibre I", href: "#" },
    { label: "Disposicions generals", href: "#" },
    { label: "Article 111-4", href: "#", current: true },
  ]

  return (
    <nav aria-label="Camí jeràrquic" className="w-full border-b border-border bg-card">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4">
        <ol className="flex items-center gap-2 text-sm">
          {pathSegments.map((segment, index) => (
            <li key={segment.label} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" aria-hidden="true" />}
              {segment.current ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {segment.label}
                </span>
              ) : (
                <a href={segment.href} className="text-muted-foreground hover:text-primary transition-colors">
                  {segment.label}
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
