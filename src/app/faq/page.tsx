"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ShieldCheck, Sparkles, Search } from "lucide-react";
import { sound } from "@/lib/sound";

const ALL_FAQS = [
  {
    category: "Acquisitions & Delivery",
    items: [
      {
        q: "How does the Complimentary Armored Courier delivery operate?",
        a: "Every acquisition above $1,500 qualifies for dedicated armored transport via Malca-Amit or Brinks Global. Deliveries are dispatched under continuous dual-custody surveillance with satellite tracking, arriving in tamper-evident sealed titanium security containers directly to your estate or private vault.",
      },
      {
        q: "What international customs duties and taxes are calculated?",
        a: "Our pricing incorporates DDP (Delivered Duty Paid) protocols where local import tariffs, Swiss export VAT, and carrier brokerage are fully settled by Aurelia prior to dispatch. There are zero surprise invoices upon reception.",
      },
      {
        q: "Can I inspect the piece prior to final settlement?",
        a: "Yes. By requesting a Private Salon appointment or booking an at-home concierge presentation, our horological and acoustic specialists will present the numbered creation for your personal evaluation.",
      },
    ],
  },
  {
    category: "Horology & Authenticity",
    items: [
      {
        q: "What certifications accompany each Aurelia timepiece?",
        a: "Every timepiece is delivered with a chronometer certificate from the Contrôle Officiel Suisse des Chronomètres (COSC) or the Poinçon de Genève, an NFC-embedded solid titanium provenance passport, and an archival certificate signed by the master watchmaker.",
      },
      {
        q: "How does the 5-Year Global Atelier Guarantee function?",
        a: "The guarantee covers all mechanical irregularities, amplitude variances, and material defects. Furthermore, patrons receive complimentary ultrasonic servicing and gasket replacements every 24 months at any international salon.",
      },
    ],
  },
  {
    category: "Materials & Acoustic Science",
    items: [
      {
        q: "Why does Aurelia utilize planar magnetic transducers with vapor-deposited beryllium?",
        a: "Beryllium is one of the stiffest yet lightest structural elements on earth. Vapor-depositing it onto micron-thin diaphragms ensures instantaneous transient response without cone flexing or harmonic smearing, achieving true raytraced acoustic clarity.",
      },
      {
        q: "Are the carbon monocoques recyclable or sustainable?",
        a: "Our T1000 carbon weaves are cured using bio-derived epoxy resins, and all offcut composites are recycled into structural components for our kinetic mobility prototypes.",
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
    sound.playClick();
  };

  return (
    <div className="pt-28 pb-24 px-6 max-w-5xl mx-auto min-h-screen">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37] flex items-center justify-center gap-2 mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          Patron Advisory Dossier
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-wide">
          Frequently Inquired Protocols
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-3 font-light leading-relaxed">
          Comprehensive guidance regarding international armored logistics, Swiss chronometry certifications, and bespoke commissioning.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {["All", "Acquisitions & Delivery", "Horology & Authenticity", "Materials & Acoustic Science"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCat(cat);
              sound.playClick();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all ${
              selectedCat === cat
                ? "bg-[#d4af37] text-black font-bold shadow-lg"
                : "glass-panel border-white/10 text-neutral-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-10">
        {ALL_FAQS.filter((f) => selectedCat === "All" || f.category === selectedCat).map((group, gIdx) => (
          <div key={gIdx} className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">
              {group.category}
            </h3>

            <div className="space-y-3">
              {group.items.map((it, idx) => {
                const key = `${gIdx}-${idx}`;
                const isOpen = !!openItems[key];
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
                      onClick={() => toggle(key)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4"
                    >
                      <span className="text-sm font-semibold text-white tracking-wide">{it.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#d4af37] shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 text-xs text-neutral-300 leading-relaxed font-light border-t border-white/5 pt-3">
                        {it.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center p-8 rounded-3xl glass-card border border-white/10 max-w-xl mx-auto">
        <h4 className="text-base font-serif font-bold text-white mb-2">Unanswered Technical Inquiry?</h4>
        <p className="text-xs text-neutral-400 mb-6">
          Our Geneva horological and materials laboratory welcomes specific technical inquiries.
        </p>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-xl bg-[#d4af37] text-black font-mono font-bold text-xs uppercase tracking-wider inline-block hover:bg-[#c5a059] transition-all"
        >
          Contact Master Horologist
        </Link>
      </div>
    </div>
  );
}
