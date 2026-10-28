"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ShoppingBag, Check, Eye } from "lucide-react";
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
  const addItemToCart = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const openQuickView = usePreferencesStore((s) => s.openQuickView);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItemToCart(
      product,
      1,
      product.colors?.[0]?.name,
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
    <div className="card-3d-hover group flex flex-col h-full overflow-hidden bg-white dark:bg-[#151c2c] border border-gray-200/90 dark:border-gray-800 rounded-2xl relative cursor-pointer shadow-xs">
      <Link href={`/product/${product.slug}`} className="flex flex-col flex-1">
        {/* Product Image Box with 3D Specular Sheen & Quick View */}
        <div className="relative w-full aspect-[4/5] bg-gray-100/70 dark:bg-gray-800/60 overflow-hidden sheen-overlay">
          <Image
            src={product.images[0] || "/placeholder.png"}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
          />

          {/* 3D Badge Tag (Trending / Best Seller / Under ₹299 / M-Trusted) */}
          {product.badge && (
            <div className="absolute top-2 left-2 z-10 bg-black/80 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm border border-white/10">
              {product.badge}
            </div>
          )}

          {/* Quick View Eye Button (Desktop on hover) */}
          <button
            onClick={handleQuickView}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-white/95 dark:bg-gray-900/90 text-gray-800 dark:text-gray-200 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-bold shadow-lg hover:bg-[#681a72] hover:text-white flex items-center gap-1.5 border border-white/20"
            title="Quick Preview"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          {/* Floating 3D Heart Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-2 right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 active:scale-90 hover:scale-110 ${
              isInWishlist
                ? "bg-rose-50 text-[#e11d48] shadow-[0_2px_10px_rgba(225,29,72,0.3)]"
                : "bg-white/95 dark:bg-gray-900/90 text-gray-400 hover:text-[#e11d48] hover:bg-white"
            }`}
            aria-label="Add to wishlist"
          >
            <Heart
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform ${
                isInWishlist ? "fill-[#e11d48] text-[#e11d48] scale-110" : ""
              }`}
            />
          </button>
        </div>

        {/* Product Card Details */}
        <div className="p-2.5 sm:p-3.5 flex flex-col flex-1 justify-between">
          <div>
            {/* Title */}
            <h3 className="text-xs sm:text-[13px] text-gray-800 dark:text-gray-200 font-medium line-clamp-2 leading-snug group-hover:text-[#681a72] dark:group-hover:text-[#c084fc] transition-colors mb-1.5">
              {product.title}
            </h3>

            {/* Price Row */}
            <div className="flex items-baseline gap-1.5 sm:gap-2 mb-1 flex-wrap">
              <span className="text-sm sm:text-base font-black text-gray-900 dark:text-white tracking-tight">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.discountBadge && (
                <span className="text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1 rounded">
                  {product.discountBadge}
                </span>
              )}
            </div>

            {/* Free Delivery Tag */}
            <div className="mb-2">
              <span className="free-delivery-badge text-[10px] sm:text-[11px]">Free Delivery</span>
            </div>
          </div>

          {/* Bottom Row: Green Rating Pill + Reviews Count + 3D Add to Cart button */}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="rating-pill text-[10px] sm:text-[11px]">
                <span>{product.rating.toFixed(1)}</span>
                <Star className="w-2.5 h-2.5 fill-white" />
              </span>
              <span className="text-[10px] sm:text-[11px] text-gray-400 truncate">
                ({product.reviewsCount > 999 ? `${(product.reviewsCount / 1000).toFixed(1)}k` : product.reviewsCount})
              </span>
            </div>

            {/* Quick 3D Add to Cart button */}
            <button
              onClick={handleAddToCart}
              className={`p-1.5 sm:p-2 rounded-xl transition-all duration-200 active:scale-90 hover:scale-110 shadow-2xs ${
                isAddedRecently
                  ? "bg-emerald-600 text-white shadow-emerald-500/30 shadow-md"
                  : "bg-purple-50 hover:bg-[#681a72] text-[#681a72] hover:text-white dark:bg-purple-950/50 dark:text-purple-300 hover:shadow-md"
              }`}
              title="Add to Cart"
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
  );
}