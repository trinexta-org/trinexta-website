import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { SectionBackground } from "@/components/ui/SectionBackground"
const certifications = [
  {
    name: "CompTIA A+",
    domain: "Infrastructure & support technique",
    src: "/images/certifications/compteia.webp",
    width: 320,
    height: 266,
  },
  {
    name: "CompTIA Security+",
    domain: "Cybersécurité & protection réseau",
    src: "/images/certifications/comptia-security.webp",
    width: 320,
    height: 320,
  },
  {
    name: "ISO 27001",
    domain: "Gestion de la sécurité de l'information",
    src: "/images/certifications/iso-27001.webp",
    width: 320,
    height: 311,
  },
  {
    name: "ITIL 4",
    domain: "Gestion des services informatiques",
    src: "/images/certifications/itil.webp",
    width: 320,
    height: 213,
  },
  {
    name: "Microsoft 365",
    domain: "Administration & cloud Microsoft",
    src: "/images/certifications/microsoft365.webp",
    width: 320,
    height: 320,
  },
];

export function ReassuranceSection() {
  return (
    <Section container={false} className="py-16 md:py-24 bg-surface relative overflow-hidden">
      <SectionBackground tone="light" />
      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center gap-6 mb-16">
          <p className="text-sm md:text-base font-bold tracking-[0.25em] uppercase text-secondary-strong-strong">
            Certifications &amp; accréditations
          </p>
          <Heading
            as="h2"
            className="text-4xl md:text-6xl text-primary tracking-normal leading-[0.95]"
          >
            Une expertise reconnue <br className="hidden md:block" />
            et <span className="text-secondary-strong">certifiée</span>
          </Heading>
          <div className="w-20 md:w-32 h-1.5 md:h-2 rounded-full bg-secondary mt-6 md:mt-8 shadow-[0_0_20px_rgba(92,146,184,0.5)]" />
          <Text className="text-muted-foreground max-w-xl text-base md:text-lg leading-relaxed">
            Nos équipes maintiennent leurs certifications à jour pour garantir la fiabilité
            et la sécurité de chaque intervention.
          </Text>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-7">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="group relative flex flex-col items-center text-center gap-5 rounded-2xl bg-white border border-border p-7 pt-10 shadow-[0_4px_20px_rgba(10,35,62,0.06)] hover:shadow-[0_20px_45px_rgba(10,35,62,0.14)] hover:-translate-y-1.5 hover:border-secondary/30 transition-all duration-500 overflow-hidden"
            >
              {/* Liseré supérieur qui se révèle au survol */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary/0 via-secondary to-secondary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

              {/* Halo doux derrière le logo */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-secondary/0 group-hover:bg-secondary/10 blur-2xl transition-colors duration-500" />

              <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full p-[2px] bg-gradient-to-br from-secondary/30 via-border to-border group-hover:from-secondary group-hover:via-secondary/40 group-hover:to-border transition-all duration-500">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <Image
                    src={cert.src}
                    alt={cert.name}
                    width={cert.width}
                    height={cert.height}
                    className="w-[72%] h-[72%] object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="relative flex flex-col gap-2">
                <span className="text-lg md:text-xl font-bold text-primary">{cert.name}</span>
                <span className="text-sm md:text-base text-muted-foreground leading-snug">
                  {cert.domain}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}