import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/ui/FadeIn";

export function ContactMap() {
  return (
    <Section dark className="pb-24 pt-12">
      <Container>
        <FadeIn direction="up">
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-lg group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2636.5681289191986!2d2.428456!3d48.630043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e5e34771e72a4d%3A0xc3f58ea9c1a0c4f6!2s7%20Rue%20Montespan%2C%2091000%20%C3%89vry-Courcouronnes!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Localisation des bureaux de Trinexta à Évry-Courcouronnes"
              className="transition-all duration-700 grayscale-[60%] group-hover:grayscale-0"
            />
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.3)] rounded-2xl" />
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}