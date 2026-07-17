"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

const MobileMenuPanel = dynamic(() => import("./MobileMenuPanel"), { ssr: false })

export function MobileMenu() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)

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
        onClick={handleOpen}
        className="p-2 -mr-2 text-primary hover:text-secondary transition-colors"
        aria-label="Ouvrir le menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {hasOpened && (
        <MobileMenuPanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          pathname={pathname}
          openSubMenu={openSubMenu}
          onToggleSubMenu={toggleSubMenu}
        />
      )}
    </div>
  )
}
