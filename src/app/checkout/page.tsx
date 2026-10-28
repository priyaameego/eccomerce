"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  ShieldCheck,
  Check,
  CreditCard,
  QrCode,
  Wallet,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Truck,
  IndianRupee,
  MapPin,
  Package,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore, UserOrder } from "@/store/useAuthStore";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "upi" | "card" | "netbanking">("cod");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<UserOrder | null>(null);

  // Address Form Fields (Indian E-commerce standard)
  const [formData, setFormData] = useState({
    fullName: "Priya Sharma",
    phone: "9876543210",
    houseNo: "Flat 402, Sunshine Apartments",
    street: "Sector 14, Near Metro Station",
    pincode: "110001",
    city: "New Delhi",
    state: "Delhi",
    upiId: "priyasharma@okhdfcbank",
  });

  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getDiscountAmount = useCartStore((s) => s.getDiscountAmount);
  const getTotal = useCartStore((s) => s.getTotal);

  const user = useAuthStore((s) => s.user);
  const addOrder = useAuthStore((s) => s.addOrder);

  // Auto-sync with logged in user details
  useEffect(() => {
    if (user) {
      const def = user.addresses?.find((a) => a.isDefault) || user.addresses?.[0];
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || prev.fullName,
        phone: user.phone ? user.phone.replace("+91 ", "").replace("+91", "").trim() : prev.phone,
        houseNo: def?.street || prev.houseNo,
        street: def?.apartment || prev.street,
        city: def?.city || prev.city,
        state: def?.state || prev.state,
        pincode: def?.postalCode || prev.pincode,
      }));
    }
  }, [user]);

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const total = getTotal();

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `VEL-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: UserOrder = {
        id: orderId,
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        status: "Processing",
        items: items.map((i) => ({
          product: i.product,
          quantity: i.quantity,
          selectedColor: i.selectedColor,
          selectedSize: i.selectedSize,
        })),
        subtotal,
        discount,
        shipping: 0,
        tax: 0,
        total,
        shippingAddress: {
          fullName: formData.fullName,
          street: `${formData.houseNo}, ${formData.street}`,
          city: formData.city,
          state: formData.state,
          postalCode: formData.pincode,
          country: "India",
        },
        paymentMethod:
          paymentMethod === "cod"
            ? "Cash On Delivery (COD)"
            : paymentMethod === "upi"
            ? `UPI (${formData.upiId})`
            : "Debit / Credit Card",
      };

      addOrder(newOrder);
      setOrderConfirmed(newOrder);
      clearCart();
      setIsProcessing(false);
      setStep(3);

      // Trigger Celebration Confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] pt-4 pb-20 px-3 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with Steps */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-800 mb-6">
          <Link href="/" className="text-2xl font-black velora-gradient-text">
            velora
          </Link>

          {/* Stepper Indicator */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span
              className={`flex items-center gap-1 ${
                step >= 1 ? "text-[#681a72] dark:text-[#c084fc]" : "text-gray-400"
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#681a72] text-white flex items-center justify-center text-[10px]">
                1
              </span>
              <span className="hidden sm:inline">Address</span>
            </span>
            <span className="w-6 sm:w-8 h-0.5 bg-gray-200" />
            <span
              className={`flex items-center gap-1 ${
                step >= 2 ? "text-[#681a72] dark:text-[#c084fc]" : "text-gray-400"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step >= 2 ? "bg-[#681a72] text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </span>
              <span className="hidden sm:inline">Payment</span>
            </span>
            <span className="w-6 sm:w-8 h-0.5 bg-gray-200" />
            <span
              className={`flex items-center gap-1 ${
                step === 3 ? "text-emerald-600" : "text-gray-400"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step === 3 ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                3
              </span>
              <span className="hidden sm:inline">Confirmation</span>
            </span>
          </div>
        </div>

        {/* STEP 1: DELIVERY ADDRESS */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
            <div className="md:col-span-8 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 shadow-xs">
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#681a72] dark:text-[#c084fc]" />
                Delivery Address
              </h2>

              <form onSubmit={handleAddressSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-xl outline-none focus:border-[#681a72] dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                      Phone Number (For delivery updates) *
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-xl outline-none focus:border-[#681a72] dark:bg-gray-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    House No. / Building Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.houseNo}
                    onChange={(e) => setFormData({ ...formData, houseNo: e.target.value })}
                    className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-xl outline-none focus:border-[#681a72] dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Street / Colony / Landmark *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-xl outline-none focus:border-[#681a72] dark:bg-gray-800"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-xl outline-none focus:border-[#681a72] dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-xl outline-none focus:border-[#681a72] dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-xl outline-none focus:border-[#681a72] dark:bg-gray-800"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-[#681a72] to-[#8b1874] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-4 hover:opacity-95"
                >
                  <span>Deliver to this Address</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Price Preview */}
            <div className="md:col-span-4 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
                Order Summary ({items.length} items)
              </h3>
              <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Product Total</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-between font-bold text-sm">
                <span>Total Amount</span>
                <span className="text-[#681a72] dark:text-[#c084fc]">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PAYMENT METHOD */}
        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
            <div className="md:col-span-8 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-[#681a72] dark:text-[#c084fc]" />
                  Select Payment Method
                </h2>
                <button onClick={() => setStep(1)} className="text-xs text-[#681a72] dark:text-[#c084fc] font-bold">
                  Edit Address
                </button>
              </div>

              {/* Payment Radio Options */}
              <div className="space-y-3">
                {/* 1. Cash on Delivery (Preferred in India) */}
                <label
                  className={`flex items-start gap-3 p-3.5 border rounded-xl cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-[#681a72] bg-purple-50/60 dark:bg-purple-950/30"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="payMethod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="accent-[#681a72] mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        Cash On Delivery (COD)
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-sm">
                        Most Popular
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Pay cash upon delivery. Zero advance payment needed.
                    </p>
                  </div>
                </label>

                {/* 2. UPI */}
                <label
                  className={`flex items-start gap-3 p-3.5 border rounded-xl cursor-pointer transition-all ${
                    paymentMethod === "upi"
                      ? "border-[#681a72] bg-purple-50/60 dark:bg-purple-950/30"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="payMethod"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                    className="accent-[#681a72] mt-0.5"
                  />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                      UPI (Google Pay, PhonePe, Paytm, BHIM)
                    </span>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Instant direct transfer from your bank.
                    </p>
                    {paymentMethod === "upi" && (
                      <div className="mt-2.5 max-w-xs">
                        <input
                          type="text"
                          value={formData.upiId}
                          onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                          placeholder="Enter UPI ID (e.g. mobile@upi)"
                          className="w-full text-xs p-2 border border-gray-300 rounded-xl dark:bg-gray-800"
                        />
                      </div>
                    )}
                  </div>
                </label>

                {/* 3. Debit / Credit Card */}
                <label
                  className={`flex items-start gap-3 p-3.5 border rounded-xl cursor-pointer transition-all ${
                    paymentMethod === "card"
                      ? "border-[#681a72] bg-purple-50/60 dark:bg-purple-950/30"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="payMethod"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="accent-[#681a72] mt-0.5"
                  />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                      Debit / Credit Card (Visa, MasterCard, RuPay)
                    </span>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Encrypted safe transaction.
                    </p>
                  </div>
                </label>
              </div>

              {/* Delivery Address summary box */}
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-xs space-y-1">
                <p className="font-bold text-gray-800 dark:text-gray-200">
                  Delivering to: {formData.fullName} ({formData.phone})
                </p>
                <p className="text-gray-500">
                  {formData.houseNo}, {formData.street}, {formData.city}, {formData.state} - {formData.pincode}
                </p>
              </div>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handlePlaceOrder}
                className="w-full py-3.5 bg-gradient-to-r from-[#681a72] to-[#8b1874] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 hover:opacity-95"
              >
                {isProcessing ? (
                  <span>Confirming Your Order...</span>
                ) : (
                  <>
                    <span>Place Order • {formatPrice(total)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Price Preview */}
            <div className="md:col-span-4 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
                Payment Breakdown
              </h3>
              <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Product Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Cost</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-between font-bold text-sm">
                <span>Total Amount</span>
                <span className="text-[#681a72] dark:text-[#c084fc] text-base">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: ORDER SUCCESSFUL CONFIRMATION */}
        {step === 3 && orderConfirmed && (
          <div className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-10 shadow-lg text-center max-w-xl mx-auto space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Order Placed Successfully!
              </span>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                Thank You for Shopping with Velora
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Order ID: <strong className="text-gray-900 dark:text-white font-mono">{orderConfirmed.id}</strong>
              </p>
            </div>

            {/* Tracking Steps */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-left space-y-3">
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                Estimated Delivery: 3-4 Business Days
              </p>
              <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium">
                <span className="text-[#681a72] dark:text-[#c084fc] font-bold">✓ Order Placed</span>
                <span className="text-gray-400">→ Packing</span>
                <span className="text-gray-400">→ Dispatched</span>
                <span className="text-gray-400">→ Delivered</span>
              </div>
            </div>

            <div className="p-4 border border-gray-100 dark:border-gray-800 rounded-2xl text-left text-xs space-y-1">
              <p className="font-bold text-gray-800 dark:text-gray-200">
                Shipping to: {orderConfirmed.shippingAddress.fullName}
              </p>
              <p className="text-gray-500">
                {orderConfirmed.shippingAddress.street}, {orderConfirmed.shippingAddress.city},{" "}
                {orderConfirmed.shippingAddress.state} - {orderConfirmed.shippingAddress.postalCode}
              </p>
              <p className="text-gray-500 pt-1">
                Payment: <strong className="text-gray-800 dark:text-gray-200">{orderConfirmed.paymentMethod}</strong>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/account"
                className="flex-1 py-3 bg-gradient-to-r from-[#681a72] to-[#8b1874] text-white font-bold text-xs rounded-xl shadow-md transition-all text-center"
              >
                Track My Order
              </Link>
              <Link
                href="/"
                className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-800 dark:text-gray-200 font-bold text-xs rounded-xl transition-all text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
