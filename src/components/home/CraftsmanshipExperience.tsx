"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Layers, Cpu, Shield, Zap } from "lucide-react";
import { sound } from "@/lib/sound";

const CRAFTSMANSHIP_PILLARS = [
  {
    id: "titanium",
    title: "Grade 5 Aeronautical Titanium",
    subtitle: "5-Axis Diamond CNC Milling with Aerospace Tolerance",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85",
    description:
      "Milled from solid aerospace titanium billets requiring 140 continuous hours of high-speed diamond tooling. The resulting alloy exhibits twice the tensile strength of surgical steel at half the physical mass.",
    specs: [
      { label: "Tensile Strength", value: "950 MPa" },
      { label: "Vickers Hardness", value: "350 HV" },
      { label: "Density", value: "4.43 g/cm³" },
      { label: "Thermal Expansion", value: "8.6 × 10⁻⁶ /K" },
    ],
  },
  {
    id: "acoustics",
    title: "Planar Beryllium Raytracing",
    subtitle: "Ultra-Thin Molecular Diaphragm with Zero Phase Distortion",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85",
    description:
      "Unlike conventional dynamic cones that warp at high excursions, our planar magnetic drivers employ vapor-deposited beryllium on ultra-thin PET membranes driven by neodymium N52 magnet arrays.",
    specs: [
      { label: "Frequency Range", value: "4Hz - 54kHz" },
      { label: "THD Distortion", value: "< 0.002%" },
      { label: "Diaphragm Thickness", value: "2.1 Microns" },
      { label: "Magnetic Flux", value: "1.8 Tesla" },
    ],
  },
  {
    id: "graphene",
    title: "Atomic Graphene Thermal Mesh",
    subtitle: "Single-Layer Carbon Nanotube Climate Regulation",
    icon: Layers,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1200&q=85",
    description:
      "Graphene is a single layer of carbon atoms arranged in a hexagonal honeycomb lattice. Integrated into superfine Italian wool fibers, it creates an impenetrable barrier to rain while transferring body heat away from hotspots.",
    specs: [
      { label: "Thermal Conductivity", value: "5000 W/mK" },
      { label: "Hydrostatic Head", value: "20,000 mm" },
      { label: "Shielding", value: "RFID / EMI Protected" },
      { label: "Fabric Weight", value: "260 GSM" },
    ],
  },
  {
    id: "generative",
    title: "Generative 3D Photopolymer Lattice",
    subtitle: "Algorithmic Energy Return Tuned to Kinetic Stride",
    icon: Cpu,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
    description:
      "Computed via finite element analysis, over 20,000 interconnected elastomeric struts deform dynamically upon heel strike, storing kinetic potential and propelling the foot forward with 91.2% measured energy return.",
    specs: [
      { label: "Energy Return", value: "91.2%" },
      { label: "Strut Density", value: "20,480 Cells" },
      { label: "Fatigue Life", value: "1.5M Impacts" },
      { label: "Torsion Shank", value: "Toray T1000 Carbon" },
    ],
  },
];

export default function CraftsmanshipExperience() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = CRAFTSMANSHIP_PILLARS[activeIdx];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37] flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          The Science of Luxury
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-wide">
          Engineering The Impossible
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-3 font-light">
          We reject superficial ornamentation. True luxury resides in microscopic tolerances, atomic materials, and mechanical integrity that endures for generations.
        </p>
      </div>

      {/* Interactive Pillar Selector Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        {CRAFTSMANSHIP_PILLARS.map((pillar, idx) => {
          const isSelected = activeIdx === idx;
          const Icon = pillar.icon;
          return (
            <button
              key={pillar.id}
              onClick={() => {
                setActiveIdx(idx);
                sound.playClick();
              }}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "glass-panel border-[#d4af37] bg-white/10 shadow-[0_0_25px_rgba(212,175,55,0.2)]"
                  : "border-white/10 bg-white/5 hover:border-white/20 text-neutral-400 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon
                  className={`w-5 h-5 ${
                    isSelected ? "text-[#d4af37]" : "text-neutral-500"
                  }`}
                />
                <span className="text-[10px] font-mono text-neutral-500">0{idx + 1}</span>
              </div>
              <h4 className={`text-xs font-semibold ${isSelected ? "text-white" : "text-neutral-300"}`}>
                {pillar.title}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Deep-Dive Stage */}
      <div className="rounded-3xl glass-card border border-white/10 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Visual */}
        <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-black">
          <Image
            src={current.image}
            alt={current.title}
            fill
            className="object-cover transition-all duration-700 filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-neutral-300">
            <span className="text-[#d4af37] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
              Microscopic Cross-Section
            </span>
            <span>Atelier Lab Telemetry</span>
          </div>
        </div>

        {/* Right Telemetry & Blueprint Specs */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37]">
              Proprietary Metallurgy & Physics
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              {current.title}
            </h3>
            <p className="text-xs font-mono text-neutral-400 mt-1">{current.subtitle}</p>

            <p className="text-xs sm:text-sm text-neutral-300 mt-4 leading-relaxed font-light">
              {current.description}
            </p>
          </div>

          {/* Metric Telemetry Grid */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {current.specs.map((sp) => (
              <div key={sp.label} className="p-3 rounded-xl bg-white/5 border border-white/5">
                <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                  {sp.label}
                </p>
                <p className="text-sm font-mono font-bold text-[#d4af37] mt-1">{sp.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
