"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal, X, ShoppingBag, Star, ArrowRight } from "lucide-react";
import { useCompareStore } from "@/store/useCompareStore";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";

export default function ComparePage() {
  const items = useCompareStore((s) => s.items);
  const removeFromCompare = useCompareStore((s) => s.removeFromCompare);
  const clearCompare = useCompareStore((s) => s.clearCompare);
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="pt-6 pb-20 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Compare Products ({items.length})
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Compare price, fabric, supplier rating, and features side by side
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearCompare}
            className="text-xs text-[#681a72] dark:text-rose-400 font-bold hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-2xl p-16 text-center max-w-md mx-auto shadow-xs">
          <SlidersHorizontal className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h2 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-1">
            No Products Selected to Compare
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            Browse our trending Velora collections and compare your favorite items.
          </p>
          <Link
            href="/shop"
            className="px-5 py-2.5 bg-[#681a72] hover:bg-[#52135a] text-white text-xs font-bold rounded-lg inline-block transition-colors"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-x-auto shadow-xs">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="p-4 w-44 font-bold text-gray-400 uppercase text-[11px]">Product</th>
                {items.map((p) => (
                  <th key={p.id} className="p-4 w-64 min-w-[220px]">
                    <div className="relative">
                      <button
                        onClick={() => removeFromCompare(p.id)}
                        className="absolute -top-2 -right-2 p-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800 mb-2">
                        <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white line-clamp-2">{p.title}</h4>
                      <p className="text-base font-black text-[#681a72] dark:text-rose-400 mt-1">{formatPrice(p.price)}</p>
                      <button
                        onClick={() => addItem(p, 1)}
                        className="mt-2 w-full py-1.5 bg-[#681a72] hover:bg-[#52135a] text-white font-bold rounded-md flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              <tr>
                <td className="p-4 font-bold text-gray-500">Rating</td>
                {items.map((p) => (
                  <td key={p.id} className="p-4 font-bold text-emerald-600">
                    {p.rating} ★ ({p.reviewsCount} Reviews)
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-gray-500">Category</td>
                {items.map((p) => (
                  <td key={p.id} className="p-4">{p.category}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-gray-500">Fabric</td>
                {items.map((p) => (
                  <td key={p.id} className="p-4">{p.fabric || "Premium Blend"}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-gray-500">Free Delivery</td>
                {items.map((p) => (
                  <td key={p.id} className="p-4 text-emerald-600 font-bold">Yes (All India)</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-gray-500">Supplier</td>
                {items.map((p) => (
                  <td key={p.id} className="p-4">{p.supplier?.name || "Verified Wholesale"}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}