"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Mic, MicOff, X, Sparkles, ArrowRight, CornerDownLeft } from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import { usePreferencesStore } from "@/store/usePreferencesStore";
import { formatPrice } from "@/lib/utils";
import { sound } from "@/lib/sound";

export default function SearchModal() {
  const isOpen = usePreferencesStore((s) => s.isSearchOpen);
  const setSearchOpen = usePreferencesStore((s) => s.setSearchOpen);
  const currency = usePreferencesStore((s) => s.currency);
  const openQuickView = usePreferencesStore((s) => s.openQuickView);

  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
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

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setResults(PRODUCTS.slice(0, 4));
    } else {
      setQuery("");
      setIsListening(false);
    }
  }, [isOpen]);

  // Search filter
  useEffect(() => {
    if (!query.trim()) {
      setResults(PRODUCTS.slice(0, 4));
      return;
    }
    const q = query.toLowerCase();
    const matched = PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    );
    setResults(matched);
  }, [query]);

  // Simulated Voice Search with SpeechRecognition fallback
  const handleVoiceSearch = () => {
    sound.playClick();
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      // Simulation mode
      setIsListening(true);
      setTimeout(() => {
        setQuery("Tourbillon");
        setIsListening(false);
        sound.playSuccess();
      }, 1500);
      return;
    }

    try {
      const SpeechRecognition =
        (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
        (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        sound.playSuccess();
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl glass-panel bg-[#090a0f]/98 rounded-3xl border border-white/20 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="relative flex items-center border-b border-white/10 pb-4">
          <Search className="w-5 h-5 text-[#d4af37] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isListening ? "Listening with AI acoustic analyzer..." : "Search creations, calibers, planar audio, materials..."}
            className="w-full bg-transparent text-base md:text-lg text-white placeholder-neutral-500 font-sans outline-none pr-24"
          />

          <div className="absolute right-0 flex items-center gap-2">
            <button
              onClick={handleVoiceSearch}
              className={`p-2 rounded-full border transition-all ${
                isListening
                  ? "bg-red-500/20 border-red-500 text-red-400 animate-pulse"
                  : "border-white/10 text-neutral-400 hover:text-white"
              }`}
              title="Voice Search"
            >
              {isListening ? <Mic className="w-4 h-4 text-red-400" /> : <Mic className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                setSearchOpen(false);
                sound.playClick();
              }}
              className="p-2 rounded-full border border-white/10 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Tag Pills */}
        <div className="flex items-center gap-2 mt-4 pb-3 overflow-x-auto text-xs font-mono text-neutral-400">
          <span className="text-[10px] uppercase text-[#d4af37] shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Trending:
          </span>
          {["Tourbillon", "Acoustics", "Hyper-Scooter", "Graphene", "Monolith"].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setQuery(tag);
                sound.playClick();
              }}
              className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[#d4af37]/50 hover:text-white transition-colors shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results Grid */}
        <div className="mt-4 max-h-[55vh] overflow-y-auto space-y-3 pr-1">
          {results.length === 0 ? (
            <div className="py-12 text-center text-neutral-400">
              <p className="text-sm">No atelier creations found for &quot;{query}&quot;</p>
              <p className="text-xs text-neutral-500 mt-1">Try keywords like titanium, tourbillon, acoustic, or luminaire.</p>
            </div>
          ) : (
            results.map((prod) => (
              <div
                key={prod.id}
                className="p-3 rounded-2xl glass-card border border-white/10 hover:border-[#d4af37]/40 flex items-center justify-between gap-4 transition-all group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                    <Image src={prod.images[0]} alt={prod.title} fill className="object-contain p-2" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#d4af37]">
                        {prod.brand}
                      </span>
                      {prod.badge && (
                        <span className="text-[9px] font-mono px-2 py-0.2 rounded-full bg-[#d4af37]/15 text-[#d4af37]">
                          {prod.badge}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/product/${prod.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="text-sm font-semibold text-white hover:text-[#d4af37] transition-colors truncate block"
                    >
                      {prod.title}
                    </Link>
                    <p className="text-xs text-neutral-400 truncate">{prod.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-mono font-bold text-white">
                    {formatPrice(prod.price, currency)}
                  </span>
                  <button
                    onClick={() => {
                      openQuickView(prod);
                      setSearchOpen(false);
                      sound.playClick();
                    }}
                    className="p-2 rounded-xl bg-white/10 hover:bg-[#d4af37] hover:text-black text-white text-xs font-mono transition-colors"
                    title="Quick View"
                  >
                    Preview
                  </button>
                  <Link
                    href={`/product/${prod.slug}`}
                    onClick={() => setSearchOpen(false)}
                    className="p-2 text-neutral-400 group-hover:text-white transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-[10px]">ESC</kbd> to close
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-[10px]">Cmd+K</kbd> quick launch
            </span>
          </div>
          <span className="text-[#d4af37]">AURELIA Neural Search V3</span>
        </div>
      </div>
    </div>
  );
}
