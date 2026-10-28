"use client";

import React from "react";
import Link from "next/link";
import {
  Smartphone,
  ShieldCheck,
  Truck,
  RotateCcw,
  IndianRupee,
} from "lucide-react";

export default function Footer() {
  const seoLinks = [
    {
      category: "Women Ethnic Wear",
      items: [
        "Sarees",
        "Silk Sarees",
        "Cotton Sarees",
        "Georgette Sarees",
        "Chiffon Sarees",
        "Kurtis",
        "Anarkali Kurtis",
        "Rayon Kurtis",
        "Cotton Kurtis",
        "Kurta Sets",
        "Suits & Dress Material",
        "Lehengas",
        "Bridal Lehengas",
        "Blouse",
        "Dupattas",
        "Ethnic Bottomwear",
        "Palazzos",
      ],
    },
    {
      category: "Women Western Wear",
      items: [
        "Tops",
        "Dresses",
        "Midi Dresses",
        "Maxi Dresses",
        "Jeans",
        "High Waist Jeans",
        "Jumpsuits",
        "T-shirts",
        "Shrugs",
        "Skirts",
        "Shorts",
        "Nightwear",
      ],
    },
    {
      category: "Men Fashion",
      items: [
        "Men Shirts",
        "Casual Shirts",
        "Formal Shirts",
        "Men T-shirts",
        "Polo T-shirts",
        "Jeans",
        "Trousers",
        "Chinos",
        "Men Kurtas",
        "Ethnic Wear",
        "Track Pants",
        "Innerwear",
      ],
    },
    {
      category: "Home & Kitchen",
      items: [
        "Bedsheets",
        "Cotton Bedsheets",
        "Double Bedsheets",
        "Curtains",
        "Cushion Covers",
        "Kitchen Tools",
        "Vegetable Chopper",
        "Cookware",
        "Storage Containers",
        "Water Bottles",
        "Home Decor",
        "Wall Art",
      ],
    },
    {
      category: "Beauty & Jewellery",
      items: [
        "Lipsticks",
        "Face Serum",
        "Kajal",
        "Foundation",
        "Hair Oil",
        "Shampoo",
        "Jewellery Sets",
        "Kundan Sets",
        "Earrings",
        "Jhumkas",
        "Mangalsutra",
        "Bangles",
        "Smart Watches",
        "Bluetooth Earbuds",
      ],
    },
  ];

  return (
    <footer className="bg-white dark:bg-[#111827] border-t border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 mt-10 transition-colors">
      {/* 1. Value Badges Bar */}
      <div className="border-b border-gray-100 dark:border-gray-800 bg-purple-50/50 dark:bg-purple-950/20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#681a72]/10 text-[#681a72] dark:text-[#c084fc] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                Free Delivery
              </p>
              <p className="text-[11px] text-gray-500">Across 28,000+ pin codes</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#681a72]/10 text-[#681a72] dark:text-[#c084fc] flex items-center justify-center shrink-0">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                Cash On Delivery
              </p>
              <p className="text-[11px] text-gray-500">Pay safely upon receipt</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#681a72]/10 text-[#681a72] dark:text-[#c084fc] flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                7 Days Easy Return
              </p>
              <p className="text-[11px] text-gray-500">Instant UPI/Bank refund</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#681a72]/10 text-[#681a72] dark:text-[#c084fc] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                Wholesale Prices
              </p>
              <p className="text-[11px] text-gray-500">Direct factory guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links & App Download */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Col 1: Brand & App Download */}
          <div className="lg:col-span-2 space-y-3">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-black velora-gradient-text font-sans">
                velora
              </span>
            </Link>
            <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
              Elevate Your Shopping with Velora
            </h4>
            <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
              India's favorite value & style destination for authentic ethnic wear, fashion apparel, home textiles and lifestyle essentials at direct factory wholesale rates.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-black text-white text-xs font-semibold rounded-xl flex items-center gap-2 hover:bg-gray-800 transition-colors"
              >
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <div className="text-left">
                  <p className="text-[9px] uppercase tracking-wider text-gray-400">Get it on</p>
                  <p className="text-xs font-bold leading-none">Google Play</p>
                </div>
              </a>

              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-black text-white text-xs font-semibold rounded-xl flex items-center gap-2 hover:bg-gray-800 transition-colors"
              >
                <Smartphone className="w-4 h-4 text-white" />
                <div className="text-left">
                  <p className="text-[9px] uppercase tracking-wider text-gray-400">Download on the</p>
                  <p className="text-xs font-bold leading-none">App Store</p>
                </div>
              </a>
            </div>
          </div>

          {/* Col 2: Careers & Company */}
          <div className="space-y-2 text-xs">
            <h5 className="font-bold text-gray-900 dark:text-white text-sm mb-3">
              About Velora
            </h5>
            <p><Link href="/about" className="hover:text-[#681a72] transition-colors">Our Story & Mission</Link></p>
            <p><Link href="/admin" className="hover:text-[#681a72] transition-colors font-bold text-[#681a72] dark:text-[#c084fc]">Become a Supplier (0% Comm.)</Link></p>
            <p><Link href="/stories" className="hover:text-[#681a72] transition-colors">Seller Stories & Impact</Link></p>
            <p><Link href="/about" className="hover:text-[#681a72] transition-colors">Careers</Link></p>
            <p><Link href="/contact" className="hover:text-[#681a72] transition-colors">Newsroom</Link></p>
          </div>

          {/* Col 3: Legal & Help */}
          <div className="space-y-2 text-xs">
            <h5 className="font-bold text-gray-900 dark:text-white text-sm mb-3">
              Help & Policies
            </h5>
            <p><Link href="/faq" className="hover:text-[#681a72] transition-colors">Help Center & FAQ</Link></p>
            <p><Link href="/faq" className="hover:text-[#681a72] transition-colors">7-Day Return & Exchange</Link></p>
            <p><Link href="/faq" className="hover:text-[#681a72] transition-colors">Shipping & Delivery Rates</Link></p>
            <p><Link href="/faq" className="hover:text-[#681a72] transition-colors">Terms of Service</Link></p>
            <p><Link href="/faq" className="hover:text-[#681a72] transition-colors">Privacy Notice</Link></p>
            <p><Link href="/contact" className="hover:text-[#681a72] transition-colors">Grievance Desk</Link></p>
          </div>

          {/* Col 4: Reach Out To Us */}
          <div className="space-y-2.5 text-xs">
            <h5 className="font-bold text-gray-900 dark:text-white text-sm mb-3">
              Contact Velora
            </h5>
            <p className="text-gray-500 leading-relaxed">
              Velora Technologies, Inc.<br />
              Vaishnavi Signature, Bellandur,<br />
              Bengaluru, Karnataka 560103
            </p>
            <p className="text-gray-500">
              support@velora.in
            </p>
            <div className="flex items-center gap-3 pt-1 text-gray-500">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#681a72]" title="Facebook">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#681a72]" title="Instagram">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#681a72]" title="YouTube">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#681a72]" title="LinkedIn">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* 3. Popular Searches SEO Cloud */}
        <div className="border-t border-gray-100 dark:border-gray-800 pt-8 space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Popular Searches on Velora
          </h5>
          <div className="space-y-2.5 text-[11px] text-gray-500 leading-relaxed">
            {seoLinks.map((cat) => (
              <div key={cat.category}>
                <span className="font-semibold text-gray-700 dark:text-gray-300 mr-2">
                  {cat.category}:
                </span>
                {cat.items.map((item, idx) => (
                  <span key={item}>
                    <Link
                      href={`/shop?q=${encodeURIComponent(item)}`}
                      className="hover:text-[#681a72] dark:hover:text-[#c084fc] hover:underline"
                    >
                      {item}
                    </Link>
                    {idx < cat.items.length - 1 && <span className="mx-1 text-gray-300">|</span>}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 4. Copyright Bottom Bar */}
        <div className="border-t border-gray-100 dark:border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <p>© 2026 Velora Technologies, Inc. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Crafted for Bharat with ❤️ • Wholesale Prices, Premium Quality
          </p>
        </div>
      </div>
    </footer>
  );
}
