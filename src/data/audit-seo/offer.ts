// Offre commerciale liée à l'audit gratuit : une seule prestation, l'audit
// approfondi payant déduit de la refonte si les travaux sont confiés. Le prix
// se change ICI uniquement, jamais en JSX ni en HTML d'email.
//
// Prix TTC unique : c'est le montant exact facturé sur Stripe (checkout/route.ts),
// zéro conversion HT/TTC en aval pour éviter tout écart entre le prix affiché
// et le montant débité.
export const AUDIT_ORDER_PRICE_EUR = 490;

/**
 * Interrupteur de mise en vente de l'Audit SEO Expert. Tant que le compte Stripe
 * n'est pas operationnel, tout le parcours payant (pages, API, upsell teaser et
 * email) reste hors ligne. Actif uniquement si NEXT_PUBLIC_AUDIT_EXPERT_ENABLED
 * vaut exactement "true" : par defaut, hors ligne.
 *
 * Prefixe NEXT_PUBLIC_ car le flag est aussi lu cote client (teaser d'audit) ;
 * la valeur est inlinee au build, l'acces statique a process.env est obligatoire.
 */
export function isAuditExpertEnabled(): boolean {
    return process.env.NEXT_PUBLIC_AUDIT_EXPERT_ENABLED === "true";
}

/** Libellé de l'offre, source de vérité unique (page, teaser, email). */
export const AUDIT_ORDER_OFFER_LABEL = `Audit SEO Expert (${AUDIT_ORDER_PRICE_EUR}€ TTC, entièrement déduit si vous nous confiez la refonte)`;

export const AUDIT_ORDER_DELAY_LABEL = "Restitution sous 72h ouvrées";

/**
 * Construit le lien d'upsell vers la commande de l'audit expert, depuis un
 * résultat d'audit gratuit (teaser ou email). `base` vide pour un lien relatif
 * (teaser), une origine absolue pour l'email. La page /audit-seo/expert va
 * chercher elle-même l'URL/l'identité via seoAuditId : aucune donnée métier en
 * clair dans le lien.
 */
export function buildAuditUpsellUrl(base: string, seoAuditId: string): string {
    const params = new URLSearchParams({ seoAuditId });
    return `${base}/audit-seo/expert?${params.toString()}#commande-form`;
}
