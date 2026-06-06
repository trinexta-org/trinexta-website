import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd, trinextaOrganization } from "@/components/seo/JsonLd";
import { CookieBanner } from "@/components/seo/CookieBanner";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TRINEXTA",
    template: "%s | TRINEXTA",
  },
  description:
    "TRINEXTA accompagne les entreprises sur l'infogérance, le cloud, la cybersécurité et la productivité.",
  openGraph: {
    siteName: "TRINEXTA",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630, alt: "TRINEXTA" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-default.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans antialiased">
        <JsonLd data={trinextaOrganization} />
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <CookieBanner />
        <ScrollToTop />
      </body>
    </html>
  );
}
