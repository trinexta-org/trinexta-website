import { LIBELLES_STATUT, DIAGNOSTIC_TEXTES } from "@/data/diagnostic";
import { TRINEXTA_CONTACT } from "@/data/contact-trinexta";
import { escapeHtml } from "@/lib/mail";
import type { Compteurs, ResultatVerification, StatutDiagnostic } from "./types";

// E-mails du diagnostic : rapport au prospect et notification à l'équipe.
// Charte : navy #0A233E, bleu #5C92B8, blanc. Statuts distingués par la forme
// (plein, contour, pointillé, clair), jamais par une couleur d'alerte.

const PASTILLE: Record<StatutDiagnostic, string> = {
  "a-corriger": "background:#0A233E;color:#FFFFFF;border:1px solid #0A233E",
  "a-surveiller": "background:#FFFFFF;color:#0A233E;border:2px solid #0A233E",
  indetermine: "background:#FFFFFF;color:#0A233E;border:1px dashed #0A233E",
  conforme: "background:#EEF3F9;color:#36678C;border:1px solid #EEF3F9",
};

function pastille(statut: StatutDiagnostic): string {
  return `<span style="display:inline-block;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:bold;${PASTILLE[statut]}">${escapeHtml(
    LIBELLES_STATUT[statut]
  )}</span>`;
}

function carte(r: ResultatVerification): string {
  return `
  <div style="border:1px solid #DCE7F2;border-radius:12px;padding:16px 18px;margin:0 0 12px">
    <table role="presentation" style="width:100%;border-collapse:collapse"><tr>
      <td style="font-size:16px;font-weight:bold;color:#0A233E;padding:0 8px 0 0">${escapeHtml(r.titre)}</td>
      <td style="text-align:right;white-space:nowrap">${pastille(r.statut)}</td>
    </tr></table>
    <p style="margin:10px 0;font-size:14px;line-height:1.6">${escapeHtml(r.constat)}</p>
    <p style="margin:0 0 6px;font-size:14px;line-height:1.6"><strong style="color:#36678C">${escapeHtml(
      DIAGNOSTIC_TEXTES.ceQueCaVeutDire
    )} :</strong> ${escapeHtml(r.risque)}</p>
    <p style="margin:0;font-size:14px;line-height:1.6"><strong style="color:#36678C">${escapeHtml(
      DIAGNOSTIC_TEXTES.ceQuIlFautFaire
    )} :</strong> ${escapeHtml(r.action)}</p>
  </div>`;
}

function ligneCompteurs(c: Compteurs): string {
  return (["a-corriger", "a-surveiller", "indetermine", "conforme"] as const)
    .filter((s) => c[s] > 0)
    .map((s) => `${c[s]} ${LIBELLES_STATUT[s].toLowerCase()}`)
    .join(" · ");
}

const dateFr = (d: Date) =>
  d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" });

export function rapportProspectHtml(params: {
  domaine: string;
  date: Date;
  resultats: ResultatVerification[];
  compteurs: Compteurs;
  /** Lien vers la page de confirmation du rappel (bouton POST). */
  urlRappel: string;
}): string {
  const { domaine, date, resultats, compteurs, urlRappel } = params;
  return `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;border:1px solid #5C92B8;color:#0A233E">
  <div style="background:#0A233E;padding:24px">
    <p style="margin:0 0 8px;color:#5C92B8;font-size:12px;letter-spacing:2px;font-weight:bold">TRINEXTA · DIAGNOSTIC SÉCURITÉ</p>
    <p style="margin:0;color:#FFFFFF;font-size:22px;font-weight:bold">Résultat pour ${escapeHtml(domaine)}</p>
    <p style="margin:8px 0 0;color:#FFFFFF;font-size:14px">${escapeHtml(dateFr(date))} · ${escapeHtml(ligneCompteurs(compteurs))}</p>
  </div>
  <div style="padding:24px;font-size:15px;line-height:1.6">
    <p style="margin:0 0 16px">Bonjour,</p>
    <p style="margin:0 0 20px">Voici le détail de l'analyse non intrusive de ${escapeHtml(
      domaine
    )} : ce que le site montre publiquement, comme le verrait n'importe quel visiteur. Les points sont classés du plus urgent au moins urgent.</p>
    ${resultats.map(carte).join("")}
    <div style="background:#EEF3F9;border-radius:12px;padding:18px;margin:20px 0 0">
      <p style="margin:0 0 8px;font-weight:bold">Un technicien vous explique le résultat</p>
      <p style="margin:0 0 14px">Nous vous disons ce qui est urgent, ce qui peut attendre, et ce que vous pouvez corriger vous-même. Nous ne vous recontactons que si vous le demandez.</p>
      <a href="${escapeHtml(
        urlRappel
      )}" style="display:inline-block;background:#0A233E;color:#FFFFFF;text-decoration:none;font-weight:bold;padding:12px 20px;border-radius:10px">${escapeHtml(
        DIAGNOSTIC_TEXTES.boutonRappelEmail
      )}</a>
      <p style="margin:14px 0 0;font-size:13px">Ou appelez le <strong>${TRINEXTA_CONTACT.telephone}</strong>, ${
        TRINEXTA_CONTACT.horaires
      }.</p>
    </div>
    <p style="margin:20px 0 0;font-size:12px;color:#36678C">Analyse non intrusive : aucune intrusion ni test d'attaque. Ce rapport décrit l'état observé le ${escapeHtml(
      dateFr(date)
    )} ; il ne remplace pas un audit complet.</p>
    <p style="margin-top:24px">L'équipe TRINEXTA<br /><span style="color:#5C92B8">L'humain avant les tickets.</span></p>
    <p style="margin-top:24px;font-size:12px;color:#36678C">Vous recevez cet e-mail parce que vous l'avez demandé sur trinexta.fr. Sans demande de rappel de votre part, votre adresse est effacée 30 jours après cet envoi. Cet e-mail est envoyé depuis une adresse qui ne reçoit pas de réponse. Pour nous écrire : ${
      TRINEXTA_CONTACT.email
    }.</p>
  </div>
</div>`;
}

/** Notification à l'équipe, envoyée au clic du prospect sur « Être rappelé ». */
export function notificationEquipeHtml(params: {
  domaine: string;
  email: string;
  diagnosticId: string;
  compteurs: Compteurs;
  resultats: ResultatVerification[];
}): string {
  const { domaine, email, diagnosticId, compteurs, resultats } = params;
  const lignes = resultats
    .map(
      (r) =>
        `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;white-space:nowrap">${escapeHtml(
          LIBELLES_STATUT[r.statut]
        )}</td><td style="padding:4px 0">${escapeHtml(r.titre)} : ${escapeHtml(r.constat)}</td></tr>`
    )
    .join("");
  return `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;color:#0A233E">
  <h2 style="margin:0 0 12px">Diagnostic sécurité : demande de rappel</h2>
  <p style="margin:0 0 6px"><strong>Site analysé :</strong> ${escapeHtml(domaine)}</p>
  <p style="margin:0 0 6px"><strong>E-mail :</strong> ${escapeHtml(email)} (a cliqué « Être rappelé » dans son rapport)</p>
  <p style="margin:0 0 16px"><strong>Résultat :</strong> ${escapeHtml(ligneCompteurs(compteurs))}</p>
  <table style="border-collapse:collapse;font-size:14px">${lignes}</table>
  <p style="margin-top:20px;font-size:12px;color:#5C92B8">Référence : ${escapeHtml(
    diagnosticId
  )}. Seule l'adresse e-mail est connue : répondre à cet e-mail écrit directement au prospect.</p>
</div>`;
}
