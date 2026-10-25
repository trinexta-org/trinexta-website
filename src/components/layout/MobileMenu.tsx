"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

const MobileMenuPanel = dynamic(() => import("./MobileMenuPanel"), { ssr: false })

const PANNEAU_ID = "menu-mobile"

export function MobileMenu() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)

  const toggleSubMenu = (label: string) => {
    setOpenSubMenu(openSubMenu === label ? null : label)
  }

  const handleOpen = () => {
    setHasOpened(true)
    setIsOpen(true)
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
        ref={burgerRef}
        type="button"
        onClick={handleOpen}
        className="p-2.5 -mr-2.5 text-primary hover:text-secondary-strong transition-colors"
        aria-label="Ouvrir le menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? PANNEAU_ID : undefined}
        aria-haspopup="dialog"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {hasOpened && (
        <MobileMenuPanel
          id={PANNEAU_ID}
          isOpen={isOpen}
          returnFocusRef={burgerRef}
          onClose={() => setIsOpen(false)}
          pathname={pathname}
          openSubMenu={openSubMenu}
          onToggleSubMenu={toggleSubMenu}
        />
      )}
    </div>
  )
}
