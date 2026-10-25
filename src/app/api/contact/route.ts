import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { contactFormSchema } from "@/lib/validations/contact";
import { sendContactAccuseReception, sendNotificationEmail } from "@/lib/mail";
import { estRobot, limiteParEmail, limiteParIp, lireCorpsJson } from "@/lib/security/anti-abus";

const MAX_PAR_IP = 5;
const MAX_PAR_EMAIL = 3;
const REPONSE_ROBOT = {
  success: true,
  message: "Nous lisons votre message et revenons vers vous par e-mail ou par téléphone.",
};

export async function POST(request: Request) {
  try {
    const body = await lireCorpsJson(request);
    if (body === null) {
      return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
    }
    // Robot : réponse identique à un succès, sans rien enregistrer ni envoyer.
    if (estRobot(body)) {
      return NextResponse.json(REPONSE_ROBOT, { status: 200 });
    }
    if (!limiteParIp(request, "contact", MAX_PAR_IP)) {
      return NextResponse.json({ error: "Trop de demandes, réessayez dans quelques minutes." }, { status: 429 });
    }

    const validatedData = contactFormSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        {
          error: "Données invalides",
          details: validatedData.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validatedData.data;

    // L'accusé de réception part vers l'adresse saisie : on borne le nombre
    // d'envois vers une même boîte pour que le formulaire ne serve pas de relais.
    if (!limiteParEmail(data.email, "contact", MAX_PAR_EMAIL)) {
      return NextResponse.json({ error: "Trop de demandes, réessayez dans quelques minutes." }, { status: 429 });
    }

    const savedContact = await prisma.contactForm.create({
      data: {
        // `type` porte désormais le besoin (infogérance, support, cyber...).
        type: data.besoin,
        profil: data.profil,
        prenom: data.prenom,
        nom: data.nom,
        email: data.email,
        telephone: data.telephone,
        entreprise: data.entreprise,
        siret: data.siret,
        ville: data.ville,
        postes: data.postes,
        message: data.message ?? "",
        offre: data.offre,
        suite: data.suite,
        moment: data.moment,
        rdvDate: data.rdvDate ? new Date(`${data.rdvDate}T00:00:00Z`) : null,
        rdvFormat: data.rdvFormat,
      },
    });

    try {
      await sendNotificationEmail(data);
    } catch (error) {
      console.error("Erreur envoi email contact:", error);

      await prisma.contactForm.delete({
        where: { id: savedContact.id },
      });

      return NextResponse.json(
        { error: "Une erreur interne est survenue lors du traitement." },
        { status: 500 }
      );
    }

    // Accusé de réception au prospect : non bloquant, la demande est déjà enregistrée et transmise.
    try {
      await sendContactAccuseReception(data);
    } catch (error) {
      console.error("Erreur envoi accusé de réception contact:", error);
    }

    const message =
      data.suite === "rappel"
        ? `Nous vous rappelons au ${data.telephone}, du lundi au vendredi de 8 h 30 à 19 h.`
        : data.suite === "rdv"
          ? "Nous vous confirmons le rendez-vous, ou nous vous proposons un autre créneau."
          : "Nous lisons votre message et revenons vers vous par e-mail ou par téléphone.";

    return NextResponse.json(
      {
        success: true,
        message,
        id: savedContact.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur traitement formulaire contact:", error);

    return NextResponse.json(
      { error: "Une erreur interne est survenue lors du traitement." },
      { status: 500 }
    );
  }
}
