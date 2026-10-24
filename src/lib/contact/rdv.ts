import { RDV_FENETRE_JOURS } from "@/data/contact-trinexta"

/** Date du jour à Paris, au format AAAA-MM-JJ (indépendant du fuseau du serveur). */
export function aujourdhuiParis(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris" }).format(now)
}

function decaler(iso: string, jours: number): string {
  const d = new Date(`${iso}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() + jours)
  return d.toISOString().slice(0, 10)
}

function estWeekend(iso: string): boolean {
  const jour = new Date(`${iso}T12:00:00Z`).getUTCDay()
  return jour === 0 || jour === 6
}

/** Premier jour ouvré après aujourd'hui (le rendez-vous du jour même n'est pas proposé). */
export function premierJourRdv(now: Date = new Date()): string {
  let iso = decaler(aujourdhuiParis(now), 1)
  while (estWeekend(iso)) iso = decaler(iso, 1)
  return iso
}

export function dernierJourRdv(now: Date = new Date()): string {
  return decaler(aujourdhuiParis(now), RDV_FENETRE_JOURS)
}

/** Date valide pour un premier rendez-vous : jour ouvré, à partir de demain, dans la fenêtre. */
export function estDateRdvValide(iso: string, now: Date = new Date()): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso) || Number.isNaN(Date.parse(`${iso}T12:00:00Z`))) return false
  if (decaler(iso, 0) !== iso) return false // 2026-02-31 et consorts
  return !estWeekend(iso) && iso >= premierJourRdv(now) && iso <= dernierJourRdv(now)
}

/** « mardi 3 novembre 2026 » */
export function formaterDateRdv(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T12:00:00Z`))
}

/** Garde les chiffres d'un numéro français et les groupe par deux : « 06 12 34 56 78 ». */
export function formaterTelephone(saisie: string): string {
  let chiffres = saisie.replace(/\D/g, "")
  if (chiffres.startsWith("33") && saisie.trim().startsWith("+")) chiffres = `0${chiffres.slice(2)}`
  return chiffres.slice(0, 10).replace(/(\d{2})(?=\d)/g, "$1 ")
}

/** Groupe un SIRET saisi en 3 3 3 5 : « 123 456 789 00012 ». */
export function formaterSiret(saisie: string): string {
  const c = saisie.replace(/\D/g, "").slice(0, 14)
  return [c.slice(0, 3), c.slice(3, 6), c.slice(6, 9), c.slice(9)].filter(Boolean).join(" ")
}
