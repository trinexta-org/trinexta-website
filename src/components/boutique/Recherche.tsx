import { Search } from "lucide-react"

/** Formulaire de recherche sans JavaScript : un GET vers la page de résultats. */
export function Recherche({ action = "/boutique/recherche", valeur, sombre = false }: { action?: string; valeur?: string; sombre?: boolean }) {
  return (
    <form action={action} method="get" role="search" className="flex w-full max-w-xl items-center gap-2">
      <label htmlFor="recherche-boutique" className="sr-only">
        Rechercher un produit
      </label>
      <input
        id="recherche-boutique"
        name="q"
        type="search"
        defaultValue={valeur}
        maxLength={80}
        placeholder="Modèle, marque, référence fabricant…"
        className={
          sombre
            ? "h-12 w-full rounded-xl border border-white/30 bg-white px-4 text-primary placeholder:text-muted-foreground focus:outline-2 focus:outline-secondary-soft"
            : "h-12 w-full rounded-xl border border-border bg-white px-4 text-primary placeholder:text-muted-foreground focus:outline-2 focus:outline-secondary-strong"
        }
      />
      <button
        type="submit"
        className="inline-flex h-12 shrink-0 items-center gap-2 rounded-xl bg-secondary-strong px-5 font-bold text-white transition-colors hover:bg-secondary-strong/90"
      >
        <Search aria-hidden="true" className="h-4 w-4" />
        Rechercher
      </button>
    </form>
  )
}
