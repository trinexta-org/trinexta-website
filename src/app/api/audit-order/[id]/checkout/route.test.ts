import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("@/lib/estimation/rate-limit", () => ({
    checkRateLimit: vi.fn(() => true),
    getClientIp: vi.fn(() => "127.0.0.1"),
    hashIp: vi.fn((value: string) => value),
}));

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

const createSessionMock = vi.fn();
vi.mock("@/lib/stripe", () => ({
    getStripe: () => ({
        checkout: {
            sessions: {
                create: (...args: unknown[]) => createSessionMock(...args),
            },
        },
    }),
}));

import { POST } from "@/app/api/audit-order/[id]/checkout/route";

const pendingOrder = {
    id: "order_1",
    amountEur: 490,
    url: "https://mon-site.fr",
    status: "pending",
};

function buildRequest() {
    return new Request("http://localhost/api/audit-order/order_1/checkout", { method: "POST" });
}

function buildParams(id: string) {
    return { params: Promise.resolve({ id }) };
}

describe("POST /api/audit-order/[id]/checkout", () => {
    beforeEach(() => {
        findUniqueMock.mockReset();
        updateMock.mockReset();
        createSessionMock.mockReset();
        process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
    });

    it("crée une session Checkout et persiste stripeSessionId pour un order pending", async () => {
        findUniqueMock.mockResolvedValueOnce(pendingOrder);
        createSessionMock.mockResolvedValueOnce({ id: "cs_test_1", url: "https://checkout.stripe.com/cs_test_1" });
        updateMock.mockResolvedValueOnce({});

        const response = await POST(buildRequest(), buildParams("order_1"));
        const json = await response.json();

        expect(response.status).toBe(200);
        expect(json).toEqual({ url: "https://checkout.stripe.com/cs_test_1" });
        expect(createSessionMock).toHaveBeenCalledWith(
            expect.objectContaining({
                metadata: { auditOrderId: "order_1" },
                invoice_creation: { enabled: true },
            })
        );
        expect(updateMock).toHaveBeenCalledWith({
            where: { id: "order_1" },
            data: { stripeSessionId: "cs_test_1" },
        });
    });

    it("rejette une commande introuvable", async () => {
        findUniqueMock.mockResolvedValueOnce(null);

        const response = await POST(buildRequest(), buildParams("order_inconnu"));

        expect(response.status).toBe(404);
        expect(createSessionMock).not.toHaveBeenCalled();
    });

    it("rejette une commande déjà payée sans créer de nouvelle session", async () => {
        findUniqueMock.mockResolvedValueOnce({ ...pendingOrder, status: "paid" });

        const response = await POST(buildRequest(), buildParams("order_1"));

        expect(response.status).toBe(409);
        expect(createSessionMock).not.toHaveBeenCalled();
    });
});