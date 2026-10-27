"use client";

import React from "react";
import { ShieldCheck, Award, Gem, Compass, Cpu, Anchor } from "lucide-react";

export default function BrandPartners() {
  const certifications = [
    { name: "Poinçon de Genève", desc: "Hallmark of Geneva Horology", icon: Gem },
    { name: "Toray Carbon Labs", desc: "T1000 High-Modulus Weaves", icon: Compass },
    { name: "Kyoto Porcelain Kilns", desc: "Inert Acoustic Ceramics", icon: Anchor },
    { name: "Beryllium Acoustic R&D", desc: "Planar Raytracing Standards", icon: Cpu },
    { name: "Swiss Made Chronometry", desc: "ISO 3159 Certified Calibers", icon: Award },
  ];

  return (
    <section className="py-16 px-6 border-y border-white/10 bg-[#06070a]">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-[10px] font-mono uppercase tracking-[0.3em] text-[#d4af37] mb-8">
          Craftsmanship Accreditations & Scientific Alliances
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
          {certifications.map((cert) => {
            const Icon = cert.icon;
            return (
              <div
                key={cert.name}
                className="p-4 rounded-2xl glass-card border border-white/5 hover:border-[#d4af37]/40 flex flex-col items-center text-center transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#d4af37] group-hover:scale-110 transition-transform mb-2">
                  <Icon className="w-5 h-5" />
                </div>
                <h5 className="text-xs font-semibold text-white tracking-wide">{cert.name}</h5>
                <p className="text-[10px] font-mono text-neutral-400 mt-0.5">{cert.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
