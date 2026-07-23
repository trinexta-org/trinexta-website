import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
    title: "Paiement annulé · Audit SEO Expert",
    robots: { index: false, follow: false },
};

export default function AuditSeoExpertAnnulationPage() {
    return (
        <main className="relative bg-primary">
            <Section className="py-12 md:py-16 lg:py-20">
                <Container className="max-w-2xl text-center">
                    <Heading as="h1" className="text-white">
                        Paiement annulé
                    </Heading>
                    <Text className="mt-4 text-white/70">
                        Votre commande n&apos;a pas été finalisée. Vous pouvez reprendre votre commande à tout
                        moment, rien n&apos;a été débité.
                    </Text>

                    <Button asChild variant="secondary" size="lg" className="mt-8">
                        <Link href="/audit-seo/expert#commande-form">Reprendre ma commande</Link>
                    </Button>
                </Container>
            </Section>
        </main>
    );
}