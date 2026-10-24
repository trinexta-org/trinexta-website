import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { Heading } from "@/components/ui/Typography"
import { FadeIn } from "@/components/ui/FadeIn"
import { ACCUEIL_ADRESSE, ACCUEIL_FAITS, ACCUEIL_IDENTITE } from "@/data/accueil"

/**
 * « En bref » : qui nous sommes, en phrases factuelles qu'un moteur ou une IA
 * peut reprendre telles quelles, avec l'adresse de référence et les contacts cliquables.
 */
export function AccueilEnBref() {
  return (
    <Section container={false} className="relative bg-surface pt-12 md:pt-16 pb-12 md:pb-16">
      <Container className="max-w-[1280px] grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
        <FadeIn className="flex flex-col gap-5">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-secondary-strong">En bref</span>
          <Heading as="h2" className="text-3xl md:text-5xl leading-[1.05]">
            Votre service informatique, *à Évry.*
          </Heading>
          <p className="text-lg md:text-xl text-primary leading-relaxed">{ACCUEIL_IDENTITE}</p>
          <dl className="flex flex-col border-t border-primary/30">
            {ACCUEIL_FAITS.map((fait) => (
              <div
                key={fait.label}
                className="grid gap-1 border-b border-primary/15 py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-4"
              >
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-primary sm:pt-1">{fait.label}</dt>
                <dd className="text-primary/85">{fait.valeur}</dd>
              </div>
            ))}
          </dl>
        </FadeIn>

        <FadeIn delay={0.1} className="lg:self-start">
          <address className="flex flex-col gap-8 rounded-2xl bg-primary p-7 not-italic text-primary-foreground md:p-9">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-secondary-soft">Nous trouver</span>
              <p className="text-2xl font-extrabold">{ACCUEIL_ADRESSE.lieu}</p>
              <p className="text-lg leading-snug text-white/85">
                {ACCUEIL_ADRESSE.rue}
                <br />
                {ACCUEIL_ADRESSE.ville}
              </p>
              <a
                href={ACCUEIL_ADRESSE.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 w-fit border-b border-white pb-1 font-bold hover:border-secondary-soft hover:text-secondary-soft"
              >
                Itinéraire <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="flex flex-col gap-3 border-t border-white/20 pt-6">
              <a href={ACCUEIL_ADRESSE.telephoneHref} className="text-2xl font-extrabold hover:text-secondary-soft">
                {ACCUEIL_ADRESSE.telephone}
              </a>
              <a
                href={`mailto:${ACCUEIL_ADRESSE.email}`}
                className="break-all text-lg font-bold underline underline-offset-4 hover:text-secondary-soft"
              >
                {ACCUEIL_ADRESSE.email}
              </a>
              <p className="text-white/80">Du lundi au vendredi, de 8 h 30 à 19 h.</p>
            </div>
          </address>
        </FadeIn>
      </Container>
    </Section>
  )
}
