"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Store,
  ShieldCheck,
  TrendingUp,
  Truck,
  IndianRupee,
  Users,
  CheckCircle2,
  ArrowRight,
  Package,
  Sparkles,
  Building,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { usePreferencesStore } from "@/store/usePreferencesStore";

export default function SellerPartnerPage() {
  const loginAsSeller = useAuthStore((s) => s.loginAsSeller);
  const setAuthModalOpen = usePreferencesStore((s) => s.setAuthModalOpen);

  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Surat");
  const [category, setCategory] = useState("Women Ethnic & Sarees");
  const [gstin, setGstin] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !phone) return;
    setSubmitted(true);
    loginAsSeller(businessName);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-purple-50 dark:bg-purple-950/40 text-[#681a72] dark:text-[#c084fc] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-purple-200 dark:border-purple-800">
            <Store className="w-4 h-4" />
            <span>0% Commission Partner Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
            Grow Your Brand with <span className="text-[#681a72] dark:text-[#c084fc]">Velora Luxury</span> Partner Network
          </h1>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Sell directly to fashion-conscious verified buyers across India without middleman deductions. Enjoy daily orders, weekly payouts, and Pan-India courier pickup from your mill or atelier.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={() => {
                const el = document.getElementById("partner-form");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto px-7 py-3.5 bg-gray-950 hover:bg-black text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer text-center"
            >
              Become a Partner Today
            </button>

            <button
              onClick={() => setAuthModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-black text-gray-800 dark:text-gray-200 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer text-center"
            >
              Already a Seller? Log In
            </button>
          </div>
        </div>

        {/* 4 Seller Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-[#131926] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-[#681a72] dark:text-[#c084fc] flex items-center justify-center font-black">
              0%
            </div>
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">0% Commission</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Retain 100% of your listed profit with zero commission or hidden listing deductions.
            </p>
          </div>

          <div className="bg-white dark:bg-[#131926] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">Doorstep Pickup</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Verified courier partners collect packed orders from your mill, warehouse, or store daily.
            </p>
          </div>

          <div className="bg-white dark:bg-[#131926] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">Weekly Payouts</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Timely direct bank account transfers every 7 days without delay or settlement disputes.
            </p>
          </div>

          <div className="bg-white dark:bg-[#131926] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">Pan-India Reach</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Access 500,000+ verified active shoppers across 28,000+ serviceable pin codes.
            </p>
          </div>
        </div>

        {/* Partner Registration Form */}
        <div id="partner-form" className="bg-white dark:bg-[#131926] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl p-6 sm:p-10">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                Application Submitted Successfully!
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Welcome to Velora Partner Network, <strong>{businessName}</strong>! Your account has been approved. You can now access your seller dashboard to list products.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <Link
                  href="/admin"
                  className="px-8 py-3.5 bg-gray-950 hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-transform active:scale-95"
                >
                  Go to Seller Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                  Register as a Partner / Supplier
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Fill in your basic store details to get approved within 15 minutes
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                      Business / Store Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Surat Jacquard Silk Mills"
                      className="w-full bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                      Owner / Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="e.g. Rajesh Singhal"
                      className="w-full bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                      Mobile Number (WhatsApp Enabled) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="partner@yourbusiness.com"
                      className="w-full bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                      City / Hub *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-gray-900"
                    >
                      <option value="Surat">Surat (Textiles & Sarees)</option>
                      <option value="Jaipur">Jaipur (Kurtis & Jewellery)</option>
                      <option value="Tirupur">Tirupur (Knits & Cotton)</option>
                      <option value="Panipat">Panipat (Home & Glace Cotton)</option>
                      <option value="Mumbai">Mumbai (Western Fast Fashion)</option>
                      <option value="Delhi">Delhi / NCR Hub</option>
                      <option value="Agra">Agra (Footwear & Leather)</option>
                      <option value="Other">Other City</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                      Primary Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-gray-900"
                    >
                      <option value="Women Ethnic & Sarees">Women Ethnic & Sarees</option>
                      <option value="Men Streetwear & Casuals">Men Streetwear & Casuals</option>
                      <option value="Women Western Wear">Women Western Wear</option>
                      <option value="Jewellery & Accessories">Jewellery & Accessories</option>
                      <option value="Home & Kitchen Decor">Home & Kitchen Decor</option>
                      <option value="Footwear & Shoes">Footwear & Shoes</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                      GSTIN Number (Optional for registration, required for billing)
                    </label>
                    <input
                      type="text"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value.toUpperCase())}
                      placeholder="e.g. 24ABCDE1234F1Z5"
                      className="w-full bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-gray-900"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-10 py-3.5 bg-gray-950 hover:bg-black text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Submit & Start Selling</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
