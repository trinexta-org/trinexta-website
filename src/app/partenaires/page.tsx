import type { Metadata } from "next"
import Image from "next/image"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { Heading, Text } from "@/components/ui/Typography"
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd"
import { JsonLd } from "@/components/seo/JsonLd"
import { PartenaireForm } from "@/components/partenaires/PartenaireForm"
import {
  PARTENAIRES_ARGUMENTS,
  PARTENAIRES_COMMISSIONS,
  PARTENAIRES_EXEMPLES,
  PARTENAIRES_EXEMPLES_NOTE,
  PARTENAIRES_EXEMPLES_TEMPS,
  formaterEuros,
  progressionExemple,
  PARTENAIRES_CONDITION,
  PARTENAIRES_ETAPES,
  PARTENAIRES_FAQ,
  PARTENAIRES_HERO,
  PARTENAIRES_LIEN,
  PARTENAIRES_META,
  PARTENAIRES_PROFILS,
  PARTENAIRES_VERSEMENT,
} from "@/data/programme-partenaires"

const OG_IMAGE = "/images/programme-partenaires/visuel-partenaires.jpg"

export const metadata: Metadata = {
  title: { absolute: PARTENAIRES_META.title },
  description: PARTENAIRES_META.description,
  alternates: { canonical: PARTENAIRES_LIEN.href },
  openGraph: {
    title: PARTENAIRES_META.title,
    description: PARTENAIRES_META.description,
    url: PARTENAIRES_LIEN.href,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1080, height: 1350 }],
  },
  twitter: {
    card: "summary_large_image",
    title: PARTENAIRES_META.title,
    description: PARTENAIRES_META.description,
    images: [OG_IMAGE],
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PARTENAIRES_FAQ.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.reponse },
  })),
}

export default function PartenairesPage() {
  return (
    <main className="relative min-h-screen bg-surface text-primary">
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "Devenir partenaire", url: PARTENAIRES_LIEN.href },
        ]}
      />
      <JsonLd data={faqJsonLd} />

      {/* Bandeau */}
      <section className="bg-primary text-primary-foreground">
        <Container className="grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-8">
            <span className="font-mono text-xs uppercase tracking-widest text-secondary">
              {PARTENAIRES_HERO.surtitre}
            </span>
            <Heading as="h1" className="text-primary-foreground" emphasis={false}>
              {PARTENAIRES_HERO.titre}
            </Heading>
            <Text variant="lead" className="max-w-2xl text-primary-foreground/80">
              {PARTENAIRES_HERO.intro}
            </Text>
            <a
              href="#candidature"
              className="inline-flex min-h-14 items-center justify-center rounded-xl bg-secondary px-8 font-bold text-primary transition-colors hover:bg-secondary/90"
            >
              {PARTENAIRES_HERO.cta}
            </a>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src={OG_IMAGE}
              alt="TRINEXTA Partenaires : votre réseau vaut de l'argent, 15 % de commission"
              fill
              sizes="(max-width: 1024px) 80vw, 380px"
              className="object-cover"
              preload
            />
          </div>
        </Container>
      </section>

      {/* Principe */}
      <Section>
        <Heading as="h2" className="mb-12">Le principe, en 4 étapes</Heading>
        <ol className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {PARTENAIRES_ETAPES.map((e, i) => (
            <li key={e.titre} className="rounded-3xl border border-border bg-background p-8">
              <span className="font-mono text-sm font-bold text-secondary-strong">0{i + 1}</span>
              <Heading as="h3" className="mt-4 mb-3">{e.titre}</Heading>
              <Text>{e.texte}</Text>
            </li>
          ))}
        </ol>
      </Section>

      {/* Commissions */}
      <section className="bg-primary text-primary-foreground">
        <Container className="py-16 md:py-24">
          <Heading as="h2" className="mb-12 text-primary-foreground">Ce que vous touchez</Heading>
          <ul className="grid gap-6 md:grid-cols-3">
            {PARTENAIRES_COMMISSIONS.map((c) => (
              <li key={c.chiffre} className="rounded-3xl border border-secondary/40 p-8">
                <p className="text-5xl font-extrabold text-secondary">{c.chiffre}</p>
                <p className="mt-4 text-lg leading-relaxed text-primary-foreground/85">{c.texte}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-primary-foreground/70">{PARTENAIRES_VERSEMENT}</p>
        </Container>
      </section>

      {/* Exemples chiffrés */}
      <Section>
        <Heading as="h2" className="mb-4">Concrètement, combien ça rapporte ?</Heading>
        <Text className="mb-12 max-w-3xl">
          Deux parcours types, deux rythmes, pour une activité moyenne de {PARTENAIRES_EXEMPLES_TEMPS}. Chaque entreprise signée s&apos;ajoute aux précédentes : le complément de revenu grandit chaque mois.
        </Text>
        <div className="grid gap-8 lg:grid-cols-2">
          {PARTENAIRES_EXEMPLES.map((e) => {
            const etapes = progressionExemple(e)
            const fin = etapes[etapes.length - 1]
            return (
              <article key={e.prenom} className="flex flex-col rounded-3xl border border-border bg-background p-5 sm:p-8">
                <p className="font-mono text-xs uppercase tracking-widest text-secondary-strong">Simulation sur {e.duree}</p>
                <Heading as="h3" className="mt-3 mb-2">
                  {e.prenom}, {e.metier}
                </Heading>
                <p className="mb-6 text-sm font-semibold text-secondary-strong">Temps consacré : {PARTENAIRES_EXEMPLES_TEMPS} en moyenne</p>
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Progression de la commission de {e.prenom}</caption>
                  <thead>
                    <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                      <th scope="col" className="py-2 pr-3 font-semibold">Mois</th>
                      <th scope="col" className="py-2 pr-3 font-semibold">Entreprise signée</th>
                      <th scope="col" className="py-2 pr-3 text-right font-semibold">Postes suivis</th>
                      <th scope="col" className="py-2 text-right font-semibold">Par mois</th>
                    </tr>
                  </thead>
                  <tbody>
                    {etapes.map((x) => (
                      <tr key={x.mois} className="border-b border-border/60 text-primary">
                        <td className="py-3 pr-3 font-semibold">{x.mois}</td>
                        <td className="py-3 pr-3">
                          {x.entreprise}, {x.postes} postes
                        </td>
                        <td className="py-3 pr-3 text-right">{x.postesSuivis}</td>
                        <td className="whitespace-nowrap py-3 text-right font-semibold">{formaterEuros(x.commission)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-8 rounded-2xl bg-primary p-6 text-primary-foreground">
                  <p className="text-sm text-primary-foreground/75">Au bout de {e.duree}, {e.prenom} touche chaque mois</p>
                  <p className="mt-1 text-4xl font-extrabold text-secondary">{formaterEuros(fin.commission)}</p>
                  <p className="mt-1 text-sm text-primary-foreground/75">
                    de complément de revenu, pour {etapes.length} entreprises présentées.
                  </p>
                </div>
              </article>
            )
          })}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">{PARTENAIRES_EXEMPLES_NOTE}</p>
      </Section>

      {/* Pour qui + pourquoi */}
      <Section>
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <Heading as="h2" className="mb-6">Pour qui ?</Heading>
            <Text className="mb-6">Toute personne qui croise des dirigeants de petites entreprises :</Text>
            <ul className="space-y-3">
              {PARTENAIRES_PROFILS.map((p) => (
                <li key={p} className="flex gap-3 text-lg text-primary">
                  <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-8 rounded-2xl border-l-4 border-secondary bg-background p-6 font-semibold text-primary">
              {PARTENAIRES_CONDITION}
            </p>
          </div>
          <div>
            <Heading as="h2" className="mb-6">Pourquoi recommander TRINEXTA</Heading>
            <div className="space-y-6">
              {PARTENAIRES_ARGUMENTS.map((a) => (
                <div key={a.titre}>
                  <Heading as="h3" className="mb-2">{a.titre}</Heading>
                  <Text>{a.texte}</Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-background">
        <Heading as="h2" className="mb-10">Questions fréquentes</Heading>
        <div className="divide-y divide-border rounded-3xl border border-border bg-surface">
          {PARTENAIRES_FAQ.map((f) => (
            <details key={f.question} className="group p-6">
              <summary className="cursor-pointer list-none text-lg font-bold text-primary">
                {f.question}
              </summary>
              <p className="mt-3 text-muted-foreground">{f.reponse}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Candidature */}
      <Section id="candidature">
        <div className="mx-auto max-w-3xl">
          <Heading as="h2" className="mb-4">Devenir partenaire</Heading>
          <Text className="mb-10">
            Laissez-nous vos coordonnées : nous vous rappelons pour vous présenter le partenariat et vous envoyer le contrat.
          </Text>
          <PartenaireForm />
        </div>
      </Section>
    </main>
  )
}
