import type { Metadata } from "next";
import Image from "next/image";
import { Link2, Gauge, ClipboardList } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ViewportHero } from "@/components/layout/ViewportHero";
import { GridCards } from "@/components/layout/GridCards";
import { Heading, Text } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { AuditForm } from "@/components/audit-seo/AuditForm";
import { ScoreGauge } from "@/components/audit-seo/ScoreGauge";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Entrance } from "@/components/ui/Entrance";

export const metadata: Metadata = {
  title: "Audit SEO gratuit · Analysez votre page en 30 secondes",
  description:
    "Obtenez un score SEO immédiat sur votre page et découvrez les problèmes qui vous coûtent des visiteurs. Gratuit, sans engagement.",
  alternates: {
    canonical: "/audit-seo",
  },
  openGraph: {
    title: "Audit SEO gratuit · Trinexta",
    description:
      "Un score SEO immédiat sur votre page et les problèmes qui vous coûtent des visiteurs. Gratuit, sans engagement.",
    url: "/audit-seo",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Audit SEO gratuit · Trinexta",
    description:
      "Un score SEO immédiat sur votre page et les problèmes qui vous coûtent des visiteurs. Gratuit, sans engagement.",
    images: ["/images/og-default.png"],
  },
};

const REASSURANCES = ["Résultat en 30 secondes", "Une seule page analysée", "Sans engagement"];

const STEPS = [
  {
    icon: Link2,
    title: "Collez votre URL",
    description: "Une page de votre site, celle qui vous inquiète ou celle qui doit convertir.",
  },
  {
    icon: Gauge,
    title: "On lance l'analyse",
    description: "Performance, contenu, structure technique : les mêmes critères que Google.",
  },
  {
    icon: ClipboardList,
    title: "Vous recevez votre score",
    description: "Un score sur 100 et les points qui vous coûtent des visiteurs, tout de suite.",
  },
];

const EXAMPLE_FINDINGS = [
  {
    severity: "critique" as const,
    label: "Critique",
    symptom: "Images non compressées",
    impact: "+2,1s de chargement sur mobile",
  },
  {
    severity: "majeur" as const,
    label: "Majeur",
    symptom: "Balise title dupliquée",
    impact: "Sur 4 pages du site",
  },
];

const severityClass: Record<(typeof EXAMPLE_FINDINGS)[number]["severity"], string> = {
  critique: "bg-red-500/15 text-red-300 border-red-500/30",
  majeur: "bg-amber-500/15 text-amber-300 border-amber-500/30",
};

const severityAccent: Record<(typeof EXAMPLE_FINDINGS)[number]["severity"], string> = {
  critique: "border-red-500/70",
  majeur: "border-amber-500/70",
};

export default function AuditSeoPage() {
  return (
    <main className="relative bg-primary">
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "Audit SEO", url: "/audit-seo" },
        ]}
      />

      <ViewportHero>
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/audit-seo/hero-audit-seo.avif"
            alt="Résultats de recherche Google"
            fill
            quality={75}
            priority
            fetchPriority="high"
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary/90" />
        </div>

        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute -top-40 left-1/2 h-[480px] w-[720px] max-w-full -translate-x-1/2 rounded-full bg-secondary/10 blur-[140px]" />
          <div className="absolute -left-48 bottom-0 h-[420px] w-[560px] rounded-full bg-secondary/5 blur-[120px]" />
        </div>

        <Container className="relative z-10 max-w-3xl py-12 md:py-16 lg:py-20">
          <Entrance direction="up">
            <p className="text-[11px] font-bold uppercase tracking-widest text-secondary">
              Audit SEO gratuit
            </p>
            <h1 className="mt-3 text-3xl font-black text-white md:text-5xl">
              Votre page est-elle vue par <em className="text-secondary">Google</em> ?
            </h1>
            <p className="mt-4 max-w-xl text-white/70">
              Collez l&apos;adresse d&apos;une page, on l&apos;analyse et on vous rend un score SEO
              tout de suite. Vous voyez où vous perdez des visiteurs, sans jargon.
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

          <div id="audit-form" className="mt-10 scroll-mt-24">
            <AuditForm />
          </div>
        </Container>
      </ViewportHero>

      <Section id="comment-ca-marche" className="bg-primary">
        <FadeIn direction="up">
          <p className="text-[11px] font-bold uppercase tracking-widest text-secondary">
            Comment ça marche
          </p>
          <Heading as="h2" className="mt-3 max-w-xl text-white">
            Trois étapes, trente secondes
          </Heading>
        </FadeIn>

        <GridCards columns={3} mobileColumns={1} className="mt-10">
          {STEPS.map((step, index) => (
            <FadeIn key={step.title} delay={index * 0.1} direction="up">
              <div className="h-full rounded-2xl border border-white/10 bg-black/20 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="mt-4 font-bold text-white">{step.title}</p>
                <p className="mt-2 text-sm text-white/60">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </GridCards>
      </Section>

      <Section id="apercu-rapport" className="bg-primary/95">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <FadeIn direction="up">
            <p className="text-[11px] font-bold uppercase tracking-widest text-secondary">
              À quoi ressemble votre rapport
            </p>
            <Heading as="h2" className="mt-3 text-white">
              Un score clair, pas du jargon
            </Heading>
            <Text className="mt-4 text-white/70">
              Pas de tableau à 40 colonnes. Un score sur 100, les points bloquants classés par
              impact, et notre lecture en une phrase. De quoi savoir immédiatement quoi corriger
              en premier.
            </Text>
            <Button asChild variant="secondary" size="lg" className="mt-6">
              <a href="#audit-form">Voir mon score</a>
            </Button>
          </FadeIn>

          <FadeIn delay={0.15} direction="up">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-6 md:p-8">
              <span className="absolute -top-3 right-6 rounded-full border border-white/20 bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/50">
                Exemple
              </span>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 -translate-y-1/3 rounded-full bg-secondary/15 blur-[90px]"
              />

              <div className="relative text-center">
                <p className="text-[11px] font-bold uppercase tracking-widest text-secondary">
                  Score SEO de la page
                </p>
                <div className="mt-4 flex justify-center">
                  <ScoreGauge score={62} colorClass="text-amber-400" size={176} />
                </div>
                <p className="mt-1 truncate text-xs text-white/50">monsite.fr/accueil</p>
              </div>

              <ul className="relative mt-6 space-y-2.5">
                {EXAMPLE_FINDINGS.map((finding) => (
                  <li
                    key={finding.symptom}
                    className={`rounded-r-lg border-l-2 bg-white/[0.03] py-3 pl-4 pr-4 ${severityAccent[finding.severity]}`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${severityClass[finding.severity]}`}
                      >
                        {finding.label}
                      </span>
                      <p className="font-bold text-white">{finding.symptom}</p>
                    </div>
                    <p className="mt-1 text-sm text-white/60">{finding.impact}</p>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </Section>
    </main>
  );
}
