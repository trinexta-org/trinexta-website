import Link from "next/link"
import { LIBELLES_TRI, TRANCHES_PRIX } from "@/data/boutique"
import { lienListe } from "@/lib/boutique/format"
import type { CriteresCatalogue, Facettes } from "@/lib/boutique/types"
import { cn } from "@/lib/utils"

const pastille = (actif: boolean) =>
  cn(
    "flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
    actif ? "bg-primary font-semibold text-white" : "text-primary hover:bg-accent",
  )

/** Filtres en liens (aucun JavaScript) : chaque choix est une URL partageable. */
export function Filtres({
  chemin,
  criteres,
  facettes,
  categories,
}: {
  chemin: string
  criteres: CriteresCatalogue
  facettes: Facettes
  /** Liens vers les catégories (page de recherche) : chemin de chaque catégorie. */
  categories?: { libelle: string; href: string; nombre: number }[]
}) {
  const trancheActive = (min?: number, max?: number) =>
    (criteres.prixMin === undefined ? undefined : criteres.prixMin / 100) === min &&
    (criteres.prixMax === undefined ? undefined : criteres.prixMax / 100) === max
  return (
    <aside aria-label="Filtres" className="flex flex-col gap-8">
      {categories && categories.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-secondary-strong">Catégories</h2>
          <ul className="flex flex-col gap-1">
            {categories.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className={pastille(false)}>
                  <span>{c.libelle}</span>
                  <span className="text-muted-foreground">{c.nombre}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {facettes.marques.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-secondary-strong">Marques</h2>
          <ul className="flex flex-col gap-1">
            <li>
              <Link href={lienListe(chemin, criteres, { marque: null })} className={pastille(!criteres.marque)} rel="nofollow">
                <span>Toutes les marques</span>
              </Link>
            </li>
            {facettes.marques.map((m) => (
              <li key={m.code}>
                <Link
                  href={lienListe(chemin, criteres, { marque: m.code })}
                  className={pastille(criteres.marque === m.code)}
                  aria-current={criteres.marque === m.code ? "true" : undefined}
                  rel="nofollow"
                >
                  <span>{m.libelle}</span>
                  <span className={criteres.marque === m.code ? "text-white/70" : "text-muted-foreground"}>{m.nombre}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-secondary-strong">Prix</h2>
        <ul className="flex flex-col gap-1">
          <li>
            <Link
              href={lienListe(chemin, criteres, { prixMin: null, prixMax: null })}
              className={pastille(criteres.prixMin === undefined && criteres.prixMax === undefined)}
              rel="nofollow"
            >
              Tous les prix
            </Link>
          </li>
          {TRANCHES_PRIX.map((t) => (
            <li key={t.libelle}>
              <Link
                href={lienListe(chemin, criteres, {
                  prixMin: t.min === undefined ? null : String(t.min),
                  prixMax: t.max === undefined ? null : String(t.max),
                })}
                className={pastille(trancheActive(t.min, t.max))}
                aria-current={trancheActive(t.min, t.max) ? "true" : undefined}
                rel="nofollow"
              >
                {t.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

/** Choix du tri, en liens. */
export function Tri({ chemin, criteres }: { chemin: string; criteres: CriteresCatalogue }) {
  return (
    <nav aria-label="Trier les produits" className="flex flex-wrap items-center gap-2 text-sm">
      <span className="text-muted-foreground">Trier :</span>
      {LIBELLES_TRI.map((t) => {
        const actif = (criteres.tri ?? "") === t.valeur
        return (
          <Link
            key={t.valeur || "pertinence"}
            href={lienListe(chemin, criteres, { tri: t.valeur || null })}
            aria-current={actif ? "true" : undefined}
            rel="nofollow"
            className={cn(
              "rounded-full border px-3 py-1 transition-colors",
              actif ? "border-primary bg-primary text-white" : "border-border text-primary hover:border-primary",
            )}
          >
            {t.libelle}
          </Link>
        )
      })}
    </nav>
  )
}
