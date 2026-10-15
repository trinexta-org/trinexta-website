import { Heading, Text } from "@/components/ui/Typography"
import { SERENITE_ETAPES } from "@/data/serenite"

export function SereniteEtapes() {
  return (
    <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {SERENITE_ETAPES.map((etape, idx) => (
        <li key={etape.title} className="h-full rounded-2xl border border-secondary/20 bg-surface-strong p-5 md:p-6 space-y-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-black text-white">
            {idx + 1}
          </span>
          <Heading as="h3" emphasis={false} className="text-lg md:text-xl text-primary leading-tight">
            {etape.title}
          </Heading>
          <Text className="text-sm text-primary/75 leading-relaxed">{etape.desc}</Text>
        </li>
      ))}
    </ol>
  )
}
