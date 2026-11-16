import Link from "next/link"
import { lienListe } from "@/lib/boutique/format"
import type { CriteresCatalogue, Pagination as P } from "@/lib/boutique/types"
import { cn } from "@/lib/utils"

export function Pagination({ chemin, criteres, pagination }: { chemin: string; criteres: CriteresCatalogue; pagination: P }) {
  if (pagination.pages <= 1) return null
  const page = pagination.page
  const pages = Array.from({ length: pagination.pages }, (_, i) => i + 1).filter(
    (n) => n === 1 || n === pagination.pages || Math.abs(n - page) <= 2,
  )
  const lien = (n: number) => lienListe(chemin, criteres, { page: n > 1 ? String(n) : null })
  return (
    <nav aria-label="Pages" className="flex flex-wrap items-center justify-center gap-2">
      {page > 1 && (
        <Link href={lien(page - 1)} className="rounded-lg border border-border px-3 py-2 text-sm text-primary hover:border-primary">
          Page précédente
        </Link>
      )}
      {pages.map((n, i) => (
        <span key={n} className="flex items-center gap-2">
          {i > 0 && n - pages[i - 1] > 1 && <span className="text-muted-foreground">…</span>}
          <Link
            href={lien(n)}
            aria-current={n === page ? "page" : undefined}
            className={cn(
              "min-w-10 rounded-lg border px-3 py-2 text-center text-sm",
              n === page ? "border-primary bg-primary font-bold text-white" : "border-border text-primary hover:border-primary",
            )}
          >
            {n}
          </Link>
        </span>
      ))}
      {page < pagination.pages && (
        <Link href={lien(page + 1)} className="rounded-lg border border-border px-3 py-2 text-sm text-primary hover:border-primary">
          Page suivante
        </Link>
      )}
    </nav>
  )
}
