import type { ContactFormData } from "@/lib/validations/contact";
import { LIBELLES_OFFRES } from "@/data/offres";
import {
  TRINEXTA_CONTACT,
  libelleBesoin,
  libelleFormat,
  libelleMoment,
  libellePostes,
  libelleProfil,
  libelleSuite,
} from "@/data/contact-trinexta";
import { formaterDateRdv } from "@/lib/contact/rdv";

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatField(value?: string) {
  return value ? escapeHtml(value) : "Non renseigné";
}

async function getGraphAccessToken() {
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error("Configuration de messagerie incomplète");
  }

  const tokenResponse = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        scope: "https://graph.microsoft.com/.default",
        grant_type: "client_credentials",
      }),
    }
  );

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok) {
    throw new Error(JSON.stringify(tokenData));
  }

  return tokenData.access_token as string;
}

/** Envoi d'un email HTML via Microsoft Graph depuis la boîte AZURE_FROM_EMAIL. */
export async function sendMail({
  to,
  subject,
  html,
  replyTo,
  cc,
}: {
  to: string;
  subject: string;
  html: string;
  /** Adresse de réponse : le prospect pour les notifications, contact@ pour l'accusé de réception. */
  replyTo?: string;
  cc?: string;
}) {
  const fromEmail = process.env.AZURE_FROM_EMAIL;
  if (!fromEmail) {
    throw new Error("Configuration de messagerie incomplète");
  }

  const accessToken = await getGraphAccessToken();

  const mailResponse = await fetch(
    `https://graph.microsoft.com/v1.0/users/${fromEmail}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject,
          body: { contentType: "HTML", content: html },
          toRecipients: [{ emailAddress: { address: to } }],
          ...(cc ? { ccRecipients: [{ emailAddress: { address: cc } }] } : {}),
          ...(replyTo ? { replyTo: [{ emailAddress: { address: replyTo } }] } : {}),
        },
        saveToSentItems: false,
      }),
    }
  );

  if (!mailResponse.ok) {
    const mailError = await mailResponse.json();
    throw new Error(JSON.stringify(mailError));
  }

  return true;
}

/** « le matin » / « l'après-midi ». */
function moment(value?: string): string {
  return value === "apres-midi" ? "l'après-midi" : "le matin";
}

/** Créneau lisible : « mardi 3 novembre 2026, matin ». */
function creneau(data: ContactFormData): string {
  if (!data.rdvDate) return "";
  return `${formaterDateRdv(data.rdvDate)}, ${libelleMoment(data.moment).toLowerCase()}`;
}

/** Notification interne : vers contact@ (CONTACT_TO_EMAIL), réponse directe au prospect. */
export async function sendNotificationEmail(data: ContactFormData) {
  const to = process.env.CONTACT_TO_EMAIL || TRINEXTA_CONTACT.email;
  // Un problème en cours ou une suspicion de piratage part aussi au support, s'il est configuré.
  const cc =
    (data.besoin === "support" || data.besoin === "cyber") && process.env.SUPPORT_EMAIL
      ? process.env.SUPPORT_EMAIL
      : undefined;
  const qui = data.entreprise || `${data.prenom} ${data.nom}`;
  const suite =
    data.suite === "rdv"
      ? `RDV ${creneau(data)}`
      : data.suite === "rappel"
        ? `Rappel${data.moment ? ` ${libelleMoment(data.moment).toLowerCase()}` : ""}`
        : "Message";

  const ligne = (label: string, value?: string) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#5C92B8;font-weight:bold;white-space:nowrap">${label}</td><td style="padding:6px 0">${formatField(value)}</td></tr>`;

  return sendMail({
    to,
    cc,
    replyTo: data.email,
    subject: `${libelleBesoin(data.besoin)} · ${qui} · ${suite}`,
    html: `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;color:#0A233E">
  <h2 style="margin:0 0 12px">Nouvelle demande depuis trinexta.fr</h2>
  <p style="margin:0 0 16px;font-size:16px"><strong>${escapeHtml(libelleSuite(data.suite))}</strong>${
    data.suite === "rdv"
      ? ` : ${escapeHtml(creneau(data))}, ${escapeHtml(libelleFormat(data.rdvFormat).toLowerCase())} (date à confirmer au prospect)`
      : data.suite === "rappel" && data.moment
        ? ` : de préférence ${escapeHtml(moment(data.moment))}`
        : ""
  }</p>
  <table style="border-collapse:collapse;font-size:14px">
    ${ligne("Besoin", libelleBesoin(data.besoin))}
    ${ligne("Offre", data.offre ? LIBELLES_OFFRES[data.offre] : undefined)}
    ${ligne("Profil", libelleProfil(data.profil))}
    ${ligne("Nom", `${data.prenom} ${data.nom}`)}
    ${ligne("Entreprise", data.entreprise)}
    ${ligne("SIRET", data.siret)}
    ${ligne("Ville", data.ville)}
    ${ligne("Parc", libellePostes(data.postes))}
    ${ligne("Téléphone", data.telephone)}
    ${ligne("E-mail", data.email)}
  </table>
  <h3 style="margin:20px 0 8px">Message</h3>
  <p style="margin:0">${data.message ? escapeHtml(data.message).replace(/\n/g, "<br />") : "Aucun message."}</p>
  <p style="margin-top:20px;font-size:12px;color:#5C92B8">Répondre à cet e-mail écrit directement au prospect.</p>
</div>`,
  });
}

/** Accusé de réception au prospect, depuis l'adresse d'envoi automatique (réponses vers contact@). */
export async function sendContactAccuseReception(data: ContactFormData) {
  const prenom = escapeHtml(data.prenom);
  const lieu =
    data.rdvFormat === "visio"
      ? "en visio"
      : data.rdvFormat === "sur-site"
        ? "dans vos locaux"
        : `au Magellan, ${TRINEXTA_CONTACT.rue}, ${TRINEXTA_CONTACT.ville}`;

  const bloc =
    data.suite === "rdv"
      ? `<p>Voici le rendez-vous que vous avez demandé, sous réserve de confirmation :</p>
    <p style="border-left:3px solid #0A233E;padding:8px 16px;margin:16px 0">
      <strong>${escapeHtml(creneau(data))}</strong><br />${escapeHtml(lieu)}
    </p>
    <p>Nous vous confirmons l'heure par e-mail ou par téléphone, ou nous vous proposons un autre créneau.</p>`
      : data.suite === "rappel"
        ? `<p>Nous vous rappelons au <strong>${escapeHtml(data.telephone)}</strong>${
            data.moment ? `, de préférence ${escapeHtml(moment(data.moment))}` : ""
          }, ${TRINEXTA_CONTACT.horaires}.</p>`
        : `<p>Nous lisons votre message et revenons vers vous par e-mail ou par téléphone.</p>`;

  return sendMail({
    to: data.email,
    replyTo: TRINEXTA_CONTACT.email,
    subject:
      data.suite === "rdv"
        ? "Votre demande de rendez-vous avec TRINEXTA"
        : data.suite === "rappel"
          ? "Votre demande de rappel à TRINEXTA"
          : "Votre message à TRINEXTA",
    html: `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;border:1px solid #5C92B8;color:#0A233E">
  <div style="background:#0A233E;padding:24px">
    <p style="margin:0 0 8px;color:#5C92B8;font-size:12px;letter-spacing:2px;font-weight:bold">TRINEXTA</p>
    <p style="margin:0;color:#FFFFFF;font-size:22px;font-weight:bold">Votre demande est bien arrivée</p>
  </div>
  <div style="padding:24px;font-size:15px;line-height:1.6">
    <p>Bonjour ${prenom},</p>
    <p>Merci pour votre demande.</p>
    ${bloc}
    <p>Un problème urgent d'ici là : appelez le <strong>${TRINEXTA_CONTACT.telephone}</strong>, ${TRINEXTA_CONTACT.horaires}. Pour nous écrire : <a href="mailto:${TRINEXTA_CONTACT.email}" style="color:#0A233E;font-weight:bold">${TRINEXTA_CONTACT.email}</a>.</p>
    <p style="margin-top:24px">L'équipe TRINEXTA<br /><span style="color:#5C92B8">L'humain avant les tickets.</span></p>
    <p style="margin-top:24px;font-size:12px;color:#5C92B8">Cet e-mail est envoyé automatiquement depuis une adresse qui ne reçoit pas de réponse. Pour nous écrire : ${TRINEXTA_CONTACT.email}.</p>
  </div>
</div>`,
  });
}
