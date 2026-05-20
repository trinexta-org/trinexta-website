import { ContactFormData } from "@/lib/validations/contact";

export async function sendNotificationEmail(data: ContactFormData) {
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;
  const fromEmail = process.env.AZURE_FROM_EMAIL;

  if (!tenantId || !clientId || !clientSecret || !fromEmail) {
    throw new Error("Configuration de messagerie incomplète");
  }

  try {
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

    const mailResponse = await fetch(
      `https://graph.microsoft.com/v1.0/users/${fromEmail}/sendMail`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            subject: `Nouvelle demande de contact : ${data.type.toUpperCase()}`,
            body: {
              contentType: "HTML",
              content: `
                <h2>Nouveau message depuis le site Trinexta</h2>
                <p><strong>Type :</strong> ${data.type}</p>
                <p><strong>Nom :</strong> ${data.prenom} ${data.nom}</p>
                <p><strong>Email :</strong> ${data.email}</p>
                <p><strong>Téléphone :</strong> ${data.telephone || "Non renseigné"}</p>
                <p><strong>Entreprise :</strong> ${data.entreprise || "Non renseignée"}</p>
                <hr />
                <h3>Message :</h3>
                <p>${data.message.replace(/\n/g, '<br/>')}</p>
              `,
            },
            toRecipients: [
              {
                emailAddress: {
                  address: fromEmail,
                },
              },
            ],
          },
          saveToSentItems: "false",
        }),
      }
    );

    if (!mailResponse.ok) {
      const mailError = await mailResponse.json();
      throw new Error(JSON.stringify(mailError));
    }

    return true;
  } catch (error) {
    throw error;
  }
}