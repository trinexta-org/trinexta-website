import type { Metadata } from "next";
import ContactForm from "@/component/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Trinexta · Infogérance & Support informatique",
  description:
    "Besoin d'un devis, d'une assistance ou d'une candidature ? Contactez l'équipe Trinexta. Réponse sous 24h ouvrées.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* hero */}
      <section className="bg-[#0a233e] pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#5c92b8]">
            Contactez-nous
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-2xl">
            Discutons de votre projet
          </h1>
          <p className="mt-4 text-[#93b8d4] text-base sm:text-lg max-w-xl leading-relaxed">
            Devis, support, candidature ou simple question & notre équipe vous
            répond dans les 24h ouvrées.
          </p>
        </div>
      </section>
      {/* 3 colonnes info */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Téléphone */}
          <div className="flex flex-col gap-4 rounded-2xl border border-[#d1dce8] bg-white p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0a233e] text-white shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .96h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.82a16 16 0 006.29 6.29l1.23-1.23a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </span>
              <h2 className="text-base font-semibold text-[#0a233e]">
                Téléphone
              </h2>
            </div>
            <div>
              <p className="text-xs font-medium text-[#6b7280] uppercase tracking-wide mb-1">
                Standard
              </p>
              <a
                href="tel:+33978250746"
                className="text-xl font-bold text-[#0a233e] hover:text-[#5c92b8] transition-colors"
              >
                09 78 25 07 46
              </a>
            </div>
            <div className="rounded-lg bg-red-50 border border-red-100 px-3 py-2.5">
              <p className="text-xs font-semibold text-red-700 mb-0.5">
                Urgence clients 24h/24
              </p>
              <a
                href="tel:+33756821047"
                className="text-sm font-bold text-red-700 hover:text-red-900 transition-colors"
              >
                07 56 82 10 47
              </a>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-medium text-[#6b7280] uppercase tracking-wide">
                Horaires
              </p>
              <div className="flex justify-between text-sm">
                <span className="text-[#374151]">Lundi – Vendredi</span>
                <span className="font-medium text-[#0a233e]">
                  08h30 – 18h30
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#374151]">Samedi</span>
                <span className="font-medium text-[#0a233e]">
                  09h00 – 12h00
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#9ca3af]">Dimanche</span>
                <span className="text-[#9ca3af]">Fermé</span>
              </div>
            </div>
          </div>
          {/* Email */}
          <div className="flex flex-col gap-4 rounded-2xl border border-[#d1dce8] bg-white p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0a233e] text-white shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
              </span>
              <h2 className="text-base font-semibold text-[#0a233e]">Email</h2>
            </div>

            <div>
              <p className="text-xs font-medium text-[#6b7280] uppercase tracking-wide mb-1">
                Commercial & devis
              </p>
              <a
                href="mailto:contact@trinexta.fr"
                className="text-sm font-bold text-[#0a233e] hover:text-[#5c92b8] transition-colors"
              >
                contact@trinexta.fr
              </a>
            </div>

            <div>
              <p className="text-xs font-medium text-[#6b7280] uppercase tracking-wide mb-1">
                Support clients
              </p>
              <a
                href="mailto:support@trinexta.fr"
                className="text-sm font-bold text-[#0a233e] hover:text-[#5c92b8] transition-colors"
              >
                support@trinexta.fr
              </a>
            </div>

            <div className="rounded-lg bg-[#f0f5fa] px-3 py-2.5 mt-auto">
              <p className="text-xs text-[#5c92b8]">
                Réponse garantie sous{" "}
                <span className="font-semibold text-[#0a233e]">
                  24h ouvrées
                </span>
              </p>
            </div>
          </div>
          {/* Adresse */}
        <div className="flex flex-col gap-4 rounded-2xl border border-[#d1dce8] bg-white p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0a233e] text-white flex-shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </span>
            <h2 className="text-base font-semibold text-[#0a233e]">Adresse</h2>
          </div>

          <div>
            <p className="text-xs font-medium text-[#6b7280] uppercase tracking-wide mb-1">
              Siège social
            </p>
            <p className="text-sm font-semibold text-[#0a233e] leading-snug">
              505 Place des Champs-Élysées
              <br />
              91080 Évry-Courcouronnes
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#d1dce8] flex-1 min-h-[140px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2638.5!2d2.4407!3d48.6271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s505+Place+des+Champs-%C3%89lys%C3%A9es%2C+91080+%C3%89vry-Courcouronnes!5e0!3m2!1sfr!2sfr!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "140px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation Trinexta"
            />
          </div>

          <a
            href="https://maps.google.com/?q=505+Place+des+Champs-Élysées,+91080+Évry-Courcouronnes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#5c92b8] hover:text-[#0a233e] transition-colors"
          >
            Ouvrir dans Google Maps →
          </a>
        </div>
        </div>
        
      </section>

      {/* Formulaire — déjà fait */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <ContactForm />
      </section>
    </main>
  );
}
