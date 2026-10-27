"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Play, ShieldCheck, Sparkles, Award, Clock } from "lucide-react";
import LuxuryHeroCanvas from "@/components/3d/LuxuryHeroCanvas";
import { sound } from "@/lib/sound";

export default function HeroSection() {
  const [genevaTime, setGenevaTime] = useState("");
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setGenevaTime(
        now.toLocaleTimeString("en-GB", {
          timeZone: "Europe/Zurich",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " CET"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-12 overflow-hidden bg-[#090a0f]">
      {/* Background Ambient Radial Glow Blobs */}
      <div className="ambient-glow-gold top-10 left-[-100px] animate-subtle-pulse" />
      <div className="ambient-glow-cyan bottom-10 right-[-100px] animate-subtle-pulse" />

      {/* Subtle Luxury Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Top Status Bar: Geneva Time & Allocation Notice */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-[11px] font-mono text-neutral-400 border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#d4af37]">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
              GENÈVE ATELIER
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1 text-neutral-300">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              {genevaTime || "12:00:00 CET"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-neutral-400">
              STATUS: <strong className="text-emerald-400">ALLOCATIONS OPEN</strong>
            </span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span className="text-[#d4af37] flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              AWWWARDS SITE OF THE DAY CANDIDATE
            </span>
          </div>
        </div>

        {/* Hero Grid: Typography on Left, Interactive 3D WebGL on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#d4af37]/40 text-[#d4af37] text-xs font-mono tracking-widest uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              The Horizon Collection 2026
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-serif font-bold text-white tracking-tight leading-[1.08]">
              The Apex of <br />
              <span className="gold-text-gradient">Material Mastery</span> & <br />
              Mechanical Poetry.
            </h1>

            <p className="mt-6 text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl font-light">
              Where Swiss flying tourbillons, aerospace grade 5 titanium monoblocs, and raytraced planar acoustics converge. Hand-crafted in limited allocations for discerning patrons worldwide.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                onClick={() => sound.playClick()}
                className="px-8 py-4 rounded-2xl bg-[#d4af37] hover:bg-[#c5a059] text-black font-mono font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95"
              >
                <span>Acquire Masterpieces</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => {
                  setVideoModalOpen(true);
                  sound.playClick();
                }}
                className="px-6 py-4 rounded-2xl glass-panel border border-white/20 hover:border-[#d4af37]/60 text-white font-mono text-xs tracking-wider uppercase transition-all flex items-center gap-3 hover:bg-white/10"
              >
                <div className="w-6 h-6 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">
                  <Play className="w-3 h-3 fill-[#d4af37]" />
                </div>
                <span>The Atelier Film (2:14)</span>
              </button>
            </div>

            {/* Micro Stats Matrix */}
            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 w-full max-w-lg">
              <div>
                <p className="text-xl sm:text-2xl font-mono font-bold text-white">0.001%</p>
                <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mt-1">
                  Aeronautic Tolerance
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-mono font-bold text-[#d4af37]">72 Hr</p>
                <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mt-1">
                  Coaxial Power Reserve
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-mono font-bold text-cyan-400">100%</p>
                <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mt-1">
                  Swiss Atelier Certified
                </p>
              </div>
            </div>
          </div>

          {/* Right Hero: Real-Time Interactive 3D WebGL Three.js Canvas */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-none aspect-square rounded-3xl glass-card border border-white/10 p-2 overflow-hidden shadow-2xl">
              <LuxuryHeroCanvas />
            </div>
          </div>
        </div>
      </div>

      {/* Craftsmanship Film Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl glass-panel bg-[#090a0f] rounded-3xl border border-[#d4af37]/40 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">
                AURELIA Atelier Film • 4K Cinematic Documentary
              </span>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="text-neutral-400 hover:text-white p-1"
              >
                ✕ Close
              </button>
            </div>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <div className="text-center p-8">
                <Sparkles className="w-12 h-12 text-[#d4af37] mx-auto mb-4 animate-spin" />
                <h3 className="text-xl font-serif font-bold text-white mb-2">
                  The Genesis of Pure Precision
                </h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  Filmed in the Jura Mountains of Switzerland and our Tokyo composite lab. Hand-finishing of titanium escapements and acoustic beryllium diaphragms.
                </p>
                <button
                  onClick={() => setVideoModalOpen(false)}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-[#d4af37] text-black font-mono text-xs uppercase font-bold"
                >
                  Return to Exploration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
