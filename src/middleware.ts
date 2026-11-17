import { NextResponse, type NextRequest } from "next/server";
import { BOUTIQUE_OUVERTE } from "@/data/boutique/ouverture";

const TAB_MAP: Record<string, string> = {
  serenite: "/serenite",
  impulsion: "/technicien-sous-regie",
  "services-annexes": "/services-annexes",
  studio: "https://trinexta-studio.fr",
};

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/nos-offres") {
    const tab = searchParams.get("tab") ?? "";
    const destination = TAB_MAP[tab] ?? "/serenite";
    return NextResponse.redirect(new URL(destination, request.url), 301);
  }

  // Boutique fermée : toutes les sous-pages renvoient vers la page « arrive bientôt ».
  if (!BOUTIQUE_OUVERTE && pathname.startsWith("/boutique/")) {
    return NextResponse.redirect(new URL("/boutique", request.url), 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/nos-offres", "/boutique/:path+"],
};
