"use client";

import { Text } from "@/components/ui/Typography";
import { LinkedinIcon } from "../ui/icons/LinkedinIcon";

type ShareButtonsProps = {
  title: string;
  url: string;
};

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url;

  return (
    <div className="mt-16 pt-10 border-t border-white/10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 md:p-6 bg-white/5 border border-white/10 rounded-2xl">
        <Text className="text-lg font-bold text-white">
          Partager cet article
        </Text>
        
        <div className="flex items-center gap-3 w-full md:w-auto justify-center">
          <a 
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-secondary/30 hover:bg-secondary hover:border-secondary transition-all duration-300"
          >
            <LinkedinIcon/>
          </a>

          <a 
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-white/20 hover:bg-white hover:border-white transition-all duration-300"
          >
            <svg className="w-5 h-5 fill-current text-white/80 group-hover:text-primary" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}