"use client";

import React from "react";
import Image from "next/image";
import { Camera, Eye, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { usePreferencesStore } from "@/store/usePreferencesStore";
import { sound } from "@/lib/sound";

const LOOKBOOK_ITEMS = [
  {
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    location: "Lake Geneva • Private Salon",
    product: PRODUCTS[0], // Tourbillon
    tag: "Haute Horlogerie",
  },
  {
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
    location: "Zurich Tonhalle • Master Recording",
    product: PRODUCTS[1], // Headphones
    tag: "Spatial Acoustics",
  },
  {
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80",
    location: "Ginza Hyper-Grid • Tokyo",
    product: PRODUCTS[2], // Sneakers
    tag: "Kinetic Footwear",
  },
  {
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80",
    location: "Monaco Heliport",
    product: PRODUCTS[3], // Scooter
    tag: "Urban Mobility",
  },
];

export default function InteractiveLookbook() {
  const openQuickView = usePreferencesStore((s) => s.openQuickView);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37] flex items-center gap-2 mb-2">
            <Camera className="w-3.5 h-3.5" />
            Global Atelier Community
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide">
            Patron Chronicles In Situ
          </h2>
        </div>
        <p className="text-xs text-neutral-400 font-mono mt-2 md:mt-0">
          Tag #AureliaAtelier on Instagram or WeChat for archival consideration.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {LOOKBOOK_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="group relative aspect-[3/4] rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl"
          >
            <Image
              src={item.image}
              alt={item.location}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out filter brightness-90 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

            {/* Tag Badge */}
            <div className="absolute top-4 left-4">
              <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full glass-panel border border-white/10 text-white">
                {item.tag}
              </span>
            </div>

            {/* Hover Bottom Product Pill */}
            <div className="absolute bottom-5 left-5 right-5 flex flex-col justify-end">
              <p className="text-[11px] font-mono text-[#d4af37] mb-1">{item.location}</p>
              <h4 className="text-sm font-semibold text-white truncate">{item.product.title}</h4>

              <button
                onClick={() => {
                  openQuickView(item.product);
                  sound.playClick();
                }}
                className="mt-3 py-2 px-3 rounded-xl bg-white/10 hover:bg-[#d4af37] hover:text-black text-white text-xs font-mono tracking-wider transition-all flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
              >
                <Eye className="w-3.5 h-3.5" />
                Inspect Piece
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
