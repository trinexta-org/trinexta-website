import { cn } from "@/lib/utils"

type Intensity = "low" | "mid" | "high"

interface HaloBackgroundProps {
    intensity?: Intensity
    grain?: boolean
    className?: string
}

const INTENSITY_CLASSES: Record<Intensity, { top: string; bottom: string }> = {
    low: { top: "bg-secondary/5", bottom: "bg-secondary/5" },
    mid: { top: "bg-secondary/10", bottom: "bg-secondary/5" },
    high: { top: "bg-secondary/10", bottom: "bg-secondary/5" },
}

const GRAIN_SVG =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

export function HaloBackground({ intensity = "low", grain = false, className }: HaloBackgroundProps) {
    const { top, bottom } = INTENSITY_CLASSES[intensity]

    return (
        <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10", className)}>
            <div
                className={cn(
                    "absolute -top-40 left-1/2 h-[480px] w-[720px] max-w-full -translate-x-1/2 rounded-full blur-[140px]",
                    top,
                )}
            />
            <div className={cn("absolute -left-48 bottom-0 h-[420px] w-[560px] rounded-full blur-[120px]", bottom)} />
            {grain && (
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: GRAIN_SVG }} />
            )}
        </div>
    )
}