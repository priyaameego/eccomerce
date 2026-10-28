"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowRight, ShieldCheck, Tag, ArrowLeft, Truck, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const appliedCoupon = useCartStore((s) => s.appliedCoupon);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);

  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getDiscountAmount = useCartStore((s) => s.getDiscountAmount);
  const getTotal = useCartStore((s) => s.getTotal);

  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ text: string; success: boolean } | null>(null);

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const total = getTotal();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponMsg({ text: res.message, success: res.success });
    if (res.success) {
      setCouponCode("");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] pt-4 sm:pt-6 pb-24 sm:pb-20 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Breadcrumbs */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-800 mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xs text-gray-500 hover:text-[#681a72] flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
          <span className="text-xs text-gray-400 font-medium">Cart • {items.length} Items</span>
        </div>

        {items.length === 0 ? (
          <div className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 rounded-2xl p-12 sm:p-16 text-center max-w-lg mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-purple-50 text-[#681a72] flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Your Cart is Empty</h2>
            <p className="text-xs text-gray-500 mb-6">
              Discover authentic fashion, footwear & home textiles at wholesale factory prices!
            </p>
            <Link
              href="/shop"
              className="px-6 py-3 bg-gradient-to-r from-[#681a72] to-[#8b1874] text-white font-bold text-xs rounded-xl shadow-md transition-all inline-block"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left: Cart Items List */}
            <div className="lg:col-span-8 space-y-3 sm:space-y-4">
              {/* Free delivery banner */}
              <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 rounded-xl p-3 sm:p-3.5 flex items-center gap-3 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
                <Truck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Free Pan-India Delivery unlocked! No extra shipping fees.</span>
              </div>

              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-col sm:flex-row gap-3 sm:gap-4"
                >
                  <div className="relative w-20 h-26 sm:w-24 sm:h-32 rounded-xl overflow-hidden shrink-0 border border-gray-100 dark:border-gray-700 bg-gray-50">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white hover:text-[#681a72] transition-colors line-clamp-2"
                        >
                          {item.product.title}
                        </Link>
                        <button
                          onClick={() =>
                            removeItem(item.product.id, item.selectedColor, item.selectedSize)
                          }
                          className="text-gray-400 hover:text-red-500 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-500 mt-1 flex-wrap">
                        {item.selectedSize && <span>Size: <strong className="text-gray-700 dark:text-gray-300">{item.selectedSize}</strong></span>}
                        {item.selectedColor && <span>• Color: <strong className="text-gray-700 dark:text-gray-300">{item.selectedColor}</strong></span>}
                      </div>

                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-base font-bold text-gray-900 dark:text-white">
                          {formatPrice(item.product.price)}
                        </span>
                        {item.product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            {formatPrice(item.product.originalPrice)}
                          </span>
                        )}
                        {item.product.discountBadge && (
                          <span className="text-xs font-semibold text-emerald-600">
                            {item.product.discountBadge}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800 mt-2">
                      <span className="text-[11px] text-emerald-600 font-semibold">Free Delivery • 7 Days Return</span>

                      {/* Quantity buttons */}
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
                          className="px-2.5 py-1 hover:bg-gray-100 text-xs text-gray-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedColor,
                              item.selectedSize
                            )
                          }
                          className="px-2.5 py-1 hover:bg-gray-100 text-xs text-gray-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Order Price Details */}
            <div className="lg:col-span-4 space-y-4">
              {/* Coupon Box */}
              <div className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-[#681a72]" />
                  Coupons & Offers
                </p>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon (e.g. VELORA100)"
                    className="flex-1 text-xs px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl outline-none uppercase dark:bg-gray-800"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-black"
                  >
                    Apply
                  </button>
                </form>

                {appliedCoupon && (
                  <div className="mt-2 text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg flex items-center justify-between">
                    <span>{appliedCoupon.code} applied (-{appliedCoupon.discountPercent}%)</span>
                    <button onClick={removeCoupon} className="text-red-500 font-bold text-[10px]">
                      Remove
                    </button>
                  </div>
                )}
                {couponMsg && !appliedCoupon && (
                  <p className={`text-xs mt-1.5 ${couponMsg.success ? "text-emerald-600" : "text-red-500"}`}>
                    {couponMsg.text}
                  </p>
                )}
              </div>

              {/* Price Details */}
              <div className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
                  Price Details ({items.length} items)
                </h3>

                <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Total Product Price</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Total Discounts</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className="text-emerald-600 font-bold">FREE</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-baseline text-sm font-bold text-gray-900 dark:text-white">
                  <span>Order Total</span>
                  <span className="text-[#681a72] dark:text-[#c084fc] text-lg font-black">{formatPrice(total)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-3.5 bg-gradient-to-r from-[#681a72] to-[#8b1874] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-opacity mt-4"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 pt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Safe and Secure Payments • 100% Authentic</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
