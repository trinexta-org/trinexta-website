import Link from "next/link"
import Image from "next/image"
import { Phone, Mail } from "lucide-react"
import { Nav } from "./Nav"
import { MobileMenu } from "./MobileMenu"
import { Container } from "./Container" 

export function Header() {
  return (
    <header className="sticky top-0 z-40">
      <div className="hidden lg:block bg-[#0a233e] text-white">
        <Container>
          <div className="flex items-center justify-end h-10 gap-6">
            <a href="tel:0978250746" className="flex items-center gap-2 text-xs font-medium hover:text-[#5c92b8] transition-colors">
              <Phone className="h-3.5 w-3.5 stroke-[1.5]" />
              <span>09 78 25 07 46</span>
            </a>
            <a href="mailto:contact@trinexta.com" className="flex items-center gap-2 text-xs font-medium hover:text-[#5c92b8] transition-colors">
              <Mail className="h-3.5 w-3.5 stroke-[1.5]" />
              <span>contact@trinexta.com</span>
            </a>
            
            <div className="h-4 w-px bg-white/20 mx-2" />
            
            <span aria-disabled="true" className="text-xs font-bold px-4 py-1.5 rounded-lg border border-white/10 text-white/40 cursor-not-allowed">
              Espace client
            </span>
            <span aria-disabled="true" className="text-xs font-bold px-4 py-1.5 rounded-lg bg-white/5 text-white/40 cursor-not-allowed">
              Rejoignez-nous
            </span>
          </div>
        </Container>
      </div>

      <nav className="bg-white border-b border-gray-100 shadow-sm relative z-40">
        <Container> 
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/trinexta-logo.png" 
                alt="Logo TRINEXTA"
                width={200} 
                height={60} 
                className="h-10 lg:h-12 w-auto object-contain"
                priority 
              />
            </Link>

            <Nav />
            <MobileMenu />
          </div>
        </Container>
      </nav>
    </header>
  )
}