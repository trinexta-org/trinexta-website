import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { FilAriane } from "@/components/boutique/FilAriane"
import { BlocPrix } from "@/components/boutique/BlocPrix"
import { Disponibilite } from "@/components/boutique/Disponibilite"
import { Galerie } from "@/components/boutique/Galerie"
import { ImageProduit } from "@/components/boutique/ImageProduit"
import { CarteArticle } from "@/components/boutique/CarteArticle"
import { Repli } from "@/components/boutique/Repli"
import { BoutonAjouterPanier } from "@/components/boutique/BoutonAjouterPanier"
import { JsonLd } from "@/components/seo/JsonLd"
import { CONTENU_CATEGORIES, lienCommande } from "@/data/boutique"
import { boutique } from "@/lib/boutique/api"
import { baseApi } from "@/lib/boutique/constantes"
import { urlImage } from "@/lib/boutique/format"
import { produitJsonLd } from "@/lib/boutique/seo"
import { ETAPE_ACCUEIL, ETAPE_BOUTIQUE, SITE_URL } from "@/lib/boutique/site"
import type { Caracteristique, ImageArticle } from "@/lib/boutique/types"

export const revalidate = 300

type Props = { params: Promise<{ slug: string }> }

function imagesAbsolues(images: ImageArticle[]) {
  const base = baseApi()
  return images
    .map((i) => ({ grande: urlImage(i.grande, base), miniature: urlImage(i.miniature, base) }))
    .filter((i): i is { grande: string; miniature: string } => Boolean(i.grande && i.miniature))
}

function grouper(caracteristiques: Caracteristique[]) {
  const groupes = new Map<string, Caracteristique[]>()
  for (const c of caracteristiques) groupes.set(c.groupe, [...(groupes.get(c.groupe) ?? []), c])
  return [...groupes]
}

function resume(texte: string | null | undefined, max = 155): string | null {
  if (!texte) return null
  const t = texte.replace(/\s+/g, " ").trim()
  return t.length <= max ? t : `${t.slice(0, max - 1).replace(/\s+\S*$/, "")}…`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const res = await boutique().article(slug)
  if (!res.ok) return { title: "Produit de la boutique" }
  const a = res.data
  const titre = a.marque && !a.nom.toLowerCase().startsWith(a.marque.libelle.toLowerCase()) ? `${a.marque.libelle} ${a.nom}` : a.nom
  const description =
    resume(a.description ?? a.presentation) ??
    `${titre} : ${CONTENU_CATEGORIES[a.categorie.code].titre.toLowerCase()} professionnel, prix HT et TTC, installation possible par TRINEXTA.`
  const image = urlImage(a.image?.grande, baseApi())
  const url = `/boutique/produit/${a.slug}`
  return {
    title: titre,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${titre} | TRINEXTA`,
      description,
      url,
      type: "website",
      images: image ? [{ url: image, width: 960, height: 960, alt: titre }] : [{ url: "/images/og-default.png", width: 1200, height: 630 }],
    },
  }
}

export default async function ProduitPage({ params }: Props) {
  const { slug } = await params
  const res = await boutique().article(slug)
  if (!res.ok && res.raison === "introuvable") notFound()
  if (!res.ok) {
    return (
      <div>
        <Repli />
      </div>
    )
  }
  const a = res.data
  const url = `${SITE_URL}/boutique/produit/${a.slug}`
  const images = imagesAbsolues(a.images.length ? a.images : a.image ? [a.image] : [])
  const groupes = grouper(a.caracteristiques)
  const contenuCategorie = CONTENU_CATEGORIES[a.categorie.code]
  const texte = a.description ?? a.presentation

  return (
    <div>
      <JsonLd data={produitJsonLd(a, url, images.map((i) => i.grande))} />
      <Section className="py-8 md:py-12 lg:py-14">
        <div className="flex flex-col gap-8">
          <FilAriane
            etapes={[
              ETAPE_ACCUEIL,
              ETAPE_BOUTIQUE,
              { nom: contenuCategorie.titre, url: `/boutique/${a.categorie.code === "kit" ? "kits" : a.categorie.code}` },
              { nom: a.nom, url: `/boutique/produit/${a.slug}` },
            ]}
          />
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            {images.length > 0 ? (
              <Galerie images={images} alt={a.nom} />
            ) : (
              <ImageProduit image={null} alt={a.nom} categorie={a.categorie.code} className="rounded-2xl" />
            )}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                {a.marque && (
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-secondary-strong">{a.marque.libelle}</p>
                )}
                <h1 className="text-3xl font-black leading-tight text-primary md:text-4xl">{a.nom}</h1>
                <dl className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                  {a.referenceFabricant && (
                    <div className="flex gap-1.5">
                      <dt>Référence fabricant :</dt>
                      <dd className="font-semibold text-primary">{a.referenceFabricant}</dd>
                    </div>
                  )}
                  {a.ean && (
                    <div className="flex gap-1.5">
                      <dt>EAN :</dt>
                      <dd className="font-semibold text-primary">{a.ean}</dd>
                    </div>
                  )}
                </dl>
              </div>
              <Disponibilite valeur={a.disponibilite} />
              <BlocPrix prix={a.prix} taille="fiche" />
              <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-5">
                <BoutonAjouterPanier cible={{ type: "article", slug: a.slug }} />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Prix indicatif : le prix, la disponibilité et la livraison sont confirmés à la commande. Installation
                  possible par TRINEXTA.{" "}
                  <Link href={lienCommande({ slug: a.slug, nom: a.nom })} className="font-semibold text-secondary-strong underline underline-offset-4">
                    Une question sur ce produit ?
                  </Link>
                </p>
              </div>
              {texte && <p className="leading-relaxed text-muted-foreground">{resume(texte, 400)}</p>}
            </div>
          </div>
        </div>
      </Section>

      {(texte || groupes.length > 0) && (
        <Section container={false} className="border-t border-border bg-white py-12 md:py-16 lg:py-20">
          <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            {texte && (
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-black text-primary">Présentation</h2>
                <p className="whitespace-pre-line leading-relaxed text-muted-foreground">{texte}</p>
              </div>
            )}
            {groupes.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-black text-primary">Caractéristiques</h2>
                <div className="flex flex-col gap-6">
                  {groupes.map(([groupe, lignes]) => (
                    <table key={groupe} className="w-full text-left text-sm">
                      <caption className="mb-2 text-left text-xs font-bold uppercase tracking-[0.16em] text-secondary-strong">
                        {groupe}
                      </caption>
                      <tbody className="divide-y divide-border border-y border-border">
                        {lignes.map((l) => (
                          <tr key={`${groupe}-${l.nom}`}>
                            <th scope="row" className="w-1/2 py-2 pr-4 font-normal text-muted-foreground">
                              {l.nom}
                            </th>
                            <td className="py-2 font-semibold text-primary">{l.valeur}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </Section>
      )}

      {a.lies.length > 0 && (
        <Section className="py-12 md:py-16 lg:py-20">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-black text-primary">Vous pourriez aussi avoir besoin de</h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {a.lies.map((l) => (
                <li key={l.slug}>
                  <CarteArticle article={l} />
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}
    </div>
  )
}
