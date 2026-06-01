import Link from "next/link"
import { Container } from "./Container" 
import { FacebookIcon } from "@/components/ui/icons/FacebookIcon"
import { LinkedinIcon } from "@/components/ui/icons/LinkedinIcon"
import { InstagramIcon } from "@/components/ui/icons/InstagramIcon" 
import { TiktokIcon } from "@/components/ui/icons/TiktokIcon"

const NAVIGATION = [
  { name: "Accueil", href: "/" },
  { name: "Tarifs", href: "/nos-offres" }, 
  { name: "Cas clients", href: "/cas-clients" },
  { name: "Blog Expertise", href: "/blog" }
]

const SERVICES = [
  { name: "Infogérance PME", href: "/infogerance" }, 
  { name: "Support informatique", href: "/support-informatique" }, 
  { name: "Cybersécurité 360°", href: "/cybersecurite" }, 
  { name: "Cloud & Sauvegarde", href: "/cloud-sauvegarde" }, 
  { name: "Microsoft 365", href: "/microsoft-365" }, 
  { name: "Solutions métier", href: "/solutions-metier" }
]

const LEGAL = [
  { name: "Mentions légales", href: "/mentions-legales" },
  { name: "CGV / CGS", href: "/cgv" },
  { name: "Données personnelles", href: "/confidentialite" },
  { name: "Gestion des cookies", href: "/cookies" }
]

const PARTNERS = ["Microsoft", "Google", "Sophos", "Bitdefender", "OVH"]

export function Footer() {
  const currentYear = new Date().getFullYear()

  const desktopHover = "text-white/70 hover:text-secondary text-[13px] transition-colors duration-300"
  const desktopTitle = "text-white font-black uppercase tracking-[0.2em] text-[11px] mb-8 block"

  const mobileHover = "text-white/70 hover:text-secondary text-[8.5px] sm:text-[10px] block transition-colors leading-snug break-words"
  const mobileTitle = "text-white font-bold uppercase text-[8px] sm:text-[9px] mb-3 block"

  return (
    <footer className="bg-primary relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        
        {/* --- VERSION GRAND ÉCRAN --- */}
        <div className="hidden lg:block pt-20 pb-10">
          <div className="grid grid-cols-5 gap-12 mb-8">
            <div className="space-y-8">
              <Link href="/" className="group block">
                <span className="text-white font-black uppercase tracking-tighter text-3xl block leading-none">Trinexta</span>
                <span className="text-secondary text-[9px] font-bold uppercase tracking-[0.4em] block mt-1">By Trustech IT Support</span>
              </Link>
              <div className="space-y-5">
                <p className="text-white/70 text-[13px] leading-relaxed">Votre informatique simplifiée, en toute sérénité. <br />Expertise, Proximité, Réactivité.</p>
              </div>
            </div>

            <div>
              <span className={desktopTitle}>Navigation</span>
              <ul className="flex flex-col gap-3.5">
                {NAVIGATION.map((item) => (
                  <li key={item.name}><Link href={item.href} className={desktopHover}>{item.name}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <span className={desktopTitle}>Nos Services</span>
              <ul className="flex flex-col gap-3.5">
                {SERVICES.map((item) => (
                  <li key={item.name}><Link href={item.href} className={desktopHover}>{item.name}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <span className={desktopTitle}>Légal</span>
              <ul className="flex flex-col gap-3.5">
                {LEGAL.map((item) => (
                  <li key={item.name}><Link href={item.href} className={desktopHover}>{item.name}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <span className={desktopTitle}>Contact</span>
              <div className="space-y-6">
                <div className="group"><span className="block text-[9px] text-secondary font-bold uppercase mb-1.5">Bureau d&apos;activité</span><span className="text-white/70 text-[13px]">7 Rue Montespan, 91000 EVRY COURCOURONNES</span></div>
                <div className="group"><span className="block text-[9px] text-secondary font-bold uppercase mb-1.5">Assistance</span><a href="tel:0978250746" className="text-white/70 hover:text-secondary text-[13px] block transition-colors">09 78 25 07 46</a></div>
                <div className="group"><span className="block text-[9px] text-secondary font-bold uppercase mb-1.5">Email</span><a href="mailto:contact@trinexta.fr" className="text-white/70 hover:text-secondary text-[13px] block transition-colors">contact@trinexta.fr</a></div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex justify-between items-center">
            <div className="flex gap-8">
              {PARTNERS.map((p) => (
                <span key={p} className="text-[10px] text-white/20 font-black uppercase tracking-[0.2em] hover:text-white/60 transition-colors cursor-default">
                  {p}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/company/trinexta/" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-secondary transition-all transform hover:-translate-y-1">
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/trinexta/" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-secondary transition-all transform hover:-translate-y-1">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@trinexta" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-secondary transition-all transform hover:-translate-y-1">
                <TiktokIcon className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/trinexta/" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-secondary transition-all transform hover:-translate-y-1">
                <FacebookIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* --- VERSION TABLETTES & MOBILE --- */}
        <div className="block lg:hidden pt-8 pb-4 space-y-8">
          <div className="flex items-center justify-between gap-4">
            <div className="shrink-0">
              <span className="text-white font-black uppercase text-lg leading-none block">Trinexta</span>
              <span className="text-secondary text-[7px] font-bold uppercase block tracking-widest">By Trustech IT</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-y-8 gap-x-2 sm:gap-x-4 border-y border-white/5 py-6">
            <div>
              <span className={mobileTitle}>Navigation</span>
              <ul className="space-y-2">
                {NAVIGATION.map((item) => (
                  <li key={`mob-${item.name}`}><Link href={item.href} className={mobileHover}>{item.name}</Link></li>
                ))}
              </ul>
            </div>
            
            <div>
              <span className={mobileTitle}>Services</span>
              <ul className="space-y-2">
                {SERVICES.map((item) => (
                  <li key={`mob-${item.name}`}><Link href={item.href} className={mobileHover}>{item.name}</Link></li>
                ))}
              </ul>
            </div>
            
            <div>
              <span className={mobileTitle}>Légal</span>
              <ul className="space-y-2">
                {LEGAL.map((item) => (
                  <li key={`mob-${item.name}`}><Link href={item.href} className={mobileHover}>{item.name}</Link></li>
                ))}
              </ul>
            </div>
            
            <div>
              <span className={mobileTitle}>Contact</span>
              <div className="space-y-4">
                <div>
                  <span className="block text-[7.5px] sm:text-[8px] text-secondary font-bold uppercase mb-1">Bureau</span>
                  <span className="text-white/70 text-[8.5px] sm:text-[10px] block leading-snug break-words">7 Rue Montespan, 91000 EVRY</span>
                </div>
                <div>
                  <span className="block text-[7.5px] sm:text-[8px] text-secondary font-bold uppercase mb-1">Assistance</span>
                  <a href="tel:0978250746" className={mobileHover}>09 78 25 07 46</a>
                </div>
                <div>
                  <span className="block text-[7.5px] sm:text-[8px] text-secondary font-bold uppercase mb-1">Email</span>
                  <a href="mailto:contact@trinexta.fr" className={mobileHover}>contact@trinexta.fr</a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center gap-4">
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {["Microsoft", "Google", "OVH"].map(p => (
                <span key={p} className="text-[8px] text-white/20 font-black uppercase tracking-widest">{p}</span>
              ))}
            </div>
            <div className="flex gap-4 shrink-0">
              <a href="https://www.linkedin.com/company/trinexta/" target="_blank" rel="noopener noreferrer"><LinkedinIcon className="w-4 h-4 text-white/20" /></a>
              <a href="https://www.instagram.com/trinexta/" target="_blank" rel="noopener noreferrer"><InstagramIcon className="w-4 h-4 text-white/20" /></a>
              <a href="https://www.tiktok.com/@trinexta" target="_blank" rel="noopener noreferrer"><TiktokIcon className="w-4 h-4 text-white/20" /></a>
              <a href="https://www.facebook.com/trinexta/" target="_blank" rel="noopener noreferrer"><FacebookIcon className="w-4 h-4 text-white/20" /></a>
            </div>
          </div>
        </div>

        {/* MENTIONS LÉGALES / COPYRIGHT */}
        <div className="py-4 border-t border-white/5 text-center mt-4 lg:mt-0">
          <p className="text-[9px] md:text-[10px] text-white/30 font-bold uppercase tracking-widest">
            © {currentYear} TrusTech IT Support – Tous droits réservés
          </p>
        </div>

      </Container>
    </footer>
  )
}