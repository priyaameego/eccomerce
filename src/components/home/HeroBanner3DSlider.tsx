"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Truck,
  IndianRupee,
  RotateCcw,
  ShoppingBag,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Flame,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

export interface HeroSlide {
  id: string;
  badge: string;
  tagline: string;
  title: string;
  highlightText: string;
  subtitle: string;
  priceNote: string;
  categoryLink: string;
  categoryName: string;
  image: string;
  imageAlt: string;
  accentColor: string;
  chipLabel: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    badge: "SURAT & VARANASI WEAVERS DIRECT",
    tagline: "Festive Grand Sale • Up to 75% Off",
    title: "Wholesale Prices,",
    highlightText: "Designer Sarees.",
    subtitle:
      "Direct factory Banarasi jacquard, soft silk & organza sarees starting at ₹149. 0% Middleman Commission & Free Cash on Delivery across 28,000+ pin codes.",
    priceNote: "Direct from Surat Mills • From ₹149",
    categoryLink: "/shop?category=Women%20Ethnic&subcategory=Sarees",
    categoryName: "Women Ethnic",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2560&q=85",
    imageAlt: "Authentic Banarasi Jacquard Saree Festive Collection",
    accentColor: "#f43f5e",
    chipLabel: "Ethnic Sarees",
  },
  {
    id: "slide-2",
    badge: "MUMBAI & DELHI FAST FASHION",
    tagline: "College & Streetwear Drops • Under ₹299",
    title: "Chic Streetwear,",
    highlightText: "Korean Fits.",
    subtitle:
      "Flared high-waist denim, oversized casual shirts, bodycons & chic crop tops straight from fast-fashion production hubs with 7-day hassle-free returns.",
    priceNote: "Western Wear Drops • From ₹199",
    categoryLink: "/shop?category=Women%20Western",
    categoryName: "Women Western",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2560&q=85",
    imageAlt: "Trendy Western Dresses and Chic Streetwear",
    accentColor: "#ec4899",
    chipLabel: "Western Fits",
  },
  {
    id: "slide-3",
    badge: "TIRUPUR KNITS • 100% COMBED COTTON",
    tagline: "Men's Streetwear Hub • Buy 2 Get 15% Off",
    title: "240 GSM Heavy Cotton,",
    highlightText: "Oversized Tees.",
    subtitle:
      "Bio-washed street tees, stretch comfort chinos & pure cotton casual shirts direct from Tirupur manufacturing mills at 0% retailer markup.",
    priceNote: "Combed Cotton Tees • From ₹189",
    categoryLink: "/shop?category=Men",
    categoryName: "Men's Fashion",
    image:
      "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=2560&q=85",
    imageAlt: "Men Casual Streetwear and Heavy Cotton Shirts",
    accentColor: "#38bdf8",
    chipLabel: "Men's Knits",
  },
  {
    id: "slide-4",
    badge: "PANIPAT & GUJARAT DIRECT",
    tagline: "Home & Tech Makeover • Starting Under ₹99",
    title: "3D Glace Bedsheets,",
    highlightText: "& Smart Gadgets.",
    subtitle:
      "Ultra-soft 3D double bedsheets, non-stick granite cookware, ANC wireless earbuds & calling smartwatches at lowest wholesale factory rates.",
    priceNote: "Home & Smart Tech • From ₹99",
    categoryLink: "/shop?category=Home%20&%20Kitchen",
    categoryName: "Home & Electronics",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2560&q=85",
    imageAlt: "3D Glace Cotton Bedsheets and Modern Home Living",
    accentColor: "#f59e0b",
    chipLabel: "Home & Gadgets",
  },
  {
    id: "slide-5",
    badge: "KUNDAN & TEMPLE JEWELLERY DIRECT",
    tagline: "Bridal Jewellery Fest • Flat 65% Off",
    title: "Handcrafted Heritage,",
    highlightText: "Bridal Jewellery.",
    subtitle: "Direct from Jaipur artisans. Gold-plated chokers, jhumkas & maang tikkas with 100% replacement guarantee.",
    priceNote: "Artisan Jewellery • From ₹99",
    categoryLink: "/shop?category=Jewellery%20%26%20Accessories",
    categoryName: "Jewellery",
    // Widescreen High-Resolution photo (2560px recommended)
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=2560&q=85",
    imageAlt: "Luxury Indian Kundan Bridal Jewellery Set",
    accentColor: "#f59e0b",
    chipLabel: "Jewellery",
  }
];

export default function HeroBanner3DSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const AUTOPLAY_INTERVAL = 6000; // 6 seconds per slide

  // Next / Previous Slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setProgress(0);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  // Autoplay timer with progress update
  useEffect(() => {
    if (isPaused) return;

    const tickMs = 50;
    const increment = (tickMs / AUTOPLAY_INTERVAL) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + increment;
      });
    }, tickMs);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const scrollToContent = () => {
    const el = document.getElementById("home-categories-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const current = HERO_SLIDES[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[85vh] min-h-[580px] lg:h-[calc(100vh-68px)] max-h-[820px] overflow-hidden bg-black select-none"
    >
      {/* Top Auto-Play Linear Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/15 z-40">
        <div
          className="h-full bg-gradient-to-r from-amber-300 via-rose-400 to-white transition-all duration-75 shadow-[0_0_12px_rgba(255,255,255,0.7)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* FULL-BLEED BACKGROUND IMAGES WITH MAJESTIC KEN BURNS EFFECT */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
            >
              <div
                className={`relative w-full h-full ${isActive ? "animate-ken-burns" : ""
                  }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  priority={idx === 0}
                  className="object-cover object-center lg:object-[center_35%]"
                  sizes="100vw"
                />
              </div>
            </div>
          );
        })}

        {/* CINEMATIC SCRIM VIGNETTE OVERLAYS */}
        {/* Left dark gradient for 100% crystal clear typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/65 to-black/20 lg:to-transparent z-20 pointer-events-none" />

        {/* Bottom vignette blending into page */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 z-20 pointer-events-none" />

        {/* Ambient brand color illumination glow */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#681a72]/35 rounded-full blur-3xl pointer-events-none z-20" />
      </div>

      {/* FOREGROUND CONTENT CONTAINER (Max-W 7XL, perfectly aligned) */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full h-full flex flex-col justify-between pt-10 sm:pt-16 pb-6 sm:pb-8">
        {/* Middle Content Section */}
        <div className="my-auto max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-5">
          {/* Badge & Tagline Row */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-white border border-white/25 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{current.badge}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-rose-200 border border-white/15 shadow-sm">
              <Flame className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
              <span>{current.tagline}</span>
            </div>
          </div>

          {/* Luxury Main Headline */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.08] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              {current.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-white drop-shadow-md">
                {current.highlightText}
              </span>
            </h1>
          </div>

          {/* Subtitle Description */}
          <p className="text-sm sm:text-base text-gray-200/95 max-w-xl leading-relaxed font-normal drop-shadow-md">
            {current.subtitle}
          </p>

          {/* 3 Wholesale Trust Pillars */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-md pt-1">
            <div className="bg-black/45 backdrop-blur-md p-2.5 rounded-xl border border-white/20 flex flex-col items-center text-center shadow-lg transition-transform hover:-translate-y-1">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 mb-1" />
              <span className="text-[11px] sm:text-xs font-bold text-white">Free Delivery</span>
              <span className="text-[9px] text-gray-300 hidden sm:inline">On all 28k+ pin codes</span>
            </div>

            <div className="bg-black/45 backdrop-blur-md p-2.5 rounded-xl border border-white/20 flex flex-col items-center text-center shadow-lg transition-transform hover:-translate-y-1">
              <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 mb-1" />
              <span className="text-[11px] sm:text-xs font-bold text-white">Cash On Delivery</span>
              <span className="text-[9px] text-gray-300 hidden sm:inline">100% Pay at doorstep</span>
            </div>

            <div className="bg-black/45 backdrop-blur-md p-2.5 rounded-xl border border-white/20 flex flex-col items-center text-center shadow-lg transition-transform hover:-translate-y-1">
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 mb-1" />
              <span className="text-[11px] sm:text-xs font-bold text-white">Easy Returns</span>
              <span className="text-[9px] text-gray-300 hidden sm:inline">7 days instant refund</span>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center gap-3.5 pt-2 flex-wrap">
            <Link
              href={current.categoryLink}
              className="px-7 sm:px-9 py-3.5 sm:py-4 bg-white text-[#681a72] hover:bg-gray-100 font-black text-xs sm:text-sm rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.5)] transition-all duration-200 flex items-center gap-2.5 active:scale-95 hover:-translate-y-0.5 cursor-pointer group"
            >
              <ShoppingBag className="w-4 h-4 text-[#681a72]" />
              <span>Shop Collection</span>
              <ArrowRight className="w-4 h-4 text-[#681a72] transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noreferrer"
              className="px-5 sm:px-6 py-3.5 sm:py-4 bg-black/50 hover:bg-black/75 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/30 backdrop-blur-md transition-all duration-200 flex items-center gap-2 active:scale-95 hover:-translate-y-0.5"
            >
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>Get Mobile App</span>
            </a>

            {/* Wholesale Price Note Pill */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 backdrop-blur-md text-white text-xs font-bold shadow-lg">
              <span
                style={{ backgroundColor: current.accentColor }}
                className="w-2.5 h-2.5 rounded-full animate-ping"
              />
              <span>{current.priceNote}</span>
            </div>
          </div>
        </div>

        {/* BOTTOM NAVIGATION BAR (Slide Numbering & Category Tabs) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/15">
          {/* Slide Numbers & Scroll Down Indicator */}
          <div className="flex items-center gap-6">
            <div className="text-white text-sm font-mono tracking-wider">
              <span className="text-xl sm:text-2xl font-black text-white">
                0{currentIndex + 1}
              </span>
              <span className="text-gray-400 mx-1.5">/</span>
              <span className="text-xs text-gray-400 font-bold">04</span>
            </div>

            <button
              onClick={scrollToContent}
              className="hidden md:flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition-colors cursor-pointer group"
            >
              <span>Explore Categories</span>
              <ChevronDown className="w-4 h-4 text-amber-300 transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>

          {/* 4 Category Tabs */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-center">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`group flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${isActive
                      ? "bg-white text-gray-900 shadow-2xl scale-105"
                      : "bg-black/50 hover:bg-black/75 text-white/80 border border-white/20 backdrop-blur-md"
                    }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full transition-transform ${isActive ? "bg-[#e11d48] scale-125 animate-pulse" : "bg-white/50"
                      }`}
                  />
                  <span>
                    <strong className="opacity-60 mr-1 hidden sm:inline">0{idx + 1}.</strong>
                    {slide.chipLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Left / Right Cinematic Floating Chevrons */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/45 hover:bg-black/80 text-white backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-40 shadow-2xl cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/45 hover:bg-black/80 text-white backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-40 shadow-2xl cursor-pointer"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
