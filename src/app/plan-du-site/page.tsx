import type { Metadata } from "next"
import Link from "next/link"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { Heading } from "@/components/ui/Typography"
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd"
import { PIED_MARQUES, PIED_RESSOURCES, PIED_SERVICES, type LienPied } from "@/data/footer"
import { legalDocuments } from "@/data/legal-documents"

export const metadata: Metadata = {
  title: "Plan du site",
  description:
    "Toutes les pages du site TRINEXTA : offres et services d'infogérance, ressources, cas clients, contact et documents légaux.",
  alternates: { canonical: "/plan-du-site" },
}

const linkClass = "inline-block py-1 text-lg text-primary underline-offset-4 hover:text-secondary-strong hover:underline"

function Groupe({ titre, liens }: { titre: string; liens: LienPied[] }) {
  return (
    <div className="flex flex-col gap-4 border-t border-primary/30 pt-6">
      <Heading as="h2" className="text-2xl">
        {titre}
      </Heading>
      <ul className="flex flex-col gap-2">
        {liens.map((l) => (
          <li key={l.href}>
            {l.href.startsWith("http") ? (
              <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {l.name} <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <Link href={l.href} className={linkClass}>
                {l.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function PlanDuSitePage() {
  return (
    <main className="bg-surface">
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "Plan du site", url: "/plan-du-site" },
        ]}
      />
      <Section container={false} className="pt-32 md:pt-40">
        <Container className="max-w-[1280px] flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-secondary-strong">Plan du site</span>
            <Heading as="h1">Toutes nos *pages*</Heading>
          </div>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <Groupe titre="Accueil" liens={[{ name: "Accueil", href: "/" }, { name: "Estimer mon budget", href: "/estimation" }]} />
            <Groupe titre="Offres et services" liens={PIED_SERVICES} />
            <Groupe titre="Ressources" liens={PIED_RESSOURCES} />
            <Groupe titre="Les marques TRINEXTA" liens={PIED_MARQUES} />
            <Groupe
              titre="Informations légales"
              liens={[
                { name: "Tous les documents", href: "/informations-juridiques" },
                ...legalDocuments.map((d) => ({ name: d.title, href: d.href })),
              ]}
            />
          </div>
        </Container>
      </Section>
    </main>
  )
}
