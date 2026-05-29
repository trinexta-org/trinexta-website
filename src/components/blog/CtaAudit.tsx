import Link from "next/link";

export function CtaAudit() {
  return (
    <div className="mt-20 p-10 bg-white/5 border border-white/10 rounded-3xl text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent pointer-events-none" />
      
      <h3 className="text-2xl font-bold mb-4 relative z-10">Besoin d&apos;un audit de sécurité ou d&apos;infogérance ?</h3>
      <p className="text-white/60 mb-8 max-w-lg mx-auto relative z-10">
        Nos experts analysent votre infrastructure pour identifier les points de blocage et renforcer votre protection.
      </p>
      <Link 
        href="/contact" 
        className="inline-block px-8 py-4 bg-secondary hover:bg-secondary/90 text-white transition-all duration-300 rounded-xl font-bold shadow-lg hover:shadow-secondary/20 hover:scale-105"
      >
        Demander mon audit gratuit
      </Link>
    </div>
  );
}