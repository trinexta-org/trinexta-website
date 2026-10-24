import Image from "next/image"
import { Section } from "@/components/layout/Section"
import { sanityClient } from "@/lib/sanity"
import { cleFournisseur, PARTENAIRES_GROUPES, PARTENAIRES_INTRO } from "@/data/partenaires"

interface LogoSanity {
  name: string | null
  logoSrc: string | null
}

/**
 * Partenaires validés (23/10/2026), regroupés par domaine, chacun une seule fois, sans défilement.
 * Logo local s'il existe, sinon logo Sanity, sinon nom en toutes lettres.
 */
export async function PartnersSection() {
  let logos: LogoSanity[] = []
  try {
    logos = await sanityClient.fetch(`*[_type == "partenaire"]{ "name": nom, "logoSrc": logo.asset->url }`)
  } catch {
    // Sanity inaccessible : logos locaux ou noms en toutes lettres.
  }
  const sanityParNom = new Map(logos.map((l) => [cleFournisseur(l.name ?? ""), l.logoSrc]))

  return (
    <Section className="bg-surface pt-0 pb-16 md:pb-24">
      <p className="mx-auto mb-10 max-w-2xl text-center text-lg text-primary/80">{PARTENAIRES_INTRO}</p>
      <div className="grid gap-4 md:grid-cols-3">
        {PARTENAIRES_GROUPES.map((groupe) => (
          <div key={groupe.domaine} className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary-strong">{groupe.domaine}</p>
            <ul className="flex flex-1 flex-wrap items-center gap-x-8 gap-y-5">
              {groupe.partenaires.map((p) => {
                const logo = p.logo ?? sanityParNom.get(cleFournisseur(p.nom)) ?? null
                return (
                  <li key={p.nom} className="flex h-12 items-center">
                    {logo ? (
                      <Image
                        src={logo}
                        alt={p.nom}
                        width={160}
                        height={48}
                        className="h-9 w-auto max-w-[160px] object-contain"
                      />
                    ) : (
                      <span className="text-xl font-black tracking-tight text-primary">{p.nom}</span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
