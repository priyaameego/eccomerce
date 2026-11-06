"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Flame, Star, Tag, ChevronRight } from "lucide-react";
import { CATEGORIES } from "@/data/products";

interface MegaMenuProps {
  isOpen: boolean;
  activeCategory: string;
  onClose: () => void;
}

// Detailed category menu structures tailored for Meesho/Velora taxonomy
const MEGA_CATEGORY_DATA: Record<
  string,
  {
    col1Title: string;
    col1Links: { label: string; subcategory: string }[];
    col2Title: string;
    col2Links: { label: string; subcategory: string }[];
    tagline: string;
    hubBadge: string;
  }
> = {
  "Women Ethnic": {
    col1Title: "Ethnic Wear & Sarees",
    col1Links: [
      { label: "All Sarees", subcategory: "Sarees" },
      { label: "Silk Sarees (Banarasi / Kanjivaram)", subcategory: "Silk Sarees" },
      { label: "Cotton & Chanderi Sarees", subcategory: "Cotton Sarees" },
      { label: "Kurtis & Anarkalis", subcategory: "Kurtis" },
      { label: "Kurta Sets with Dupatta", subcategory: "Kurta Sets" },
      { label: "Bridal & Party Lehengas", subcategory: "Lehengas" },
    ],
    col2Title: "Weaves & Collections",
    col2Links: [
      { label: "Banarasi Jacquard Sarees", subcategory: "Silk Sarees" },
      { label: "Jaipur Floral Print Sarees", subcategory: "Cotton Sarees" },
      { label: "Georgette Chikankari Kurtis", subcategory: "Kurtis" },
      { label: "Pure Cotton Kurta Sets", subcategory: "Kurta Sets" },
      { label: "Heavy Velvet Bridal Lehengas", subcategory: "Lehengas" },
      { label: "Embroidered Party Lehengas", subcategory: "Lehengas" },
    ],
    tagline: "Direct from Surat, Jaipur & Varanasi Mills",
    hubBadge: "Surat Textile Hub",
  },
  "Women Western": {
    col1Title: "Western Wear",
    col1Links: [
      { label: "Trendy Tops & Peplums", subcategory: "Tops" },
      { label: "Flared & Maxi Dresses", subcategory: "Dresses" },
      { label: "High-Waist Denim Jeans", subcategory: "Jeans" },
      { label: "Loose Drop-Shoulder Tops", subcategory: "Tops" },
      { label: "Ribbed Midi & Bodycon Dresses", subcategory: "Dresses" },
      { label: "Floral Summer Dresses", subcategory: "Dresses" },
    ],
    col2Title: "Popular Styles",
    col2Links: [
      { label: "Floral Georgette Tops", subcategory: "Tops" },
      { label: "Cotton Casual Shirts & Tops", subcategory: "Tops" },
      { label: "Tiered Midi Dresses", subcategory: "Dresses" },
      { label: "Stretchable Straight Jeans", subcategory: "Jeans" },
      { label: "Party Bodycon Western Dresses", subcategory: "Dresses" },
      { label: "Casual Everyday Dresses", subcategory: "Dresses" },
    ],
    tagline: "High Street Fashion at Wholesale Prices",
    hubBadge: "Mumbai Fast Fashion",
  },
  "Men": {
    col1Title: "Men's Clothing",
    col1Links: [
      { label: "Casual Checked Shirts", subcategory: "Shirts" },
      { label: "240 GSM Oversized T-Shirts", subcategory: "T-shirts" },
      { label: "Round Neck Graphic T-Shirts", subcategory: "T-shirts" },
      { label: "Slim Fit Chino Trousers", subcategory: "Trousers" },
      { label: "Stretch Formal Trousers", subcategory: "Trousers" },
      { label: "Lucknowi Chikankari Kurtas", subcategory: "Ethnic Wear" },
    ],
    col2Title: "Trending Fits",
    col2Links: [
      { label: "Pure Cotton Spread Collar Shirts", subcategory: "Shirts" },
      { label: "Bio-Washed Combed Cotton Tees", subcategory: "T-shirts" },
      { label: "Anime Streetwear Oversized Tees", subcategory: "T-shirts" },
      { label: "Cotton Lycra Stretch Chinos", subcategory: "Trousers" },
      { label: "Work & Formal Trousers", subcategory: "Trousers" },
      { label: "Festive Kurta & Pajama Sets", subcategory: "Ethnic Wear" },
    ],
    tagline: "Tirupur Combed Cotton & Ahmedabad Weaves",
    hubBadge: "Tirupur Knit Hub",
  },
  "Kids": {
    col1Title: "Kids & Baby Wear",
    col1Links: [
      { label: "Girls Party Wear Frocks", subcategory: "Girls Wear" },
      { label: "Boys T-Shirt & Shorts Combo", subcategory: "Boys Wear" },
      { label: "Newborn Baby Romper Sleepsuits", subcategory: "Baby Wear" },
      { label: "Interactive Audio Flash Toys", subcategory: "Toys" },
      { label: "Kids Cartoon School Backpacks", subcategory: "School Supplies" },
      { label: "Infant Pure Cotton Onesies", subcategory: "Baby Wear" },
    ],
    col2Title: "Age Groups & Essentials",
    col2Links: [
      { label: "Floral Embroidered Girls Dresses", subcategory: "Girls Wear" },
      { label: "Boys Cotton Casual Combos", subcategory: "Boys Wear" },
      { label: "Baby Rompers Pack of 3", subcategory: "Baby Wear" },
      { label: "Smart Early Learning Puzzles", subcategory: "Toys" },
      { label: "Ergonomic School Bags", subcategory: "School Supplies" },
      { label: "Kids Princess Party Dresses", subcategory: "Girls Wear" },
    ],
    tagline: "Skin-Friendly Pure Cotton for Young Skin",
    hubBadge: "Ludhiana Kids Apparel",
  },
  "Home & Kitchen": {
    col1Title: "Home Furnishing & Kitchen",
    col1Links: [
      { label: "Glace Cotton Double Bedsheets", subcategory: "Bedsheets" },
      { label: "Jacquard Eyelet Door Curtains", subcategory: "Curtains" },
      { label: "Granite Non-Stick Cookware Sets", subcategory: "Cookware" },
      { label: "Push Choppers & Slicers", subcategory: "Kitchen Tools" },
      { label: "Ultrasonic Aroma Diffusers", subcategory: "Home Decor" },
      { label: "Bedsheet with Pillow Covers", subcategory: "Bedsheets" },
    ],
    col2Title: "Living & Kitchen Essentials",
    col2Links: [
      { label: "Double Bed Cotton Sheets", subcategory: "Bedsheets" },
      { label: "Semi-Sheer 7-Feet Curtains", subcategory: "Curtains" },
      { label: "Kadai, Fry Pan & Tawa Sets", subcategory: "Cookware" },
      { label: "Stainless Steel Food Choppers", subcategory: "Kitchen Tools" },
      { label: "LED Mood Lamps & Diffusers", subcategory: "Home Decor" },
      { label: "3-Layer Non-Stick Cookware", subcategory: "Cookware" },
    ],
    tagline: "Panipat Textile Hub & Rajkot Utensil Mills",
    hubBadge: "Panipat Handlooms",
  },
  "Beauty & Health": {
    col1Title: "Beauty & Grooming",
    col1Links: [
      { label: "Liquid Matte Lipsticks Set", subcategory: "Makeup" },
      { label: "Vitamin C Face Serums", subcategory: "Skincare" },
      { label: "Organic Pure Aloe Vera Gel", subcategory: "Skincare" },
      { label: "14-Piece Makeup Brush Kits", subcategory: "Makeup Tools" },
      { label: "Neem & Tea Tree Face Wash", subcategory: "Skincare" },
      { label: "Waterproof Nude Lip Shades", subcategory: "Makeup" },
    ],
    col2Title: "Herbal & Salon Care",
    col2Links: [
      { label: "Anti-Acne Foaming Cleansers", subcategory: "Skincare" },
      { label: "Synthetic Bristle Brushes", subcategory: "Makeup Tools" },
      { label: "Glowing Skin Vitamin C Serums", subcategory: "Skincare" },
      { label: "Multipurpose Pure Aloe Gel", subcategory: "Skincare" },
      { label: "Long-Lasting Lip Colors", subcategory: "Makeup" },
      { label: "Deep Pore Cleansing Wash", subcategory: "Skincare" },
    ],
    tagline: "GMP Certified Herbal & Salon Grade Products",
    hubBadge: "Haridwar Naturals",
  },
  "Jewellery & Accessories": {
    col1Title: "Jewellery & Daily Essentials",
    col1Links: [
      { label: "Kundan Pearl Choker Sets", subcategory: "Jewellery Sets" },
      { label: "Oxidised Silver Jhumki Earrings", subcategory: "Earrings" },
      { label: "Genuine Leather RFID Wallets", subcategory: "Wallets" },
      { label: "Retro Polarized UV400 Sunglasses", subcategory: "Sunglasses" },
      { label: "18K Rose Gold Plated Bangles", subcategory: "Bracelets" },
      { label: "Traditional Bridal Necklaces", subcategory: "Jewellery Sets" },
    ],
    col2Title: "Craftsmanship Styles",
    col2Links: [
      { label: "Silver Drop Jhumkas (Set of 3)", subcategory: "Earrings" },
      { label: "Slim Bifold Leather Wallets", subcategory: "Wallets" },
      { label: "Hexagonal Metal Sunglasses", subcategory: "Sunglasses" },
      { label: "Austrian Zircon Charm Bracelets", subcategory: "Bracelets" },
      { label: "Gold Plated Kundan Jewellery", subcategory: "Jewellery Sets" },
      { label: "Rose Gold Crystal Bangles", subcategory: "Bracelets" },
    ],
    tagline: "Jaipur Kundan Artisans & Kanpur Leather",
    hubBadge: "Jaipur Johari Bazaar",
  },
  "Bags & Footwear": {
    col1Title: "Footwear & Travel Bags",
    col1Links: [
      { label: "Men's Breathable Running Shoes", subcategory: "Men Footwear" },
      { label: "Handcrafted Kolhapuri Chappals", subcategory: "Ethnic Footwear" },
      { label: "Party & Wedding Tassel Loafers", subcategory: "Men Footwear" },
      { label: "Women's PU Leather Sling Handbags", subcategory: "Women Handbags" },
      { label: "35L Anti-Theft Laptop Backpacks", subcategory: "Backpacks" },
      { label: "Men's Ethnic Leather Chappals", subcategory: "Ethnic Footwear" },
    ],
    col2Title: "Materials & Designs",
    col2Links: [
      { label: "Faux Suede Wedding Loafers", subcategory: "Men Footwear" },
      { label: "Lightweight Mesh Sneakers", subcategory: "Men Footwear" },
      { label: "Water-Resistant Travel Backpacks", subcategory: "Backpacks" },
      { label: "Stylish Crossbody Sling Bags", subcategory: "Women Handbags" },
      { label: "Comfort Insole Slip-On Loafers", subcategory: "Men Footwear" },
      { label: "Multi-Pocket Laptop Bags", subcategory: "Backpacks" },
    ],
    tagline: "Agra Footwear Cluster & Kolhapur Artisans",
    hubBadge: "Agra Leather City",
  },
  "Electronics": {
    col1Title: "Gadgets & Audio",
    col1Links: [
      { label: "Wireless TWS Bluetooth Earbuds", subcategory: "Audio & Headphones" },
      { label: "Bluetooth Calling Smartwatches", subcategory: "Smartwatches" },
      { label: "65W GaN Fast Wall Chargers", subcategory: "Mobile Accessories" },
      { label: "10W Waterproof Bluetooth Speakers", subcategory: "Speakers" },
      { label: "Touch Dimmable LED Desk Lamps", subcategory: "Gadgets" },
      { label: "True Wireless Stereo (TWS) Audio", subcategory: "Audio & Headphones" },
    ],
    col2Title: "Tech Features",
    col2Links: [
      { label: "HD Display Health Trackers", subcategory: "Smartwatches" },
      { label: "Dual Port Type-C Fast Chargers", subcategory: "Mobile Accessories" },
      { label: "Rugged Outdoor Bass Speakers", subcategory: "Speakers" },
      { label: "Flexible Eye-Care LED Lamps", subcategory: "Gadgets" },
      { label: "40Hr Battery Playtime Earbuds", subcategory: "Audio & Headphones" },
      { label: "Ultra-Compact GaN Adapters", subcategory: "Mobile Accessories" },
    ],
    tagline: "BIS Certified Smart Gadgets with 6-Month Warranty",
    hubBadge: "Noida Tech Cluster",
  },
};

export default function MegaMenu({ isOpen, activeCategory, onClose }: MegaMenuProps) {
  if (!isOpen) return null;

  const currentCategory =
    CATEGORIES.find((c) => c.name === activeCategory) || CATEGORIES[0];
  const menuData = MEGA_CATEGORY_DATA[currentCategory.name] || {
    col1Title: `All ${currentCategory.name}`,
    col1Links: currentCategory.subcategories.slice(0, 6).map((s) => ({ label: s, subcategory: s })),
    col2Title: "Popular Collections",
    col2Links: currentCategory.subcategories.slice(3, 9).map((s) => ({ label: s, subcategory: s })),
    tagline: "Wholesale Prices Direct from Verified Indian Mills",
    hubBadge: "Direct Factory",
  };

  return (
    <div
      onMouseEnter={() => {}}
      onMouseLeave={onClose}
      className="absolute top-full left-0 right-0 bg-white/95 dark:bg-[#151c2c]/95 backdrop-blur-xl border-t border-b border-purple-100 dark:border-purple-950/60 shadow-[0_25px_60px_-15px_rgba(104,26,114,0.18)] z-50 animate-in fade-in slide-in-from-top-1 duration-200"
    >
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Main 3 Column Links Layout */}
          <div className="col-span-8 grid grid-cols-3 gap-6 border-r border-gray-100 dark:border-gray-800 pr-6">
            {/* Column 1: Primary Clothing / Styles with Direct Filter Links */}
            <div>
              <h4 className="text-xs font-bold text-[#681a72] dark:text-[#c084fc] mb-3 pb-1 border-b border-purple-100 dark:border-purple-900/40 uppercase tracking-wider flex items-center justify-between">
                <span>{menuData.col1Title}</span>
              </h4>
              <ul className="space-y-2">
                {menuData.col1Links.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={`/shop?category=${encodeURIComponent(currentCategory.name)}&subcategory=${encodeURIComponent(item.subcategory)}`}
                      onClick={onClose}
                      className="text-xs text-gray-700 dark:text-gray-300 hover:text-[#681a72] dark:hover:text-[#c084fc] hover:font-bold hover:translate-x-1 transition-all inline-flex items-center gap-1.5 py-0.5 group"
                    >
                      <ChevronRight className="w-3 h-3 text-gray-300 dark:text-gray-600 group-hover:text-[#681a72] dark:group-hover:text-[#c084fc] transition-colors" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Fabrics, Cuts & Trending Collections */}
            <div>
              <h4 className="text-xs font-bold text-[#681a72] dark:text-[#c084fc] mb-3 pb-1 border-b border-purple-100 dark:border-purple-900/40 uppercase tracking-wider flex items-center justify-between">
                <span>{menuData.col2Title}</span>
              </h4>
              <ul className="space-y-2">
                {menuData.col2Links.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={`/shop?category=${encodeURIComponent(currentCategory.name)}&subcategory=${encodeURIComponent(item.subcategory)}`}
                      onClick={onClose}
                      className="text-xs text-gray-700 dark:text-gray-300 hover:text-[#681a72] dark:hover:text-[#c084fc] hover:font-bold hover:translate-x-1 transition-all inline-flex items-center gap-1.5 py-0.5 group"
                    >
                      <ChevronRight className="w-3 h-3 text-gray-300 dark:text-gray-600 group-hover:text-[#681a72] dark:group-hover:text-[#c084fc] transition-colors" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Wholesale Budget Stores */}
            <div>
              <h4 className="text-xs font-bold text-[#681a72] dark:text-[#c084fc] mb-3 pb-1 border-b border-purple-100 dark:border-purple-900/40 uppercase tracking-wider">
                Wholesale Deals
              </h4>
              <ul className="space-y-2 text-xs text-gray-700 dark:text-gray-300">
                <li>
                  <Link
                    href={`/shop?category=${encodeURIComponent(currentCategory.name)}&deal=true`}
                    onClick={onClose}
                    className="hover:text-rose-700 flex items-center gap-1.5 py-0.5 text-rose-600 font-extrabold hover:translate-x-1 transition-all"
                  >
                    <Flame className="w-3.5 h-3.5 fill-rose-600 animate-pulse" />
                    <span>Flat 70% Off Clearance</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/shop?category=${encodeURIComponent(currentCategory.name)}&filter=under199`}
                    onClick={onClose}
                    className="hover:text-[#681a72] dark:hover:text-[#c084fc] hover:font-bold hover:translate-x-1 transition-all flex items-center gap-1.5 py-0.5"
                  >
                    <Tag className="w-3 h-3 text-amber-500" />
                    <span>Under ₹199 Store</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/shop?category=${encodeURIComponent(currentCategory.name)}&filter=under299`}
                    onClick={onClose}
                    className="hover:text-[#681a72] dark:hover:text-[#c084fc] hover:font-bold hover:translate-x-1 transition-all flex items-center gap-1.5 py-0.5"
                  >
                    <Tag className="w-3 h-3 text-emerald-500" />
                    <span>Under ₹299 Store</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/shop?category=${encodeURIComponent(currentCategory.name)}&filter=under499`}
                    onClick={onClose}
                    className="hover:text-[#681a72] dark:hover:text-[#c084fc] hover:font-bold hover:translate-x-1 transition-all flex items-center gap-1.5 py-0.5"
                  >
                    <Tag className="w-3 h-3 text-blue-500" />
                    <span>Under ₹499 Store</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/shop?category=${encodeURIComponent(currentCategory.name)}&sort=rating`}
                    onClick={onClose}
                    className="hover:text-[#681a72] dark:hover:text-[#c084fc] hover:font-bold hover:translate-x-1 transition-all flex items-center gap-1.5 py-0.5 text-emerald-600 dark:text-emerald-400 font-semibold"
                  >
                    <Star className="w-3.5 h-3.5 fill-emerald-600" />
                    <span>Top Rated 4.5★ & Above</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Featured Wholesale Showcase Card */}
          <div className="col-span-4 pl-2">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-50/90 via-rose-50/40 to-white dark:from-purple-950/40 dark:to-[#151c2c] p-4 border border-purple-200/80 dark:border-purple-900/50 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold bg-[#681a72] text-white px-2 py-0.5 rounded-sm uppercase tracking-wider">
                  {menuData.hubBadge}
                </span>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" /> 0% Commission
                </span>
              </div>

              <h5 className="font-extrabold text-gray-900 dark:text-white text-sm mb-1">
                Trending in {currentCategory.name}
              </h5>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-1">
                {menuData.tagline}
              </p>

              <div className="relative h-28 w-full rounded-xl overflow-hidden mb-3 shadow-xs border border-white/40">
                <Image
                  src={currentCategory.image}
                  alt={currentCategory.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <Link
                href={`/shop?category=${encodeURIComponent(currentCategory.name)}`}
                onClick={onClose}
                className="w-full py-2.5 bg-gradient-to-r from-[#681a72] to-[#8b1874] hover:opacity-95 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
              >
                <span>Explore All {currentCategory.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}