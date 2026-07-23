import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { EstimationWizard } from "@/components/estimation/EstimationWizard";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Entrance } from "@/components/ui/Entrance";
import { SectionFade } from "@/components/ui/SectionFade";

export const metadata: Metadata = {
  title: "Estimation en ligne · Chiffrez votre projet informatique",
  description:
    "Répondez à quelques questions et obtenez immédiatement une fourchette de prix pour votre infogérance, votre cybersécurité ou votre projet de création de site web. Gratuit, sans engagement.",
  alternates: {
    canonical: "/estimation",
  },
  openGraph: {
    title: "Estimation en ligne · Trinexta",
    description:
      "Répondez à quelques questions et obtenez immédiatement une fourchette de prix pour votre projet informatique. Gratuit, sans engagement.",
    url: "/estimation",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Estimation en ligne · Trinexta",
    description:
      "Répondez à quelques questions et obtenez immédiatement une fourchette de prix pour votre projet informatique. Gratuit, sans engagement.",
    images: ["/images/og-default.png"],
  },
};

const REASSURANCES = ["Deux minutes chrono", "Résultat immédiat, sans email", "Sans engagement"];

export default function EstimationPage() {
  return (
    <main className="relative min-h-screen bg-primary">
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "Estimation", url: "/estimation" },
        ]}
      />

      {/* Hero : photo + voile primary, comme les autres pages du site */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/pricing/hero-offres.avif"
          alt=""
          fill
          priority
          fetchPriority="high"
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/90" aria-hidden="true" />
        <SectionFade edge="bottom" />
        <Container className="relative z-10 max-w-3xl py-16 md:py-24">
          <Entrance direction="up">
            <p className="text-[11px] font-bold uppercase tracking-widest text-secondary">
              Estimation gratuite
            </p>
            <h1 className="mt-3 text-3xl font-black text-white md:text-5xl">
              Combien ça coûte, chez <em className="text-secondary">vous</em> ?
            </h1>
            <p className="mt-4 max-w-xl text-white/70">
              Quelques questions sur votre quotidien, une fourchette de prix immédiate.
              Les chiffres sortent de notre grille tarifaire, la même que pour nos devis.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {REASSURANCES.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                  <svg
                    className="h-3.5 w-3.5 shrink-0 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </Entrance>
        </Container>
      </section>

      <Section container={false} dark className="py-12 md:py-16">
        <Container className="max-w-3xl">
          <EstimationWizard bookingsUrl={process.env.NEXT_PUBLIC_BOOKINGS_URL} />

          <Entrance direction="none" delay={0.4}>
            <div className="mt-16 border-l-2 border-secondary/50 pl-5">
              <p className="max-w-xl text-sm leading-relaxed text-white/60">
                Ce simulateur applique la même grille tarifaire que nos devis. Le résultat
                s&apos;affiche sans laisser d&apos;email : vous arrivez au premier échange
                en connaissant déjà les ordres de grandeur.
              </p>
              <p className="mt-3 font-serif text-sm italic text-secondary">
                L&apos;équipe Trinexta
              </p>
            </div>
          </Entrance>
        </Container>
      </Section>

      <div className="h-16" aria-hidden="true" />
    </main>
  );
}
