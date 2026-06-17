import { NextResponse, type NextRequest } from "next/server";

const TAB_MAP: Record<string, string> = {
  serenite: "/serenite",
  impulsion: "/technicien-sous-regie",
  "services-annexes": "/services-annexes",
  studio: "/trinexta-studio",
};

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/nos-offres") {
    const tab = searchParams.get("tab") ?? "";
    const destination = TAB_MAP[tab] ?? "/serenite";
    return NextResponse.redirect(new URL(destination, request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/nos-offres"],
};
