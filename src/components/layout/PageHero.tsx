import Image from "next/image"
import { Container } from "@/components/layout/Container"
import { ViewportHero } from "@/components/layout/ViewportHero"
import { Heading } from "@/components/ui/Typography"

interface PageHeroProps {
  title: string
  imageSrc: string
}

export function PageHero({ title, imageSrc }: PageHeroProps) {
  return (
    <ViewportHero>
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={`Fond de la page ${title}`}
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-primary/90" />
      </div>

      <Container className="relative z-10 py-12 md:py-16 lg:py-20">
        <div className="max-w-4xl">
          <Heading
            as="h1"
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-tight text-white drop-shadow-xl"
          >
            {title}
          </Heading>
        </div>
      </Container>
    </ViewportHero>
  )
}
