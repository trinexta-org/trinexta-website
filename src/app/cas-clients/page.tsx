import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { GridCards } from "@/components/layout/GridCards";
import { CasClientCard } from "@/components/cas-clients/CasClientCard";
import { CasClientsHero } from "@/components/cas-clients/CasClientsHero";
import { TransitionTitle } from "@/components/TransitionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/FinalCTA";
import { caseClients } from "@/data/cas-clients";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { WaveDivider } from "@/components/ui/WaveDivider";

export const metadata: Metadata = {
  title: "Cas clients",
  description:
    "Découvrez comment TRINEXTA sécurise, modernise et structure l'informatique des TPE et PME à travers trois cas clients concrets.",
  alternates: {
    canonical: "/cas-clients",
  },
  openGraph: {
    title: "Cas clients | TRINEXTA",
    description:
      "Découvrez comment TRINEXTA sécurise, modernise et structure l'informatique des TPE et PME à travers trois cas clients concrets.",
    url: "/cas-clients",
    type: "website",
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cas clients | TRINEXTA",
    description:
      "Découvrez comment TRINEXTA sécurise, modernise et structure l'informatique des TPE et PME à travers trois cas clients concrets.",
    images: ["/images/og-default.png"],
  },
};

export default function CaseClientsPage() {
  return (
    <main className="bg-surface min-h-screen relative text-primary">
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "Cas clients", url: "/cas-clients" },
        ]}
      />

      {/* HERO */}
      <CasClientsHero />

      {/* WAVE - SORTIE DU HERO */}
      <WaveDivider from="primary" to="surface" amplitude="ample" />

      {/* TRANSITION TITLE */}
      <TransitionTitle
        surtitle="Nos réalisations"
        line1="Des résultats"
        line2="qui parlent d'eux-mêmes"
      />

      {/* CAS CLIENTS */}
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <GridCards
          columns={3}
          mobileColumns={1}
          gap="gap-6 md:gap-8"
        >
          {caseClients.map((item, i) => (
            <Reveal
              key={item.slug}
              delay={i * 0.1}
            >
              <CasClientCard item={item} />
            </Reveal>
          ))}
        </GridCards>
      </Section>

      {/* CTA FINAL */}
      <FinalCTA
        line1="Devenir notre"
        line2="prochain"
        line3="cas client ?"
        description="Vous voulez sécuriser votre parc, moderniser vos outils ou déléguer enfin le suivi de votre informatique à un interlocuteur fiable ?"
        ctaLabel="Discuter de votre projet"
      />
    </main>
  );
}