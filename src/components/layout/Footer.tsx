import Link from "next/link"
import { Container } from "./Container" 
import { FacebookIcon } from "@/components/ui/icons/FacebookIcon"
import { LinkedinIcon } from "@/components/ui/icons/LinkedinIcon"
import { TwitterIcon } from "@/components/ui/icons/TwitterIcon"
import { GithubIcon } from "@/components/ui/icons/GithubIcon"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const desktopHover = "text-white/70 hover:text-secondary text-[13px] transition-colors duration-300"
  const desktopTitle = "text-white font-black uppercase tracking-[0.2em] text-[11px] mb-8 block"

  const mobileHover = "text-white/70 text-[9px] block transition-colors"
  const mobileTitle = "text-white font-bold uppercase text-[8px] mb-2 block"

  return (
    <footer className="bg-primary border-t border-white/5 relative overflow-hidden">
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
                <li><Link href="/" className={desktopHover}>Accueil</Link></li>
                <li><Link href="/tarifs" className={desktopHover}>Tarifs</Link></li>
                <li><Link href="/cas-clients" className={desktopHover}>Cas clients</Link></li>
                <li><Link href="/blog" className={desktopHover}>Blog Expertise</Link></li>
              </ul>
            </div>

            <div>
              <span className={desktopTitle}>Nos Services</span>
              <ul className="flex flex-col gap-3.5">
                {["Infogérance PME", "Support informatique", "Cybersécurité 360°", "Cloud & Sauvegarde", "Microsoft 365", "Solutions métier"].map((service) => (
                  <li key={service}><Link href="#" className={desktopHover}>{service}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <span className={desktopTitle}>Légal</span>
              <ul className="flex flex-col gap-3.5">
                {[{ name: "Mentions légales", href: "/mentions-legales" }, { name: "CGV / CGS", href: "/cgv" }, { name: "Données personnelles", href: "/confidentialite" }, { name: "Gestion des cookies", href: "/cookies" }].map((item) => (
                  <li key={item.name}><Link href={item.href} className={desktopHover}>{item.name}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <span className={desktopTitle}>Contact</span>
              <div className="space-y-6">
                <div className="group"><span className="block text-[9px] text-secondary font-bold uppercase mb-1.5">Siège social</span><span className="text-white/70 text-[13px]">505 Place des Champs Elysées, 91080 EVRY</span></div>
                <div className="group"><span className="block text-[9px] text-secondary font-bold uppercase mb-1.5">Assistance</span><a href="tel:0978250746" className="text-white/70 text-[13px] block">09 78 25 07 46</a></div>
                <div className="group"><span className="block text-[9px] text-secondary font-bold uppercase mb-1.5">Email</span><a href="mailto:contact@trinexta.fr" className="text-white/70 text-[13px] block">contact@trinexta.fr</a></div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex justify-between items-center">
            <div className="flex gap-8">
              {["Microsoft", "Google", "Sophos", "Bitdefender", "OVH"].map((p) => (
                <span key={p} className="text-[10px] text-white/20 font-black uppercase tracking-[0.2em] hover:text-white/60 transition-colors cursor-default">
                  {p}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-white/20 hover:text-secondary transition-all transform hover:-translate-y-1">
                <LinkedinIcon className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-white/20 hover:text-secondary transition-all transform hover:-translate-y-1">
                <FacebookIcon className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-white/20 hover:text-secondary transition-all transform hover:-translate-y-1">
                <TwitterIcon className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-white/20 hover:text-secondary transition-all transform hover:-translate-y-1">
                <GithubIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* --- VERSION MOBILE --- */}
        <div className="block lg:hidden pt-8 pb-4 space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="shrink-0">
              <span className="text-white font-black uppercase text-lg leading-none block">Trinexta</span>
              <span className="text-secondary text-[7px] font-bold uppercase block tracking-widest">By Trustech IT</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 border-y border-white/5 py-4">
            <div>
              <span className={mobileTitle}>Nav</span>
              <ul className="space-y-1">{["Accueil", "Tarifs", "Blog"].map(i => <li key={i} className={mobileHover}>{i}</li>)}</ul>
            </div>
            <div>
              <span className={mobileTitle}>Services</span>
              <ul className="space-y-1">{["Support", "Sécu", "Cloud"].map(i => <li key={i} className={mobileHover}>{i}</li>)}</ul>
            </div>
            <div>
              <span className={mobileTitle}>Légal</span>
              <ul className="space-y-1">{["CGV", "Mentions", "Data"].map(i => <li key={i} className={mobileHover}>{i}</li>)}</ul>
            </div>
            <div>
              <span className={mobileTitle}>Contact</span>
              <div className="space-y-1">
                <span className={mobileHover}>09 78 25 07 46</span>
                <span className={mobileHover}>Evry (91)</span>
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
              <LinkedinIcon className="w-4 h-4 text-white/20" />
              <FacebookIcon className="w-4 h-4 text-white/20" />
              <TwitterIcon className="w-4 h-4 text-white/20" />
            </div>
          </div>
        </div>

        <div className="py-4 border-t border-white/5 text-center">
          <p className="text-[9px] md:text-[10px] text-white/30 font-bold uppercase tracking-widest">
            © {currentYear} TrusTech IT Support – Tous droits réservés
          </p>
        </div>

      </Container>
    </footer>
  )
}