import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "L'adresse e-mail est requise." }, { status: 400 });
    }

    const tenantId = process.env.AZURE_TENANT_ID;
    const clientId = process.env.AZURE_CLIENT_ID;
    const clientSecret = process.env.AZURE_CLIENT_SECRET;
    const senderEmail = process.env.AZURE_FROM_EMAIL;

    if (!tenantId || !clientId || !clientSecret || !senderEmail) {
      console.error("Identifiants Azure manquants dans le fichier .env");
      return NextResponse.json({ error: "Erreur de configuration serveur." }, { status: 500 });
    }

    // ==========================================
    // ÉTAPE 1 : OBTENIR LE JETON D'ACCÈS (TOKEN)
    // ==========================================
    const tokenParams = new URLSearchParams();
    tokenParams.append("client_id", clientId);
    tokenParams.append("scope", "https://graph.microsoft.com/.default");
    tokenParams.append("client_secret", clientSecret);
    tokenParams.append("grant_type", "client_credentials");

    const tokenResponse = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenParams.toString(),
    });

    if (!tokenResponse.ok) {
      throw new Error("Erreur lors de l'authentification avec Azure");
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // ==========================================
    // ÉTAPE 2 : ENVOYER L'E-MAIL AU VISITEUR
    // ==========================================
    
    const emailHtmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0F172A; color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #1E293B;">
        
        <div style="padding: 40px; text-align: center; border-bottom: 1px solid #1E293B;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.5px;">
            <span style="color: #ffffff;">TRIN</span><span style="color: #3B82F6;">EXTA</span>
          </h1>
        </div>

        <div style="padding: 40px;">
          <h2 style="font-size: 20px; margin-top: 0; color: #ffffff;">Inscription confirmée !</h2>
          
          <p style="color: #94A3B8; line-height: 1.6; font-size: 15px;">
            Bonjour,
          </p>
          <p style="color: #94A3B8; line-height: 1.6; font-size: 15px;">
            Merci de l'intérêt que vous portez à l'expertise Trinexta. Nous vous confirmons que votre adresse e-mail a bien été ajoutée à notre liste d'envoi exclusive.
          </p>
          <p style="color: #94A3B8; line-height: 1.6; font-size: 15px;">
            Vous recevrez prochainement nos meilleures analyses sur la cybersécurité, l'infogérance et les stratégies Cloud pour les entreprises.
          </p>
          
          <div style="margin-top: 40px; padding: 24px; background-color: #1E293B; border-radius: 12px; text-align: center;">
            <p style="margin: 0; color: #ffffff; font-size: 14px; font-weight: bold;">
              Votre sécurité, notre priorité.
            </p>
          </div>
        </div>

        <div style="padding: 24px 40px; background-color: #0B1120; text-align: center;">
          <p style="margin: 0; color: #64748B; font-size: 12px;">
            © 2026 Trinexta. Tous droits réservés.<br/>
            Vous recevez cet e-mail suite à votre inscription sur notre site.
          </p>
        </div>
      </div>
    `;

    const emailData = {
      message: {
        subject: "Bienvenue dans la newsletter Trinexta 🎉",
        body: {
          contentType: "HTML",
          content: emailHtmlContent
        },
        toRecipients: [
          {
            emailAddress: {
              address: email 
            }
          }
        ]
      },
      saveToSentItems: "false"
    };

    const mailResponse = await fetch(`https://graph.microsoft.com/v1.0/users/${senderEmail}/sendMail`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailData)
    });

    if (!mailResponse.ok) {
      const errorDetail = await mailResponse.json();
      console.error("Erreur Microsoft Graph:", errorDetail);
      throw new Error("Erreur lors de l'envoi de l'e-mail au visiteur");
    }

    return NextResponse.json({ message: "Inscription réussie et e-mail envoyé !" }, { status: 200 });

  } catch (error) {
    console.error("Erreur Newsletter Azure:", error);
    return NextResponse.json({ error: "Une erreur est survenue lors de l'inscription." }, { status: 500 });
  }
}