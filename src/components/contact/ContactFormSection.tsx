"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import ContactForm from "@/components/contact/ContactForm";

export function ContactFormSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], 
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <Section container={false} id="formulaire" className="relative bg-primary py-24 md:py-32 overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 z-0">
        <motion.div
          style={{ y }}
          className="absolute top-[-20%] left-0 w-full h-[140%] z-0 pointer-events-none"
        >
          <Image
            src="/images/contact/form-bg.jpg"
            alt="Contactez Trinexta"
            fill
            className="object-cover"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-primary/70 backdrop-blur-sm z-0 pointer-events-none" />
      </div>

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