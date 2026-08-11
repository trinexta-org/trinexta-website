import { describe, expect, it, vi, beforeEach } from "vitest";

// Parcours payant derriere un flag : les cas nominaux supposent l'offre en ligne.
vi.stubEnv("NEXT_PUBLIC_AUDIT_EXPERT_ENABLED", "true");

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
import { AUDIT_ORDER_PRICE_EUR } from "@/data/audit-seo/offer";
import { CGV_VENTE_EN_LIGNE_VERSION } from "@/data/cgv-audit-expert";

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
                amountEur: AUDIT_ORDER_PRICE_EUR,
                cgvAcceptedAt: expect.any(Date),
                cgvVersion: CGV_VENTE_EN_LIGNE_VERSION,
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

    it("répond 404 et ne crée rien quand l'offre expert est hors ligne", async () => {
        vi.stubEnv("NEXT_PUBLIC_AUDIT_EXPERT_ENABLED", "false");

        const response = await POST(buildRequest(validPayload));

        vi.stubEnv("NEXT_PUBLIC_AUDIT_EXPERT_ENABLED", "true");

        expect(response.status).toBe(404);
        expect(createMock).not.toHaveBeenCalled();
    });
});