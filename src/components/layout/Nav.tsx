"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export interface SubMenuItem {
  label: string
  href: string
  disabled?: boolean
}

export interface MenuItem {
  label: string
  href: string
  subMenu?: SubMenuItem[]
}

export const menuItems: MenuItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Offre Sérénité", href: "/serenite" },
  {
    label: "Nos services",
    href: "/infogerance",
    subMenu: [
      { label: "Infogérance", href: "/infogerance" },
      { label: "Cybersécurité", href: "/cybersecurite" },
      { label: "Cloud & Sauvegarde", href: "/cloud-sauvegarde" },
      { label: "Microsoft 365", href: "/microsoft-365" },
      { label: "Support Informatique", href: "/support-informatique" },
      { label: "Solutions Métier", href: "/solutions-metier" },
      { label: "Technicien sous régie", href: "/technicien-sous-regie" },
      { label: "Services Annexes", href: "/services-annexes" },
    ]
  },
  { label: "Trinexta Studio", href: "/trinexta-studio" },
  { label: "Cas clients", href: "/cas-clients" },
  { label: "À propos", href: "/a-propos" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="hidden lg:flex items-center gap-8">
      {menuItems.map((link) => {
        const matchesHref = (href: string) => {
          const path = href.split(/[?#]/)[0]
          return pathname === path || (path !== "/" && pathname?.startsWith(path))
        }

        const isActive = link.subMenu
          ? [link.href, ...link.subMenu.map((sub) => sub.href)].some(matchesHref)
          : matchesHref(link.href)

        return (
          <div key={link.label} className="relative group">
            <Link
              href={link.href}
              className={cn(
                "text-sm font-bold transition-colors relative py-6 flex items-center",
                isActive ? "text-secondary" : "text-primary hover:text-secondary"
              )}
            >
              {link.label}
              <span
                className={cn(
                  "absolute bottom-4 left-0 h-0.5 bg-secondary transition-all duration-300",
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                )}
              />
            </Link>

            {/* Sous-menu au survol */}
            {link.subMenu && (
              <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-[650px] pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="bg-background border border-border rounded-xl shadow-xl p-4 grid grid-cols-3 gap-2">
                  {link.subMenu.map((sub) => (
                    sub.disabled ? (
                      <span
                        key={sub.label}
                        aria-disabled="true"
                        className="block px-4 py-2.5 text-sm text-muted-foreground cursor-not-allowed bg-muted/50 rounded-lg"
                      >
                        {sub.label}
                      </span>
                    ) : (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block px-4 py-2.5 text-sm text-primary font-semibold hover:bg-accent hover:text-secondary rounded-lg transition-colors"
                      >
                        {sub.label}
                      </Link>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}