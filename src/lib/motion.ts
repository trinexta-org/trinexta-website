import { Transition } from "framer-motion"

export const transitions: Record<string, Transition> = {
  spring: { 
    type: "spring", 
    stiffness: 100, 
    damping: 20 
  },
  smooth: { 
    type: "tween", 
    ease: [0.4, 0, 0.2, 1], 
    duration: 0.5 
  },
}