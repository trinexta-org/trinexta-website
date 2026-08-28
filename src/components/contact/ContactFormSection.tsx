"use client";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import ContactForm from "@/components/contact/ContactForm";

export function ContactFormSection() {
  return (
    <Section
      container={false}
      id="formulaire"
      className="
        relative
        overflow-hidden
        bg-surface
        py-20
        md:py-28
        lg:py-32
      "
    >
      <Container className="relative z-10">
        <FadeIn direction="up">
          <div
            className="
              mx-auto
              w-full
              max-w-4xl
              rounded-[2.5rem]
              border
              border-primary/10
              bg-surface-strong
              p-6
              shadow-xl
              sm:p-10
              md:p-12
              lg:p-16
            "
          >
            <ContactForm />
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}