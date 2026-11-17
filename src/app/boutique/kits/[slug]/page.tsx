import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Section } from "@/components/layout/Section"
import { FilAriane } from "@/components/boutique/FilAriane"
import { BlocPrix } from "@/components/boutique/BlocPrix"
import { MosaiqueKit } from "@/components/boutique/MosaiqueKit"
import { photosKit } from "@/lib/boutique/kits"
import { Disponibilite } from "@/components/boutique/Disponibilite"
import { ImageProduit } from "@/components/boutique/ImageProduit"
import { Repli } from "@/components/boutique/Repli"
import { BoutonAjouterPanier } from "@/components/boutique/BoutonAjouterPanier"
import { JsonLd } from "@/components/seo/JsonLd"
import { AIDE_KIT_PAR_DEFAUT, KITS_CONTENU, lienCommande } from "@/data/boutique"
import { boutique } from "@/lib/boutique/api"
import { euros, type Params } from "@/lib/boutique/format"
import { kitJsonLd } from "@/lib/boutique/seo"
import { ETAPE_ACCUEIL, ETAPE_BOUTIQUE, SITE_URL } from "@/lib/boutique/site"
import { cn } from "@/lib/utils"

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<Params> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const res = await boutique().kit(slug)
  if (!res.ok) return { title: KITS_CONTENU.titre }
  const k = res.data
  const description = `${k.nom} : ${k.description ?? "poste de travail complet"} À partir de ${euros(k.aPartirDe.ttc)} TTC, variantes 16 ou 32 Go et un ou deux écrans.`
  const url = `/boutique/kits/${k.slug}`
  return {
    title: k.nom,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${k.nom} | TRINEXTA`, description, url, type: "website", images: [{ url: "/images/og-default.png", width: 1200, height: 630 }] },
  }
}

export default async function KitPage({ params, searchParams }: Props) {
  const { slug } = await params
  const res = await boutique().kit(slug)
  if (!res.ok && res.raison === "introuvable") notFound()
  if (!res.ok) {
    return (
      <div>
        <Repli />
      </div>
    )
  }
  const k = res.data
  const demande = (await searchParams).variante
  const variante = k.variantes.find((v) => v.code === demande) ?? k.variantes[0]
  if (!variante) notFound()
  const aide = k.aide ?? (variante.memoireGo ? AIDE_KIT_PAR_DEFAUT : null)
  const chemin = `/boutique/kits/${k.slug}`

  return (
    <div>
      <JsonLd data={kitJsonLd(k, `${SITE_URL}${chemin}`)} />
      <Section className="py-8 md:py-12 lg:py-14">
        <div className="flex flex-col gap-8">
          <FilAriane
            etapes={[ETAPE_ACCUEIL, ETAPE_BOUTIQUE, { nom: KITS_CONTENU.titre, url: "/boutique/kits" }, { nom: k.nom, url: chemin }]}
          />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-14">
            <div className="flex flex-col gap-6">
              <MosaiqueKit
                photos={photosKit({ variantes: [variante] })}
                alt={variante.nom}
                priorite
                sizes="(min-width: 1024px) 640px, 92vw"
                className="rounded-2xl border border-border"
              />
              <div className="flex flex-col gap-3">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-secondary-strong">Kit poste de travail</p>
                <h1 className="text-3xl font-black leading-tight text-primary md:text-4xl">{k.nom}</h1>
                {k.description && <p className="text-lg leading-relaxed text-muted-foreground">{k.description}</p>}
              </div>

              {k.variantes.length > 1 && (
                <nav aria-label="Choisir la configuration" className="flex flex-col gap-3">
                  <p className="font-bold text-primary">Configuration</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {k.variantes.map((v) => {
                      const actif = v.code === variante.code
                      return (
                        <li key={v.code}>
                          <Link
                            href={`${chemin}?variante=${v.code}`}
                            scroll={false}
                            rel="nofollow"
                            aria-current={actif ? "true" : undefined}
                            className={cn(
                              "flex flex-col rounded-xl border-2 px-4 py-3 transition-colors",
                              actif ? "border-primary bg-primary text-white" : "border-border bg-white text-primary hover:border-primary",
                            )}
                          >
                            <span className="font-bold">{v.libelle}</span>
                            <span className={cn("text-sm", actif ? "text-white/70" : "text-muted-foreground")}>
                              {euros(v.prix.ttc)} TTC
                            </span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </nav>
              )}

              <div className="flex flex-col gap-3">
                <h2 className="text-xl font-black text-primary">Composition</h2>
                <ul className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-white">
                  {variante.composition.map((l) => (
                    <li key={`${l.slug}-${l.nom}`} className="flex items-center gap-4 p-4">
                      <ImageProduit image={l.image} alt={l.nom} categorie={l.categorie.code} taille="miniature" className="w-16 shrink-0" sizes="64px" />
                      <div className="flex flex-1 flex-col gap-0.5">
                        <Link href={`/boutique/produit/${l.slug}`} className="font-semibold text-primary hover:underline">
                          {l.nom}
                        </Link>
                        <span className="text-sm text-muted-foreground">{l.categorie.libelle}</span>
                      </div>
                      <div className="flex flex-col items-end gap-1 text-sm">
                        <span className="font-bold text-primary">× {l.quantite}</span>
                        {l.offert && (
                          <span className="rounded-full bg-secondary-strong px-2 py-0.5 text-xs font-bold text-white">Offert</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:sticky lg:top-36 lg:self-start">
              <div className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-6">
                <p className="font-bold text-primary">{variante.nom}</p>
                <Disponibilite valeur={variante.disponibilite} />
                <BlocPrix prix={variante.prix} taille="fiche" />
                {variante.remisePourcent > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Valeur des articles achetés séparément : {euros(variante.valeur.ttc)} TTC. Remise du kit :{" "}
                    {variante.remisePourcent} %.
                  </p>
                )}
                <BoutonAjouterPanier
                  key={variante.code}
                  cible={{ type: "kit", slug: k.slug, variante: variante.code }}
                  libelle="Ajouter le kit au panier"
                />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Prix indicatif : le prix, la disponibilité et la livraison sont confirmés à la commande. Installation
                  possible par TRINEXTA.{" "}
                  <Link
                    href={lienCommande({ slug: k.slug, nom: variante.nom, variante: variante.code, kit: true })}
                    className="font-semibold text-secondary-strong underline underline-offset-4"
                  >
                    Une question sur ce kit ?
                  </Link>
                </p>
              </div>

              {aide && (
                <div className="flex flex-col gap-4 rounded-2xl bg-accent p-6">
                  <h2 className="text-xl font-black text-primary">16 ou 32 Go, un ou deux écrans ?</h2>
                  {aide.memoire.map((m) => (
                    <div key={m.titre} className="flex flex-col gap-1">
                      <h3 className="font-bold text-primary">{m.titre}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{m.texte}</p>
                    </div>
                  ))}
                  {aide.ecrans && <p className="text-sm leading-relaxed text-muted-foreground">{aide.ecrans}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
