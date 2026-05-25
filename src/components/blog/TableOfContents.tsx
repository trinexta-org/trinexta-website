"use client";

import { useActiveSection } from "@/components/blog/useActiveSection";
import { useEffect, useRef } from "react";

export function TableOfContents({ headings }: { headings: any[] }) {
  const activeId = useActiveSection(headings.map((h) => h.id));
  const isClicking = useRef(false);

  useEffect(() => {
    if (isClicking.current) return;
    if (!activeId) return;

    const activeElement = document.getElementById(`toc-link-${activeId}`);
    if (activeElement) {
      activeElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeId]);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-1">
      <h4 className="text-[10px] font-bold uppercase text-white/40 tracking-widest px-4 mb-6">
        Sommaire
      </h4>
      
      {headings.map((h, i) => {
        const isActive = activeId === h.id;
        const isSub = h.level === "h3";

        return (
          <a
            key={i}
            id={`toc-link-${h.id}`} // L'ID nécessaire pour le scroll fluide
            href={`#${h.id}`}
            onClick={() => {
              isClicking.current = true;
              setTimeout(() => { isClicking.current = false; }, 1000);
            }}
            className={`group flex items-start gap-3 px-4 py-3 rounded-xl transition-all duration-300 border-l-2
              ${isActive 
                ? "bg-white/5 border-secondary" 
                : "border-transparent opacity-60 hover:opacity-100 hover:bg-white/5"
              }
              ${isSub ? "ml-6" : ""}
            `}
          >
            <div className={`mt-1.5 w-1.5 h-1.5 rounded-full transition-colors duration-300
              ${isActive ? "bg-secondary" : "bg-white/20 group-hover:bg-white/50"}`} 
            />
            
            <span className={`text-sm font-medium transition-colors duration-300 
              ${isActive ? "text-white" : "text-white/70"}`}>
              {h.text}
            </span>
          </a>
        );
      })}
    </nav>
  );
}