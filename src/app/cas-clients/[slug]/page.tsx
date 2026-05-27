import Link from "next/link"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { BannerCTA } from "@/components/layout/BannerCTA"
import { Section } from "@/components/layout/Section"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Heading, Text } from "@/components/ui/Typography"
import { caseClients, getCaseClientBySlug } from "@/data/cas-clients"

export function generateStaticParams() {
  return caseClients.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = getCaseClientBySlug(slug)

  if (!item) {
    return {
      title: "Cas client introuvable | TRINEXTA",
    }
  }

  return {
    title: `${item.title} | TRINEXTA`,
    description: item.metaDescription,
  }
}

export default async function CaseClientDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getCaseClientBySlug(slug)

  if (!item) notFound()

  return (
    <main className="min-h-screen bg-primary text-white">
      <Section className="overflow-hidden pb-12 pt-20 md:pb-16 md:pt-28">
        <div className="max-w-5xl space-y-6">
          <Link href="/cas-clients" className="inline-flex text-sm font-semibold text-secondary hover:text-white">
            Retour aux cas clients
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-white/10 text-white border-white/10">{item.label}</Badge>
            <Badge className="bg-white/10 text-white border-white/10">{item.sectorLabel}</Badge>
            <Badge className="bg-white/10 text-white border-white/10">{item.clientName}</Badge>
            <Badge className="bg-white/10 text-white border-white/10">{item.size}</Badge>
          </div>

          <Heading as="h1" className="text-white">
            {item.title}
          </Heading>
          <Text variant="lead" className="max-w-4xl text-white/80">
            {item.metaDescription}
          </Text>
        </div>
      </Section>

      <Section className="py-10 md:py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <Text className="text-white/50 text-sm uppercase tracking-[0.14em] font-semibold">Contexte</Text>
            <div className="mt-4 space-y-4">
              {item.context.map((paragraph) => (
                <Text key={paragraph} className="text-white/80">{paragraph}</Text>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <Text className="text-white/50 text-sm uppercase tracking-[0.14em] font-semibold">Défi</Text>
            <ul className="mt-4 space-y-3 text-sm md:text-base text-white/80 leading-relaxed">
              {item.challenges.map((challenge) => (
                <li key={challenge} className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-secondary" />
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="py-10 md:py-14">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <Text className="text-white/50 text-sm uppercase tracking-[0.14em] font-semibold">Solution TRINEXTA</Text>
            <div className="mt-5 space-y-6">
              {item.solutions.map((solution) => (
                <div key={solution.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <Link href={solution.href} className="inline-flex">
                    <Badge className="bg-secondary/15 text-white border-secondary/30 hover:bg-secondary/25">
                      {solution.label}
                    </Badge>
                  </Link>
                  <Text className="mt-4 text-white/80">{solution.content}</Text>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <Text className="text-white/50 text-sm uppercase tracking-[0.14em] font-semibold">Bénéfices concrets</Text>
            <ul className="mt-5 space-y-3 text-sm md:text-base text-white/80 leading-relaxed">
              {item.benefits.map((benefit) => (
                <li key={benefit} className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-secondary" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="py-10 md:py-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <Text className="text-white/50 text-sm uppercase tracking-[0.14em] font-semibold">Résultats structurés</Text>
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-left text-sm md:text-base">
                <thead className="bg-white/8 text-white/65">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Indicateur</th>
                    <th className="px-4 py-3 font-semibold">Avant</th>
                    <th className="px-4 py-3 font-semibold">Après</th>
                  </tr>
                </thead>
                <tbody>
                  {item.metrics.map((metric) => (
                    <tr key={metric.indicator} className="border-t border-white/10 text-white/82">
                      <td className="px-4 py-3">{metric.indicator}</td>
                      <td className="px-4 py-3">{metric.before}</td>
                      <td className="px-4 py-3">{metric.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <Text className="text-white/50 text-sm uppercase tracking-[0.14em] font-semibold">Services utilisés</Text>
            <div className="mt-5 flex flex-wrap gap-3">
              {item.solutions.map((solution) => (
                <Link key={solution.label} href={solution.href}>
                  <Badge className="bg-white/10 text-white border-white/10 hover:bg-white/15">
                    {solution.label}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <BannerCTA
          title="Discutons de votre projet"
          description="Si votre situation ressemble à ce cas, on peut vous aider à poser un cadre plus propre, plus sûr et plus simple à piloter."
          action={
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">Contacter TRINEXTA</Link>
            </Button>
          }
          variant="primary"
        />
      </Section>
    </main>
  )
}
