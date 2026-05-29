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
      className="relative overflow-hidden rounded-xl border border-white/[0.08]"
      style={{ "--metric-delay": `${rowIndex * 1.3}s` } as React.CSSProperties}
    >
      <div className="relative z-20 border-b border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.20em] text-secondary">
        {metric.indicator}
      </div>
      <div className="relative min-h-[52px]">
        <div className="metric-sweep pointer-events-none absolute inset-0 z-10 bg-secondary/20" />
        <div className="metric-avant absolute inset-0 flex flex-col justify-center px-3 py-2.5">
          <div className="mb-1 text-[8.5px] font-bold uppercase tracking-widest text-red-500/85">
            Avant
          </div>
          <div className="text-xs leading-tight text-white/55">
            {metric.before}
          </div>
        </div>
        <div className="metric-apres absolute inset-0 flex flex-col justify-center px-3 py-2.5">
          <div className="mb-1 text-[8.5px] font-bold uppercase tracking-widest text-green-500/85">
            Après
          </div>
          <div className="text-xs font-bold leading-tight text-white">
            {metric.after}
          </div>
        </div>
      </div>
    </div>
  )
}
