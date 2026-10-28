"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ArrowRight, ShieldCheck, Tag, Sparkles, Truck, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const appliedCoupon = useCartStore((s) => s.appliedCoupon);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);

  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getDiscountAmount = useCartStore((s) => s.getDiscountAmount);
  const getTotal = useCartStore((s) => s.getTotal);

  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [couponMessage, setCouponMessage] = useState<{ text: string; success: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const total = getTotal();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const res = applyCoupon(couponCodeInput);
    setCouponMessage({ text: res.message, success: res.success });
    if (res.success) {
      setCouponCodeInput("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#1e293b] shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-purple-50/70 dark:bg-purple-950/30">
            <div className="flex items-center gap-2">
              <span className="font-black text-xl velora-gradient-text">
                velora
              </span>
              <span className="text-xs text-gray-500">• Cart ({items.length} items)</span>
            </div>
            <button
              onClick={closeCart}
              className="p-1 rounded-full text-gray-400 hover:text-black dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Callout */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 px-4 py-2 text-xs text-emerald-800 dark:text-emerald-300 font-semibold flex items-center gap-2 border-b border-emerald-100 dark:border-emerald-900/30">
            <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Yay! Free Delivery automatically applied to your order</span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-purple-50 text-[#681a72] flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8" />
                </div>
                <p className="font-bold text-sm text-gray-800 dark:text-gray-200">Your cart is empty</p>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Explore thousands of authentic fashion & home essentials at wholesale prices!
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 bg-[#681a72] text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800"
                >
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700 bg-white">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 line-clamp-1">
                        {item.product.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {item.selectedSize && `Size: ${item.selectedSize}`}
                        {item.selectedColor && ` • ${item.selectedColor}`}
                      </p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {formatPrice(item.product.price)}
                        </span>
                        {item.product.originalPrice && (
                          <span className="text-[10px] text-gray-400 line-through">
                            {formatPrice(item.product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden bg-white dark:bg-gray-800">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedColor,
                              item.selectedSize
                            )
                          }
                          className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedColor,
                              item.selectedSize
                            )
                          }
                          className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() =>
                          removeItem(item.product.id, item.selectedColor, item.selectedSize)
                        }
                        className="text-gray-400 hover:text-red-500 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Order Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1e293b] space-y-3">
              {/* Coupon Row */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCodeInput}
                  onChange={(e) => setCouponCodeInput(e.target.value)}
                  placeholder="Enter coupon (e.g. VELORA100)"
                  className="flex-1 text-xs px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-xl outline-none uppercase dark:bg-gray-800"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-black"
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 p-2 rounded-lg">
                  <span>Coupon {appliedCoupon.code} applied (-{appliedCoupon.discountPercent}%)</span>
                  <button onClick={removeCoupon} className="text-red-500 text-[10px] font-bold">
                    Remove
                  </button>
                </div>
              )}
              {couponMessage && !appliedCoupon && (
                <p className={`text-xs ${couponMessage.success ? "text-emerald-600" : "text-red-500"}`}>
                  {couponMessage.text}
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400 pt-1">
                <div className="flex justify-between">
                  <span>Product Total</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span>Total Amount</span>
                  <span className="text-[#681a72] dark:text-[#c084fc] text-base">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Proceed CTA */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-3 bg-gradient-to-r from-[#681a72] to-[#8b1874] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-opacity"
              >
                <span>Continue to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Safe and Secure Payments • 100% Authentic Products</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
