import { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { GridCards } from "@/components/layout/GridCards";
import { ViewportHero } from "@/components/layout/ViewportHero";
import { CasClientCard } from "@/components/cas-clients/CasClientCard";
import { Heading, Text } from "@/components/ui/Typography";
import { Entrance } from "@/components/ui/Entrance";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/FinalCTA";
import { caseClients } from "@/data/cas-clients";

export const metadata: Metadata = {
  title: "Cas clients | TRINEXTA",
  description:
    "Découvrez comment TRINEXTA sécurise, modernise et structure l'informatique des TPE et PME à travers trois cas clients concrets.",
};

export default function CaseClientsPage() {
  return (
    <div className="bg-primary text-white">
      <ViewportHero>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/services/infogerance/hero.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="absolute inset-0 bg-linear-to-r from-primary/95 via-primary/60 to-transparent" />

        <Container className="relative z-10 py-10 md:py-14 lg:py-16 w-full">
          <div className="max-w-5xl space-y-5 md:space-y-6">
            <Entrance delay={0.1} direction="down">
              <Text className="font-semibold uppercase tracking-[0.22em] text-secondary">
                Cas clients
              </Text>
            </Entrance>

            <Entrance delay={0.2} direction="up">
              <Heading as="h1" className="text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-extrabold leading-tight drop-shadow-xl text-white">
                Des dirigeants qui ont décidé de <span className="text-secondary">ne plus subir</span> leur informatique
              </Heading>
            </Entrance>

            <Entrance delay={0.3} direction="up">
              <Text variant="lead" className="max-w-3xl text-white/80">
                Derrière chaque cas, une vraie entreprise avec ses contraintes. On
                vous montre ce qu&apos;on a fait, concrètement, pour sécuriser
                leur informatique et leur rendre la sérénité.
              </Text>
            </Entrance>
          </div>
        </Container>
      </ViewportHero>

      <Section className="pt-0 md:pt-0 lg:pt-0">
        <GridCards columns={3} mobileColumns={1} gap="gap-6 md:gap-8">
          {caseClients.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.1}>
              <CasClientCard item={item} />
            </Reveal>
          ))}
        </GridCards>
      </Section>

      <FinalCTA
        line1="Devenir notre"
        line2="prochain"
        line3="cas client ?"
        description="Vous voulez sécuriser votre parc, moderniser vos outils ou déléguer enfin le suivi de votre informatique à un interlocuteur fiable ?"
        ctaLabel="Discuter de votre projet"
      />
    </div>
  );
}
