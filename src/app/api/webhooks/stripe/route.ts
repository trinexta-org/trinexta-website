import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { sendMail } from "@/lib/mail";
import { buildAuditOrderPaidNotificationHtml } from "@/lib/audit-order/emails";

export async function POST(request: Request) {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!secret) {
        console.error("Secret Stripe webhook manquant dans les variables d'environnement.");
        return NextResponse.json({ error: "Configuration serveur invalide." }, { status: 500 });
    }

    const signature = request.headers.get("stripe-signature");

    if (!signature) {
        console.error("Signature manquante dans la requête webhook Stripe.");
        return NextResponse.json({ error: "Accès refusé. Signature manquante." }, { status: 401 });
    }

    const bodyText = await request.text();

    let event: Stripe.Event;
    try {
        const stripe = getStripe();
        event = stripe.webhooks.constructEvent(bodyText, signature, secret);
    } catch (error) {
        console.error("Signature webhook Stripe invalide:", error);
        return NextResponse.json({ error: "Accès refusé. Signature invalide." }, { status: 401 });
    }

    if (event.type !== "checkout.session.completed") {
        return NextResponse.json({ received: true }, { status: 200 });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const auditOrderId = session.metadata?.auditOrderId;

    if (!auditOrderId) {
        console.error("Session Checkout sans auditOrderId en métadonnée:", session.id);
        return NextResponse.json({ received: true }, { status: 200 });
    }

    const order = await prisma.auditOrder.findUnique({ where: { id: auditOrderId } });

    if (!order) {
        console.error("AuditOrder introuvable pour la session Stripe:", session.id, auditOrderId);
        return NextResponse.json({ received: true }, { status: 200 });
    }

    if (order.status === "paid") {
        return NextResponse.json({ received: true }, { status: 200 });
    }

    const paymentIntentId = typeof session.payment_intent === "string" ? session.payment_intent : null;

    const updatedOrder = await prisma.auditOrder.update({
        where: { id: order.id },
        data: {
            status: "paid",
            paidAt: new Date(),
            ...(paymentIntentId ? { stripePaymentIntentId: paymentIntentId } : {}),
        },
    });

    const supportEmail = process.env.SUPPORT_EMAIL;

    if (!supportEmail) {
        console.error("SUPPORT_EMAIL manquant, notification de paiement non envoyée pour:", order.id);
    } else {
        try {
            await sendMail({
                to: supportEmail,
                subject: `Paiement confirmé : Audit SEO Expert - ${updatedOrder.entreprise}`,
                html: buildAuditOrderPaidNotificationHtml(updatedOrder),
            });
        } catch (error) {
            console.error("Erreur envoi notification paiement:", error);
        }
    }

    return NextResponse.json({ received: true }, { status: 200 });
}