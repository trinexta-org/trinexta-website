import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/ui/FadeIn";

export function ContactMap() {
  return (
    <Section
      className="
        relative
        overflow-hidden
        bg-surface
        pb-24
        pt-12
      "
    >
      <Container>
        <FadeIn direction="up">
          <div
            className="
              group
              relative
              h-[500px]
              w-full
              overflow-hidden
              rounded-[2rem]
              border
              border-primary/10
              bg-surface-strong
              shadow-xl
            "
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2636.5681289191986!2d2.428456!3d48.630043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e5e34771e72a4d%3A0xc3f58ea9c1a0c4f6!2s7%20Rue%20Montespan%2C%2091000%20%C3%89vry-Courcouronnes!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Localisation des bureaux de Trinexta à Évry-Courcouronnes"
              className="
                grayscale-[60%]
                transition-all
                duration-700
                group-hover:grayscale-0
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                rounded-[2rem]
                shadow-[inset_0_0_40px_rgba(0,0,0,0.2)]
              "
            />
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}