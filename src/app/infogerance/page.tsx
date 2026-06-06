import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { getServiceData } from "@/data/services";

export const metadata: Metadata = {
  title: "Infogérance Informatique pour TPE et PME | Trinexta",
  description: "Déléguez votre gestion informatique à des experts. Trinexta assure la supervision 24/7, la maintenance proactive et la sécurité de votre parc pour une productivité sans faille.",
  openGraph: {
    title: "Infogérance Informatique pour TPE et PME | Trinexta",
    description: "Déléguez votre gestion informatique à des experts. Trinexta assure la supervision 24/7, la maintenance proactive et la sécurité de votre parc pour une productivité sans faille.",
    url: "/infogerance",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Infogérance Informatique pour TPE et PME | Trinexta",
    description: "Déléguez votre gestion informatique à des experts. Trinexta assure la supervision 24/7, la maintenance proactive et la sécurité de votre parc pour une productivité sans faille.",
    images: ["/images/og-default.png"],
  },
};

export default async function InfogerancePage() {
  const data = await getServiceData("infogerance");
  return <ServicePage {...data} />;
}
