"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Check, Globe } from "lucide-react";
import { sound } from "@/lib/sound";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setIsSubscribed(true);
    sound.playSuccess();
    setNewsletterEmail("");
  };

  return (
    <footer className="relative bg-[#06070a] text-white border-t border-white/10 overflow-hidden">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.15),transparent_70%)] pointer-events-none" />

      {/* Newsletter VIP Gazette Invitation */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37] flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Private Salon Dispatches
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-wide">
              Receive Private Vernissage Access & Numbered Allocation Alerts.
            </h3>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              Be the first to secure limited-edition tourbillons and acoustic prototypes prior to international public unveilings.
            </p>
          </div>

          <div className="lg:col-span-5">
            {isSubscribed ? (
              <div className="p-4 rounded-2xl glass-card border border-[#d4af37]/40 text-emerald-400 flex items-center gap-3 text-xs font-mono">
                <Check className="w-5 h-5 text-[#d4af37]" />
                <div>
                  <p className="text-white font-bold">Privilege Membership Registered</p>
                  <p className="text-neutral-400 text-[11px] mt-0.5">Check your inbox for your bespoke welcome courtesy code.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your private email..."
                  required
                  className="flex-1 px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-xs font-mono focus:border-[#d4af37] outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#c5a059] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 hover:scale-105"
                >
                  <span>Request Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Nav Matrix */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="col-span-2 lg:col-span-2">
          <Link href="/" className="inline-block group mb-4">
            <span className="text-2xl font-serif tracking-[0.3em] font-bold text-white group-hover:text-[#d4af37] transition-colors">
              AURELIA
            </span>
            <span className="block text-[8px] font-mono tracking-[0.4em] text-[#d4af37] uppercase">
              HAUTE ATELIER DE LUXE
            </span>
          </Link>
          <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mb-6">
            Aurelia unites Swiss mechanical horology, aerospace carbon metallurgy, and generative acoustics into permanent sculptures of kinetic luxury.
          </p>

          <div className="space-y-2 text-xs font-mono text-neutral-400">
            <p className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>International Headquarters: Rue du Rhône 42, 1204 Genève</span>
            </p>
            <p className="text-[11px] text-neutral-500">
              Private Concierge: +41 22 819 0900 • concierge@aurelia-atelier.luxury
            </p>
          </div>
        </div>

        {/* Departments */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#d4af37] mb-4">
            Atelier Divisions
          </h4>
          <ul className="space-y-2.5 text-xs text-neutral-400">
            <li>
              <Link href="/shop?category=Horology" className="hover:text-white transition-colors">
                Haute Horlogerie
              </Link>
            </li>
            <li>
              <Link href="/shop?category=Acoustics" className="hover:text-white transition-colors">
                Spatial Acoustics
              </Link>
            </li>
            <li>
              <Link href="/shop?category=Apparel" className="hover:text-white transition-colors">
                Kinetic Apparel
              </Link>
            </li>
            <li>
              <Link href="/shop?category=Mobility" className="hover:text-white transition-colors">
                Electric Mobility
              </Link>
            </li>
            <li>
              <Link href="/shop?category=Living" className="hover:text-white transition-colors">
                Sensory Luminaires
              </Link>
            </li>
          </ul>
        </div>

        {/* Client Services */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#d4af37] mb-4">
            Client Concierge
          </h4>
          <ul className="space-y-2.5 text-xs text-neutral-400">
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Private Salon Booking
              </Link>
            </li>
            <li>
              <Link href="/account" className="hover:text-white transition-colors">
                Track Armored Courier
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                Certificate of Authenticity
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white transition-colors">
                Warranty & 5-Year Guarantee
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-[#d4af37] transition-colors text-cyan-400">
                Command Hub (Admin)
              </Link>
            </li>
          </ul>
        </div>

        {/* Salons Worldwide */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#d4af37] mb-4">
            Global Salons
          </h4>
          <ul className="space-y-2.5 text-xs text-neutral-400 font-mono">
            <li>Genève • Rue du Rhône</li>
            <li>Paris • Place Vendôme</li>
            <li>Tokyo • Ginza 6</li>
            <li>New York • Madison & 72nd</li>
            <li>Dubai • DIFC Gate Village</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Verified Security */}
      <div className="border-t border-white/5 bg-[#030406] px-6 py-6 text-xs text-neutral-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            <span>© 2026 AURELIA ATELIER S.A. All Rights Reserved. Swiss Fine Craftsmanship.</span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <Link href="/faq" className="hover:text-white transition-colors">
              Privacy Protocol
            </Link>
            <Link href="/faq" className="hover:text-white transition-colors">
              Terms of Acquisition
            </Link>
            <Link href="/faq" className="hover:text-white transition-colors">
              Global Logistics
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
