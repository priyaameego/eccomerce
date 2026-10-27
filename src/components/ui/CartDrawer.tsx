"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ArrowRight, ShieldCheck, Tag, Bookmark, Check, Sparkles } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { usePreferencesStore } from "@/store/usePreferencesStore";
import { formatPrice } from "@/lib/utils";
import { sound } from "@/lib/sound";

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
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

  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [couponMessage, setCouponMessage] = useState<{ text: string; success: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingCost();
  const tax = getTaxAmount();
  const total = getTotal();

  const freeShippingThreshold = 2000;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const res = applyCoupon(couponCodeInput);
    setCouponMessage({ text: res.message, success: res.success });
    if (res.success) {
      sound.playSuccess();
      setCouponCodeInput("");
    } else {
      sound.playClick();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg h-full glass-panel bg-[#090a0f]/98 border-l border-white/10 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-serif font-bold uppercase tracking-[0.2em] text-white">
              Curated Atelier Bag
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40">
              {items.length} {items.length === 1 ? "Creation" : "Creations"}
            </span>
          </div>

          <button
            onClick={() => {
              closeCart();
              sound.playClick();
            }}
            className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Complimentary Courier Progress Bar */}
        <div className="px-5 py-3 bg-white/5 border-b border-white/10">
          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
            <span className="text-neutral-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              {subtotal >= freeShippingThreshold ? (
                <span className="text-emerald-400 font-semibold">Complimentary Armored Courier Unlocked</span>
              ) : (
                <span>
                  Add <strong className="text-white">{formatPrice(freeShippingThreshold - subtotal, currency)}</strong> for Armored Courier
                </span>
              )}
            </span>
            <span className="text-[#d4af37]">{Math.round(freeShippingProgress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#d4af37] to-amber-200 rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3 text-neutral-500">
                <Sparkles className="w-6 h-6 text-[#d4af37]" />
              </div>
              <h4 className="text-base font-serif text-white">Your Atelier Bag is Empty</h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                Explore our catalog of hand-crafted tourbillons, planar acoustics, and kinetic innovations.
              </p>
              <Link
                href="/shop"
                onClick={() => {
                  closeCart();
                  sound.playClick();
                }}
                className="mt-4 px-5 py-2.5 rounded-xl bg-[#d4af37] text-black text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#c5a059] transition-all"
              >
                Browse Masterpieces
              </Link>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`}
                className="p-3.5 rounded-2xl glass-card border border-white/10 flex gap-4 items-center group"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.title}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#d4af37]">
                    {item.product.brand}
                  </span>
                  <h4 className="text-xs font-semibold text-white truncate">{item.product.title}</h4>

                  {/* Options */}
                  <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-mono mt-0.5">
                    {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                    {item.selectedSize && <span>• Size: {item.selectedSize}</span>}
                  </div>

                  <div className="flex items-center justify-between mt-2.5">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-white/10 rounded-lg overflow-hidden bg-white/5">
                      <button
                        onClick={() => {
                          updateQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize);
                          sound.playClick();
                        }}
                        className="px-2 py-0.5 text-xs text-neutral-300 hover:text-white"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs font-mono text-white font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          updateQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize);
                          sound.playClick();
                        }}
                        className="px-2 py-0.5 text-xs text-neutral-300 hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-mono font-bold text-white">
                      {formatPrice(item.product.price * item.quantity, currency)}
                    </span>
                  </div>

                  {/* Actions: Save for later & Remove */}
                  <div className="flex items-center gap-3 mt-2 text-[10px] font-mono text-neutral-400">
                    <button
                      onClick={() => {
                        saveForLater(item.product.id, item.selectedColor, item.selectedSize);
                        sound.playClick();
                      }}
                      className="hover:text-[#d4af37] flex items-center gap-1 transition-colors"
                    >
                      <Bookmark className="w-3 h-3" />
                      Save For Later
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => {
                        removeItem(item.product.id, item.selectedColor, item.selectedSize);
                        sound.playClick();
                      }}
                      className="hover:text-red-400 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Saved For Later Accordion/List */}
          {savedForLater.length > 0 && (
            <div className="pt-4 border-t border-white/10">
              <h5 className="text-xs font-mono tracking-widest uppercase text-neutral-400 mb-3 flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-[#d4af37]" />
                Saved For Later ({savedForLater.length})
              </h5>
              <div className="space-y-2.5">
                {savedForLater.map((sItem) => (
                  <div
                    key={sItem.product.id}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-black/40">
                        <Image src={sItem.product.images[0]} alt="" fill className="object-contain p-1" />
                      </div>
                      <div>
                        <p className="font-medium text-white truncate max-w-[140px]">{sItem.product.title}</p>
                        <p className="text-[10px] font-mono text-[#d4af37]">
                          {formatPrice(sItem.product.price, currency)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          moveToCartFromSaved(sItem.product.id, sItem.selectedColor, sItem.selectedSize);
                          sound.playClick();
                        }}
                        className="px-2.5 py-1 rounded bg-[#d4af37] text-black text-[10px] font-mono font-bold"
                      >
                        Move to Bag
                      </button>
                      <button
                        onClick={() => {
                          removeSavedItem(sItem.product.id);
                          sound.playClick();
                        }}
                        className="text-neutral-500 hover:text-red-400 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Calculation & Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-black/60 backdrop-blur-md space-y-4">
            {/* Coupon Code Engine */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span className="font-mono text-white font-bold">{appliedCoupon.code}</span>
                    <span className="text-[11px] text-[#d4af37]">({appliedCoupon.discountPercent}% Off)</span>
                  </div>
                  <button
                    onClick={() => {
                      removeCoupon();
                      sound.playClick();
                    }}
                    className="text-neutral-400 hover:text-white text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    placeholder="Enter privilege pass / code (e.g. VIP20)"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 uppercase font-mono focus:border-[#d4af37] outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-[#d4af37] text-white hover:text-black font-mono text-xs transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponMessage && (
                <p className={`text-[11px] mt-1.5 font-mono ${couponMessage.success ? "text-emerald-400" : "text-red-400"}`}>
                  {couponMessage.text}
                </p>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span className="text-white">{formatPrice(subtotal, currency)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Courtesy Discount</span>
                  <span>-{formatPrice(discount, currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-400">
                <span>Armored Courier</span>
                <span className="text-white">
                  {shipping === 0 ? "Complimentary" : formatPrice(shipping, currency)}
                </span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Estimated Atelier Tax (8%)</span>
                <span className="text-white">{formatPrice(tax, currency)}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold">
                <span className="text-white">Estimated Order Total</span>
                <span className="text-[#d4af37] text-base">{formatPrice(total, currency)}</span>
              </div>
            </div>

            {/* Direct Checkout CTA */}
            <Link
              href="/checkout"
              onClick={() => {
                closeCart();
                sound.playClick();
              }}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#d4af37] hover:bg-[#c5a059] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:scale-[1.01]"
            >
              <span>Proceed to Bespoke Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-neutral-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Encrypted via 256-bit TLS • Stripe & Razorpay Verified</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
