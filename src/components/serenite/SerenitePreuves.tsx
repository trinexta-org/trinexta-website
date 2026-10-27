import { Heading, Text } from "@/components/ui/Typography"
import { SERENITE_PREUVES as preuves } from "@/data/serenite"

// Interventions réelles anonymisées, puis situations types (présentées comme telles).
export function SerenitePreuves() {
  return (
    <div className="space-y-14">
      <Text className="max-w-3xl mx-auto text-center text-primary text-lg md:text-xl font-semibold leading-relaxed">
        {preuves.experience}
      </Text>

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {preuves.cas.map((c) => (
          <li key={c.titre} className="rounded-3xl border border-primary/10 bg-white p-6 md:p-7 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary-strong">{c.secteur}</span>
            <Heading as="h3" emphasis={false} className="mt-3 text-xl md:text-2xl text-primary">
              {c.titre}
            </Heading>
            <Text className="mt-3 text-primary/75 leading-relaxed">{c.texte}</Text>
          </li>
        ))}
      </ul>

      <div className="rounded-[2rem] bg-primary p-7 md:p-10">
        <Heading as="h3" emphasis={false} className="text-2xl md:text-3xl text-white">
          Quand ça arrive, voici ce que nous faisons
        </Heading>
        <Text className="mt-2 text-white/70">Des situations que vivent les TPE et PME, et notre réponse.</Text>
        <dl className="mt-8 grid gap-6 md:grid-cols-2">
          {preuves.situations.map((s) => (
            <div key={s.probleme} className="border-l-2 border-secondary-soft/60 pl-5">
              <dt className="font-bold text-white text-lg">{s.probleme}</dt>
              <dd className="mt-2 text-white/80 leading-relaxed">{s.reponse}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
