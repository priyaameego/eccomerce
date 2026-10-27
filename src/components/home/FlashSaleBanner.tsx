"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, ArrowRight, Copy, Check } from "lucide-react";
import { sound } from "@/lib/sound";

export default function FlashSaleBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 18,
    minutes: 42,
    seconds: 15,
    ms: 8,
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.ms > 0) {
          return { ...prev, ms: prev.ms - 1 };
        }
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1, ms: 9 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59, ms: 9 };
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59, ms: 9 };
        }
        return { hours: 24, minutes: 0, seconds: 0, ms: 0 };
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText("VIP20");
    setCopied(true);
    sound.playSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-12 px-6 overflow-hidden bg-gradient-to-r from-[#12131a] via-[#1a1c29] to-[#12131a] border-y border-white/10">
      {/* Dynamic ambient sweep */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
        {/* Left Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/20 border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] shrink-0">
            <Zap className="w-6 h-6 fill-[#d4af37]" />
          </div>

          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d4af37] font-bold">
                Private Vernissage Window
              </span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
                LIMITED ALLOCATION
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
              20% Courtesy Allocation on Masterpieces Over $3,000
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Privilege reservation code applies across Haute Horlogerie & Spatial Acoustic sets.
            </p>
          </div>
        </div>

        {/* Center Countdown Matrix */}
        <div className="flex items-center gap-3 font-mono">
          <div className="flex flex-col items-center">
            <span className="w-14 sm:w-16 h-12 sm:h-14 rounded-xl glass-panel border border-[#d4af37]/40 text-xl sm:text-2xl font-bold text-white flex items-center justify-center shadow-lg">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-neutral-400 mt-1">Hours</span>
          </div>

          <span className="text-xl font-bold text-[#d4af37] -mt-4">:</span>

          <div className="flex flex-col items-center">
            <span className="w-14 sm:w-16 h-12 sm:h-14 rounded-xl glass-panel border border-[#d4af37]/40 text-xl sm:text-2xl font-bold text-white flex items-center justify-center shadow-lg">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-neutral-400 mt-1">Mins</span>
          </div>

          <span className="text-xl font-bold text-[#d4af37] -mt-4">:</span>

          <div className="flex flex-col items-center">
            <span className="w-14 sm:w-16 h-12 sm:h-14 rounded-xl glass-panel border border-[#d4af37]/40 text-xl sm:text-2xl font-bold text-[#d4af37] flex items-center justify-center shadow-lg">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-neutral-400 mt-1">Secs</span>
          </div>

          <span className="text-xl font-bold text-neutral-600 -mt-4">.</span>

          <div className="flex flex-col items-center">
            <span className="w-10 sm:w-12 h-12 sm:h-14 rounded-xl glass-panel border border-white/10 text-lg sm:text-xl font-bold text-neutral-400 flex items-center justify-center">
              {timeLeft.ms}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-neutral-500 mt-1">Ms</span>
          </div>
        </div>

        {/* Right CTA & Copy Code */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyCode}
            className="px-4 py-3 rounded-xl glass-panel border border-white/20 hover:border-[#d4af37]/50 text-xs font-mono text-white flex items-center gap-2 transition-all hover:bg-white/5"
            title="Click to copy code"
          >
            <span className="font-bold text-[#d4af37]">VIP20</span>
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
          </button>

          <Link
            href="/shop?deal=true"
            onClick={() => sound.playClick()}
            className="px-6 py-3 rounded-xl bg-[#d4af37] hover:bg-[#c5a059] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105"
          >
            <span>Explore Offers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
