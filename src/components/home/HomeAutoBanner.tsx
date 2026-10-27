"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Tag, ShieldCheck, Clock } from "lucide-react";
import { sound } from "@/lib/sound";

const BANNER_SLIDES = [
  {
    id: 1,
    tag: "HAUTE HORLOGERIE • LIMITED ALLOCATION",
    badge: "Masterpiece Allocation",
    title: "Celestial Tourbillon",
    highlight: "Titanium Gyro",
    description: "Triple-axis anti-gravity escapement hand-beveled from Grade 5 aeronautical titanium. Defies gravitational drag with 72-hour coaxial power reserve.",
    offerBadge: "20% Courtesy Privilege with code VIP20",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=85",
    link: "/product/celestial-orbit-tourbillon",
    cta: "Acquire Tourbillon",
    priceText: "$4,850 USD",
  },
  {
    id: 2,
    tag: "PLANAR ACOUSTICS • RAYTRACED PURITY",
    badge: "Studio Edition",
    title: "AETHER Spatial Pro",
    highlight: "Pure Beryllium",
    description: "Planar magnetic transducers with vapor-deposited beryllium diaphragms. Concert hall reverberation calibrated directly to your ear canal geometry.",
    offerBadge: "Complimentary Insured Courier Worldwide",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=85",
    link: "/product/aether-spatial-anc-headphones",
    cta: "Explore Sound",
    priceText: "$890 USD",
  },
  {
    id: 3,
    tag: "ELECTRIC MOBILITY • FORMULA 1 RIG",
    badge: "Founders Edition",
    title: "VÉLURE Horizon",
    highlight: "Toray Carbon",
    description: "Dual magnetic flux motors encased in an unbroken Toray T1000 carbon monocoque. Silent 45 km/h acceleration with Apple CarPlay instrument telemetry.",
    offerBadge: "Limited Run of 25 Numbered Pieces",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1600&q=85",
    link: "/product/tesla-vision-cyber-transporter",
    cta: "Configure Mobility",
    priceText: "$3,200 USD",
  },
  {
    id: 4,
    tag: "SENSORY ARCHITECTURE • LUNAR CORE",
    badge: "Awwwards Winner",
    title: "ECLIPSE Kinetic",
    highlight: "Ambient Monolith",
    description: "Autonomous circadian lighting sculpture featuring a levitating magnetic lunar sphere that orbits quietly across solid Nero Marquina marble.",
    offerBadge: "Matter / Apple HomeKit Compatible",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1600&q=85",
    link: "/product/eclipse-ambient-luminaire-monolith",
    cta: "Inspect Monolith",
    priceText: "$1,850 USD",
  },
];

export default function HomeAutoBanner() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 5000; // 5 seconds per slide

  // Auto changing banner timer
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 50;
    const step = (intervalTime / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIdx((c) => (c + 1) % BANNER_SLIDES.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, currentIdx]);

  const goToSlide = (idx: number) => {
    setCurrentIdx(idx);
    setProgress(0);
    sound.playClick();
  };

  const nextSlide = () => {
    goToSlide((currentIdx + 1) % BANNER_SLIDES.length);
  };

  const prevSlide = () => {
    goToSlide((currentIdx - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
  };

  const current = BANNER_SLIDES[currentIdx];

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full max-w-7xl mx-auto px-6 py-6"
    >
      <div className="relative w-full min-h-[460px] md:min-h-[520px] rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl flex flex-col justify-between p-6 sm:p-12 group">
        {/* Background Image with Smooth Crossfade */}
        <div className="absolute inset-0 z-0">
          <Image
            key={current.id}
            src={current.image}
            alt={current.title}
            fill
            className="object-cover filter brightness-[0.4] transition-all duration-1000 scale-105 group-hover:scale-100"
            priority
          />
          {/* Dual Gradient Scrims for Perfect Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#090a0f] via-[#090a0f]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-transparent to-black/30" />
        </div>

        {/* Top Meta Bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37] px-3 py-1 rounded-full glass-panel border border-[#d4af37]/40 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              {current.tag}
            </span>
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {current.badge}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-neutral-300">
              Allocation: <strong className="text-white font-bold">{current.priceText}</strong>
            </span>
          </div>
        </div>

        {/* Center Headline & Content */}
        <div className="relative z-10 max-w-2xl py-6 my-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#d4af37] mb-2">
            <Tag className="w-3.5 h-3.5" />
            <span>{current.offerBadge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.08]">
            {current.title} <br />
            <span className="gold-text-gradient">{current.highlight}</span>
          </h2>

          <p className="mt-4 text-xs sm:text-sm text-neutral-300 leading-relaxed font-light max-w-xl">
            {current.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={current.link}
              onClick={() => sound.playClick()}
              className="px-8 py-4 rounded-2xl bg-[#d4af37] hover:bg-[#c5a059] text-black font-mono font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-3 shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95"
            >
              <span>{current.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/shop"
              onClick={() => sound.playClick()}
              className="px-6 py-4 rounded-2xl glass-panel border border-white/20 hover:border-[#d4af37] text-white font-mono text-xs uppercase tracking-wider hover:bg-white/10 transition-all"
            >
              Browse All Allocations
            </Link>
          </div>
        </div>

        {/* Bottom Bar: Indicators & Navigation Controls */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
          {/* Slide Tabs with Live Progress Bars */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 flex-1 max-w-xl">
            {BANNER_SLIDES.map((slide, idx) => {
              const isActive = currentIdx === idx;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className="flex flex-col text-left group/tab py-1"
                >
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mb-1.5">
                    <div
                      className="h-full bg-[#d4af37] rounded-full transition-all duration-75"
                      style={{
                        width: isActive ? `${progress}%` : idx < currentIdx ? "100%" : "0%",
                      }}
                    />
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider truncate ${
                      isActive ? "text-[#d4af37] font-bold" : "text-neutral-400 group-hover/tab:text-white"
                    }`}
                  >
                    0{idx + 1} {slide.title.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={prevSlide}
              className="p-2.5 rounded-xl glass-panel border border-white/10 hover:border-[#d4af37] text-white hover:text-[#d4af37] transition-colors"
              title="Previous Banner"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2.5 rounded-xl glass-panel border border-white/10 hover:border-[#d4af37] text-white hover:text-[#d4af37] transition-colors"
              title="Next Banner"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
