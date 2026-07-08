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
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-full border border-secondary/40 object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-secondary/40 bg-secondary/15 font-serif text-sm italic text-secondary"
          >
            T
          </span>
        )}
        <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-white/15 bg-white/5 px-4 py-3 sm:max-w-[75%]">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex justify-end", className)}>
      <div className="max-w-[85%] rounded-2xl rounded-tr-md border border-secondary/40 bg-secondary/15 px-4 py-3 sm:max-w-[75%]">
        {children}
      </div>
    </div>
  );
}
