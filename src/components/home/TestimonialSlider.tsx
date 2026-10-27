"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from "lucide-react";
import { sound } from "@/lib/sound";

const TESTIMONIALS = [
  {
    quote:
      "The Celestial Tourbillon redefines independent Swiss horology. Its triple-axis cage finishes under 40x magnification reveal zero tooling marks. A true mechanical sculpture that rivals the finest independent masters in Geneva.",
    author: "Baron Henri de Valois",
    title: "Private Horological Collector",
    location: "Genève, Switzerland",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    verifiedPurchase: "Celestial Orbit Tourbillon #12",
  },
  {
    quote:
      "AETHER Spatial Pro headphones represent the first time planar magnetic raytracing has been implemented without bulky desktop tube amps. The soundstage depth in acoustic orchestral recordings is completely transcendent.",
    author: "Elena Rostova",
    title: "Concert Pianist & Audio Engineer",
    location: "Vienna, Austria",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    verifiedPurchase: "AETHER Spatial Pro Headphones",
  },
  {
    quote:
      "The Horizon Hyper-Scooter delivers blistering instant torque wrapped in an unbroken Toray carbon monocoque. The steering geometry feels identical to a Formula 1 telemetry rig. Extraordinary design language.",
    author: "Kenji Sato",
    title: "Industrial Architect",
    location: "Tokyo, Japan",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    verifiedPurchase: "Horizon Hyper-Scooter Founders Ed.",
  },
];

export default function TestimonialSlider() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prev = () => {
    setCurrentIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    sound.playClick();
  };

  const next = () => {
    setCurrentIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    sound.playClick();
  };

  const current = TESTIMONIALS[currentIdx];

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37]">
          Verified Provenance & Patron Chronicles
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
          Words from the Discerning
        </h2>
      </div>

      <div className="relative rounded-3xl glass-card border border-white/10 p-8 sm:p-14 overflow-hidden shadow-2xl">
        <Quote className="absolute top-6 right-8 w-20 h-20 text-white/5 pointer-events-none" />

        <div className="flex items-center gap-1 text-amber-400 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400" />
          ))}
        </div>

        <p className="text-lg sm:text-2xl font-serif text-white leading-relaxed italic font-light">
          &ldquo;{current.quote}&rdquo;
        </p>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#d4af37]/60">
              <Image src={current.avatar} alt={current.author} fill className="object-cover" />
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white">{current.author}</h4>
              <p className="text-xs text-neutral-400 font-mono">{current.title} • {current.location}</p>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#d4af37] mt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Atelier Patron ({current.verifiedPurchase})</span>
              </div>
            </div>
          </div>

          {/* Stepper controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="p-3 rounded-xl glass-panel border border-white/10 hover:border-[#d4af37] text-white hover:text-[#d4af37] transition-colors"
              title="Previous Chronicle"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-neutral-400">
              {currentIdx + 1} / {TESTIMONIALS.length}
            </span>
            <button
              onClick={next}
              className="p-3 rounded-xl glass-panel border border-white/10 hover:border-[#d4af37] text-white hover:text-[#d4af37] transition-colors"
              title="Next Chronicle"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
