import type { Metadata } from "next"
import Link from "next/link"
import { Section } from "@/components/layout/Section"
import { Heading, Text } from "@/components/ui/Typography"
import { DiagnosticOutil } from "@/components/diagnostic/DiagnosticOutil"
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd"
import { DIAGNOSTIC_PERIMETRE, DIAGNOSTIC_TEXTES, VERIFICATIONS } from "@/data/diagnostic"

const TITRE = "Diagnostic sécurité gratuit de votre site web"
const DESCRIPTION =
  "Testez gratuitement la sécurité de votre site : HTTPS, messagerie (SPF, DKIM, DMARC), en-têtes, cookies et fichiers exposés. Analyse non intrusive en 30 s."

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: "/diagnostic-securite" },
  openGraph: {
    title: `${TITRE} | TRINEXTA`,
    description: DESCRIPTION,
    url: "/diagnostic-securite",
    type: "website",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITRE} | TRINEXTA`,
    description: DESCRIPTION,
    images: ["/images/og-default.png"],
  },
}

export default function DiagnosticSecuritePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "Cybersécurité", url: "/cybersecurite" },
          { name: "Diagnostic sécurité", url: "/diagnostic-securite" },
        ]}
      />

      <DiagnosticOutil
        entete={
          <>
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary-soft">
              {DIAGNOSTIC_TEXTES.surtitre}
            </p>
            <Heading as="h1" className="max-w-4xl text-white [&_em]:text-secondary-soft">
              {DIAGNOSTIC_TEXTES.titre}
            </Heading>
            <p className="max-w-2xl text-lg leading-relaxed text-white/80">{DIAGNOSTIC_TEXTES.intro}</p>
          </>
        }
      />

      <Section className="bg-surface py-16 md:py-20 lg:py-24">
        <div className="flex flex-col gap-10">
          <div className="flex max-w-3xl flex-col gap-3">
            <Heading as="h2">Les six points *vérifiés*</Heading>
            <Text>
              Les points qu&apos;un attaquant regarde en premier, et que n&apos;importe quel visiteur peut voir.
              Chaque résultat dit ce qui a été observé, ce que ça veut dire et ce qu&apos;il faut faire.
            </Text>
          </div>
          <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {VERIFICATIONS.map((v, i) => (
              <li key={v.id} className="flex flex-col gap-2 rounded-2xl border border-surface-strong bg-background p-6">
                <span className="text-sm font-semibold text-secondary-strong">{String(i + 1).padStart(2, "0")}</span>
                <Heading as="h3" emphasis={false} className="text-lg md:text-xl">
                  {v.titre}
                </Heading>
                <p className="text-base leading-relaxed text-muted-foreground">{v.resume}</p>
              </li>
            ))}
          </ol>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-3">
              <Heading as="h3" emphasis={false}>
                Ce que l&apos;analyse fait
              </Heading>
              <ul className="flex flex-col gap-2">
                {DIAGNOSTIC_PERIMETRE.fait.map((l) => (
                  <li key={l} className="text-base text-primary">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <Heading as="h3" emphasis={false}>
                Ce qu&apos;elle ne fait pas
              </Heading>
              <ul className="flex flex-col gap-2">
                {DIAGNOSTIC_PERIMETRE.neFaitPas.map((l) => (
                  <li key={l} className="text-base text-primary">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Text className="max-w-3xl">
            Ce diagnostic ne remplace pas un audit : il repère les portes visibles depuis la rue. Pour vos postes, vos
            comptes Microsoft 365 et vos sauvegardes, voyez notre{" "}
            <Link href="/cybersecurite" className="font-semibold text-secondary-strong underline hover:text-primary">
              accompagnement en cybersécurité
            </Link>
            . {DIAGNOSTIC_TEXTES.conservation}{" "}
            <Link href="/confidentialite" className="font-semibold text-secondary-strong underline hover:text-primary">
              Données personnelles
            </Link>
            .
          </Text>
        </div>
      </Section>
    </>
  )
}
