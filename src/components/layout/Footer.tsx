import Link from "next/link";
import { Container } from "./Container";
import { FooterNewsletter } from "@/components/shared/FooterNewsletter";
import { SOCIAL_LINKS } from "@/data/social-links";

const NAVIGATION = [
  { name: "Offre Sérénité", href: "/serenite" },
  { name: "Cas clients", href: "/cas-clients" },
  { name: "Blog", href: "/blog" },
  { name: "Ordinateur ou compte piraté", href: "/charte-assistance" },
  { name: "Niveaux de service", href: "/niveau-de-service" },
  { name: "Plan de réponse aux incidents", href: "/plan-reponse-incidents-securite" },
  { name: "À propos", href: "/a-propos" },
  { name: "Nous rejoindre", href: "/nous-rejoindre" },
  { name: "Contact", href: "/contact" },
  // Seul lien Studio du site IT, tant que trinexta-studio.fr n'est pas en ligne.
  { name: "Création de sites : TRINEXTA Studio", href: "/trinexta-studio" },
];

const SERVICES = [
  { name: "Infogérance", href: "/infogerance" },
  { name: "Support informatique", href: "/support-informatique" },
  { name: "Cybersécurité", href: "/cybersecurite" },
  { name: "Sauvegarde", href: "/cloud-sauvegarde" },
  { name: "Microsoft 365", href: "/microsoft-365" },
  { name: "Téléphonie et réseau", href: "/solutions-metier" },
  { name: "Interventions sur devis", href: "/services-annexes" },
  { name: "Technicien en régie", href: "/technicien-sous-regie" },
];

const LEGAL = [
  { name: "Mentions légales", href: "/mentions-legales" },
  { name: "CGV", href: "/cgv" },
  { name: "Confidentialité", href: "/confidentialite" },
  { name: "Cookies", href: "/cookies" },
  { name: "Tous les documents", href: "/informations-juridiques" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const desktopHover =
    "inline-block py-2 text-white/70 hover:text-secondary-soft text-[15px] transition-colors duration-300";
  const desktopTitle =
    "text-white font-black uppercase tracking-[0.2em] text-[13px] mb-6 block";

  const mobileHover =
    "inline-block py-2 text-white/80 hover:text-secondary-soft text-[11px] sm:text-[12px] block transition-colors leading-snug break-words";
  const mobileTitle =
    "text-white font-bold uppercase text-[11px] sm:text-[12px] mb-2 block";

  return (
    <footer className="bg-primary relative z-10 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <div
        className="absolute top-0 inset-x-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.25), transparent)",
        }}
      />

      <Container className="relative z-10">
        {/* --- VERSION GRAND ÉCRAN --- */}
        <div className="hidden lg:block pt-20 pb-10">
          <div className="grid grid-cols-5 gap-12 mb-8">
            <div className="space-y-8">
              <Link href="/" className="group block">
                <span className="text-white font-black uppercase tracking-normal text-4xl block leading-none">
                  TRINEXTA
                </span>
                <span className="text-secondary-soft text-[10px] font-bold uppercase tracking-[0.4em] block mt-1">
                  L&apos;humain avant les tickets
                </span>
              </Link>
              <div className="space-y-5">
                <p className="text-white/70 text-[15px] leading-relaxed">
                  Infogérance, support et maintenance informatique des TPE et PME,
                  depuis Évry-Courcouronnes, dans toute l&apos;Île-de-France.
                </p>
              </div>
              <FooterNewsletter />
            </div>

            <div>
              <span className={desktopTitle}>Navigation</span>
              <ul className="flex flex-col gap-3.5">
                {NAVIGATION.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className={desktopHover}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className={desktopTitle}>Nos Services</span>
              <ul className="flex flex-col gap-3.5">
                {SERVICES.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className={desktopHover}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-12 content-start">
              <div>
                <span className={desktopTitle}>Légal</span>
                <ul className="flex flex-col gap-3.5">
                  {LEGAL.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className={desktopHover}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className={desktopTitle}>Contact</span>
                <div className="space-y-5">
                  <div className="group">
                    <span className="block text-[11px] text-secondary-soft font-bold uppercase mb-1.5">
                      Bureau d&apos;activité
                    </span>
                    <span className="text-white/70 text-[15px]">
                      7 rue Montespan, 91000 Évry-Courcouronnes
                    </span>
                  </div>
                  <div className="group">
                    <span className="block text-[11px] text-secondary-soft font-bold uppercase mb-1.5">
                      Support
                    </span>
                    <span className="text-white/70 text-[15px]">
                      Du lundi au vendredi, 8 h 30-19 h
                    </span>
                  </div>
                  <div className="group">
                    <span className="block text-[11px] text-secondary-soft font-bold uppercase mb-1.5">
                      Téléphone
                    </span>
                    <a
                      href="tel:+33978250746"
                      className="text-white/70 hover:text-secondary-soft text-[15px] block transition-colors"
                    >
                      09 78 25 07 46
                    </a>
                  </div>
                  <div className="group">
                    <span className="block text-[11px] text-secondary-soft font-bold uppercase mb-1.5">
                      Email
                    </span>
                    <a
                      href="mailto:contact@trinexta.fr"
                      className="text-white/70 hover:text-secondary-soft text-[15px] block transition-colors"
                    >
                      contact@trinexta.fr
                    </a>
                  </div>
                  <div className="group">
                    <span className="block text-[11px] text-secondary-soft font-bold uppercase mb-1.5">
                      Siège social
                    </span>
                    <span className="text-white/70 text-[15px]">
                      74 B boulevard Henri Dunant, 91100 Corbeil-Essonnes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- VERSION TABLETTES & MOBILE --- */}
        <div className="block lg:hidden pt-8 pb-4 space-y-8">
          <div className="flex items-center justify-between gap-4">
            <div className="shrink-0">
              <span className="text-white font-black uppercase text-xl leading-none block">
                TRINEXTA
              </span>
              <span className="text-secondary-soft text-[8px] font-bold uppercase block tracking-widest">
                L&apos;humain avant les tickets
              </span>
            </div>
          </div>

          <FooterNewsletter compact />

          <div className="grid grid-cols-4 gap-y-8 gap-x-2 sm:gap-x-4 border-t border-white/5 pt-6 pb-2">
            <div>
              <span className={mobileTitle}>Navigation</span>
              <ul className="space-y-2">
                {NAVIGATION.map((item) => (
                  <li key={`mob-${item.name}`}>
                    <Link href={item.href} className={mobileHover}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className={mobileTitle}>Services</span>
              <ul className="space-y-2">
                {SERVICES.map((item) => (
                  <li key={`mob-${item.name}`}>
                    <Link href={item.href} className={mobileHover}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className={mobileTitle}>Légal</span>
              <ul className="space-y-2">
                {LEGAL.map((item) => (
                  <li key={`mob-${item.name}`}>
                    <Link href={item.href} className={mobileHover}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className={mobileTitle}>Contact</span>
              <div className="space-y-4">
                <div>
                  <span className="block text-[8.5px] sm:text-[9px] text-[var(--secondary)] font-bold uppercase mb-1">
                    Bureau
                  </span>
                  <span className="text-white/70 text-[9.5px] sm:text-[11px] block leading-snug break-words">
                    7 rue Montespan, 91000 Évry-Courcouronnes
                  </span>
                </div>
                <div>
                  <span className="block text-[8.5px] sm:text-[9px] text-[var(--secondary)] font-bold uppercase mb-1">
                    Téléphone
                  </span>
                  <a href="tel:+33978250746" className={mobileHover}>
                    09 78 25 07 46
                  </a>
                  <span className="text-white/70 text-[9.5px] sm:text-[11px] block leading-snug break-words">
                    Lun.-ven., 8 h 30-19 h
                  </span>
                </div>
                <div>
                  <span className="block text-[8.5px] sm:text-[9px] text-[var(--secondary)] font-bold uppercase mb-1">
                    Email
                  </span>

                  <a href="mailto:contact@trinexta.fr" className={mobileHover}>
                    contact@trinexta.fr
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MENTIONS LÉGALES / COPYRIGHT */}
        <div className="py-4 border-t border-white/5 flex items-center justify-between gap-4 mt-4 lg:mt-0">
          <p className="text-[11px] md:text-[12px] text-white/50 font-bold uppercase tracking-widest">
            © {currentYear} TRINEXTA, marque de TrusTech IT Support · Tous droits réservés
          </p>
          <div className="flex items-center gap-4 shrink-0">
            {SOCIAL_LINKS.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="text-white/20 hover:text-secondary-soft transition-all transform hover:-translate-y-1"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
