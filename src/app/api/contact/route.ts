import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { contactFormSchema } from "@/lib/validations/contact";
import { sendNotificationEmail } from "@/lib/mail";

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
        type: data.type,
        prenom: data.prenom,
        nom: data.nom,
        email: data.email,
        telephone: data.telephone,
        entreprise: data.entreprise,
        siret: data.siret, 
        secteur: data.secteur,
        taille: data.taille,
        urgence: data.urgence,
        message: data.message,
      },
    });

    try {
      await sendNotificationEmail(data);
    } catch {
      await prisma.contactForm.delete({
        where: { id: savedContact.id },
      });

      return NextResponse.json(
        { error: "Une erreur interne est survenue lors du traitement." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Votre demande a bien été envoyée. L'équipe Trinexta vous contactera sous peu.",
        id: savedContact.id,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Une erreur interne est survenue lors du traitement." },
      { status: 500 }
    );
  }
}
