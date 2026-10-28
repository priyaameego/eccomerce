"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star, ShoppingBag, Check, ShieldCheck, Truck, Sparkles, ArrowRight } from "lucide-react";
import { usePreferencesStore } from "@/store/usePreferencesStore";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";

export default function QuickViewModal() {
  const product = usePreferencesStore((s) => s.quickViewProduct);
  const closeQuickView = usePreferencesStore((s) => s.closeQuickView);
  const addItem = useCartStore((s) => s.addItem);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const currentSize = selectedSize || product.sizes?.[0] || "Free Size";

  const handleAddToCart = () => {
    addItem(product, quantity, product.colors?.[0]?.name, currentSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-500 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Left: Image */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              <Image
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-14 h-16 rounded-md overflow-hidden border-2 ${
                      activeImageIdx === idx ? "border-[#681a72]" : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <Image src={img} alt="thumb" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                {product.brand}
              </span>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mt-0.5">
                {product.title}
              </h3>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.discountBadge && (
                <span className="text-xs font-bold text-[#059669]">
                  {product.discountBadge}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <span className="rating-pill">
                <span>{product.rating.toFixed(1)}</span>
                <Star className="w-2.5 h-2.5 fill-white" />
              </span>
              <span className="text-xs text-gray-400">
                ({product.reviewsCount.toLocaleString()} reviews)
              </span>
              <span className="free-delivery-badge">Free Delivery</span>
            </div>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Select Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold border transition-colors ${currentSize === sz
                          ? "border-[#681a72] bg-rose-50 text-[#681a72] dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-400"
                          : "border-gray-200 hover:border-gray-400 text-gray-700 dark:text-gray-300 dark:border-gray-700"
                        }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3">
              {product.description}
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-[#681a72] hover:bg-[#52135a] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isAdded ? "Added to Cart ✓" : "Add to Cart"}</span>
              </button>

              <Link
                href={`/product/${product.slug}`}
                onClick={closeQuickView}
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 text-xs font-bold rounded-xl text-center transition-colors"
              >
                View Full Product Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
