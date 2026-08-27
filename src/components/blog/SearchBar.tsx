"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="w-full md:w-80 lg:w-96">
      <form onSubmit={(e) => e.preventDefault()} className="relative group">
        
        <div className="absolute inset-0 bg-secondary/20 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Rechercher un article..."
          className="relative w-full bg-surface-strong backdrop-blur-md border border-secondary/20 rounded-full py-2.5 pl-11 pr-4 
                     text-primary text-sm placeholder:text-primary/40 shadow-lg transition-all duration-300
                     hover:bg-white hover:border-secondary/30
                     focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
        />
        
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-primary/40 group-focus-within:text-secondary-strong transition-colors duration-300">
          <Search className="w-4 h-4" />
        </div>
        
      </form>
    </div>
  );
}