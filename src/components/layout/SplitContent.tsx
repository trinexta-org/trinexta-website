import { cn } from "@/lib/utils"
import Image from "next/image"
import { ReactNode } from "react"
import { FadeIn } from "@/components/ui/FadeIn" 

export interface SplitContentProps {
  imageSrc: string
  imageAlt: string
  imagePosition?: "left" | "right"
  children: ReactNode
  className?: string
  imageClassName?: string
}

export function SplitContent({ 
  imageSrc, 
  imageAlt, 
  imagePosition = "left", 
  children, 
  className,
  imageClassName
}: SplitContentProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center", className)}>
      
      <div className={cn(
        "relative w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[500px] rounded-2xl overflow-hidden",
        imagePosition === "right" ? "lg:order-2" : "lg:order-1",
        imageClassName
      )}>
        <Image 
          src={imageSrc} 
          alt={imageAlt} 
          fill 
          className="object-cover" 
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div className={cn(
        "space-y-6",
        imagePosition === "right" ? "lg:order-1" : "lg:order-2"
      )}>
        <FadeIn>
          {children}
        </FadeIn>
      </div>

    </div>
  )
}