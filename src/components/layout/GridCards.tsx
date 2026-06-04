import { cn } from "@/lib/utils"
import { ReactNode } from "react"

type GridColumns = 1 | 2 | 3 | 4

export interface GridCardsProps {
  children: ReactNode
  columns?: GridColumns
  mobileColumns?: GridColumns 
  className?: string
  gap?: string
}

export function GridCards({ 
  children, 
  columns = 3, 
  mobileColumns = 1, 
  className,
  gap = "gap-6 md:gap-8"
}: GridCardsProps) {
  
  const gridStyles = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  }

  return (
    <div className={cn(
      "grid w-full", 
      gridStyles[mobileColumns], 
      `md:${gridStyles[columns]}`,
      gap, 
      className
    )}>
      {children}
    </div>
  )
}