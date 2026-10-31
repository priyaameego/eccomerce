"use client";

import React, { useState, useMemo } from "react";
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
  ShoppingBag,
  Flame,
  X,
} from "lucide-react";
import { PRODUCTS, CATEGORIES, Product } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import HeroBanner3DSlider from "./HeroBanner3DSlider";

export default function MeeshoHomeClient() {
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
      {/* 1. 3D ANIMATED HERO BANNER SLIDER (4 High-Definition Wholesale Slides) */}
      <HeroBanner3DSlider />

      {/* 2. TOP CATEGORIES TO CHOOSE FROM (Mobile swipeable horizontal slider) */}
      <section id="home-categories-section" className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base sm:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Top Categories to Choose From
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-400 mt-0.5">
              Explore authentic Indian wholesale trends from verified textile hubs
            </p>
          </div>
          {selectedCategory !== "all" && (
            <button
              onClick={() => setSelectedCategory("all")}
              className="text-xs text-[#681a72] dark:text-[#c084fc] font-bold hover:underline cursor-pointer"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Categories: Horizontal Swipe on Mobile, Grid on Desktop with 3D Float */}
        <div className="flex sm:grid sm:grid-cols-5 md:grid-cols-9 gap-3 sm:gap-4 overflow-x-auto scrollbar-none pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 snap-x">
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
                className={`flex flex-col items-center group text-center p-2 rounded-2xl shrink-0 sm:shrink transition-all duration-300 snap-start cursor-pointer ${
                  isSelected
                    ? "bg-purple-100/90 dark:bg-purple-950/60 shadow-md ring-2 ring-[#681a72] dark:ring-[#c084fc] -translate-y-1"
                    : "bg-white/80 dark:bg-[#151c2c]/80 border border-gray-200/70 dark:border-gray-800 hover:bg-white dark:hover:bg-[#151c2c] hover:-translate-y-1.5 hover:shadow-lg"
                }`}
              >
                <div
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-2 shadow-md border-2 transition-all duration-300 group-hover:scale-108 group-hover:shadow-[0_8px_20px_rgba(104,26,114,0.25)] ${
                    isSelected ? "border-[#681a72] dark:border-[#c084fc]" : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="80px"
                  />
                </div>
                <span
                  className={`text-[11px] sm:text-xs font-semibold leading-tight w-18 sm:w-auto truncate transition-colors ${
                    isSelected
                      ? "text-[#681a72] dark:text-[#c084fc] font-bold"
                      : "text-gray-800 dark:text-gray-100 group-hover:text-[#681a72] dark:group-hover:text-[#c084fc]"
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. VALUE STORE CHIPS / BUDGET DEALS (Mobile Horizontal Scroll) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-3">
        <div className="bg-white dark:bg-[#151c2c] p-3 sm:p-4 rounded-2xl border border-gray-200/90 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#681a72] dark:text-[#c084fc] flex items-center gap-1">
              <Flame className="w-4 h-4 fill-rose-600 text-rose-600 animate-pulse" />
              Budget Stores:
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
                className={`text-xs px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all duration-200 active:scale-95 shrink-0 ${
                  budgetTab === tab.id
                    ? "bg-gradient-to-r from-[#681a72] to-[#8b1874] text-white shadow-md -translate-y-0.5"
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-purple-50 hover:text-[#681a72] text-gray-700 dark:text-gray-300 hover:-translate-y-0.5"
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
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
              Products For You
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-400">
              Showing {filteredProducts.length} items from verified manufacturers
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#151c2c] border border-gray-300 dark:border-gray-700 rounded-lg text-xs font-semibold text-gray-800 dark:text-gray-200 shadow-xs cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5 text-[#681a72] dark:text-[#c084fc]" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-gray-500 dark:text-gray-400 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white dark:bg-[#151c2c] border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1.5 text-xs text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#681a72]"
              >
                <option value="relevance">Popular</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2-Column Layout: Sidebar (Desktop) + Products Grid (Mobile 2 cols, Desktop 4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* DESKTOP FILTERS SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-3 bg-white dark:bg-[#151c2c] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-xs sticky top-24 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <span className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-[#681a72]" />
                Filters
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#681a72] dark:text-[#c084fc] hover:underline font-bold"
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
                <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 cursor-pointer">
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
                    className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 cursor-pointer"
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
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Gender
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["all", "Women", "Men", "Kids"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                      selectedGender === g
                        ? "bg-[#681a72] text-white font-bold"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    {g === "all" ? "All" : g}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 3: Max Price Slider */}
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Price Under
                </p>
                <span className="text-xs font-bold text-[#681a72] dark:text-[#c084fc]">
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
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Rating
              </p>
              <div className="space-y-1.5">
                {[4, 3.5, 3].map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRating(selectedRating === r ? 0 : r)}
                    className={`flex items-center gap-2 text-xs w-full text-left py-1 px-2 rounded-md transition-colors ${
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
              <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Fabric
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedFabric("all")}
                    className={`text-xs px-2 py-0.5 rounded-md ${
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
                      className={`text-xs px-2 py-0.5 rounded-md ${
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
              <div className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 rounded-2xl p-12 text-center">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-1">
                  No products matched your filters
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Try clearing your filters or choosing a different price range.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-[#681a72] hover:bg-[#56135e] text-white text-xs font-semibold rounded-lg transition-colors"
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

      {/* 5. BECOME A SUPPLIER / SELLER BANNER */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white p-5 sm:p-10 border border-purple-900/40">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6">
            <div className="md:col-span-8 space-y-2.5 sm:space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Sell Online With Velora
              </span>
              <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight">
                Grow Your Business with 0% Commission
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
                Connect directly with millions of shoppers across 28,000+ pin codes. Enjoy 7-day payment cycles, free cataloging assistance, and 0 penalty on returns.
              </p>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs text-gray-300">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>0% Commission</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>7-Day Secure Payout</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Doorstep Pickup</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 flex md:justify-end">
              <Link
                href="/admin"
                className="w-full sm:w-auto text-center px-6 py-3 bg-gradient-to-r from-[#681a72] to-[#e11d48] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
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
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-[#1e293b] dark:to-purple-950/20 border border-purple-100 dark:border-purple-900/40 rounded-2xl sm:rounded-3xl p-5 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 sm:gap-8">
            <div className="md:col-span-8 space-y-2.5 sm:space-y-3">
              <span className="text-[11px] sm:text-xs font-bold text-[#681a72] dark:text-[#c084fc] uppercase tracking-wider">
                Mobile First Experience
              </span>
              <h3 className="text-xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                Download the Velora App
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-lg">
                Enjoy exclusive app-only flash deals, daily spin coins, live package delivery notifications, and 15% extra discount on your first order.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 sm:px-5 py-2.5 bg-black text-white text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-gray-900 transition-colors"
                >
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>Google Play (4.8 ★)</span>
                </a>
                <a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 sm:px-5 py-2.5 bg-black text-white text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-gray-900 transition-colors"
                >
                  <Smartphone className="w-4 h-4 text-white" />
                  <span>App Store</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-center">
              <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 text-center">
                <QrCode className="w-24 h-24 sm:w-28 sm:h-28 text-[#681a72] mx-auto mb-2" />
                <p className="text-[11px] font-bold text-gray-800 dark:text-gray-200">
                  Scan QR to install
                </p>
                <p className="text-[10px] text-gray-400">Android & iOS</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-gray-800 p-5 sm:p-10 shadow-xs">
          <h3 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-gray-500 mb-5">
            Everything you need to know about shopping & selling on Velora
          </p>

          <div className="space-y-2.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full text-left p-3.5 sm:p-4 flex items-center justify-between text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        isOpen ? "rotate-180 text-[#681a72]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-3.5 sm:p-4 pt-0 text-xs text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-50 dark:border-gray-800/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
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
                className="p-1 rounded-full text-gray-400 hover:text-black"
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
                    className={`flex-1 py-1.5 text-xs rounded-lg font-bold border ${
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
                className="flex-1 py-2.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-[#681a72] text-white text-xs font-bold rounded-xl shadow-sm"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
