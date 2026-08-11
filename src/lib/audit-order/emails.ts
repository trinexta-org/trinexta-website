import { escapeHtml } from "@/lib/mail";

const COLOR_PRIMARY = "#0a233e";
const COLOR_SECONDARY = "#5c92b8";

function safeUrlHtml(url: string): string {
  const isSafe = /^https?:\/\//i.test(url);
  const safeText = escapeHtml(url);
  if (!isSafe) return safeText;
  return `<a href="${safeText}" style="color:${COLOR_SECONDARY};">${safeText}</a>`;
}

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
    <h2 style="color:${COLOR_PRIMARY};">Paiement confirmé - Audit SEO Expert</h2>
    <p><strong>Commande :</strong> ${escapeHtml(order.id)}</p>
    <p><strong>Client :</strong> ${escapeHtml(order.prenom)} ${escapeHtml(order.nom)}</p>
    <p><strong>Entreprise :</strong> ${escapeHtml(order.entreprise)}</p>
    <p><strong>Email :</strong> ${escapeHtml(order.email)}</p>
    <p><strong>N° TVA :</strong> ${order.tva ? escapeHtml(order.tva) : "Non renseigné"}</p>
    <p><strong>Site à auditer :</strong> ${safeUrlHtml(order.url)}</p>
    <p><strong>Montant :</strong> ${order.amountEur} € TTC</p>
    <p><strong>Payé le :</strong> ${order.paidAt ? order.paidAt.toLocaleString("fr-FR") : "Non renseigné"}</p>
  </div>`;
}

export interface AuditOrderClientConfirmationData {
  prenom: string;
  url: string;
  amountEur: number;
}

const CLIENT_TIMELINE_STEPS = ["Payé", "Analyse par l'expert", "Livrable sous 72h ouvrées", "Restitution visio"];

function clientTimelineHtml(): string {
  return `
    <table style="width:100%;border-collapse:collapse;margin:16px 0;">
      <tr>
        ${CLIENT_TIMELINE_STEPS.map(
    (step, index) => `
        <td style="text-align:center;padding:8px 4px;font-size:12px;color:${index === 0 ? COLOR_PRIMARY : "#999"};font-weight:${index === 0 ? "bold" : "normal"};">
          ${index + 1}. ${escapeHtml(step)}
        </td>`
  ).join("")}
      </tr>
    </table>`;
}

export function buildAuditOrderClientConfirmationHtml(order: AuditOrderClientConfirmationData): string {
  const bookingsUrl =
    process.env.NEXT_PUBLIC_BOOKINGS_URL || `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://trinexta.fr"}/contact`;
  const contactUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://trinexta.fr"}/contact`;

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#333;">
    <div style="background:${COLOR_PRIMARY};padding:24px;border-radius:8px 8px 0 0;">
      <h1 style="color:#ffffff;margin:0;font-size:22px;">Votre commande Audit SEO Expert est confirmée</h1>
    </div>
    <div style="padding:24px;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 8px 8px;">
      <p>Bonjour ${escapeHtml(order.prenom)},</p>
      <p>Merci, votre paiement de ${order.amountEur} € TTC pour l'audit de ${safeUrlHtml(order.url)} a bien été reçu.</p>

      <h2 style="font-size:16px;color:${COLOR_PRIMARY};margin-top:24px;">Les prochaines étapes</h2>
      ${clientTimelineHtml()}
      <p style="font-size:14px;color:#666;">Le livrable et la restitution en visio sont deux étapes distinctes : vous recevez d'abord le rapport, puis vous en discutez avec l'expert lors de la restitution.</p>

      <h2 style="font-size:16px;color:${COLOR_PRIMARY};margin-top:24px;">Réservez votre créneau de restitution</h2>
      <p style="text-align:center;margin:24px 0;">
        <a href="${escapeHtml(bookingsUrl)}" style="background:${COLOR_SECONDARY};color:#ffffff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">
          Prendre rendez-vous
        </a>
      </p>

      <p style="font-size:14px;color:#666;">
        Une question avant la restitution ? <a href="${escapeHtml(contactUrl)}" style="color:${COLOR_SECONDARY};">Contactez-nous</a>.
      </p>
    </div>
  </div>`;
}