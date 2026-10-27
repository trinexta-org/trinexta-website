import Image from "next/image"
import Link from "next/link"
import { Heading, Text } from "@/components/ui/Typography"
import { getCaseClientBySlug } from "@/data/cas-clients"
import { SERENITE_PREUVES as preuves } from "@/data/serenite"

// Cas clients détaillés (source : src/data/cas-clients.ts), puis interventions récentes en bref.
export function SerenitePreuves() {
  const cas = preuves.casEnAvant.map((slug) => getCaseClientBySlug(slug)).filter((c) => c !== undefined)

  return (
    <div className="space-y-14">
      <Text className="max-w-3xl mx-auto text-center text-primary text-lg md:text-xl font-semibold leading-relaxed">
        {preuves.experience}
      </Text>

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cas.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/cas-clients/${c.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-sm transition hover:border-secondary/40 hover:shadow-md"
            >
              <div className="relative aspect-[16/9]">
                <Image src={c.cardImage} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-7">
                <span className="text-xs font-bold uppercase tracking-widest text-secondary-strong">
                  {c.sectorLabel} · {c.size}
                </span>
                <Heading as="h3" emphasis={false} className="mt-3 text-xl md:text-2xl text-primary">
                  {c.title}
                </Heading>
                <Text className="mt-3 text-primary/75 leading-relaxed">{c.cardResult}</Text>
                <span className="mt-auto pt-5 font-bold text-primary underline decoration-secondary underline-offset-4 group-hover:decoration-2">
                  Lire le cas
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="rounded-[2rem] bg-primary p-7 md:p-10">
        <Heading as="h3" emphasis={false} className="text-2xl md:text-3xl text-white">
          Et ces dernières semaines
        </Heading>
        <dl className="mt-8 grid gap-6 md:grid-cols-2">
          {preuves.recentes.map((r) => (
            <div key={r.titre} className="border-l-2 border-secondary-soft/60 pl-5">
              <dt className="font-bold text-white text-lg">{r.titre}</dt>
              <dd className="mt-1 text-sm uppercase tracking-widest text-secondary-soft">{r.secteur}</dd>
              <dd className="mt-2 text-white/80 leading-relaxed">{r.texte}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="text-center">
        <Link
          href={preuves.lienEtudes.href}
          className="text-primary font-bold underline decoration-secondary underline-offset-4"
        >
          {preuves.lienEtudes.label}
        </Link>
      </p>
    </div>
  )
}
