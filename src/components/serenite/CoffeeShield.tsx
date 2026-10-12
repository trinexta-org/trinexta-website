import Image from "next/image"
import { cn } from "@/lib/utils"

// Tasse dont la vapeur dessine un bouclier : visuel de l'offre Sérénité Essentielle.
// Pensé pour un fond sombre (bg-primary, hero vidéo). Décoratif : le texte voisin porte le message.
// Image détourée (fond transparent) ; seul le halo derrière est animé.
export function CoffeeShield({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("relative", className)}>
      <div className="absolute inset-[15%] rounded-full bg-secondary/30 blur-3xl motion-safe:animate-pulse" />
      <Image
        src="/images/serenite/coffee-shield.webp"
        width={600}
        height={651}
        alt=""
        sizes="(min-width: 1024px) 340px, 240px"
        className="relative h-auto w-full"
      />
    </div>
  )
}
