import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading, Text } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Entrance } from "@/components/ui/Entrance";
import { AuditOrderForm } from "@/components/audit-order/AuditOrderForm";
import { SommaireLivrable } from "@/components/audit-order/expert-page/SommaireLivrable";
import { ApercuLivrable } from "@/components/audit-order/expert-page/ApercuLivrable";
import { GarantieBlock } from "@/components/audit-order/expert-page/GarantieBlock";
import { FaqSection } from "@/components/shared/FaqSection";
import { expertAuditFaqs } from "@/data/audit-seo/expert-faq";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { prisma } from "@/lib/db";
import { AUDIT_ORDER_PRICE_EUR, AUDIT_ORDER_DELAY_LABEL } from "@/data/audit-seo/offer";

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

export default async function AuditSeoExpertPage({
    searchParams,
}: {
    searchParams: Promise<{ seoAuditId?: string }>;
}) {
    const { seoAuditId } = await searchParams;

    const seoAudit = seoAuditId
        ? await prisma.seoAudit
            .findUnique({
                where: { id: seoAuditId },
                select: { id: true, url: true, prenom: true, nom: true, email: true, entreprise: true },
            })
            .catch(() => null)
        : null;

    return (
        <main className="relative bg-primary">
            <BreadcrumbJsonLd
                items={[
                    { name: "Accueil", url: "/" },
                    { name: "Audit SEO", url: "/audit-seo" },
                    { name: "Audit SEO Expert", url: "/audit-seo/expert" },
                ]}
            />

            <Section className="pt-12 md:pt-16 lg:pt-20">
                <Container className="max-w-3xl">
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

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Button asChild variant="secondary" size="lg">
                                <a href="#commande-form">Commander mon audit expert</a>
                            </Button>
                            <Button asChild variant="ghost" size="md">
                                <Link href="/audit-seo">Pas sûr ? Testez l&apos;audit gratuit</Link>
                            </Button>
                        </div>
                    </Entrance>
                </Container>
            </Section>

            <Section className="py-16 md:py-20 lg:py-24">
                <Container className="max-w-5xl space-y-10">
                    <SommaireLivrable />
                    <ApercuLivrable />
                    <GarantieBlock />
                </Container>
            </Section>

            <Section className="pb-16 md:pb-20 lg:pb-24">
                <Container className="max-w-5xl">
                    <FaqSection faqs={expertAuditFaqs} />
                </Container>
            </Section>

            <Section id="commande-form" className="scroll-mt-24 pb-16 md:pb-20 lg:pb-24">
                <Container className="max-w-3xl">
                    <Entrance direction="up">
                        <p className="text-2xl font-black text-white">{AUDIT_ORDER_PRICE_EUR}€ TTC</p>
                        <p className="mt-1 text-sm text-white/50">
                            Entièrement déduit si vous nous confiez la refonte de votre site.
                        </p>
                    </Entrance>

                    <div className="mt-10">
                        <AuditOrderForm
                            initialValues={
                                seoAudit
                                    ? {
                                        url: seoAudit.url,
                                        prenom: seoAudit.prenom,
                                        nom: seoAudit.nom,
                                        email: seoAudit.email,
                                        entreprise: seoAudit.entreprise,
                                        seoAuditId: seoAudit.id,
                                    }
                                    : undefined
                            }
                        />
                    </div>

                    <p className="mt-6 text-center text-sm text-white/50">
                        Pas encore prêt ?{" "}
                        <Link href="/audit-seo" className="underline hover:text-white">
                            Commencez par l&apos;audit gratuit
                        </Link>
                    </p>
                </Container>
            </Section>
        </main>
    );
}
