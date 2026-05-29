"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get("q") as string;
    router.push(q ? `/blog?q=${q}` : "/blog");
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto px-6 mb-16">
      <div className="relative group">
        
        <div className="absolute inset-0 bg-secondary/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
        
        <input
          name="q"
          defaultValue={searchParams.get("q") || ""}
          placeholder="Rechercher un article..."
          className="relative w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl py-4 pl-6 pr-14 
                     text-white placeholder:text-white/40 shadow-2xl
                     transition-all duration-300 ease-out
                     hover:bg-white/10 hover:border-white/20
                     focus:bg-white/10 focus:border-secondary focus:ring-4 focus:ring-secondary/20 focus:outline-none"
        />
        
        <button 
          type="submit" 
          className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 transition-all duration-300 
                     group-hover:text-white/70 hover:!text-secondary z-10"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}