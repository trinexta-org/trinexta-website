"use client";

import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Typography";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Infogérance",
    description:
      "**Pilotez** votre croissance, on gère le reste. Notre équipe assure une **maintenance proactive**, une supervision **24/7** de votre parc informatique et une gestion complète de votre matériel et de vos logiciels, pour que les pannes n'interrompent plus jamais votre activité.",
    image: "/images/services/infogerance.avif",
    fillDir: "ltr",
    alt: "Techniciennes IT Trinexta inspectant une baie de serveurs pour assurer la supervision et l'infogérance d'une PME.",
  },
  {
    id: 2,
    title: "Support",
    description:
      "Une **assistance illimitée** pour vos équipes, disponible quand vous en avez besoin. Nos techniciens résolvent vos incidents **à distance** en quelques minutes ou interviennent rapidement **sur site** lorsque la situation l'exige, sans facturation surprise.",
    image: "/images/services/support.avif",
    fillDir: "rtl",
    alt: "Téléphone classique symbolisant l'assistance informatique illimitée et le support technique réactif proposés par Trinexta.",
  },
  {
    id: 3,
    title: "Cybersécurité",
    description:
      "**Blindez** vos systèmes face aux menaces actuelles grâce à des **audits de sécurité** réguliers, un EDR nouvelle génération et une protection anti-ransomware éprouvée. Vos données restent protégées par des **sauvegardes immuables**, même en cas d'attaque.",
    image: "/images/services/cybersecurite.avif",
    fillDir: "ltr",
    alt: "Expert en cybersécurité analysant les données sur un ordinateur portable pour protéger le réseau informatique d'une entreprise.",
  },
  {
    id: 4,
    title: "Cloud",
    description:
      "**Modernisez** votre infrastructure sans les contraintes du matériel physique. Nous mettons en place un hébergement souverain, des serveurs dédiés et un **Plan de Reprise d'Activité (PRA)** hautement disponible pour garantir la continuité de votre activité en toutes circonstances.",
    image: "/images/services/cloud.avif",
    fillDir: "rtl",
    alt: "",
  },
  {
    id: 5,
    title: "Microsoft 365",
    description:
      "**Collaborez** sans limite avec une suite Microsoft parfaitement configurée. Nous assurons une migration sans coupure, la sécurisation complète de vos tenants et une **optimisation de vos licences** pour ne payer que ce dont vos équipes ont réellement besoin.",
    image: "/images/services/microsoft.avif",
    fillDir: "ltr",
    alt: "",
  },
  {
    id: 6,
    title: "Solutions Métier",
    description:
      "Des outils qui épousent vos **processus** plutôt que l'inverse. Téléphonie VoIP, réseaux multisites, intégration de **logiciels spécialisés** : nous adaptons chaque solution à la réalité de votre métier pour gagner en efficacité au quotidien.",
    image: "/images/services/solutions.avif",
    fillDir: "rtl",
    alt: "",
  },
];

const getServiceUrl = (title: string) => {
  const map: Record<string, string> = {
    Infogérance: "/infogerance",
    Support: "/support-informatique",
    Cybersécurité: "/cybersecurite",
    Cloud: "/cloud-sauvegarde",
    "Microsoft 365": "/microsoft-365",
    "Solutions Métier": "/solutions-metier",
  };
  return map[title] || "/nos-offres";
};

function CharteFormattedText({ children }: { children: string }) {
  const parts = children.split(/(\*\*.*?\*\*)/g);
  return (
    <p className="text-foreground/70 text-sm md:text-base leading-relaxed mb-6 md:mb-8">
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className="text-secondary font-bold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      })}
    </p>
  );
}

function AnimatedArrow({ direction }: { direction: string }) {
  return (
    <div className="relative w-4 h-4 md:w-5 md:h-5 ml-3 flex-shrink-0">
      <ArrowRight className="w-full h-full text-foreground/15 absolute inset-0" />
      <div
        className={`absolute inset-0 text-secondary ${direction === "ltr" ? "animate-arrow-fill-ltr" : "animate-arrow-fill-rtl"}`}
      >
        <ArrowRight className="w-full h-full" />
      </div>
    </div>
  );
}
function ServiceSlide({
  service,
  index,
  onPrev,
  onNext,
}: {
  service: (typeof services)[number];
  index: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const imageFirst = service.fillDir === "ltr";

  return (
    <div
      className="h-screen w-screen flex-shrink-0 snap-start flex items-start justify-center pt-12 md:pt-20 px-4 md:px-8"
      style={{ scrollSnapAlign: "start" }}
    >
      <div className="relative w-full max-w-[1500px] mx-auto">
        <div
          className={`relative z-10 p-6 md:p-10 pt-24 md:pt-32 bg-surface-strong rounded-[48px] shadow-2xl flex flex-col ${imageFirst ? "md:flex-row" : "md:flex-row-reverse"} items-center md:items-start gap-6 md:gap-12`}
        >
          <div className="relative z-20 w-full md:w-[55%] -mt-32 md:-mt-48 rounded-[32px] overflow-hidden shadow-xl flex-shrink-0">
            <div className="relative w-full h-[340px] md:h-[520px]">
              <Image
                src={service.image}
                alt={service.alt}
                fill
                sizes="(min-width: 768px) 55vw, 90vw"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          </div>

          <div className="relative z-10 w-full p-6 md:p-8 self-stretch flex flex-col justify-center">
            <span className="text-secondary text-xs md:text-sm font-bold tracking-widest uppercase mb-3 block">
              0{index + 1} / 0{services.length}
            </span>

            <Heading
              as="h3"
              className="text-2xl md:text-3xl xl:text-5xl text-foreground mb-4 tracking-tight font-extrabold"
            >
              {service.title}
            </Heading>

            <CharteFormattedText>{service.description}</CharteFormattedText>

            <Link
              href={getServiceUrl(service.title)}
              className="flex items-center w-fit group mt-auto hover:gap-4 transition-all duration-300"
            >
              <span className="text-sm font-bold text-foreground uppercase tracking-wider">
                Découvrir
              </span>
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Flèches sous la carte : mobile uniquement */}
        <div className="flex md:hidden justify-center items-center gap-4 mt-6">
          <button
            onClick={onPrev}
            aria-label="Service précédent"
            className="w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm shadow-xl flex items-center justify-center hover:bg-secondary transition-all duration-300 group"
          >
            <ChevronLeft className="w-5 h-5 text-foreground group-hover:text-white transition-colors" />
          </button>
          <button
            onClick={onNext}
            aria-label="Service suivant"
            className="w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm shadow-xl flex items-center justify-center hover:bg-secondary transition-all duration-300 group"
          >
            <ChevronRight className="w-5 h-5 text-foreground group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}
export function ServicesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = (index: number) => {
    if (!scrollContainerRef.current) return;
    const newIndex = (index + services.length) % services.length;
    setCurrentIndex(newIndex);

    const scrollWidth = scrollContainerRef.current.clientWidth;
    scrollContainerRef.current.scrollTo({
      left: newIndex * scrollWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex]);

  const handleManualNav = (direction: "prev" | "next") => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    goToSlide(direction === "prev" ? currentIndex - 1 : currentIndex + 1);
  };

  return (
    <Section
      container={false}
      className="relative bg-surface overflow-hidden py-0"
    >
      <div
        ref={scrollContainerRef}
        className="relative h-screen overflow-x-scroll overflow-y-hidden snap-x snap-mandatory scroll-smooth flex no-scrollbar"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {services.map((service, index) => (
          <ServiceSlide
            key={service.id}
            service={service}
            index={index}
            onPrev={() => handleManualNav("prev")}
            onNext={() => handleManualNav("next")}
          />
        ))}
      </div>

      {/* Flèches flottantes : desktop uniquement */}
      <button
        onClick={() => handleManualNav("prev")}
        aria-label="Service précédent"
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-background/90 backdrop-blur-sm shadow-xl items-center justify-center hover:bg-secondary hover:scale-105 transition-all duration-300 group"
      >
        <ChevronLeft className="w-6 h-6 text-foreground group-hover:text-white transition-colors" />
      </button>

      <button
        onClick={() => handleManualNav("next")}
        aria-label="Service suivant"
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-background/90 backdrop-blur-sm shadow-xl items-center justify-center hover:bg-secondary hover:scale-105 transition-all duration-300 group"
      >
        <ChevronRight className="w-6 h-6 text-foreground group-hover:text-white transition-colors" />
      </button>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </Section>
  );
}