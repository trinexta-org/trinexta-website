import { describe, expect, it } from "vitest";
import { auditOrderRequestSchema } from "@/lib/validations/audit-order";

const validPayload = {
    url: "https://mon-site.fr",
    prenom: "Jean",
    nom: "Dupont",
    email: "jean.dupont@entreprise.fr",
    entreprise: "Entreprise SAS",
    tva: "",
    consent: true as const,
};

describe("auditOrderRequestSchema", () => {
    it("accepte un payload valide complet", () => {
        const result = auditOrderRequestSchema.safeParse(validPayload);
        expect(result.success).toBe(true);
    });

    it("accepte un payload valide sans tva ni seoAuditId", () => {
        const { tva: _tva, ...rest } = validPayload;
        const result = auditOrderRequestSchema.safeParse(rest);
        expect(result.success).toBe(true);
    });

    it("rejette un consentement manquant", () => {
        const { consent: _consent, ...rest } = validPayload;
        const result = auditOrderRequestSchema.safeParse(rest);
        expect(result.success).toBe(false);
    });

    it("rejette un consentement à false", () => {
        const result = auditOrderRequestSchema.safeParse({ ...validPayload, consent: false });
        expect(result.success).toBe(false);
    });

    it.each(["pas-une-url", "ftp://mon-site.fr", ""])("rejette une URL invalide : %s", (url) => {
        const result = auditOrderRequestSchema.safeParse({ ...validPayload, url });
        expect(result.success).toBe(false);
    });

    it.each(["prenom", "nom", "email", "entreprise"] as const)(
        "rejette un payload sans le champ obligatoire : %s",
        (field) => {
            const payload = { ...validPayload } as Record<string, unknown>;
            delete payload[field];
            const result = auditOrderRequestSchema.safeParse(payload);
            expect(result.success).toBe(false);
        }
    );

    it("rejette un email au format invalide", () => {
        const result = auditOrderRequestSchema.safeParse({ ...validPayload, email: "pas-un-email" });
        expect(result.success).toBe(false);
    });
});