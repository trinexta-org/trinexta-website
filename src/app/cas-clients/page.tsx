import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { GridCards } from "@/components/layout/GridCards";
import { CasClientCard } from "@/components/cas-clients/CasClientCard";
import { CasClientsHero } from "@/components/cas-clients/CasClientsHero";
import { TransitionTitle } from "@/components/TransitionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/FinalCTA";
import { caseClients, featuredCaseClient } from "@/data/cas-clients";
import { CasClientFeatured } from "@/components/cas-clients/CasClientFeatured";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { WaveDivider } from "@/components/ui/WaveDivider";

export const metadata: Metadata = {
  title: "Cas clients",
  description:
    "Découvrez comment TRINEXTA sécurise, modernise et structure l'informatique des TPE et PME à travers des cas clients concrets : cybersécurité, modernisation, cloud et réponse à incident.",
  alternates: {
    canonical: "/cas-clients",
  },
  openGraph: {
    title: "Cas clients | TRINEXTA",
    description:
      "Découvrez comment TRINEXTA sécurise, modernise et structure l'informatique des TPE et PME à travers des cas clients concrets : cybersécurité, modernisation, cloud et réponse à incident.",
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
      "Découvrez comment TRINEXTA sécurise, modernise et structure l'informatique des TPE et PME à travers des cas clients concrets : cybersécurité, modernisation, cloud et réponse à incident.",
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
      <WaveDivider from="primary" to="surface" amplitude="ample" crossing={1} />

      {/* TRANSITION TITLE */}
      <TransitionTitle
        surtitle="Nos réalisations"
        line1="Des résultats"
        line2="qui parlent d'eux-mêmes"
      />

      {/* CAS CLIENTS */}
      <Section className="pt-0 md:pt-0 lg:pt-0">
        {featuredCaseClient && (
          <Reveal className="mb-10 md:mb-14">
            <CasClientFeatured item={featuredCaseClient} />
          </Reveal>
        )}
        <GridCards
          columns={3}
          mobileColumns={1}
          gap="gap-6 md:gap-8"
        >
          {caseClients.filter((item) => item !== featuredCaseClient).map((item, i) => (
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