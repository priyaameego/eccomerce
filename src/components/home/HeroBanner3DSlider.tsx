"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Zap, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";

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
  highlightBadge?: {
    stat: string;
    sub: string;
  };
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
    highlightBadge: {
      stat: "Direct Mill Wholesale",
      sub: "Surat Jacquard Hub",
    },
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
    highlightBadge: {
      stat: "240 GSM Mill Quality",
      sub: "Tirupur Knits Direct",
    },
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
    highlightBadge: {
      stat: "Under ₹299 Sourcing",
      sub: "Mumbai Fast Fashion",
    },
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
    highlightBadge: {
      stat: "Heritage Certified",
      sub: "Jaipur Master Guild",
    },
  },
];

// 12 Deterministic Floating Particles (zero hydration mismatch)
const PARTICLES = [
  { id: 1, left: "9%", top: "68%", size: 3, delay: 0, duration: 6.5 },
  { id: 2, left: "21%", top: "78%", size: 2, delay: 1.2, duration: 8.2 },
  { id: 3, left: "32%", top: "54%", size: 3.5, delay: 0.7, duration: 6.8 },
  { id: 4, left: "44%", top: "72%", size: 2.5, delay: 2.1, duration: 8.8 },
  { id: 5, left: "57%", top: "62%", size: 3, delay: 1.4, duration: 7.2 },
  { id: 6, left: "70%", top: "80%", size: 2, delay: 2.6, duration: 7.5 },
  { id: 7, left: "78%", top: "46%", size: 3, delay: 0.3, duration: 8.5 },
  { id: 8, left: "89%", top: "70%", size: 2.5, delay: 1.8, duration: 7.8 },
  { id: 9, left: "16%", top: "44%", size: 2, delay: 3.0, duration: 8.1 },
  { id: 10, left: "38%", top: "86%", size: 3, delay: 2.4, duration: 6.9 },
  { id: 11, left: "64%", top: "48%", size: 2.5, delay: 0.5, duration: 9.0 },
  { id: 12, left: "84%", top: "58%", size: 3.5, delay: 3.2, duration: 7.4 },
];

export default function HeroBanner3DSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const bannerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const SLIDE_DURATION = 5500; // 5.5 seconds

  // Motion values for fine pointer mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 26 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const imgParallaxX = useTransform(springX, [-0.5, 0.5], [16, -16]);
  const imgParallaxY = useTransform(springY, [-0.5, 0.5], [10, -10]);

  const textParallaxX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const textParallaxY = useTransform(springY, [-0.5, 0.5], [-5, 5]);

  const badgeParallaxX = useTransform(springX, [-0.5, 0.5], [-16, 16]);
  const badgeParallaxY = useTransform(springY, [-0.5, 0.5], [-12, 12]);

  // Detect fine pointer devices for mouse parallax
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
      setCanHover(mq.matches && window.innerWidth >= 1024);
      const listener = (e: MediaQueryListEvent) => {
        setCanHover(e.matches && window.innerWidth >= 1024);
      };
      mq.addEventListener("change", listener);
      return () => mq.removeEventListener("change", listener);
    }
  }, []);

  // GSAP Entrance Animation on Mount
  useEffect(() => {
    if (bannerRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          bannerRef.current,
          { opacity: 0, y: 26, scale: 0.985 },
          { opacity: 1, y: 0, scale: 1, duration: 1.15, ease: "power3.out" }
        );
      }, bannerRef);
      return () => ctx.revert();
    }
  }, []);

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

  // Mouse Move Parallax & Spotlight Position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bannerRef.current) return;
    const rect = bannerRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    setCursorPos({ x: relX, y: relY });

    if (canHover) {
      const xPct = relX / rect.width - 0.5;
      const yPct = relY / rect.height - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    }
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const current = CLEAN_SLIDES[currentIndex];

  return (
    <div className="w-full relative">
      <div
        ref={bannerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="group relative w-full h-[380px] sm:h-[440px] md:h-[480px] lg:h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0a0f18] shadow-2xl select-none border border-white/10"
      >
        {/* Background Slides with Ken Burns Cinematic Movement & Smooth Cross-fade */}
        {CLEAN_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <motion.div
              key={slide.id}
              className={`absolute inset-0 ${
                isActive ? "z-10" : "z-0 pointer-events-none"
              }`}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
              }}
              transition={{
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                x: canHover && isHovered ? imgParallaxX : 0,
                y: canHover && isHovered ? imgParallaxY : 0,
              }}
            >
              <motion.div
                className="relative w-full h-full"
                animate={{
                  scale: isActive ? [1.06, 1.01] : 1.06,
                }}
                transition={{
                  duration: SLIDE_DURATION / 1000,
                  ease: "easeOut",
                }}
              >
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  priority={idx === 0}
                  className="object-cover object-center md:object-[center_35%]"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </motion.div>
            </motion.div>
          );
        })}

        {/* Ambient Chromatic Glow (Blends softly to active slide accent color) */}
        <motion.div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl pointer-events-none z-15 opacity-40 transition-colors duration-1000"
          style={{
            backgroundColor: current.buttonColor || "#681a72",
          }}
        />

        {/* Interactive Pointer Spotlight (Desktop fine pointer) */}
        {canHover && (
          <div
            className="pointer-events-none absolute inset-0 z-25 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(620px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(255,255,255,0.08) 0%, transparent 60%)`,
            }}
          />
        )}

        {/* Cinematic Vignette Overlay (Dark on Left for Text Readability, Transparent on Right) */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/88 via-black/65 to-black/20 md:to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/65 via-transparent to-black/20 pointer-events-none" />

        {/* Floating Particles Layer (Champagne & Gold Dust Motes) */}
        <div className="absolute inset-0 z-22 pointer-events-none overflow-hidden">
          {PARTICLES.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full bg-amber-200/50 dark:bg-amber-100/40 blur-[0.6px]"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
              }}
              animate={{
                y: [0, -100, -220],
                x: [0, 12, -8],
                opacity: [0, 0.8, 0],
                scale: [0.8, 1.25, 0.5],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Floating Glass Highlight Card (Desktop, Top Right) */}
        <motion.div
          style={{
            x: canHover && isHovered ? badgeParallaxX : 0,
            y: canHover && isHovered ? badgeParallaxY : 0,
          }}
          className="hidden lg:flex absolute top-8 right-12 z-30 pointer-events-none"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`glass-badge-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.92, y: 14 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -6, 0],
              }}
              exit={{ opacity: 0, scale: 0.92, y: -10 }}
              transition={{
                opacity: { duration: 0.45 },
                scale: { duration: 0.45 },
                y: { repeat: Infinity, duration: 4.5, ease: "easeInOut" },
              }}
              className="px-4 py-3 rounded-2xl bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/25 to-rose-400/25 backdrop-blur-md flex items-center justify-center text-amber-300 border border-white/20 shadow-inner">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <p className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-extrabold">
                    {current.highlightBadge?.sub || "Verified Hub"}
                  </p>
                </div>
                <p className="text-xs sm:text-[13px] font-black text-white tracking-tight drop-shadow-sm mt-0.5">
                  {current.highlightBadge?.stat || "Direct Mill Wholesale"}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Foreground Content: Clean, Left-Aligned with Framer Motion Text Reveals */}
        <motion.div
          style={{
            x: canHover && isHovered ? textParallaxX : 0,
            y: canHover && isHovered ? textParallaxY : 0,
          }}
          className="relative z-30 h-full max-w-2xl flex flex-col justify-center px-6 sm:px-12 md:px-16 text-white space-y-4 sm:space-y-5"
        >
          <AnimatePresence mode="wait">
            <div key={`slide-content-${currentIndex}`} className="space-y-3.5 sm:space-y-4.5">
              {/* Badge Pill with Lightning Icon & Soft Floating Depth */}
              <motion.div
                initial={{ opacity: 0, y: -14, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="inline-flex items-center gap-2 bg-black/45 hover:bg-black/60 backdrop-blur-xl text-white/95 text-xs sm:text-[13px] font-medium px-4 py-1.5 rounded-full border border-white/25 shadow-lg transition-all group/badge">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                  </span>
                  <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300 transition-transform group-hover/badge:scale-110" />
                  <span className="tracking-wide font-medium">{current.badge}</span>
                </div>
              </motion.div>

              {/* Big Bold Clean Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
                transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl sm:text-4xl md:text-5xl lg:text-[52px] font-black tracking-tight leading-[1.12] text-white drop-shadow-md"
              >
                {current.title}
              </motion.h1>

              {/* Clean Subtitle / Description */}
              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(3px)" }}
                transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs sm:text-sm md:text-base text-gray-200/90 leading-relaxed max-w-lg font-normal drop-shadow"
              >
                {current.subtitle}
              </motion.p>

              {/* Single Primary Call to Action Button with Luxury Magnetic Hover */}
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.5, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="pt-2"
              >
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative inline-block group/btn"
                >
                  {/* Animated Glow Aura Behind CTA */}
                  <div
                    className="absolute -inset-1.5 rounded-2xl opacity-0 group-hover/btn:opacity-80 blur-xl transition-opacity duration-300"
                    style={{ backgroundColor: current.buttonColor || "#681a72" }}
                  />

                  <Link
                    href={current.ctaLink}
                    style={{ backgroundColor: current.buttonColor || "#111827" }}
                    className="relative overflow-hidden inline-flex items-center gap-2.5 justify-center px-8 sm:px-9 py-3 sm:py-3.5 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase rounded-xl shadow-xl transition-all duration-300 cursor-pointer border border-white/25"
                  >
                    <span>{current.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />

                    {/* Specular Shine Sweep */}
                    <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </AnimatePresence>
        </motion.div>

        {/* Minimal Unobtrusive Chevrons with Frosted Glass & Luxury Hover */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/45 hover:bg-black/75 text-white backdrop-blur-xl border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 sm:opacity-75 sm:group-hover:opacity-100 cursor-pointer shadow-xl hover:border-white/40"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/45 hover:bg-black/75 text-white backdrop-blur-xl border border-white/20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 sm:opacity-75 sm:group-hover:opacity-100 cursor-pointer shadow-xl hover:border-white/40"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>

        {/* Clean Minimal Slide Dots & Progress Line at Bottom Center */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-xl px-3.5 py-1.5 rounded-full border border-white/15 shadow-xl">
          {CLEAN_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="relative group cursor-pointer p-1"
              >
                <div
                  className={`h-2 rounded-full transition-all duration-400 overflow-hidden ${
                    isActive
                      ? "w-8 sm:w-10 bg-white/30"
                      : "w-2 h-2 bg-white/40 group-hover:bg-white/70"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      key={`progress-${currentIndex}-${isPaused}`}
                      initial={{ width: "0%" }}
                      animate={{ width: isPaused ? undefined : "100%" }}
                      transition={{
                        duration: isPaused ? 0 : SLIDE_DURATION / 1000,
                        ease: "linear",
                      }}
                      className="h-full bg-white rounded-full shadow-sm"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
