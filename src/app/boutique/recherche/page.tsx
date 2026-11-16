import type { Metadata } from "next"
import { Section } from "@/components/layout/Section"
import { EnteteBoutique } from "@/components/boutique/EnteteBoutique"
import { ListeArticles } from "@/components/boutique/ListeArticles"
import { Repli } from "@/components/boutique/Repli"
import { CATEGORIES_BOUTIQUE, CONTENU_CATEGORIES } from "@/data/boutique"
import { boutique } from "@/lib/boutique/api"
import { lireCriteres, type Params } from "@/lib/boutique/format"
import { ETAPE_ACCUEIL, ETAPE_BOUTIQUE, SITE_URL } from "@/lib/boutique/site"

type Props = { searchParams: Promise<Params> }

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { q } = lireCriteres(await props.searchParams)
  return {
    title: q ? `Recherche « ${q} » dans la boutique` : "Recherche dans la boutique",
    description: "Recherchez un produit dans la boutique de matériel professionnel TRINEXTA.",
    // Une page de résultats n'a pas d'adresse propre : elle renvoie à l'accueil de la boutique.
    alternates: { canonical: "/boutique" },
  }
}

export default async function RecherchePage(props: Props) {
  const criteres = lireCriteres(await props.searchParams)
  const chemin = "/boutique/recherche"
  const reponse = await boutique().catalogue(criteres)
  const titre = criteres.q ? `Résultats pour « ${criteres.q} »` : "Rechercher un produit"
  const categories = reponse.ok
    ? reponse.data.facettes.categories
        .filter((c) => CATEGORIES_BOUTIQUE.includes(c.code))
        .map((c) => ({
          libelle: CONTENU_CATEGORIES[c.code].titre,
          href: criteres.q ? `/boutique/${c.code}?q=${encodeURIComponent(criteres.q)}` : `/boutique/${c.code}`,
          nombre: c.nombre,
        }))
    : []

  return (
    <div>
      <EnteteBoutique
        etapes={[ETAPE_ACCUEIL, ETAPE_BOUTIQUE, { nom: "Recherche", url: chemin }]}
        titre={titre}
        valeurRecherche={criteres.q}
      />
      {!reponse.ok ? (
        <Repli />
      ) : (
        <Section className="py-10 md:py-14 lg:py-16">
          <ListeArticles
            chemin={chemin}
            nom={titre}
            criteres={criteres}
            reponse={reponse.data}
            site={SITE_URL}
            categories={categories}
          />
        </Section>
      )}
    </div>
  )
}
