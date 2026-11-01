"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";

export interface CleanSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  imageAlt: string;
  buttonColor?: string;
}

const CLEAN_SLIDES: CleanSlide[] = [
  {
    id: "slide-1",
    badge: "Free Pan-India Delivery • Direct from Surat Mills",
    title: "Wholesale Prices Delivered to Your Door",
    subtitle:
      "Daily authentic Banarasi sarees, festive designer kurtis, and ethnic essentials delivered fresh from master weavers with 100% Cash on Delivery.",
    ctaText: "SHOP NOW",
    ctaLink: "/shop?category=Women%20Ethnic",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85",
    imageAlt: "Authentic Banarasi Jacquard Saree Festive Collection",
    buttonColor: "#681a72", // Velora Brand Royal Purple
  },
  {
    id: "slide-2",
    badge: "Tirupur Knits Hub • 100% Combed Cotton",
    title: "Heavyweight Streetwear & Daily Essentials",
    subtitle:
      "Bio-washed 240 GSM oversized tees, stretch comfort chinos, and casual shirts straight from manufacturing mills at 0% retailer markup.",
    ctaText: "SHOP NOW",
    ctaLink: "/shop?category=Men",
    image:
      "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=2000&q=85",
    imageAlt: "Men Casual Streetwear and Heavy Cotton Shirts",
    buttonColor: "#111827", // Luxury Obsidian Black
  },
  {
    id: "slide-3",
    badge: "Mumbai Fast Fashion • Under ₹299 Drops",
    title: "Chic Streetwear & Trendy Korean Fits",
    subtitle:
      "Flared high-waist denim, oversized shirts, chic bodycons, and casual crop tops straight from production hubs with 7-day hassle-free returns.",
    ctaText: "SHOP NOW",
    ctaLink: "/shop?category=Women%20Western",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85",
    imageAlt: "Trendy Western Dresses and Chic Streetwear",
    buttonColor: "#9333ea", // Vibrant Violet
  },
  {
    id: "slide-4",
    badge: "Handcrafted Heritage • Flat 65% Off",
    title: "Jaipur Kundan & Bridal Jewellery Sets",
    subtitle:
      "Direct from Jaipur master craftsmen. Gold-plated chokers, jhumkas, and temple jewellery with 100% replacement guarantee.",
    ctaText: "SHOP NOW",
    ctaLink: "/shop?category=Jewellery%20%26%20Accessories",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=2000&q=85",
    imageAlt: "Luxury Indian Kundan Bridal Jewellery Set",
    buttonColor: "#b45309", // Amber Gold
  },
];

export default function HeroBanner3DSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const SLIDE_DURATION = 5500; // 5.5 seconds

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % CLEAN_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + CLEAN_SLIDES.length) % CLEAN_SLIDES.length);
  }, []);

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch Swipe for Mobile Devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const current = CLEAN_SLIDES[currentIndex];

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 pt-3 sm:pt-4">
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="group relative w-full h-[380px] sm:h-[440px] md:h-[480px] lg:h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0a0f18] shadow-lg select-none"
      >
        {/* Background Slides with Smooth Cross-fade */}
        {CLEAN_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority={idx === 0}
                className="object-cover object-center md:object-[center_35%]"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          );
        })}

        {/* Clean Vignette Overlay (Dark on Left for Text Readability, Transparent on Right) */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/85 via-black/60 to-black/20 md:to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Foreground Content: Clean, Left-Aligned (Matches Reference Style Exactly) */}
        <div className="relative z-30 h-full max-w-2xl flex flex-col justify-center px-6 sm:px-12 md:px-16 text-white space-y-4 sm:space-y-5">
          {/* Badge Pill with Lightning Icon */}
          <div>
            <div className="inline-flex items-center gap-1.5 bg-black/40 hover:bg-black/50 backdrop-blur-md text-white/95 text-xs sm:text-[13px] font-medium px-3.5 py-1.5 rounded-full border border-white/20 shadow-sm transition-colors">
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>{current.badge}</span>
            </div>
          </div>

          {/* Big Bold Clean Headline */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[52px] font-black tracking-tight leading-[1.12] text-white drop-shadow-md">
            {current.title}
          </h1>

          {/* Clean Subtitle / Description */}
          <p className="text-xs sm:text-sm md:text-base text-gray-200/90 leading-relaxed max-w-lg font-normal drop-shadow">
            {current.subtitle}
          </p>

          {/* Single Primary Call to Action Button */}
          <div className="pt-2">
            <Link
              href={current.ctaLink}
              style={{ backgroundColor: current.buttonColor || "#111827" }}
              className="inline-flex items-center justify-center px-8 sm:px-9 py-3 sm:py-3.5 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              {current.ctaText}
            </Link>
          </div>
        </div>

        {/* Minimal Unobtrusive Chevrons (Show clearly on desktop hover or mobile) */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 sm:opacity-75 sm:group-hover:opacity-100 cursor-pointer shadow-md"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 sm:opacity-75 sm:group-hover:opacity-100 cursor-pointer shadow-md"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Clean Minimal Slide Dots at Bottom Center */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          {CLEAN_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? "w-6 sm:w-7 h-2 bg-white shadow-sm"
                    : "w-2 h-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
