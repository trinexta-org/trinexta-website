import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"
import { escapeHtml, sendMail } from "@/lib/mail"
import { PRODUCTION_URL } from "@/lib/site"
import { estRobot, limiteParEmail, limiteParIp, lireCorpsJson } from "@/lib/security/anti-abus"

const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email("Le format de l'adresse e-mail est invalide.").max(254),
})

const MAX_PAR_IP = 3
const MAX_PAR_EMAIL = 2

// Réponse identique que l'adresse soit nouvelle, en attente ou déjà inscrite :
// le formulaire ne révèle pas qui est abonné.
const REPONSE = {
  message: "Vérifiez votre boîte de réception : un e-mail vous permet de confirmer votre inscription.",
}

/**
 * Inscription en double opt-in : l'abonné est créé inactif et ne devient actif
 * qu'après avoir cliqué sur le lien de confirmation. L'e-mail envoyé ne contient
 * que ce lien : il n'a aucun intérêt comme relais de spam.
 */
export async function POST(request: Request) {
  try {
    const body = await lireCorpsJson(request)
    if (body === null) {
      return NextResponse.json({ error: "Requête invalide." }, { status: 400 })
    }
    if (estRobot(body)) {
      return NextResponse.json(REPONSE, { status: 200 })
    }
    if (!limiteParIp(request, "newsletter", MAX_PAR_IP)) {
      return NextResponse.json({ error: "Trop de demandes, réessayez dans quelques minutes." }, { status: 429 })
    }

    const parsed = newsletterSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })
    }
    const { email } = parsed.data

    if (!limiteParEmail(email, "newsletter", MAX_PAR_EMAIL)) {
      return NextResponse.json(REPONSE, { status: 200 })
    }

    const existant = await prisma.subscriber.findUnique({ where: { email } })
    if (existant?.isActive) {
      return NextResponse.json(REPONSE, { status: 200 })
    }

    const abonne = existant ?? (await prisma.subscriber.create({ data: { email, isActive: false } }))

    const sender = process.env.NEWSLETTER_FROM_EMAIL
    if (!sender) {
      console.error("[newsletter] NEWSLETTER_FROM_EMAIL manquant")
      return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 })
    }

    const base = (process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_URL).replace(/\/+$/, "")
    const lien = `${base}/newsletter/confirmation?token=${encodeURIComponent(abonne.token)}`

    await sendMail({
      from: sender,
      to: email,
      subject: "Confirmez votre inscription à la newsletter TRINEXTA",
      html: emailConfirmation(lien),
    })

    return NextResponse.json(REPONSE, { status: 200 })
  } catch (error) {
    console.error("[newsletter]", error)
    return NextResponse.json({ error: "Une erreur est survenue." }, { status: 500 })
  }
}

function emailConfirmation(lien: string): string {
  const url = escapeHtml(lien)
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FFFFFF; color: #0A233E; border: 1px solid #5C92B8; border-radius: 12px; overflow: hidden;">
      <div style="padding: 28px 32px; background-color: #0A233E;">
        <p style="margin: 0; font-size: 20px; font-weight: 700; color: #FFFFFF;">TRINEXTA</p>
      </div>
      <div style="padding: 32px;">
        <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6;">Bonjour,</p>
        <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6;">Une demande d'inscription à la newsletter TRINEXTA a été faite avec cette adresse. Pour la confirmer, cliquez sur le bouton ci-dessous.</p>
        <p style="margin: 24px 0;">
          <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #0A233E; color: #FFFFFF; text-decoration: none; border-radius: 8px; font-weight: 600;">Confirmer mon inscription</a>
        </p>
        <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #0A233E;">Si vous n'êtes pas à l'origine de cette demande, ignorez ce message : sans confirmation, votre adresse ne recevra rien.</p>
      </div>
    </div>
  `
}
