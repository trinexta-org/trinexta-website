import type { Metadata } from "next"
import { Section } from "@/components/layout/Section"
import { EnteteBoutique } from "@/components/boutique/EnteteBoutique"
import { CarteKit } from "@/components/boutique/CarteKit"
import { Repli } from "@/components/boutique/Repli"
import { JsonLd } from "@/components/seo/JsonLd"
import { KITS_CONTENU } from "@/data/boutique"
import { boutique } from "@/lib/boutique/api"
import { listeJsonLd } from "@/lib/boutique/seo"
import { ETAPE_ACCUEIL, ETAPE_BOUTIQUE, SITE_URL } from "@/lib/boutique/site"

export const revalidate = 300

export const metadata: Metadata = {
  title: KITS_CONTENU.seoTitre,
  description: KITS_CONTENU.description,
  alternates: { canonical: "/boutique/kits" },
  openGraph: {
    title: `${KITS_CONTENU.seoTitre} | TRINEXTA`,
    description: KITS_CONTENU.description,
    url: "/boutique/kits",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
}

export default async function KitsPage() {
  const res = await boutique().kits()
  return (
    <div>
      <EnteteBoutique
        etapes={[ETAPE_ACCUEIL, ETAPE_BOUTIQUE, { nom: KITS_CONTENU.titre, url: "/boutique/kits" }]}
        surtitre="Boutique · espace professionnel"
        titre={KITS_CONTENU.titre}
        intro={KITS_CONTENU.intro}
        recherche={false}
      />
      {!res.ok ? (
        <Repli />
      ) : (
        <Section className="py-10 md:py-14 lg:py-16">
          <JsonLd
            data={listeJsonLd(
              KITS_CONTENU.titre,
              res.data.kits.map((k) => ({ nom: k.nom, url: `${SITE_URL}/boutique/kits/${k.slug}` })),
            )}
          />
          {res.data.kits.length === 0 ? (
            <p className="text-muted-foreground">Aucun kit n&apos;est proposé pour le moment.</p>
          ) : (
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {res.data.kits.map((k) => (
                <li key={k.slug}>
                  <CarteKit kit={k} />
                </li>
              ))}
            </ul>
          )}
        </Section>
      )}
    </div>
  )
}
