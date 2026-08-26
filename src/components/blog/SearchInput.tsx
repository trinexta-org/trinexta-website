"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SearchInputContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") || "";

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get("q") as string;
    
    if (q) {
      router.push(`/blog?q=${encodeURIComponent(q)}`);
    } else {
      router.push(`/blog`); 
    }
  };

  return (
    <form onSubmit={handleSearch} className="px-4">
      <h4 className="text-[10px] font-bold uppercase text-primary/50 tracking-widest mb-4">Recherche</h4>
      <input 
        key={currentQuery}
        defaultValue={currentQuery}
        name="q"
        type="text" 
        placeholder="Rechercher un article..." 
        className="w-full bg-surface-strong border border-secondary/20 rounded-xl px-4 py-2 text-sm text-primary placeholder:text-primary/40 focus:outline-none focus:border-secondary transition-colors"
      />
    </form>
  );
}

export function SearchInput() {
  return (
    <Suspense fallback={
      <div className="px-4">
        <h4 className="text-[10px] font-bold uppercase text-primary/50 tracking-widest mb-4">Recherche</h4>
        <input 
          disabled 
          type="text" 
          placeholder="Chargement..." 
          className="w-full bg-surface-strong border border-secondary/20 rounded-xl px-4 py-2 text-sm text-primary opacity-50"
        />
      </div>
    }>
      <SearchInputContent />
    </Suspense>
  );
}