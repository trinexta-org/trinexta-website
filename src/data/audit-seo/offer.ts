// Offre commerciale liée à l'audit gratuit : une seule prestation, l'audit
// approfondi payant déduit de la refonte si les travaux sont confiés. Le prix
// se change ICI uniquement, jamais en JSX ni en HTML d'email.
export const DEEP_AUDIT_PRICE_EUR = 390;

/** Libellé de l'offre, source de vérité unique (teaser + email). */
export const DEEP_AUDIT_OFFER_LABEL = `Audit approfondi (${DEEP_AUDIT_PRICE_EUR}€, entièrement déduit si vous nous confiez les travaux)`;

/**
 * Construit le lien /contact pré-rempli depuis un résultat d'audit (URL auditée
 * + score en query). `base` vide pour un lien relatif (teaser), une origine
 * absolue pour l'email. Pur, testable.
 */
export function buildAuditContactUrl(base: string, url: string, score: number): string {
  const params = new URLSearchParams({
    type: "autre",
    audit_url: url,
    audit_score: String(score),
  });
  return `${base}/contact?${params.toString()}`;
}
