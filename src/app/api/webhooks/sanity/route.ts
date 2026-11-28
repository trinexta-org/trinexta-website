import { NextResponse } from "next/server";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { escapeHtml, sendMail } from "@/lib/mail";

// Webhook Sanity : annonce un nouvel article du blog aux abonnés actifs.
// Rétabli le 28/11/2026 (supprimé par erreur le 24/10 avec le retrait de
// TRINEXTA Studio). Un article n'est annoncé qu'une fois (table NewsletterEnvoi).

const payloadSchema = z
  .object({
    title: z.string().min(1).optional(),
    titre: z.string().min(1).optional(),
    slug: z.union([z.object({ current: z.string().min(1) }), z.string().min(1)]),
    imageUrl: z.string().url().optional().nullable(),
    extrait: z.string().optional().nullable(),
  })
  .loose()
  .refine((d) => d.title || d.titre, { message: "Titre manquant" });

const COULEUR_NAVY = "#0A233E";
const COULEUR_BLEU = "#5C92B8";

function contenuEmail(p: {
  titre: string;
  extrait: string;
  articleUrl: string;
  imageUrl?: string | null;
  desabonnementUrl: string;
}) {
  const image = p.imageUrl
    ? `<img src="${escapeHtml(p.imageUrl)}" alt="" width="560" style="width:100%;max-width:560px;height:auto;border-radius:6px;display:block;margin:0 0 24px 0;" />`
    : "";
  return `<div style="background:#FFFFFF;font-family:Arial,Helvetica,sans-serif;color:${COULEUR_NAVY};padding:24px;max-width:600px;margin:0 auto;">
  <p style="font-size:15px;line-height:1.6;margin:0 0 24px 0;">Bonjour,<br><br>Un nouvel article est en ligne sur le blog TRINEXTA.</p>
  ${image}
  <h2 style="font-size:22px;line-height:1.3;margin:0 0 12px 0;color:${COULEUR_NAVY};">${p.titre}</h2>
  <p style="font-size:15px;line-height:1.6;margin:0 0 24px 0;color:${COULEUR_NAVY};">${p.extrait}</p>
  <a href="${p.articleUrl}" style="background:${COULEUR_NAVY};color:#FFFFFF;font-size:15px;font-weight:bold;text-decoration:none;padding:14px 28px;border-radius:4px;display:inline-block;">Lire l'article</a>
  <p style="margin-top:40px;font-size:12px;line-height:1.5;color:${COULEUR_BLEU};text-align:center;">Vous recevez cet e-mail car vous êtes inscrit à la newsletter TRINEXTA.<br><a href="${p.desabonnementUrl}" style="color:${COULEUR_BLEU};">Se désabonner</a></p>
</div>`;
}

export async function POST(request: Request) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[webhooks/sanity] SANITY_WEBHOOK_SECRET manquant");
    return NextResponse.json({ error: "Configuration serveur invalide." }, { status: 500 });
  }

  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  if (!signature) {
    return NextResponse.json({ error: "Accès refusé." }, { status: 401 });
  }

  const corps = await request.text();
  let signatureValide = false;
  try {
    signatureValide = await isValidSignature(corps, signature, secret);
  } catch {
    signatureValide = false;
  }
  if (!signatureValide) {
    return NextResponse.json({ error: "Accès refusé." }, { status: 401 });
  }

  let article: z.infer<typeof payloadSchema>;
  try {
    article = payloadSchema.parse(JSON.parse(corps));
  } catch {
    return NextResponse.json({ error: "Format de données invalide." }, { status: 400 });
  }

  const expediteur = process.env.NEWSLETTER_FROM_EMAIL;
  if (!expediteur) {
    console.error("[webhooks/sanity] NEWSLETTER_FROM_EMAIL manquant");
    return NextResponse.json({ error: "Configuration serveur invalide." }, { status: 500 });
  }

  const slug = typeof article.slug === "string" ? article.slug : article.slug.current;
  const titreBrut = (article.title ?? article.titre) as string;

  try {
    // Réserve l'envoi : un second appel pour le même article s'arrête ici.
    try {
      await prisma.newsletterEnvoi.create({ data: { slug, titre: titreBrut } });
    } catch (error) {
      if ((error as { code?: string }).code === "P2002") {
        return NextResponse.json({ message: "Article déjà annoncé." }, { status: 200 });
      }
      throw error;
    }

    const abonnes = await prisma.subscriber.findMany({
      where: { isActive: true },
      select: { email: true, token: true },
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://trinexta.fr";
    const titre = escapeHtml(titreBrut);
    const extrait = article.extrait
      ? escapeHtml(article.extrait)
      : "Nos conseils pour l'informatique de votre entreprise.";
    const articleUrl = `${siteUrl}/blog/${encodeURIComponent(slug)}`;

    let envoyes = 0;
    let echecs = 0;
    for (const abonne of abonnes) {
      try {
        await sendMail({
          from: expediteur,
          to: abonne.email,
          subject: `Nouvel article TRINEXTA : ${titreBrut}`,
          html: contenuEmail({
            titre,
            extrait,
            articleUrl,
            imageUrl: article.imageUrl,
            desabonnementUrl: `${siteUrl}/api/newsletter/unsubscribe?token=${abonne.token}`,
          }),
        });
        envoyes += 1;
      } catch (error) {
        echecs += 1;
        console.error("[webhooks/sanity] échec d'envoi à un abonné", error);
      }
    }

    if (abonnes.length > 0 && envoyes === 0) {
      // Aucun envoi abouti (messagerie indisponible) : libère l'article pour
      // qu'une nouvelle publication le renvoie.
      await prisma.newsletterEnvoi.delete({ where: { slug } });
      return NextResponse.json({ error: "Envoi impossible." }, { status: 502 });
    }

    await prisma.newsletterEnvoi.update({ where: { slug }, data: { destinataires: envoyes } });
    return NextResponse.json({ message: `Article annoncé à ${envoyes} abonné(s).`, echecs }, { status: 200 });
  } catch (error) {
    console.error("[webhooks/sanity]", error);
    return NextResponse.json({ error: "Erreur lors de l'envoi." }, { status: 500 });
  }
}
