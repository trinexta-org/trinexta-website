import { ContactFormData } from "@/lib/validations/contact";

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
export async function sendMail({ to, subject, html }: { to: string; subject: string; html: string }) {
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

export async function sendNotificationEmail(data: ContactFormData) {
  const fromEmail = process.env.AZURE_FROM_EMAIL;
  const supportEmail = process.env.SUPPORT_EMAIL;

  if (!fromEmail || !supportEmail) {
    throw new Error("Configuration de messagerie incomplète");
  }

  return sendMail({
    to: data.type === "support" ? supportEmail : fromEmail,
    subject: `Nouvelle demande de contact : ${escapeHtml(data.type.toUpperCase())}`,
    html: `
      <h2>Nouveau message depuis le site Trinexta</h2>
      <p><strong>Type :</strong> ${escapeHtml(data.type)}</p>
      <p><strong>Nom :</strong> ${escapeHtml(data.prenom)} ${escapeHtml(data.nom)}</p>
      <p><strong>Email :</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Téléphone :</strong> ${formatField(data.telephone)}</p>
      <p><strong>Entreprise :</strong> ${formatField(data.entreprise)}</p>
      <p><strong>SIRET :</strong> ${formatField(data.siret)}</p>
      <p><strong>Secteur :</strong> ${formatField(data.secteur)}</p>
      <p><strong>Taille :</strong> ${formatField(data.taille)}</p>
      <p><strong>Urgence :</strong> ${formatField(data.urgence)}</p>
      <hr />
      <h3>Message :</h3>
      <p>${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
    `,
  });
}
