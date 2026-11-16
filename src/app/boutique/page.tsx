import type { Metadata } from "next"
import Link from "next/link"
import { Section } from "@/components/layout/Section"
import { Heading } from "@/components/ui/Typography"
import { EnteteBoutique } from "@/components/boutique/EnteteBoutique"
import { CarteArticle } from "@/components/boutique/CarteArticle"
import { CarteKit } from "@/components/boutique/CarteKit"
import { Reassurance } from "@/components/boutique/Reassurance"
import { Questions } from "@/components/boutique/Questions"
import { Repli } from "@/components/boutique/Repli"
import { JsonLd } from "@/components/seo/JsonLd"
import { BOUTIQUE_HERO, BOUTIQUE_QUESTIONS, CATEGORIES_BOUTIQUE, CONTENU_CATEGORIES, KITS_CONTENU } from "@/data/boutique"
import { boutique } from "@/lib/boutique/api"
import { kitsAvecPhotos } from "@/lib/boutique/kits"
import { elementsListe, listeJsonLd } from "@/lib/boutique/seo"
import { ETAPE_ACCUEIL, ETAPE_BOUTIQUE, SITE_URL } from "@/lib/boutique/site"

const TITRE = "Boutique de matériel informatique professionnel"
const DESCRIPTION =
  "Portables, postes fixes, écrans, stations d'accueil et kits poste de travail pour entreprises : prix HT et TTC, installation possible par TRINEXTA à Évry-Courcouronnes."

export const revalidate = 300

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: "/boutique" },
  openGraph: {
    title: `${TITRE} | TRINEXTA`,
    description: DESCRIPTION,
    url: "/boutique",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
}

export default async function BoutiquePage() {
  const api = boutique()
  const [catalogue, kits] = await Promise.all([api.catalogue({ tri: "nouveautes", parPage: 8 }), api.kits()])
  const kitsVitrine = kits.ok ? await kitsAvecPhotos(api, kits.data.kits.slice(0, 3)) : []
  const etapes = [ETAPE_ACCUEIL, ETAPE_BOUTIQUE]

  return (
    <div>
      <EnteteBoutique etapes={etapes} surtitre={BOUTIQUE_HERO.surtitre} titre={BOUTIQUE_HERO.titre} intro={BOUTIQUE_HERO.intro} />

      {!catalogue.ok ? (
        <Repli />
      ) : (
        <>
          <JsonLd data={listeJsonLd("Nouveautés de la boutique TRINEXTA", elementsListe(catalogue.data.articles, SITE_URL))} />
          <Section className="pb-0 md:pb-0 lg:pb-0">
            <div className="flex flex-col gap-6">
              <Heading as="h2" className="text-2xl md:text-3xl">Parcourir par *catégorie*</Heading>
              <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {CATEGORIES_BOUTIQUE.map((code) => {
                  const nombre = catalogue.data.facettes.categories.find((c) => c.code === code)?.nombre ?? 0
                  if (nombre === 0) return null
                  return (
                    <li key={code}>
                      <Link
                        href={`/boutique/${code}`}
                        className="flex h-full flex-col justify-between gap-2 rounded-2xl border border-border bg-white p-5 transition-shadow hover:shadow-md"
                      >
                        <span className="font-bold text-primary">{CONTENU_CATEGORIES[code].titre}</span>
                        <span className="text-sm text-muted-foreground">
                          {nombre} produit{nombre > 1 ? "s" : ""}
                        </span>
                      </Link>
                    </li>
                  )
                })}
                {kits.ok && kits.data.kits.length > 0 && (
                  <li>
                    <Link
                      href="/boutique/kits"
                      className="flex h-full flex-col justify-between gap-2 rounded-2xl border border-primary bg-primary p-5 text-white transition-shadow hover:shadow-md"
                    >
                      <span className="font-bold">{KITS_CONTENU.titre}</span>
                      <span className="text-sm text-white/70">
                        {kits.data.kits.length} kit{kits.data.kits.length > 1 ? "s" : ""}
                      </span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </Section>

          {kits.ok && kits.data.kits.length > 0 && (
            <Section className="pb-0 md:pb-0 lg:pb-0">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <Heading as="h2" className="text-2xl md:text-3xl">Équiper un collaborateur en une *commande*</Heading>
                  <p className="max-w-3xl text-muted-foreground">{KITS_CONTENU.intro}</p>
                </div>
                <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {kitsVitrine.map((k) => (
                    <li key={k.slug}>
                      <CarteKit kit={k} photos={k.photos} />
                    </li>
                  ))}
                </ul>
              </div>
            </Section>
          )}

          {catalogue.data.articles.length > 0 && (
            <Section className="pb-0 md:pb-0 lg:pb-0">
              <div className="flex flex-col gap-6">
                <Heading as="h2" className="text-2xl md:text-3xl">Derniers *arrivés*</Heading>
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {catalogue.data.articles.map((a) => (
                    <li key={a.slug}>
                      <CarteArticle article={a} />
                    </li>
                  ))}
                </ul>
              </div>
            </Section>
          )}
        </>
      )}

      <Section>
        <div className="flex flex-col gap-12">
          <Reassurance />
          <Questions titre="Questions fréquentes" questions={BOUTIQUE_QUESTIONS} />
        </div>
      </Section>
    </div>
  )
}
