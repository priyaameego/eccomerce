"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal, X, ShoppingBag, Star, Sparkles, ArrowRight } from "lucide-react";
import { useCompareStore } from "@/store/useCompareStore";
import { useCartStore } from "@/store/useCartStore";
import { usePreferencesStore } from "@/store/usePreferencesStore";
import { formatPrice } from "@/lib/utils";
import { sound } from "@/lib/sound";

export default function ComparePage() {
  const items = useCompareStore((s) => s.items);
  const removeFromCompare = useCompareStore((s) => s.removeFromCompare);
  const clearCompare = useCompareStore((s) => s.clearCompare);

  const addItem = useCartStore((s) => s.addItem);
  const currency = usePreferencesStore((s) => s.currency);

  return (
    <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37] flex items-center gap-2 mb-2">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Telemetry Matrix
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide">
            Side-by-Side Atelier Comparison
          </h1>
        </div>

        {items.length > 0 && (
          <button
            onClick={() => {
              clearCompare();
              sound.playClick();
            }}
            className="text-xs font-mono text-neutral-400 hover:text-red-400 underline"
          >
            Clear Matrix
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="py-24 text-center rounded-3xl glass-panel border border-white/10 p-8 max-w-xl mx-auto">
          <SlidersHorizontal className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-white mb-2">Comparison Matrix is Empty</h2>
          <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
            Select up to 4 creations from the catalog to analyze microscopic tolerances, calibers, and materials side-by-side.
          </p>
          <Link
            href="/shop"
            className="px-8 py-3.5 rounded-2xl bg-[#d4af37] text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-[#c5a059] transition-all inline-block shadow-lg"
          >
            Explore Catalog
          </Link>
        </div>
      ) : (
        <div className="rounded-3xl glass-card border border-white/10 overflow-x-auto shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-6 text-xs font-mono uppercase tracking-widest text-[#d4af37] w-48 bg-white/5">
                  Parameters
                </th>
                {items.map((prod) => (
                  <th key={prod.id} className="p-6 min-w-[240px]">
                    <div className="flex items-start justify-between gap-2">
                      <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-black/40 border border-white/10 p-2 mx-auto">
                        <Image src={prod.images[0]} alt="" fill className="object-contain p-2" />
                      </div>
                      <button
                        onClick={() => {
                          removeFromCompare(prod.id);
                          sound.playClick();
                        }}
                        className="p-1 rounded-full text-neutral-500 hover:text-white hover:bg-white/10"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-4 text-center">
                      <span className="text-[10px] font-mono uppercase text-[#d4af37]">{prod.brand}</span>
                      <h4 className="text-sm font-semibold text-white truncate">{prod.title}</h4>
                      <p className="text-sm font-mono font-bold text-[#d4af37] mt-1">
                        {formatPrice(prod.price, currency)}
                      </p>

                      <button
                        onClick={() => {
                          addItem(prod, 1);
                          sound.playSuccess();
                        }}
                        className="mt-3 w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-[#d4af37] hover:text-black text-white text-xs font-mono transition-colors flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Acquire Piece
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-mono">
              <tr>
                <td className="p-4 font-semibold text-neutral-400 bg-white/5">Department</td>
                {items.map((p) => (
                  <td key={p.id} className="p-4 text-white">{p.category} • {p.subcategory}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-neutral-400 bg-white/5">Patron Rating</td>
                {items.map((p) => (
                  <td key={p.id} className="p-4 text-amber-400">
                    ★ {p.rating} ({p.reviewsCount} reviews)
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-neutral-400 bg-white/5">Allocation Run</td>
                {items.map((p) => (
                  <td key={p.id} className="p-4 text-[#d4af37]">
                    {p.editionText || "Numbered Atelier Run"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-neutral-400 bg-white/5">Available Finishes</td>
                {items.map((p) => (
                  <td key={p.id} className="p-4 text-neutral-300">
                    {p.colors.map((c) => c.name).join(", ")}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-neutral-400 bg-white/5">Core Architecture</td>
                {items.map((p) => (
                  <td key={p.id} className="p-4 text-white font-medium">
                    {p.specs["Caliber"] || p.specs["Transducer"] || p.specs["Motor"] || p.specs["Midsole"] || "Atelier Proprietary"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-neutral-400 bg-white/5">Case / Monocoque</td>
                {items.map((p) => (
                  <td key={p.id} className="p-4 text-neutral-300">
                    {p.specs["Case Material"] || p.specs["Frame"] || p.specs["Base"] || p.specs["Fabric"] || "Titanium / Carbon"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-neutral-400 bg-white/5">Autonomous Power</td>
                {items.map((p) => (
                  <td key={p.id} className="p-4 text-cyan-400">
                    {p.specs["Power Reserve"] || p.specs["Battery Life"] || p.specs["Range"] || "Unlimited Coaxial"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
