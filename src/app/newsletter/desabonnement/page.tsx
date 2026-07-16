import type { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/layout/Container"

export const metadata: Metadata = {
  title: "Désabonnement newsletter",
  robots: {
    index: false,
    follow: true,
  },
}

type Props = {
  searchParams: Promise<{ status?: string }>
}

export default async function DesabonnementPage({ searchParams }: Props) {
  const { status } = await searchParams

  const content = {
    ok: {
      titre: "Vous êtes désabonné",
      message: "Votre adresse e-mail a été retirée de notre liste. Vous ne recevrez plus nos newsletters.",
    },
    deja: {
      titre: "Déjà désabonné",
      message: "Cette adresse e-mail est déjà désabonnée de notre newsletter.",
    },
    erreur: {
      titre: "Lien invalide",
      message: "Ce lien est invalide ou a expiré. Contactez-nous à contact@trinexta.fr si besoin.",
    },
  }[status ?? "erreur"] ?? {
    titre: "Lien invalide",
    message: "Ce lien est invalide ou a expiré. Contactez-nous à contact@trinexta.fr si besoin.",
  }

  return (
    <main className="min-h-screen bg-primary flex items-center">
      <Container>
        <div className="py-32 text-center max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-white mb-4">{content.titre}</h1>
          <p className="text-white/60 text-sm leading-relaxed mb-8">{content.message}</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center h-10 px-6 rounded-lg bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/90 transition-colors"
          >
            Retour au site
          </Link>
        </div>
      </Container>
    </main>
  )
}
