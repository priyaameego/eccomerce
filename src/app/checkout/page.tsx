"use client";

import React, { useState } from "react";
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
  Printer,
  FileText,
  Clock,
  Truck,
  Building,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore, UserOrder } from "@/store/useAuthStore";
import { usePreferencesStore } from "@/store/usePreferencesStore";
import { formatPrice } from "@/lib/utils";
import { sound } from "@/lib/sound";

export default function CheckoutPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "razorpay" | "wallet" | "applepay">("stripe");
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<UserOrder | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: "Lord Julian Vance",
    email: "julian.v@aurelia-atelier.luxury",
    phone: "+1 (555) 892-0192",
    street: "432 Park Avenue, Penthouse 88",
    apartment: "Tower Suite A",
    city: "New York",
    state: "NY",
    postalCode: "10022",
    country: "United States",
    deliveryNotes: "Deliver directly to penthouse concierge with prior security clearance.",
    cardNumber: "•••• •••• •••• 9012",
    cardExp: "08/29",
    cardCvc: "842",
    upiId: "julianvance@okaxis",
  });

  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const shippingOption = useCartStore((s) => s.shippingOption);
  const setShippingOption = useCartStore((s) => s.setShippingOption);

  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getDiscountAmount = useCartStore((s) => s.getDiscountAmount);
  const getShippingCost = useCartStore((s) => s.getShippingCost);
  const getTaxAmount = useCartStore((s) => s.getTaxAmount);
  const getTotal = useCartStore((s) => s.getTotal);

  const user = useAuthStore((s) => s.user);
  const addOrder = useAuthStore((s) => s.addOrder);
  const currency = usePreferencesStore((s) => s.currency);

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingCost();
  const tax = getTaxAmount();
  const total = getTotal();

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    sound.playClick();

    setTimeout(() => {
      setIsProcessing(false);
      const newOrderNum = `AUR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const orderData: UserOrder = {
        id: `ord-${Date.now()}`,
        orderNumber: newOrderNum,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        total: total,
        status: "In Production",
        trackingCode: `MALCA-AMIT-SECURE-${Math.floor(100000 + Math.random() * 900000)}`,
        items: items.map((i) => ({
          title: i.product.title,
          image: i.product.images[0],
          quantity: i.quantity,
          price: i.product.price,
        })),
      };

      addOrder(orderData);
      setCompletedOrder(orderData);
      clearCart();
      setStep(4);
      sound.playSuccess();

      // Confetti burst
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#d4af37", "#f5e7b2", "#ffffff", "#38bdf8"],
        });
      } catch {
        // Safe fail
      }
    }, 2000);
  };

  // Completed Order View
  if (step === 4 && completedOrder) {
    return (
      <div className="pt-28 pb-24 px-6 max-w-4xl mx-auto min-h-screen">
        <div className="rounded-3xl glass-card border border-[#d4af37]/40 p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Check className="w-10 h-10" />
          </div>

          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#d4af37] block mb-2">
            Acquisition Confirmed & Numbered
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-wide">
            Your Order Has Been Secured
          </h1>
          <p className="text-sm text-neutral-300 mt-3 max-w-lg mx-auto font-light">
            Thank you, {formData.fullName}. Your masterworks have entered our Geneva atelier queue. Our master watchmakers and acoustic engineers will prepare your personalized certificate.
          </p>

          {/* Telemetry Tracking Capsule */}
          <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 text-left max-w-2xl mx-auto space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 text-xs font-mono">
              <div>
                <span className="text-neutral-400">Order Allocation:</span>
                <span className="text-white font-bold ml-2">{completedOrder.orderNumber}</span>
              </div>
              <div>
                <span className="text-neutral-400">Armored Tracking:</span>
                <span className="text-[#d4af37] font-bold ml-2">{completedOrder.trackingCode}</span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-3">
                Logistical Milestones
              </p>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Check className="w-3.5 h-3.5 mx-auto mb-1" />
                  Order Placed
                </div>
                <div className="p-2 rounded-xl bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40 font-bold">
                  <Clock className="w-3.5 h-3.5 mx-auto mb-1 animate-spin" />
                  Atelier Production
                </div>
                <div className="p-2 rounded-xl bg-white/5 text-neutral-500 border border-white/5">
                  <Truck className="w-3.5 h-3.5 mx-auto mb-1" />
                  Armored Courier
                </div>
                <div className="p-2 rounded-xl bg-white/5 text-neutral-500 border border-white/5">
                  <Building className="w-3.5 h-3.5 mx-auto mb-1" />
                  Delivered
                </div>
              </div>
            </div>

            {/* Items summary */}
            <div className="pt-2">
              <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Allocated Creations
              </p>
              <div className="space-y-2">
                {completedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="text-white">
                      {it.quantity}x {it.title}
                    </span>
                    <span className="font-mono text-neutral-300">
                      {formatPrice(it.price * it.quantity, currency)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 rounded-xl glass-panel border border-white/20 hover:border-[#d4af37] text-white font-mono text-xs tracking-wider flex items-center gap-2"
            >
              <Printer className="w-4 h-4 text-[#d4af37]" />
              <span>Print Official Invoice</span>
            </button>

            <Link
              href="/account"
              className="px-8 py-3 rounded-xl bg-[#d4af37] hover:bg-[#c5a059] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
            >
              View in Client Lounge
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      {/* Top Header & Step Indicator */}
      <div className="mb-10 pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37] flex items-center gap-2 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Bespoke Escrow Acquisition
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide">
            Checkout & Allocation
          </h1>
        </div>

        {/* Stepper Pills */}
        <div className="flex items-center gap-2 text-xs font-mono">
          {[
            { num: 1, label: "Address" },
            { num: 2, label: "Courier" },
            { num: 3, label: "Payment" },
          ].map((st) => (
            <div
              key={st.num}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${
                step === st.num
                  ? "bg-[#d4af37] text-black font-bold border-[#d4af37]"
                  : step > st.num
                  ? "bg-white/10 text-emerald-400 border-emerald-500/30"
                  : "bg-white/5 text-neutral-500 border-white/5"
              }`}
            >
              <span>0{st.num}</span>
              <span>{st.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form Column (Steps 1, 2, 3) */}
        <div className="lg:col-span-8 rounded-3xl glass-card border border-white/10 p-6 sm:p-10 space-y-8">
          {/* STEP 1: Address & Patron Info */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="text-lg font-serif font-bold text-white">Patron Delivery Credentials</h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Confirm recipient details for insured delivery and customs documentation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-neutral-400 block mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-neutral-400 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-neutral-400 block mb-1">Private Contact Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-neutral-400 block mb-1">Country / Territory</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-mono text-neutral-400 block mb-1">Street Address / Estate</label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-neutral-400 block mb-1">Penthouse / Suite (Optional)</label>
                  <input
                    type="text"
                    value={formData.apartment}
                    onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-neutral-400 block mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-neutral-400 block mb-1">Postal / ZIP Code</label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-neutral-400 block mb-1">State / Province</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-mono text-neutral-400 block mb-1">Security & Gate Instructions</label>
                  <input
                    type="text"
                    value={formData.deliveryNotes}
                    onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setStep(2);
                    sound.playClick();
                  }}
                  className="px-8 py-3.5 rounded-2xl bg-[#d4af37] text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#c5a059] transition-all"
                >
                  <span>Proceed to Courier Protocol</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Courier Protocol */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="text-lg font-serif font-bold text-white">Select Armored Logistics Protocol</h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  All shipments are secured with biometric container locks and global satellite telemetry.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: "complimentary",
                    name: "Complimentary Insured Courier",
                    desc: "Full value transit insurance with scheduled private signature receipt. (3-5 business days)",
                    cost: subtotal > 1500 ? 0 : 25,
                  },
                  {
                    id: "express",
                    name: "Priority Air Express (48 Hours)",
                    desc: "Dedicated temperature-controlled air courier via chartered priority lanes.",
                    cost: 45,
                  },
                  {
                    id: "courier",
                    name: "Dedicated Armored Security Escort",
                    desc: "Malca-Amit dual-officer armored vehicle with private vault delivery and handoff.",
                    cost: 120,
                  },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`p-5 rounded-2xl border flex items-start justify-between cursor-pointer transition-all ${
                      shippingOption === opt.id
                        ? "glass-panel border-[#d4af37] bg-white/10 shadow-lg"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="ship"
                        checked={shippingOption === opt.id}
                        onChange={() => setShippingOption(opt.id as any)}
                        className="accent-[#d4af37] mt-1"
                      />
                      <div>
                        <h4 className="text-sm font-semibold text-white">{opt.name}</h4>
                        <p className="text-xs text-neutral-400 mt-1 max-w-lg">{opt.desc}</p>
                      </div>
                    </div>
                    <span className="font-mono text-sm font-bold text-white ml-4">
                      {opt.cost === 0 ? "Complimentary" : formatPrice(opt.cost, currency)}
                    </span>
                  </label>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    sound.playClick();
                  }}
                  className="px-6 py-3 rounded-xl border border-white/10 text-neutral-400 hover:text-white text-xs font-mono flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Address</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep(3);
                    sound.playClick();
                  }}
                  className="px-8 py-3.5 rounded-2xl bg-[#d4af37] text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#c5a059] transition-all"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Encrypted Payment */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="text-lg font-serif font-bold text-white">Payment Method & Escrow</h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  256-bit AES encryption with instant tokenization. Funds held in Swiss vault escrow until delivery inspection.
                </p>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: "stripe", label: "Credit Card (Stripe)", icon: CreditCard },
                  { id: "razorpay", label: "UPI / NetBanking", icon: QrCode },
                  { id: "wallet", label: `VIP Wallet ($${user?.walletBalance.toFixed(0)})`, icon: Wallet },
                  { id: "applepay", label: "Apple Pay / Wire", icon: Sparkles },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setPaymentMethod(m.id as any);
                        sound.playClick();
                      }}
                      className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                        paymentMethod === m.id
                          ? "bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37] font-semibold"
                          : "border-white/10 bg-white/5 text-neutral-400 hover:text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-[11px] font-mono leading-tight">{m.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Stripe Card Input Form */}
              {paymentMethod === "stripe" && (
                <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pb-2 border-b border-white/10">
                    <span className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#d4af37]" />
                      Stripe Encrypted Vault Gateway
                    </span>
                    <span className="text-emerald-400">TLS 1.3 Active</span>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-neutral-400 block mb-1">Card Number</label>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      placeholder="4242 •••• •••• 4242"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-mono outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-neutral-400 block mb-1">Expiration (MM/YY)</label>
                      <input
                        type="text"
                        value={formData.cardExp}
                        onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                        placeholder="MM/YY"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-mono outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-neutral-400 block mb-1">CVC / CVV</label>
                      <input
                        type="password"
                        value={formData.cardCvc}
                        onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                        placeholder="•••"
                        maxLength={4}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-mono outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Razorpay UPI Form */}
              {paymentMethod === "razorpay" && (
                <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pb-2 border-b border-white/10">
                    <span className="flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-emerald-400" />
                      Razorpay Seamless UPI & QR Gateway
                    </span>
                    <span className="text-emerald-400">Zero Convenience Fee</span>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-neutral-400 block mb-1">UPI VPA / ID</label>
                    <input
                      type="text"
                      value={formData.upiId}
                      onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                      placeholder="username@okhdfcbank"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-mono outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    A notification will be dispatched to your UPI app for instantaneous 1-tap authorization.
                  </p>
                </div>
              )}

              {/* VIP Wallet Credits Form */}
              {paymentMethod === "wallet" && (
                <div className="p-6 rounded-2xl glass-panel border border-[#d4af37]/40 space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">
                    Obsidian VIP Courtesy Vault
                  </span>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-white">Private Store Balance</h4>
                      <p className="text-xs text-neutral-400 mt-0.5">Complimentary client balance available</p>
                    </div>
                    <span className="text-2xl font-mono font-bold text-[#d4af37]">
                      {formatPrice(user?.walletBalance || 2450, currency)}
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-400 font-mono">
                    ✓ Balance will be deducted automatically with priority clearance.
                  </p>
                </div>
              )}

              {/* Apple Pay Form */}
              {paymentMethod === "applepay" && (
                <div className="p-6 rounded-2xl glass-panel border border-white/10 text-center space-y-3">
                  <Sparkles className="w-8 h-8 text-[#d4af37] mx-auto" />
                  <h4 className="text-sm font-semibold text-white">Apple Pay & SWIFT Wire Transfer</h4>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto">
                    Clicking Confirm Acquisition will trigger Apple Touch ID biometric authorization or generate official Swiss IBAN wire instructions.
                  </p>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setStep(2);
                    sound.playClick();
                  }}
                  className="px-6 py-3 rounded-xl border border-white/10 text-neutral-400 hover:text-white text-xs font-mono flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Courier</span>
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handlePlaceOrder}
                  className="px-8 py-4 rounded-2xl bg-[#d4af37] text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#c5a059] transition-all shadow-[0_0_25px_rgba(212,175,55,0.4)] disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Allocating Masterpiece in Vault...</span>
                  ) : (
                    <>
                      <span>Authorize Acquisition ({formatPrice(total, currency)})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sticky Order Summary */}
        <div className="lg:col-span-4 rounded-3xl glass-card border border-white/10 p-6 sm:p-8 space-y-6">
          <h3 className="text-sm font-serif font-bold text-white tracking-widest uppercase">
            Acquisition Ledger ({items.length})
          </h3>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {items.map((it, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-black/40">
                    <Image src={it.product.images[0]} alt="" fill className="object-contain p-1" />
                  </div>
                  <div>
                    <p className="font-semibold text-white truncate max-w-[130px]">{it.product.title}</p>
                    <p className="text-[10px] text-neutral-400">Qty: {it.quantity}</p>
                  </div>
                </div>
                <span className="font-mono text-neutral-300">
                  {formatPrice(it.product.price * it.quantity, currency)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs font-mono pt-3 border-t border-white/10">
            <div className="flex justify-between text-neutral-400">
              <span>Subtotal</span>
              <span className="text-white">{formatPrice(subtotal, currency)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Privilege Discount</span>
                <span>-{formatPrice(discount, currency)}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-400">
              <span>Armored Courier</span>
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

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-[11px] font-mono text-neutral-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span>5-Year Global Guarantee & Certificate Included</span>
          </div>
        </div>
      </div>
    </div>
  );
}
