import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  const variants = {
    primary: "bg-[#0a233e] text-white hover:bg-[#0a233e]/90 shadow-md",
    secondary: "bg-[#5c92b8] text-white hover:bg-[#5c92b8]/90 shadow-md",
    outline: "border-2 border-[#0a233e] text-[#0a233e] hover:bg-[#0a233e] hover:text-white",
    ghost: "text-[#0a233e] hover:bg-[#f0f5f9]"
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base font-bold",
    lg: "px-8 py-4 text-lg font-black tracking-tight"
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
}