import { escapeHtml } from "@/lib/mail";

const COLOR_PRIMARY = "#0a233e";
const COLOR_SECONDARY = "#5c92b8";

export interface AuditOrderPaidNotificationData {
    id: string;
    prenom: string;
    nom: string;
    email: string;
    entreprise: string;
    tva: string | null;
    url: string;
    amountEur: number;
    paidAt: Date | null;
}

export function buildAuditOrderPaidNotificationHtml(order: AuditOrderPaidNotificationData): string {
    return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;color:#333;">
    <h2 style="color:${COLOR_PRIMARY};">Paiement confirmé — Audit SEO Expert</h2>
    <p><strong>Commande :</strong> ${escapeHtml(order.id)}</p>
    <p><strong>Client :</strong> ${escapeHtml(order.prenom)} ${escapeHtml(order.nom)}</p>
    <p><strong>Entreprise :</strong> ${escapeHtml(order.entreprise)}</p>
    <p><strong>Email :</strong> ${escapeHtml(order.email)}</p>
    <p><strong>N° TVA :</strong> ${order.tva ? escapeHtml(order.tva) : "Non renseigné"}</p>
    <p><strong>Site à auditer :</strong> <a href="${escapeHtml(order.url)}" style="color:${COLOR_SECONDARY};">${escapeHtml(order.url)}</a></p>
    <p><strong>Montant :</strong> ${order.amountEur} € HT</p>
    <p><strong>Payé le :</strong> ${order.paidAt ? order.paidAt.toLocaleString("fr-FR") : "Non renseigné"}</p>
  </div>`;
}