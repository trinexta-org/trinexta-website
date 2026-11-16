import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { Section } from "@/components/layout/Section"
import { EnteteBoutique } from "@/components/boutique/EnteteBoutique"
import { ListeArticles } from "@/components/boutique/ListeArticles"
import { Questions } from "@/components/boutique/Questions"
import { Repli } from "@/components/boutique/Repli"
import { CATEGORIES_BOUTIQUE, CONTENU_CATEGORIES } from "@/data/boutique"
import { boutique } from "@/lib/boutique/api"
import { canonicalListe, codeCategorie, lireCriteres, type Params } from "@/lib/boutique/format"
import { ETAPE_ACCUEIL, ETAPE_BOUTIQUE, SITE_URL, etapeCategorie } from "@/lib/boutique/site"
import type { CodeCategorie } from "@/lib/boutique/types"

type Props = { params: Promise<{ categorie: string }>; searchParams: Promise<Params> }

async function resoudre(props: Props): Promise<CodeCategorie> {
  const { categorie } = await props.params
  const code = codeCategorie(categorie)
  if (code === "kit") redirect("/boutique/kits")
  if (!code || !CATEGORIES_BOUTIQUE.includes(code)) notFound()
  return code
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const code = await resoudre(props)
  const contenu = CONTENU_CATEGORIES[code]
  const criteres = lireCriteres(await props.searchParams, code)
  const page = criteres.page && criteres.page > 1 && !criteres.marque && !criteres.q ? ` (page ${criteres.page})` : ""
  const canonical = canonicalListe(`/boutique/${code}`, criteres)
  return {
    title: `${contenu.seoTitre}${page}`,
    description: contenu.description,
    alternates: { canonical },
    openGraph: {
      title: `${contenu.seoTitre} | TRINEXTA`,
      description: contenu.description,
      url: canonical,
      type: "website",
      images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
    },
  }
}

export default async function CategoriePage(props: Props) {
  const code = await resoudre(props)
  const contenu = CONTENU_CATEGORIES[code]
  const criteres = lireCriteres(await props.searchParams, code)
  const chemin = `/boutique/${code}`
  const reponse = await boutique().catalogue(criteres)

  return (
    <div>
      <EnteteBoutique
        etapes={[ETAPE_ACCUEIL, ETAPE_BOUTIQUE, etapeCategorie(code)]}
        surtitre="Boutique · espace professionnel"
        titre={contenu.titre}
        intro={contenu.intro}
        recherche={false}
      />
      {!reponse.ok ? (
        <Repli />
      ) : (
        <Section className="py-10 md:py-14 lg:py-16">
          <div className="flex flex-col gap-16">
            <ListeArticles chemin={chemin} nom={contenu.titre} criteres={criteres} reponse={reponse.data} site={SITE_URL} />
            <Questions titre={`${contenu.titre} : vos questions`} questions={contenu.questions} />
          </div>
        </Section>
      )}
    </div>
  )
}
