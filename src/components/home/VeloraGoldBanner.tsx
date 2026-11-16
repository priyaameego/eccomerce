"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface GoldShowcaseItem {
  name: string;
  image: string;
  link: string;
}

const GOLD_ITEMS: GoldShowcaseItem[] = [
  {
    name: "Lehengas",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=85",
    link: "/shop?category=Women%20Ethnic&subcategory=Lehengas",
  },
  {
    name: "Menwear",
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=85",
    link: "/shop?category=Men",
  },
  {
    name: "Sarees",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=85",
    link: "/shop?category=Women%20Ethnic&subcategory=Sarees",
  },
  {
    name: "Jewellery",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=85",
    link: "/shop?category=Jewellery%20%26%20Accessories",
  },
];

export default function VeloraGoldBanner() {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
      <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden bg-gradient-to-br from-[#241209] via-[#2c170d] to-[#1a0c06] text-white shadow-2xl border border-amber-900/40">
        {/* Subtle Decorative Geometric Trellis Texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:24px_24px]"
          aria-hidden="true"
        />

        {/* Ambient Warm Golden Glows */}
        <div
          className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-amber-600/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center min-h-[380px] sm:min-h-[440px]">
          {/* Left Side: Celebratory Couple Image & Luxury Gold Branding */}
          <div className="relative lg:col-span-7 h-full flex flex-col justify-center p-6 sm:p-10 lg:p-12 overflow-hidden">
            {/* Background Couple Image with Cinematic Fade */}
            <div className="absolute inset-0 z-0 opacity-40 lg:opacity-60">
              <Image
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85"
                alt="Festive Luxury Wedding & Celebration Attire"
                fill
                className="object-cover object-center lg:object-[left_center]"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#241209]/95 via-[#241209]/80 to-[#241209]/40 lg:to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241209] via-transparent to-transparent lg:hidden" />
            </div>

            {/* Foreground Brand Content */}
            <div className="relative z-10 max-w-lg space-y-3 sm:space-y-4">
              {/* Gold Star Icon + "Gold" Wordmark */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-11 sm:h-11 text-amber-400 shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-full h-full drop-shadow-[0_2px_12px_rgba(251,191,36,0.6)] animate-pulse"
                  >
                    <path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z" />
                  </svg>
                </div>
                <h3 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 drop-shadow-md">
                  Gold
                </h3>
              </div>

              {/* Tagline */}
              <p className="font-serif italic text-base sm:text-xl lg:text-2xl text-amber-100/95 font-medium tracking-wide drop-shadow-sm leading-snug">
                Products you Love. Quality we Trust.
              </p>

              <p className="text-xs sm:text-sm text-amber-200/70 max-w-md font-sans leading-relaxed">
                Curated royal couture, handloom Banarasi silks, and hallmarked heritage jewellery crafted for life’s grandest celebrations.
              </p>

              {/* Shop Now Action Button */}
              <div className="pt-2 sm:pt-4">
                <Link
                  href="/shop?category=Women%20Ethnic"
                  className="inline-flex items-center gap-2 px-7 sm:px-9 py-2.5 sm:py-3 rounded-xl border border-amber-400/80 hover:border-amber-300 bg-amber-950/40 hover:bg-amber-400/20 text-amber-100 hover:text-white font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-lg hover:shadow-amber-500/20 active:scale-95 group"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 text-amber-300 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side: 4 Arched Luxury Category Showcase Cards */}
          <div className="relative lg:col-span-5 p-5 sm:p-8 lg:p-10 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5 w-full max-w-sm sm:max-w-md">
              {GOLD_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  className="group flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-t-[42px] sm:rounded-t-[52px] rounded-b-2xl border border-amber-400/40 hover:border-amber-300 bg-black/40 hover:bg-black/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(245,158,11,0.28)]"
                >
                  {/* Arched Photo Frame */}
                  <div className="relative w-20 h-24 sm:w-28 sm:h-32 lg:w-32 lg:h-38 rounded-t-[36px] sm:rounded-t-[46px] rounded-b-xl overflow-hidden mb-2 sm:mb-2.5 bg-[#3a1d12] shadow-inner">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                      sizes="180px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Arched Label */}
                  <span className="text-xs sm:text-sm font-bold text-amber-100 group-hover:text-amber-300 tracking-wider transition-colors drop-shadow-sm">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
