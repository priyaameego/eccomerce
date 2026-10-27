"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  RotateCcw,
  Image as ImageIcon,
  Star,
  ShoppingBag,
  Heart,
  SlidersHorizontal,
  ShieldCheck,
  Truck,
  Check,
  Sparkles,
  ArrowRight,
  Layers,
  Award,
  Plus,
} from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import ProductViewer360 from "@/components/3d/ProductViewer360";
import ProductCard from "@/components/ui/ProductCard";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCompareStore } from "@/store/useCompareStore";
import { usePreferencesStore } from "@/store/usePreferencesStore";
import { sound } from "@/lib/sound";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [show360, setShow360] = useState(false);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"specs" | "craftsmanship" | "reviews">("specs");

  // Reviews modal
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewComment, setNewReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const addToCompare = useCompareStore((s) => s.addToCompare);
  const isInCompare = useCompareStore((s) => s.isInCompare(product.id));

  const currency = usePreferencesStore((s) => s.currency);

  const handleAddToCart = () => {
    addItem(
      product,
      quantity,
      product.colors[selectedColorIdx]?.name,
      selectedSize
    );
    sound.playSuccess();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;
    setReviewSubmitted(true);
    sound.playSuccess();
    setTimeout(() => {
      setReviewModalOpen(false);
      setReviewSubmitted(false);
      setNewReviewAuthor("");
      setNewReviewComment("");
    }, 1500);
  };

  // Frequently bought bundle
  const relatedProducts = PRODUCTS.filter(
    (p) => product.frequentlyBoughtWith?.includes(p.id) || (p.category === product.category && p.id !== product.id)
  ).slice(0, 3);

  const bundleTotal = product.price + (relatedProducts[0]?.price || 0);

  return (
    <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-8 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-white transition-colors">
          Atelier
        </Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category}`} className="hover:text-white transition-colors">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-[#d4af37]">{product.title}</span>
      </nav>

      {/* Main Top Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Visual Studio: 360 Turntable or High-Definition Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Switcher Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {show360 ? "360° Interactive Studio" : "Studio Still Presentation"}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setShow360(false);
                  sound.playClick();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                  !show360 ? "bg-[#d4af37] text-black font-semibold" : "bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Still Gallery
              </button>
              <button
                onClick={() => {
                  setShow360(true);
                  sound.playClick();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                  show360 ? "bg-[#d4af37] text-black font-semibold" : "bg-white/10 text-white hover:bg-white/15"
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
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden glass-panel border border-white/10 p-8 flex items-center justify-center shadow-2xl">
                <Image
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={product.title}
                  fill
                  className="object-contain p-6 drop-shadow-[0_25px_45px_rgba(0,0,0,0.7)]"
                  priority
                />
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveImageIdx(idx);
                      sound.playClick();
                    }}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border transition-all shrink-0 ${
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

        {/* Right Info & Acquisition Module */}
        <div className="lg:col-span-5 rounded-3xl glass-card border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#d4af37]">
                {product.brand} • {product.subcategory}
              </span>
              {product.badge && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40">
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
              {product.title}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1 font-light leading-relaxed">
              {product.subtitle}
            </p>

            {/* Rating & Review Jump */}
            <div className="flex items-center gap-4 mt-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-1 text-xs font-mono text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-neutral-400">({product.reviewsCount} verified reviews)</span>
              </div>
              <span className="text-white/20">|</span>
              <button
                onClick={() => setActiveTab("reviews")}
                className="text-xs font-mono text-[#d4af37] underline"
              >
                Read Chronicles
              </button>
            </div>

            {/* Price Module */}
            <div className="my-5 flex items-baseline gap-3">
              <span className="text-3xl font-mono font-bold text-white">
                {formatPrice(product.price, currency)}
              </span>
              {product.originalPrice && (
                <span className="text-base font-mono text-neutral-500 line-through">
                  {formatPrice(product.originalPrice, currency)}
                </span>
              )}
              {product.discountBadge && (
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {product.discountBadge}
                </span>
              )}
            </div>

            {/* Allocation Text */}
            {product.editionText && (
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#d4af37] flex items-center gap-2 mb-5">
                <Award className="w-4 h-4 shrink-0" />
                <span>{product.editionText}</span>
              </div>
            )}

            {/* Color Swatch Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-5">
                <label className="text-xs font-mono tracking-wider uppercase text-neutral-400 block mb-2">
                  Atelier Finish:{" "}
                  <strong className="text-white">{product.colors[selectedColorIdx]?.name}</strong>
                </label>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c, idx) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setSelectedColorIdx(idx);
                        sound.playClick();
                      }}
                      className={`w-8 h-8 rounded-full border transition-all ${
                        selectedColorIdx === idx
                          ? "ring-2 ring-[#d4af37] ring-offset-2 ring-offset-[#090a0f] scale-110"
                          : "border-white/20 opacity-70 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size / Sizing Spec Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="text-xs font-mono tracking-wider uppercase text-neutral-400 block mb-2">
                  Configuration / Sizing: <strong className="text-white">{selectedSize}</strong>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSelectedSize(s);
                        sound.playClick();
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-mono transition-all border ${
                        selectedSize === s
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

            {/* Scarcity Bar */}
            {product.stockCount <= 10 && (
              <div className="mb-6 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-center justify-between text-xs font-mono text-amber-300 mb-1">
                  <span>Atelier Vault Scarcity</span>
                  <span>{product.stockCount} Pieces Available</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-[#d4af37] rounded-full"
                    style={{ width: `${(product.stockCount / 15) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Action Buttons: Add to Bag & Secondary */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {/* Stepper */}
                <div className="flex items-center border border-white/10 rounded-2xl overflow-hidden bg-white/5">
                  <button
                    onClick={() => {
                      setQuantity((q) => Math.max(1, q - 1));
                      sound.playClick();
                    }}
                    className="px-3.5 py-3 text-sm text-neutral-300 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 py-3 text-xs font-mono text-white font-bold">{quantity}</span>
                  <button
                    onClick={() => {
                      setQuantity((q) => Math.min(product.stockCount, q + 1));
                      sound.playClick();
                    }}
                    className="px-3 py-3 text-sm text-neutral-300 hover:text-white"
                  >
                    +
                  </button>
                </div>

                {/* Primary ATC */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 px-6 rounded-2xl font-mono text-xs tracking-wider uppercase font-bold transition-all flex items-center justify-center gap-2 shadow-xl ${
                    isAdded
                      ? "bg-emerald-500 text-black shadow-emerald-500/30"
                      : "bg-[#d4af37] hover:bg-[#c5a059] text-black shadow-[#d4af37]/35 hover:scale-[1.02] active:scale-95"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      Acquisition Confirmed
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      Acquire Creation
                    </>
                  )}
                </button>
              </div>

              {/* Secondary Actions (Wishlist & Compare) */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    toggleWishlist(product);
                    sound.playClick();
                  }}
                  className={`py-3 px-4 rounded-xl border text-xs font-mono flex items-center justify-center gap-2 transition-all ${
                    isInWishlist
                      ? "bg-red-500/20 border-red-500 text-red-400"
                      : "border-white/10 text-neutral-300 hover:border-white/30"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isInWishlist ? "fill-red-400" : ""}`} />
                  <span>{isInWishlist ? "Saved to Wishlist" : "Add to Wishlist"}</span>
                </button>

                <button
                  onClick={() => {
                    addToCompare(product);
                    sound.playClick();
                  }}
                  className={`py-3 px-4 rounded-xl border text-xs font-mono flex items-center justify-center gap-2 transition-all ${
                    isInCompare
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                      : "border-white/10 text-neutral-300 hover:border-white/30"
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>{isInCompare ? "In Comparison" : "Compare Specs"}</span>
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-2 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>5-Year Global Atelier Warranty & Ultrasonic Servicing</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#d4af37]" />
                <span>Complimentary Armored Courier with Security Escort</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deep-Dive Technical Dossier Tabs */}
      <div className="mt-20">
        <div className="flex items-center gap-4 border-b border-white/10 pb-4 mb-8 overflow-x-auto">
          {[
            { id: "specs", label: "Technical Specifications" },
            { id: "craftsmanship", label: "Craftsmanship & Metallurgy" },
            { id: "reviews", label: `Patron Reviews (${product.reviews.length})` },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  sound.playClick();
                }}
                className={`text-sm font-mono tracking-wider uppercase pb-2 transition-all border-b-2 whitespace-nowrap ${
                  isSelected
                    ? "border-[#d4af37] text-white font-bold"
                    : "border-transparent text-neutral-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Specs Table */}
        {activeTab === "specs" && (
          <div className="rounded-3xl glass-card border border-white/10 p-6 sm:p-8">
            <h3 className="text-lg font-serif font-bold text-white mb-6">
              Horological & Mechanical Telemetry
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specs).map(([key, val]) => (
                <div
                  key={key}
                  className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs"
                >
                  <span className="font-mono text-neutral-400 uppercase tracking-wider">{key}</span>
                  <span className="font-mono text-white font-semibold text-right">{val}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#d4af37] mb-3">
                Key Mechanical Capabilities
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-neutral-300">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Craftsmanship */}
        {activeTab === "craftsmanship" && (
          <div className="rounded-3xl glass-card border border-white/10 p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#d4af37]">
              <Layers className="w-4 h-4" />
              <span>Atelier Fabrication Process</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">
              The Genesis of {product.title}
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              {product.craftsmanship}
            </p>
            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              {product.description}
            </p>
          </div>
        )}

        {/* Tab 3: Reviews */}
        {activeTab === "reviews" && (
          <div className="rounded-3xl glass-card border border-white/10 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
              <div>
                <h3 className="text-lg font-serif font-bold text-white">
                  Patron Provenance Chronicles
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-neutral-300">
                    {product.rating} average based on {product.reviewsCount} verified clients
                  </span>
                </div>
              </div>

              <button
                onClick={() => setReviewModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-[#d4af37] hover:text-black text-white text-xs font-mono tracking-wider transition-colors border border-white/10"
              >
                Submit Collector Chronicle
              </button>
            </div>

            <div className="space-y-6">
              {product.reviews.map((rev) => (
                <div key={rev.id} className="p-5 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{rev.userName}</span>
                      {rev.verified && (
                        <span className="px-2 py-0.2 rounded-full text-[9px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Verified Acquisition
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-neutral-500">{rev.date}</span>
                  </div>

                  <div className="flex text-amber-400 mb-2">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <h5 className="text-xs font-semibold text-white mb-1">{rev.title}</h5>
                  <p className="text-xs text-neutral-300 leading-relaxed font-light">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Frequently Acquired Together Bundle */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 p-8 rounded-3xl glass-card border border-[#d4af37]/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-black/40 border border-white/10">
                  <Image src={product.images[0]} alt="" fill className="object-contain p-2" />
                </div>
                <Plus className="w-5 h-5 text-[#d4af37]" />
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-black/40 border border-white/10">
                  <Image src={relatedProducts[0].images[0]} alt="" fill className="object-contain p-2" />
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37]">
                  Curated Synergy Pair
                </span>
                <h4 className="text-sm font-semibold text-white mt-0.5">
                  {product.title} + {relatedProducts[0].title}
                </h4>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  Combined Total: <strong className="text-white">{formatPrice(bundleTotal, currency)}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                addItem(product, 1);
                addItem(relatedProducts[0], 1);
                sound.playSuccess();
              }}
              className="px-6 py-3 rounded-xl bg-[#d4af37] hover:bg-[#c5a059] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-lg shrink-0"
            >
              Acquire Complete Pair
            </button>
          </div>
        </div>
      )}

      {/* Related Atelier Creations */}
      <div className="mt-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37]">
              Harmonious Compositions
            </span>
            <h3 className="text-2xl font-serif font-bold text-white mt-1">
              You May Also Appreciate
            </h3>
          </div>
          <Link href="/shop" className="text-xs font-mono text-[#d4af37] hover:underline flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-panel bg-[#090a0f] rounded-3xl border border-white/20 p-6 shadow-2xl">
            <h4 className="text-base font-serif font-bold text-white mb-2">
              Submit Private Provenance Chronicle
            </h4>
            <p className="text-xs text-neutral-400 mb-4">
              Share your ownership experience with fellow patrons of {product.title}.
            </p>

            {reviewSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-mono text-center">
                Chronicle submitted successfully for curator verification.
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="text-[11px] font-mono text-neutral-400 block mb-1">
                    Patron Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="e.g. Lord Julian Vance"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-neutral-400 block mb-1">
                    Chronicle Impression
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="Describe the finishing, ergonomic weight, acoustic presence..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setReviewModalOpen(false)}
                    className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#d4af37] text-black font-mono text-xs font-bold uppercase"
                  >
                    Submit Chronicle
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
