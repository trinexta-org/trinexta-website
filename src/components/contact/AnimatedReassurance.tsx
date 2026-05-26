"use client";

import { useEffect, useState } from "react";

const phrases = [
  { icon: "clock", text: "Réponse garantie sous 24h" },
  { icon: "headset", text: "Support critique disponible 24/7" },
  { icon: "award", text: "Experts certifiés basés en France" },
];

const HOLD_MS = 2400;

export function AnimatedReassurance() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState<boolean[]>([false, false, false]);
  const [progress, setProgress] = useState(0);

  // Staggered entrance
  useEffect(() => {
    phrases.forEach((_, i) => {
      setTimeout(() => {
        setVisible((v) => {
          const next = [...v];
          next[i] = true;
          return next;
        });
      }, i * 150);
    });
    // Start cycling after entrance
    const startDelay = setTimeout(() => setActive(0), 500);
    return () => clearTimeout(startDelay);
  }, []);

  // Progress bar + cycle
  useEffect(() => {
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / HOLD_MS) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setActive((a) => (a + 1) % phrases.length);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <div className="space-y-0 pt-8 border-t border-white/20">
      {phrases.map((phrase, i) => {
        const isActive = active === i;
        const isNext = (active + 1) % phrases.length === i;

        return (
          <div key={phrase.text}>
            <div
              className={`flex items-center gap-3 py-2.5 transition-all duration-500 ${
                visible[i] ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
            >
              {/* Badge */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-400 text-xs font-bold shadow-sm ${
                  isActive
                    ? "bg-secondary text-white scale-110"
                    : "bg-white/10 text-white/60"
                }`}
              >
                ✓
              </div>

              {/* Text */}
              <span
                className={`font-medium transition-all duration-400 ${
                  isActive
                    ? "text-white"
                    : isNext
                    ? "text-white/60"
                    : "text-white/50"
                }`}
              >
                {phrase.text}
              </span>
            </div>

            {/* Progress bar between items */}
            {i < phrases.length - 1 && (
              <div className="ml-[1.125rem] h-px bg-white/10 overflow-hidden rounded-full">
                <div
                  className="h-full bg-secondary/60 rounded-full transition-none"
                  style={{
                    width: isActive ? `${progress}%` : "0%",
                    transition: isActive ? "none" : "width 0.3s ease",
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
