"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingBag,
  Heart,
  SlidersHorizontal,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  User,
  ChevronDown,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCompareStore } from "@/store/useCompareStore";
import { usePreferencesStore } from "@/store/usePreferencesStore";
import { useAuthStore } from "@/store/useAuthStore";
import { CURRENCY_RATES, Currency } from "@/lib/utils";
import { sound } from "@/lib/sound";
import MegaMenu from "./MegaMenu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const totalCartCount = useCartStore((s) => s.getTotalItemsCount());
  const openCart = useCartStore((s) => s.openCart);

  const wishlistCount = useWishlistStore((s) => s.items.length);
  const compareCount = useCompareStore((s) => s.items.length);

  const currency = usePreferencesStore((s) => s.currency);
  const setCurrency = usePreferencesStore((s) => s.setCurrency);
  const isDarkMode = usePreferencesStore((s) => s.isDarkMode);
  const toggleTheme = usePreferencesStore((s) => s.toggleTheme);
  const soundEnabled = usePreferencesStore((s) => s.soundEnabled);
  const setSoundEnabled = usePreferencesStore((s) => s.setSoundEnabled);
  const setSearchOpen = usePreferencesStore((s) => s.setSearchOpen);
  const isMegaMenuOpen = usePreferencesStore((s) => s.isMegaMenuOpen);
  const setMegaMenuOpen = usePreferencesStore((s) => s.setMegaMenuOpen);

  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.setEnabled(next);
    if (next) sound.playSwitch();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Privilege Marquee Banner */}
      <div className="bg-[#090a0f] text-neutral-400 text-[10px] tracking-widest font-mono py-1.5 px-4 border-b border-white/5 flex items-center justify-between overflow-hidden">
        <div className="hidden md:flex items-center gap-4 text-[#d4af37]">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 animate-spin" />
            HAUTE HORLOGERIE & ADVANCED ATELIER
          </span>
          <span className="text-white/20">•</span>
          <span className="text-neutral-300">COMPLIMENTARY ARMORED COURIER WORLDWIDE</span>
        </div>

        <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-5 mx-auto md:mx-0">
          <div className="flex items-center gap-3">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setCurrencyDropdownOpen(!currencyDropdownOpen);
                  sound.playClick();
                }}
                className="flex items-center gap-1 text-white hover:text-[#d4af37] transition-colors py-0.5"
              >
                <span>{currency}</span>
                <span className="text-neutral-400">({CURRENCY_RATES[currency].symbol})</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-32 py-1 glass-panel rounded-xl shadow-2xl border border-white/10 z-50">
                  {(Object.keys(CURRENCY_RATES) as Currency[]).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setCurrencyDropdownOpen(false);
                        sound.playSwitch();
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-white/10 transition-colors ${
                        currency === curr ? "text-[#d4af37] font-semibold" : "text-neutral-300"
                      }`}
                    >
                      <span>{curr}</span>
                      <span className="font-mono text-neutral-400">{CURRENCY_RATES[curr].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-white/20">|</span>

            {/* Sound Effects Toggle */}
            <button
              onClick={handleSoundToggle}
              className={`flex items-center gap-1 transition-colors ${
                soundEnabled ? "text-[#d4af37]" : "text-neutral-500 hover:text-neutral-300"
              }`}
              title={soundEnabled ? "Tactile audio feedback ON" : "Audio muted"}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline text-[10px]">{soundEnabled ? "FX ON" : "MUTED"}</span>
            </button>

            <span className="text-white/20">|</span>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => {
                toggleTheme();
                sound.playSwitch();
              }}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-white/10 hover:border-[#d4af37]/50 text-neutral-300 hover:text-[#d4af37] transition-all text-[10px] font-mono"
              title={isDarkMode ? "Switch to Luxury Light Mode" : "Switch to Obsidian Dark Mode"}
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden sm:inline">LIGHT</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span className="hidden sm:inline">DARK</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 hover:text-[#d4af37] transition-colors"
            >
              Command Hub
            </Link>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <nav
        className={`w-full px-4 sm:px-8 py-3.5 transition-all duration-300 ${
          isScrolled
            ? "glass-panel bg-[#090a0f]/90 border-b border-white/10 shadow-2xl backdrop-blur-xl"
            : "bg-gradient-to-b from-[#090a0f]/80 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-neutral-300">
            <button
              onClick={() => {
                setMegaMenuOpen(!isMegaMenuOpen);
                sound.playClick();
              }}
              className={`flex items-center gap-1.5 py-1 transition-colors hover:text-[#d4af37] ${
                isMegaMenuOpen ? "text-[#d4af37]" : ""
              }`}
            >
              <span>Atelier</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isMegaMenuOpen ? "rotate-180" : ""}`} />
            </button>

            <Link href="/shop" className="hover:text-[#d4af37] transition-colors py-1">
              Catalog
            </Link>

            <Link href="/shop?filter=featured" className="hover:text-[#d4af37] transition-colors py-1">
              Masterpieces
            </Link>

            <Link href="/about" className="hover:text-[#d4af37] transition-colors py-1">
              Heritage
            </Link>

            <Link href="/stories" className="hover:text-[#d4af37] transition-colors py-1">
              Journal
            </Link>
          </div>

          {/* Center Brand Identity */}
          <Link
            href="/"
            onClick={() => sound.playClick()}
            className="group flex flex-col items-center justify-center text-center cursor-pointer"
          >
            <span className="text-xl sm:text-2xl font-serif tracking-[0.35em] text-white group-hover:text-[#d4af37] transition-colors uppercase font-bold">
              AURELIA
            </span>
            <span className="text-[8px] font-mono tracking-[0.45em] text-[#d4af37] uppercase -mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
              GENEVA • PARIS • TOKYO
            </span>
          </Link>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Search Trigger */}
            <button
              onClick={() => {
                setSearchOpen(true);
                sound.playClick();
              }}
              className="p-2 text-neutral-300 hover:text-[#d4af37] transition-colors rounded-full hover:bg-white/5"
              title="Instant AI Search (Cmd+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Compare Matrix Trigger */}
            {compareCount > 0 && (
              <Link
                href="/compare"
                className="relative p-2 text-cyan-400 hover:text-cyan-300 transition-colors rounded-full hover:bg-white/5 hidden sm:flex items-center"
                title="Compare Atelier Pieces"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-black text-[9px] font-bold flex items-center justify-center">
                  {compareCount}
                </span>
              </Link>
            )}

            {/* Wishlist Trigger */}
            <Link
              href="/wishlist"
              className="relative p-2 text-neutral-300 hover:text-red-400 transition-colors rounded-full hover:bg-white/5"
              title="Private Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* User Account / VIP Lounge */}
            <Link
              href="/account"
              className="p-2 text-neutral-300 hover:text-[#d4af37] transition-colors rounded-full hover:bg-white/5 hidden sm:flex items-center gap-1.5"
              title="Private Client Lounge"
            >
              <User className="w-4 h-4" />
              {user && (
                <span className="text-[10px] font-mono text-[#d4af37] tracking-wider hidden xl:inline">
                  {user.tier.replace("Member", "")}
                </span>
              )}
            </Link>

            {/* Shopping Bag Drawer Trigger */}
            <button
              onClick={() => {
                openCart();
                sound.playClick();
              }}
              className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#d4af37]/20 border border-white/10 hover:border-[#d4af37]/50 transition-all text-white"
              title="View Curated Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
              <span className="text-xs font-mono font-medium">{totalCartCount}</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                sound.playClick();
              }}
              className="p-2 text-neutral-300 hover:text-white lg:hidden rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mega Menu Dropdown */}
      <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setMegaMenuOpen(false)} />

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-white/10 p-6 bg-[#090a0f]/95 text-white animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4 text-sm font-medium tracking-widest uppercase">
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/10 hover:text-[#d4af37]"
            >
              Catalog & Collections
            </Link>
            <Link
              href="/shop?category=Horology"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/10 hover:text-[#d4af37] text-[#d4af37]"
            >
              Haute Horlogerie
            </Link>
            <Link
              href="/shop?category=Acoustics"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/10 hover:text-[#d4af37]"
            >
              Spatial Acoustics
            </Link>
            <Link
              href="/shop?category=Apparel"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/10 hover:text-[#d4af37]"
            >
              Kinetic Apparel
            </Link>
            <Link
              href="/shop?category=Mobility"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/10 hover:text-[#d4af37]"
            >
              Electric Mobility
            </Link>
            <Link
              href="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-white/10 hover:text-[#d4af37]"
            >
              Client Lounge & Orders
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-cyan-400"
            >
              Command Hub (Admin)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
