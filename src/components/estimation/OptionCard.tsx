"use client";

import { cn } from "@/lib/utils";

interface OptionCardProps {
  label: string;
  description?: string;
  selected: boolean;
  multiple?: boolean;
  onClick: () => void;
}

export function OptionCard({ label, description, selected, multiple, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      role={multiple ? "checkbox" : "radio"}
      aria-checked={selected}
      className={cn(
        "w-full rounded-2xl border p-5 text-left transition-all cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
        selected
          ? "border-secondary bg-secondary/15 shadow-md"
          : "border-white/15 bg-white/5 hover:border-secondary/60 hover:bg-white/10"
      )}
    >
      <span className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={cn(
            "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
            multiple && "rounded-md",
            selected ? "border-secondary bg-secondary" : "border-white/30"
          )}
        >
          {selected && (
            <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </span>
        <span>
          <span className="block font-bold text-white">{label}</span>
          {description && <span className="mt-1 block text-sm text-white/60">{description}</span>}
        </span>
      </span>
    </button>
  );
}
