"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useAnimationFrame } from "framer-motion"
import Image from "next/image"
import { Section } from "@/components/layout/Section"
import { CircuitBackground } from "@/components/ui/CircuitBackground"
import { SectionFade } from "@/components/ui/SectionFade"
import { Container } from "@/components/layout/Container"

const DEPARTMENTS = [
    { id: "75", name: "Paris", angle: 75, radius: 0.40 },
    { id: "92", name: "Hauts-de-Seine", angle: 210, radius: 0.36 },
    { id: "93", name: "Seine-Saint-Denis", angle: 25, radius: 0.47 },
    { id: "94", name: "Val-de-Marne", angle: 145, radius: 0.44 },
    { id: "95", name: "Val-d'Oise", angle: 310, radius: 0.52 },
    { id: "77", name: "Seine-et-Marne", angle: 110, radius: 0.62 },
]

const STEPS = [
    {
        id: "CMD_HQ",
        label: "01",
        title: "Centre de commandement",
        subtitle: "Essonne — 91",
        text: "Notre QG est ancré en Essonne, au carrefour des axes stratégiques d'Île-de-France. Chaque mission part d'ici.",
    },
    {
        id: "DEP_IDF",
        label: "02",
        title: "Déploiement régional",
        subtitle: "6 départements couverts",
        text: "Le signal se déploie vers Paris, les Hauts-de-Seine, la Seine-Saint-Denis, le Val-de-Marne, le Val-d'Oise et la Seine-et-Marne. Intervention sur site en moins de 4h.",
    },
    {
        id: "EXP_NAT",
        label: "03",
        title: "Portée nationale",
        subtitle: "France entière",
        text: "L'onde de service s'étend au-delà de la région capitale pour couvrir vos infrastructures critiques sur l'ensemble du territoire.",
    },
]

const RING_RADII = [0.22, 0.38, 0.52, 0.68, 0.84]
const RING_KM = [25, 50, 75, 100, 125]
const SWEEP_SPAN = 65
const SIZE = 500

function polarToXY(angleDeg: number, r: number, cx: number, cy: number, maxR: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180
    return { x: cx + Math.cos(rad) * r * maxR, y: cy + Math.sin(rad) * r * maxR }
}

function gearRingPath(cx: number, cy: number, numTeeth: number, tipR: number, rootR: number): string {
    const step = (2 * Math.PI) / numTeeth
    const rootTw = step * 0.60
    const tipTw = step * 0.38
    const pts: string[] = []
    for (let i = 0; i < numTeeth; i++) {
        const mid = i * step
        pts.push(
            `${(cx + Math.cos(mid - rootTw / 2) * rootR).toFixed(1)},${(cy + Math.sin(mid - rootTw / 2) * rootR).toFixed(1)}`,
            `${(cx + Math.cos(mid - tipTw / 2) * tipR).toFixed(1)},${(cy + Math.sin(mid - tipTw / 2) * tipR).toFixed(1)}`,
            `${(cx + Math.cos(mid + tipTw / 2) * tipR).toFixed(1)},${(cy + Math.sin(mid + tipTw / 2) * tipR).toFixed(1)}`,
            `${(cx + Math.cos(mid + rootTw / 2) * rootR).toFixed(1)},${(cy + Math.sin(mid + rootTw / 2) * rootR).toFixed(1)}`,
        )
    }
    return `M ${pts.join(" L ")} Z`
}


function SweepArm({
    cx, cy, maxR,
    onCrossRef,
}: {
    cx: number
    cy: number
    maxR: number
    onCrossRef: React.MutableRefObject<((ids: string[]) => void) | null>
}) {
    const [angle, setAngle] = useState(0)
    const angleRef = useRef(0)
    const prevRef = useRef(0)

    useAnimationFrame((_, delta) => {
        prevRef.current = angleRef.current
        angleRef.current = (angleRef.current + delta * 0.035) % 360
        setAngle(angleRef.current)

        const pa = prevRef.current
        const na = angleRef.current
        const crossed = DEPARTMENTS.filter(d => {
            const da = d.angle
            return na >= pa ? (da > pa && da <= na) : (da > pa || da <= na)
        }).map(d => d.id)

        if (crossed.length > 0) onCrossRef.current?.(crossed)
    })

    const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180
    const tipX = cx + Math.cos(toRad(angle)) * maxR * 0.93
    const tipY = cy + Math.sin(toRad(angle)) * maxR * 0.93
    const trailPath = (span: number) => {
        const R = maxR * 0.93
        const ex = cx + Math.cos(toRad(angle)) * R
        const ey = cy + Math.sin(toRad(angle)) * R
        const sx = cx + Math.cos(toRad(angle - span)) * R
        const sy = cy + Math.sin(toRad(angle - span)) * R
        return `M ${cx} ${cy} L ${ex} ${ey} A ${R} ${R} 0 0 0 ${sx} ${sy} Z`
    }

    return (
        <g>
            <path d={trailPath(SWEEP_SPAN)} fill="var(--secondary)" fillOpacity="0.07" />
            <path d={trailPath(18)} fill="var(--secondary)" fillOpacity="0.17" />
            <line x1={cx} y1={cy} x2={tipX} y2={tipY}
                stroke="var(--secondary)" strokeOpacity="0.75" strokeWidth="1.2"
                filter="url(#glow-soft)" />
            <circle cx={tipX} cy={tipY} r="3"
                fill="var(--secondary)" fillOpacity="0.95" filter="url(#glow-soft)" />
        </g>
    )
}

export function InterventionMap() {
    const [step, setStep] = useState(0)
    const [flashKeys, setFlashKeys] = useState<Record<string, number>>({})
    const onCrossRef = useRef<((ids: string[]) => void) | null>(null)

    useEffect(() => {
        onCrossRef.current = (ids: string[]) => {
            if (step < 1) return
            setFlashKeys(prev => {
                const next = { ...prev }
                for (const id of ids) next[id] = (prev[id] ?? 0) + 1
                return next
            })
        }
    }, [step])

    useEffect(() => {
        const t = setInterval(() => setStep(s => (s + 1) % 3), 6000)
        return () => clearInterval(t)
    }, [])

    const cx = SIZE / 2
    const cy = SIZE / 2
    const maxR = SIZE / 2 - 24

    return (
        <Section container={false} className="relative bg-primary overflow-hidden py-16 md:py-28">

            <CircuitBackground intensity="low" />

            <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse 65% 75% at 72% 52%, color-mix(in srgb, var(--secondary) 10%, transparent), transparent)",
            }} />
            <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 38%, var(--primary) 100%)",
            }} />

            <SectionFade edge="both" className="h-28 md:h-44" />

            <Container className="relative z-10">
                <div className="flex items-center gap-3 mb-10 md:mb-14">
                    <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-50" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary opacity-80" />
                    </span>
                    <span className="text-[10px] font-mono text-secondary/90 font-bold uppercase tracking-[0.28em]">
                        Système opérationnel
                    </span>
                    <div className="h-px flex-1 bg-secondary/20" />
                    <span className="hidden md:block text-[10px] font-mono text-secondary/60 font-bold uppercase tracking-[0.12em]">
                        ILE-DE-FRANCE / NATIONAL
                    </span>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

                    <div className="w-full lg:w-[45%] shrink-0 flex flex-col gap-7 order-2 lg:order-1">

                        <div className="relative min-h-[160px]">
                            <span
                                className="absolute -top-2 -left-1 font-mono font-black select-none pointer-events-none leading-none"
                                style={{
                                    fontSize: "clamp(72px, 11vw, 108px)",
                                    color: "color-mix(in srgb, var(--secondary) 15%, transparent)",
                                }}
                            >
                                {STEPS[step].label}
                            </span>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.32, ease: "easeOut" }}
                                    className="relative space-y-3 pl-4"
                                    style={{ borderLeft: "2px solid color-mix(in srgb, var(--secondary) 40%, transparent)" }}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-mono font-bold text-secondary uppercase tracking-[0.22em]">
                                            {STEPS[step].label}
                                        </span>
                                        <div className="h-px w-6 bg-secondary/40" />
                                        <span className="text-[10px] font-mono text-secondary/90 font-bold uppercase tracking-wider">
                                            {STEPS[step].subtitle}
                                        </span>
                                    </div>
                                    <h2 className="text-white font-black text-2xl md:text-[1.75rem] leading-tight tracking-normal">
                                        {STEPS[step].title}
                                    </h2>
                                    <p className="text-white/90 text-sm md:text-[0.925rem] leading-relaxed font-light">
                                        {STEPS[step].text}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="flex gap-2">
                            {STEPS.map((s, i) => (
                                <button
                                    key={s.id}
                                    onClick={() => setStep(i)}
                                    className="flex-1 flex flex-col gap-1.5 cursor-pointer group"
                                    aria-label={s.title}
                                >
                                    <div className="h-px w-full bg-white/20 overflow-hidden">
                                        {step === i && (
                                            <motion.div
                                                key={`bar-${step}`}
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{ duration: 6, ease: "linear" }}
                                                className="h-full bg-secondary origin-left"
                                                style={{ width: "100%" }}
                                            />
                                        )}
                                        {step > i && <div className="h-full w-full bg-secondary/50" />}
                                    </div>
                                    <span className="text-[9px] font-mono text-white/40 group-hover:text-secondary/80 transition-colors">
                                        {s.label}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <AnimatePresence>
                            {step >= 1 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 4 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="rounded-xl overflow-hidden"
                                    style={{
                                        border: "1px solid color-mix(in srgb, var(--secondary) 20%, transparent)",
                                        background: "color-mix(in srgb, var(--secondary) 5%, transparent)",
                                    }}
                                >
                                    <div className="flex items-center justify-between px-4 py-2"
                                        style={{ borderBottom: "1px solid color-mix(in srgb, var(--secondary) 15%, transparent)" }}>
                                        <span className="text-[9px] font-mono text-secondary/60 font-bold uppercase tracking-[0.22em]">
                                            Cibles actives
                                        </span>
                                        <span className="text-[9px] font-mono text-secondary/50 font-bold">
                                            {DEPARTMENTS.length}&thinsp;/&thinsp;6
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2"
                                        style={{ gap: "1px", background: "color-mix(in srgb, var(--secondary) 10%, transparent)" }}>
                                        {DEPARTMENTS.map((d, i) => (
                                            <motion.div
                                                key={d.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.07 * i }}
                                                className="flex items-center gap-2.5 px-3 py-2"
                                                style={{ background: "color-mix(in srgb, var(--primary) 95%, transparent)" }}
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full shrink-0"
                                                    style={{ background: "color-mix(in srgb, var(--secondary) 80%, transparent)" }} />
                                                <span className="text-secondary font-mono text-[11px] font-bold">{d.id}</span>
                                                <span className="text-white/80 text-[9px] truncate font-medium">{d.name}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* CORRECTIF : Ajout d'un container dédié pour lier la carte et l'image */}
                    <div className="order-1 lg:order-2 flex items-center justify-center lg:justify-end w-full lg:w-[50%] mx-auto lg:mx-0">
                        <div className="relative flex items-center justify-center w-full max-w-[500px]">

                            <div className="absolute rounded-full pointer-events-none" style={{
                                width: "72%", aspectRatio: "1/1",
                                background: "radial-gradient(circle, color-mix(in srgb, var(--secondary) 14%, transparent) 0%, transparent 68%)",
                            }} />

                            <div className="absolute pointer-events-none z-10" style={{
                                left: "50%", top: "50%",
                                transform: "translate(-50%, -60%)",
                                width: "26%", aspectRatio: "1/1",
                            }}>
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="relative w-full h-full drop-shadow-2xl"
                                >
                                    <Image
                                        src="/images/map/isometric-hq.png"
                                        alt="QG Trinexta"
                                        fill
                                        sizes="(max-width: 768px) 120px, 160px"
                                        className="object-contain"
                                        priority
                                    />
                                </motion.div>
                            </div>

                            <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE}
                                style={{ maxWidth: "100%", height: "auto" }}>
                                <defs>
                                    <filter id="glow-soft" x="-60%" y="-60%" width="220%" height="220%">
                                        <feGaussianBlur stdDeviation="4" result="blur" />
                                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                                    </filter>
                                    <filter id="glow-strong" x="-120%" y="-120%" width="340%" height="340%">
                                        <feGaussianBlur stdDeviation="9" result="blur" />
                                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                                    </filter>
                                    <radialGradient id="bg-grad" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor="var(--secondary)" stopOpacity="0.11" />
                                        <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0" />
                                    </radialGradient>
                                    <clipPath id="radar-clip">
                                        <circle cx={cx} cy={cy} r={maxR} />
                                    </clipPath>
                                </defs>

                                <circle cx={cx} cy={cy} r={maxR} fill="url(#bg-grad)" />
                                <g>
                                    <animateTransform
                                        attributeName="transform"
                                        type="rotate"
                                        from={`0 ${cx} ${cy}`}
                                        to={`-360 ${cx} ${cy}`}
                                        dur="88s"
                                        repeatCount="indefinite"
                                    />
                                    <path
                                        d={gearRingPath(cx, cy, 16, maxR + 9, maxR - 1)}
                                        fill="none"
                                        stroke="var(--secondary)"
                                        strokeOpacity="0.40"
                                        strokeWidth="1.1"
                                        strokeLinejoin="miter"
                                    />
                                    {Array.from({ length: 12 }).map((_, i) => {
                                        const a = (i * 30 * Math.PI) / 180
                                        return (
                                            <line key={i}
                                                x1={cx + Math.cos(a) * (maxR - 14)} y1={cy + Math.sin(a) * (maxR - 14)}
                                                x2={cx + Math.cos(a) * (maxR - 2)} y2={cy + Math.sin(a) * (maxR - 2)}
                                                stroke="var(--secondary)"
                                                strokeOpacity="0.40"
                                                strokeWidth="1.0"
                                            />
                                        )
                                    })}
                                </g>

                                {RING_RADII.map((r, i) => {
                                    const rr = r * maxR
                                    return (
                                        <g key={i}>
                                            <circle cx={cx} cy={cy} r={rr}
                                                fill="none" stroke="var(--secondary)"
                                                strokeOpacity={0.15 + i * 0.015}
                                                strokeWidth="0.5"
                                                strokeDasharray={`${(rr * 0.10).toFixed(1)} ${(rr * 0.055).toFixed(1)}`}
                                            />
                                            {Array.from({ length: 8 }).map((_, j) => {
                                                const a = (j * 45 * Math.PI) / 180
                                                return (
                                                    <line key={j}
                                                        x1={cx + Math.cos(a) * (rr - 3.5)} y1={cy + Math.sin(a) * (rr - 3.5)}
                                                        x2={cx + Math.cos(a) * (rr + 3.5)} y2={cy + Math.sin(a) * (rr + 3.5)}
                                                        stroke="var(--secondary)"
                                                        strokeOpacity={0.20 + i * 0.02}
                                                        strokeWidth="0.5"
                                                    />
                                                )
                                            })}
                                        </g>
                                    )
                                })}

                                {RING_KM.map((km, i) => (
                                    <text key={i}
                                        x={cx + RING_RADII[i] * maxR + 4} y={cy - 3}
                                        fill="var(--secondary)" fillOpacity="0.40"
                                        fontSize="6" fontFamily="monospace"
                                    >
                                        {km}
                                    </text>
                                ))}

                                {[0, 90, 180, 270].map(a => {
                                    const rad = ((a - 90) * Math.PI) / 180
                                    return (
                                        <line key={a}
                                            x1={cx} y1={cy}
                                            x2={cx + Math.cos(rad) * maxR} y2={cy + Math.sin(rad) * maxR}
                                            stroke="var(--secondary)" strokeOpacity="0.15" strokeWidth="0.5"
                                        />
                                    )
                                })}

                                {[45, 135, 225, 315].map(a => {
                                    const rad = ((a - 90) * Math.PI) / 180
                                    return (
                                        <line key={a}
                                            x1={cx} y1={cy}
                                            x2={cx + Math.cos(rad) * maxR} y2={cy + Math.sin(rad) * maxR}
                                            stroke="var(--secondary)" strokeOpacity="0.08" strokeWidth="0.5"
                                        />
                                    )
                                })}

                                <g>
                                    <animateTransform
                                        attributeName="transform"
                                        type="rotate"
                                        from={`0 ${cx} ${cy}`}
                                        to={`360 ${cx} ${cy}`}
                                        dur="32s"
                                        repeatCount="indefinite"
                                    />
                                    <path
                                        d={gearRingPath(cx, cy, 10, maxR * 0.73, maxR * 0.64)}
                                        fill="none"
                                        stroke="var(--secondary)"
                                        strokeOpacity="0.35"
                                        strokeWidth="0.9"
                                        strokeLinejoin="miter"
                                    />
                                    {Array.from({ length: 8 }).map((_, i) => {
                                        const a = (i * 45 * Math.PI) / 180
                                        const r = maxR * 0.64
                                        return (
                                            <line key={i}
                                                x1={cx + Math.cos(a) * (r - 10)} y1={cy + Math.sin(a) * (r - 10)}
                                                x2={cx + Math.cos(a) * r} y2={cy + Math.sin(a) * r}
                                                stroke="var(--secondary)"
                                                strokeOpacity="0.30"
                                                strokeWidth="0.8"
                                            />
                                        )
                                    })}
                                </g>

                                <g>
                                    <animateTransform
                                        attributeName="transform"
                                        type="rotate"
                                        from={`0 ${cx} ${cy}`}
                                        to={`-360 ${cx} ${cy}`}
                                        dur="14s"
                                        repeatCount="indefinite"
                                    />
                                    <path
                                        d={gearRingPath(cx, cy, 7, maxR * 0.49, maxR * 0.41)}
                                        fill="none"
                                        stroke="var(--secondary)"
                                        strokeOpacity="0.30"
                                        strokeWidth="0.7"
                                        strokeLinejoin="miter"
                                    />
                                    {Array.from({ length: 6 }).map((_, i) => {
                                        const a = (i * 60 * Math.PI) / 180
                                        const r = maxR * 0.41
                                        return (
                                            <line key={i}
                                                x1={cx + Math.cos(a) * (r - 8)} y1={cy + Math.sin(a) * (r - 8)}
                                                x2={cx + Math.cos(a) * r} y2={cy + Math.sin(a) * r}
                                                stroke="var(--secondary)"
                                                strokeOpacity="0.25"
                                                strokeWidth="0.6"
                                            />
                                        )
                                    })}
                                </g>

                                <g clipPath="url(#radar-clip)">
                                    <SweepArm cx={cx} cy={cy} maxR={maxR} onCrossRef={onCrossRef} />
                                </g>

                                {step >= 1 && DEPARTMENTS.map((d, i) => {
                                    const pos = polarToXY(d.angle, d.radius, cx, cy, maxR)
                                    const fk = flashKeys[d.id] ?? 0
                                    return (
                                        <motion.g key={d.id}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.09, type: "spring", stiffness: 280, damping: 22 }}
                                            style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                                        >
                                            {fk > 0 && (
                                                <motion.circle
                                                    key={`lock-${fk}`}
                                                    cx={pos.x} cy={pos.y}
                                                    r={21}
                                                    fill="none"
                                                    stroke="var(--secondary)"
                                                    strokeWidth="2"
                                                    initial={{ pathLength: 0, strokeOpacity: 0.95 }}
                                                    animate={{ pathLength: 1, strokeOpacity: 0.30 }}
                                                    transition={{ duration: 0.40, ease: "easeOut" }}
                                                />
                                            )}
                                            {fk > 0 && (
                                                <motion.rect
                                                    key={`flash-${fk}`}
                                                    x={pos.x - 4} y={pos.y - 4}
                                                    width={8} height={8}
                                                    fill="var(--secondary)"
                                                    initial={{ opacity: 1, scale: 2.8, rotate: 45 }}
                                                    animate={{ opacity: 0, scale: 0.4 }}
                                                    transition={{ duration: 0.30, ease: "easeOut" }}
                                                    style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                                                />
                                            )}
                                            <line x1={cx} y1={cy} x2={pos.x} y2={pos.y}
                                                stroke="var(--secondary)" strokeOpacity="0.15"
                                                strokeWidth="0.5" strokeDasharray="2 7" />
                                            <circle cx={pos.x} cy={pos.y} r={21} fill="none"
                                                stroke="var(--secondary)" strokeOpacity="0.35" strokeWidth="1" />
                                            <circle cx={pos.x} cy={pos.y} r={13} fill="none"
                                                stroke="var(--secondary)" strokeOpacity="0.45" strokeWidth="0.5" />
                                            <line x1={pos.x - 26} y1={pos.y} x2={pos.x - 17} y2={pos.y}
                                                stroke="var(--secondary)" strokeOpacity="0.5" strokeWidth="0.75" />
                                            <line x1={pos.x + 17} y1={pos.y} x2={pos.x + 26} y2={pos.y}
                                                stroke="var(--secondary)" strokeOpacity="0.5" strokeWidth="0.75" />
                                            <line x1={pos.x} y1={pos.y - 26} x2={pos.x} y2={pos.y - 17}
                                                stroke="var(--secondary)" strokeOpacity="0.5" strokeWidth="0.75" />
                                            <line x1={pos.x} y1={pos.y + 17} x2={pos.x} y2={pos.y + 26}
                                                stroke="var(--secondary)" strokeOpacity="0.5" strokeWidth="0.75" />
                                            <circle cx={pos.x} cy={pos.y} r={4.5}
                                                fill="var(--secondary)" fillOpacity="1" filter="url(#glow-soft)" />
                                            <circle cx={pos.x} cy={pos.y} r={1.8} fill="var(--secondary)" />
                                            <text x={pos.x} y={pos.y - 30} textAnchor="middle"
                                                fill="var(--secondary)" fillOpacity="1"
                                                fontSize="8.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.2"
                                            >
                                                {d.id}
                                            </text>
                                        </motion.g>
                                    )
                                })}


                                <circle cx={cx} cy={cy} r={9}
                                    fill="none" stroke="var(--secondary)" strokeOpacity="0.3" strokeWidth="0.6" />
                                <circle cx={cx} cy={cy} r={3.5}
                                    fill="var(--secondary)" fillOpacity="0.8" filter="url(#glow-soft)" />

                                <text x={cx} y={cy + 56} textAnchor="middle"
                                    fill="var(--secondary)" fillOpacity="0.9"
                                    fontSize="10" fontFamily="monospace" fontWeight="700" letterSpacing="4"
                                >
                                    TRINEXTA
                                </text>

                            </svg>
                        </div>
                    </div>

                </div>
            </Container>
        </Section>
    )
}
