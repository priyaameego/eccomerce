"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ShieldCheck, Sparkles, Search, Truck, RotateCcw, IndianRupee } from "lucide-react";

const VELORA_FAQS = [
  {
    category: "Orders & Delivery",
    items: [
      {
        q: "Are all deliveries on Velora completely free?",
        a: "Yes! Velora provides 100% Free Delivery on millions of products across all pin codes in India without any minimum cart value requirement.",
      },
      {
        q: "How long does delivery take?",
        a: "Orders are usually delivered within 3 to 5 business days depending on your location. You will receive real-time SMS updates with live tracking links once your package is dispatched.",
      },
      {
        q: "How can I track my order?",
        a: "Go to your 'Profile' → 'My Orders' and select your order to view the real-time courier tracking timeline (Order Placed → Supplier Shipped → In Transit → Out for Delivery).",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      {
        q: "What is Velora's 7-Day Easy Return policy?",
        a: "If you are not satisfied with your purchase, received the wrong size, or found any defects, you can request a return within 7 days of delivery. Our courier executive will pick up the item from your doorstep at zero cost.",
      },
      {
        q: "How and when will I get my refund?",
        a: "Refunds for Cash on Delivery (COD) orders are transferred instantly to your bank account or UPI ID as soon as the item is picked up by the delivery agent. Online payments are refunded back to the original source within 24-48 hours.",
      },
      {
        q: "Can I exchange an item for a different size?",
        a: "Yes! While placing a return request, simply choose the 'Exchange for different size' option, and the replacement size will be dispatched immediately.",
      },
    ],
  },
  {
    category: "Payments & Safety",
    items: [
      {
        q: "Is Cash on Delivery (COD) safe and available?",
        a: "Yes, COD is available for 100% of products on Velora. You don't need to pay anything in advance; simply inspect the parcel and pay cash to the courier partner upon delivery.",
      },
      {
        q: "What online payment methods are supported?",
        a: "We support all major payment modes: UPI (PhonePe, Google Pay, Paytm, BHIM), Debit & Credit Cards (Visa, MasterCard, RuPay), and Net Banking.",
      },
    ],
  },
  {
    category: "Supplier & Reselling",
    items: [
      {
        q: "How much commission does Velora charge sellers?",
        a: "Velora charges 0% Commission from sellers! You keep 100% of your product profit margins. Payments are settled in your bank account every 7 days.",
      },
      {
        q: "What documents are required to become a supplier?",
        a: "You only need an active GSTIN (Goods and Services Tax Identification Number) and a valid Bank Account to register in under 5 minutes.",
      },
    ],
  },
];

export default function FAQPage() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ "0-0": true });
  const [searchQuery, setSearchQuery] = useState("");

  const toggle = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const categories = ["All", ...VELORA_FAQS.map((c) => c.category)];

  const filteredCategories = VELORA_FAQS.filter((cat) => {
    if (selectedCat !== "All" && cat.category !== selectedCat) return false;
    return true;
  }).map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div className="pt-6 pb-20 px-4 sm:px-6 max-w-5xl mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-8 text-center space-y-2">
        <span className="text-xs font-bold text-[#681a72] dark:text-rose-400 uppercase tracking-wider">
          Velora Help Center
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
          How Can We Help You Today?
        </h1>
        <p className="text-xs text-gray-500 max-w-md mx-auto">
          Find quick answers about orders, delivery dates, 7-day returns, and seller registration.
        </p>

        {/* Search */}
        <div className="max-w-md mx-auto mt-4 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search help topics (e.g. return, COD, delivery)..."
            className="w-full text-xs pl-10 pr-4 py-2.5 bg-white dark:bg-[#1a1d24] border border-gray-300 dark:border-gray-700 rounded-xl outline-none focus:border-[#681a72]"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all ${
              selectedCat === cat
                ? "bg-[#681a72] text-white shadow-sm"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-gray-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Groups */}
      <div className="space-y-6">
        {filteredCategories.map((group, groupIdx) => (
          <div
            key={group.category}
            className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xs"
          >
            <h2 className="text-sm font-bold text-[#681a72] dark:text-rose-400 mb-3 pb-2 border-b border-gray-100 dark:border-gray-800">
              {group.category}
            </h2>

            <div className="space-y-2">
              {group.items.map((item, itemIdx) => {
                const key = `${groupIdx}-${itemIdx}`;
                const isOpen = openItems[key];
                return (
                  <div
                    key={item.q}
                    className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggle(key)}
                      className="w-full text-left p-3.5 flex items-center justify-between text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          isOpen ? "rotate-180 text-[#681a72] dark:text-rose-400" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-3.5 pt-0 text-xs text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-50 dark:border-gray-800/50">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Still need help? */}
      <div className="mt-12 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-2xl p-6 text-center max-w-xl mx-auto space-y-3">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Still have questions?</h3>
        <p className="text-xs text-gray-500">
          Our customer support team is available from 8 AM to 10 PM IST to assist you with any questions.
        </p>
        <Link
          href="/contact"
          className="inline-block px-5 py-2.5 bg-[#681a72] hover:bg-[#52135a] text-white text-xs font-bold rounded-lg shadow-sm transition-all"
        >
          Contact Customer Care
        </Link>
      </div>
    </div>
  );
}