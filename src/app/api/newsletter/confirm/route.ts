import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { PRODUCTION_URL } from "@/lib/site"

/**
 * Confirmation d'inscription (double opt-in). En POST uniquement, depuis le
 * bouton de /newsletter/confirmation : les scanners de liens des messageries
 * suivent les liens en GET et confirmeraient sinon à la place de l'abonné.
 */
export async function POST(request: Request) {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_URL).replace(/\/+$/, "")
  const page = (status: string) => NextResponse.redirect(`${base}/newsletter/confirmation?status=${status}`, 303)

  try {
    const form = await request.formData()
    const token = form.get("token")
    if (typeof token !== "string" || !token) return page("erreur")

    const abonne = await prisma.subscriber.findUnique({ where: { token } })
    if (!abonne) return page("erreur")

    if (!abonne.isActive) {
      await prisma.subscriber.update({ where: { token }, data: { isActive: true } })
    }
    return page("ok")
  } catch (error) {
    console.error("[newsletter/confirm]", error)
    return page("erreur")
  }
}
