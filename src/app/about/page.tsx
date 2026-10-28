import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Award, ShieldCheck, Users, Store, Truck, IndianRupee } from "lucide-react";

export const metadata = {
  title: "About Velora • Wholesale Prices, Designer Quality Shopping",
  description:
    "Velora is on a mission to democratize internet commerce for everyone in India. Enabling small manufacturers and retailers to sell directly to 14 Crore+ Indian consumers at 0% commission.",
};

export default function AboutPage() {
  return (
    <div className="pt-6 pb-20 px-4 sm:px-6 max-w-5xl mx-auto min-h-screen">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold text-[#681a72] dark:text-rose-400 uppercase tracking-wider">
          Our Vision & Story
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-1">
          Democratizing E-Commerce for 14 Crore+ Indians
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
          Velora is India’s fastest-growing value commerce platform, connecting everyday Indian households directly with local weavers, craftsmen, and manufacturers at true wholesale prices.
        </p>
      </div>

      {/* Visual */}
      <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-800 mb-12">
        <Image
          src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80"
          alt="Velora Wholesale Market"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
          <p className="text-white text-xs sm:text-sm font-bold">
            Empowering 600,000+ local sellers from Surat, Jaipur, Tirupur, Agra and Panipat
          </p>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950/30 text-[#681a72] dark:text-rose-400 flex items-center justify-center">
            <Store className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">0% Commission Model</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            We became the premier e-commerce marketplace in India to eliminate all commission fees, allowing manufacturers to pass direct cost savings directly to buyers.
          </p>
        </div>

        <div className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950/30 text-[#681a72] dark:text-rose-400 flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">Free Pan-India Delivery</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Delivering to over 28,000+ pin codes spanning Tier 2, Tier 3, and rural Bharat with zero delivery fees and full Cash on Delivery availability.
          </p>
        </div>

        <div className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950/30 text-[#681a72] dark:text-rose-400 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">Empowering Entrepreneurs</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Thousands of homemakers, college students, and micro-entrepreneurs run home-based businesses by sharing Velora products via WhatsApp and social networks.
          </p>
        </div>
      </div>

      {/* Headquarter Callout */}
      <div className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-gray-900 dark:text-white">
            Velora Headquarters
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">
            Velora Tech Park, Outer Ring Road, Bellandur, Bengaluru, Karnataka 560103
          </p>
        </div>
        <Link
          href="/admin"
          className="px-5 py-2.5 bg-[#681a72] hover:bg-[#52135a] text-white text-xs font-bold rounded-lg shadow-sm transition-all"
        >
          Join as a Supplier
        </Link>
      </div>
    </div>
  );
}