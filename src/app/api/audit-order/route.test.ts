import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("@/lib/estimation/rate-limit", () => ({
    checkRateLimit: vi.fn(() => true),
    getClientIp: vi.fn(() => "127.0.0.1"),
    hashIp: vi.fn((value: string) => value),
}));

const createMock = vi.fn();
vi.mock("@/lib/db", () => ({
    prisma: {
        auditOrder: {
            create: (...args: unknown[]) => createMock(...args),
        },
    },
}));

import { POST } from "@/app/api/audit-order/route";
import { AUDIT_ORDER_PRICE_EUR_HT } from "@/data/audit-seo/offer";

const validPayload = {
    url: "https://mon-site.fr",
    prenom: "Jean",
    nom: "Dupont",
    email: "jean.dupont@entreprise.fr",
    entreprise: "Entreprise SAS",
    consent: true,
};

function buildRequest(body: unknown) {
    return new Request("http://localhost/api/audit-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
}

describe("POST /api/audit-order", () => {
    beforeEach(() => {
        createMock.mockReset();
    });

    it("crée un AuditOrder pending avec des données valides", async () => {
        createMock.mockResolvedValueOnce({ id: "order_1" });

        const response = await POST(buildRequest(validPayload));
        const json = await response.json();

        expect(response.status).toBe(201);
        expect(json).toEqual({ id: "order_1" });
        expect(createMock).toHaveBeenCalledWith({
            data: expect.objectContaining({
                status: "pending",
                amountEur: AUDIT_ORDER_PRICE_EUR_HT,
                cgvAcceptedAt: expect.any(Date),
            }),
        });
    });

    it("rejette une soumission sans checkbox CGV et ne crée rien", async () => {
        const { consent: _consent, ...rest } = validPayload;

        const response = await POST(buildRequest(rest));

        expect(response.status).toBe(400);
        expect(createMock).not.toHaveBeenCalled();
    });

    it("rejette une URL invalide et ne crée rien", async () => {
        const response = await POST(buildRequest({ ...validPayload, url: "pas-une-url" }));

        expect(response.status).toBe(400);
        expect(createMock).not.toHaveBeenCalled();
    });

    it("rejette une soumission sans champ d'identité obligatoire et ne crée rien", async () => {
        const { prenom: _prenom, ...rest } = validPayload;

        const response = await POST(buildRequest(rest));

        expect(response.status).toBe(400);
        expect(createMock).not.toHaveBeenCalled();
    });
});