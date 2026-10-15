import Image from "next/image"
import Link from "next/link"
import { ViewportHero } from "@/components/layout/ViewportHero"
import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/Button"
import { Heading, Text } from "@/components/ui/Typography"
import { SERENITE_HERO as hero, SERENITE_OFFRES } from "@/data/serenite"

export function SereniteHero() {
  return (
    <ViewportHero>
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/nos-offres/hero-serenite.jpg"
          alt=""
          fill
          preload
          quality={50}
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/90" />
      </div>

      <Container className="relative z-10 py-12 md:py-16 lg:py-20">
        <div className="max-w-4xl animate-service-hero">
          <Heading
            as="h1"
            emphasis={false}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.1] text-white text-balance drop-shadow-xl"
          >
            {hero.title}
          </Heading>

          <Text className="mt-5 text-lg md:text-2xl font-semibold text-secondary-soft">
            {hero.accroche}
          </Text>
          <Text className="mt-3 text-base md:text-lg text-white/85 max-w-2xl leading-relaxed">
            {hero.description}
          </Text>

          <ul className="mt-8 flex flex-col sm:flex-row gap-3">
            {SERENITE_OFFRES.map((offre) => (
              <li
                key={offre.id}
                className="rounded-2xl border border-white/20 bg-white/10 px-5 py-3"
              >
                <span className="block text-xs font-bold uppercase tracking-widest text-white/70">
                  {offre.nom}
                </span>
                <span className="text-2xl font-black text-white">{offre.prix}</span>{" "}
                <span className="text-sm text-white/70">{offre.unite}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild variant="secondary" size="lg" className="text-white">
              <Link href={hero.ctaPrimary.href}>{hero.ctaPrimary.label}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10">
              <Link href={hero.ctaSecondary.href}>{hero.ctaSecondary.label}</Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-white/60 italic">{hero.baseline}</p>
        </div>
      </Container>
    </ViewportHero>
  )
}
