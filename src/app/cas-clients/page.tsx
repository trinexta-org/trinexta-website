import Link from "next/link"
import { Metadata } from "next"
import { BannerCTA } from "@/components/layout/BannerCTA"
import { Section } from "@/components/layout/Section"
import { CasClientCard } from "@/components/cas-clients/CasClientCard"
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
            Des dirigeants qui ont décidé de ne plus subir leur informatique
          </Heading>
          <Text variant="lead" className="max-w-3xl text-white/80">
            Derrière chaque cas, une vraie entreprise avec ses contraintes.
            On vous montre ce qu'on a fait, concrètement, pour sécuriser leur
            informatique et leur rendre la sérénité.
          </Text>
        </div>
        </div>
      </Section>

      <Section className="pt-0 md:pt-0">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseClients.map((item) => (
            <CasClientCard key={item.slug} item={item} />
          ))}
        </div>
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
