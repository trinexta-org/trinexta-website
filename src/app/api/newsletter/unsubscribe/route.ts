import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://trinexta.fr";

  if (!token) {
    return NextResponse.redirect(`${base}/newsletter/desabonnement?status=erreur`);
  }

  try {
    const subscriber = await prisma.subscriber.findUnique({ where: { token } });

    if (!subscriber) {
      return NextResponse.redirect(`${base}/newsletter/desabonnement?status=erreur`);
    }

    if (!subscriber.isActive) {
      return NextResponse.redirect(`${base}/newsletter/desabonnement?status=deja`);
    }

    await prisma.subscriber.update({
      where: { token },
      data: { isActive: false },
    });

    return NextResponse.redirect(`${base}/newsletter/desabonnement?status=ok`);
  } catch {
    return NextResponse.redirect(`${base}/newsletter/desabonnement?status=erreur`);
  }
}
