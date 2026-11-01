"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Package,
  Store,
  LifeBuoy,
  LogOut,
  Sun,
  Moon,
  ShieldCheck,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { usePreferencesStore } from "@/store/usePreferencesStore";
import { useAuthStore } from "@/store/useAuthStore";
import { CATEGORIES } from "@/data/products";
import MegaMenu from "./MegaMenu";

export default function Navbar() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const totalCartCount = useCartStore((s) => s.getTotalItemsCount());
  const openCart = useCartStore((s) => s.openCart);
  const wishlistCount = useWishlistStore((s) => s.items.length);

  const isDarkMode = usePreferencesStore((s) => s.isDarkMode);
  const toggleTheme = usePreferencesStore((s) => s.toggleTheme);
  const setAuthModalOpen = usePreferencesStore((s) => s.setAuthModalOpen);

  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    setMounted(true);
  }, []);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchInput.trim())}`);
      setSearchFocused(false);
    }
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
    <header className="sticky top-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800 transition-colors">
      {/* 1. TOP MAIN HEADER BAR (Velora Luxury Layout) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-3 sm:gap-6">
        {/* Left: Mobile Menu Trigger & Velora Luxury Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden text-gray-700 dark:text-gray-300"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Velora Luxury Monogram Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-gray-900 via-[#681a72] to-[#9333ea] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="font-serif font-black text-lg tracking-wider text-amber-200">V</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-950 dark:text-white uppercase font-sans">
                VELORA
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-widest uppercase font-semibold text-gray-500 dark:text-gray-400 -mt-1 hidden sm:block">
                Luxury Fashion & Lifestyle
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Search Bar ("Search for items...") */}
        <div ref={searchContainerRef} className="flex-1 max-w-xl relative hidden md:block">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center w-full bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 shadow-xs focus-within:border-gray-900 dark:focus-within:border-[#c084fc] focus-within:ring-2 focus-within:ring-black/10 dark:focus-within:ring-purple-900/30 transition-all"
          >
            <Search className="w-4 h-4 text-gray-400 mr-2.5 shrink-0" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for luxury sarees, streetwear, jewellery..."
              className="w-full bg-transparent border-none text-xs sm:text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput("")}
                className="text-gray-400 hover:text-gray-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>

        {/* Right Navigation Links (Admin, Seller Hub, Support, Become a Partner, LOGIN, Cart) */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-5 text-gray-700 dark:text-gray-200 text-xs font-semibold">
          {/* Admin Link */}
          <Link
            href="/admin"
            className="hidden sm:inline-block hover:text-[#681a72] dark:hover:text-[#c084fc] transition-colors py-1"
          >
            Admin
          </Link>

          {/* Already a Seller Link */}
          <Link
            href="/seller"
            className="hidden lg:inline-block hover:text-[#681a72] dark:hover:text-[#c084fc] transition-colors py-1"
          >
            Already a Seller?
          </Link>

          {/* Support Link */}
          <Link
            href="/support"
            className="hidden sm:inline-block hover:text-[#681a72] dark:hover:text-[#c084fc] transition-colors py-1"
          >
            Support
          </Link>

          {/* Become a Partner Button */}
          <Link
            href="/seller"
            className="hidden xl:inline-flex items-center px-4 py-1.5 rounded-full border border-gray-900 dark:border-gray-200 text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-xs font-bold shadow-2xs"
          >
            Become a Partner
          </Link>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Account / LOGIN Button */}
          {mounted && user ? (
            <div
              className="relative"
              onMouseEnter={() => setProfileDropdownOpen(true)}
              onMouseLeave={() => setProfileDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-[#681a72] text-white flex items-center justify-center text-[10px]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[80px] truncate">{user.name.split(" ")[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-56 bg-white dark:bg-[#1a2234] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in">
                  <div className="pb-2.5 border-b border-gray-100 dark:border-gray-800 mb-2">
                    <p className="font-bold text-xs text-gray-900 dark:text-white">{user.name}</p>
                    <p className="text-[10px] text-gray-500 uppercase font-mono">{user.role}</p>
                  </div>

                  <div className="space-y-1 text-xs">
                    <Link
                      href="/account"
                      className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      <Package className="w-4 h-4 text-gray-400" />
                      <span>My Orders</span>
                    </Link>

                    {(user.role === "admin" || user.role === "supplier") && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-950/40 text-[#681a72] dark:text-[#c084fc] font-semibold"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    <button
                      onClick={() => logout()}
                      className="w-full flex items-center gap-2 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-left font-semibold cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-5 py-2 bg-gray-950 hover:bg-black text-white font-black text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              LOGIN
            </button>
          )}

          {/* Cart Icon with Velora Luxury Badge */}
          <button
            onClick={openCart}
            className="relative p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#681a72] text-white text-[10px] font-black rounded-full min-w-5 h-5 px-1 flex items-center justify-center shadow-sm">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Row */}
      <div className="px-4 pb-2.5 md:hidden">
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 shadow-xs"
        >
          <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products..."
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

      {/* Secondary Categories Mega Bar */}
      <nav className="border-t border-gray-100 dark:border-gray-800 hidden lg:block bg-white dark:bg-[#0b0f19] transition-colors">
        <div className="max-w-7xl mx-auto px-6 relative">
          <ul className="flex items-center justify-between text-xs py-1">
            {CATEGORIES.map((cat) => (
              <li
                key={cat.id}
                onMouseEnter={() => setHoveredCategory(cat.name)}
                className={`py-2 px-3 border-b-2 transition-all cursor-pointer group ${
                  hoveredCategory === cat.name
                    ? "border-gray-950 text-gray-950 dark:border-[#c084fc] dark:text-[#c084fc] font-bold"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <Link
                  href={`/shop?category=${encodeURIComponent(cat.name)}`}
                  className="font-semibold text-gray-800 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white whitespace-nowrap block transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>

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
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-purple-50/50 dark:bg-purple-950/20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center font-serif font-black text-amber-300">
                  V
                </div>
                <span className="text-xl font-black text-gray-900 dark:text-white">VELORA</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full text-gray-500 hover:text-black dark:text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Links */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 space-y-2">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200 py-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-[#681a72]" />
                <span>Admin Hub</span>
              </Link>
              <Link
                href="/seller"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200 py-1.5"
              >
                <Store className="w-4 h-4 text-[#681a72]" />
                <span>Seller Hub / Partner Portal</span>
              </Link>
              <Link
                href="/support"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200 py-1.5"
              >
                <LifeBuoy className="w-4 h-4 text-[#681a72]" />
                <span>Customer Support</span>
              </Link>
            </div>

            {/* Categories List */}
            <div className="p-4 flex-1">
              <h3 className="text-xs uppercase font-bold text-gray-400 mb-2">Categories</h3>
              <ul className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/shop?category=${encodeURIComponent(cat.name)}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-black py-1"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
