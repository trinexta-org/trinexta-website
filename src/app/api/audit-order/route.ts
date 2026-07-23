import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { AUDIT_ORDER_PRICE_EUR_HT } from "@/data/audit-seo/offer";
import { auditOrderRequestSchema } from "@/lib/validations/audit-order";
import { checkRateLimit, getClientIp, hashIp } from "@/lib/estimation/rate-limit";

const AUDIT_ORDER_MAX_PER_IP = 10;
const AUDIT_ORDER_MAX_PER_EMAIL = 5;

const RATE_LIMITED = NextResponse.json(
    { error: "Trop de requêtes, réessayez plus tard." },
    { status: 429 }
);

export async function POST(request: Request) {
    try {
        const ipHash = hashIp(getClientIp(request));
        if (!checkRateLimit(`audit-order:${ipHash}`, AUDIT_ORDER_MAX_PER_IP)) return RATE_LIMITED;

        const body = await request.json().catch(() => null);
        const validated = auditOrderRequestSchema.safeParse(body);
        if (!validated.success) {
            return NextResponse.json(
                { error: "Données invalides", details: validated.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { url, prenom, nom, email, entreprise, tva, seoAuditId } = validated.data;

        if (!checkRateLimit(`audit-order-email:${hashIp(email.toLowerCase())}`, AUDIT_ORDER_MAX_PER_EMAIL)) {
            return RATE_LIMITED;
        }

        const order = await prisma.auditOrder.create({
            data: {
                prenom,
                nom,
                email,
                entreprise,
                tva: tva ? tva : null,
                url,
                seoAuditId: seoAuditId ? seoAuditId : null,
                amountEur: AUDIT_ORDER_PRICE_EUR_HT,
                status: "pending",
                cgvAcceptedAt: new Date(),
            },
        });

        return NextResponse.json({ id: order.id }, { status: 201 });
    } catch (error) {
        console.error("Erreur création audit order:", error);
        return NextResponse.json({ error: "Une erreur interne est survenue." }, { status: 500 });
    }
}