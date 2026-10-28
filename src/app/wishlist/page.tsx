"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingBag, ArrowRight, Trash2, ArrowLeft } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import ProductCard from "@/components/ui/ProductCard";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const clearWishlist = useWishlistStore((s) => s.clearWishlist);
  const addItem = useCartStore((s) => s.addItem);

  const handleMoveAllToBag = () => {
    items.forEach((p) => addItem(p, 1));
  };

  return (
    <div className="pt-6 pb-20 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <Link href="/" className="hover:text-[#681a72]">Home</Link>
            <span>/</span>
            <span className="text-gray-800 dark:text-gray-200 font-medium">My Wishlist</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#e11d48] fill-[#e11d48]" />
            My Wishlist ({items.length})
          </h1>
        </div>

        {items.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={clearWishlist}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-red-400 text-gray-500 hover:text-red-500 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Wishlist</span>
            </button>

            <button
              onClick={handleMoveAllToBag}
              className="px-5 py-2 rounded-lg bg-[#681a72] hover:bg-[#52135a] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Move All to Cart ({items.length})</span>
            </button>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-2xl p-16 text-center max-w-md mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/30 text-[#e11d48] flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            Your Wishlist is Empty
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            Tap the heart icon on any product to save your favorites here.
          </p>
          <Link
            href="/shop"
            className="px-6 py-2.5 bg-[#681a72] hover:bg-[#52135a] text-white font-bold text-xs rounded-xl shadow-md transition-all inline-block"
          >
            Explore Collections
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
