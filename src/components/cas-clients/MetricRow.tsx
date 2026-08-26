import React from "react"

interface MetricRowProps {
  metric: {
    indicator: string
    before: string
    after: string
  }
  rowIndex: number
}

export function MetricRow({ metric, rowIndex }: MetricRowProps) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-secondary/30 bg-white/60"
      style={{ "--metric-delay": `${rowIndex * 1.3}s` } as React.CSSProperties}
    >
      <div className="relative z-20 border-b border-secondary/20 bg-white/70 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.20em] text-primary">
        {metric.indicator}
      </div>
      <div className="relative min-h-[52px]">
        <div className="metric-sweep pointer-events-none absolute inset-0 z-10 bg-secondary/25" />
        <div className="metric-avant absolute inset-0 flex flex-col justify-center px-3 py-2.5">
          <div className="mb-1 text-[9px] font-bold uppercase tracking-widest text-red-700">
            Avant
          </div>
          <div className="text-sm font-medium leading-tight text-primary/80">
            {metric.before}
          </div>
        </div>
        <div className="metric-apres absolute inset-0 flex flex-col justify-center px-3 py-2.5">
          <div className="mb-1 text-[9px] font-bold uppercase tracking-widest text-green-800">
            Après
          </div>
          <div className="text-sm font-bold leading-tight text-primary">
            {metric.after}
          </div>
        </div>
      </div>
    </div>
  )
}