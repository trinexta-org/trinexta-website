import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { getServiceData } from "@/data/services";

export const metadata: Metadata = {
  title: "Sauvegarde des données des PME en Essonne",
  description: "Fichiers perdus, copies anciennes, restauration incertaine : étudiez une sauvegarde hébergée en France, en option selon votre proposition.",
  alternates: {
    canonical: "/cloud-sauvegarde",
  },
  openGraph: {
    title: "Sauvegarde des données des PME en Essonne | TRINEXTA",
    description: "Fichiers perdus, copies anciennes, restauration incertaine : étudiez une sauvegarde hébergée en France, en option selon votre proposition.",
    url: "/cloud-sauvegarde",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sauvegarde des données des PME en Essonne | TRINEXTA",
    description: "Fichiers perdus, copies anciennes, restauration incertaine : étudiez une sauvegarde hébergée en France, en option selon votre proposition.",
    images: ["/images/og-default.png"],
  },
};

export default async function CloudSauvegardePage() {
  const data = await getServiceData("cloud-sauvegarde");
  return <ServicePage {...data} />;
}
