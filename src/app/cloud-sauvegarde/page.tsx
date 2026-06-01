import { ServicePage } from "@/components/services/ServicePage";
import { getServiceData } from "@/data/services";

export const metadata = {
  title: "Cloud & Sauvegarde pour TPE/PME | Trinexta",
  description: "Modernisez votre infrastructure avec le Cloud Trinexta. Sauvegardes immuables, serveurs dédiés, accès distants sécurisés et plan de reprise d'activité (PRA).",
};

export default async function CloudSauvegardePage() {
  const data = await getServiceData("cloud-sauvegarde");
  return <ServicePage {...data} />;
}
