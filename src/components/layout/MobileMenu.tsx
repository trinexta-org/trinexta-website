"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
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
            
            <motion.aside
              initial={{ x: "-100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-[280px] bg-white shadow-2xl z-[60] flex flex-col"
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100">
                <Image 
                  src="/images/trinexta-logo.png" 
                  alt="Logo TRINEXTA"
                  width={120} 
                  height={35} 
                  className="h-8 w-auto object-contain"
                />
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-2 -mr-2 text-gray-400 hover:text-secondary transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex flex-col px-6 py-6 gap-2 overflow-y-auto">
                {menuItems.map((link) => {
                  const isActive = pathname === link.href
                  const isSubOpen = openSubMenu === link.label

                  return (
                    <div key={link.label} className="flex flex-col">
                      <div className="flex items-center justify-between py-3">
                        {link.subMenu ? (
                          <button 
                            onClick={() => toggleSubMenu(link.label)} 
                            className={cn(
                              "text-base font-bold flex items-center gap-2 w-full text-left transition-colors",
                              isSubOpen ? "text-secondary" : "text-primary"
                            )}
                          >
                            {link.label}
                            <ChevronDown className={cn("w-4 h-4 transition-transform", isSubOpen && "rotate-180")} />
                          </button>
                        ) : (
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
                            <div className="flex flex-col gap-3 pl-4 py-2 border-l-2 border-gray-100 mb-2">
                              {link.subMenu.map((sub) => (
                                sub.disabled ? (
                                  <span key={sub.label} className="text-sm font-medium text-gray-400">{sub.label}</span>
                                ) : (
                                  <Link 
                                    key={sub.label} 
                                    href={sub.href} 
                                    onClick={() => setIsOpen(false)} 
                                    className="text-sm font-semibold text-gray-600 hover:text-secondary transition-colors"
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
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}