"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [headerHeight, setHeaderHeight] = useState(100);
  useEffect(() => {
    const calculateHeight = () => {
      const header = document.querySelector("header");
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    calculateHeight(); 

    window.addEventListener("resize", calculateHeight);
    return () => window.removeEventListener("resize", calculateHeight);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get("q") as string;
    router.push(q ? `/blog?q=${q}` : "/blog");
  };

  return (
    <div 
      className="sticky z-30 w-full max-w-2xl mx-auto px-6 mb-8 lg:-mb-25"
      style={{ top: `${headerHeight + 16}px` }}
    >
      <form onSubmit={handleSearch} className="relative group">
        
        <div className="absolute inset-0 bg-secondary/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
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
      </form>
    </div>
  );
  
}