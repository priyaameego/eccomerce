"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, RotateCcw, Image as ImageIcon, Star, ShoppingBag, Check, ShieldCheck, Truck } from "lucide-react";
import { usePreferencesStore } from "@/store/usePreferencesStore";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { sound } from "@/lib/sound";
import ProductViewer360 from "@/components/3d/ProductViewer360";

export default function QuickViewModal() {
  const product = usePreferencesStore((s) => s.quickViewProduct);
  const closeQuickView = usePreferencesStore((s) => s.closeQuickView);
  const currency = usePreferencesStore((s) => s.currency);
  const addItem = useCartStore((s) => s.addItem);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [show360, setShow360] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const currentColor = selectedColor || product.colors[0]?.name;
  const currentSize = selectedSize || product.sizes?.[0];

  const handleAddToCart = () => {
    addItem(product, quantity, currentColor, currentSize);
    sound.playSuccess();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto glass-panel bg-[#090a0f]/95 rounded-3xl border border-white/20 shadow-2xl p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            closeQuickView();
            sound.playClick();
          }}
          className="absolute top-5 right-5 p-2 rounded-full glass-panel border border-white/10 text-neutral-400 hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Visual Showcase (360 or High-Res Gallery) */}
          <div className="flex flex-col gap-4">
            {/* Toggle Between Standard Gallery & 360 Turntable */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">
                {show360 ? "Interactive 360° Studio" : "High-Definition Still"}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setShow360(false);
                    sound.playClick();
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                    !show360 ? "bg-[#d4af37] text-black font-semibold" : "bg-white/10 text-white"
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  Gallery
                </button>
                <button
                  onClick={() => {
                    setShow360(true);
                    sound.playClick();
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                    show360 ? "bg-[#d4af37] text-black font-semibold" : "bg-white/10 text-white"
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  360° View
                </button>
              </div>
            </div>

            {show360 ? (
              <ProductViewer360
                images={product.turntableImages?.length ? product.turntableImages : product.images}
                productTitle={product.title}
              />
            ) : (
              <div>
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden glass-panel border border-white/10 p-4 flex items-center justify-center">
                  <Image
                    src={product.images[activeImageIdx] || product.images[0]}
                    alt={product.title}
                    fill
                    className="object-contain p-4 drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
                  />
                </div>

                {/* Thumbnail Strip */}
                <div className="flex items-center gap-3 mt-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveImageIdx(idx);
                        sound.playClick();
                      }}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border transition-all shrink-0 ${
                        activeImageIdx === idx
                          ? "border-[#d4af37] ring-2 ring-[#d4af37]/40 scale-105"
                          : "border-white/10 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Information & Purchase Atelier */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase">
                  {product.brand}
                </span>
                <span className="text-white/20">•</span>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">
                  {product.category}
                </span>
              </div>

              <h2 className="text-2xl font-serif font-bold text-white tracking-wide">
                {product.title}
              </h2>
              <p className="text-xs text-neutral-400 mt-1">{product.subtitle}</p>

              {/* Rating & Stock */}
              <div className="flex items-center gap-4 mt-3 pb-4 border-b border-white/10">
                <div className="flex items-center gap-1 text-xs font-mono text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-neutral-400">({product.reviewsCount} atelier reviews)</span>
                </div>
                <span className="text-white/20">|</span>
                <span className="text-xs font-mono text-emerald-400">
                  In Stock ({product.stockCount} units remaining)
                </span>
              </div>

              {/* Price */}
              <div className="my-4 flex items-baseline gap-3">
                <span className="text-2xl font-mono font-bold text-white">
                  {formatPrice(product.price, currency)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono text-neutral-500 line-through">
                    {formatPrice(product.originalPrice, currency)}
                  </span>
                )}
                {product.discountBadge && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {product.discountBadge}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-300 leading-relaxed">
                {product.description}
              </p>

              {/* Color Options */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4">
                  <label className="text-[11px] font-mono tracking-wider uppercase text-neutral-400 block mb-2">
                    Finish: <span className="text-white font-medium">{currentColor}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => {
                          setSelectedColor(c.name);
                          sound.playClick();
                        }}
                        className={`w-7 h-7 rounded-full border transition-all ${
                          currentColor === c.name
                            ? "ring-2 ring-[#d4af37] ring-offset-2 ring-offset-black scale-110"
                            : "border-white/20 opacity-70 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Options */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-4">
                  <label className="text-[11px] font-mono tracking-wider uppercase text-neutral-400 block mb-2">
                    Sizing / Spec: <span className="text-white font-medium">{currentSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setSelectedSize(s);
                          sound.playClick();
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                          currentSize === s
                            ? "bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37] font-semibold"
                            : "border-white/10 text-neutral-300 hover:border-white/30"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Action */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex items-center border border-white/10 rounded-xl overflow-hidden bg-white/5">
                  <button
                    onClick={() => {
                      setQuantity((q) => Math.max(1, q - 1));
                      sound.playClick();
                    }}
                    className="px-3 py-2 text-sm text-neutral-300 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-mono text-white font-bold">{quantity}</span>
                  <button
                    onClick={() => {
                      setQuantity((q) => Math.min(product.stockCount, q + 1));
                      sound.playClick();
                    }}
                    className="px-3 py-2 text-sm text-neutral-300 hover:text-white"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-6 rounded-xl font-mono text-xs tracking-wider uppercase font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${
                    isAdded
                      ? "bg-emerald-500 text-black shadow-emerald-500/30"
                      : "bg-[#d4af37] hover:bg-[#c5a059] text-black shadow-[#d4af37]/30 hover:scale-[1.02]"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added to Atelier Bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      Acquire Masterpiece
                    </>
                  )}
                </button>
              </div>

              {/* Guarantees */}
              <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-[11px] text-neutral-400 font-mono">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                  <span>5-Year Global Atelier Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#d4af37]" />
                  <span>Complimentary Insured Courier</span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <Link
                  href={`/product/${product.slug}`}
                  onClick={() => {
                    closeQuickView();
                    sound.playClick();
                  }}
                  className="text-xs font-mono text-neutral-400 hover:text-[#d4af37] underline transition-colors"
                >
                  View Complete Specifications & Archival Heritage &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
