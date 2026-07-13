import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AuditForm } from "@/components/audit-seo/AuditForm";
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

export default function AuditSeoPage() {
  return (
    <main className="relative min-h-screen bg-primary">
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "Audit SEO", url: "/audit-seo" },
        ]}
      />

      <Section container={false} className="relative overflow-hidden bg-primary py-16 md:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[480px] w-[720px] max-w-full -translate-x-1/2 rounded-full bg-secondary/10 blur-[140px]" />
          <div className="absolute -left-48 bottom-0 h-[420px] w-[560px] rounded-full bg-secondary/5 blur-[120px]" />
        </div>

        <Container className="relative z-10 max-w-3xl">
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

          <div className="mt-10">
            <AuditForm />
          </div>
        </Container>
      </Section>

      <div className="h-16" aria-hidden="true" />
    </main>
  );
}
