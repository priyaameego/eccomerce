"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LifeBuoy,
  Phone,
  MessageSquare,
  Package,
  RotateCcw,
  Search,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function SupportPage() {
  const [orderQuery, setOrderQuery] = useState("");
  const [trackingResult, setTrackingResult] = useState<{
    found: boolean;
    orderId?: string;
    status?: string;
    expectedDate?: string;
    carrier?: string;
  } | null>(null);

  const [contactSubject, setContactSubject] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;

    setTrackingResult({
      found: true,
      orderId: orderQuery.toUpperCase().trim(),
      status: "In Transit - Out for Delivery",
      expectedDate: "Tomorrow by 5:00 PM",
      carrier: "Delhivery Surface Express (AWB #8921401)",
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMsg.trim()) return;
    setSubmittedMessage(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-purple-50 dark:bg-purple-950/40 text-[#681a72] dark:text-[#c084fc] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-purple-200 dark:border-purple-800">
            <LifeBuoy className="w-4 h-4" />
            <span>24/7 Velora Concierge</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            How can we assist you today?
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Track active orders, request 7-day doorstep returns, or speak directly with our styling concierge.
          </p>
        </div>

        {/* Live Order Tracking Card */}
        <div className="bg-white dark:bg-[#131926] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-[#681a72] dark:text-[#c084fc] flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900 dark:text-white">
                Live Order Tracking
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Enter your Order ID (e.g. VEL-ORD-90214) to view live location & delivery updates
              </p>
            </div>
          </div>

          <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. VEL-ORD-90214)"
                className="w-full bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-gray-900"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-gray-950 hover:bg-black text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-transform active:scale-95 cursor-pointer shrink-0"
            >
              Track Order
            </button>
          </form>

          {/* Tracking Result */}
          {trackingResult && (
            <div className="mt-5 p-5 bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60 rounded-2xl animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-purple-200/60 dark:border-purple-800/60">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-500">Order ID</span>
                  <div className="font-mono font-bold text-sm text-gray-900 dark:text-white">
                    {trackingResult.orderId}
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{trackingResult.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs text-gray-700 dark:text-gray-300">
                <div>
                  <span className="text-gray-500 block">Estimated Arrival:</span>
                  <strong className="text-gray-900 dark:text-white">{trackingResult.expectedDate}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block">Courier Partner:</span>
                  <strong className="text-gray-900 dark:text-white">{trackingResult.carrier}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3 Quick Help Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="https://wa.me/919876543210?text=Hi%20Velora%20Support%2C%20I%20need%20help%20with%20my%20order"
            target="_blank"
            rel="noreferrer"
            className="p-5 bg-white dark:bg-[#131926] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs hover:border-[#681a72] transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-[#681a72] dark:text-[#c084fc] flex items-center justify-center mb-3">
              <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">WhatsApp Concierge</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Chat directly with our care executive for instant resolution (9 AM - 9 PM)
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#681a72] dark:text-[#c084fc] mt-3">
              <span>Open WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </a>

          <a
            href="tel:+919876543210"
            className="p-5 bg-white dark:bg-[#131926] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs hover:border-[#681a72] transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-3">
              <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">Toll-Free Helpline</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Call 1800-200-9898 for order modifications, returns, or styling advice
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 dark:text-sky-400 mt-3">
              <span>Call Toll-Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </a>

          <div className="p-5 bg-white dark:bg-[#131926] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">7-Day Free Returns</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Zero questions asked doorstep return pickup with instant 100% refund into UPI or Bank.
            </p>
            <Link
              href="/faq"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#681a72] dark:text-[#c084fc] mt-3"
            >
              <span>Read Return Policy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Contact Message Form */}
        <div className="bg-white dark:bg-[#131926] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl p-6 sm:p-8">
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-1">
            Send an Enquiry
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
            We usually respond back within 2 business hours via Email or WhatsApp.
          </p>

          {submittedMessage ? (
            <div className="p-6 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-[#681a72] mx-auto" />
              <h3 className="font-bold text-gray-900 dark:text-white">Message Received!</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Ticket #TK-9812 has been created. Our team will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    className="w-full bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Mobile or Email
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Topic / Subject
                </label>
                <select
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-gray-900"
                >
                  <option value="Order Tracking">Order Status & Delivery Delay</option>
                  <option value="Return / Refund">Request 7-Day Return / Exchange</option>
                  <option value="Payment / COD">Cash on Delivery or Payment Issue</option>
                  <option value="Supplier / Partner">Supplier / Partner Onboarding</option>
                  <option value="Other">Other Query</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  placeholder="Describe your issue or order question..."
                  className="w-full bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-gray-900"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3 bg-gray-950 hover:bg-black text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-transform active:scale-95 cursor-pointer"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
