"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Sparkles, ArrowRight } from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import { usePreferencesStore } from "@/store/usePreferencesStore";
import { formatPrice } from "@/lib/utils";

export default function SearchModal() {
  const isOpen = usePreferencesStore((s) => s.isSearchOpen);
  const setSearchOpen = usePreferencesStore((s) => s.setSearchOpen);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(!isOpen);
      }
      if (e.key === "Escape" && isOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setSearchOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setResults(PRODUCTS.slice(0, 6));
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(PRODUCTS.slice(0, 6));
      return;
    }
    const q = query.toLowerCase();
    const matched = PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    );
    setResults(matched);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sarees, kurtis, men shirts, bedsheets, earbuds..."
            className="w-full bg-transparent border-none text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-gray-400 hover:text-black">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setSearchOpen(false)}
            className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 font-medium"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400 px-2 pb-1">
            <span>{query ? `Search results for "${query}"` : "Trending on Velora"}</span>
            <span className="text-[#681a72] dark:text-rose-400 font-medium">{results.length} items</span>
          </div>

          {results.length === 0 ? (
            <div className="p-8 text-center text-xs text-gray-500">
              No matching products found. Try searching for "Saree", "Kurti", or "Shirt".
            </div>
          ) : (
            results.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                onClick={() => setSearchOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-rose-50/60 dark:hover:bg-rose-950/20 transition-colors group"
              >
                <div className="relative w-12 h-16 rounded-md overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700 bg-gray-50">
                  <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-[#681a72] dark:group-hover:text-rose-400">
                    {product.title}
                  </h4>
                  <p className="text-[11px] text-gray-400">{product.category} • {product.brand}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                      {formatPrice(product.price)}
                    </span>
                    {product.discountBadge && (
                      <span className="text-[10px] font-bold text-[#059669]">
                        {product.discountBadge}
                      </span>
                    )}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#681a72] dark:group-hover:text-rose-400 transition-transform group-hover:translate-x-1" />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
