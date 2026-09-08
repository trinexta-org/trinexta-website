import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  side: "trinexta" | "user";
  /** Avatar Nexi (côté Trinexta uniquement), ex. /images/nexi/nexi1-avatar.png */
  avatar?: string;
  children: ReactNode;
  className?: string;
}

/** Bulle du fil de conversation de l'estimation. Côté Trinexta : Nexi, la mascotte. */
export function ChatBubble({ side, avatar, children, className }: ChatBubbleProps) {
  if (side === "trinexta") {
    return (
      <div className={cn("flex items-start gap-3", className)}>
        {avatar ? (
          <Image
            src={avatar}
            alt="Nexi, l'assistant Trinexta"
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-full border border-secondary/40 object-cover"
          />
        ) : (
          <span
            role="img"
            aria-label="Nexi, l'assistant Trinexta"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-secondary/40 bg-secondary/15 font-serif text-sm italic text-secondary-strong"
          >
            T
          </span>
        )}
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