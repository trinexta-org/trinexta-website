import Link from "next/link"
import { CarteArticle } from "./CarteArticle"
import { Filtres, Tri } from "./Filtres"
import { Pagination } from "./Pagination"
import { JsonLd } from "@/components/seo/JsonLd"
import { elementsListe, listeJsonLd } from "@/lib/boutique/seo"
import { estFiltree } from "@/lib/boutique/format"
import type { CriteresCatalogue, ReponseCatalogue } from "@/lib/boutique/types"

/** Liste filtrable d'articles : filtres à gauche, tri, grille, pagination. */
export function ListeArticles({
  chemin,
  nom,
  criteres,
  reponse,
  site,
  categories,
}: {
  chemin: string
  nom: string
  criteres: CriteresCatalogue
  reponse: ReponseCatalogue
  site: string
  categories?: { libelle: string; href: string; nombre: number }[]
}) {
  const { articles, pagination, facettes } = reponse
  return (
    <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
      <JsonLd data={listeJsonLd(nom, elementsListe(articles, site))} />
      {/* Sur mobile, les filtres passent sous la liste ; un lien y mène depuis le haut. */}
      <div id="filtres" className="order-2 scroll-mt-32 lg:order-none">
        <Filtres chemin={chemin} criteres={criteres} facettes={facettes} categories={categories} />
      </div>
      <div className="order-1 flex flex-col gap-6 lg:order-none">
        <a href="#filtres" className="w-fit rounded-lg border border-border bg-white px-4 py-2 text-sm font-bold text-primary lg:hidden">
          Filtrer par marque ou par prix
        </a>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {pagination.total} produit{pagination.total > 1 ? "s" : ""}
            {criteres.q ? ` pour « ${criteres.q} »` : ""}
          </p>
          <Tri chemin={chemin} criteres={criteres} />
        </div>
        {articles.length === 0 ? (
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-white p-8">
            <p className="font-bold text-primary">Aucun produit ne correspond à ces critères.</p>
            <p className="text-muted-foreground">
              Élargissez la recherche, ou décrivez-nous ce qu&apos;il vous faut : nous trouvons le modèle adapté.
            </p>
            <div className="flex flex-wrap gap-4 text-sm font-bold">
              {estFiltree(criteres) && (
                <Link href={chemin} className="text-secondary-strong underline underline-offset-4">
                  Retirer les filtres
                </Link>
              )}
              <Link href="/contact?besoin=materiel#formulaire" className="text-secondary-strong underline underline-offset-4">
                Nous écrire
              </Link>
            </div>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {articles.map((a, i) => (
              <li key={a.slug}>
                <CarteArticle article={a} priorite={i < 3} />
              </li>
            ))}
          </ul>
        )}
        <Pagination chemin={chemin} criteres={criteres} pagination={pagination} />
      </div>
    </div>
  )
}
