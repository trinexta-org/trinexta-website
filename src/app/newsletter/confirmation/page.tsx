import type { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/layout/Container"

export const metadata: Metadata = {
  title: "Confirmation d'inscription à la newsletter",
  robots: {
    index: false,
    follow: true,
  },
}

type Props = {
  searchParams: Promise<{ token?: string; status?: string }>
}

const MESSAGES = {
  ok: {
    titre: "Inscription confirmée",
    message: "Merci. Vous recevrez nos prochains articles sur l'informatique et la cybersécurité des PME. Chaque e-mail contient un lien de désabonnement.",
  },
  erreur: {
    titre: "Lien invalide",
    message: "Ce lien est invalide ou a expiré. Inscrivez-vous de nouveau depuis le site, ou écrivez-nous à contact@trinexta.fr.",
  },
} as const

export default async function ConfirmationNewsletterPage({ searchParams }: Props) {
  const { token, status } = await searchParams

  return (
    <main className="min-h-screen bg-primary flex items-center">
      <Container>
        <div className="py-32 text-center max-w-lg mx-auto">
          {token ? (
            <>
              <h1 className="text-2xl font-bold text-white mb-4">Confirmez votre inscription</h1>
              <p className="text-white/70 text-sm leading-relaxed mb-8">
                Un clic suffit pour recevoir la newsletter TRINEXTA.
              </p>
              <form method="post" action="/api/newsletter/confirm">
                <input type="hidden" name="token" value={token} />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-white text-primary text-sm font-semibold hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
                >
                  Confirmer mon inscription
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-white mb-4">
                {(MESSAGES[status as keyof typeof MESSAGES] ?? MESSAGES.erreur).titre}
              </h1>
              <p className="text-white/70 text-sm leading-relaxed mb-8">
                {(MESSAGES[status as keyof typeof MESSAGES] ?? MESSAGES.erreur).message}
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-white text-primary text-sm font-semibold hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Retour au site
              </Link>
            </>
          )}
        </div>
      </Container>
    </main>
  )
}
