import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { getStripe } from "@/lib/stripe";
import { AUDIT_ORDER_DELAY_LABEL } from "@/data/audit-seo/offer";

export const metadata: Metadata = {
    title: "Commande confirmée · Audit SEO Expert",
    robots: { index: false, follow: false },
};

async function getPaidSession(sessionId: string | undefined) {
    if (!sessionId) return null;
    try {
        const session = await getStripe().checkout.sessions.retrieve(sessionId);
        return session.payment_status === "paid" ? session : null;
    } catch (error) {
        console.error("Erreur vérification session Stripe:", error);
        return null;
    }
}

export default async function AuditSeoExpertSuccesPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string }>;
}) {
    const { session_id } = await searchParams;
    const paidSession = await getPaidSession(session_id);

    return (
        <main className="relative bg-primary">
            <Section className="py-12 md:py-16 lg:py-20">
                <Container className="max-w-2xl text-center">
                    {paidSession ? (
                        <>
                            <Heading as="h1" className="text-white">
                                Commande confirmée
                            </Heading>
                            <Text className="mt-4 text-white/70">
                                Merci, votre paiement a bien été reçu. Un email de confirmation vous a été envoyé.
                            </Text>
                            <Text className="mt-2 text-white/70">{AUDIT_ORDER_DELAY_LABEL}.</Text>
                        </>
                    ) : (
                        <>
                            <Heading as="h1" className="text-white">
                                Vérification en cours
                            </Heading>
                            <Text className="mt-4 text-white/70">
                                Nous n&apos;avons pas encore pu confirmer votre paiement. Si vous venez de payer,
                                actualisez cette page dans quelques instants.
                            </Text>
                        </>
                    )}

                    <Button asChild variant="secondary" size="lg" className="mt-8">
                        <Link href="/">Retour à l&apos;accueil</Link>
                    </Button>
                </Container>
            </Section>
        </main>
    );
}