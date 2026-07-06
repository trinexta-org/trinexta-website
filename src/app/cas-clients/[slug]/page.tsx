import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { ViewportHero } from "@/components/layout/ViewportHero"
import { Badge } from "@/components/ui/Badge"
import { Entrance } from "@/components/ui/Entrance"
import { FinalCTA } from "@/components/FinalCTA"
import { FadeIn } from "@/components/ui/FadeIn"
import { Heading, Text } from "@/components/ui/Typography"
import { TrinextaGear } from "@/components/ui/TrinextaGear"
import { MetricRow } from "@/components/cas-clients/MetricRow"
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
    return { title: "Cas client introuvable | TRINEXTA" }
  }

  return {
    title: `${item.title}`,
    description: item.metaDescription,
    alternates: {
      canonical: `/cas-clients/${slug}`,
    },
    openGraph: {
      title: `${item.title} | TRINEXTA`,
      description: item.metaDescription,
      url: `/cas-clients/${slug}`,
      type: "website",
      images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} | TRINEXTA`,
      description: item.metaDescription,
      images: ["/images/og-default.png"],
    },
  }
}

function PhaseLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xl font-bold text-secondary tracking-widest md:text-2xl">
        {number}
      </span>
      <span className="text-xl font-bold uppercase tracking-[0.12em] text-white/80 md:text-2xl">
        {label}
      </span>
    </div>
  )
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
      {/* Hero */}
      <ViewportHero>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${item.heroImage}')` }} />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="absolute inset-0 bg-linear-to-r from-primary/95 via-primary/65 to-transparent" />
        <Container className="relative z-10 py-12 md:py-16 lg:py-20">
          <div className="max-w-5xl space-y-6">
            <Entrance delay={0} duration={0.6}>
              <Link
                href="/cas-clients"
                className="inline-flex text-sm font-semibold text-secondary hover:text-white"
              >
                Retour aux cas clients
              </Link>
            </Entrance>

            <Entrance delay={0.12} duration={0.7}>
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="border-white/10 bg-white/10 text-white">{item.label}</Badge>
                <Badge className="border-white/10 bg-white/10 text-white">{item.sectorLabel}</Badge>
                <Badge className="border-white/10 bg-white/10 text-white">{item.clientName}</Badge>
                <Badge className="border-white/10 bg-white/10 text-white">{item.size}</Badge>
              </div>
            </Entrance>

            <Entrance delay={0.25} duration={0.8}>
              <Heading as="h1" className="text-white">
                {item.title}
              </Heading>
            </Entrance>

            <Entrance delay={0.4} duration={0.8}>
              <Text variant="lead" className="max-w-4xl text-white/80">
                {item.metaDescription}
              </Text>
            </Entrance>
          </div>
        </Container>
      </ViewportHero>

      {/* Timeline */}
      <Section className="pb-16 pt-4 md:pt-6">
        <div className="space-y-0">

          {/* Phase 01 — Situation initiale */}
          <div className="grid grid-cols-[52px_1fr] gap-x-6 md:gap-x-10">
            {/* Spine left */}
            <div className="flex flex-col items-center">
              <TrinextaGear size={52} />
              <div className="mt-3 w-px flex-1 bg-secondary/20" />
            </div>

            {/* Content right */}
            <div className="pb-16 pt-1">
              <PhaseLabel number="01" label="Situation initiale" />

              <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
                {/* Text side */}
                <div>
                  <div className="space-y-4">
                    {item.context.map((paragraph, i) => (
                      <FadeIn key={paragraph} delay={i * 0.09}>
                        <Text className="text-white/80 leading-relaxed">{paragraph}</Text>
                      </FadeIn>
                    ))}
                  </div>

                  <div className="mt-8">
                    <Text className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                      Points de friction
                    </Text>
                    <FadeIn delay={0.2}>
                      <ul className="space-y-3">
                        {item.challenges.map((challenge) => (
                          <li key={challenge} className="flex gap-3 text-sm text-white/80 leading-relaxed md:text-base">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary/60" />
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </FadeIn>
                  </div>
                </div>

                {/* Image + pull-quote */}
                <FadeIn direction="left" delay={0.15}>
                  <div className="space-y-4">
                    <div className="relative overflow-hidden rounded-2xl">
                      <Image
                        src={item.cardImage}
                        alt={`Illustration — ${item.title}`}
                        width={400}
                        height={280}
                        className="w-full object-cover"
                        sizes="(max-width: 1024px) 100vw, 340px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
                    </div>
                    <blockquote className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <Text className="text-sm italic leading-relaxed text-white/65 md:text-base">
                        &ldquo;{item.cardChallenge}&rdquo;
                      </Text>
                    </blockquote>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>

          {/* Phase 02 — L'intervention */}
          <div className="grid grid-cols-[52px_1fr] gap-x-6 md:gap-x-10">
            {/* Spine left */}
            <div className="flex flex-col items-center">
              <TrinextaGear size={52} />
              <div className="mt-3 w-px flex-1 bg-secondary/20" />
            </div>

            {/* Content right */}
            <div className="pb-16 pt-1">
              <PhaseLabel number="02" label="L'intervention" />

              <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                {/* Solutions */}
                <div className="space-y-4">
                  <Text className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                    Solutions déployées
                  </Text>
                  {item.solutions.map((solution, i) => (
                    <FadeIn key={solution.label} delay={i * 0.1}>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                        <Link href={solution.href} className="inline-flex">
                          <Badge className="border-secondary/30 bg-secondary/15 text-white hover:bg-secondary/25">
                            {solution.label}
                          </Badge>
                        </Link>
                        <Text className="mt-3 text-sm text-white/80 leading-relaxed md:text-base">
                          {solution.content}
                        </Text>
                      </div>
                    </FadeIn>
                  ))}
                </div>

                {/* Benefits */}
                <FadeIn delay={0.25}>
                  <div>
                    <Text className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                      Bénéfices concrets
                    </Text>
                    <ul className="mt-4 space-y-4">
                      {item.benefits.map((benefit) => (
                        <li key={benefit} className="flex gap-3 text-sm text-white/80 leading-relaxed md:text-base">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>

          {/* Phase 03 — Les résultats */}
          <div className="grid grid-cols-[52px_1fr] gap-x-6 md:gap-x-10">
            {/* Spine left — no connector after last phase */}
            <div className="flex flex-col items-center">
              <TrinextaGear size={52} />
            </div>

            {/* Content right */}
            <div className="pt-1">
              <PhaseLabel number="03" label="Les résultats" />

              <div className="mt-6">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {item.metrics.map((metric, i) => (
                    <FadeIn key={metric.indicator} delay={i * 0.1}>
                      <MetricRow metric={metric} rowIndex={i} />
                    </FadeIn>
                  ))}
                </div>

                {/* Result pull-quote */}
                <FadeIn delay={0.3}>
                  <div className="mt-8 rounded-2xl border border-secondary/30 bg-secondary/[0.07] p-6">
                    <Text className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary">
                      En résumé
                    </Text>
                    <Text className="text-sm italic leading-relaxed text-white/80 md:text-base">
                      &ldquo;{item.cardResult}&rdquo;
                    </Text>
                  </div>
                </FadeIn>

                {/* Services used */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {item.solutions.map((solution) => (
                    <Link key={solution.label} href={solution.href}>
                      <Badge className="border-white/10 bg-white/10 text-white hover:bg-white/15">
                        {solution.label}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <FinalCTA
        line1="Votre situation"
        line2="ressemble à"
        line3="ce cas ?"
        description="Si votre situation ressemble à ce cas, on peut vous aider à poser un cadre plus propre, plus sûr et plus simple à piloter."
        ctaLabel="Contacter TRINEXTA"
        ctaHref="/contact"
      />
    </main>
  )
}
