import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Award, ShieldCheck, Compass, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Atelier Heritage & Philosophy • AURELIA",
  description: "The founding principles of Aurelia: bridging Swiss horological tradition, aerospace metallurgy, and computational physics.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37] flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          The Atelier Manifesto
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-wide">
          At The Convergence of Art & Physics
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 mt-4 font-light leading-relaxed">
          Founded in the canton of Geneva, Aurelia was established with a singular directive: to reject mass production in favor of permanent mechanical sculptures.
        </p>
      </div>

      {/* Hero Visual */}
      <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden glass-card border border-white/10 mb-20 shadow-2xl">
        <Image
          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=85"
          alt="Aurelia Watchmaking Atelier"
          fill
          className="object-cover filter brightness-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-neutral-300">
          <span className="text-[#d4af37]">Vallée de Joux • Laboratory No. 1</span>
          <span>Altitude 1,004m • Pure Alpine Atmosphere</span>
        </div>
      </div>

      {/* The 3 Core Creeds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="p-8 rounded-3xl glass-card border border-white/10 space-y-3">
          <span className="text-xs font-mono text-[#d4af37]">01 / CREED</span>
          <h3 className="text-xl font-serif font-bold text-white">Microscopic Honesty</h3>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            Every surface, whether visible or concealed beneath the dial, receives the identical level of black mirror polishing and circular graining.
          </p>
        </div>

        <div className="p-8 rounded-3xl glass-card border border-white/10 space-y-3">
          <span className="text-xs font-mono text-[#d4af37]">02 / CREED</span>
          <h3 className="text-xl font-serif font-bold text-white">Zero Compromise on Physics</h3>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            We employ vapor-deposited beryllium, atomic graphene, and Grade 5 titanium not for novelty, but because the laws of thermodynamics demand them.
          </p>
        </div>

        <div className="p-8 rounded-3xl glass-card border border-white/10 space-y-3">
          <span className="text-xs font-mono text-[#d4af37]">03 / CREED</span>
          <h3 className="text-xl font-serif font-bold text-white">Eternal Allocation</h3>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            Every piece is strictly numbered and permanently registered on our archival vault registry. We commit to servicing each caliber for a minimum of 100 years.
          </p>
        </div>
      </div>

      {/* Global Salons */}
      <div className="rounded-3xl glass-card border border-white/10 p-8 sm:p-12 mb-16">
        <h3 className="text-2xl font-serif font-bold text-white mb-2">Our International Salons</h3>
        <p className="text-xs text-neutral-400 mb-8 max-w-lg">
          Experience our creations in person with private concierge appointments.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <h4 className="text-sm font-bold text-white">Genève Salon</h4>
            <p className="text-neutral-400">Rue du Rhône 42</p>
            <p className="text-[#d4af37]">+41 22 819 0900</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <h4 className="text-sm font-bold text-white">Paris Salon</h4>
            <p className="text-neutral-400">Place Vendôme 18</p>
            <p className="text-[#d4af37]">+33 1 42 68 00 12</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <h4 className="text-sm font-bold text-white">Tokyo Salon</h4>
            <p className="text-neutral-400">Ginza 6-10-1, Chuo-ku</p>
            <p className="text-[#d4af37]">+81 3 6280 6100</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <h4 className="text-sm font-bold text-white">New York Salon</h4>
            <p className="text-neutral-400">Madison Avenue & 72nd</p>
            <p className="text-[#d4af37]">+1 212 555 0199</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#d4af37] text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-[#c5a059] transition-all"
        >
          <span>Schedule Private Salon Inspection</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
