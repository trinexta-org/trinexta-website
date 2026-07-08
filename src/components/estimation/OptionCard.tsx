"use client";

import { cn } from "@/lib/utils";

interface OptionCardProps {
  label: string;
  description?: string;
  selected: boolean;
  multiple?: boolean;
  onClick: () => void;
}

/** Réponse rapide du fil de conversation. */
export function OptionCard({ label, description, selected, multiple, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      role={multiple ? "checkbox" : "radio"}
      aria-checked={selected}
      className={cn(
        "group flex h-full w-full items-start justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
        "motion-safe:hover:-translate-y-0.5",
        selected
          ? "border-secondary bg-secondary/15"
          : "border-white/15 bg-white/5 hover:border-secondary/60 hover:bg-white/10"
      )}
    >
      <span className="min-w-0">
        <span className="block text-sm font-bold text-white">{label}</span>
        {description && <span className="mt-0.5 block text-xs text-white/60">{description}</span>}
      </span>

      {multiple ? (
        <span
          aria-hidden="true"
          className={cn(
            "mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md border transition-colors",
            selected ? "border-secondary bg-secondary" : "border-white/30 group-hover:border-secondary/60"
          )}
        >
          {selected && (
            <svg
              className="h-3 w-3 text-primary animate-badge-pop"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </span>
      ) : selected ? (
        <span
          aria-hidden="true"
          className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-secondary animate-badge-pop"
        >
          <svg
            className="h-3 w-3 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      ) : (
        <svg
          aria-hidden="true"
          className={cn(
            "mt-1 h-3.5 w-3.5 shrink-0 text-secondary",
            "opacity-0 -translate-x-1 transition-all duration-200",
            "group-hover:opacity-100 motion-safe:group-hover:translate-x-0"
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M20 12H4" />
        </svg>
      )}
    </button>
  );
}
