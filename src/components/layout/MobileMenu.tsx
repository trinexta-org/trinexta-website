"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { FocusTrap } from "focus-trap-react"
import { menuItems } from "./Nav"
import { cn } from "@/lib/utils" 

export function MobileMenu() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)

  const toggleSubMenu = (label: string) => {
    setOpenSubMenu(openSubMenu === label ? null : label)
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => { document.body.style.overflow = "unset" }
  }, [isOpen])

  return (
    <div className="lg:hidden flex items-center">
      <button 
        onClick={() => setIsOpen(true)} 
        className="p-2 -mr-2 text-primary hover:text-secondary transition-colors"
        aria-label="Ouvrir le menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50"
            />
            
            <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
              <motion.aside
                initial={{ x: "-100%" }} 
                animate={{ x: 0 }} 
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed top-0 left-0 h-full w-[280px] bg-background shadow-2xl z-[60] flex flex-col"
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
                    onClick={() => setIsOpen(false)} 
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
                            onClick={() => setIsOpen(false)} 
                            className={cn(
                              "text-base font-bold w-fit transition-all",
                              isActive ? "text-secondary border-b-2 border-secondary" : "text-primary"
                            )}
                          >
                            {link.label}
                          </Link>

                          {link.subMenu && (
                            <button 
                              onClick={() => toggleSubMenu(link.label)} 
                              className="p-2 -mr-2 text-primary hover:text-secondary"
                              aria-label="Déplier le sous-menu"
                            >
                              <ChevronDown className={cn("w-5 h-5 transition-transform", isSubOpen && "rotate-180")} />
                            </button>
                          )}
                        </div>

                        <AnimatePresence>
                          {link.subMenu && isSubOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }} 
                              animate={{ height: "auto", opacity: 1 }} 
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-3 pl-4 py-2 border-l-2 border-border mb-2">
                                {link.subMenu.map((sub) => (
                                  sub.disabled ? (
                                    <span key={sub.label} className="text-sm font-medium text-muted-foreground">{sub.label}</span>
                                  ) : (
                                    <Link 
                                      key={sub.label} 
                                      href={sub.href} 
                                      onClick={() => setIsOpen(false)} 
                                      className="text-sm font-semibold text-muted-foreground hover:text-secondary transition-colors"
                                    >
                                      {sub.label}
                                    </Link>
                                  )
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}

                  <Link
                    href="/estimation"
                    onClick={() => setIsOpen(false)}
                    className="mt-4 inline-flex items-center justify-center rounded-xl bg-secondary px-4 py-3 text-sm font-bold text-secondary-foreground shadow-md transition-all hover:bg-secondary/90 active:scale-95"
                  >
                    Estimer mon projet
                  </Link>
                </div>
              </motion.aside>
            </FocusTrap>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}