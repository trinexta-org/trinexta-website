import { PRODUCTION_URL } from "@/lib/site"
import { ACCUEIL_ADRESSE, ACCUEIL_FAITS, ACCUEIL_FAQ, ACCUEIL_IDENTITE } from "@/data/accueil"
import { PIED_MARQUES, PIED_RESSOURCES, PIED_SERVICES } from "@/data/footer"

// llms.txt : résumé du site pour les assistants IA (format proposé sur llmstxt.org),
// généré depuis les mêmes données que les pages pour rester cohérent.
export const dynamic = "force-static"

export function GET() {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_URL).replace(/\/+$/, "")
  const lien = (l: { name: string; href: string; desc?: string }) =>
    `- [${l.name}](${l.href.startsWith("http") ? l.href : base + l.href})${l.desc ? ` : ${l.desc}` : ""}`
  const lignes = [
    "# TRINEXTA",
    "",
    `> ${ACCUEIL_IDENTITE}`,
    "",
    "TRINEXTA est une marque de TrusTech IT Support SAS. Baseline : « L'humain avant les tickets. »",
    "",
    ...ACCUEIL_FAITS.map((f) => `- ${f.label} : ${f.valeur}`),
    `- Adresse : ${ACCUEIL_ADRESSE.lieu}, ${ACCUEIL_ADRESSE.rue}, ${ACCUEIL_ADRESSE.ville}, France`,
    `- Téléphone : ${ACCUEIL_ADRESSE.telephone}`,
    `- E-mail : ${ACCUEIL_ADRESSE.email}`,
    "",
    "## Offres et services",
    "",
    ...PIED_SERVICES.map(lien),
    "",
    "## Ressources",
    "",
    ...PIED_RESSOURCES.map(lien),
    "",
    "## Autres activités de TRINEXTA",
    "",
    ...PIED_MARQUES.map(lien),
    "",
    "## Questions fréquentes",
    "",
    ...ACCUEIL_FAQ.flatMap((q) => [`### ${q.question}`, "", q.answer, ""]),
  ]
  return new Response(lignes.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
