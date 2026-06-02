import Image from "next/image"
import { Container } from "@/components/layout/Container"
import { Heading } from "@/components/ui/Typography"

interface PageHeroProps {
  title: string
  imageSrc: string
}

export function PageHero({ title, imageSrc }: PageHeroProps) {
  return (
    <section className="relative h-[40vh] min-h-[350px] md:min-h-[450px] flex items-center justify-center overflow-hidden">
      <Image
        src={imageSrc}
        alt={`Fond de la page ${title}`}
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-primary/70" />
      <Container className="relative z-10 text-center mt-12">
        <Heading 
          as="h1" 
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tighter"
        >
          {title}
        </Heading>
      </Container>
    </section>
  )
}