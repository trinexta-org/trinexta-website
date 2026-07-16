import { AXES, AXIS_ORDER } from "@/data/audit-seo/axes";
import {
  AUDIT_BLIND_SPOTS,
  buildAuditContactUrl,
  DEEP_AUDIT_OFFER_LABEL,
  getScoreBand,
  SCORE_BAND_NARRATIVE,
  type ScoreBand,
} from "@/data/audit-seo";
import { escapeHtml } from "@/lib/mail";
import type { AxisScore, Finding, Severity } from "./types";

// Emails HTML du module audit SEO. Autoportants, styles inline (contrainte
// email). Règle de registre : symptôme + impact, JAMAIS la méthode de
// correction (vendue en rendez-vous). Ton direct et concret (TONE.md).

const COLOR_PRIMARY = "#0a233e";
const COLOR_SECONDARY = "#5c92b8";

const SEVERITY_LABEL: Record<Severity, string> = {
  critique: "Critique",
  majeur: "Majeur",
  mineur: "Mineur",
};

const SEVERITY_COLOR: Record<Severity, string> = {
  critique: "#c0392b",
  majeur: "#d68910",
  mineur: "#7f8c8d",
};

export interface AuditEmailData {
  url: string;
  scoreGlobal: number;
  axes: AxisScore[];
  findings: Finding[];
  aiSummary: string | null;
}

export interface AuditLeadContact {
  prenom: string;
  nom: string;
  email: string;
  telephone: string | null;
  entreprise: string;
}

// Couleur du score dérivée du palier centralisé (source de vérité des seuils).
const BAND_HEX: Record<ScoreBand, string> = {
  haut: "#1e8449",
  moyen: COLOR_SECONDARY,
  bas: "#c0392b",
};

function scoreColor(score: number): string {
  return BAND_HEX[getScoreBand(score)];
}

function scoreHeaderBlock(scoreGlobal: number): string {
  return `<div style="text-align:center;margin:8px 0 24px;">
    <div style="font-size:44px;font-weight:bold;color:${scoreColor(scoreGlobal)};line-height:1;">
      ${scoreGlobal}<span style="font-size:20px;color:#999;">/100</span>
    </div>
    <p style="margin:6px 0 0;font-size:13px;color:#999;text-transform:uppercase;letter-spacing:1px;">Score SEO global</p>
  </div>`;
}

function subScoresBlock(axes: AxisScore[]): string {
  const rows = axes
    .map(
      (axis) => `<tr>
        <td style="padding:8px 12px 8px 0;color:#666;">${escapeHtml(axis.label)}</td>
        <td style="padding:8px 0;text-align:right;font-weight:bold;color:${axis.measured && axis.score !== null ? scoreColor(axis.score) : "#999"};">
          ${axis.measured && axis.score !== null ? `${axis.score}/100` : "Non mesuré"}
        </td>
      </tr>`
    )
    .join("");
  return `<table style="width:100%;font-size:14px;border-collapse:collapse;">${rows}</table>`;
}

function findingItem(finding: Finding): string {
  return `<div style="border:1px solid #e5e5e5;border-radius:8px;padding:14px;margin-bottom:10px;">
    <span style="display:inline-block;font-size:11px;font-weight:bold;color:#ffffff;background:${SEVERITY_COLOR[finding.severity]};border-radius:4px;padding:2px 8px;">${SEVERITY_LABEL[finding.severity]}</span>
    <p style="margin:8px 0 0;font-weight:bold;color:${COLOR_PRIMARY};">${escapeHtml(finding.symptom)}</p>
    <p style="margin:4px 0 0;font-size:14px;color:#666;">${escapeHtml(finding.impact)}</p>
  </div>`;
}

/** Tous les constats groupés par axe (aucune méthode de correction). */
function findingsByAxisBlock(findings: Finding[]): string {
  const blocks: string[] = [];
  for (const axisId of AXIS_ORDER) {
    const axisFindings = findings.filter((f) => f.axis === axisId);
    if (axisFindings.length === 0) continue;
    blocks.push(
      `<h3 style="font-size:15px;color:${COLOR_PRIMARY};margin:20px 0 10px;">${escapeHtml(AXES[axisId].label)}</h3>
       ${axisFindings.map(findingItem).join("")}`
    );
  }
  if (blocks.length === 0) {
    return `<p style="color:#1e8449;">Aucun problème majeur détecté sur cette page. Beau travail.</p>`;
  }
  return blocks.join("");
}

function aiSummaryBlock(aiSummary: string | null): string {
  if (!aiSummary) return "";
  return `<h2 style="font-size:16px;color:${COLOR_PRIMARY};margin-top:24px;">Notre lecture</h2>
    <div style="background:#f4f7fa;border-left:3px solid ${COLOR_SECONDARY};padding:14px 16px;border-radius:0 6px 6px 0;">
      <p style="margin:0;font-size:14px;line-height:1.6;color:#333;white-space:pre-line;">${escapeHtml(aiSummary)}</p>
    </div>`;
}

/** Bloc constant "Ce que cet audit ne mesure pas" (mêmes 4 dims que le teaser). */
function blindSpotsBlock(): string {
  const items = AUDIT_BLIND_SPOTS.map(
    (spot) => `<div style="border:1px solid #e5e5e5;border-radius:8px;padding:14px;margin-bottom:10px;">
      <p style="margin:0;font-weight:bold;color:${COLOR_PRIMARY};">${escapeHtml(spot.title)}</p>
      <p style="margin:4px 0 0;font-size:14px;color:#666;">${escapeHtml(spot.description)}</p>
    </div>`
  ).join("");
  return `<h2 style="font-size:16px;color:${COLOR_PRIMARY};margin-top:24px;">Ce que cet audit ne mesure pas</h2>
    <p style="font-size:14px;color:#666;margin:0 0 12px;">Une seule page, analysée automatiquement. Quatre angles décisifs restent hors de portée d'un audit gratuit.</p>
    ${items}`;
}

/** Section conclusion "Et maintenant ?", pilotée par le palier de score. */
function nextStepBlock(scoreGlobal: number, rdvUrl: string): string {
  const narrative = SCORE_BAND_NARRATIVE[getScoreBand(scoreGlobal)];
  return `<h2 style="font-size:16px;color:${COLOR_PRIMARY};margin-top:24px;">Et maintenant ?</h2>
    <p style="font-size:14px;line-height:1.6;color:#333;">${escapeHtml(narrative.conclusion)}</p>
    <p style="font-size:14px;line-height:1.6;color:#333;">${escapeHtml(DEEP_AUDIT_OFFER_LABEL)}.</p>
    <p style="font-size:14px;line-height:1.6;color:#333;font-weight:bold;">${escapeHtml(narrative.ctaHook)}</p>
    <p style="text-align:center;margin:24px 0;">
      <a href="${escapeHtml(rdvUrl)}" style="background:${COLOR_SECONDARY};color:#ffffff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">
        Prendre rendez-vous
      </a>
    </p>`;
}

export function buildAuditReportHtml(
  data: AuditEmailData,
  prenom: string,
  bookingsUrl?: string
): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://trinexta.fr";
  // CTA : bookings si défini (comportement conservé), sinon /contact pré-rempli
  // avec l'URL auditée et le score.
  const rdvUrl =
    bookingsUrl || buildAuditContactUrl(siteUrl, data.url, data.scoreGlobal);

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#333;">
    <div style="background:${COLOR_PRIMARY};padding:24px;border-radius:8px 8px 0 0;">
      <h1 style="color:#ffffff;margin:0;font-size:22px;">Votre audit SEO Trinexta</h1>
    </div>
    <div style="padding:24px;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 8px 8px;">
      <p>Bonjour ${escapeHtml(prenom)},</p>
      <p>Voici le résultat de l'analyse de la page <a href="${escapeHtml(data.url)}" style="color:${COLOR_SECONDARY};">${escapeHtml(data.url)}</a>.</p>

      ${scoreHeaderBlock(data.scoreGlobal)}

      <h2 style="font-size:16px;color:${COLOR_PRIMARY};margin-top:8px;">Le détail par axe</h2>
      ${subScoresBlock(data.axes)}

      ${aiSummaryBlock(data.aiSummary)}

      <h2 style="font-size:16px;color:${COLOR_PRIMARY};margin-top:24px;">Ce que nous avons repéré</h2>
      ${findingsByAxisBlock(data.findings)}

      ${blindSpotsBlock()}

      ${nextStepBlock(data.scoreGlobal, rdvUrl)}

      <p style="font-size:12px;color:#999;">Vous recevez cet email parce que vous avez lancé un audit SEO sur trinexta.fr. Vos données sont traitées selon notre <a href="${escapeHtml(siteUrl)}/confidentialite" style="color:${COLOR_SECONDARY};">politique de confidentialité</a>.</p>
    </div>
  </div>`;
}

export function buildAuditTeamNotificationHtml(
  data: AuditEmailData,
  lead: AuditLeadContact,
  auditId: string,
  reportSent: boolean
): string {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;color:#333;">
    <h2 style="color:${COLOR_PRIMARY};">Nouveau lead via l'audit SEO</h2>
    ${!reportSent ? `<p style="color:#c0392b;font-weight:bold;">L'envoi du rapport au prospect a échoué, à renvoyer manuellement si besoin.</p>` : ""}
    <p><strong>Nom :</strong> ${escapeHtml(lead.prenom)} ${escapeHtml(lead.nom)}</p>
    <p><strong>Entreprise :</strong> ${escapeHtml(lead.entreprise)}</p>
    <p><strong>Téléphone :</strong> ${lead.telephone ? escapeHtml(lead.telephone) : "Non renseigné"}</p>
    <p><strong>Email :</strong> ${escapeHtml(lead.email)}</p>
    <p><strong>Page analysée :</strong> ${escapeHtml(data.url)}</p>
    <p><strong>Score global :</strong> ${data.scoreGlobal}/100</p>
    <p><strong>Audit :</strong> ${escapeHtml(auditId)}</p>
    <h3 style="color:${COLOR_PRIMARY};">Constats</h3>
    ${findingsByAxisBlock(data.findings)}
  </div>`;
}
