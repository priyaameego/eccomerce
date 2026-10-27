import React from "react";
import HeroSection from "@/components/home/HeroSection";
import FlashSaleBanner from "@/components/home/FlashSaleBanner";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CraftsmanshipExperience from "@/components/home/CraftsmanshipExperience";
import InteractiveLookbook from "@/components/home/InteractiveLookbook";
import BrandPartners from "@/components/home/BrandPartners";
import TestimonialSlider from "@/components/home/TestimonialSlider";
import FAQPreview from "@/components/home/FAQPreview";

export const metadata = {
  title: "AURELIA • Haute Horlogerie & Advanced Material Atelier",
  description:
    "An Awwwards-inspired luxury eCommerce atelier crafting limited-run mechanical flying tourbillons, planar magnetic acoustics, kinetic footwear, and aerospace electric mobility.",
};

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#090a0f] text-white selection:bg-[#d4af37] selection:text-black">
      {/* Hero with Interactive 3D WebGL Three.js Canvas */}
      <HeroSection />

      {/* Private Vernissage Window & Live Millisecond Countdown */}
      <FlashSaleBanner />

      {/* Disciplines Bento Showcase */}
      <CategoryShowcase />

      {/* Filterable Masterpieces Grid */}
      <FeaturedProducts />

      {/* Interactive Metallurgy & Raytracing Deep-Dive */}
      <CraftsmanshipExperience />

      {/* Patron Chronicles Lookbook In Situ */}
      <InteractiveLookbook />

      {/* Scientific Alliances & Accreditations */}
      <BrandPartners />

      {/* Discerning Patron Testimonials */}
      <TestimonialSlider />

      {/* Advisory & Collector FAQ */}
      <FAQPreview />
    </main>
  );
}
