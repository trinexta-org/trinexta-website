import { prisma } from "@/lib/db"
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "L'adresse e-mail est requise." }, { status: 400 });
    }

    // ==========================================
    // ÉTAPE 1 : SAUVEGARDE DANS LA BASE DE DONNÉES (PRISMA)
    // ==========================================
    
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email: email }
    });

    if (existingSubscriber) {
      if (!existingSubscriber.isActive) {
        await prisma.subscriber.update({
          where: { email: email },
          data: { isActive: true }
        });
      } else {
        return NextResponse.json({ message: "Vous êtes déjà inscrit à notre newsletter !" }, { status: 200 });
      }
    } else {
      await prisma.subscriber.create({
        data: { email: email }
      });
    }

    // ==========================================
    // ÉTAPE 2 : ENVOYER L'E-MAIL DE BIENVENUE (AZURE)
    // ==========================================
    const tenantId = process.env.AZURE_TENANT_ID;
    const clientId = process.env.AZURE_CLIENT_ID;
    const clientSecret = process.env.AZURE_CLIENT_SECRET;
    const senderEmail = process.env.AZURE_FROM_EMAIL;

    if (!tenantId || !clientId || !clientSecret || !senderEmail) {
      console.error("Identifiants Azure manquants");
      return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
    }

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

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const emailHtmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0F172A; color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #1E293B;">
        <div style="padding: 40px; text-align: center; border-bottom: 1px solid #1E293B;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.5px;">
            <span style="color: #ffffff;">TRIN</span><span style="color: #3B82F6;">EXTA</span>
          </h1>
        </div>
        <div style="padding: 40px;">
          <h2 style="font-size: 20px; margin-top: 0; color: #ffffff;">Inscription confirmée !</h2>
          <p style="color: #94A3B8; line-height: 1.6; font-size: 15px;">Bonjour,</p>
          <p style="color: #94A3B8; line-height: 1.6; font-size: 15px;">Merci de l'intérêt que vous portez à l'expertise Trinexta. Nous vous confirmons que votre adresse e-mail a bien été ajoutée à notre liste d'envoi exclusive.</p>
          <p style="color: #94A3B8; line-height: 1.6; font-size: 15px;">Vous recevrez prochainement nos meilleures analyses sur la cybersécurité, l'infogérance et les stratégies Cloud pour les entreprises.</p>
        </div>
      </div>
    `;

    const emailData = {
      message: {
        subject: "Bienvenue dans la newsletter Trinexta ",
        body: { contentType: "HTML", content: emailHtmlContent },
        toRecipients: [{ emailAddress: { address: email } }]
      },
      saveToSentItems: "false"
    };

    await fetch(`https://graph.microsoft.com/v1.0/users/${senderEmail}/sendMail`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailData)
    });

    return NextResponse.json({ message: "Inscription réussie !" }, { status: 200 });

  } catch (error) {
    console.error("Erreur Inscription:", error);
    return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}