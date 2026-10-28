"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Heart,
  Smartphone,
  User,
  Menu,
  X,
  Package,
  QrCode,
  Sparkles,
  Sun,
  Moon,
  ArrowRight,
  Flame,
  Store,
  ChevronDown,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { usePreferencesStore } from "@/store/usePreferencesStore";
import { useAuthStore } from "@/store/useAuthStore";
import { CATEGORIES } from "@/data/products";
import MegaMenu from "./MegaMenu";

const ROTATING_SEARCH_HINTS = [
  "Try Banarasi Silk Sarees Under ₹299...",
  "Try Pure Cotton Printed Kurti Sets...",
  "Try 240 GSM Oversized Graphic T-Shirts...",
  "Try 3D Cotton Double Bedsheets...",
  "Try Bluetooth Calling Smartwatches...",
  "Try ANC True Wireless Earbuds...",
  "Try Non-Stick Granite Cookware 3pc Set...",
  "Try Kolhapuri Handcrafted Leather Chappals...",
  "Try 99% Pure Organic Aloe Vera Gel...",
];

export default function Navbar() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [downloadAppOpen, setDownloadAppOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);

  const totalCartCount = useCartStore((s) => s.getTotalItemsCount());
  const openCart = useCartStore((s) => s.openCart);
  const wishlistCount = useWishlistStore((s) => s.items.length);

  const isDarkMode = usePreferencesStore((s) => s.isDarkMode);
  const toggleTheme = usePreferencesStore((s) => s.toggleTheme);
  const setSearchOpen = usePreferencesStore((s) => s.setSearchOpen);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Rotating placeholder interval
  useEffect(() => {
    const interval = setInterval(() => {
      setHintIndex((prev) => (prev + 1) % ROTATING_SEARCH_HINTS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  const popularSearches = [
    "Saree",
    "Kurti Set",
    "Cotton Shirts",
    "Sneakers",
    "Double Bedsheet",
    "Smart Watch",
    "Earbuds",
    "Denim Jeans",
    "Jhumkas",
    "Granite Cookware",
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchInput.trim())}`);
      setSearchFocused(false);
    }
  };

  const handlePopularSearchClick = (term: string) => {
    setSearchInput(term);
    router.push(`/shop?q=${encodeURIComponent(term)}`);
    setSearchFocused(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 left-0 right-0 z-40 glass-nav-3d transition-colors">
      {/* 3D Animated Top Color Shift Strip */}
      <div className="h-[2.5px] w-full bg-gradient-to-r from-[#681a72] via-[#e11d48] to-[#059669] animate-gradient-shift" />

      {/* 1. TOP MAIN HEADER */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-6">
        {/* Left: Mobile Menu Trigger & Velora 3D Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden text-gray-700 dark:text-gray-300 transition-transform active:scale-95"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Velora Premium Wordmark Logo with 3D Tilt */}
          <Link
            href="/"
            className="flex items-center gap-1 group transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <span className="text-2xl sm:text-3xl font-black tracking-tight velora-gradient-text font-sans drop-shadow-xs">
              velora
            </span>
            <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-[#e11d48] to-[#f43f5e] shadow-[0_0_10px_#e11d48] self-baseline mt-2 animate-pulse hidden sm:inline-block" />
          </Link>
        </div>

        {/* Center: 3D Sculpted Search Bar with Animated Rotating Hints (Desktop / Tablet) */}
        <div ref={searchContainerRef} className="flex-1 max-w-xl relative hidden sm:block">
          <form
            onSubmit={handleSearchSubmit}
            className={`flex items-center w-full bg-gray-50/90 dark:bg-gray-800/90 border rounded-2xl px-3.5 py-2.5 transition-all duration-300 ${
              searchFocused
                ? "border-[#681a72] dark:border-[#c084fc] ring-3 ring-purple-100 dark:ring-purple-900/40 bg-white dark:bg-gray-900 shadow-[0_8px_25px_-5px_rgba(104,26,114,0.18)]"
                : "border-gray-200/90 dark:border-gray-700/80 hover:border-purple-300 dark:hover:border-purple-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)]"
            }`}
          >
            <Search className="w-4 h-4 text-purple-600 dark:text-purple-400 mr-2.5 shrink-0 transition-transform group-hover:scale-110" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder={ROTATING_SEARCH_HINTS[hintIndex]}
              className="w-full bg-transparent border-none text-xs sm:text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none transition-all"
            />
            {searchInput ? (
              <button
                type="button"
                onClick={() => setSearchInput("")}
                className="text-gray-400 hover:text-gray-600 p-0.5 transition-transform hover:scale-110"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="hidden lg:flex items-center gap-1 text-[10px] font-mono text-gray-400 bg-gray-100 dark:bg-gray-700/80 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-600 shadow-2xs hover:text-[#681a72]"
              >
                ⌘K
              </button>
            )}
          </form>

          {/* Search Dropdown on Focus */}
          {searchFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1a2234] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in duration-150">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2.5 pb-2 border-b border-gray-100 dark:border-gray-800">
                <span className="font-bold text-gray-800 dark:text-gray-200">
                  Popular Wholesale Searches
                </span>
                <span className="text-[11px] text-[#e11d48] flex items-center gap-1 font-semibold">
                  <Flame className="w-3.5 h-3.5 fill-[#e11d48] animate-pulse" /> Trending Now
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handlePopularSearchClick(term)}
                    className="text-xs px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-purple-50 hover:text-[#681a72] dark:hover:bg-purple-950/40 text-gray-700 dark:text-gray-300 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs flex items-center gap-1.5"
                  >
                    <Search className="w-3 h-3 text-gray-400" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: 3D Animated Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4 text-gray-700 dark:text-gray-200 text-xs font-medium">
          {/* Download App Popover */}
          <div
            className="relative hidden lg:block"
            onMouseEnter={() => setDownloadAppOpen(true)}
            onMouseLeave={() => setDownloadAppOpen(false)}
          >
            <button className="flex items-center gap-1.5 hover:text-[#681a72] dark:hover:text-[#c084fc] py-2 px-2 rounded-lg hover:bg-purple-50/50 dark:hover:bg-purple-950/20 transition-all duration-200 hover:-translate-y-0.5">
              <Smartphone className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Download App</span>
            </button>

            {downloadAppOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-64 bg-white dark:bg-[#1a2234] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in duration-150">
                <p className="font-bold text-gray-900 dark:text-white text-xs mb-1">
                  Download Velora Mobile App
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-3">
                  Scan QR code for app-exclusive wholesale deals & fast SMS updates
                </p>
                <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl flex items-center justify-center mb-3 border border-purple-100 dark:border-purple-900/40 shadow-inner">
                  <QrCode className="w-24 h-24 text-[#681a72] dark:text-[#c084fc]" />
                </div>
                <div className="space-y-1.5">
                  <a
                    href="https://play.google.com/store"
                    target="_blank"
                    rel="noreferrer"
                    className="block text-center text-[11px] font-semibold py-2 rounded-lg bg-gray-900 text-white hover:bg-black transition-transform active:scale-95 shadow-xs"
                  >
                    Get on Google Play
                  </a>
                  <a
                    href="https://www.apple.com/app-store/"
                    target="_blank"
                    rel="noreferrer"
                    className="block text-center text-[11px] font-semibold py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 transition-transform active:scale-95 shadow-xs"
                  >
                    Apple App Store
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Become a Supplier 3D Pill */}
          <Link
            href="/admin"
            className="hidden md:flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold hover:scale-105 active:scale-95 transition-all shadow-2xs"
          >
            <Store className="w-3.5 h-3.5" />
            <span>0% Commission Supplier</span>
          </Link>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shadow-2xs"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Wishlist Link (Desktop) with 3D Floating Count */}
          <Link
            href="/wishlist"
            className="relative hidden sm:flex flex-col items-center hover:text-[#681a72] dark:hover:text-[#c084fc] transition-all duration-200 hover:-translate-y-0.5 py-1 px-1.5"
            aria-label="Wishlist"
          >
            <div className="relative">
              <Heart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-[#e11d48] to-[#f43f5e] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-[0_2px_8px_rgba(225,29,72,0.5)] animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="text-[11px] mt-0.5 font-medium">Wishlist</span>
          </Link>

          {/* Profile Popover with 3D Card */}
          <div
            className="relative hidden sm:block"
            onMouseEnter={() => setProfileDropdownOpen(true)}
            onMouseLeave={() => setProfileDropdownOpen(false)}
          >
            <Link
              href="/account"
              className="flex flex-col items-center hover:text-[#681a72] dark:hover:text-[#c084fc] transition-all duration-200 hover:-translate-y-0.5 py-1 px-1.5"
            >
              <div className="w-5 h-5 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </div>
              <span className="text-[11px] mt-0.5 font-medium">
                {mounted && user ? user.name.split(" ")[0] : "Profile"}
              </span>
            </Link>

            {profileDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-60 bg-white dark:bg-[#1a2234] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in duration-150">
                <div className="pb-3 border-b border-gray-100 dark:border-gray-800 mb-3">
                  <p className="font-bold text-gray-900 dark:text-white text-xs">
                    {mounted && user ? `Hello, ${user.name}` : "Welcome to Velora"}
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                    {mounted && user ? `${user.phone}` : "Wholesale Prices, Designer Quality"}
                  </p>
                  <Link
                    href="/account"
                    className="mt-2.5 block text-center py-2 bg-gradient-to-r from-[#681a72] to-[#8b1874] text-white text-xs font-semibold rounded-xl shadow-md hover:opacity-95 transition-transform active:scale-95"
                  >
                    {mounted && user ? "View Dashboard" : "Sign Up / Log In with OTP"}
                  </Link>
                </div>

                <div className="space-y-1.5 text-xs">
                  <Link
                    href="/account"
                    className="flex items-center gap-2.5 text-gray-700 dark:text-gray-300 hover:text-[#681a72] py-1.5 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <Package className="w-4 h-4 text-gray-400" />
                    <span>My Orders</span>
                  </Link>
                  <Link
                    href="/wishlist"
                    className="flex items-center gap-2.5 text-gray-700 dark:text-gray-300 hover:text-[#681a72] py-1.5 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <Heart className="w-4 h-4 text-gray-400" />
                    <span>My Wishlist ({wishlistCount})</span>
                  </Link>
                  <Link
                    href="/faq"
                    className="flex items-center gap-2.5 text-gray-700 dark:text-gray-300 hover:text-[#681a72] py-1.5 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-gray-400" />
                    <span>Help & 7-Day Returns</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Cart Icon with 3D Glowing Pill */}
          <button
            onClick={openCart}
            className="relative flex flex-col items-center hover:text-[#681a72] dark:hover:text-[#c084fc] transition-all duration-200 hover:-translate-y-0.5 py-1 px-1.5 cursor-pointer"
            aria-label="View Cart"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-[#681a72] to-[#e11d48] text-white text-[9px] font-bold rounded-full min-w-4 h-4 px-1 flex items-center justify-center shadow-[0_2px_10px_rgba(225,29,72,0.5)] animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-[11px] mt-0.5 font-medium">Cart</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Row (Always visible and accessible on mobile) */}
      <div className="px-3 pb-2.5 sm:hidden">
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center w-full bg-gray-100 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 shadow-xs"
        >
          <Search className="w-4 h-4 text-purple-600 dark:text-purple-400 mr-2 shrink-0" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={ROTATING_SEARCH_HINTS[hintIndex]}
            className="w-full bg-transparent border-none text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => setSearchInput("")}
              className="text-gray-400 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>
      </div>

      {/* 2. SECONDARY CATEGORY MEGA NAVIGATION BAR (Desktop) */}
      <nav className="border-t border-purple-100/60 dark:border-purple-950/40 hidden lg:block bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 relative">
          <ul className="flex items-center justify-between text-xs font-normal text-gray-700 dark:text-gray-300 py-1">
            {CATEGORIES.map((cat) => (
              <li
                key={cat.id}
                onMouseEnter={() => setHoveredCategory(cat.name)}
                className={`py-2 px-3 category-pill-3d border-b-2 transition-all cursor-pointer group ${
                  hoveredCategory === cat.name
                    ? "border-[#681a72] text-[#681a72] dark:border-[#c084fc] dark:text-[#c084fc] font-bold"
                    : "border-transparent hover:border-[#681a72]/40"
                }`}
              >
                <Link
                  href={`/shop?category=${encodeURIComponent(cat.name)}`}
                  className="font-medium whitespace-nowrap block"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Interactive Hover Mega Menu Dropdown */}
          <MegaMenu
            isOpen={hoveredCategory !== null}
            activeCategory={hoveredCategory || "Women Ethnic"}
            onClose={() => setHoveredCategory(null)}
          />
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white dark:bg-[#1a2234] h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-purple-50/70 dark:bg-purple-950/30">
              <span className="text-2xl font-black velora-gradient-text">
                velora
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full text-gray-500 hover:text-black dark:text-gray-400"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Login / Welcome Banner */}
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/40 dark:to-pink-950/30 border-b border-purple-100 dark:border-purple-900/30">
              <p className="text-xs font-bold text-gray-900 dark:text-white">
                {mounted && user ? `Welcome, ${user.name}!` : "Welcome to Velora"}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                Wholesale Prices & Free Delivery Across India
              </p>
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 block text-center py-2 bg-[#681a72] text-white text-xs font-bold rounded-xl shadow-md"
              >
                {mounted && user ? "My Account" : "Log In with Mobile OTP"}
              </Link>
            </div>

            {/* Department Links */}
            <div className="p-4 space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Shop By Department
              </p>
              {CATEGORIES.map((c) => (
                <Link
                  key={c.id}
                  href={`/shop?category=${encodeURIComponent(c.name)}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 text-xs text-gray-800 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-950/40 rounded-xl transition-colors font-medium"
                >
                  <span>{c.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                </Link>
              ))}

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 mt-4 space-y-1">
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 rounded-xl"
                >
                  <Store className="w-4 h-4 text-emerald-600" />
                  <span>Become a Supplier (0% Commission)</span>
                </Link>
                <Link
                  href="/faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-50 rounded-xl"
                >
                  Help Center & 7-Day Returns
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}