import { cn } from "@/lib/utils"

export function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full bg-[#f0f5f9] px-2.5 py-0.5 text-xs font-bold text-[#5c92b8] border border-[#5c92b8]/10", className)}>
      {children}
    </span>
  )
}