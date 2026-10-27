"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  SlidersHorizontal,
  Grid3X3,
  LayoutList,
  Sparkles,
  Search,
  RotateCcw,
  Star,
  X,
} from "lucide-react";
import { PRODUCTS, CATEGORIES, Product } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import { formatPrice } from "@/lib/utils";
import { usePreferencesStore } from "@/store/usePreferencesStore";
import { sound } from "@/lib/sound";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialFilter = searchParams.get("filter") || "";
  const initialDeal = searchParams.get("deal") === "true";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(12000);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const currency = usePreferencesStore((s) => s.currency);

  // Filter logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== "all" && p.category !== selectedCategory) {
        return false;
      }
      // Deal query
      if (initialDeal && !p.isDeal && !p.discountBadge) {
        return false;
      }
      // Search query
      if (
        searchQuery &&
        !p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Price
      if (p.price > priceRange) return false;
      // Rating
      if (selectedRating > 0 && p.rating < selectedRating) return false;
      // Stock
      if (inStockOnly && (!p.inStock || p.stockCount === 0)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, initialDeal, searchQuery, priceRange, selectedRating, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setPriceRange(12000);
    setSelectedRating(0);
    setInStockOnly(false);
    setSortBy("featured");
    sound.playClick();
  };

  return (
    <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      {/* Header Banner */}
      <div className="mb-10 pb-8 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37] flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Atelier Vault & Catalog
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-wide">
              Permanent Works & Allocations
            </h1>
          </div>
          <p className="text-xs font-mono text-neutral-400">
            Displaying <strong className="text-[#d4af37]">{filteredProducts.length}</strong> of {PRODUCTS.length} curated creations
          </p>
        </div>
      </div>

      {/* Main Catalog Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Mobile Filter Button */}
        <div className="lg:hidden flex items-center justify-between p-3 rounded-2xl glass-panel border border-white/10">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 text-xs font-mono text-white"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#d4af37]" />
            <span>Refine Criteria ({filteredProducts.length})</span>
          </button>
          <button onClick={resetFilters} className="text-xs font-mono text-[#d4af37] underline">
            Reset
          </button>
        </div>

        {/* Filter Sidebar (Desktop or Mobile Drawer) */}
        <aside
          className={`lg:col-span-3 rounded-3xl glass-panel border border-white/10 p-6 space-y-6 ${
            mobileFilterOpen ? "block" : "hidden lg:block"
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#d4af37] flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Criteria Filters
            </h3>
            <button
              onClick={resetFilters}
              className="text-[11px] font-mono text-neutral-400 hover:text-white underline"
            >
              Reset
            </button>
          </div>

          {/* Keyword Search Input */}
          <div>
            <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-2">
              Instant Search
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Title, material, spec..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 font-sans outline-none focus:border-[#d4af37]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Department / Category */}
          <div>
            <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-2">
              Department
            </label>
            <div className="space-y-1.5">
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  sound.playClick();
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between transition-colors ${
                  selectedCategory === "all"
                    ? "bg-[#d4af37] text-black font-bold"
                    : "text-neutral-300 hover:bg-white/5"
                }`}
              >
                <span>All Disciplines</span>
                <span className="text-[10px] opacity-75">{PRODUCTS.length}</span>
              </button>

              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      sound.playClick();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between transition-colors ${
                      isSelected
                        ? "bg-[#d4af37] text-black font-bold"
                        : "text-neutral-300 hover:bg-white/5"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] opacity-75">{cat.itemCount}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-2">
              <span className="uppercase tracking-wider">Maximum Price</span>
              <span className="text-white font-bold">{formatPrice(priceRange, currency)}</span>
            </div>
            <input
              type="range"
              min="500"
              max="12000"
              step="250"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#d4af37] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-1">
              <span>{formatPrice(500, currency)}</span>
              <span>{formatPrice(12000, currency)}</span>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-2">
              Client Rating
            </label>
            <div className="space-y-1">
              {[4.9, 4.8, 0].map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setSelectedRating(r);
                    sound.playClick();
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 ${
                    selectedRating === r
                      ? "bg-white/10 text-[#d4af37] font-semibold border border-[#d4af37]/40"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{r === 0 ? "Any Atelier Rating" : `${r} Stars & Above`}</span>
                </button>
              ))}
            </div>
          </div>

          {/* In-Stock Toggle */}
          <div className="pt-2 border-t border-white/10">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs font-mono text-neutral-300">In Atelier Stock Only</span>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => {
                  setInStockOnly(e.target.checked);
                  sound.playClick();
                }}
                className="w-4 h-4 rounded accent-[#d4af37] cursor-pointer"
              />
            </label>
          </div>
        </aside>

        {/* Products Grid Area */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          {/* Top Sort Bar & View Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span>Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as any);
                  sound.playClick();
                }}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white font-mono outline-none focus:border-[#d4af37] cursor-pointer"
              >
                <option value="featured" className="bg-[#12131a]">Atelier Curated</option>
                <option value="price-asc" className="bg-[#12131a]">Price: Low to High</option>
                <option value="price-desc" className="bg-[#12131a]">Price: High to Low</option>
                <option value="rating" className="bg-[#12131a]">Patron Rating</option>
              </select>
            </div>

            {/* View Mode Grid / List */}
            <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => {
                  setViewMode("grid");
                  sound.playClick();
                }}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-[#d4af37] text-black" : "text-neutral-400 hover:text-white"
                }`}
                title="Grid view"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setViewMode("list");
                  sound.playClick();
                }}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "list" ? "bg-[#d4af37] text-black" : "text-neutral-400 hover:text-white"
                }`}
                title="List view"
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Filter Tags */}
          {(selectedCategory !== "all" || searchQuery || selectedRating > 0 || inStockOnly) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-neutral-400">Active Criteria:</span>
              {selectedCategory !== "all" && (
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 border border-white/10 text-white flex items-center gap-1.5">
                  Dept: {selectedCategory}
                  <button onClick={() => setSelectedCategory("all")}><X className="w-3 h-3" /></button>
                </span>
              )}
              {searchQuery && (
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 border border-white/10 text-white flex items-center gap-1.5">
                  &quot;{searchQuery}&quot;
                  <button onClick={() => setSearchQuery("")}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedRating > 0 && (
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 border border-white/10 text-white flex items-center gap-1.5">
                  {selectedRating}+ Stars
                  <button onClick={() => setSelectedRating(0)}><X className="w-3 h-3" /></button>
                </span>
              )}
              {inStockOnly && (
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 border border-white/10 text-white flex items-center gap-1.5">
                  In Stock Only
                  <button onClick={() => setInStockOnly(false)}><X className="w-3 h-3" /></button>
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-xs font-mono text-[#d4af37] hover:underline ml-2"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Products Results List */}
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center glass-panel rounded-3xl border border-white/10 p-8">
              <RotateCcw className="w-12 h-12 text-[#d4af37] mx-auto mb-4 animate-spin" />
              <h3 className="text-xl font-serif font-bold text-white mb-2">No Matching Creations</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-6">
                No pieces match your selected filters. Adjust your criteria or reset filters to browse the full atelier vault.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-xl bg-[#d4af37] text-black font-mono text-xs font-bold uppercase tracking-wider"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "grid grid-cols-1 gap-6"
              }
            >
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-32 flex items-center justify-center text-white font-mono text-xs">
          Loading Atelier Vault...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
