"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Star,
  ShoppingBag,
  Check,
  Eye,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { usePreferencesStore } from "@/store/usePreferencesStore";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isAddedRecently, setIsAddedRecently] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors?.[0]?.name
  );

  useEffect(() => {
    // Only enable 3D tilt & magnetic transforms on fine pointer mouse devices (prevents mobile touch scroll jitter)
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

  const [transformStyle, setTransformStyle] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
  });

  const cardRef = useRef<HTMLDivElement>(null);

  const addItemToCart = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const openQuickView = usePreferencesStore((s) => s.openQuickView);

  // Prepare images list (guaranteed 3 to 4 angles for true luxury look)
  const productImages = React.useMemo(() => {
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

  // Next / Prev image navigation on card
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

  // 3D Tilt & Magnetic Physics (Only on fine mouse pointer)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;

    const normX = (x / width - 0.5) * 2;
    const normY = (y / height - 0.5) * 2;

    setTransformStyle({
      rotateX: -normY * 10,
      rotateY: normX * 10,
      glareX: (x / width) * 100,
      glareY: (y / height) * 100,
      glareOpacity: 0.25,
    });
  }, [canHover]);

  const handleMouseEnter = () => {
    if (!canHover) return;
    setIsHovered(true);
    // On hover, if there's a second image, hint with second photo
    if (productImages.length > 1 && activeImgIdx === 0) {
      setActiveImgIdx(1);
    }
  };

  const handleMouseLeave = () => {
    if (!canHover) return;
    setIsHovered(false);
    setActiveImgIdx(0);
    setTransformStyle({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      glareOpacity: 0,
    });
  };

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
    setTimeout(() => setIsAddedRecently(false), 1600);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col h-full ${canHover ? "[perspective:1000px]" : ""} select-none`}
    >
      <div
        className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-white dark:bg-[#121824] border border-gray-200/90 dark:border-gray-800 transition-all duration-300 ease-out"
        style={{
          transform: canHover && isHovered
            ? `rotateX(${transformStyle.rotateX}deg) rotateY(${transformStyle.rotateY}deg) translateY(-6px) scale(1.015)`
            : "none",
          transformStyle: canHover ? "preserve-3d" : undefined,
          boxShadow: isHovered
            ? "0 20px 40px -15px rgba(0, 0, 0, 0.2), 0 0 25px 2px rgba(104, 26, 114, 0.12)"
            : "0 2px 8px -2px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Dynamic Specular Reflection Glare (Desktop only) */}
        {canHover && (
          <div
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-2xl"
            style={{
              opacity: transformStyle.glareOpacity,
              background: `radial-gradient(circle at ${transformStyle.glareX}% ${transformStyle.glareY}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
            }}
          />
        )}

        <Link href={`/product/${product.slug}`} className="flex flex-col flex-1">
          {/* Product Multi-Image Box */}
          <div className="relative w-full aspect-[4/5] bg-gray-100 dark:bg-gray-800/80 overflow-hidden">
            {/* Active Image with Smooth Zoom */}
            <Image
              src={productImages[activeImgIdx] || productImages[0]}
              alt={`${product.title} - View ${activeImgIdx + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-106 transition-all duration-500 ease-out"
            />

            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Segmented Story Indicators (Top Bar) for Multi-Image Preview */}
            {productImages.length > 1 && (
              <div className="absolute top-2 left-3 right-3 z-20 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {productImages.map((_, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveImgIdx(idx);
                    }}
                    className={`h-1 flex-1 rounded-full transition-all duration-200 ${
                      activeImgIdx === idx ? "bg-white shadow-sm" : "bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Image Counter Badge (Bottom Right) */}
            {productImages.length > 1 && (
              <div className="absolute bottom-2.5 right-2.5 z-20 bg-black/70 backdrop-blur-md text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border border-white/10 shadow-sm opacity-90">
                {activeImgIdx + 1}/{productImages.length} Photos
              </div>
            )}

            {/* Subtle Left / Right Chevrons to Browse Photos on Card */}
            {productImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/90 dark:bg-black/80 text-gray-900 dark:text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95 shadow-md cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextImage}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/90 dark:bg-black/80 text-gray-900 dark:text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95 shadow-md cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Luxury Badge Tag (NEW ARRIVAL / Trending / Best Seller) */}
            <div
              className="absolute top-3 left-3 z-20 bg-black/90 text-white text-[10px] sm:text-[11px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm"
              style={{ transform: "translateZ(25px)" }}
            >
              {product.badge || "NEW ARRIVAL"}
            </div>

            {/* Quick View Eye Button (Desktop on hover) */}
            <button
              onClick={handleQuickView}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-white/95 dark:bg-gray-900/90 text-gray-900 dark:text-white backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-bold shadow-xl hover:bg-gray-950 hover:text-white flex items-center gap-1.5 border border-white/20 active:scale-95 cursor-pointer"
              title="Quick Preview"
              style={{ transform: "translateZ(30px)" }}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>

            {/* Floating Heart Wishlist Button */}
            <button
              onClick={handleWishlist}
              className={`absolute top-3 right-3 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 active:scale-90 hover:scale-110 cursor-pointer border ${
                isInWishlist
                  ? "bg-rose-50 border-rose-200 text-[#e11d48] shadow-[0_2px_12px_rgba(225,29,72,0.3)]"
                  : "bg-white text-gray-400 hover:text-[#e11d48] border-gray-100 dark:bg-gray-900 dark:border-gray-800"
              }`}
              aria-label="Add to wishlist"
              style={{ transform: "translateZ(25px)" }}
            >
              <Heart
                className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform ${
                  isInWishlist ? "fill-[#e11d48] text-[#e11d48] scale-110" : "stroke-[1.7]"
                }`}
              />
            </button>
          </div>

          {/* Product Details Section */}
          <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between bg-white dark:bg-[#121824]">
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

              {/* Title */}
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 leading-snug group-hover:text-[#681a72] dark:group-hover:text-[#c084fc] transition-colors mb-1.5">
                {product.title}
              </h3>

              {/* Price Row: Bold Selling Price, Strikethrough MRP, Discount % */}
              <div className="flex items-baseline gap-1.5 sm:gap-2 mb-2 flex-wrap">
                <span className="text-base sm:text-xl font-black text-gray-950 dark:text-white tracking-tight">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-[11px] sm:text-sm text-gray-400 line-through font-normal">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discountBadge && (
                  <span className="text-[10px] sm:text-xs font-bold text-[#059669] dark:text-[#34d399]">
                    {product.discountBadge}
                  </span>
                )}
              </div>

              {/* Free Delivery Tag */}
              <div className="mb-2.5 sm:mb-3">
                <span className="inline-flex items-center text-[10px] sm:text-xs font-semibold text-[#059669] dark:text-[#34d399] bg-[#ecfdf5] dark:bg-[#064e3b]/30 border border-[#a7f3d0] dark:border-[#065f46] px-2 sm:px-2.5 py-0.5 rounded-md">
                  Free Delivery
                </span>
              </div>
            </div>

            {/* Bottom Row: Rating Badge + Purple Add to Cart Button */}
            <div className="pt-2 sm:pt-2.5 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-1">
              <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                <span className="inline-flex items-center gap-0.5 sm:gap-1 bg-[#059669] text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-md shadow-xs shrink-0">
                  <span>{product.rating.toFixed(1)}</span>
                  <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-white text-white" />
                </span>
                <span className="text-[10px] sm:text-xs text-gray-400 font-medium truncate">
                  ({product.reviewsCount > 999 ? `${(product.reviewsCount / 1000).toFixed(1)}k` : product.reviewsCount})
                </span>
              </div>

              {/* Luxury Purple Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl transition-all duration-300 active:scale-90 hover:scale-110 cursor-pointer shadow-xs flex items-center justify-center shrink-0 ${
                  isAddedRecently
                    ? "bg-emerald-600 text-white shadow-emerald-500/40 shadow-md scale-105"
                    : "bg-[#faf5ff] dark:bg-[#2e1065]/40 text-[#681a72] dark:text-[#d8b4fe] border border-[#e9d5ff] dark:border-[#581c87] hover:bg-[#681a72] hover:text-white"
                }`}
                title="Add to Cart"
                style={{ transform: "translateZ(20px)" }}
              >
                {isAddedRecently ? (
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                ) : (
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                )}
              </button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
