"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  score: number;
  colorClass: string; // ex. "text-amber-400" — pilote l'arc via stroke-current
  size?: number; // px
  label?: string;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const R = 42;
const CIRC = 2 * Math.PI * R;

export function ScoreGauge({ score, colorClass, size = 208, label = "Score SEO" }: Props) {
  const ref = useRef<SVGSVGElement>(null);
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
      const duration = 1400;
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
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const shown = Math.round(score * progress);
  const offset = CIRC * (1 - (score / 100) * progress);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        ref={ref}
        viewBox="0 0 100 100"
        className={`-rotate-90 ${colorClass}`}
        width={size}
        height={size}
        role="img"
        aria-label={`${label} : ${score} sur 100`}
      >
        <circle cx="50" cy="50" r={R} fill="none" strokeWidth="6" className="stroke-white/10" />
        <circle
          cx="50"
          cy="50"
          r={R}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          className="stroke-current"
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-6xl font-black tabular-nums leading-none ${colorClass}`}>{shown}</span>
        <span className="mt-1 text-xs font-bold uppercase tracking-widest text-white/40">/ 100</span>
      </div>
    </div>
  );
}
