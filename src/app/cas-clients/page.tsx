import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { GridCards } from "@/components/layout/GridCards";
import { ViewportHero } from "@/components/layout/ViewportHero";
import { CasClientCard } from "@/components/cas-clients/CasClientCard";
import { Heading, Text } from "@/components/ui/Typography";
import { Entrance } from "@/components/ui/Entrance";
import { Reveal } from "@/components/ui/Reveal";
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

      <Section container={false} className="relative bg-primary overflow-hidden py-20 md:py-32 border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-[800px] h-full md:h-[800px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none z-0" />
        
        <Container className="relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Reveal>
              <Heading as="h2" className="text-3xl sm:text-5xl md:text-7xl text-white uppercase tracking-tighter leading-[0.9] font-black">
                Devenir notre <span className="text-secondary">prochain</span> cas client ?
              </Heading>
            </Reveal>

            <Reveal delay={0.15}>
              <Text className="text-white/70 text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                Vous voulez sécuriser votre parc, moderniser vos outils ou déléguer enfin le suivi de votre informatique à un interlocuteur fiable ?
              </Text>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-4 md:gap-6 bg-transparent border border-white/20 px-8 py-4 md:px-12 md:py-6 rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 hover:border-secondary"
                >
                  <div className="absolute inset-0 bg-white translate-y-[102%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                  
                  <span className="relative z-10 text-white group-hover:text-primary font-black text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] transition-colors duration-500">
                    Discuter de votre projet
                  </span>
                  
                  <div className="relative z-10 text-secondary group-hover:text-primary transition-colors duration-500">
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </div>
  );
}
