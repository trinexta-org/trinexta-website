"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { studioPaymentPlan } from "@/data/studio-payment"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { Heading, Text } from "@/components/ui/Typography"

gsap.registerPlugin(useGSAP)

const installments = [
  { month: "01", x: 300, y: 38 },
  { month: "02", x: 410, y: 62 },
  { month: "03", x: 488, y: 118 },
  { month: "04", x: 520, y: 195 },
  { month: "05", x: 488, y: 272 },
  { month: "06", x: 410, y: 328 },
  { month: "07", x: 300, y: 352 },
  { month: "08", x: 190, y: 328 },
  { month: "09", x: 112, y: 272 },
  { month: "10", x: 80, y: 195 },
  { month: "11", x: 112, y: 118 },
  { month: "12", x: 190, y: 62 },
] as const

function PaymentOrbit() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useGSAP(() => {
    const scene = sceneRef.current
    if (!scene) return

    const nodes = gsap.utils.toArray<SVGGElement>(".payment-node", scene)
    const nodeCores = gsap.utils.toArray<SVGCircleElement>(".payment-node-core", scene)
    const nodeLabels = gsap.utils.toArray<SVGTextElement>(".payment-node-label", scene)
    const track = scene.querySelector<SVGEllipseElement>(".payment-orbit-track")
    const cursor = scene.querySelector<SVGCircleElement>(".payment-orbit-cursor")
    const coreIdle = scene.querySelector<SVGGElement>(".payment-core-idle")
    const coreComplete = scene.querySelector<SVGGElement>(".payment-core-complete")
    if (!track || !cursor || !coreIdle || !coreComplete) return

    const trackLength = track.getTotalLength()
    const media = gsap.matchMedia()

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.45 })
      timelineRef.current = timeline

      timeline
        .set(track, { strokeDasharray: trackLength, strokeDashoffset: trackLength, opacity: 0.35 })
        .set(nodes, { x: (index) => 300 - installments[index].x, y: (index) => 195 - installments[index].y, scale: 0.15, opacity: 0, transformOrigin: "center" })
        .set(nodeCores, { fill: "var(--surface-strong)" })
        .set(nodeLabels, { fill: "var(--primary)" })
        .set(cursor, { x: 0, y: 0, opacity: 0, transformOrigin: "center" })
        .set(coreIdle, { opacity: 1, scale: 1, transformOrigin: "center" })
        .set(coreComplete, { opacity: 0, scale: 0.72, transformOrigin: "center" })
        .to(coreIdle, { scale: 0.92, duration: 0.45, ease: "power3.inOut" })
        .to(track, { strokeDashoffset: 0, opacity: 1, duration: 1.8, ease: "power2.inOut" }, "<")
        .to(nodes, { x: 0, y: 0, scale: 1, opacity: 1, duration: 1.15, stagger: 0.075, ease: "expo.out" }, "<0.16")
        .to(cursor, { opacity: 1, duration: 0.2 }, ">-0.05")

      installments.forEach((installment, index) => {
        if (index > 0) {
          timeline.to(cursor, {
            x: installment.x - installments[0].x,
            y: installment.y - installments[0].y,
            duration: 0.24,
            ease: "power2.inOut",
          })
        }
        timeline
          .to(nodeCores[index], { fill: "var(--secondary-strong)", duration: 0.16 }, "<")
          .to(nodeLabels[index], { fill: "var(--secondary-strong-foreground)", duration: 0.16 }, "<")
          .to(nodes[index], { scale: 1.18, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out" }, "<")
      })

      timeline
        .to(cursor, { opacity: 0, scale: 1.8, duration: 0.3, ease: "power2.out" })
        .to(coreIdle, { opacity: 0, scale: 0.82, duration: 0.4, ease: "power3.in" }, "<")
        .to(coreComplete, { opacity: 1, scale: 1, duration: 0.55, ease: "expo.out" }, "<0.12")
        .to({}, { duration: 1.1 })
        .to(coreComplete, { opacity: 0, scale: 1.16, duration: 0.35, ease: "power2.in" })
        .to(nodes, { x: (index) => 300 - installments[index].x, y: (index) => 195 - installments[index].y, scale: 0.15, opacity: 0, duration: 0.75, stagger: { each: 0.035, from: "end" }, ease: "power3.in" }, "<")
        .to(track, { strokeDashoffset: -trackLength, opacity: 0.25, duration: 0.8, ease: "power2.in" }, "<")

      return () => {
        timelineRef.current = null
        timeline.kill()
      }
    })

    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(track, { strokeDasharray: trackLength, strokeDashoffset: 0, opacity: 1 })
      gsap.set(nodes, { x: 0, y: 0, scale: 1, opacity: 1 })
      gsap.set(nodeCores, { fill: "var(--secondary-strong)" })
      gsap.set(nodeLabels, { fill: "var(--secondary-strong-foreground)" })
      gsap.set(cursor, { opacity: 0 })
      gsap.set(coreIdle, { opacity: 0 })
      gsap.set(coreComplete, { opacity: 1, scale: 1, transformOrigin: "center" })
    })

    return () => media.revert()
  }, { scope: sceneRef })

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return

    let isVisible = false
    const syncPlayback = () => timelineRef.current?.paused(!isVisible || document.hidden)
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      syncPlayback()
    }, { threshold: 0.15 })

    observer.observe(scene)
    document.addEventListener("visibilitychange", syncPlayback)
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", syncPlayback)
    }
  }, [])

  return (
    <div ref={sceneRef} className="relative mx-auto aspect-[3/2] w-full max-w-[680px]" role="img" aria-label="Le montant du projet est réparti en douze mensualités égales, sans intérêt supplémentaire">
      <svg viewBox="0 0 600 390" className="h-full w-full overflow-visible" aria-hidden="true">
        <defs>
          <filter id="payment-soft-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="var(--primary)" floodOpacity="0.12" />
          </filter>
        </defs>

        <ellipse cx="300" cy="195" rx="220" ry="157" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 8" />
        <ellipse className="payment-orbit-track" cx="300" cy="195" rx="220" ry="157" fill="none" stroke="var(--secondary-strong)" strokeWidth="2" strokeLinecap="round" />

        <g className="payment-core-idle" filter="url(#payment-soft-shadow)">
          <circle cx="300" cy="195" r="92" fill="var(--primary)" />
          <circle cx="300" cy="195" r="76" fill="none" stroke="var(--secondary)" strokeOpacity="0.25" />
          <text x="300" y="170" textAnchor="middle" fill="var(--secondary-soft)" fontSize="11" fontWeight="700" letterSpacing="2">VOTRE PROJET</text>
          <text x="300" y="218" textAnchor="middle" fill="var(--primary-foreground)" fontSize="48" fontWeight="800">12×</text>
          <text x="300" y="242" textAnchor="middle" fill="var(--primary-foreground)" fillOpacity="0.62" fontSize="11">mensualités égales</text>
        </g>

        <g className="payment-core-complete" filter="url(#payment-soft-shadow)">
          <circle cx="300" cy="195" r="92" fill="var(--secondary-strong)" />
          <circle cx="300" cy="195" r="76" fill="none" stroke="var(--secondary-strong-foreground)" strokeOpacity="0.28" />
          <text x="300" y="176" textAnchor="middle" fill="var(--secondary-strong-foreground)" fillOpacity="0.72" fontSize="11" fontWeight="700" letterSpacing="2">INTÉRÊTS</text>
          <text x="300" y="226" textAnchor="middle" fill="var(--secondary-strong-foreground)" fontSize="52" fontWeight="800">0 %</text>
        </g>

        {installments.map((installment) => (
          <g key={installment.month} className="payment-node">
            <circle className="payment-node-core" cx={installment.x} cy={installment.y} r="21" fill="var(--surface-strong)" stroke="var(--secondary-strong)" strokeWidth="1.5" />
            <text className="payment-node-label" x={installment.x} y={installment.y + 4} textAnchor="middle" fill="var(--primary)" fontSize="10" fontWeight="700">{installment.month}</text>
          </g>
        ))}

        <circle
          className="payment-orbit-cursor"
          cx={installments[0].x}
          cy={installments[0].y}
          r="7"
          fill="var(--secondary-strong)"
          stroke="var(--surface-strong)"
          strokeWidth="4"
        />
      </svg>
    </div>
  )
}

export function StudioPaymentPlan() {
  return (
    <Section id="paiement-studio" container={false} className="py-4 md:py-8">
      <Container className="max-w-[1400px]">
        <div className="overflow-hidden rounded-2xl bg-primary text-primary-foreground shadow-xl">
          <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
            <div className="relative flex flex-col justify-between gap-12 overflow-hidden p-7 md:p-10 lg:p-12">
              <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-secondary/15" aria-hidden="true" />
              <div className="relative z-10 space-y-5">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-secondary-soft">{studioPaymentPlan.eyebrow}</p>
                <Heading as="h2" emphasis={false} className="max-w-xl text-primary-foreground">{studioPaymentPlan.title}</Heading>
                <Text className="max-w-xl text-primary-foreground/75">{studioPaymentPlan.description}</Text>
              </div>

              <p className="relative z-10 max-w-sm border-t border-primary-foreground/15 pt-6 text-lg font-semibold leading-snug text-primary-foreground">
                Votre projet démarre aujourd’hui. Son coût respire pendant douze mois.
              </p>
            </div>

            <div className="relative overflow-hidden bg-surface-strong p-5 text-primary sm:p-8 lg:p-10">
              <div className="flex items-center justify-between gap-4 px-2">
                <p className="text-sm font-bold text-primary">Le financement en mouvement</p>
                <p className="rounded-full bg-secondary/15 px-3 py-1 text-xs font-bold text-secondary-strong">Sans intérêts</p>
              </div>

              <PaymentOrbit />

              <div className="grid grid-cols-3 border-t border-border text-center">
                <div className="px-2 pt-5"><strong className="block text-base text-primary">1 devis</strong><span className="text-xs text-primary/55">montant fixé</span></div>
                <div className="border-x border-border px-2 pt-5"><strong className="block text-base text-primary">12 échéances</strong><span className="text-xs text-primary/55">montants égaux</span></div>
                <div className="px-2 pt-5"><strong className="block text-base text-primary">0 %</strong><span className="text-xs text-primary/55">d’intérêt</span></div>
              </div>

              <p className="mt-6 text-center text-xs leading-relaxed text-primary/55">{studioPaymentPlan.note}</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
