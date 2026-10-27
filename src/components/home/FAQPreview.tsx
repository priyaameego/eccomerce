"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Sparkles, HelpCircle } from "lucide-react";
import { sound } from "@/lib/sound";

const FAQS = [
  {
    q: "How are numbered limited allocations secured and authenticated?",
    a: "Each numbered timepiece or acoustic creation is registered on our private cryptographically signed atelier registry and accompanied by an NFC-embedded titanium certificate card. Upon allocation, your piece is personalized with your bespoke collector serial number.",
  },
  {
    q: "What does the Complimentary White-Glove Armored Courier service entail?",
    a: "All orders exceeding $1,500 receive dedicated temperature-controlled, fully-insured armored transport via Malca-Amit or Brinks Global Logistics. Deliveries are scheduled with private security escorts directly to your residence, yacht, or private bank vault with identity verification.",
  },
  {
    q: "What is included in the 5-Year Comprehensive Atelier Guarantee?",
    a: "Every mechanical movement and acoustic transducer is covered against all mechanical anomalies, amplitude decay, and calibration drift. Every 24 months, we invite patrons to return their piece for complimentary ultrasonic cleaning, lubrication replenishment, and micro-regulation.",
  },
  {
    q: "Can I inspect prototypes in person before completing acquisition?",
    a: "Private viewing salons are available by appointment in Geneva (Rue du Rhône), Paris (Place Vendôme), Tokyo (Ginza), and New York (Madison Ave). Patrons can arrange a private salon session with a master horologist or sound architect.",
  },
  {
    q: "Which international payment currencies and digital assets are accepted?",
    a: "We support major credit cards via Stripe, UPI and net-banking via Razorpay, Apple Pay, wire transfer in USD, EUR, GBP, JPY, and direct settlement in Bitcoin (BTC) and Ethereum (ETH) with instant OTC exchange rates.",
  },
];

export default function FAQPreview() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
    sound.playClick();
  };

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37] flex items-center justify-center gap-2 mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          Patron Advisory & Protocol
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide">
          Frequently Inquired Protocols
        </h2>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? "glass-panel border-[#d4af37]/40 bg-white/5"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4"
              >
                <span className="text-sm font-semibold text-white tracking-wide">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#d4af37] shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs text-neutral-300 leading-relaxed font-light border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <p className="text-xs text-neutral-400 font-mono">
          Have a bespoke inquiry or specific custom requirement?{" "}
          <Link href="/contact" className="text-[#d4af37] hover:underline">
            Contact Private Concierge &rarr;
          </Link>
        </p>
      </div>
    </section>
  );
}
