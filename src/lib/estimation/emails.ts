import { ESTIMATION_QUESTIONS_BY_ID } from "@/data/estimation";
import type { EstimationAnswers } from "@/data/estimation";
import { escapeHtml } from "@/lib/mail";

// Construction des emails HTML du tunnel d'estimation.
// Ton : direct, concret, sans jargon (TONE.md). Styles inline (contrainte email).

export interface BreakdownEntry {
  serviceId: string;
  label: string;
  kind: "recurring" | "one-shot" | "sur-devis";
  min: number;
  max: number;
  lines: string[];
  /** Mention informative de la grille (ex. licences en sus), hors calcul */
  note?: string;
}

export interface EstimateEmailData {
  answers: EstimationAnswers;
  breakdown: BreakdownEntry[];
  monthlyMin: number | null;
  monthlyMax: number | null;
  oneShotMin: number | null;
  oneShotMax: number | null;
}

const COLOR_PRIMARY = "#0a233e";
const COLOR_SECONDARY = "#5c92b8";

function euros(value: number) {
  return `${value.toLocaleString("fr-FR")} €`;
}

/** "X €" si calcul exact, "X € à Y €" sinon. */
function eurosRange(min: number, max: number) {
  return min === max ? euros(min) : `${euros(min)} à ${euros(max)}`;
}

/** Récapitule les réponses en libellés lisibles (question -> réponse). */
function answersSummaryRows(answers: EstimationAnswers): string {
  const rows: string[] = [];
  for (const [questionId, value] of Object.entries(answers)) {
    const question = ESTIMATION_QUESTIONS_BY_ID[questionId];
    if (!question) continue;
    const selectedIds = Array.isArray(value) ? value : [value];
    const labels = selectedIds
      .map((id) => question.options.find((o) => o.id === id)?.label)
      .filter((label): label is string => Boolean(label));
    if (labels.length === 0) continue;
    rows.push(
      `<tr>
        <td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;">${escapeHtml(question.title)}</td>
        <td style="padding:6px 0;color:${COLOR_PRIMARY};font-weight:bold;">${labels.map(escapeHtml).join(", ")}</td>
      </tr>`
    );
  }
  return rows.join("");
}

function serviceBlocks(breakdown: BreakdownEntry[]): string {
  return breakdown
    .map(
      (service) => `
      <div style="border:1px solid #e5e5e5;border-radius:8px;padding:16px;margin-bottom:12px;">
        <p style="margin:0;font-weight:bold;color:${COLOR_PRIMARY};">
          ${escapeHtml(service.label)}
          <span style="float:right;color:${COLOR_SECONDARY};">
            ${
              service.kind === "sur-devis"
                ? "Sur devis"
                : `${eurosRange(service.min, service.max)}${service.kind === "recurring" ? " /mois" : ""}`
            }
          </span>
        </p>
        <ul style="margin:8px 0 0;padding-left:18px;color:#666;font-size:14px;">
          ${service.lines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
        </ul>
        ${service.note ? `<p style="margin:8px 0 0;color:#999;font-size:13px;font-style:italic;">${escapeHtml(service.note)}</p>` : ""}
      </div>`
    )
    .join("");
}

function totalsBlock(data: EstimateEmailData): string {
  const parts: string[] = [];
  if (data.monthlyMax) {
    parts.push(
      `<p style="margin:4px 0;font-size:20px;font-weight:bold;color:${COLOR_PRIMARY};">
        ${eurosRange(data.monthlyMin ?? 0, data.monthlyMax)} <span style="font-size:14px;font-weight:normal;color:#666;">par mois, hors taxes</span>
      </p>`
    );
  }
  if (data.oneShotMax) {
    parts.push(
      `<p style="margin:4px 0;font-size:20px;font-weight:bold;color:${COLOR_PRIMARY};">
        ${eurosRange(data.oneShotMin ?? 0, data.oneShotMax)} <span style="font-size:14px;font-weight:normal;color:#666;">en une fois, hors taxes</span>
      </p>`
    );
  }
  return parts.join("");
}

export function buildEstimateEmailHtml(data: EstimateEmailData, bookingsUrl?: string): string {
  const rdvUrl = bookingsUrl || `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://trinexta.fr"}/contact`;

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#333;">
    <div style="background:${COLOR_PRIMARY};padding:24px;border-radius:8px 8px 0 0;">
      <h1 style="color:#ffffff;margin:0;font-size:22px;">Votre estimation Trinexta</h1>
    </div>
    <div style="padding:24px;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 8px 8px;">
      <p>Bonjour,</p>
      <p>Voici le détail de l'estimation réalisée sur trinexta.fr. Elle est indicative et non contractuelle : le devis final se construit avec vous, après un échange sur votre situation réelle.</p>

      <h2 style="font-size:16px;color:${COLOR_PRIMARY};margin-top:24px;">Votre fourchette</h2>
      ${totalsBlock(data)}

      <h2 style="font-size:16px;color:${COLOR_PRIMARY};margin-top:24px;">Le détail par service</h2>
      ${serviceBlocks(data.breakdown)}

      <h2 style="font-size:16px;color:${COLOR_PRIMARY};margin-top:24px;">Ce que vous nous avez dit</h2>
      <table style="font-size:14px;border-collapse:collapse;">${answersSummaryRows(data.answers)}</table>

      <h2 style="font-size:16px;color:${COLOR_PRIMARY};margin-top:24px;">Et maintenant ?</h2>
      <p>Un échange de 30 minutes suffit pour transformer cette fourchette en devis précis. On regarde votre parc, vos priorités, et on vous dit concrètement ce qu'on ferait.</p>
      <p style="text-align:center;margin:24px 0;">
        <a href="${escapeHtml(rdvUrl)}" style="background:${COLOR_SECONDARY};color:#ffffff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">
          Prendre rendez-vous
        </a>
      </p>
      <p style="font-size:12px;color:#999;">Vous recevez cet email parce que vous avez demandé le détail de votre estimation sur trinexta.fr. Vos données sont traitées selon notre <a href="${escapeHtml(process.env.NEXT_PUBLIC_SITE_URL ?? "https://trinexta.fr")}/confidentialite" style="color:${COLOR_SECONDARY};">politique de confidentialité</a>.</p>
    </div>
  </div>`;
}

export function buildTeamNotificationHtml(
  data: EstimateEmailData,
  leadEmail: string,
  estimateId: string
): string {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;color:#333;">
    <h2 style="color:${COLOR_PRIMARY};">Nouveau lead via le tunnel d'estimation</h2>
    <p><strong>Email :</strong> ${escapeHtml(leadEmail)}</p>
    <p><strong>Estimation :</strong> ${escapeHtml(estimateId)}</p>
    ${totalsBlock(data)}
    <h3 style="color:${COLOR_PRIMARY};">Services détectés</h3>
    ${serviceBlocks(data.breakdown)}
    <h3 style="color:${COLOR_PRIMARY};">Réponses du parcours</h3>
    <table style="font-size:14px;border-collapse:collapse;">${answersSummaryRows(data.answers)}</table>
  </div>`;
}
