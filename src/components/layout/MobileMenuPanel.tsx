"use client"

import Link from "next/link"
import Image from "next/image"
import { X, ChevronDown } from "lucide-react"
import { FocusTrap } from "focus-trap-react"
import { menuItems } from "./Nav"
import { cn } from "@/lib/utils"
import { usePresence } from "@/hooks/usePresence"

interface MobileMenuPanelProps {
  isOpen: boolean
  onClose: () => void
  pathname: string | null
  openSubMenu: string | null
  onToggleSubMenu: (label: string) => void
}

export default function MobileMenuPanel({ isOpen, onClose, pathname, openSubMenu, onToggleSubMenu }: MobileMenuPanelProps) {
  const { shouldRender, isVisible } = usePresence(isOpen, 300)

  if (!shouldRender) return null

  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      />

      <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
        <aside
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
              className="p-2 -mr-2 text-muted-foreground hover:text-secondary transition-colors"
              aria-label="Fermer le menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-col px-6 py-6 gap-2 overflow-y-auto">
            {menuItems.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href))
              const isSubOpen = openSubMenu === link.label

              return (
                <div key={link.label} className="flex flex-col">
                  <div className="flex items-center justify-between py-3 w-full">
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={cn(
                        "text-base font-bold w-fit transition-all",
                        isActive ? "text-secondary border-b-2 border-secondary" : "text-primary"
                      )}
                    >
                      {link.label}
                    </Link>

                    {link.subMenu && (
                      <button
                        onClick={() => onToggleSubMenu(link.label)}
                        className="p-2 -mr-2 text-primary hover:text-secondary"
                        aria-label="Déplier le sous-menu"
                      >
                        <ChevronDown className={cn("w-5 h-5 transition-transform", isSubOpen && "rotate-180")} />
                      </button>
                    )}
                  </div>

                  {link.subMenu && (
                    <div
                      className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                      style={{ gridTemplateRows: isSubOpen ? "1fr" : "0fr" }}
                    >
                      <div className={cn("overflow-hidden transition-opacity duration-300", isSubOpen ? "opacity-100" : "opacity-0")}>
                        <div className="flex flex-col gap-3 pl-4 py-2 border-l-2 border-border mb-2">
                          {link.subMenu.map((sub) => (
                            sub.disabled ? (
                              <span key={sub.label} className="text-sm font-medium text-muted-foreground">{sub.label}</span>
                            ) : (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                onClick={onClose}
                                className="text-sm font-semibold text-muted-foreground hover:text-secondary transition-colors"
                              >
                                {sub.label}
                              </Link>
                            )
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}

            <Link
              href="/estimation"
              onClick={onClose}
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-secondary px-4 py-3 text-sm font-bold text-secondary-foreground shadow-md transition-all hover:bg-secondary/90 active:scale-95"
            >
              Estimer mon projet
            </Link>
          </div>
        </aside>
      </FocusTrap>
    </>
  )
}
