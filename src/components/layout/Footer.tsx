import Link from "next/link";
import { Container } from "./Container";
import { FooterNewsletter } from "@/components/shared/FooterNewsletter";
import { SOCIAL_LINKS } from "@/data/social-links";
import {
  PIED_CONTACT,
  PIED_LEGAL,
  PIED_MARQUES,
  PIED_RESSOURCES,
  PIED_SERVICES,
  type LienPied,
} from "@/data/footer";

const titre = "text-white font-black uppercase tracking-[0.2em] text-[12px] mb-5 block";
const lien = "inline-block py-1 text-white/70 hover:text-secondary-soft text-[14px] transition-colors";
const etiquette = "block text-[11px] text-secondary-soft font-bold uppercase mb-1";

function Colonne({ titreCol, liens }: { titreCol: string; liens: LienPied[] }) {
  return (
    <div>
      <span className={titre}>{titreCol}</span>
      <ul className="flex flex-col gap-1.5">
        {liens.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={lien}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary relative z-10 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <div className="pt-14 lg:pt-20 pb-10 grid gap-x-6 gap-y-10 grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Identité et contact */}
          <div className="col-span-2 lg:col-span-4 space-y-6">
            <Link href="/" className="block">
              <span className="text-white font-black uppercase tracking-normal text-3xl lg:text-4xl block leading-none">
                TRINEXTA
              </span>
              <span className="text-secondary-soft text-[10px] font-bold uppercase tracking-[0.4em] block mt-1">
                L&apos;humain avant les tickets
              </span>
            </Link>
            <p className="text-white/70 text-[15px] leading-relaxed max-w-sm">
              Infogérance, support et maintenance informatique des TPE et PME, depuis Évry-Courcouronnes, dans toute
              l&apos;Île-de-France.
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 max-w-sm">
              <div>
                <span className={etiquette}>Téléphone</span>
                <a href={PIED_CONTACT.telephoneHref} className="text-white hover:text-secondary-soft text-[15px] font-semibold">
                  {PIED_CONTACT.telephone}
                </a>
              </div>
              <div>
                <span className={etiquette}>E-mail</span>
                <a href={`mailto:${PIED_CONTACT.email}`} className="text-white/80 hover:text-secondary-soft text-[14px] break-all">
                  {PIED_CONTACT.email}
                </a>
              </div>
              <div className="col-span-2">
                <span className={etiquette}>Support</span>
                <span className="text-white/70 text-[14px]">{PIED_CONTACT.horaires}</span>
              </div>
              <div className="col-span-2">
                <span className={etiquette}>Bureau d&apos;activité</span>
                <span className="text-white/70 text-[14px]">{PIED_CONTACT.bureau}</span>
              </div>
            </div>
            <FooterNewsletter />
          </div>

          <div className="lg:col-span-3">
            <Colonne titreCol="Offres et services" liens={PIED_SERVICES} />
          </div>

          <div className="lg:col-span-2">
            <Colonne titreCol="Ressources" liens={PIED_RESSOURCES} />
          </div>

          {/* Les autres activités et produits de TRINEXTA */}
          <div className="col-span-2 lg:col-span-3">
            <span className={titre}>Les marques TRINEXTA</span>
            <ul className="flex flex-col gap-3">
              {PIED_MARQUES.map((marque) => (
                <li key={marque.href}>
                  <a
                    href={marque.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-xl border border-white/10 px-4 py-3 hover:border-secondary/50 hover:bg-white/5 transition-colors"
                  >
                    <span className="block text-white font-bold text-[15px] group-hover:text-secondary-soft">
                      {marque.name} <span aria-hidden="true">↗</span>
                    </span>
                    {marque.desc && <span className="block text-white/60 text-[13px]">{marque.desc}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Légal, siège, copyright, réseaux */}
        <div className="py-5 border-t border-white/10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {PIED_LEGAL.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/60 hover:text-secondary-soft text-[13px] transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="text-white/50 hover:text-secondary-soft transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <p className="pb-6 text-[12px] text-white/50">
          © {currentYear} TRINEXTA, marque de TrusTech IT Support SAS · Siège social : {PIED_CONTACT.siege}
        </p>
      </Container>
    </footer>
  );
}
