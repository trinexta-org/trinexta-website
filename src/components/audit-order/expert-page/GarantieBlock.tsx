import { AUDIT_ORDER_DELAY_LABEL, AUDIT_ORDER_PRICE_EUR } from "@/data/audit-seo/offer";

export function GarantieBlock() {
    return (
        <div className="rounded-2xl border border-secondary/40 bg-secondary/10 p-6 text-center">
            <p className="text-lg font-black text-white">
                {AUDIT_ORDER_DELAY_LABEL}, sinon remboursé
            </p>
            <p className="mt-2 text-sm text-white/70">
                Et si vous nous confiez la refonte de votre site, les {AUDIT_ORDER_PRICE_EUR}€ TTC sont
                intégralement déduits.
            </p>
        </div>
    );
}