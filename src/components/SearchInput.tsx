"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery("");
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && !(e.target as Element).closest('.search-container')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="search-container relative flex items-center">
      {/* Desktop Search: Always visible */}
      <form 
        onSubmit={handleSubmit} 
        className="hidden md:relative md:flex items-center w-72 lg:w-80"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What are you looking for?"
          className="w-full bg-gray-100 text-brand-navy pl-4 pr-10 py-2.5 rounded-full text-sm outline-none border border-transparent focus:border-brand-pink/30 focus:bg-white transition-all placeholder:text-gray-400"
        />
        <button 
          type="submit"
          className="absolute right-3.5 p-1 text-brand-navy hover:text-brand-pink transition-colors"
          aria-label="Search"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>

      {/* Mobile Search: Toggled */}
      <div className="md:hidden flex items-center">
        <form 
          onSubmit={handleSubmit} 
          className={`absolute top-full right-0 mt-3 bg-white p-2 rounded-2xl shadow-lg border border-gray-100 flex items-center transition-all duration-300 overflow-hidden ${
            isOpen ? "w-64 opacity-100 z-50" : "w-0 opacity-0 pointer-events-none"
          }`}
        >
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What are you looking for?"
            className="w-full bg-gray-50 text-brand-navy pl-3 pr-8 py-1.5 rounded-xl text-sm outline-none placeholder:text-gray-400"
          />
          <button 
            type="submit"
            className="absolute right-4 p-1 text-brand-navy hover:text-brand-pink transition-colors"
            aria-label="Search"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </form>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-brand-navy hover:text-brand-pink transition-colors"
          aria-label="Toggle search"
          type="button"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}
