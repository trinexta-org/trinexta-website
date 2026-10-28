import Image from "next/image"
import Link from "next/link"
import { Heading, Text } from "@/components/ui/Typography"
import { getCaseClientBySlug } from "@/data/cas-clients"
import { SERENITE_PREUVES as preuves } from "@/data/serenite"

// Trois cas clients détaillés (source : src/data/cas-clients.ts) et lien vers tous les cas.
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
