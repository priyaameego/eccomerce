"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Heart, User, ShoppingBag, Flame } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const totalCartCount = useCartStore((s) => s.getTotalItemsCount());
  const openCart = useCartStore((s) => s.openCart);
  const wishlistCount = useWishlistStore((s) => s.items.length);

  // If on checkout page, don't obstruct payment buttons
  if (pathname === "/checkout") return null;

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/92 dark:bg-[#0f172a]/92 backdrop-blur-xl border-t border-purple-100/60 dark:border-purple-950/60 shadow-[0_-8px_30px_rgba(104,26,114,0.09)] px-2 py-1.5 flex items-center justify-around">
      {/* 1. Home */}
      <Link
        href="/"
        className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
          pathname === "/"
            ? "text-[#681a72] dark:text-[#c084fc] font-bold"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-900"
        }`}
      >
        <Home className={`w-5 h-5 ${pathname === "/" ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
        <span className="text-[10px] mt-0.5">Home</span>
      </Link>

      {/* 2. Categories / Shop */}
      <Link
        href="/shop"
        className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
          pathname === "/shop"
            ? "text-[#681a72] dark:text-[#c084fc] font-bold"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-900"
        }`}
      >
        <Grid className={`w-5 h-5 ${pathname === "/shop" ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
        <span className="text-[10px] mt-0.5">Categories</span>
      </Link>

      {/* 3. Budget Deals Under ₹299 */}
      <Link
        href="/shop?filter=under299"
        className="flex flex-col items-center py-1 px-2.5 rounded-lg text-rose-600 dark:text-rose-400 hover:text-rose-700 transition-colors"
      >
        <div className="relative">
          <Flame className="w-5 h-5 fill-rose-600 text-rose-600 animate-pulse" />
          <span className="absolute -top-1 -right-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[8px] font-black px-1 rounded-full leading-tight">
            ₹299
          </span>
        </div>
        <span className="text-[10px] mt-0.5 font-bold">Deals</span>
      </Link>

      {/* 4. Wishlist */}
      <Link
        href="/wishlist"
        className={`relative flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
          pathname === "/wishlist"
            ? "text-[#681a72] dark:text-[#c084fc] font-bold"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-900"
        }`}
      >
        <div className="relative">
          <Heart className={`w-5 h-5 ${pathname === "/wishlist" ? "fill-[#681a72] stroke-[2.5]" : "stroke-[1.8]"}`} />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#e11d48] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5">Wishlist</span>
      </Link>

      {/* 5. Cart Button */}
      <button
        onClick={openCart}
        className="relative flex flex-col items-center py-1 px-2.5 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 transition-colors"
        aria-label="Cart"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
          {totalCartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-[#681a72] to-[#e11d48] text-white text-[9px] font-bold rounded-full min-w-4 h-4 px-1 flex items-center justify-center shadow-xs">
              {totalCartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5">Cart</span>
      </button>

      {/* 6. Account */}
      <Link
        href="/account"
        className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
          pathname === "/account"
            ? "text-[#681a72] dark:text-[#c084fc] font-bold"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-900"
        }`}
      >
        <User className={`w-5 h-5 ${pathname === "/account" ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
        <span className="text-[10px] mt-0.5">Account</span>
      </Link>
    </nav>
  );
}

