import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Clock, BookOpen } from "lucide-react";

export const metadata = {
  title: "Atelier Journal & Technical Chronicles • AURELIA",
  description: "Essays and treatises on quantum escapements, planar acoustics, and advanced metallurgy.",
};

const ARTICLES = [
  {
    slug: "quantum-escapement-gravitational-poetry",
    title: "The Triple-Axis Gyroscope: Defying Earth’s Gravity at 21,600 vph",
    subtitle: "How our Geneva horologists eliminated positional rate variation through a 0.28-gram titanium carriage.",
    author: "Dr. Marc-Antoine Dubois, Master Horologist",
    date: "October 18, 2026",
    readTime: "6 min read",
    category: "Horology",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85",
    excerpt:
      "When Abraham-Louis Breguet patented the tourbillon in 1801, pocket watches rested vertically. In modern three-dimensional wrist movement, a single plane of rotation is insufficient. Enter the gyroscopic triple-axis carriage.",
  },
  {
    slug: "beryllium-planar-magnetic-physics",
    title: "The Architecture of Pure Silence: Why We Vapor-Deposit Beryllium",
    subtitle: "A deep dive into acoustic transient response, modal breakup, and laser interferometry.",
    author: "Elena Rostova, Principal Acoustician",
    date: "October 12, 2026",
    readTime: "8 min read",
    category: "Acoustics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85",
    excerpt:
      "Traditional dynamic drivers flex under acceleration like a membrane struck by wind. Planar magnetic force distributes acceleration across the entire surface of a 2.1-micron foil, ensuring zero phase shift.",
  },
  {
    slug: "t1000-carbon-hyper-mobility",
    title: "Aerodynamics in the Hyper-Grid: The Genesis of the Horizon Monocoque",
    subtitle: "Utilizing Toray high-modulus carbon to create an electric personal vehicle with zero flex.",
    author: "Kenji Sato, Mobility Design Director",
    date: "September 29, 2026",
    readTime: "5 min read",
    category: "Mobility",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=85",
    excerpt:
      "A personal mobility device must endure pothole impacts exceeding 12G while remaining agile enough to pivot in tight urban spaces. We engineered the Horizon frame as a single unbroken carbon tube.",
  },
];

export default function StoriesPage() {
  return (
    <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37] flex items-center justify-center gap-2 mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          The Aurelia Journal
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-wide">
          Treatises on Materiality & Time
        </h1>
        <p className="text-sm text-neutral-300 mt-3 font-light leading-relaxed">
          Technical essays, horological memoirs, and metallurgical breakthroughs directly from our Geneva and Tokyo laboratories.
        </p>
      </div>

      {/* Featured Lead Article */}
      <div className="rounded-3xl glass-card border border-white/10 overflow-hidden mb-16 shadow-2xl group">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden">
            <Image
              src={ARTICLES[0].image}
              alt={ARTICLES[0].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
          <div className="lg:col-span-5 p-8 lg:p-12 space-y-4">
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-[#d4af37] uppercase tracking-wider">{ARTICLES[0].category}</span>
              <span className="text-white/20">•</span>
              <span className="text-neutral-400">{ARTICLES[0].readTime}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white group-hover:text-[#d4af37] transition-colors">
              {ARTICLES[0].title}
            </h2>
            <p className="text-xs text-neutral-400 font-mono">{ARTICLES[0].subtitle}</p>
            <p className="text-xs text-neutral-300 leading-relaxed font-light">{ARTICLES[0].excerpt}</p>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>{ARTICLES[0].author}</span>
              <span className="text-white flex items-center gap-1 group-hover:text-[#d4af37]">
                Read Treatise &rarr;
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ARTICLES.slice(1).map((art, idx) => (
          <div
            key={idx}
            className="rounded-3xl glass-card border border-white/10 overflow-hidden flex flex-col justify-between group shadow-xl"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={art.image}
                alt={art.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full glass-panel border border-white/10 text-[#d4af37]">
                  {art.category}
                </span>
              </div>
            </div>

            <div className="p-8 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2">
                  <span>{art.date}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#d4af37] transition-colors">
                  {art.title}
                </h3>
                <p className="text-xs text-neutral-300 mt-2 font-light leading-relaxed">{art.excerpt}</p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>{art.author}</span>
                <span className="text-white group-hover:text-[#d4af37] flex items-center gap-1">
                  Read &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
