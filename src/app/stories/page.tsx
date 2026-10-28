import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Sparkles, ArrowRight, Heart } from "lucide-react";

export const metadata = {
  title: "Velora Stories • Seller & Entrepreneur Success Chronicles",
  description: "Real stories of how small business owners, weavers and homemakers across India became financially independent with Velora.",
};

const STORIES = [
  {
    slug: "surat-weaver-to-national-brand",
    title: "From a 2-Loom Workshop in Surat to 5,000 Saree Orders a Month",
    subtitle: "How Rajesh Patel connected directly with customers across 15 states with 0% commission.",
    author: "Rajesh Patel, Radhika Silk Mills",
    date: "October 2026",
    category: "Weaver Spotlight",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    excerpt:
      "Before Velora, middle brokers took over 40% of our saree margins. When we started selling directly on Velora with zero commission, our factory expanded from 2 powerlooms to 18 looms in two years.",
  },
  {
    slug: "homemaker-to-reseller-leader",
    title: "How Pooja Started Her Reselling Journey with Zero Investment",
    subtitle: "A mother of two from Indore created a monthly revenue of ₹45,000 by sharing trending Velora kurtis.",
    author: "Pooja Verma, Indore",
    date: "September 2026",
    category: "Reseller Story",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    excerpt:
      "All I needed was a smartphone and WhatsApp. Velora handles the packaging, courier delivery, and COD collection. My customers receive pristine ethnic wear and I earn direct margins.",
  },
  {
    slug: "panipat-bedsheet-hub-scale",
    title: "Bringing Panipat Home Textiles into 1 Crore Indian Bedrooms",
    subtitle: "How high quality 210 TC cotton bedsheets found an eager audience in Tier 2 and Tier 3 cities.",
    author: "Sunil Grover, Panipat Home Hub",
    date: "August 2026",
    category: "Manufacturer Spotlight",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    excerpt:
      "The fast 7-day payment settlement cycle on Velora provided us the liquidity needed to stock inventory for festive peak sales like Diwali and Eid without debt.",
  },
];

export default function StoriesPage() {
  return (
    <div className="pt-6 pb-20 px-4 sm:px-6 max-w-5xl mx-auto min-h-screen">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-bold text-[#681a72] dark:text-rose-400 uppercase tracking-wider">
          Velora Community Chronicles
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-1">
          Inspiring Stories of Bharat
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Real stories of Indian weavers, craftsmen, and micro-entrepreneurs building independent futures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STORIES.map((story) => (
          <div
            key={story.slug}
            className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] bg-gray-50 dark:bg-gray-800">
                <Image src={story.image} alt={story.title} fill className="object-cover" />
                <span className="absolute top-2 left-2 bg-[#681a72] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                  {story.category}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white leading-snug">
                  {story.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                  {story.excerpt}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-gray-50 dark:border-gray-800/60 mt-2 flex items-center justify-between text-[11px] text-gray-400">
              <span>{story.author}</span>
              <span className="text-[#681a72] dark:text-rose-400 font-bold">Read More →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}