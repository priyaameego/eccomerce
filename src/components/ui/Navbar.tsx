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
  ChevronRight,
  Sparkles,
  ArrowRight,
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
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
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
    <>
      <header className="sticky top-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800 transform-gpu [transform:translate3d(0,0,0)] [backface-visibility:hidden] will-change-transform">
      {/* 1. TOP MAIN HEADER BAR (Velora Luxury Layout) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-3.5 flex items-center justify-between gap-2.5 sm:gap-6">
        {/* Left: Mobile Menu Trigger & Velora Luxury Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Prominent High-Contrast Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 lg:hidden text-gray-900 dark:text-white shrink-0 shadow-2xs flex items-center justify-center cursor-pointer active:scale-95 border border-gray-200/90 dark:border-gray-700 transition-all"
            aria-label="Open mobile navigation menu"
            title="Open Menu"
          >
            <Menu className="w-5 h-5 text-gray-900 dark:text-white stroke-[2.2]" />
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

        {/* Right Navigation Links (Runway 3D, Admin, Seller Hub, Support, Become a Partner, LOGIN, Cart) */}
        <div className="flex items-center gap-2 sm:gap-3.5 lg:gap-4 text-gray-700 dark:text-gray-200 text-xs font-semibold">
          {/* Runway 3D Lookbook Link */}
          <Link
            href="/runway"
            className="hidden sm:inline-flex items-center gap-1.5 text-gray-900 dark:text-white hover:text-[#681a72] dark:hover:text-[#c084fc] font-bold transition-all py-1 px-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300/70 dark:border-amber-800/60 text-[11px] shadow-2xs hover:scale-102"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Runway 3D</span>
          </Link>

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
              className="px-3 sm:px-5 py-1.5 sm:py-2 bg-gray-950 hover:bg-black text-white font-black text-[11px] sm:text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer shrink-0"
            >
              LOGIN
            </button>
          )}

          {/* Cart Icon with Velora Luxury Badge */}
          <button
            onClick={openCart}
            className="relative p-1.5 sm:p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#681a72] text-white text-[10px] font-black rounded-full min-w-4.5 h-4.5 sm:min-w-5 sm:h-5 px-1 flex items-center justify-center shadow-sm">
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
    </header>

    {/* Mobile Full-Screen Drawer Menu (Rendered outside <header> so it covers true 100vh of screen) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-[85%] max-w-xs sm:max-w-sm bg-white dark:bg-[#131926] h-full shadow-2xl flex flex-col z-10 overflow-y-auto animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-purple-50/50 dark:bg-purple-950/20 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center font-serif font-black text-amber-300 shadow-sm">
                  V
                </div>
                <div>
                  <span className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight block">
                    VELORA
                  </span>
                  <span className="text-[9px] text-gray-500 dark:text-gray-400 font-semibold -mt-0.5 block">
                    Wholesale Luxury Store
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full text-gray-500 hover:text-black dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Sign-In / Account Status */}
            <div className="p-3.5 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 shrink-0">
              {mounted && user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#681a72] text-white flex items-center justify-center text-xs font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-[10px] text-gray-500 uppercase font-mono">{user.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthModalOpen(true);
                  }}
                  className="w-full py-2.5 bg-gray-950 hover:bg-black text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-sm text-center cursor-pointer transition-transform active:scale-95"
                >
                  Login / Sign Up
                </button>
              )}
            </div>

            {/* Quick Hub Navigation Links */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 space-y-1 shrink-0">
              <Link
                href="/runway"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-xs font-bold text-gray-900 dark:text-white py-2 px-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 hover:bg-amber-100 dark:hover:bg-amber-950/50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>Maison Vell Runway 3D Lookbook</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-xs font-bold text-gray-800 dark:text-gray-200 py-2 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#681a72] dark:text-[#c084fc]" />
                  <span>Admin Hub & Inventory</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </Link>
              <Link
                href="/seller"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-xs font-bold text-gray-800 dark:text-gray-200 py-2 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Store className="w-4 h-4 text-[#681a72] dark:text-[#c084fc]" />
                  <span>Seller Hub (0% Commission)</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </Link>
              <Link
                href="/support"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-xs font-bold text-gray-800 dark:text-gray-200 py-2 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <LifeBuoy className="w-4 h-4 text-[#681a72] dark:text-[#c084fc]" />
                  <span>Customer Support & Order Tracking</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </Link>
            </div>

            {/* Categories List with Direct Subcategory Navigation */}
            <div className="p-4 flex-1">
              <h3 className="text-xs uppercase font-extrabold text-gray-400 mb-2.5 tracking-wider">
                Explore Categories & Subcategories
              </h3>
              <ul className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const isExpanded = expandedMobileCategory === cat.name;
                  return (
                    <li key={cat.id} className="border-b border-gray-100 dark:border-gray-800/60 pb-1">
                      <div className="flex items-center justify-between text-xs font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 px-2 py-2 rounded-lg transition-colors">
                        <Link
                          href={`/shop?category=${encodeURIComponent(cat.name)}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex-1 hover:text-[#681a72] dark:hover:text-[#c084fc] transition-colors"
                        >
                          {cat.name}
                        </Link>
                        {cat.subcategories && cat.subcategories.length > 0 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setExpandedMobileCategory(isExpanded ? null : cat.name);
                            }}
                            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-all"
                            aria-label={`Toggle ${cat.name} subcategories`}
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isExpanded ? "rotate-180 text-[#681a72] dark:text-[#c084fc]" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {/* Expandable Subcategories List */}
                      {isExpanded && cat.subcategories && (
                        <div className="pl-3 pr-1 py-1 space-y-1 bg-purple-50/40 dark:bg-purple-950/20 rounded-lg mt-1 mb-1 animate-in fade-in duration-150">
                          <Link
                            href={`/shop?category=${encodeURIComponent(cat.name)}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-between text-[11px] font-bold text-[#681a72] dark:text-[#c084fc] py-1.5 px-2 rounded-md hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors"
                          >
                            <span>All {cat.name}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                          {cat.subcategories
                            .filter((sub) => sub !== `All ${cat.name}`)
                            .map((sub) => (
                              <Link
                                key={sub}
                                href={`/shop?category=${encodeURIComponent(cat.name)}&subcategory=${encodeURIComponent(sub)}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-between text-[11px] text-gray-600 dark:text-gray-300 hover:text-[#681a72] dark:hover:text-[#c084fc] hover:font-bold py-1.5 px-2 rounded-md hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all"
                              >
                                <span>{sub}</span>
                                <ChevronRight className="w-3 h-3 text-gray-400" />
                              </Link>
                            ))}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 text-[11px] text-gray-500 shrink-0">
              <p className="font-semibold text-gray-700 dark:text-gray-300">📞 24/7 Helpline</p>
              <p className="text-[10px] text-gray-400 mt-0.5">1800-VELORA-CARE (Toll Free)</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
