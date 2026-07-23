import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { AUDIT_ORDER_VAT_RATE } from "@/data/audit-seo/offer";
import { checkRateLimit, getClientIp, hashIp } from "@/lib/estimation/rate-limit";

const AUDIT_ORDER_CHECKOUT_MAX_PER_IP = 10;

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const ipHash = hashIp(getClientIp(request));
        if (!checkRateLimit(`audit-order-checkout:${ipHash}`, AUDIT_ORDER_CHECKOUT_MAX_PER_IP)) {
            return NextResponse.json({ error: "Trop de requêtes, réessayez plus tard." }, { status: 429 });
        }

        const { id } = await params;

        const order = await prisma.auditOrder.findUnique({ where: { id } });

        if (!order) {
            return NextResponse.json({ error: "Commande introuvable." }, { status: 404 });
        }

        if (order.status !== "pending") {
            return NextResponse.json({ error: "Cette commande a déjà été traitée." }, { status: 409 });
        }

        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

        if (!siteUrl) {
            console.error("NEXT_PUBLIC_SITE_URL manquant dans les variables d'environnement.");
            return NextResponse.json({ error: "Configuration serveur invalide." }, { status: 500 });
        }

        const amountTtcCents = Math.round(order.amountEur * (1 + AUDIT_ORDER_VAT_RATE) * 100);

        const stripe = getStripe();
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "eur",
                        unit_amount: amountTtcCents,
                        product_data: {
                            name: "Audit SEO Expert",
                            description: order.url,
                        },
                    },
                    quantity: 1,
                },
            ],
            invoice_creation: { enabled: true },
            metadata: { auditOrderId: order.id },
            success_url: `${siteUrl}/audit-seo/expert/succes?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${siteUrl}/audit-seo/expert/annulation`,
        });

        if (!session.url) {
            console.error("Session Stripe créée sans URL de redirection.");
            return NextResponse.json({ error: "Une erreur interne est survenue." }, { status: 500 });
        }

        await prisma.auditOrder.update({
            where: { id: order.id },
            data: { stripeSessionId: session.id },
        });

        return NextResponse.json({ url: session.url }, { status: 200 });
    } catch (error) {
        console.error("Erreur création session Stripe:", error);
        return NextResponse.json({ error: "Une erreur interne est survenue." }, { status: 500 });
    }
}