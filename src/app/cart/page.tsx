"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowRight, Bookmark, Sparkles, ShieldCheck, Tag, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { usePreferencesStore } from "@/store/usePreferencesStore";
import { formatPrice } from "@/lib/utils";
import { sound } from "@/lib/sound";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const savedForLater = useCartStore((s) => s.savedForLater);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const saveForLater = useCartStore((s) => s.saveForLater);
  const moveToCartFromSaved = useCartStore((s) => s.moveToCartFromSaved);
  const removeSavedItem = useCartStore((s) => s.removeSavedItem);

  const appliedCoupon = useCartStore((s) => s.appliedCoupon);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);

  const shippingOption = useCartStore((s) => s.shippingOption);
  const setShippingOption = useCartStore((s) => s.setShippingOption);

  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getDiscountAmount = useCartStore((s) => s.getDiscountAmount);
  const getShippingCost = useCartStore((s) => s.getShippingCost);
  const getTaxAmount = useCartStore((s) => s.getTaxAmount);
  const getTotal = useCartStore((s) => s.getTotal);

  const currency = usePreferencesStore((s) => s.currency);

  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ text: string; success: boolean } | null>(null);

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingCost();
  const tax = getTaxAmount();
  const total = getTotal();

  const freeThreshold = 2000;
  const freeProgress = Math.min(100, (subtotal / freeThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponMsg({ text: res.message, success: res.success });
    if (res.success) {
      sound.playSuccess();
      setCouponCode("");
    } else {
      sound.playClick();
    }
  };

  return (
    <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37] flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Bag
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide">
            Your Atelier Acquisitions
          </h1>
        </div>
        <Link
          href="/shop"
          className="text-xs font-mono text-neutral-400 hover:text-[#d4af37] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Exploring Catalog</span>
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="py-24 text-center rounded-3xl glass-panel border border-white/10 p-8 max-w-xl mx-auto">
          <Sparkles className="w-12 h-12 text-[#d4af37] mx-auto mb-4 animate-spin" />
          <h2 className="text-2xl font-serif font-bold text-white mb-2">Your Bag is Empty</h2>
          <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
            Your curated collection currently holds no pieces. Discover our mechanical tourbillons, planar acoustics, and kinetic fashion.
          </p>
          <Link
            href="/shop"
            className="px-8 py-3.5 rounded-2xl bg-[#d4af37] text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-[#c5a059] transition-all inline-block shadow-lg"
          >
            Browse Masterpieces
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Items Table */}
          <div className="lg:col-span-8 space-y-6">
            {/* Free Shipping Alert Bar */}
            <div className="p-4 rounded-2xl glass-card border border-white/10">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-neutral-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
                  {subtotal >= freeThreshold ? (
                    <span className="text-emerald-400 font-bold">Complimentary Armored Courier Unlocked</span>
                  ) : (
                    <span>
                      Add <strong className="text-white">{formatPrice(freeThreshold - subtotal, currency)}</strong> to qualify for Armored Courier
                    </span>
                  )}
                </span>
                <span className="text-[#d4af37] font-bold">{Math.round(freeProgress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#d4af37] to-amber-200 rounded-full transition-all duration-500"
                  style={{ width: `${freeProgress}%` }}
                />
              </div>
            </div>

            {/* List */}
            <div className="space-y-4">
              {items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${idx}`}
                  className="p-5 rounded-3xl glass-card border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group hover:border-[#d4af37]/40 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.title}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#d4af37]">
                        {item.product.brand}
                      </span>
                      <Link href={`/product/${item.product.slug}`}>
                        <h3 className="text-sm font-semibold text-white hover:text-[#d4af37] transition-colors">
                          {item.product.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Finish: {item.selectedColor || "Standard"} {item.selectedSize && `• Spec: ${item.selectedSize}`}
                      </p>
                      <p className="text-xs font-mono font-bold text-white mt-2">
                        {formatPrice(item.product.price, currency)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                    {/* Stepper */}
                    <div className="flex items-center border border-white/10 rounded-xl overflow-hidden bg-white/5">
                      <button
                        onClick={() => {
                          updateQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize);
                          sound.playClick();
                        }}
                        className="px-3 py-1.5 text-xs text-neutral-300 hover:text-white"
                      >
                        -
                      </button>
                      <span className="px-3 py-1.5 text-xs font-mono text-white font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          updateQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize);
                          sound.playClick();
                        }}
                        className="px-3 py-1.5 text-xs text-neutral-300 hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm font-mono font-bold text-white min-w-[80px] text-right">
                      {formatPrice(item.product.price * item.quantity, currency)}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          saveForLater(item.product.id, item.selectedColor, item.selectedSize);
                          sound.playClick();
                        }}
                        className="p-2 text-neutral-400 hover:text-[#d4af37] transition-colors"
                        title="Save for later"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          removeItem(item.product.id, item.selectedColor, item.selectedSize);
                          sound.playClick();
                        }}
                        className="p-2 text-neutral-400 hover:text-red-400 transition-colors"
                        title="Remove piece"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Saved For Later */}
            {savedForLater.length > 0 && (
              <div className="pt-8 border-t border-white/10">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#d4af37] mb-4 flex items-center gap-2">
                  <Bookmark className="w-4 h-4" />
                  Saved For Subsequent Acquisition ({savedForLater.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedForLater.map((s) => (
                    <div
                      key={s.product.id}
                      className="p-4 rounded-2xl glass-panel border border-white/10 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black/40">
                          <Image src={s.product.images[0]} alt="" fill className="object-contain p-1" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white truncate max-w-[150px]">{s.product.title}</p>
                          <p className="text-[11px] font-mono text-[#d4af37]">
                            {formatPrice(s.product.price, currency)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          moveToCartFromSaved(s.product.id, s.selectedColor, s.selectedSize);
                          sound.playClick();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#d4af37] text-black font-mono text-[10px] font-bold"
                      >
                        Add to Bag
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 rounded-3xl glass-card border border-white/10 p-6 sm:p-8 space-y-6">
            <h2 className="text-base font-serif font-bold text-white tracking-wider uppercase">
              Financial Summary
            </h2>

            {/* Privilege Coupon Engine */}
            <div>
              {appliedCoupon ? (
                <div className="p-3 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#d4af37]" />
                    <span className="text-white font-bold">{appliedCoupon.code}</span>
                    <span className="text-[#d4af37]">({appliedCoupon.discountPercent}% Off)</span>
                  </div>
                  <button onClick={() => removeCoupon()} className="text-neutral-400 hover:text-white underline">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter privilege pass"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 font-mono uppercase outline-none focus:border-[#d4af37]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-[#d4af37] text-white hover:text-black font-mono text-xs transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponMsg && (
                <p className={`text-[11px] font-mono mt-1 ${couponMsg.success ? "text-emerald-400" : "text-red-400"}`}>
                  {couponMsg.text}
                </p>
              )}
            </div>

            {/* Shipping selection */}
            <div>
              <label className="text-xs font-mono tracking-wider uppercase text-neutral-400 block mb-2">
                Courier Protocol
              </label>
              <div className="space-y-2 text-xs font-mono">
                {[
                  { id: "complimentary", label: "Complimentary Insured Courier", price: subtotal > 1500 ? 0 : 25 },
                  { id: "express", label: "Priority Air Express (48h)", price: 45 },
                  { id: "courier", label: "Dedicated Armored Security Escort", price: 120 },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                      shippingOption === opt.id
                        ? "bg-white/10 border-[#d4af37] text-white"
                        : "border-white/5 bg-white/5 text-neutral-400 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="shippingOpt"
                        checked={shippingOption === opt.id}
                        onChange={() => setShippingOption(opt.id as any)}
                        className="accent-[#d4af37]"
                      />
                      <span>{opt.label}</span>
                    </div>
                    <span className="font-bold">
                      {opt.price === 0 ? "Free" : formatPrice(opt.price, currency)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs font-mono pt-4 border-t border-white/10">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span className="text-white">{formatPrice(subtotal, currency)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Courtesy Privilege</span>
                  <span>-{formatPrice(discount, currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-400">
                <span>Logistics & Courier</span>
                <span className="text-white">{shipping === 0 ? "Complimentary" : formatPrice(shipping, currency)}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Atelier Tax (8%)</span>
                <span className="text-white">{formatPrice(tax, currency)}</span>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between text-base font-bold">
                <span className="text-white">Order Total</span>
                <span className="text-[#d4af37] text-xl">{formatPrice(total, currency)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <Link
              href="/checkout"
              onClick={() => sound.playClick()}
              className="w-full py-4 px-6 rounded-2xl bg-[#d4af37] hover:bg-[#c5a059] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:scale-[1.02]"
            >
              <span>Proceed to Bespoke Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="text-center text-[10px] font-mono text-neutral-400 flex items-center justify-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Direct Bank Vault Escrow & SSL Encryption</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
