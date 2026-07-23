import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ViewportHero } from "@/components/layout/ViewportHero";
import { Heading, Text } from "@/components/ui/Typography";
import { Entrance } from "@/components/ui/Entrance";
import { AuditOrderForm } from "@/components/audit-order/AuditOrderForm";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import {
    AUDIT_ORDER_PRICE_EUR_HT,
    AUDIT_ORDER_PRICE_EUR_TTC,
    AUDIT_ORDER_DELAY_LABEL,
} from "@/data/audit-seo/offer";

export const metadata: Metadata = {
    title: "Audit SEO Expert · Analyse manuelle et livrable détaillé",
    description:
        "Un audit SEO manuel réalisé par un expert Trinexta, livrable Word/PDF et restitution en visio. Déduit de la refonte si vous nous confiez les travaux.",
    alternates: {
        canonical: "/audit-seo/expert",
    },
    openGraph: {
        title: "Audit SEO Expert · Trinexta",
        description:
            "Un audit SEO manuel réalisé par un expert Trinexta, livrable Word/PDF et restitution en visio.",
        url: "/audit-seo/expert",
        type: "website",
        images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Audit SEO Expert · Trinexta",
        description:
            "Un audit SEO manuel réalisé par un expert Trinexta, livrable Word/PDF et restitution en visio.",
        images: ["/images/og-default.png"],
    },
};

const INCLUS = [
    "Analyse manuelle complète par un expert SEO",
    "Livrable détaillé au format Word/PDF, charte Trinexta",
    "Restitution en visio de 30 à 45 minutes",
];

export default function AuditSeoExpertPage() {
    return (
        <main className="relative bg-primary">
            <BreadcrumbJsonLd
                items={[
                    { name: "Accueil", url: "/" },
                    { name: "Audit SEO", url: "/audit-seo" },
                    { name: "Audit SEO Expert", url: "/audit-seo/expert" },
                ]}
            />

            <ViewportHero>
                <Container className="relative z-10 max-w-3xl py-12 md:py-16 lg:py-20">
                    <Entrance direction="up">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-secondary">
                            Audit SEO Expert
                        </p>
                        <Heading as="h1" className="mt-3 text-white">
                            Une analyse humaine, pas un rapport automatique
                        </Heading>
                        <Text className="mt-4 max-w-xl text-white/70">
                            Un expert Trinexta audite votre site manuellement et vous remet un livrable complet,
                            suivi d&apos;une restitution en visio. {AUDIT_ORDER_DELAY_LABEL}.
                        </Text>

                        <ul className="mt-6 space-y-2">
                            {INCLUS.map((item) => (
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

                        <p className="mt-6 text-2xl font-black text-white">
                            {AUDIT_ORDER_PRICE_EUR_HT}€ HT
                            <span className="ml-2 text-sm font-normal text-white/50">
                                ({AUDIT_ORDER_PRICE_EUR_TTC}€ TTC)
                            </span>
                        </p>
                        <p className="mt-1 text-sm text-white/50">
                            Entièrement déduit si vous nous confiez la refonte de votre site.
                        </p>
                    </Entrance>

                    <div id="commande-form" className="mt-10 scroll-mt-24">
                        <AuditOrderForm />
                    </div>
                </Container>
            </ViewportHero>
        </main>
    );
}