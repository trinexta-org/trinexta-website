"use client";

import { useState, useEffect, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import type { JsonLdValue } from "@/components/seo/JsonLd";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionFade } from "@/components/ui/SectionFade";
import { FinalCTA } from "@/components/FinalCTA";
import { ViewportHero } from "@/components/layout/ViewportHero";
import { Heading, Text } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { TransitionTitle } from "@/components/TransitionTitle";
import { GridCards } from "@/components/layout/GridCards";
import { BannerCTA } from "@/components/layout/BannerCTA";
import { BreadcrumbJsonLd } from "../seo/BreadcrumbJsonLd";
import { usePresence } from "@/hooks/usePresence";
import { useCrossfade } from "@/hooks/useCrossfade";
import { WaveDivider } from "@/components/ui/WaveDivider";

const bentoImageExtOverrides: Record<string, string> = {
  "infogerance/1": "webp",
  "infogerance/2": "webp",
};

function bentoImageSrc(serviceSlug: string, imageIndex: number) {
  const ext = bentoImageExtOverrides[`${serviceSlug}/${imageIndex}`] ?? "jpg";
  return `/images/services/${serviceSlug}/bento-${imageIndex}.${ext}`;
}

/*
 * Mini-format de liens inline dans les textes de src/data/ : [ancre](/route).
 * Rendu en <Link> a l'affichage, nettoye (texte brut) pour le JSON-LD.
 */
function parseInlineLinks(text: string, keyPrefix: string): ReactNode[] {
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let idx = 0;

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    nodes.push(
      <Link
        key={`${keyPrefix}-link-${idx++}`}
        href={match[2]}
        className="underline decoration-secondary/50 underline-offset-2 hover:decoration-secondary transition-colors"
      >
        {match[1]}
      </Link>,
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

/*
 * Texte multi-paragraphes (separes par une ligne vide) avec liens inline.
 * Un texte a un seul paragraphe sans lien produit un rendu strictement
 * identique a l'ancien <Text>{description}</Text>.
 */
function renderRichText(text: string, keyPrefix: string, className: string) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0)
    .map((paragraph, i) => (
      <Text key={`${keyPrefix}-p-${i}`} className={className}>
        {parseInlineLinks(paragraph, `${keyPrefix}-${i}`)}
      </Text>
    ));
}

/*
 * Version texte brut (sans markdown ni sauts de paragraphe) pour le JSON-LD.
 */
function stripRichText(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\n\s*\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export interface ServicePageProps {
  serviceSlug: string;
  canonicalPath?: string;
  // Dossier d'images sous /images/services/ ; par defaut serviceSlug.
  // Permet a une page de reprendre les visuels d'une autre page service.
  imageSlug?: string;

  hero: {
    titlePart1: string;
    titlePart2: string;
    description: string;
    ctaText: string;
    ctaHref: string;
    secondaryCta?: CtaLink;
  };

  problem: {
    subtitle: string;
    title: string;
    description: string;
    painPoints?: string[];
    hideTransition?: boolean;
    transition?: TransitionLines;
  };

  /*
   * features : bento a 5 cases avec images (cybersecurite, cloud).
   * details : onglets services, chaque onglet = intro courte + liste a puces + lien.
   * Fournir l'un ou l'autre.
   */
  offer: {
    subtitle: string;
    title: string;
    description?: string;
    features?: Array<{
      title: string;
      desc: string;
    }>;
    details?: ServiceDetail[];
    hideTransition?: boolean;
    transition?: TransitionLines;
  };

  /*
   * Cartes de formules (ex. Serenite / sur mesure), affichees apres l'offre.
   */
  formulas?: {
    subtitle: string;
    title: string;
    description?: string;
    items: Array<{
      badge?: string;
      title: string;
      desc: string;
      points?: string[];
      cta: CtaLink;
      highlighted?: boolean;
    }>;
    note?: string;
  };

  /*
   * Etapes numerotees (reprise de parc, traitement d'un incident...).
   */
  process?: {
    subtitle: string;
    title: string;
    description?: string;
    steps: Array<{
      title: string;
      desc: string;
    }>;
    cta?: CtaLink;
  };

  /*
   * Encart cas client : chiffres cles + resultats + lien vers l'etude complete.
   */
  caseStudy?: {
    surtitle: string;
    title: string;
    context: string;
    stats: Array<{
      value: string;
      label: string;
    }>;
    results: string[];
    conclusion?: string;
    cta: CtaLink;
    note?: string;
  };

  /*
   * Banniere personnalisee affichee juste apres la section probleme.
   * Omise par defaut (aucune banniere).
   */
  banner?: {
    title: string;
    description?: string;
    ctaText: string;
    ctaHref: string;
  };

  /*
   * Bloc factuel "En bref" optionnel, affiche apres la section offre.
   * Rendu HTML semantique (dl/dt/dd).
   */
  keyFacts?: Array<{
    label: string;
    value: string;
  }>;

  localSeo?: {
    subtitle: string;
    title: string;
    description: string;
    items: Array<{
      title: string;
      desc: string;
    }>;
    ctaText: string;
    ctaHref: string;
  };

  benefits: {
    subtitle: string;
    title: string;
    transition?: TransitionLines;
    items: Array<{
      title: string;
      desc: string;
    }>;
  };

  incidentResponse?: {
    surtitle: string;
    title: string;
    intro: string;
    items: Array<{
      title: string;
      desc: string;
    }>;
    ctaLabel: string;
    ctaHref: string;
    planHref: string;
  };

  expertise?: {
    surtitle: string;
    title: string;
    intro: string;
    items: string[];
  };

  faq: Array<{
    question: string;
    answer: string;
  }>;

  cta: {
    line1: string;
    line2: string;
    line3: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };

  /*
   * Override optionnel du schema JSON-LD Service. Quand fourni, le
   * provider reference l'entite locale existante (trinextaLocalBusiness,
   * @id https://trinexta.fr) pour rester coherent avec la home.
   * Omis (defaut) : comportement actuel inchange (provider = { name: "Trinexta" }).
   */
  schemaOverride?: {
    name?: string;
    serviceType?: string;
    areaServed?: string[];
  };
}

interface CtaLink {
  text: string;
  href: string;
}

interface TransitionLines {
  line1: string;
  line2: string;
}

interface ServiceDetail {
  title: string;
  intro: string;
  items: string[];
  note?: string;
  link?: CtaLink;
}

/*
 * Onglets services : liste a gauche, panneau a droite (empile sur mobile).
 * Tous les panneaux restent dans le HTML (attribut hidden) pour le SEO.
 */
function ServiceTabs({
  serviceSlug,
  details,
}: {
  serviceSlug: string;
  details: ServiceDetail[];
}) {
  const [active, setActive] = useState(0);

  /*
   * Fleches gauche/droite (liste horizontale en mobile) et haut/bas
   * (colonne en desktop), Home/End : pattern ARIA tabs a activation automatique.
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const last = details.length - 1;
    const next: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowDown: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      ArrowUp: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in next)) return;
    event.preventDefault();
    const target = next[event.key];
    setActive(target);
    const tab = document.getElementById(`service-tab-${target}`);
    tab?.focus();
    tab?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(240px,320px)_1fr] gap-4 lg:gap-8">
      <div className="relative -mx-1 lg:mx-0 after:content-[''] after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:w-12 after:bg-gradient-to-l after:from-surface after:to-transparent lg:after:hidden">
      <div
        role="tablist"
        aria-label="Nos services"
        onKeyDown={handleKeyDown}
        className="flex lg:flex-col gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-1 pr-12 lg:pr-1 snap-x"
      >
        {details.map((detail, idx) => {
          const isActive = idx === active;
          return (
            <button
              key={detail.title}
              role="tab"
              id={`service-tab-${idx}`}
              aria-selected={isActive}
              aria-controls={`service-panel-${idx}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(idx)}
              className={`
                snap-start shrink-0 lg:shrink text-left rounded-xl border px-4 py-3 md:px-5 md:py-4
                flex items-center gap-3 transition-all duration-300
                ${
                  isActive
                    ? "bg-primary border-primary text-white shadow-lg"
                    : "bg-background border-border text-foreground hover:border-secondary/50"
                }
              `}
            >
              <span
                className={`
                  shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                  ${isActive ? "bg-secondary text-white" : "bg-secondary/15 text-secondary-strong"}
                `}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="text-sm md:text-base font-bold leading-snug whitespace-nowrap lg:whitespace-normal">
                {detail.title}
              </span>
            </button>
          );
        })}
      </div>
      </div>

      {details.map((detail, idx) => (
        <div
          key={detail.title}
          role="tabpanel"
          id={`service-panel-${idx}`}
          aria-labelledby={`service-tab-${idx}`}
          hidden={idx !== active}
          tabIndex={0}
          className="rounded-2xl md:rounded-3xl border border-border bg-background overflow-hidden"
        >
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px]">
            <div className="p-6 md:p-10 space-y-5 md:space-y-6">
              <Heading as="h3" emphasis={false} className="text-foreground text-2xl md:text-3xl">
                {detail.title}
              </Heading>

              <div className="space-y-3">
                {renderRichText(
                  detail.intro,
                  `detail-${idx}-intro`,
                  "text-muted-foreground text-base md:text-lg leading-relaxed",
                )}
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {detail.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-foreground text-sm md:text-base leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {detail.note && (
                <Text className="text-muted-foreground text-sm leading-relaxed border-l-2 border-secondary/40 pl-4">
                  {parseInlineLinks(detail.note, `detail-${idx}-note`)}
                </Text>
              )}

              {detail.link && (
                <Link
                  href={detail.link.href}
                  className="inline-flex items-center gap-2 text-secondary-strong font-bold text-sm md:text-base hover:underline"
                >
                  {detail.link.text}
                  <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>

            <div className="relative hidden xl:block min-h-[280px]">
              <Image
                src={bentoImageSrc(serviceSlug, (idx % 2) + 1)}
                alt=""
                fill
                sizes="280px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-primary/10 to-primary/60" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CheckIcon() {
  return (
    <span className="shrink-0 w-5 h-5 mt-0.5 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center">
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-secondary-strong"
        aria-hidden="true"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

interface BentoCellProps {
  serviceSlug: string;
  features: Array<{
    title: string;
    desc: string;
  }>;
  currentDataIndex: number;
  isMainFocus: boolean;
  hasImage: boolean;
  bentoClass: string;
  imageIndex: number;
  onClick: () => void;
}

function BentoCell({
  serviceSlug,
  features,
  currentDataIndex,
  isMainFocus,
  hasImage,
  bentoClass,
  imageIndex,
  onClick,
}: BentoCellProps) {
  const { displayValue: displayDataIndex, isVisible } = useCrossfade(
    currentDataIndex,
    400,
  );

  const feat = features[displayDataIndex];

  if (!feat) return null;

  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl md:rounded-2xl
        border border-border group
        ${bentoClass}
        ${
          !isMainFocus
            ? "cursor-pointer hover:border-secondary/50"
            : "cursor-default"
        }
        ${!hasImage ? "bg-surface-strong" : ""}
      `}
    >
      <div
        className={`
          absolute inset-0 w-full h-full
          transition-all duration-[400ms]
          ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"}
        `}
      >
        {hasImage && (
          <>
            <Image
              src={bentoImageSrc(serviceSlug, imageIndex)}
              alt={feat.title}
              fill
              sizes="(min-width: 768px) 44vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40 md:to-transparent" />
          </>
        )}

        {!isMainFocus && (
          <div className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 flex items-center justify-center z-20 group-hover:bg-secondary/40 transition-colors">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </div>
        )}

        <div
          className={`
            relative z-10 h-full flex flex-col p-5 md:p-8
            ${hasImage ? "justify-end" : "justify-start"}
          `}
        >
          <Heading
            as="h3"
            className={`
              text-lg md:text-xl font-bold mb-2 md:mb-3
              ${hasImage ? "text-white" : "text-foreground"}
            `}
          >
            {feat.title}
          </Heading>

          {isMainFocus ? (
            <div className="overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-secondary/30 scrollbar-track-transparent">
              <p
                className={`
                  text-sm md:text-base leading-relaxed
                  ${hasImage ? "text-white/80" : "text-muted-foreground"}
                `}
              >
                {feat.desc}
              </p>
            </div>
          ) : (
            <div className="overflow-hidden">
              <p
                className={`
                  text-sm md:text-base leading-relaxed line-clamp-3
                  ${hasImage ? "text-white/80" : "text-muted-foreground"}
                `}
              >
                {feat.desc}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    const updateMatches = () => {
      setMatches(media.matches);
    };

    updateMatches();

    media.addEventListener("change", updateMatches);

    return () => {
      media.removeEventListener("change", updateMatches);
    };
  }, [query]);

  return matches;
}

export function ServicePage({
  serviceSlug,
  canonicalPath,
  imageSlug,
  hero,
  problem,
  offer,
  banner,
  keyFacts,
  formulas,
  process,
  localSeo,
  benefits,
  incidentResponse,
  expertise,
  caseStudy,
  faq,
  cta,
  schemaOverride,
}: ServicePageProps) {
  const breadcrumbPath = canonicalPath ?? `/${serviceSlug}`;
  const mediaSlug = imageSlug ?? serviceSlug;
  const offerFeatures = offer.features ?? [];

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [activeBenefit, setActiveBenefit] = useState(0);

  const [bentoOrder, setBentoOrder] = useState([0, 1, 2, 3, 4]);
  const [userInteracted, setUserInteracted] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDataIndex, setModalDataIndex] = useState(0);

  const { shouldRender: modalShouldRender, isVisible: modalVisible } =
    usePresence(isModalOpen, 300);

  const isMobile = useMediaQuery("(max-width: 767px)");

  /*
   * Rotation automatique du Bento sur desktop
   */
  useEffect(() => {
    if (userInteracted || isMobile) return;

    const interval = setInterval(() => {
      setBentoOrder((prev) => {
        const newOrder = [...prev];

        const first = newOrder.shift();

        if (first !== undefined) {
          newOrder.push(first);
        }

        return newOrder;
      });
    }, 15000);

    return () => clearInterval(interval);
  }, [isMobile, userInteracted]);

  /*
   * Interaction avec une carte Bento
   */
  const handleDesktopClick = (gridIndex: number) => {
    if (gridIndex === 0) return;

    setUserInteracted(true);

    setBentoOrder((prev) => {
      const newOrder = [...prev];

      const temp = newOrder[0];

      newOrder[0] = newOrder[gridIndex];
      newOrder[gridIndex] = temp;

      return newOrder;
    });
  };

  /*
   * FAQ JSON-LD
   */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripRichText(item.answer),
      },
    })),
  };

  /*
   * Service JSON-LD
   * schemaOverride absent (defaut) -> comportement identique a l'origine.
   * schemaOverride fourni -> provider reference trinextaLocalBusiness par @id.
   */
  const serviceSchema: Record<string, JsonLdValue> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: schemaOverride?.name ?? `${hero.titlePart1} ${hero.titlePart2}`,
    description: schemaOverride
      ? stripRichText(hero.description)
      : hero.description,
    provider: schemaOverride
      ? {
          "@type": "LocalBusiness",
          "@id": "https://trinexta.fr",
          name: "Trinexta",
        }
      : { "@type": "LocalBusiness", name: "Trinexta" },
  };

  if (schemaOverride?.serviceType) {
    serviceSchema.serviceType = schemaOverride.serviceType;
  }

  if (schemaOverride?.areaServed) {
    serviceSchema.areaServed = schemaOverride.areaServed;
  }

  return (
    <div className="bg-surface min-h-screen text-foreground">
      {/* SEO */}
      <JsonLd data={faqSchema} />
      <JsonLd data={serviceSchema} />

      <BreadcrumbJsonLd
        items={[
          {
            name: "Accueil",
            url: "/",
          },
          {
            name: `${hero.titlePart1} ${hero.titlePart2}`,
            url: breadcrumbPath,
          },
        ]}
      />

      {/* =========================================================
          1. HERO
      ========================================================= */}
      <ViewportHero>
        <div className="absolute inset-0 z-0">
          <Image
            src={`/images/services/${mediaSlug}/hero.avif`}
            alt={`${hero.titlePart1} ${hero.titlePart2}`}
            fill
            quality={50}
            preload
            className="object-cover object-center"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-primary/90" />
        </div>

        <Container className="relative z-10 py-12 md:py-16 lg:py-20">
          <div className="max-w-4xl">
            <div className="animate-service-hero">
              <Heading
                as="h1"
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-normal drop-shadow-xl text-balance"
              >
                <span className="text-white">{hero.titlePart1}</span>{" "}
                <span className="text-secondary-soft">{hero.titlePart2}</span>
              </Heading>

              <div className="mt-4 md:mt-6 max-w-2xl">
                <div className="text-base sm:text-lg md:text-xl text-white/90 drop-shadow-md leading-relaxed text-balance space-y-3">
                  {renderRichText(
                    hero.description,
                    "hero-desc",
                    "text-base sm:text-lg md:text-xl text-white/90 drop-shadow-md leading-relaxed text-balance",
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                variant="secondary"
                className="w-full sm:w-auto text-white h-auto py-3.5 px-6 md:py-5 md:px-8 text-sm md:text-base font-bold whitespace-normal text-center"
              >
                <Link href={hero.ctaHref}>{hero.ctaText}</Link>
              </Button>

              {hero.secondaryCta && (
                <Button
                  asChild
                  variant="outline"
                  className="w-full sm:w-auto h-auto py-3.5 px-6 md:py-5 md:px-8 text-sm md:text-base font-bold whitespace-normal text-center border-white/40 text-white hover:bg-white/10"
                >
                  <Link href={hero.secondaryCta.href}>{hero.secondaryCta.text}</Link>
                </Button>
              )}
            </div>
          </div>
        </Container>
      </ViewportHero>

      {/* =========================================================
          WAVE - SORTIE DU HERO
      ========================================================= */}
      <WaveDivider from="primary" to="surface" amplitude="ample" crossing={1} />

      {/* =========================================================
          TRANSITION - PROBLEM
      ========================================================= */}
      {!problem.hideTransition && (
        <TransitionTitle
          surtitle={problem.subtitle}
          line1={problem.transition?.line1 ?? "Ce qui freine"}
          line2={problem.transition?.line2 ?? "votre activité"}
        />
      )}

      {/* =========================================================
          2. PROBLÈMES
      ========================================================= */}
      <Section id="probleme" className="bg-surface pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 md:space-y-10">
            <div className="space-y-3 md:space-y-4">
              <Heading as="h2" className="text-foreground text-3xl md:text-4xl">
                {problem.title}
              </Heading>

              <div className="space-y-3 md:space-y-4">
                {renderRichText(
                  problem.description,
                  "problem-desc",
                  "text-muted-foreground text-base md:text-lg leading-relaxed",
                )}
              </div>
            </div>

            {problem.painPoints && problem.painPoints.length > 0 && (
              <GridCards columns={2} gap="gap-2 md:gap-5">
                {problem.painPoints.map((point, index) => (
                  <FadeIn key={index} delay={index * 0.1}>
                    <div className="group relative p-3 md:p-6 rounded-xl md:rounded-2xl bg-secondary/10 border border-secondary/20 hover:bg-secondary/15 hover:border-secondary/30 transition-all duration-300 h-full flex flex-col justify-center items-center text-center overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <Text className="text-foreground font-medium text-[10px] md:text-sm leading-tight md:leading-snug">
                        {point}
                      </Text>
                    </div>
                  </FadeIn>
                ))}
              </GridCards>
            )}
          </div>

          {/* Images problème */}
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-auto lg:aspect-square max-w-[500px] mx-auto lg:max-w-none mt-4 lg:mt-0">
            <div
              className={`
                absolute top-0 right-0
                w-[75%] h-[75%]
                rounded-2xl md:rounded-3xl
                overflow-hidden shadow-2xl
                border border-border z-10
                ${!isMobile ? "animate-float-y" : ""}
              `}
              style={
                {
                  "--float-from": "0px",
                  "--float-to": "-10px",
                  "--float-duration": "6s",
                } as CSSProperties
              }
            >
              <Image
                src={`/images/services/${mediaSlug}/problem-1.jpg`}
                alt="Problème informatique"
                fill
                sizes="(min-width: 1024px) 38vw, (min-width: 640px) 56vw, 75vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-primary/20" />
            </div>

            <div
              className={`
                absolute bottom-0 left-0
                w-[60%] h-[60%]
                rounded-2xl md:rounded-3xl
                overflow-hidden shadow-2xl
                border border-border z-20
                ${!isMobile ? "animate-float-y" : ""}
              `}
              style={
                {
                  "--float-from": "0px",
                  "--float-to": "10px",
                  "--float-duration": "5s",
                } as CSSProperties
              }
            >
              <Image
                src={`/images/services/${mediaSlug}/problem-2.jpg`}
                alt="Frustration informatique"
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 60vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-secondary/20" />
            </div>
          </div>
        </div>
      </Section>

      {/* =========================================================
          BANNIERE PERSONNALISEE (optionnelle)
      ========================================================= */}
      {banner && (
        <Section id="banner-cta" className="bg-surface pb-16 md:pb-24">
          <BannerCTA
            variant="surface"
            title={banner.title}
            description={banner.description}
            action={
              <Button
                asChild
                variant="secondary"
                className="text-white h-auto py-3.5 px-6 md:py-4 md:px-8 text-sm md:text-base font-bold"
              >
                <Link href={banner.ctaHref}>{banner.ctaText}</Link>
              </Button>
            }
          />
        </Section>
      )}

      {/* =========================================================
          TRANSITION - OFFRE
      ========================================================= */}
      {!offer.hideTransition && (
        <TransitionTitle
          surtitle={offer.subtitle}
          line1={offer.transition?.line1 ?? "Notre"}
          line2={offer.transition?.line2 ?? "Périmètre"}
        />
      )}

      {/* =========================================================
          3. OFFRE
      ========================================================= */}
      <Section id="offre" className="bg-surface pb-16 md:pb-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 md:space-y-4 mb-10 md:mb-16">
          <Heading as="h2" className="text-foreground text-3xl md:text-4xl">
            {offer.title}
          </Heading>

          {offer.description && (
            <Text
              variant="lead"
              className="text-muted-foreground text-base md:text-lg"
            >
              {parseInlineLinks(offer.description, "offer-desc")}
            </Text>
          )}
        </div>

        {offer.details && offer.details.length > 0 && (
          <ServiceTabs serviceSlug={mediaSlug} details={offer.details} />
        )}

        {offerFeatures.length > 0 && (!isMobile ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 auto-rows-[minmax(180px,auto)] md:auto-rows-[minmax(220px,auto)]">
            {bentoOrder.map((currentDataIndex, gridPositionIndex) => {
              const isMainFocus = gridPositionIndex === 0;

              const isSecondaryWithImage = gridPositionIndex === 4;

              const hasImage = isMainFocus || isSecondaryWithImage;

              const bentoClass = isMainFocus
                ? "md:col-span-2 md:row-span-2"
                : isSecondaryWithImage
                  ? "md:col-span-2 md:row-span-1"
                  : "md:col-span-1 md:row-span-1";

              const imageIndex = isMainFocus ? 1 : 2;

              return (
                <BentoCell
                  key={`bento-slot-${gridPositionIndex}`}
                  serviceSlug={mediaSlug}
                  features={offerFeatures}
                  currentDataIndex={currentDataIndex}
                  isMainFocus={isMainFocus}
                  hasImage={hasImage}
                  bentoClass={bentoClass}
                  imageIndex={imageIndex}
                  onClick={() => handleDesktopClick(gridPositionIndex)}
                />
              );
            })}
          </div>
        ) : (
          /* MOBILE */
          <div className="grid grid-cols-1 gap-4">
            {offerFeatures.map((feat, idx) => {
              const hasImage = idx === 0 || idx === 4;

              const imageIndex = idx === 0 ? 1 : 2;

              return (
                <button
                  key={`mobile-bento-${idx}`}
                  onClick={() => {
                    setModalDataIndex(idx);
                    setIsModalOpen(true);
                  }}
                  className={`
                    relative p-6 rounded-xl
                    border border-border text-left
                    flex flex-col group overflow-hidden
                    ${!hasImage ? "bg-background" : "min-h-[200px] justify-end"}
                  `}
                >
                  {hasImage && (
                    <>
                      <Image
                        src={bentoImageSrc(mediaSlug, imageIndex)}
                        alt={feat.title}
                        fill
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40" />
                    </>
                  )}

                  <div className="relative z-10">
                    <Heading
                      as="h3"
                      className={`
                        text-lg font-bold mb-2 pr-10
                        ${hasImage ? "text-white" : "text-foreground"}
                      `}
                    >
                      {feat.title}
                    </Heading>

                    <p
                      className={`
                        text-sm leading-relaxed line-clamp-3
                        ${hasImage ? "text-white/80" : "text-muted-foreground"}
                      `}
                    >
                      {feat.desc}
                    </p>
                  </div>

                  <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 flex items-center justify-center z-10 group-hover:bg-secondary/20 transition-colors">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        ))}

        {/* MOBILE MODAL */}
        {modalShouldRender && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:hidden">
            <div
              onClick={() => setIsModalOpen(false)}
              className={`
                absolute inset-0 bg-black/90 backdrop-blur-sm
                transition-opacity duration-300
                ${modalVisible ? "opacity-100" : "opacity-0"}
              `}
            />

            <div
              className={`
                relative w-full max-w-md h-[75vh]
                rounded-3xl overflow-hidden
                bg-primary shadow-2xl
                flex flex-col
                border border-white/20
                transition-all duration-300
                ${
                  modalVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-5 scale-95"
                }
              `}
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={bentoImageSrc(mediaSlug, 1)}
                  alt={offerFeatures[modalDataIndex]?.title ?? ""}
                  fill
                  className="object-cover opacity-30"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/95 to-primary/40" />
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-md border border-white/20"
                aria-label="Fermer"
              >
                ✕
              </button>

              <div className="relative z-10 p-6 flex flex-col h-full justify-end overflow-y-auto pt-20">
                <Heading as="h3" className="text-2xl text-white font-bold mb-4">
                  {offerFeatures[modalDataIndex]?.title}
                </Heading>

                <p className="text-white/90 text-base leading-relaxed">
                  {offerFeatures[modalDataIndex]?.desc}
                </p>
              </div>
            </div>
          </div>
        )}
      </Section>

      {/* =========================================================
          BLOC "EN BREF" (optionnel) - timeline verticale
      ========================================================= */}
      {keyFacts && keyFacts.length > 0 && (
        <Section id="en-bref" className="bg-surface pb-16 md:pb-24">
          <div className="rounded-2xl md:rounded-3xl border border-border bg-background p-6 md:p-10">
            <Heading
              as="h3"
              className="text-foreground text-xl md:text-2xl mb-8 md:mb-10"
            >
              En bref
            </Heading>

            <dl className="relative max-w-2xl space-y-6 md:space-y-8">
              {keyFacts.map((fact, index) => (
                <div
                  key={index}
                  className="relative pl-10 before:content-[''] before:absolute before:left-0 before:top-0 before:w-6 before:h-6 before:rounded-full before:bg-secondary/10 before:border before:border-secondary/40 after:content-[''] after:absolute after:left-[11px] after:top-6 after:bottom-[-1.5rem] after:w-px after:bg-border last:after:hidden"
                >
                  <dt className="text-secondary-strong text-xs font-mono font-bold uppercase tracking-widest">
                    {fact.label}
                  </dt>
                  <dd className="text-foreground text-sm md:text-base leading-relaxed">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>
      )}

      {/* =========================================================
          FORMULES (optionnel)
      ========================================================= */}
      {formulas && (
        <Section id="formules" className="bg-surface pb-16 md:pb-24">
          <div className="text-center max-w-3xl mx-auto space-y-3 md:space-y-4 mb-10 md:mb-14">
            <span className="text-secondary-strong text-xs font-mono font-bold uppercase tracking-widest block">
              {formulas.subtitle}
            </span>
            <Heading as="h2" className="text-foreground text-3xl md:text-4xl">
              {formulas.title}
            </Heading>
            {formulas.description && (
              <Text className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {parseInlineLinks(formulas.description, "formulas-desc")}
              </Text>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
            {formulas.items.map((item, idx) => (
              <FadeIn key={item.title} delay={idx * 0.1}>
                <div
                  className={`
                    h-full flex flex-col gap-5 p-6 md:p-8 rounded-2xl md:rounded-3xl border
                    ${item.highlighted ? "bg-primary border-primary text-white shadow-2xl" : "bg-background border-border"}
                  `}
                >
                  {item.badge && (
                    <span
                      className={`
                        self-start text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full
                        ${item.highlighted ? "bg-secondary text-white" : "bg-secondary/15 text-secondary-strong"}
                      `}
                    >
                      {item.badge}
                    </span>
                  )}
                  <Heading
                    as="h3"
                    emphasis={false}
                    className={`text-2xl md:text-3xl ${item.highlighted ? "text-white" : "text-foreground"}`}
                  >
                    {item.title}
                  </Heading>
                  <Text
                    className={`text-base leading-relaxed ${item.highlighted ? "text-white/80" : "text-muted-foreground"}`}
                  >
                    {item.desc}
                  </Text>
                  {item.points && (
                    <ul className="space-y-2.5">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <CheckIcon />
                          <span
                            className={`text-sm md:text-base leading-relaxed ${item.highlighted ? "text-white/90" : "text-foreground"}`}
                          >
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Button
                    asChild
                    variant={item.highlighted ? "secondary" : "outline"}
                    className={`mt-auto w-full h-auto py-3.5 px-6 text-sm md:text-base font-bold whitespace-normal ${item.highlighted ? "text-white" : ""}`}
                  >
                    <Link href={item.cta.href}>{item.cta.text}</Link>
                  </Button>
                </div>
              </FadeIn>
            ))}
          </div>

          {formulas.note && (
            <Text className="text-muted-foreground text-sm text-center max-w-3xl mx-auto mt-6 md:mt-8">
              {parseInlineLinks(formulas.note, "formulas-note")}
            </Text>
          )}
        </Section>
      )}

      {/* =========================================================
          ETAPES (optionnel)
      ========================================================= */}
      {process && (
        <Section id="etapes" className="bg-surface pb-16 md:pb-24">
          <div className="text-center max-w-3xl mx-auto space-y-3 md:space-y-4 mb-10 md:mb-14">
            <span className="text-secondary-strong text-xs font-mono font-bold uppercase tracking-widest block">
              {process.subtitle}
            </span>
            <Heading as="h2" className="text-foreground text-3xl md:text-4xl">
              {process.title}
            </Heading>
            {process.description && (
              <Text className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {parseInlineLinks(process.description, "process-desc")}
              </Text>
            )}
          </div>

          <ol
            className={`
              grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6
              ${process.steps.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4"}
            `}
          >
            {process.steps.map((step, idx) => (
              <li key={step.title} className="relative h-full flex flex-col gap-3 p-5 md:p-7 rounded-2xl bg-background border border-border">
                  <span className="text-secondary-strong text-xs font-mono font-bold uppercase tracking-widest">
                    Étape {idx + 1}
                  </span>
                  <Heading as="h3" emphasis={false} className="text-foreground text-lg md:text-xl font-bold leading-tight">
                    {step.title}
                  </Heading>
                  <Text className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {step.desc}
                  </Text>
              </li>
            ))}
          </ol>

          {process.cta && (
            <div className="flex justify-center mt-10 md:mt-14">
              <Button
                asChild
                variant="secondary"
                className="text-white h-auto py-3.5 px-6 md:py-4 md:px-8 text-sm md:text-base font-bold"
              >
                <Link href={process.cta.href}>{process.cta.text}</Link>
              </Button>
            </div>
          )}
        </Section>
      )}

      {/* =========================================================
          LOCAL SEO
      ========================================================= */}
      {localSeo && (
        <>
          <WaveDivider
            from="surface"
            to="primary"
            amplitude="low"
            crossing={2}
          />

          <Section id="zone-intervention" className="bg-primary pb-16 md:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-start">
              <div className="space-y-4">
                <span className="text-secondary-soft text-xs font-mono font-bold uppercase tracking-widest block">
                  {localSeo.subtitle}
                </span>

                <Heading as="h2" className="text-white text-3xl md:text-4xl">
                  {localSeo.title}
                </Heading>

                <div className="space-y-3 md:space-y-4">
                  {renderRichText(
                    localSeo.description,
                    "localseo-desc",
                    "text-white/80 text-base md:text-lg leading-relaxed",
                  )}
                </div>

                <Button
                  asChild
                  variant="secondary"
                  className="text-white h-auto py-3.5 px-6 md:py-4 md:px-8 text-sm md:text-base font-bold"
                >
                  <Link href={localSeo.ctaHref}>{localSeo.ctaText}</Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {localSeo.items.map((item) => (
                  <div
                    key={item.title}
                    className="h-full rounded-xl border border-white/20 bg-white/10 p-5 md:p-6"
                  >
                    <Heading
                      as="h3"
                      className="text-white text-lg font-bold mb-2"
                    >
                      {item.title}
                    </Heading>

                    <Text className="text-white/80 text-sm leading-relaxed">
                      {item.desc}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <WaveDivider
            from="primary"
            to="surface"
            amplitude="low"
            crossing={3}
          />
        </>
      )}

      {/* =========================================================
          TRANSITION - BENEFICES
      ========================================================= */}
      <TransitionTitle
        surtitle={benefits.subtitle}
        line1={benefits.transition?.line1 ?? "Vos"}
        line2={benefits.transition?.line2 ?? "Bénéfices"}
      />

      {/* =========================================================
          4. BENEFICES
      ========================================================= */}
      <Section id="benefices" className="bg-surface pb-16 md:pb-32">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <Heading as="h2" className="text-foreground text-3xl md:text-4xl">
            {benefits.title}
          </Heading>
        </div>

        <div className="flex flex-col md:flex-row h-[500px] md:h-[600px] w-full gap-2 md:gap-4">
          {benefits.items.map((benefit, index) => {
            const isActive = activeBenefit === index;

            return (
              <div
                key={index}
                onClick={() => setActiveBenefit(index)}
                style={{
                  flex: isActive ? 12 : 1,
                }}
                className={`
                    relative overflow-hidden
                    cursor-pointer
                    rounded-xl md:rounded-3xl
                    shadow-2xl
                    transition-[flex,border-color,opacity]
                    duration-500
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${
                      isActive
                        ? "border-2 border-secondary"
                        : "border border-border opacity-70 md:opacity-100"
                    }
                  `}
              >
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={`/images/services/${mediaSlug}/benefit-${index + 1}.jpg`}
                    alt={benefit.title}
                    fill
                    sizes="(min-width: 768px) 80vw, 100vw"
                    className="object-cover"
                    fetchPriority={index === 0 ? "high" : "auto"}
                  />

                  <div
                    className={`
                        absolute inset-0
                        bg-gradient-to-t
                        from-primary
                        via-primary/60
                        to-transparent
                        transition-opacity duration-500
                        ${isActive ? "opacity-70" : "opacity-30"}
                      `}
                  />
                </div>

                {/* Numéro vertical */}
                <div
                  className={`
                      absolute inset-0
                      flex items-center justify-center
                      pointer-events-none
                      transition-opacity duration-300
                      ${isActive ? "opacity-0" : "opacity-100"}
                    `}
                >
                  <span className="text-white/60 font-bold text-lg md:text-3xl md:-rotate-90 whitespace-nowrap tracking-widest">
                    0{index + 1}
                  </span>
                </div>

                {/* Contenu actif */}
                <div
                  className={`
                      absolute bottom-3 md:bottom-10
                      left-3 right-3
                      md:left-10 md:right-10
                      z-10
                      transition-all duration-300
                      ${
                        isActive
                          ? "opacity-100 scale-100 delay-100 pointer-events-auto"
                          : "opacity-0 scale-95 pointer-events-none"
                      }
                    `}
                  aria-hidden={!isActive}
                >
                  <div className="backdrop-blur-xl bg-primary/40 md:bg-white/10 border border-white/20 p-4 md:p-8 rounded-lg md:rounded-2xl shadow-2xl max-w-2xl">
                    <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4">
                      <span className="flex items-center justify-center w-6 h-6 md:w-12 md:h-12 rounded-full bg-secondary text-white font-bold text-xs md:text-xl shrink-0">
                        0{index + 1}
                      </span>

                      <Heading
                        as="h3"
                        className="text-lg md:text-3xl font-black text-white tracking-normal line-clamp-1 md:line-clamp-none"
                      >
                        {benefit.title}
                      </Heading>
                    </div>

                    <Text className="text-white/90 text-xs md:text-base leading-relaxed line-clamp-2 md:line-clamp-none">
                      {benefit.desc}
                    </Text>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* =========================================================
          INCIDENT RESPONSE
      ========================================================= */}
      {incidentResponse && (
        <>
          <TransitionTitle
            surtitle={incidentResponse.surtitle}
            line1="Réponse à"
            line2="incident"
          />

          <Section id="incident-response" className="bg-surface pb-16 md:pb-24">
            <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16 space-y-4">
              <Heading as="h2" className="text-foreground text-3xl md:text-4xl">
                {incidentResponse.title}
              </Heading>

              <Text className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {incidentResponse.intro}
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-14">
              {incidentResponse.items.map((item, idx) => (
                <FadeIn key={idx} delay={idx * 0.08}>
                  <div className="h-full flex flex-col gap-3 p-5 md:p-7 rounded-2xl bg-background border border-border hover:border-secondary/40 hover:bg-surface-strong transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <span className="shrink-0 w-7 h-7 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center text-secondary-strong font-bold text-xs">
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      <Heading
                        as="h3"
                        className="text-foreground text-base md:text-lg font-bold leading-tight"
                      >
                        {item.title}
                      </Heading>
                    </div>

                    <Text className="text-muted-foreground text-sm leading-relaxed">
                      {item.desc}
                    </Text>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                variant="secondary"
                className="text-white h-auto py-3.5 px-6 md:py-4 md:px-8 text-sm md:text-base font-bold"
              >
                <Link href={incidentResponse.ctaHref}>{incidentResponse.ctaLabel}</Link>
              </Button>

              <Link
                href={incidentResponse.planHref}
                className="text-secondary-strong text-sm md:text-base hover:underline transition-colors"
              >
                Voir notre méthodologie complète en 8 étapes
              </Link>
            </div>
          </Section>
        </>
      )}

      {/* =========================================================
          EXPERTISE
      ========================================================= */}
      {expertise && (
        <Section
          id="expertise"
          container={false}
          className="relative overflow-hidden bg-surface pb-16 md:pb-24 pt-12 md:pt-16"
        >
          <Container className="relative z-10 max-w-3xl mx-auto">
            <div className="text-center mb-8 md:mb-10">
              <span className="text-secondary-strong text-xs font-mono font-bold uppercase tracking-widest block mb-2">
                {expertise.surtitle}
              </span>

              <Heading as="h2" className="text-foreground text-3xl md:text-4xl">
                {expertise.title}
              </Heading>
            </div>

            <Text className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 text-center">
              {expertise.intro}
            </Text>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {expertise.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-5 rounded-2xl bg-background border border-border hover:border-secondary/40 hover:bg-surface-strong transition-all duration-300"
                >
                  <span className="shrink-0 w-6 h-6 mt-0.5 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-secondary-strong"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>

                  <Text className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {item}
                  </Text>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* =========================================================
          CAS CLIENT (optionnel)
      ========================================================= */}
      {caseStudy && (
        <Section id="cas-client" className="bg-surface pb-16 md:pb-24">
          <div className="rounded-2xl md:rounded-3xl bg-primary text-white overflow-hidden">
            <div
              className={`grid grid-cols-1 ${caseStudy.stats.length > 1 ? "lg:grid-cols-[1.1fr_0.9fr]" : ""}`}
            >
              <div
                className={`p-6 md:p-10 lg:p-12 space-y-5 ${caseStudy.stats.length > 1 ? "" : "max-w-4xl"}`}
              >
                <span className="text-secondary-soft text-xs font-mono font-bold uppercase tracking-widest block">
                  {caseStudy.surtitle}
                </span>
                <Heading as="h2" className="text-white text-2xl md:text-4xl">
                  {caseStudy.title}
                </Heading>
                <div className="space-y-3">
                  {renderRichText(
                    caseStudy.context,
                    "case-context",
                    "text-white/80 text-base md:text-lg leading-relaxed",
                  )}
                </div>
                <ul className="space-y-2.5">
                  {caseStudy.results.map((result) => (
                    <li key={result} className="flex items-start gap-3">
                      <span className="shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-secondary-soft" />
                      <span className="text-white/90 text-sm md:text-base leading-relaxed">
                        {result}
                      </span>
                    </li>
                  ))}
                </ul>
                {caseStudy.conclusion && (
                  <Text className="text-white/80 text-sm md:text-base leading-relaxed">
                    {caseStudy.conclusion}
                  </Text>
                )}
                <Button
                  asChild
                  variant="secondary"
                  className="text-white h-auto py-3.5 px-6 md:py-4 md:px-8 text-sm md:text-base font-bold"
                >
                  <Link href={caseStudy.cta.href}>{caseStudy.cta.text}</Link>
                </Button>
                {caseStudy.note && (
                  <Text className="text-white/60 text-xs md:text-sm">
                    {caseStudy.note}
                  </Text>
                )}
              </div>

              <dl
                className={`order-first grid gap-px bg-white/10 border-b border-white/10 ${
                  caseStudy.stats.length > 1
                    ? "grid-cols-3 lg:order-none lg:grid-cols-1 lg:border-b-0 lg:border-l"
                    : "grid-cols-1"
                }`}>
                {caseStudy.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={`bg-primary p-4 md:p-8 flex justify-center gap-1 ${
                      caseStudy.stats.length > 1
                        ? "flex-col"
                        : "flex-col sm:flex-row sm:items-center sm:justify-start sm:gap-6 md:px-10 lg:px-12"
                    }`}
                  >
                    <dt className="order-2 text-white/70 text-xs md:text-base">
                      {stat.label}
                    </dt>
                    <dd className="order-1 text-secondary-soft text-2xl md:text-5xl font-black">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Section>
      )}

      {/* =========================================================
          5. CTA FINAL
      ========================================================= */}
      <FinalCTA
        line1={cta.line1}
        line2={cta.line2}
        line3={cta.line3}
        description={renderRichText(
          cta.description,
          "cta-desc",
          "text-white/70 text-base md:text-xl font-light",
        )}
        ctaLabel={cta.buttonText}
        ctaHref={cta.buttonHref}
      />

      {/* =========================================================
          6. FAQ
      ========================================================= */}
      <Section
        id="faq"
        container={false}
        className="relative overflow-hidden bg-primary pb-16 md:pb-24 pt-12 md:pt-16"
      >
        <SectionFade edge="both" />

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 md:mb-10 text-center">
              <span className="text-secondary-soft text-xs font-mono font-bold uppercase tracking-widest block mb-2">
                Des réponses à vos interrogations
              </span>

              <Heading as="h2" className="text-white text-3xl md:text-4xl">
                Questions Fréquentes
              </Heading>
            </div>

            <div className="space-y-2 md:space-y-3">
              {faq.map((item, index) => {
                const isOpen = openFaqIndex === index;

                return (
                  <div
                    key={index}
                    className="bg-white/[0.02] border border-white/10 rounded-lg md:rounded-xl overflow-hidden transition-colors hover:border-white/20"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full px-4 md:px-6 py-4 md:py-5 text-left flex justify-between items-center gap-3 md:gap-4 group"
                      aria-expanded={isOpen}
                    >
                      <span className="font-bold text-white/90 text-sm md:text-base group-hover:text-white transition-colors">
                        {item.question}
                      </span>

                      <span
                        className={`
                          text-secondary-strong
                          font-mono font-black
                          text-lg md:text-xl
                          transition-transform duration-300
                          shrink-0
                          ${isOpen ? "rotate-45" : ""}
                        `}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div
                        className={`overflow-hidden transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
                      >
                        <div className="px-4 md:px-6 pb-4 md:pb-5 pt-0">
                          <div className="border-t border-white/5 pt-3 md:pt-4 space-y-3 [&_a]:text-secondary-soft">
                            {renderRichText(
                              item.answer,
                              `faq-${index}`,
                              "text-white/70 text-sm md:text-base leading-relaxed",
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
