"use client";

import { useEffect, useRef, useState } from "react";
import { getScoreBand, type ScoreBand } from "@/data/audit-seo";
import type { AxisScore } from "@/lib/audit-seo/types";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const barByBand: Record<ScoreBand, string> = {
  haut: "bg-emerald-400",
  moyen: "bg-amber-400",
  bas: "bg-red-400",
};

const textByBand: Record<ScoreBand, string> = {
  haut: "text-emerald-400",
  moyen: "text-amber-400",
  bas: "text-red-400",
};

export function AxisBreakdown({ axes }: { axes: AxisScore[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const [progress, setProgress] = useState(0); // 0 → 1

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = () => {
      if (started.current) return;
      started.current = true;
      if (reduce) {
        setProgress(1);
        return;
      }
      const duration = 1200;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        setProgress(easeOutCubic(t));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-black/20 p-6">
      <p className="text-[11px] font-bold uppercase tracking-widest text-secondary">
        Le détail par axe
      </p>
      <ul className="mt-5 space-y-4">
        {axes.map((axis) => {
          const measured = axis.measured && axis.score !== null;
          const band = measured ? getScoreBand(axis.score as number) : null;
          const shown = measured ? Math.round((axis.score as number) * progress) : 0;
          const width = measured ? (axis.score as number) * progress : 0;
          return (
            <li key={axis.axis}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="text-white/70">{axis.label}</span>
                {measured ? (
                  <span className={`font-bold tabular-nums ${textByBand[band as ScoreBand]}`}>
                    {shown}
                    <span className="text-white/40">/100</span>
                  </span>
                ) : (
                  <span className="text-xs font-bold uppercase tracking-wide text-white/40">
                    Non mesuré
                  </span>
                )}
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                {measured && (
                  <div
                    className={`h-full rounded-full ${barByBand[band as ScoreBand]}`}
                    style={{ width: `${width}%` }}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
