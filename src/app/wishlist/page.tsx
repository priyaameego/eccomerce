"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingBag, ArrowRight, Sparkles, Trash2 } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import { usePreferencesStore } from "@/store/usePreferencesStore";
import ProductCard from "@/components/ui/ProductCard";
import { sound } from "@/lib/sound";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const clearWishlist = useWishlistStore((s) => s.clearWishlist);
  const addItem = useCartStore((s) => s.addItem);

  const handleMoveAllToBag = () => {
    items.forEach((p) => addItem(p, 1));
    sound.playSuccess();
  };

  return (
    <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37] flex items-center gap-2 mb-2">
            <Heart className="w-3.5 h-3.5 fill-[#d4af37]" />
            Private Vault Curation
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide">
            Your Private Wishlist
          </h1>
        </div>

        {items.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                clearWishlist();
                sound.playClick();
              }}
              className="px-4 py-2 rounded-xl border border-white/10 hover:border-red-500/50 text-neutral-400 hover:text-red-400 text-xs font-mono transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Wishlist</span>
            </button>

            <button
              onClick={handleMoveAllToBag}
              className="px-6 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#c5a059] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Acquire All ({items.length})</span>
            </button>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="py-24 text-center rounded-3xl glass-panel border border-white/10 p-8 max-w-xl mx-auto">
          <Heart className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-white mb-2">Your Private Wishlist is Empty</h2>
          <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
            Curate pieces that resonate with your horological and acoustic passions by clicking the heart icon on any creation.
          </p>
          <Link
            href="/shop"
            className="px-8 py-3.5 rounded-2xl bg-[#d4af37] text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-[#c5a059] transition-all inline-block shadow-lg"
          >
            Explore Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
}
