import { NextResponse } from "next/server"
import { partenaireFormSchema } from "@/lib/validations/partenaire"
import { sendPartenaireAccuseReception, sendPartenaireNotification } from "@/lib/mail"
import { estRobot, limiteParEmail, limiteParIp, lireCorpsJson } from "@/lib/security/anti-abus"
import { PARTENAIRES_MESSAGE_SUCCES } from "@/data/programme-partenaires"

const MAX_PAR_IP = 5
const MAX_PAR_EMAIL = 3
const REPONSE_SUCCES = { success: true, message: PARTENAIRES_MESSAGE_SUCCES }

/**
 * Candidature TRINEXTA Partenaires. Rien n'est stocké sur le site : la candidature part par e-mail
 * à partenaire@trinexta.fr, qui la suit dans le dossier partenaires. Si l'envoi échoue, le candidat
 * le voit et peut réessayer.
 */
export async function POST(request: Request) {
  try {
    const body = await lireCorpsJson(request)
    if (body === null) {
      return NextResponse.json({ error: "Requête invalide" }, { status: 400 })
    }
    // Robot : réponse identique à un succès, sans rien envoyer.
    if (estRobot(body)) {
      return NextResponse.json(REPONSE_SUCCES, { status: 200 })
    }
    if (!limiteParIp(request, "partenaires", MAX_PAR_IP)) {
      return NextResponse.json({ error: "Trop de demandes, réessayez dans quelques minutes." }, { status: 429 })
    }

    const parsed = partenaireFormSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }
    const data = parsed.data

    // L'accusé de réception part vers l'adresse saisie : on borne les envois vers une même boîte.
    if (!limiteParEmail(data.email, "partenaires", MAX_PAR_EMAIL)) {
      return NextResponse.json({ error: "Trop de demandes, réessayez dans quelques minutes." }, { status: 429 })
    }

    try {
      await sendPartenaireNotification(data)
    } catch (error) {
      console.error("[api/partenaires] notification", error)
      return NextResponse.json({ error: "L'envoi n'a pas abouti, réessayez dans un instant." }, { status: 500 })
    }

    // Accusé de réception non bloquant : la candidature est déjà transmise.
    try {
      await sendPartenaireAccuseReception(data)
    } catch (error) {
      console.error("[api/partenaires] accusé de réception", error)
    }

    return NextResponse.json(REPONSE_SUCCES, { status: 200 })
  } catch (error) {
    console.error("[api/partenaires]", error)
    return NextResponse.json({ error: "Une erreur interne est survenue lors du traitement." }, { status: 500 })
  }
}
