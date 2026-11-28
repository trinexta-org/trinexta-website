import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { getServiceData } from "@/data/services";

export const metadata: Metadata = {
  title: "Cybersécurité des TPE et PME en Essonne",
  description: "Protégez les postes et sensibilisez vos collaborateurs : EDR SentinelOne, réglages de sécurité et suivi pour les TPE et PME en Essonne.",
  alternates: {
    canonical: "/cybersecurite",
  },
  openGraph: {
    title: "Cybersécurité des TPE et PME en Essonne | TRINEXTA",
    description: "Protégez les postes et sensibilisez vos collaborateurs : EDR SentinelOne, réglages de sécurité et suivi pour les TPE et PME en Essonne.",
    url: "/cybersecurite",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersécurité des TPE et PME en Essonne | TRINEXTA",
    description: "Protégez les postes et sensibilisez vos collaborateurs : EDR SentinelOne, réglages de sécurité et suivi pour les TPE et PME en Essonne.",
    images: ["/images/og-default.png"],
  },
};

export default async function CybersecuritePage() {
  const data = await getServiceData("cybersecurite");
  return <ServicePage {...data} />;
}
