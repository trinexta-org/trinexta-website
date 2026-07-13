import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, Search } from "lucide-react"
import { Nav } from "./Nav"
import { MobileMenu } from "./MobileMenu"
import { Container } from "./Container"
import { Button } from "@/components/ui/Button"

export function Header() {
  return (
    <header className="sticky top-0 z-40">
      <div className="hidden lg:block bg-primary text-white">
        <Container>
          <div className="flex items-center justify-end h-10 gap-6">
            <Link href="/audit-seo" className="flex items-center gap-1.5 rounded-full bg-secondary text-secondary-foreground pl-2.5 pr-3 py-1 text-xs font-bold hover:bg-secondary/90 transition-colors">
              <Search className="h-3.5 w-3.5 stroke-[1.5]" />
              <span>Audit SEO gratuit</span>
            </Link>
            <a href="tel:0978250746" className="flex items-center gap-2 text-xs font-medium hover:text-secondary transition-colors">
              <Phone className="h-3.5 w-3.5 stroke-[1.5]" />
              <span>09 78 25 07 46</span>
            </a>
            <a href="mailto:contact@trinexta.fr" className="flex items-center gap-2 text-xs font-medium hover:text-secondary transition-colors">
              <Mail className="h-3.5 w-3.5 stroke-[1.5]" />
              <span>contact@trinexta.fr</span>
            </a>
          </div>
        </Container>
      </div>

      <nav className="bg-white border-b border-border shadow-sm relative z-40">
        <Container> 
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/trinexta-logo.avif" 
                alt="Logo TRINEXTA"
                width={200} 
                height={60}
                unoptimized
                className="h-10 lg:h-12 w-auto object-contain"
              />
            </Link>

            <Nav />

            <Button asChild variant="secondary" size="sm" className="hidden lg:inline-flex font-bold">
              <Link href="/estimation">Estimer mon projet</Link>
            </Button>

            <MobileMenu />
          </div>
        </Container>
      </nav>
    </header>
  )
}