"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import { ReactNode } from "react"
import { transitions } from "@/lib/motion"

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}

export function FadeIn({ children, delay = 0, direction = "up", className, ...props }: FadeInProps) {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        ...transitions.smooth,
        delay: delay 
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}