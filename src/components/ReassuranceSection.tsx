import Image from "next/image"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { SectionFade } from "@/components/ui/SectionFade"

const certifications = [
  { name: "CompTIA", src: "/images/certifications/compteia.webp", width: 320, height: 266 },
  { name: "CompTIA Security+", src: "/images/certifications/comptia-security.webp", width: 320, height: 320 },
  { name: "ISO 27001", src: "/images/certifications/iso-27001.webp", width: 320, height: 311 },
  { name: "ITIL", src: "/images/certifications/itil.webp", width: 320, height: 213 },
  { name: "Microsoft 365", src: "/images/certifications/microsoft365.webp", width: 320, height: 320 },
]

export function ReassuranceSection() {
  return (
    <Section container={false} className="py-10 md:py-14 bg-primary relative overflow-hidden">
      <SectionFade edge="bottom" />
      <Container className="relative z-10">
        <div className="flex flex-col items-center justify-center gap-10 text-center">

          <div className="w-full border-t border-white/10 pt-8 mt-2">
            <p className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-8">
              Certifications &amp; accréditations
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {certifications.map((cert) => (
                <div key={cert.name} className="flex flex-col items-center gap-3">
                  <div className="w-36 h-36 md:w-48 md:h-48 rounded-2xl bg-white flex items-center justify-center overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.4)]">
                    <Image
                      src={cert.src}
                      alt={cert.name}
                      width={cert.width}
                      height={cert.height}
                      className="w-[80%] h-[80%] object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-white/40">
                    {cert.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </Section>
  )
}