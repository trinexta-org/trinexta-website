import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { z } from "zod";

const sanityPayloadSchema = z.object({
  title: z.string(),
  slug: z.object({ current: z.string() }),
  imageUrl: z.string().optional(),
  extrait: z.string().optional(),
}).loose();

export async function POST(request: Request) {
  try {
    const secret = process.env.SANITY_WEBHOOK_SECRET;
    
    if (!secret) {
      console.error("Secret Sanity manquant dans les variables d'environnement.");
      return NextResponse.json({ error: "Configuration serveur invalide." }, { status: 500 });
    }

    const signature = request.headers.get(SIGNATURE_HEADER_NAME);

    if (!signature) {
      console.error("Signature manquante dans la requête.");
      return NextResponse.json({ error: "Accès refusé. Signature manquante." }, { status: 401 });
    }

    const bodyText = await request.text();

    const isValid = await isValidSignature(bodyText, signature, secret);

    if (!isValid) {
      console.error("Tentative d'accès non autorisée au Webhook (Signature invalide).");
      return NextResponse.json({ error: "Accès refusé. Signature invalide." }, { status: 401 });
    }

   let article;
    try {
      article = sanityPayloadSchema.parse(JSON.parse(bodyText));
    } catch (e) {
      return NextResponse.json({ error: "Format de données invalide" }, { status: 400 });
    }

    const escapeHtml = (unsafe: string) => {
      return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    };

    const safeTitle = escapeHtml(article.title);
    const safeExtrait = article.extrait ? escapeHtml(article.extrait) : "Découvrez notre toute dernière analyse et nos conseils experts en IT.";

    const subscribers = await prisma.subscriber.findMany({
      where: { isActive: true },
      select: { email: true, token: true }
    });

    if (subscribers.length === 0) {
      return NextResponse.json({ message: "Aucun abonné actif pour le moment." }, { status: 200 });
    }

    const tenantId = process.env.AZURE_TENANT_ID;
    const clientId = process.env.AZURE_CLIENT_ID;
    const clientSecret = process.env.AZURE_CLIENT_SECRET;
    const senderEmail = process.env.AZURE_FROM_EMAIL;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://trinexta.fr";

    if (!tenantId || !clientId || !clientSecret || !senderEmail) {
      throw new Error("Identifiants Azure manquants");
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

    const articleUrl = `${siteUrl}/blog/${article.slug.current}`;
    const imageUrl = article.imageUrl || `${siteUrl}/images/default-blog.jpg`;

    const buildEmailHtml = (unsubscribeUrl: string) => `
      <div style="background-color: #FFFFFF; font-family: Arial, Helvetica, sans-serif; color: #0F172A; padding: 20px; max-width: 900px; margin: 0 auto;">

        <p style="font-size: 16px; color: #475569; line-height: 1.6; margin-bottom: 40px; text-align: left;">
          Bonjour,<br><br>
          Nous venons de publier un nouvel article qui pourrait vous intéresser sur le blog Trinexta.
        </p>

        <div style="font-size: 0; margin-bottom: 20px; text-align: center;">

          <div style="display: inline-block; width: 100%; max-width: 420px; vertical-align: top; font-size: 16px; text-align: left;">
            <img src="${imageUrl}" alt="${safeTitle}" style="width: 100%; height: auto; border-radius: 6px; display: block; object-fit: cover;" />
          </div>

          <div style="display: inline-block; width: 100%; max-width: 40px; height: 30px; font-size: 16px;"></div>

          <div style="display: inline-block; width: 100%; max-width: 400px; vertical-align: top; font-size: 16px; text-align: left;">
            <h2 style="font-size: 24px; font-weight: bold; color: #0F172A; margin: 0 0 15px 0; line-height: 1.3;">
              ${safeTitle}
            </h2>
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
              ${safeExtrait}
            </p>
            <a href="${articleUrl}" target="_blank" style="background-color: #0F172A; color: #FFFFFF; font-size: 15px; font-weight: bold; text-decoration: none; padding: 14px 28px; border-radius: 4px; display: inline-block;">
              Lire l'article complet
            </a>
          </div>
        </div>

        <p style="margin-top: 40px; font-size: 11px; color: #94A3B8; text-align: center;">
          Vous recevez cet email car vous etes inscrit a la newsletter Trinexta.<br>
          <a href="${unsubscribeUrl}" style="color: #94A3B8;">Se desabonner</a>
        </p>

      </div>
    `;

    await Promise.all(
      subscribers.map(async (sub) => {
        const unsubscribeUrl = `${siteUrl}/api/newsletter/unsubscribe?token=${sub.token}`;
        const sendMailResponse = await fetch(`https://graph.microsoft.com/v1.0/users/${senderEmail}/sendMail`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: {
              subject: `Nouveau sur Trinexta : ${safeTitle}`,
              body: { contentType: "HTML", content: buildEmailHtml(unsubscribeUrl) },
              toRecipients: [{ emailAddress: { address: sub.email } }],
            },
            saveToSentItems: "false",
          }),
        });

        if (!sendMailResponse.ok) {
          const errorText = await sendMailResponse.text();
          console.error(`Erreur envoi a ${sub.email} :`, errorText);
        }
      })
    );

    return NextResponse.json({ message: `Notifications envoyées à ${subscribers.length} abonné(s) !` }, { status: 200 });

  } catch (error) {
    console.error("Erreur Webhook Sanity:", error);
    return NextResponse.json({ error: "Erreur lors de l'envoi des notifications." }, { status: 500 });
  }
}