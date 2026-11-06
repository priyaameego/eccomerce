"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Smartphone,
  Truck,
  RotateCcw,
  IndianRupee,
  Star,
  Sparkles,
  Filter,
  Check,
  QrCode,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Flame,
  X,
  Zap,
} from "lucide-react";
import { PRODUCTS, CATEGORIES, Product } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import HeroBanner3DSlider from "./HeroBanner3DSlider";
import MaisonVellHero from "./MaisonVellHero";

export default function MeeshoHomeClient() {
  // Hero Experience Switcher: Maison Vell Runway 3D vs Wholesale Deals
  const [heroMode, setHeroMode] = useState<"runway" | "deals">("runway");

  // Selected Filters
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedPriceMax, setSelectedPriceMax] = useState<number>(1000);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedFabric, setSelectedFabric] = useState<string>("all");
  const [selectedDiscountMin, setSelectedDiscountMin] = useState<number>(0);
  const [sortBy, setSortBy] = useState<"relevance" | "price-asc" | "price-desc" | "rating">("relevance");
  const [budgetTab, setBudgetTab] = useState<string>("all");

  // Mobile filter drawer state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // FAQ Accordion State
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Categories horizontal scroll ref & controls
  const categoriesScrollRef = useRef<HTMLDivElement>(null);
  const scrollCategories = (direction: "left" | "right") => {
    if (categoriesScrollRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      categoriesScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Live order social proof ticker
  const [recentOrderIndex, setRecentOrderIndex] = useState(0);
  const [showLiveOrderToast, setShowLiveOrderToast] = useState(true);

  const recentOrdersList = [
    { name: "Pooja S.", city: "Lucknow", item: "Kashvi Banarasi Silk Saree", time: "2 mins ago" },
    { name: "Amit K.", city: "Surat", item: "Bio-Washed Oversized Cotton Tee", time: "4 mins ago" },
    { name: "Sunita M.", city: "Jaipur", item: "Kundan Pearl Choker Set", time: "5 mins ago" },
    { name: "Vikas R.", city: "Pune", item: "Stretch Comfort Chino Trousers", time: "8 mins ago" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setRecentOrderIndex((prev) => (prev + 1) % recentOrdersList.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [recentOrdersList.length]);

  // Available Fabrics from products
  const fabrics = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => {
      if (p.fabric) set.add(p.fabric);
    });
    return Array.from(set);
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== "all" && p.category !== selectedCategory) {
        return false;
      }
      // Gender filter
      if (selectedGender !== "all" && p.gender && p.gender !== selectedGender) {
        return false;
      }
      // Budget Store Quick Tabs
      if (budgetTab === "under99" && p.price > 149) return false;
      if (budgetTab === "under199" && p.price > 199) return false;
      if (budgetTab === "under299" && p.price > 299) return false;
      if (budgetTab === "under499" && p.price > 499) return false;
      if (budgetTab === "deals" && !p.isDeal) return false;

      // Price slider
      if (p.price > selectedPriceMax) return false;

      // Rating filter
      if (selectedRating > 0 && p.rating < selectedRating) return false;

      // Fabric filter
      if (selectedFabric !== "all" && p.fabric !== selectedFabric) return false;

      // Discount filter
      if (selectedDiscountMin > 0 && p.originalPrice) {
        const discountPercent = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
        if (discountPercent < selectedDiscountMin) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // relevance / default
    });
  }, [
    selectedCategory,
    selectedGender,
    selectedPriceMax,
    selectedRating,
    selectedFabric,
    selectedDiscountMin,
    sortBy,
    budgetTab,
  ]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedGender("all");
    setSelectedPriceMax(1000);
    setSelectedRating(0);
    setSelectedFabric("all");
    setSelectedDiscountMin(0);
    setBudgetTab("all");
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedGender !== "all" ||
    selectedPriceMax < 1000 ||
    selectedRating > 0 ||
    selectedFabric !== "all" ||
    selectedDiscountMin > 0 ||
    budgetTab !== "all";

  const faqs = [
    {
      q: "Why are prices on Velora so low compared to typical malls?",
      a: "Velora connects customers directly with wholesale textile mills, craftsmen, and manufacturers in Surat, Jaipur, Tirupur, Panipat, and Agra without middlemen or retailer markups. You get genuine factory-direct wholesale pricing.",
    },
    {
      q: "Is Cash on Delivery (COD) available for all pin codes?",
      a: "Yes! 100% of products listed on Velora support Cash on Delivery (COD) across more than 28,000 pin codes. You only pay when the parcel arrives at your doorstep.",
    },
    {
      q: "What is Velora's Return & Refund policy?",
      a: "Velora provides a 7-day hassle-free return and exchange guarantee. If you receive an item with any defect, wrong size, or simply wish to return it, our courier will pick it up with instant 100% refund into your bank account or UPI.",
    },
    {
      q: "How can I sell my products as a Supplier on Velora?",
      a: "Any manufacturer or distributor with a GSTIN and bank account can become a supplier on Velora at 0% Commission. Click on 'Become a Supplier' to register within 5 minutes and reach millions of verified buyers.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 transition-colors">
      {/* 1. ULTRA-PREMIUM 3D FASHION HERO EXPERIENCE (Maison Vell Runway Lookbook + Wholesale Deals) */}
      <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 pt-3 sm:pt-4">
        {/* Luxury Hero Switcher Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 mb-2.5">
          <div className="inline-flex items-center p-1 bg-white dark:bg-[#151c2c] border border-gray-200/90 dark:border-gray-800 rounded-2xl sm:rounded-full shadow-2xs">
            <button
              onClick={() => setHeroMode("runway")}
              className={`px-3.5 py-1.5 rounded-xl sm:rounded-full text-[11px] sm:text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                heroMode === "runway"
                  ? "bg-[#16191f] text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Maison Vell Runway 3D</span>
              <span className="text-[9px] uppercase px-1.5 py-0.5 bg-amber-400/20 text-amber-300 rounded-full font-mono">
                Interactive
              </span>
            </button>

            <button
              onClick={() => setHeroMode("deals")}
              className={`px-3.5 py-1.5 rounded-xl sm:rounded-full text-[11px] sm:text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                heroMode === "deals"
                  ? "bg-[#681a72] text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-rose-300" />
              <span>Wholesale Deals & Offers</span>
            </button>
          </div>

          <Link
            href="/runway"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#681a72] dark:hover:text-[#c084fc] transition-colors"
          >
            <span>Open Fullscreen Runway (100svh)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Hero Experience */}
        {heroMode === "runway" ? (
          <MaisonVellHero standalone={false} />
        ) : (
          <HeroBanner3DSlider />
        )}
      </section>

      {/* 1. LUXURY WHOLESALE TRUST & ASSURANCE BAR */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 pt-5 pb-2">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-[#151c2c]/90 backdrop-blur-md border border-purple-100/70 dark:border-purple-900/40 shadow-xs hover:shadow-md hover:border-[#681a72]/40 transition-all duration-300 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-purple-100 to-fuchsia-50 dark:from-purple-950/60 dark:to-purple-900/40 text-[#681a72] dark:text-[#c084fc] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 dark:text-white truncate tracking-tight">Free Express Delivery</h4>
              <p className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 truncate mt-0.5">Zero minimum order fee</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-[#151c2c]/90 backdrop-blur-md border border-purple-100/70 dark:border-purple-900/40 shadow-xs hover:shadow-md hover:border-emerald-500/40 transition-all duration-300 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-50 dark:from-emerald-950/60 dark:to-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 dark:text-white truncate tracking-tight">Doorstep COD</h4>
              <p className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 truncate mt-0.5">Pay after order arrival</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-[#151c2c]/90 backdrop-blur-md border border-purple-100/70 dark:border-purple-900/40 shadow-xs hover:shadow-md hover:border-amber-500/40 transition-all duration-300 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-100 to-orange-50 dark:from-amber-950/60 dark:to-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 dark:text-white truncate tracking-tight">7 Days Easy Return</h4>
              <p className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 truncate mt-0.5">100% instant refund guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-[#151c2c]/90 backdrop-blur-md border border-purple-100/70 dark:border-purple-900/40 shadow-xs hover:shadow-md hover:border-rose-500/40 transition-all duration-300 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-rose-100 to-pink-50 dark:from-rose-950/60 dark:to-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 dark:text-white truncate tracking-tight">Mill-Direct Wholesale</h4>
              <p className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 truncate mt-0.5">Surat & Jaipur authentic hubs</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TOP CATEGORIES TO CHOOSE FROM (Luxury Carousel with Vogue-Style Story Rings) */}
      <section id="home-categories-section" className="max-w-7xl mx-auto px-3 sm:px-6 py-5 sm:py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-[#681a72] dark:text-[#c084fc] flex items-center gap-1.5 mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              CURATED COLLECTIONS
            </span>
            <h2 className="text-base sm:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Top Categories to Choose From
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Explore authentic wholesale apparel, ethnic luxury, and accessories
            </p>
          </div>
          <div className="flex items-center gap-2">
            {selectedCategory !== "all" && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-xs text-[#681a72] dark:text-[#c084fc] font-bold hover:underline cursor-pointer mr-2"
              >
                Clear Filter
              </button>
            )}
            {/* Desktop / Tablet Scroll Chevrons */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={() => scrollCategories("left")}
                aria-label="Scroll left"
                className="w-8 h-8 rounded-full bg-white dark:bg-[#151c2c] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center shadow-xs cursor-pointer active:scale-95 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollCategories("right")}
                aria-label="Scroll right"
                className="w-8 h-8 rounded-full bg-white dark:bg-[#151c2c] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center shadow-xs cursor-pointer active:scale-95 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Categories: Smooth Horizontal Carousel with Generous Sizing */}
        <div
          ref={categoriesScrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-none pb-3 px-1 -mx-1 snap-x scroll-smooth"
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(isSelected ? "all" : cat.name);
                  const el = document.getElementById("products-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`group relative flex flex-col items-center justify-between text-center p-3 sm:p-3.5 pb-3.5 sm:pb-4 rounded-2xl shrink-0 transition-all duration-300 snap-start cursor-pointer w-[110px] sm:w-[130px] min-h-[152px] sm:min-h-[172px] ${
                  isSelected
                    ? "bg-purple-100/90 dark:bg-purple-950/70 shadow-md ring-2 ring-[#681a72] dark:ring-[#c084fc] -translate-y-1"
                    : "bg-white/90 dark:bg-[#151c2c]/90 backdrop-blur-xs border border-purple-100/70 dark:border-purple-900/30 hover:bg-white dark:hover:bg-[#151c2c] hover:-translate-y-1.5 hover:shadow-lg hover:border-[#681a72]/30"
                }`}
              >
                {/* Vogue Story Ring Frame */}
                <div
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 mb-2.5 transition-all duration-300 group-hover:scale-108 group-hover:shadow-[0_8px_20px_rgba(104,26,114,0.22)] ${
                    isSelected
                      ? "bg-gradient-to-tr from-[#681a72] via-[#d946ef] to-amber-400 shadow-md"
                      : "bg-gradient-to-tr from-gray-200 via-gray-100 to-gray-300 dark:from-gray-700 dark:via-purple-900/40 dark:to-gray-800 group-hover:from-[#681a72] group-hover:via-rose-400 group-hover:to-amber-300"
                  }`}
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-900">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="80px"
                    />
                  </div>
                </div>
                <div className="w-full flex items-center justify-center min-h-[2.5rem] mt-auto">
                  <span
                    className={`text-[11px] sm:text-xs font-bold leading-tight line-clamp-2 text-center break-words px-1 transition-colors ${
                      isSelected
                        ? "text-[#681a72] dark:text-[#c084fc]"
                        : "text-gray-800 dark:text-gray-100 group-hover:text-[#681a72] dark:group-hover:text-[#c084fc]"
                    }`}
                  >
                    {cat.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. VALUE STORE CHIPS / BUDGET DEALS (Luxury Boutique Bar) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-3">
        <div className="bg-white/90 dark:bg-[#151c2c]/90 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-purple-100/80 dark:border-purple-900/40 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#681a72] to-rose-600 bg-clip-text text-transparent flex items-center gap-1.5">
              <Flame className="w-4 h-4 fill-rose-600 text-rose-600 animate-pulse" />
              VALUE BOUTIQUES:
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 sm:pb-0 -mx-1 px-1">
            {[
              { id: "all", label: "All Items" },
              { id: "under99", label: "Under ₹149 Store" },
              { id: "under199", label: "Under ₹199 Store" },
              { id: "under299", label: "Under ₹299 Store" },
              { id: "under499", label: "Under ₹499 Store" },
              { id: "deals", label: "⚡ Flat 70% Off" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setBudgetTab(tab.id)}
                className={`text-xs px-4 py-1.5 rounded-full font-bold whitespace-nowrap transition-all duration-200 active:scale-95 shrink-0 ${
                  budgetTab === tab.id
                    ? "bg-gradient-to-r from-[#681a72] via-[#86198f] to-[#be185d] text-white shadow-md shadow-purple-900/25 -translate-y-0.5"
                    : "bg-purple-50/50 dark:bg-gray-800/60 border border-purple-100/50 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-[#681a72] dark:hover:text-[#c084fc] hover:bg-white dark:hover:bg-gray-800 hover:-translate-y-0.5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MAIN "PRODUCTS FOR YOU" DISCOVERY FEED */}
      <section id="products-section" className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <div>
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-[#681a72] dark:text-[#c084fc] flex items-center gap-1.5 mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              CURATED WHOLESALE FEED
            </span>
            <h2 className="text-lg sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              Products For You
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Showing {filteredProducts.length} verified pieces direct from certified textile hubs
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#151c2c] border border-purple-100 dark:border-purple-900/40 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 shadow-xs cursor-pointer hover:border-[#681a72]/40"
            >
              <Filter className="w-3.5 h-3.5 text-[#681a72] dark:text-[#c084fc]" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-gray-500 dark:text-gray-400 hidden sm:inline font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white/90 dark:bg-[#151c2c]/90 border border-purple-100 dark:border-purple-900/50 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#681a72]/30 cursor-pointer shadow-2xs"
              >
                <option value="relevance">Popular Trends</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="rating">Top Rated Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2-Column Layout: Sidebar (Desktop) + Products Grid (Mobile 2 cols, Desktop 4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* DESKTOP FILTERS SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-3 bg-white/90 dark:bg-[#151c2c]/90 backdrop-blur-md border border-purple-100/70 dark:border-purple-900/30 rounded-2xl p-4.5 shadow-xs sticky top-24 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-purple-50 dark:border-purple-900/30">
              <span className="font-extrabold text-sm text-gray-900 dark:text-white flex items-center gap-1.5 tracking-tight">
                <Filter className="w-4 h-4 text-[#681a72] dark:text-[#c084fc]" />
                Filter Catalog
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#681a72] dark:text-[#c084fc] hover:underline font-bold cursor-pointer"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Filter 1: Category */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Category
              </p>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-none">
                <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#681a72]">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === "all"}
                    onChange={() => setSelectedCategory("all")}
                    className="accent-[#681a72]"
                  />
                  <span>All Categories</span>
                </label>
                {CATEGORIES.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#681a72]"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.name}
                      onChange={() => setSelectedCategory(cat.name)}
                      className="accent-[#681a72]"
                    />
                    <span className="truncate">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter 2: Gender */}
            <div className="pt-3 border-t border-purple-50 dark:border-purple-900/30">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Gender
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["all", "Women", "Men", "Kids"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      selectedGender === g
                        ? "bg-[#681a72] text-white shadow-xs"
                        : "bg-purple-50/50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100/60"
                    }`}
                  >
                    {g === "all" ? "All" : g}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 3: Max Price Slider */}
            <div className="pt-3 border-t border-purple-50 dark:border-purple-900/30">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Price Under
                </p>
                <span className="text-xs font-black text-[#681a72] dark:text-[#c084fc]">
                  ₹{selectedPriceMax}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={selectedPriceMax}
                onChange={(e) => setSelectedPriceMax(Number(e.target.value))}
                className="w-full accent-[#681a72] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>₹100</span>
                <span>₹500</span>
                <span>₹1000</span>
              </div>
            </div>

            {/* Filter 4: Customer Rating */}
            <div className="pt-3 border-t border-purple-50 dark:border-purple-900/30">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Rating
              </p>
              <div className="space-y-1.5">
                {[4, 3.5, 3].map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRating(selectedRating === r ? 0 : r)}
                    className={`flex items-center gap-2 text-xs w-full text-left py-1 px-2 rounded-lg transition-colors cursor-pointer ${
                      selectedRating === r
                        ? "bg-purple-50 dark:bg-purple-950/40 text-[#681a72] dark:text-[#c084fc] font-bold"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <div className="rating-pill">
                      <span>{r}</span>
                      <Star className="w-2.5 h-2.5 fill-white" />
                    </div>
                    <span>& above</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 5: Fabric */}
            {fabrics.length > 0 && (
              <div className="pt-3 border-t border-purple-50 dark:border-purple-900/30">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Fabric
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedFabric("all")}
                    className={`text-xs px-2.5 py-0.5 rounded-md font-medium cursor-pointer ${
                      selectedFabric === "all"
                        ? "bg-[#681a72] text-white font-bold"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    All
                  </button>
                  {fabrics.map((f) => (
                    <button
                      key={f}
                      onClick={() => setSelectedFabric(selectedFabric === f ? "all" : f)}
                      className={`text-xs px-2.5 py-0.5 rounded-md font-medium cursor-pointer ${
                        selectedFabric === f
                          ? "bg-[#681a72] text-white font-bold"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* MAIN PRODUCTS GRID (2 columns on mobile, 3 tablet, 4 desktop) */}
          <div className="col-span-1 lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white/90 dark:bg-[#151c2c]/90 backdrop-blur-md border border-purple-100/70 dark:border-purple-900/30 rounded-2xl p-12 text-center shadow-xs">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-1">
                  No products matched your filters
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Try clearing your filters or choosing a different price range.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-[#681a72] hover:bg-[#56135e] text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. BECOME A SUPPLIER / SELLER BANNER (Luxury Atelier Aesthetic) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-5 sm:py-7">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#0b0f19] via-[#1c0e2c] to-[#0b0f19] text-white p-6 sm:p-10 border border-purple-900/50 shadow-2xl">
          {/* Subtle ambient light spot */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#681a72]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center gap-6">
            <div className="md:col-span-8 space-y-3">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-rose-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                VELORA ATELIER & PARTNER NETWORK
              </span>
              <h3 className="text-xl sm:text-3xl font-black tracking-tight">
                Grow Your Business with 0% Commission
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
                Connect directly with millions of fashion & lifestyle shoppers across 28,000+ pin codes. Enjoy guaranteed 7-day payment cycles, free cataloging support, and zero penalty on returns.
              </p>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs text-gray-200">
                <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/10">
                  <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                  <span className="font-semibold">0% Commission</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/10">
                  <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                  <span className="font-semibold">7-Day Direct Payout</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/10">
                  <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                  <span className="font-semibold">Doorstep Mill Pickup</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 flex md:justify-end">
              <Link
                href="/admin"
                className="w-full sm:w-auto text-center px-7 py-3.5 bg-gradient-to-r from-[#681a72] via-[#9333ea] to-[#e11d48] hover:shadow-[0_8px_25px_rgba(225,29,72,0.35)] text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <span>Start Selling on Velora</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DOWNLOAD VELORA APP PROMOTION */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-6">
        <div className="bg-gradient-to-br from-purple-50/90 via-pink-50/40 to-white dark:from-[#151c2c] dark:to-[#1a0f2e] border border-purple-100/90 dark:border-purple-900/40 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 sm:gap-8">
            <div className="md:col-span-8 space-y-3">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-[#681a72] dark:text-[#c084fc] flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" />
                MOBILE FIRST LUXURY SHOPPING
              </span>
              <h3 className="text-xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                Download the Velora Shopping App
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
                Enjoy exclusive app-only flash deals, daily spin rewards, live package tracking, and 15% extra discount on your first order.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-black hover:bg-gray-900 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-transform active:scale-95"
                >
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>Google Play (4.8 ★)</span>
                </a>
                <a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-black hover:bg-gray-900 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-transform active:scale-95"
                >
                  <Smartphone className="w-4 h-4 text-white" />
                  <span>App Store (4.9 ★)</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-center">
              <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-md border border-purple-100 dark:border-gray-800 text-center">
                <QrCode className="w-24 h-24 sm:w-28 sm:h-28 text-[#681a72] mx-auto mb-2" />
                <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">
                  Scan QR to Install
                </p>
                <p className="text-[10px] text-gray-400">Instant Android & iOS</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-5 sm:py-7">
        <div className="bg-white/90 dark:bg-[#151c2c]/90 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-purple-100/80 dark:border-purple-900/30 p-6 sm:p-10 shadow-xs">
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-[#681a72] dark:text-[#c084fc] flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            HELP & ASSURANCE
          </span>
          <h3 className="text-base sm:text-2xl font-black text-gray-900 dark:text-white mb-1 tracking-tight">
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-gray-500 mb-6">
            Everything you need to know about wholesale pricing, direct delivery, returns, and selling on Velora
          </p>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="border border-purple-50 dark:border-purple-900/30 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full text-left p-4 flex items-center justify-between text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 hover:bg-purple-50/40 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        isOpen ? "rotate-180 text-[#681a72] dark:text-[#c084fc]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-gray-600 dark:text-gray-400 leading-relaxed border-t border-purple-50 dark:border-purple-900/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Luxury Concierge Help Strip */}
          <div className="mt-6 pt-5 border-t border-purple-50 dark:border-purple-900/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <span>Still have questions regarding fabric, sizing, or bulk manufacturer pricing?</span>
            <Link
              href="/support"
              className="font-bold text-[#681a72] dark:text-[#c084fc] hover:underline flex items-center gap-1"
            >
              <span>Connect with 24/7 Concierge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile Filter Slide-Over Sheet */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-4/5 max-w-xs bg-white dark:bg-[#1e293b] h-full shadow-2xl flex flex-col z-10 p-5 overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800 mb-4">
              <span className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-[#681a72]" />
                Filter Products
              </span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="mb-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Category</p>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-800 text-gray-800 dark:text-gray-200 outline-none"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Price */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Price Limit
                </p>
                <span className="text-xs font-bold text-[#681a72]">₹{selectedPriceMax}</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={selectedPriceMax}
                onChange={(e) => setSelectedPriceMax(Number(e.target.value))}
                className="w-full accent-[#681a72]"
              />
            </div>

            {/* Mobile Rating */}
            <div className="mb-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Minimum Rating</p>
              <div className="flex gap-2">
                {[0, 4, 3.5].map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRating(r)}
                    className={`flex-1 py-1.5 text-xs rounded-lg font-bold border cursor-pointer ${
                      selectedRating === r
                        ? "bg-[#681a72] text-white border-[#681a72]"
                        : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {r === 0 ? "All" : `${r}★+`}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-4 flex gap-2">
              <button
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="flex-1 py-2.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-[#681a72] text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MEESHO-STYLE LIVE ORDER NOTIFICATION TOAST (Desktop Social Proof - Positioned on bottom-right to never clash with Lookbook) */}
      {showLiveOrderToast && (
        <div className="hidden lg:flex fixed bottom-6 right-6 z-40 bg-white/95 dark:bg-[#151c2c]/95 backdrop-blur-md border border-purple-100/90 dark:border-purple-900/50 p-3.5 rounded-2xl shadow-2xl items-center gap-3 animate-in fade-in slide-in-from-bottom-2 max-w-sm">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-50 dark:from-emerald-950/60 dark:to-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-2xs">
            <ShoppingBag className="w-4.5 h-4.5 stroke-[2.2]" />
          </div>
          <div className="min-w-0 pr-2">
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              <span className="font-bold text-gray-900 dark:text-white">
                {recentOrdersList[recentOrderIndex].name}
              </span>{" "}
              from {recentOrdersList[recentOrderIndex].city} just bought:
            </p>
            <p className="text-xs font-extrabold text-[#681a72] dark:text-[#c084fc] truncate">
              {recentOrdersList[recentOrderIndex].item}
            </p>
            <span className="text-[9px] text-gray-400 font-medium">
              Verified Wholesale Order • {recentOrdersList[recentOrderIndex].time}
            </span>
          </div>
          <button
            onClick={() => setShowLiveOrderToast(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-md cursor-pointer"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
