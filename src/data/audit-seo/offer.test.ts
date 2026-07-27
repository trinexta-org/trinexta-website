import { describe, expect, it } from "vitest";
import { buildAuditUpsellUrl } from "./offer";

describe("buildAuditUpsellUrl", () => {
    it("construit un lien /audit-seo/expert avec le seoAuditId en query param", () => {
        const url = buildAuditUpsellUrl("https://trinexta.fr", "audit_123");

        expect(url).toBe("https://trinexta.fr/audit-seo/expert?seoAuditId=audit_123#commande-form");
    });

    it("fonctionne avec une base vide pour un lien relatif", () => {
        const url = buildAuditUpsellUrl("", "audit_123");

        expect(url).toBe("/audit-seo/expert?seoAuditId=audit_123#commande-form");
    });
});