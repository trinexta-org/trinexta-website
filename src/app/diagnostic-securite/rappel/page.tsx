import type { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/layout/Container"
import { DIAGNOSTIC_TEXTES } from "@/data/diagnostic"
import { TRINEXTA_CONTACT } from "@/data/contact-trinexta"

export const metadata: Metadata = {
  title: "Être rappelé au sujet du diagnostic",
  robots: { index: false, follow: false },
}

type Props = {
  searchParams: Promise<{ jeton?: string; status?: string }>
}

const MESSAGES = {
  ok: {
    titre: "C'est noté",
    message: `Un technicien vous recontacte au sujet de votre diagnostic, ${TRINEXTA_CONTACT.horaires}. Vous pouvez aussi nous appeler au ${TRINEXTA_CONTACT.telephone}.`,
  },
  erreur: {
    titre: "Lien invalide",
    message: `Ce lien est invalide ou a expiré. Appelez-nous au ${TRINEXTA_CONTACT.telephone}, ou écrivez-nous à ${TRINEXTA_CONTACT.email}.`,
  },
} as const

const BOUTON =
  "inline-flex items-center justify-center h-11 px-6 rounded-lg bg-white text-primary text-sm font-semibold hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"

// Même principe que /newsletter/confirmation : le lien de l'e-mail mène ici, et
// seul le bouton (POST) enregistre la demande. Un scanner de liens qui suit le
// lien en GET ne donne aucun accord à la place du destinataire.
export default async function RappelDiagnosticPage({ searchParams }: Props) {
  const { jeton, status } = await searchParams
  const message = MESSAGES[status as keyof typeof MESSAGES] ?? MESSAGES.erreur

  return (
    <main className="flex min-h-screen items-center bg-primary">
      <Container>
        <div className="mx-auto max-w-lg py-32 text-center">
          {jeton ? (
            <>
              <h1 className="mb-4 text-2xl font-bold text-white">Être rappelé par un technicien</h1>
              <p className="mb-8 text-sm leading-relaxed text-white/80">
                Confirmez et nous vous recontactons par e-mail au sujet de votre diagnostic, pour vous dire ce qui
                est urgent et ce qui peut attendre. Votre adresse est alors conservée 3 ans après le dernier contact.
              </p>
              <form method="post" action="/api/diagnostic/rappel">
                <input type="hidden" name="jeton" value={jeton} />
                <button type="submit" className={BOUTON}>
                  {DIAGNOSTIC_TEXTES.boutonRappelEmail}
                </button>
              </form>
              <p className="mt-6 text-xs text-white/70">
                <Link href="/confidentialite" className="underline hover:text-white">
                  Données personnelles
                </Link>
              </p>
            </>
          ) : (
            <>
              <h1 className="mb-4 text-2xl font-bold text-white">{message.titre}</h1>
              <p className="mb-8 text-sm leading-relaxed text-white/80">{message.message}</p>
              <Link href="/" className={BOUTON}>
                Retour au site
              </Link>
            </>
          )}
        </div>
      </Container>
    </main>
  )
}
