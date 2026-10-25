import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  side: "trinexta" | "user";
  children: ReactNode;
  className?: string;
}

/** Bulle du fil de conversation de l'estimation. Côté TRINEXTA : monogramme aux couleurs de la charte. */
export function ChatBubble({ side, children, className }: ChatBubbleProps) {
  if (side === "trinexta") {
    return (
      <div className={cn("flex items-start gap-3", className)}>
        <span
          role="img"
          aria-label="TRINEXTA"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-secondary bg-primary font-serif text-sm italic text-primary-foreground"
        >
          T
        </span>
        <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-border bg-white px-4 py-3 shadow-sm sm:max-w-[75%]">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex justify-end", className)}>
      <div className="max-w-[85%] rounded-2xl rounded-tr-md border border-secondary-soft bg-secondary-soft/20 px-4 py-3 sm:max-w-[75%]">
        {children}
      </div>
    </div>
  );
}