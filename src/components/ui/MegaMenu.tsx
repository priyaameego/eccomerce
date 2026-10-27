"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { usePreferencesStore } from "@/store/usePreferencesStore";
import { sound } from "@/lib/sound";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const [selectedCat, setSelectedCat] = useState("Horology");
  const currency = usePreferencesStore((s) => s.currency);
  const openQuickView = usePreferencesStore((s) => s.openQuickView);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentCategoryObj = CATEGORIES.find((c) => c.name === selectedCat) || CATEGORIES[0];
  const featuredProduct = PRODUCTS.find((p) => p.category === selectedCat) || PRODUCTS[0];

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 right-0 glass-panel bg-[#090a0f]/98 border-t border-b border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.85)] z-40 transition-all duration-300 animate-in fade-in slide-in-from-top-2"
    >
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#d4af37] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Haute Atelier Departments</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Category Selector */}
          <div className="md:col-span-4 flex flex-col gap-2 border-r border-white/10 pr-6">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCat === cat.name;
              return (
                <button
                  key={cat.name}
                  onMouseEnter={() => {
                    setSelectedCat(cat.name);
                    sound.playHover();
                  }}
                  onClick={() => {
                    setSelectedCat(cat.name);
                    sound.playClick();
                  }}
                  className={`group text-left p-3 rounded-xl transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-white/10 border border-[#d4af37]/40 text-white shadow-lg"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div>
                    <h4 className="text-sm font-medium tracking-wider group-hover:text-[#d4af37] transition-colors">
                      {cat.name}
                    </h4>
                    <p className="text-[11px] text-neutral-400 line-clamp-1">{cat.tagline}</p>
                  </div>
                  <span className="text-xs font-mono text-[#d4af37] opacity-60 group-hover:opacity-100">
                    {cat.itemCount}
                  </span>
                </button>
              );
            })}

            <div className="mt-4 pt-4 border-t border-white/10">
              <Link
                href="/shop"
                onClick={onClose}
                className="inline-flex items-center gap-2 text-xs font-mono text-[#d4af37] hover:underline"
              >
                <span>View Full Atelier Catalog</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Middle Column: Subcategories & Highlights */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <h5 className="text-xs font-mono tracking-widest uppercase text-neutral-400 mb-4">
                {currentCategoryObj.name} Specializations
              </h5>
              <div className="grid grid-cols-1 gap-2.5">
                {currentCategoryObj.subcategories.map((sub) => (
                  <Link
                    key={sub}
                    href={`/shop?category=${encodeURIComponent(currentCategoryObj.name)}&subcategory=${encodeURIComponent(sub)}`}
                    onClick={onClose}
                    className="p-2.5 rounded-lg border border-white/5 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-between text-xs text-neutral-200 hover:text-white group"
                  >
                    <span>{sub}</span>
                    <ArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-[#d4af37] transition-colors group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl glass-card border border-white/10 mt-4">
              <p className="text-[11px] font-mono text-[#d4af37] uppercase">Bespoke Commissions</p>
              <p className="text-xs text-neutral-300 mt-1">
                Custom engraved titanium bezels, monogrammed lambskin audio vaults, and tailored carbon fibers.
              </p>
              <Link
                href="/contact"
                onClick={onClose}
                className="mt-2 text-[11px] font-mono text-white underline hover:text-[#d4af37] block"
              >
                Book Private Consultation &rarr;
              </Link>
            </div>
          </div>

          {/* Right Column: Featured Masterpiece Spotlight Card */}
          <div className="md:col-span-4">
            <div className="relative rounded-2xl overflow-hidden glass-card border border-[#d4af37]/30 p-5 group flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40">
                  {featuredProduct.badge || "Featured"}
                </span>
                <span className="text-xs font-mono text-neutral-300">
                  {formatPrice(featuredProduct.price, currency)}
                </span>
              </div>

              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden my-2">
                <Image
                  src={featuredProduct.images[0]}
                  alt={featuredProduct.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="mt-3">
                <h4 className="text-sm font-serif font-bold text-white group-hover:text-[#d4af37] transition-colors">
                  {featuredProduct.title}
                </h4>
                <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">{featuredProduct.subtitle}</p>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => {
                      openQuickView(featuredProduct);
                      onClose();
                      sound.playClick();
                    }}
                    className="flex-1 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono tracking-wider transition-colors border border-white/10"
                  >
                    Quick View
                  </button>
                  <Link
                    href={`/product/${featuredProduct.slug}`}
                    onClick={onClose}
                    className="py-2 px-3 rounded-lg bg-[#d4af37] hover:bg-[#c5a059] text-black text-xs font-mono tracking-wider font-semibold transition-colors"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
