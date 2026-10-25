"use client"

import type { RefObject } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, ChevronDown } from "lucide-react"
import { FocusTrap } from "focus-trap-react"
import { liensDe, menuItems } from "@/data/navigation"
import { cn } from "@/lib/utils"
import { usePresence } from "@/hooks/usePresence"
import { HEADER_CTA } from "@/data/header-cta"

interface MobileMenuPanelProps {
  id: string
  isOpen: boolean
  /** Bouton qui a ouvert le menu : il reprend le focus à la fermeture. */
  returnFocusRef: RefObject<HTMLButtonElement | null>
  onClose: () => void
  pathname: string | null
  openSubMenu: string | null
  onToggleSubMenu: (label: string) => void
}

export default function MobileMenuPanel({ id, isOpen, returnFocusRef, onClose, pathname, openSubMenu, onToggleSubMenu }: MobileMenuPanelProps) {
  const { shouldRender, isVisible } = usePresence(isOpen, 300)

  if (!shouldRender) return null

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Échap ferme le menu ; à la désactivation, le focus revient au burger */}
      <FocusTrap
        active={isOpen}
        focusTrapOptions={{
          allowOutsideClick: true,
          // Échap ferme via l'état (le piège se désactive avec active=false) : pas
          // d'onDeactivate, que le double montage de StrictMode déclencherait.
          escapeDeactivates: () => {
            onClose()
            return false
          },
          returnFocusOnDeactivate: true,
          setReturnFocus: () => returnFocusRef.current ?? false,
        }}
      >
        <aside
          id={id}
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
          className={cn(
            "fixed top-0 left-0 h-full w-[280px] bg-background shadow-2xl z-[60] flex flex-col transition-transform duration-300 ease-in-out",
            isVisible ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between px-6 h-16 border-b border-border">
            <Image
              src="/images/trinexta-logo.png"
              alt="Logo TRINEXTA"
              width={120}
              height={35}
              className="h-8 w-auto object-contain"
            />
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-muted-foreground hover:text-secondary-strong transition-colors"
              aria-label="Fermer le menu"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-col px-6 py-6 gap-2 overflow-y-auto">
            {menuItems.map((link) => {
              const isActive = liensDe(link).some(
                (href) => pathname === href || (href !== "/" && pathname?.startsWith(href))
              )
              const isSubOpen = openSubMenu === link.label
              const sousMenuId = `${id}-${link.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`

              if (!link.groups) {
                return (
                  <Link
                    key={link.label}
                    href={link.href ?? "/"}
                    onClick={onClose}
                    className={cn(
                      "py-3 text-base font-bold w-fit transition-all",
                      isActive ? "text-secondary-strong border-b-2 border-secondary" : "text-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              }

              return (
                <div key={link.label} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => onToggleSubMenu(link.label)}
                    aria-expanded={isSubOpen}
                    aria-controls={sousMenuId}
                    className={cn(
                      "flex items-center justify-between py-3 w-full text-left text-base font-bold transition-colors",
                      isActive ? "text-secondary-strong" : "text-primary"
                    )}
                  >
                    {link.label}
                    <ChevronDown className={cn("w-5 h-5 transition-transform", isSubOpen && "rotate-180")} aria-hidden="true" />
                  </button>

                  {/* inert : un sous-menu replié ne reçoit ni le focus clavier ni la lecture */}
                  <div
                    id={sousMenuId}
                    inert={!isSubOpen}
                    className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                    style={{ gridTemplateRows: isSubOpen ? "1fr" : "0fr" }}
                  >
                    <div className={cn("overflow-hidden transition-opacity duration-300", isSubOpen ? "opacity-100" : "opacity-0")}>
                      <div className="flex flex-col gap-4 pl-4 py-2 border-l-2 border-border mb-2">
                        {link.groups.map((groupe) => (
                          <div key={groupe.titre} className="flex flex-col gap-3">
                            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                              {groupe.titre}
                            </p>
                            {groupe.items.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={onClose}
                                className="text-sm font-semibold text-muted-foreground hover:text-secondary-strong transition-colors"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            <Link
              href={HEADER_CTA.href}
              onClick={onClose}
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-secondary-strong px-4 py-3 text-sm font-bold text-secondary-strong-foreground shadow-md transition-all hover:bg-secondary-strong/90 active:scale-95"
            >
              {HEADER_CTA.label}
            </Link>

            <p className="mt-4 text-sm text-muted-foreground">
              Support du lundi au vendredi, 8 h 30-19 h
            </p>
          </div>
        </aside>
      </FocusTrap>
    </>
  )
}
