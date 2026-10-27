"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, ShoppingBag, SlidersHorizontal, Star, Check } from "lucide-react";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCompareStore } from "@/store/useCompareStore";
import { usePreferencesStore } from "@/store/usePreferencesStore";
import { sound } from "@/lib/sound";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedRecently, setIsAddedRecently] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt calculation
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const addItemToCart = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const addToCompare = useCompareStore((s) => s.addToCompare);
  const isInCompare = useCompareStore((s) => s.isInCompare(product.id));

  const currency = usePreferencesStore((s) => s.currency);
  const openQuickView = usePreferencesStore((s) => s.openQuickView);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Moderate tilt angles
    setRotateX(-y / 15);
    setRotateY(x / 15);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sound.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItemToCart(
      product,
      1,
      product.colors[selectedColorIdx]?.name,
      product.sizes?.[0]
    );
    sound.playSuccess();
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1800);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    sound.playClick();
  };

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCompare(product);
    sound.playClick();
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
    sound.playClick();
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 group relative w-full h-full"
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`
            : "rotateX(0deg) rotateY(0deg) translateY(0px)",
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
        }}
        className="glass-card rounded-2xl p-4 flex flex-col justify-between h-full border border-white/10 relative overflow-hidden group-hover:border-[#d4af37]/40 shadow-xl"
      >
        {/* Top Badges & Quick Action Floating Pill */}
        <div className="relative z-10 flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-col gap-1.5 items-start">
            {product.badge && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40 backdrop-blur-md">
                {product.badge}
              </span>
            )}
            {product.discountBadge && (
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {product.discountBadge}
              </span>
            )}
          </div>

          {/* Quick Actions (Wishlist & Compare) */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCompareToggle}
              className={`p-1.5 rounded-full border transition-all ${
                isInCompare
                  ? "bg-cyan-500/30 border-cyan-400 text-cyan-300"
                  : "bg-black/40 border-white/10 text-neutral-400 hover:text-cyan-400 hover:border-cyan-400/50"
              }`}
              title="Compare side-by-side"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleWishlistToggle}
              className={`p-1.5 rounded-full border transition-all ${
                isInWishlist
                  ? "bg-red-500/30 border-red-500 text-red-400"
                  : "bg-black/40 border-white/10 text-neutral-400 hover:text-red-400 hover:border-red-500/50"
              }`}
              title="Save to private wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${isInWishlist ? "fill-red-400" : ""}`} />
            </button>
          </div>
        </div>

        {/* Product Visual Container with Quick View Overlay */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/20 flex items-center justify-center group/img">
          <Link href={`/product/${product.slug}`} className="relative w-full h-full block">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-contain p-3 group-hover/img:scale-108 transition-transform duration-700 ease-out drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)]"
            />
          </Link>

          {/* Quick View Button Hover Slide-up */}
          <button
            onClick={handleQuickView}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full glass-panel border border-white/20 text-xs font-mono tracking-wider text-white flex items-center gap-2 opacity-0 group-hover/img:opacity-100 transition-all duration-300 hover:bg-[#d4af37]/20 hover:border-[#d4af37] shadow-xl z-20 pointer-events-auto"
          >
            <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
            Quick View
          </button>
        </div>

        {/* Product Meta & Details */}
        <div className="mt-4 flex flex-col flex-1 justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#d4af37]/80">
                {product.brand}
              </span>
              <div className="flex items-center gap-1 text-[11px] font-mono">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-neutral-500">({product.reviewsCount})</span>
              </div>
            </div>

            <Link href={`/product/${product.slug}`}>
              <h3 className="text-sm font-semibold text-white hover:text-[#d4af37] transition-colors line-clamp-1">
                {product.title}
              </h3>
            </Link>
            <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">{product.subtitle}</p>
          </div>

          {/* Color Swatches */}
          {product.colors && product.colors.length > 1 && (
            <div className="flex items-center gap-1.5 mt-3">
              {product.colors.map((c, idx) => (
                <button
                  key={c.name}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColorIdx(idx);
                    sound.playClick();
                  }}
                  title={c.name}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    selectedColorIdx === idx
                      ? "ring-2 ring-[#d4af37] scale-110 border-white"
                      : "border-white/20 opacity-70 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              <span className="text-[10px] text-neutral-500 ml-1 font-mono">
                {product.colors[selectedColorIdx]?.name}
              </span>
            </div>
          )}

          {/* Stock Meter Scarcity */}
          {product.stockCount <= 10 && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-amber-300/90 mb-1">
                <span>Atelier Availability</span>
                <span>{product.stockCount} Pieces Remaining</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-[#d4af37] rounded-full"
                  style={{ width: `${Math.min(100, (product.stockCount / 15) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Price & Add to Bag Footer */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-base font-bold font-mono text-white">
                  {formatPrice(product.price, currency)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs font-mono text-neutral-500 line-through">
                    {formatPrice(product.originalPrice, currency)}
                  </span>
                )}
              </div>
              {product.editionText && (
                <span className="text-[9px] font-mono text-[#d4af37] tracking-wider truncate max-w-[140px]">
                  Numbered Atelier Edition
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className={`p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center ${
                isAddedRecently
                  ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                  : "bg-white/10 hover:bg-[#d4af37] text-white hover:text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
              }`}
              title="Add to Curated Bag"
            >
              {isAddedRecently ? (
                <Check className="w-4 h-4" />
              ) : (
                <ShoppingBag className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
