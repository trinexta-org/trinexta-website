import { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { GridCards } from "@/components/layout/GridCards";
import { CasClientCard } from "@/components/cas-clients/CasClientCard";
import { CasClientsHero } from "@/components/cas-clients/CasClientsHero";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/FinalCTA";
import { caseClients } from "@/data/cas-clients";

export const metadata: Metadata = {
  title: "Cas clients | TRINEXTA",
  description:
    "Découvrez comment TRINEXTA sécurise, modernise et structure l'informatique des TPE et PME à travers trois cas clients concrets.",
  openGraph: {
    title: "Cas clients | TRINEXTA",
    description: "Découvrez comment TRINEXTA sécurise, modernise et structure l'informatique des TPE et PME à travers trois cas clients concrets.",
    url: "/cas-clients",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cas clients | TRINEXTA",
    description: "Découvrez comment TRINEXTA sécurise, modernise et structure l'informatique des TPE et PME à travers trois cas clients concrets.",
    images: ["/images/og-default.png"],
  },
};

export default function CaseClientsPage() {
  return (
    <div className="bg-primary text-white">
      <CasClientsHero />

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
