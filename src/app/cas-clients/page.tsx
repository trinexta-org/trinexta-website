import Link from "next/link"
import { Metadata } from "next"
import { BannerCTA } from "@/components/layout/BannerCTA"
import { Section } from "@/components/layout/Section"
import { CasClientsFilters } from "@/components/cas-clients/CasClientsFilters"
import { Button } from "@/components/ui/Button"
import { Heading, Text } from "@/components/ui/Typography"
import { caseClients } from "@/data/cas-clients"

export const metadata: Metadata = {
  title: "Cas clients | TRINEXTA",
  description:
    "Découvrez comment TRINEXTA sécurise, modernise et structure l'informatique des TPE et PME à travers trois cas clients concrets.",
}

export default function CaseClientsPage() {
  return (
    <main className="min-h-screen bg-primary text-white">
      <Section container={false} className="relative overflow-hidden pb-12 pt-20 md:pb-20 md:pt-28">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/services/infogerance/hero.jpg')" }} />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="absolute inset-0 bg-linear-to-r from-primary/95 via-primary/60 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-6">
          <Text className="font-semibold uppercase tracking-[0.22em] text-secondary">
            Cas clients
          </Text>
          <Heading as="h1" className="text-white">
            Ils nous font confiance pour leur informatique
          </Heading>
          <Text variant="lead" className="max-w-3xl text-white/80">
            Trois cas concrets pour montrer comment TRINEXTA sécurise les postes,
            modernise les environnements de travail et remet de l'ordre dans des
            situations IT devenues trop fragiles ou trop coûteuses à subir.
          </Text>
        </div>
        </div>
      </Section>

      <Section className="pt-0 md:pt-0">
        <CasClientsFilters items={caseClients} />
      </Section>

      <Section>
        <BannerCTA
          variant="secondary"
          title="Devenir notre prochain cas client"
          description="Vous voulez sécuriser votre parc, moderniser vos outils ou déléguer enfin le suivi de votre informatique à un interlocuteur fiable ?"
          action={
            <Button asChild variant="primary" size="lg">
              <Link href="/contact">Discuter de votre projet</Link>
            </Button>
          }
        />
      </Section>
    </main>
  )
}
