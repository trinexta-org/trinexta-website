"use client";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionFade } from "@/components/ui/SectionFade";
import { FadeIn } from "@/components/ui/FadeIn";
import ContactForm from "@/components/contact/ContactForm";

export function ContactFormSection() {
  return (
    <Section container={false} id="formulaire" dark className="py-24 md:py-32">
      <SectionFade edge="both" />

      <Container className="relative z-10">
        <FadeIn direction="up">
          <div className="max-w-4xl mx-auto p-6 sm:p-10 md:p-12 lg:p-16 rounded-[2.5rem] border border-white/10 shadow-2xl bg-white/5 backdrop-blur-md">
            <ContactForm />
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}