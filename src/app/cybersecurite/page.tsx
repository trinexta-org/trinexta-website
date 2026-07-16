import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { getServiceData } from "@/data/services";

export const metadata: Metadata = {
  title: "Cybersécurité PME en Essonne",
  description: "Cybersécurité pour PME en Essonne : protection EDR, anti-ransomware, phishing, surveillance 24/7 et réponse à incident avec Trinexta.",
  alternates: {
    canonical: "/cybersecurite",
  },
  openGraph: {
    title: "Cybersécurité PME en Essonne | Trinexta",
    description: "Cybersécurité pour PME en Essonne : protection EDR, anti-ransomware, phishing, surveillance 24/7 et réponse à incident avec Trinexta.",
    url: "/cybersecurite",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersécurité PME en Essonne | Trinexta",
    description: "Cybersécurité pour PME en Essonne : protection EDR, anti-ransomware, phishing, surveillance 24/7 et réponse à incident avec Trinexta.",
    images: ["/images/og-default.png"],
  },
};

export default async function CybersecuritePage() {
  const data = await getServiceData("cybersecurite");
  return <ServicePage {...data} />;
}
