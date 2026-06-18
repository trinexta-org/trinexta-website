import { ArrowRight, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

type FooterNewsletterProps = {
  compact?: boolean
  className?: string
}

export function FooterNewsletter({ compact = false, className }: FooterNewsletterProps) {
  return (
    <div
      className={cn(
        "border-t border-white/5 pt-4",
        compact && "pt-4",
        className
      )}
    >
      <div className="flex items-center gap-2 text-secondary">
        <Mail className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} aria-hidden="true" />
        <span className={cn("font-bold uppercase", compact ? "text-[8px] tracking-widest" : "text-[9px] tracking-[0.18em]")}>
          Newsletter
        </span>
      </div>

      <p className={cn("mt-2 leading-snug text-white/55", compact ? "text-[10px]" : "text-xs")}>
        Conseils IT utiles, sans bruit.
      </p>

      <form action="/contact" method="get" className="mt-2.5 flex min-w-0 gap-2">
        <label htmlFor={compact ? "footer-newsletter-mobile" : "footer-newsletter"} className="sr-only">
          Adresse e-mail
        </label>
        <input
          id={compact ? "footer-newsletter-mobile" : "footer-newsletter"}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="Email"
          className={cn(
            "min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/30 outline-none transition-colors focus:border-secondary",
            compact ? "h-9 px-3 text-[11px]" : "h-10 px-3 text-xs"
          )}
        />
        <input type="hidden" name="source" value="newsletter-footer" />
        <button
          type="submit"
          aria-label="S'inscrire à la newsletter"
          className={cn(
            "inline-flex shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/90",
            compact ? "h-9 w-9" : "h-10 w-10"
          )}
        >
          <ArrowRight className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} aria-hidden="true" />
        </button>
      </form>
    </div>
  )
}
