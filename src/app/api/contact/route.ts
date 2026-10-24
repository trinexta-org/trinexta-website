import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { contactFormSchema } from "@/lib/validations/contact";
import { sendContactAccuseReception, sendNotificationEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
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
