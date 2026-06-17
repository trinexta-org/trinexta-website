"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="w-full md:w-80 lg:w-96"> {/* Largeur contrôlée pour s'aligner avec les filtres */}
      <form onSubmit={(e) => e.preventDefault()} className="relative group">
        
        {/* Effet de lueur subtil au focus */}
        <div className="absolute inset-0 bg-secondary/20 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Rechercher un article..."
          className="relative w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-full py-2.5 pl-11 pr-4 
                     text-white text-sm placeholder:text-white/40 shadow-lg transition-all duration-300
                     hover:bg-white/10 hover:border-white/20
                     focus:bg-white/10 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
        />
        
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-white/40 group-focus-within:text-secondary transition-colors duration-300">
          <Search className="w-4 h-4" />
        </div>
        
      </form>
    </div>
  );
}