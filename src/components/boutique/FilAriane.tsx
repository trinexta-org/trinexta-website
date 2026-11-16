import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd"
import { cn } from "@/lib/utils"

export interface Etape {
  nom: string
  url: string
}

/** Fil d'Ariane visible et son équivalent BreadcrumbList. La dernière étape est la page courante. */
export function FilAriane({ etapes, sombre = false }: { etapes: Etape[]; sombre?: boolean }) {
  return (
    <>
      <BreadcrumbJsonLd items={etapes.map((e) => ({ name: e.nom, url: e.url }))} />
      <nav aria-label="Fil d'Ariane" className="text-sm">
        <ol className="flex flex-wrap items-center gap-1.5">
          {etapes.map((e, i) => {
            const derniere = i === etapes.length - 1
            return (
              <li key={e.url} className="flex items-center gap-1.5">
                {i > 0 && (
                  <ChevronRight aria-hidden="true" className={cn("h-3.5 w-3.5", sombre ? "text-white/70" : "text-muted-foreground")} />
                )}
                {derniere ? (
                  <span aria-current="page" className={cn("font-semibold", sombre ? "text-white" : "text-primary")}>
                    {e.nom}
                  </span>
                ) : (
                  <Link
                    href={e.url}
                    className={cn(
                      "underline-offset-4 hover:underline",
                      sombre ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    {e.nom}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
