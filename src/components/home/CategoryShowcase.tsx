"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { CATEGORIES } from "@/data/products";
import { sound } from "@/lib/sound";

export default function CategoryShowcase() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37] flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Atelier Curations
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide">
            Explore By Discipline
          </h2>
        </div>
        <p className="text-xs text-neutral-400 max-w-md mt-3 md:mt-0 font-light">
          Each department represents an independent lab dedicated to pushing the limits of physics, metallurgy, and acoustic raytracing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {CATEGORIES.map((cat, idx) => {
          // Asymmetric Awwwards-style bento grid
          const colSpan = idx === 0 ? "md:col-span-7" : idx === 1 ? "md:col-span-5" : idx === 2 ? "md:col-span-4" : idx === 3 ? "md:col-span-4" : "md:col-span-4";
          const height = idx < 2 ? "h-[360px] md:h-[420px]" : "h-[300px] md:h-[340px]";

          return (
            <Link
              key={cat.slug}
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              onClick={() => sound.playClick()}
              className={`${colSpan} ${height} relative rounded-3xl overflow-hidden group glass-card border border-white/10 hover:border-[#d4af37]/50 transition-all duration-500 shadow-2xl block`}
            >
              {/* Background Photography with Zoom */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out filter brightness-[0.75] group-hover:brightness-90"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

              {/* Top Meta Tag */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase px-3 py-1 rounded-full glass-panel border border-[#d4af37]/30">
                  {cat.itemCount} Pieces
                </span>

                <div className="w-9 h-9 rounded-full glass-panel border border-white/20 flex items-center justify-center text-white group-hover:bg-[#d4af37] group-hover:text-black group-hover:border-[#d4af37] transition-all">
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </div>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[11px] font-mono tracking-wider text-neutral-300 uppercase mb-1">
                  Department {idx + 1}
                </p>
                <h3 className="text-2xl font-serif font-bold text-white group-hover:text-[#d4af37] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-neutral-300 mt-1 line-clamp-1 font-light">
                  {cat.tagline}
                </p>

                {/* Subcategory Pills */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {cat.subcategories.slice(0, 3).map((sub) => (
                    <span
                      key={sub}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-neutral-300 border border-white/10"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
