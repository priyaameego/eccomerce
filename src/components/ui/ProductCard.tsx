"use client";

import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Heart,
  Star,
  ShoppingBag,
  Check,
  Eye,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowLeftRight,
  Share2,
} from "lucide-react";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { usePreferencesStore } from "@/store/usePreferencesStore";
import { useCompareStore } from "@/store/useCompareStore";

interface ProductCardProps {
  product: Product;
  index?: number;
  className?: string;
}

export default function ProductCard({ product, index = 0, className = "" }: ProductCardProps) {
  const [isAddedRecently, setIsAddedRecently] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [showShareNotice, setShowShareNotice] = useState(false);
  const [compareToast, setCompareToast] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors?.[0]?.name
  );

  const cardRef = useRef<HTMLDivElement>(null);

  // Store bindings - all preserved with zero logic changes
  const addItemToCart = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const openQuickView = usePreferencesStore((s) => s.openQuickView);
  const currency = usePreferencesStore((s) => s.currency);

  const addToCompare = useCompareStore((s) => s.addToCompare);
  const removeFromCompare = useCompareStore((s) => s.removeFromCompare);
  const inCompare = useCompareStore((s) => s.isInCompare(product.id));

  // Detect fine pointer devices for 3D physics (preserves smooth touch performance on mobile)
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

  // Framer Motion Springs for 3D Tilt & Parallax Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 280, damping: 24 });
  const mouseYSpring = useSpring(y, { stiffness: 280, damping: 24 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canHover || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      x.set(xPct);
      y.set(yPct);
    },
    [canHover, x, y]
  );

  const handleMouseEnter = () => {
    if (!canHover) return;
    setIsHovered(true);
    if (productImages.length > 1 && activeImgIdx === 0) {
      setActiveImgIdx(1);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
    setActiveImgIdx(0);
  };

  // Prepare images list (guaranteed multi-angle view)
  const productImages = useMemo(() => {
    if (product.images && product.images.length > 0) {
      if (product.images.length === 1) {
        return [
          product.images[0],
          product.images[0] + "&auto=format&fit=crop&w=1000&q=85",
          product.images[0] + "&crop=faces,top&w=1000&q=85",
          product.images[0] + "&crop=center&w=1000&q=85",
        ];
      }
      if (product.images.length === 2) {
        return [
          product.images[0],
          product.images[1],
          product.images[0] + "&crop=faces,top&w=1000&q=85",
          product.images[1] + "&crop=center&w=1000&q=85",
        ];
      }
      return product.images;
    }
    return ["/placeholder.png"];
  }, [product.images]);

  // Image browsing navigation
  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImgIdx((prev) => (prev + 1) % productImages.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImgIdx((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  // Add to cart with ripple feedback
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItemToCart(
      product,
      1,
      selectedColor || product.colors?.[0]?.name,
      product.sizes?.[0]
    );
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1800);
  };

  // Wishlist toggle with pop feedback
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  // Quick view trigger
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  // Compare toggle
  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(product.id);
      setCompareToast("Removed from comparison");
    } else {
      const res = addToCompare(product);
      setCompareToast(res.message);
    }
    setTimeout(() => setCompareToast(null), 2200);
  };

  // Share product link
  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const productUrl = typeof window !== "undefined"
      ? `${window.location.origin}/product/${product.slug}`
      : `/product/${product.slug}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: `Check out ${product.title} on VELORA`,
          url: productUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(productUrl);
      setShowShareNotice(true);
      setTimeout(() => setShowShareNotice(false), 2000);
    }
  };

  // Price & savings calculations
  const savingsAmount =
    product.originalPrice && product.originalPrice > product.price
      ? product.originalPrice - product.price
      : 0;

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.45,
        delay: Math.min((index % 8) * 0.05, 0.35),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group/card relative flex flex-col h-full ${
        canHover ? "[perspective:1000px]" : ""
      } select-none ${className}`}
    >
      {/* Background Ambient Radial Glow (Blooms smoothly on hover) */}
      <div
        className="pointer-events-none absolute -inset-2 rounded-[28px] bg-gradient-to-r from-purple-500/0 via-[#681a72]/15 to-rose-500/0 dark:from-purple-500/0 dark:via-[#c084fc]/20 dark:to-rose-500/0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 blur-2xl z-0"
        aria-hidden="true"
      />

      {/* Main 3D Glassmorphic Card Container */}
      <motion.div
        className="relative flex flex-col h-full rounded-[22px] sm:rounded-[24px] overflow-hidden bg-white/85 dark:bg-[#111722]/85 backdrop-blur-xl backdrop-saturate-150 border border-gray-200/80 dark:border-white/10 transition-colors duration-300 z-10"
        style={{
          transformStyle: canHover ? "preserve-3d" : undefined,
          rotateX: canHover && isHovered ? rotateX : 0,
          rotateY: canHover && isHovered ? rotateY : 0,
          y: canHover && isHovered ? -8 : 0,
          scale: canHover && isHovered ? 1.015 : 1,
          boxShadow: isHovered
            ? "0 28px 55px -12px rgba(104, 26, 114, 0.22), 0 14px 28px -6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(168, 85, 247, 0.25)"
            : "0 8px 24px -6px rgba(0, 0, 0, 0.06), 0 2px 8px -2px rgba(104, 26, 114, 0.04)",
        }}
        transition={{
          y: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
          scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        {/* Subtle Animated Iridescent Gradient Border Ring */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[22px] sm:rounded-[24px] p-px bg-gradient-to-br from-white/80 via-[#681a72]/20 to-rose-400/30 dark:from-white/20 dark:via-purple-500/20 dark:to-rose-500/20 opacity-40 group-hover/card:opacity-100 transition-opacity duration-500"
          style={{
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
          aria-hidden="true"
        />

        {/* Specular Glare Reflection Gradient (Desktop only) */}
        {canHover && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-40 rounded-[22px] sm:rounded-[24px] transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.3 : 0,
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.45) 0%, transparent 60%)`,
            }}
            aria-hidden="true"
          />
        )}

        {/* Micro-Notification Toasts (Share / Compare) */}
        <AnimatePresence>
          {showShareNotice && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="absolute top-12 left-1/2 -translate-x-1/2 z-50 bg-[#16191f] dark:bg-white text-white dark:text-[#16191f] text-[11px] font-bold py-1.5 px-3.5 rounded-full shadow-2xl flex items-center gap-1.5 pointer-events-none border border-white/20 whitespace-nowrap"
            >
              <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600 stroke-[2.5]" />
              <span>Link copied to clipboard</span>
            </motion.div>
          )}

          {compareToast && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="absolute top-12 left-1/2 -translate-x-1/2 z-50 bg-[#16191f] dark:bg-white text-white dark:text-[#16191f] text-[11px] font-bold py-1.5 px-3.5 rounded-full shadow-2xl flex items-center gap-1.5 pointer-events-none border border-white/20 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 dark:text-amber-500 fill-amber-400" />
              <span>{compareToast}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <Link href={`/product/${product.slug}`} className="flex flex-col flex-1">
          {/* =================================================================
              1. PRODUCT IMAGE AREA (3D Lift, Floating Depth & Multi-Angle Story)
              ================================================================= */}
          <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-[#faf9f6] via-[#f7f5f2] to-[#f2eee9] dark:from-[#171d2b] dark:to-[#0f131c] overflow-hidden rounded-t-[22px] sm:rounded-t-[24px]">
            {/* 3D Floating Product Image */}
            <motion.div
              className="relative w-full h-full"
              animate={
                isHovered && canHover
                  ? { scale: 1.05, y: -4, rotate: 2.5 }
                  : { scale: 1, y: 0, rotate: 0 }
              }
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src={productImages[activeImgIdx] || productImages[0]}
                alt={`${product.title} - View ${activeImgIdx + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-opacity duration-300"
                priority={index < 4}
              />
            </motion.div>

            {/* Realistic Floating Optical Shadow beneath image on hover */}
            <motion.div
              className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 w-4/5 h-6 bg-black/30 dark:bg-black/60 blur-md rounded-full"
              animate={
                isHovered && canHover
                  ? { opacity: 0.5, scale: 1.08, y: 3 }
                  : { opacity: 0, scale: 0.75, y: 0 }
              }
              transition={{ duration: 0.4 }}
              aria-hidden="true"
            />

            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Story Indicator Dashes for Multi-Angle Photo Switching */}
            {productImages.length > 1 && (
              <div className="absolute top-2 left-3 right-14 z-20 flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
                {productImages.map((_, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveImgIdx(idx);
                    }}
                    className={`h-1 flex-1 rounded-full transition-all duration-200 cursor-pointer ${
                      activeImgIdx === idx ? "bg-white shadow-sm" : "bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Top-Left Badges (Floating at Depth translateZ: 32px) */}
            <div
              className="absolute top-3 left-3 z-20 flex flex-col gap-1 items-start"
              style={{ transform: canHover ? "translateZ(32px)" : undefined }}
            >
              {product.badge && (
                <span className="inline-flex items-center gap-1 bg-[#16191f]/95 dark:bg-white/95 text-white dark:text-[#16191f] text-[9.5px] sm:text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md backdrop-blur-md border border-white/20 dark:border-black/10">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300 dark:text-[#681a72] fill-current" />
                  {product.badge}
                </span>
              )}

              {discountPercent > 0 && (
                <span className="inline-flex items-center text-[9.5px] sm:text-[10px] font-black text-rose-600 dark:text-rose-400 bg-rose-50/90 dark:bg-rose-950/70 border border-rose-200/80 dark:border-rose-900/40 px-2 py-0.5 rounded-full shadow-xs backdrop-blur-xs">
                  -{discountPercent}%
                </span>
              )}
            </div>

            {/* Top-Right Wishlist Button (Floating at Depth translateZ: 35px) */}
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.88 }}
              onClick={handleWishlist}
              className={`absolute top-3 right-3 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center backdrop-blur-xl border shadow-md cursor-pointer transition-colors duration-200 ${
                isInWishlist
                  ? "bg-rose-50/95 dark:bg-rose-950/80 border-rose-200 dark:border-rose-800 text-rose-600 shadow-[0_4px_16px_rgba(244,63,94,0.35)]"
                  : "bg-white/85 dark:bg-[#151c2c]/85 border-white/60 dark:border-white/15 text-gray-500 hover:text-rose-600 hover:bg-white"
              }`}
              aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
              title={isInWishlist ? "Saved in Wishlist" : "Save to Wishlist"}
              style={{ transform: canHover ? "translateZ(35px)" : undefined }}
            >
              <Heart
                className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-200 ${
                  isInWishlist ? "fill-rose-500 text-rose-500 scale-110" : "stroke-[1.8]"
                }`}
              />
            </motion.button>

            {/* Photo Counter Pill (Bottom Right) */}
            {productImages.length > 1 && (
              <div
                className="absolute bottom-2.5 right-2.5 z-20 bg-black/60 dark:bg-black/80 backdrop-blur-md text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border border-white/15 shadow-sm"
                style={{ transform: canHover ? "translateZ(26px)" : undefined }}
              >
                {activeImgIdx + 1}/{productImages.length} Photos
              </div>
            )}

            {/* Photo Carousel Chevrons */}
            {productImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/90 dark:bg-black/80 text-gray-900 dark:text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all hover:scale-110 active:scale-95 shadow-md cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextImage}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/90 dark:bg-black/80 text-gray-900 dark:text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all hover:scale-110 active:scale-95 shadow-md cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* =============================================================
                2. FLOATING ACTION TOOLBAR (Quick View, Compare, Share)
                ============================================================= */}
            <motion.div
              className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 p-1 rounded-full bg-white/95 dark:bg-[#141b28]/95 backdrop-blur-xl border border-white/60 dark:border-white/15 shadow-xl shadow-black/10"
              initial={{ opacity: 0, y: 12, scale: 0.92 }}
              animate={
                isHovered && canHover
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 12, scale: 0.92 }
              }
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ transform: canHover ? "translateZ(38px)" : undefined }}
            >
              {/* Quick View Button */}
              <button
                onClick={handleQuickView}
                className="px-3 py-1.5 rounded-full text-[11px] font-bold text-gray-800 dark:text-gray-100 hover:bg-[#681a72] hover:text-white dark:hover:bg-[#c084fc] dark:hover:text-[#111722] transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Quick Preview"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Quick View</span>
              </button>

              <div className="w-px h-3.5 bg-gray-200 dark:bg-gray-700" />

              {/* Compare Button */}
              <button
                onClick={handleToggleCompare}
                className={`p-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                  inCompare
                    ? "bg-[#681a72] text-white dark:bg-[#c084fc] dark:text-[#111722]"
                    : "text-gray-600 dark:text-gray-300 hover:text-[#681a72] dark:hover:text-[#c084fc] hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                title={inCompare ? "In Compare Matrix" : "Add to Compare"}
                aria-label="Compare Product"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
              </button>

              <div className="w-px h-3.5 bg-gray-200 dark:bg-gray-700" />

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="p-1.5 rounded-full text-xs text-gray-600 dark:text-gray-300 hover:text-[#681a72] dark:hover:text-[#c084fc] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                title="Share Product"
                aria-label="Share Product"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </div>

          {/* =================================================================
              3. PRODUCT DETAILS SECTION (Typography, Micro-tags, Price & CTA)
              ================================================================= */}
          <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between bg-transparent">
            <div>
              {/* Optional Color Swatches Preview */}
              {product.colors && product.colors.length > 1 && (
                <div className="flex items-center gap-1.5 mb-2">
                  {product.colors.slice(0, 4).map((c) => (
                    <button
                      key={c.name}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedColor(c.name);
                      }}
                      title={c.name}
                      style={{ backgroundColor: c.hex }}
                      className={`w-3 h-3 rounded-full border transition-transform cursor-pointer ${
                        selectedColor === c.name
                          ? "ring-2 ring-gray-950 dark:ring-white scale-125 border-white"
                          : "border-black/20 hover:scale-110"
                      }`}
                    />
                  ))}
                  {product.colors.length > 4 && (
                    <span className="text-[10px] text-gray-400 font-mono">
                      +{product.colors.length - 4}
                    </span>
                  )}
                </div>
              )}

              {/* Brand & Subcategory Micro-Eyebrow */}
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400 dark:text-gray-500 mb-1">
                <span className="truncate">{product.brand || "VELORA"}</span>
                <span className="truncate">{product.subcategory || product.category}</span>
              </div>

              {/* Product Title */}
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 leading-snug group-hover/card:text-[#681a72] dark:group-hover/card:text-[#c084fc] transition-colors mb-2">
                {product.title}
              </h3>

              {/* Price Area: Large Selling Price, MRP, Discount Badge, Savings Label */}
              <div
                className="space-y-1 mb-2.5"
                style={{ transform: canHover ? "translateZ(24px)" : undefined }}
              >
                <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                  <span className="text-lg sm:text-xl font-black text-gray-950 dark:text-white tracking-tight">
                    {formatPrice(product.price, currency)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 dark:text-gray-500 line-through font-normal">
                      {formatPrice(product.originalPrice, currency)}
                    </span>
                  )}
                  {product.discountBadge ? (
                    <span className="text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded-md">
                      {product.discountBadge}
                    </span>
                  ) : discountPercent > 0 ? (
                    <span className="text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded-md">
                      {discountPercent}% OFF
                    </span>
                  ) : null}
                </div>

                {/* Savings Label & First-Order Bonus */}
                <div className="flex items-center gap-2 flex-wrap text-[10px]">
                  {savingsAmount > 0 && (
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      Save {formatPrice(savingsAmount, currency)}
                    </span>
                  )}
                  <span className="text-gray-400">•</span>
                  <span className="font-medium text-[#681a72] dark:text-[#c084fc]">
                    ₹100 Off on 1st Order
                  </span>
                </div>
              </div>

              {/* Stock Indicator & Free Delivery Tag */}
              <div className="flex items-center justify-between gap-1 mb-3 text-[10.5px]">
                {product.stockCount <= 8 ? (
                  <span className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Only {product.stockCount} left
                  </span>
                ) : (
                  <span className="flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    In Stock • Ready to Ship
                  </span>
                )}

                <span className="inline-flex items-center text-[10px] font-semibold text-[#059669] dark:text-[#34d399] bg-[#ecfdf5] dark:bg-[#064e3b]/30 border border-[#a7f3d0] dark:border-[#065f46] px-2 py-0.5 rounded-md">
                  Free Delivery
                </span>
              </div>
            </div>

            {/* Bottom Row: Rating Badge & 3D Interactive Add To Cart Button */}
            <div className="pt-2.5 border-t border-gray-100 dark:border-white/10 flex items-center justify-between gap-2">
              {/* Rating Pill */}
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="inline-flex items-center gap-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md shadow-2xs shrink-0">
                  <span>{product.rating.toFixed(1)}</span>
                  <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white text-white" />
                </span>
                <span className="text-[10px] sm:text-xs text-gray-400 font-medium truncate">
                  ({product.reviewsCount > 999
                    ? `${(product.reviewsCount / 1000).toFixed(1)}k`
                    : product.reviewsCount})
                </span>
              </div>

              {/* 3D Magnetic Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleAddToCart}
                className={`relative px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0 overflow-hidden ${
                  isAddedRecently
                    ? "bg-emerald-600 text-white shadow-emerald-500/40 shadow-md scale-105"
                    : "bg-gradient-to-r from-[#16191f] via-[#2d1238] to-[#16191f] dark:from-[#2d1238] dark:via-[#4c1d58] dark:to-[#2d1238] text-white hover:from-[#681a72] hover:to-[#8b1874] hover:shadow-md hover:shadow-purple-900/30 border border-white/10"
                }`}
                title="Add to Cart"
                aria-label={`Add ${product.title} to bag`}
                style={{ transform: canHover ? "translateZ(28px)" : undefined }}
              >
                {/* Specular sheen animation on hover */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000 ease-out"
                  aria-hidden="true"
                />

                {isAddedRecently ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span className="text-[11px]">Added ✓</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="text-[11px]">Add</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
