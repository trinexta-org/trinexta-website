"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("q") as string;
    
    if (query) {
      router.push(`/blog?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="px-4">
      <h4 className="text-[10px] font-bold uppercase text-white/40 tracking-widest mb-4">Recherche</h4>
      <input 
        name="q"
        type="text" 
        defaultValue={searchParams.get("q") || ""}
        placeholder="Rechercher un article..." 
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-secondary transition-colors"
      />
    </form>
  );
}