import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { getServiceData } from "@/data/services";

export const metadata: Metadata = {
  title: "Cloud & Sauvegarde pour TPE/PME",
  description: "Modernisez votre infrastructure avec le Cloud Trinexta. Sauvegardes immuables, serveurs dédiés, accès distants sécurisés et plan de reprise d'activité (PRA).",
  alternates: {
    canonical: "/cloud-sauvegarde",
  },
  openGraph: {
    title: "Cloud & Sauvegarde pour TPE/PME | Trinexta",
    description: "Modernisez votre infrastructure avec le Cloud Trinexta. Sauvegardes immuables, serveurs dédiés, accès distants sécurisés et plan de reprise d'activité (PRA).",
    url: "/cloud-sauvegarde",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud & Sauvegarde pour TPE/PME | Trinexta",
    description: "Modernisez votre infrastructure avec le Cloud Trinexta. Sauvegardes immuables, serveurs dédiés, accès distants sécurisés et plan de reprise d'activité (PRA).",
    images: ["/images/og-default.png"],
  },
};

export default async function CloudSauvegardePage() {
  const data = await getServiceData("cloud-sauvegarde");
  return <ServicePage {...data} />;
}
