"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
  url: string | null
  title: string
}

export function DemoModal({ isOpen, onClose, url, title }: DemoModalProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => { document.body.style.overflow = "unset" }
  }, [isOpen])

  const handleIframeLoad = () => {
    if (iframeRef.current && iframeRef.current.contentDocument) {
      try {
        const style = document.createElement("style")
        style.textContent = `
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: transparent;
          }
          ::-webkit-scrollbar-thumb {
            background: #0a233e;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #10365c;
          }
        `
        iframeRef.current.contentDocument.head.appendChild(style)
      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && url && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pt-16 sm:p-6 sm:pt-40 pb-6 sm:pb-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/95 backdrop-blur-md cursor-pointer"
          />

          <button
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 z-[10000] w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg"
          >
            ✕
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="relative w-full max-w-[375px] md:max-w-[1024px] h-[82vh] md:h-[75vh] flex flex-col z-10 mx-auto"
          >
            <div className="hidden md:flex items-center justify-between w-full mb-4 px-2 md:px-0 shrink-0">
              <span className="text-white/80 text-sm font-medium bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm hidden md:block">
                Aperçu : <span className="text-white font-bold">{title}</span>
              </span>
              <button
                onClick={onClose}
                className="text-white hover:text-secondary transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/10 ml-auto shadow-lg"
              >
                Fermer ✕
              </button>
            </div>

            <div className="relative w-full flex-1 bg-phone-body rounded-[44px] md:rounded-[48px] border-[10px] md:border-[12px] border-phone-frame shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_4px_rgba(255,255,255,0.1)] flex flex-col">

              <div className="absolute top-[110px] md:top-[15%] -left-[12px] md:-left-[14px] w-[3px] md:w-[4px] h-[26px] md:h-[40px] bg-phone-button rounded-l-md" />
              <div className="absolute top-[160px] md:top-[25%] -left-[12px] md:-left-[14px] w-[3px] md:w-[4px] h-[50px] md:h-[60px] bg-phone-button rounded-l-md" />
              <div className="absolute top-[220px] md:top-[35%] -left-[12px] md:-left-[14px] w-[3px] md:w-[4px] h-[50px] md:h-[60px] bg-phone-button rounded-l-md" />
              <div className="absolute top-[180px] md:top-[20%] -right-[12px] md:-right-[14px] w-[3px] md:w-[4px] h-[70px] md:h-[90px] bg-phone-button rounded-r-md" />

              <div className="absolute top-2 md:top-4 left-1/2 -translate-x-1/2 w-[100px] md:w-[140px] h-[26px] md:h-[34px] bg-black rounded-full z-40 shadow-[inset_0_0_4px_rgba(255,255,255,0.1)] flex items-center justify-end px-3">
                 <div className="w-2.5 h-2.5 rounded-full bg-phone-camera border border-white/10" />
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] via-transparent to-white/[0.01] pointer-events-none z-20 rounded-[34px] md:rounded-[36px]" />

              <div className="flex-1 overflow-hidden rounded-[34px] md:rounded-[36px] bg-white flex flex-col relative z-10 m-[1px]">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-white">
                  <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
                </div>
                
                <iframe
                  ref={iframeRef}
                  src={url}
                  onLoad={handleIframeLoad}
                  className="absolute inset-0 w-full h-full border-none z-10 bg-white"
                  title={title}
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>

              <div className="absolute bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 w-[100px] md:w-[120px] h-[4px] md:h-[5px] bg-white/40 rounded-full z-40" />

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}