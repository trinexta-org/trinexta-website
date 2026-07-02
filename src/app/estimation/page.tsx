import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { EstimationWizard } from "@/components/estimation/EstimationWizard";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Entrance } from "@/components/ui/Entrance";

export const metadata: Metadata = {
  title: "Estimation en ligne · Chiffrez votre projet informatique",
  description:
    "Répondez à quelques questions et obtenez immédiatement une fourchette de prix pour votre infogérance, votre cybersécurité ou votre projet de création de site web. Gratuit, sans engagement.",
  alternates: {
    canonical: "/estimation",
  },
  openGraph: {
    title: "Estimation en ligne — Trinexta",
    description:
      "Répondez à quelques questions et obtenez immédiatement une fourchette de prix pour votre projet informatique. Gratuit, sans engagement.",
    url: "/estimation",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Estimation en ligne — Trinexta",
    description:
      "Répondez à quelques questions et obtenez immédiatement une fourchette de prix pour votre projet informatique. Gratuit, sans engagement.",
    images: ["/images/og-default.png"],
  },
};

export default function EstimationPage() {
  return (
    <main className="relative min-h-screen bg-primary">
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "Estimation", url: "/estimation" },
        ]}
      />

      <Section container={false} className="bg-primary pt-10 md:pt-14">
        <Container className="max-w-3xl">
          <Entrance direction="up">
            <div className="mb-10 text-center">
              <p className="text-[11px] font-bold uppercase tracking-widest text-secondary">
                Estimation gratuite
              </p>
              <h1 className="mt-3 text-3xl font-black text-white md:text-5xl">
                Combien ça coûte, chez <em className="not-italic text-secondary">vous</em> ?
              </h1>
              <p className="mt-4 text-white/70">
                Quelques questions sur votre situation, une fourchette de prix immédiate.
                Deux minutes, sans engagement et sans laisser votre email.
              </p>
            </div>
          </Entrance>

          <EstimationWizard bookingsUrl={process.env.NEXT_PUBLIC_BOOKINGS_URL} />
        </Container>
      </Section>

      <div className="h-24" aria-hidden="true" />
    </main>
  );
}
