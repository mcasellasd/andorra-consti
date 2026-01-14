import { Scale } from "lucide-react"

export function SiteFooter() {
  const footerLinks = [
    { label: "Codi Civil", href: "#" },
    { label: "Codi de Consum", href: "#" },
    { label: "Diccionari jurídic", href: "#" },
    { label: "Avís legal", href: "#" },
  ]

  return (
    <footer className="w-full bg-muted/30 border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10 lg:py-12">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          {/* Logo and description */}
          <div className="space-y-4 lg:max-w-sm">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-primary/10">
                <Scale className="h-4 w-4 text-primary" aria-hidden="true" />
              </div>
              <span className="font-serif text-xl font-semibold text-foreground">Prudència.cat</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Plataforma de consulta del dret civil català amb eines d'intel·ligència artificial per facilitar la
              comprensió i aplicació de la normativa.
            </p>
          </div>

          {/* Navigation links */}
          <nav aria-label="Peu de pàgina">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground/70">© 2026 Prudència.cat · Tots els drets reservats</p>
        </div>
      </div>
    </footer>
  )
}
