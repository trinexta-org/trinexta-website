import { describe, expect, it, vi, beforeEach } from "vitest";

// Parcours payant derriere un flag : les cas nominaux supposent l'offre en ligne.
vi.stubEnv("NEXT_PUBLIC_AUDIT_EXPERT_ENABLED", "true");

const findUniqueMock = vi.fn();
const updateMock = vi.fn();
vi.mock("@/lib/db", () => ({
    prisma: {
        auditOrder: {
            findUnique: (...args: unknown[]) => findUniqueMock(...args),
            update: (...args: unknown[]) => updateMock(...args),
        },
    },
}));

const constructEventMock = vi.fn();
vi.mock("@/lib/stripe", () => ({
    getStripe: () => ({
        webhooks: {
            constructEvent: (...args: unknown[]) => constructEventMock(...args),
        },
    }),
}));

const sendMailMock = vi.fn();
vi.mock("@/lib/mail", () => ({
    sendMail: (...args: unknown[]) => sendMailMock(...args),
    escapeHtml: (value: string) => value,
}));

import { POST } from "@/app/api/webhooks/stripe/route";

const pendingOrder = {
    id: "order_1",
    prenom: "Jean",
    nom: "Dupont",
    email: "j.dupont@entreprise.fr",
    entreprise: "Entreprise SAS",
    tva: null,
    url: "https://mon-site.fr",
    amountEur: 490,
    status: "pending",
    paidAt: null,
};

const checkoutSessionCompletedEvent = {
    type: "checkout.session.completed",
    data: {
        object: {
            id: "cs_test_1",
            payment_intent: "pi_test_1",
            metadata: { auditOrderId: "order_1" },
        },
    },
};

function buildRequest(body = "{}", signature: string | null = "valid_signature") {
    const headers = new Headers();
    if (signature) headers.set("stripe-signature", signature);
    return new Request("http://localhost/api/webhooks/stripe", { method: "POST", headers, body });
}

describe("POST /api/webhooks/stripe", () => {
    beforeEach(() => {
        findUniqueMock.mockReset();
        updateMock.mockReset();
        constructEventMock.mockReset();
        sendMailMock.mockReset();
        process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
        process.env.SUPPORT_EMAIL = "support@trinexta.fr";
    });

    it("rejette une requête sans signature", async () => {
        const response = await POST(buildRequest("{}", null));

        expect(response.status).toBe(401);
        expect(constructEventMock).not.toHaveBeenCalled();
        expect(updateMock).not.toHaveBeenCalled();
    });

    it("rejette une signature invalide", async () => {
        constructEventMock.mockImplementationOnce(() => {
            throw new Error("invalid signature");
        });

        const response = await POST(buildRequest());

        expect(response.status).toBe(401);
        expect(updateMock).not.toHaveBeenCalled();
    });

    it("passe l'AuditOrder à paid et envoie la notification équipe", async () => {
        constructEventMock.mockReturnValueOnce(checkoutSessionCompletedEvent);
        findUniqueMock.mockResolvedValueOnce(pendingOrder);
        updateMock.mockResolvedValueOnce({ ...pendingOrder, status: "paid", paidAt: new Date(), stripePaymentIntentId: "pi_test_1" });

        const response = await POST(buildRequest());
        const json = await response.json();

        expect(response.status).toBe(200);
        expect(json).toEqual({ received: true });
        expect(updateMock).toHaveBeenCalledWith({
            where: { id: "order_1" },
            data: expect.objectContaining({ status: "paid", stripePaymentIntentId: "pi_test_1" }),
        });
        expect(sendMailMock).toHaveBeenCalledTimes(1);
    });

    it("ne fait rien si l'AuditOrder est déjà paid (idempotence)", async () => {
        constructEventMock.mockReturnValueOnce(checkoutSessionCompletedEvent);
        findUniqueMock.mockResolvedValueOnce({ ...pendingOrder, status: "paid" });

        const response = await POST(buildRequest());

        expect(response.status).toBe(200);
        expect(updateMock).not.toHaveBeenCalled();
        expect(sendMailMock).not.toHaveBeenCalled();
    });

    it("ignore les events autres que checkout.session.completed", async () => {
        constructEventMock.mockReturnValueOnce({ type: "payment_intent.succeeded", data: { object: {} } });

        const response = await POST(buildRequest());

        expect(response.status).toBe(200);
        expect(findUniqueMock).not.toHaveBeenCalled();
    });
});