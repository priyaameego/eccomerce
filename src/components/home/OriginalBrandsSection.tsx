"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ChevronRight as ArrowIcon } from "lucide-react";

interface BrandItem {
  id: string;
  name: string;
  image: string;
  link: string;
  brandHint?: string;
}

const BRAND_ITEMS: BrandItem[] = [
  {
    id: "personal-care",
    name: "Personal Care",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=85",
    link: "/shop?category=Beauty%20%26%20Health",
    brandHint: "Nivea & Daily Skin Essentials",
  },
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=85",
    link: "/shop?category=Electronics",
    brandHint: "JBL & Wireless Audio Hub",
  },
  {
    id: "makeup",
    name: "Makeup",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=500&q=85",
    link: "/shop?category=Beauty%20%26%20Health",
    brandHint: "Elle 18 & Glamour Cosmetics",
  },
  {
    id: "men-perfume",
    name: "Men Perfume",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=500&q=85",
    link: "/shop?category=Beauty%20%26%20Health",
    brandHint: "Denver & Luxury Fragrances",
  },
  {
    id: "bags",
    name: "Bags",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=85",
    link: "/shop?category=Bags%20%26%20Footwear",
    brandHint: "Zouk & Artisan Handbags",
  },
];

export default function OriginalBrandsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -320 : 320;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        {/* Left Title with Official Verified Rosette Badge */}
        <div className="flex items-center gap-2">
          <h2 className="text-lg sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Original Brands
          </h2>
          <span
            className="inline-flex items-center justify-center text-[#681a72] dark:text-[#c084fc] drop-shadow-xs"
            title="100% Genuine Certified Brands"
            aria-label="Verified Original Brands"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path d="M12 2l2.4 2.1 3.2-.4 1.1 3 3 1.2-.4 3.2 2.1 2.4-2.1 2.4.4 3.2-3 1.2-1.1 3-3.2-.4-2.4 2.1-2.4-2.1-3.2.4-1.1-3-3-1.2.4-3.2-2.1-2.4 2.1-2.4-.4-3.2 3-1.2 1.1-3 3.2.4L12 2z" />
              <path
                d="M9.5 12l1.8 1.8 3.5-3.6"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        {/* Right Action: VIEW ALL link */}
        <Link
          href="/shop"
          className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#681a72] dark:text-[#c084fc] hover:underline flex items-center gap-1 group transition-colors"
        >
          <span>VIEW ALL</span>
          <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Relative Carousel Container with Side Chevrons */}
      <div className="relative group/carousel">
        {/* Left Floating Chevron */}
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white dark:bg-[#151c2c] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 items-center justify-center transition-all opacity-85 group-hover/carousel:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Horizontal Track of Brand Cards */}
        <div
          ref={scrollRef}
          className="flex gap-3.5 sm:gap-4 lg:gap-5 overflow-x-auto scrollbar-none pb-3 px-1 -mx-1 snap-x scroll-smooth items-stretch"
        >
          {BRAND_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#151c2c]/95 backdrop-blur-md border border-purple-100/80 dark:border-purple-900/40 shadow-xs hover:shadow-xl hover:border-[#681a72]/40 hover:-translate-y-1.5 transition-all duration-300 snap-start shrink-0 w-[155px] sm:w-[195px] lg:w-[220px]"
            >
              {/* Product Visual Container with Clean Soft Ambient Aura */}
              <div className="relative w-full aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center p-3 mb-3 bg-gradient-to-b from-purple-50/60 via-[#faf8f5] to-purple-50/40 dark:from-purple-950/20 dark:via-[#111726] dark:to-transparent border border-purple-50/60 dark:border-purple-900/20 shadow-inner">
                <div className="relative w-full h-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-108"
                    sizes="220px"
                  />
                </div>
              </div>

              {/* Signature Luxury Brand Gradient Button Pill */}
              <div className="w-full">
                <div className="w-full py-2.5 sm:py-3 px-2 rounded-xl bg-gradient-to-r from-[#591463] via-[#681a72] to-[#9333ea] hover:from-[#681a72] hover:via-[#86198f] hover:to-[#be185d] text-white text-xs sm:text-[13px] font-black text-center tracking-wide shadow-md shadow-[#681a72]/20 group-hover:shadow-lg group-hover:shadow-[#681a72]/35 group-hover:scale-[1.02] active:scale-98 transition-all duration-300 border border-white/20">
                  {item.name}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Floating Chevron */}
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white dark:bg-[#151c2c] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 items-center justify-center transition-all opacity-85 group-hover/carousel:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </section>
  );
}
