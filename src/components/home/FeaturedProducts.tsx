"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, SlidersHorizontal } from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import { sound } from "@/lib/sound";

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<"all" | "Horology" | "Acoustics" | "Apparel" | "deals">("all");

  const filterProducts = (): Product[] => {
    if (activeTab === "all") return PRODUCTS;
    if (activeTab === "deals") return PRODUCTS.filter((p) => p.isDeal || p.discountBadge);
    return PRODUCTS.filter((p) => p.category === activeTab);
  };

  const currentProducts = filterProducts();

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      {/* Header & Department Filter Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37] flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Permanent & Numbered Allocations
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide">
            Masterpieces of the Atelier
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl glass-panel border border-white/10">
          {[
            { id: "all", label: "All Works" },
            { id: "Horology", label: "Horology" },
            { id: "Acoustics", label: "Acoustics" },
            { id: "Apparel", label: "Apparel" },
            { id: "deals", label: "Private Allocations" },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  sound.playClick();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all ${
                  isSelected
                    ? "bg-[#d4af37] text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Cards Grid with 3D Tilt */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Bottom CTA to shop full collection */}
      <div className="mt-16 text-center">
        <Link
          href="/shop"
          onClick={() => sound.playClick()}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl glass-panel border border-white/20 hover:border-[#d4af37] text-white hover:text-[#d4af37] font-mono text-xs uppercase tracking-widest transition-all hover:scale-105 shadow-xl"
        >
          <span>Explore Entire Atelier Archive (68 Creations)</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
