import { prisma } from "@/lib/db"
import { NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Le format de l'adresse e-mail est invalide."),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = newsletterSchema.parse(body);

    // ==========================================
    // ÉTAPE 1 : SAUVEGARDE DANS LA BASE DE DONNÉES (PRISMA)
    // ==========================================
    
    let subscriberToken: string;

    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email: email }
    });

    if (existingSubscriber) {
      if (!existingSubscriber.isActive) {
        const updated = await prisma.subscriber.update({
          where: { email: email },
          data: { isActive: true }
        });
        subscriberToken = updated.token;
      } else {
        return NextResponse.json({ message: "Vous êtes déjà inscrit à notre newsletter !" }, { status: 200 });
      }
    } else {
      const created = await prisma.subscriber.create({
        data: { email: email }
      });
      subscriberToken = created.token;
    }

    // ==========================================
    // ÉTAPE 2 : ENVOYER L'E-MAIL DE BIENVENUE (AZURE)
    // ==========================================
    const tenantId = process.env.AZURE_TENANT_ID;
    const clientId = process.env.AZURE_CLIENT_ID;
    const clientSecret = process.env.AZURE_CLIENT_SECRET;
    const senderEmail = process.env.AZURE_FROM_EMAIL;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://trinexta.fr";

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

    const unsubscribeUrl = `${siteUrl}/api/newsletter/unsubscribe?token=${subscriberToken}`;

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
        <div style="padding: 20px 40px; border-top: 1px solid #1E293B; text-align: center;">
          <p style="font-size: 11px; color: #475569; margin: 0;">
            Pour ne plus recevoir nos emails : <a href="${unsubscribeUrl}" style="color: #475569;">Se désabonner</a>
          </p>
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

    const sendMailResponse = await fetch(`https://graph.microsoft.com/v1.0/users/${senderEmail}/sendMail`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailData)
    });

    if (!sendMailResponse.ok) {
      const errorText = await sendMailResponse.text();
      console.error("Erreur Microsoft Graph :", errorText);
      throw new Error(`Échec de l'envoi de l'e-mail de bienvenue (Statut: ${sendMailResponse.status})`);
    }

    return NextResponse.json({ message: "Inscription réussie !" }, { status: 200 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }

    console.error("Erreur Inscription:", error);
    return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 });
  }
}