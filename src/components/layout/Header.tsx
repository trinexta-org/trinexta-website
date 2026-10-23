import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, Clock, ShieldAlert } from "lucide-react"
import { Nav } from "./Nav"
import { MobileMenu } from "./MobileMenu"
import { Container } from "./Container"
import { HeaderCta } from "./HeaderCta"

export function Header() {
  return (
    <header className="sticky top-0 z-40">
      <div className="hidden lg:block bg-primary text-white">
        <Container>
          <div className="flex items-center justify-end h-10 gap-6">
            <a href="tel:+33978250746" className="flex items-center gap-2 text-xs font-medium hover:text-secondary-strong transition-colors">
              <Phone className="h-3.5 w-3.5 stroke-[1.5]" />
              <span>09 78 25 07 46</span>
            </a>
            <span className="flex items-center gap-2 text-xs font-medium">
              <Clock className="h-3.5 w-3.5 stroke-[1.5]" />
              <span>Support du lundi au vendredi, 8 h 30-19 h</span>
            </span>
            <a href="mailto:contact@trinexta.fr" className="flex items-center gap-2 text-xs font-medium hover:text-secondary-strong transition-colors">
              <Mail className="h-3.5 w-3.5 stroke-[1.5]" />
              <span>contact@trinexta.fr</span>
            </a>
            <Link href="/charte-assistance" className="flex items-center gap-1.5 rounded-full bg-secondary text-secondary-strong-foreground pl-2.5 pr-3 py-1 text-xs font-bold hover:bg-secondary/90 transition-colors">
              <ShieldAlert className="h-3.5 w-3.5 stroke-[1.5]" />
              <span>Urgence cyber</span>
            </Link>
          </div>
        </Container>
      </div>

      <nav className="bg-white border-b border-border shadow-sm relative z-40">
        <Container>
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/trinexta-logo.avif"
                alt="TRINEXTA, accueil"
                width={200}
                height={60}
                unoptimized
                className="h-10 lg:h-12 w-auto object-contain"
              />
            </Link>

            <Nav />

            <div className="flex items-center gap-3">
              <Link
                href="/charte-assistance"
                aria-label="Urgence cyber : ordinateur ou compte piraté"
                className="flex items-center gap-1.5 rounded-full bg-secondary text-secondary-foreground pl-2.5 pr-3 py-1.5 text-xs font-bold hover:bg-secondary/90 transition-colors lg:hidden"
              >
                <ShieldAlert className="h-3.5 w-3.5 stroke-[1.5]" />
                <span className="hidden sm:inline">Urgence cyber</span>
              </Link>

              <a
                href="tel:+33978250746"
                aria-label="Appeler TRINEXTA au 09 78 25 07 46"
                className="flex items-center justify-center h-9 w-9 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors lg:hidden"
              >
                <Phone className="h-4 w-4 stroke-[1.75]" />
              </a>

              <HeaderCta />

              <MobileMenu />
            </div>
          </div>
        </Container>
      </nav>
    </header>
  )
}