import type { Metadata } from "next"
import { ServicePage } from "@/components/services/ServicePage"
import { supportInformatiqueData } from "@/data/services/support-informatique"

export const metadata: Metadata = {
  title: "Support informatique et hotline pour PME en Essonne",
  description: "Hotline informatique pour TPE et PME : vos collaborateurs joignent une équipe qui connaît votre parc, du lundi au vendredi, de 8 h 30 à 19 h.",
  alternates: {
    canonical: "/support-informatique",
  },
  openGraph: {
    title: "Support informatique et hotline pour PME en Essonne | TRINEXTA",
    description: "Hotline informatique pour TPE et PME : vos collaborateurs joignent une équipe qui connaît votre parc, du lundi au vendredi, de 8 h 30 à 19 h.",
    url: "/support-informatique",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Support informatique et hotline pour PME en Essonne | TRINEXTA",
    description: "Hotline informatique pour TPE et PME : vos collaborateurs joignent une équipe qui connaît votre parc, du lundi au vendredi, de 8 h 30 à 19 h.",
    images: ["/images/og-default.png"],
  },
}

export default function SupportInformatiquePage() {
  return <ServicePage {...supportInformatiqueData} />
}