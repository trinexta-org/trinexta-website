import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { getServiceData } from "@/data/services";

export const metadata: Metadata = {
  title: "Cybersécurité TPE/PME - Protection EDR & IA | Trinexta",
  description: "Protégez votre entreprise avec la cybersécurité TRINEXTA. EDR nouvelle génération, protection anti-ransomware, phishing et surveillance 24/7. Sécurité proactive et simple.",
  openGraph: {
    title: "Cybersécurité TPE/PME - Protection EDR & IA | Trinexta",
    description: "Protégez votre entreprise avec la cybersécurité TRINEXTA. EDR nouvelle génération, protection anti-ransomware, phishing et surveillance 24/7. Sécurité proactive et simple.",
    url: "/cybersecurite",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersécurité TPE/PME - Protection EDR & IA | Trinexta",
    description: "Protégez votre entreprise avec la cybersécurité TRINEXTA. EDR nouvelle génération, protection anti-ransomware, phishing et surveillance 24/7. Sécurité proactive et simple.",
    images: ["/images/og-default.png"],
  },
};

export default async function CybersecuritePage() {
  const data = await getServiceData("cybersecurite");
  return <ServicePage {...data} />;
}
