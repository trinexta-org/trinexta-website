import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { getStripe } from "@/lib/stripe";

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

const TIMELINE_STEPS = [
    { label: "Payé", done: true },
    { label: "Analyse par l'expert", done: false },
    { label: "Livrable sous 72h ouvrées", done: false },
    { label: "Restitution visio (au créneau réservé)", done: false },
];

export default async function AuditSeoExpertSuccesPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string }>;
}) {
    const { session_id } = await searchParams;
    const paidSession = await getPaidSession(session_id);
    const bookingsUrl = process.env.NEXT_PUBLIC_BOOKINGS_URL;

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

                            <div className="mt-10 text-left">
                                <p className="text-[11px] font-bold uppercase tracking-widest text-secondary-strong">
                                    Et maintenant ?
                                </p>
                                <ol className="mt-4 space-y-3">
                                    {TIMELINE_STEPS.map((step, index) => (
                                        <li key={step.label} className="flex items-center gap-3">
                                            <span
                                                className={
                                                    step.done
                                                        ? "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-black text-white"
                                                        : "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs font-black text-white/40"
                                                }
                                            >
                                                {index + 1}
                                            </span>
                                            <span className={step.done ? "font-bold text-white" : "text-white/60"}>
                                                {step.label}
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                            </div>

                            <div className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-6">
                                <p className="font-bold text-white">Réservez votre créneau de restitution</p>
                                <p className="mt-1 text-sm text-white/60">
                                    Choisissez dès maintenant un créneau pour votre visio de restitution.
                                </p>
                                {bookingsUrl ? (
                                    <iframe
                                        src={bookingsUrl}
                                        title="Réserver un créneau de restitution"
                                        className="mt-4 h-[700px] w-full rounded-xl border-0"
                                        scrolling="yes"
                                    />
                                ) : (
                                    <Button asChild variant="secondary" size="lg" className="mt-4">
                                        <Link href="/contact">Prendre rendez-vous</Link>
                                    </Button>
                                )}
                            </div>

                            <Text className="mt-6 text-sm text-white/50">
                                Une question ?{" "}
                                <Link href="/contact" className="underline hover:text-white">
                                    Contactez-nous
                                </Link>
                            </Text>
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

                    <Button asChild variant="ghost" size="md" className="mt-8">
                        <Link href="/">Retour à l&apos;accueil</Link>
                    </Button>
                </Container>
            </Section>
        </main>
    );
}