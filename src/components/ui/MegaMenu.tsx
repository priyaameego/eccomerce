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
    col2Title: "Fabrics & Collections",
    col2Links: [
      { label: "Pure Cotton Handlooms", subcategory: "Cotton" },
      { label: "Banarasi Jacquard Weaves", subcategory: "Silk" },
      { label: "Rajasthani Bandhani Prints", subcategory: "Bandhani" },
      { label: "Heavy Zari & Dori Embroidery", subcategory: "Zari" },
      { label: "Daily Casual Ethnic", subcategory: "Casual" },
      { label: "Wedding Festive Specials", subcategory: "Bridal" },
    ],
    tagline: "Direct from Surat, Jaipur & Varanasi Mills",
    hubBadge: "Surat Textile Hub",
  },
  "Women Western": {
    col1Title: "Western Wear",
    col1Links: [
      { label: "Trendy Tops & Tunics", subcategory: "Tops" },
      { label: "Flared & Maxi Dresses", subcategory: "Dresses" },
      { label: "High-Waist Denim Jeans", subcategory: "Jeans" },
      { label: "Korean Oversized Shirts", subcategory: "Shirts" },
      { label: "Bodycon & Party Wear", subcategory: "Bodycon" },
      { label: "Summer Crop Tops", subcategory: "Tops" },
    ],
    col2Title: "Popular Styles",
    col2Links: [
      { label: "Floral Tiered Dresses", subcategory: "Floral" },
      { label: "Ribbed Knit Essentials", subcategory: "Ribbed" },
      { label: "Boyfriend Cotton Fits", subcategory: "Cotton" },
      { label: "Wide-Leg & Flared Denim", subcategory: "Jeans" },
      { label: "College Casual Wear", subcategory: "Casual" },
      { label: "Vacation Resort Wear", subcategory: "Dresses" },
    ],
    tagline: "High Street Fashion at Wholesale Prices",
    hubBadge: "Mumbai Fast Fashion",
  },
  "Men": {
    col1Title: "Men's Clothing",
    col1Links: [
      { label: "Casual & Printed Shirts", subcategory: "Shirts" },
      { label: "240 GSM Oversized T-Shirts", subcategory: "T-shirts" },
      { label: "Polo T-Shirts & Collars", subcategory: "T-shirts" },
      { label: "Stretchable Chino Trousers", subcategory: "Trousers" },
      { label: "Lucknowi Chikankari Kurtas", subcategory: "Ethnic Wear" },
      { label: "Cargo Pants & Joggers", subcategory: "Trousers" },
    ],
    col2Title: "Trending Fits",
    col2Links: [
      { label: "Heavy Cotton Streetwear", subcategory: "Oversized" },
      { label: "All-Day Work Chinos", subcategory: "Formal" },
      { label: "Festive Kurta-Pajama Sets", subcategory: "Kurta" },
      { label: "Pure Cotton Checked Shirts", subcategory: "Checked" },
      { label: "Gym & Activewear", subcategory: "Activewear" },
      { label: "Weekend Casual Wear", subcategory: "Casual" },
    ],
    tagline: "Tirupur Combed Cotton & Ahmedabad Weaves",
    hubBadge: "Tirupur Knit Hub",
  },
  "Kids": {
    col1Title: "Kids & Baby Wear",
    col1Links: [
      { label: "Boys Festive Sherwani Sets", subcategory: "Boys Wear" },
      { label: "Girls Party Frocks & Dresses", subcategory: "Girls Wear" },
      { label: "100% Organic Baby Rompers (Pack)", subcategory: "Baby Wear" },
      { label: "Talking Flash Cards & Toys", subcategory: "Toys" },
      { label: "Cartoon School Backpacks", subcategory: "School Supplies" },
      { label: "Newborn Infant Onesies", subcategory: "Baby Wear" },
    ],
    col2Title: "Age Groups & Essentials",
    col2Links: [
      { label: "Infant (0 - 12 Months)", subcategory: "Baby Wear" },
      { label: "Toddlers (1 - 4 Years)", subcategory: "Boys Wear" },
      { label: "Kids Fashion (4 - 10 Years)", subcategory: "Girls Wear" },
      { label: "Montessori Learning Toys", subcategory: "Toys" },
      { label: "Cute Animal School Bags", subcategory: "School Supplies" },
      { label: "Nightwear & Loungewear", subcategory: "Baby Wear" },
    ],
    tagline: "Skin-Friendly Pure Cotton for Young Skin",
    hubBadge: "Ludhiana Kids Apparel",
  },
  "Home & Kitchen": {
    col1Title: "Home Furnishing & Kitchen",
    col1Links: [
      { label: "210 TC Glace Cotton Bedsheets", subcategory: "Bedsheets" },
      { label: "Jacquard Embroidered Curtains", subcategory: "Curtains" },
      { label: "Non-Stick Granite Cookware Sets", subcategory: "Cookware" },
      { label: "Stainless Steel Food Choppers", subcategory: "Kitchen Tools" },
      { label: "Ultrasonic Aroma Diffusers", subcategory: "Home Decor" },
      { label: "Storage Boxes & Organizers", subcategory: "Storage" },
    ],
    col2Title: "Living & Kitchen Essentials",
    col2Links: [
      { label: "3D Printed King Bedsheets", subcategory: "Bedsheets" },
      { label: "Semi-Sheer Door Curtains (7 Ft)", subcategory: "Curtains" },
      { label: "3-Piece Kadai, Tawa & Pan Sets", subcategory: "Cookware" },
      { label: "Electric Blenders & Grinders", subcategory: "Kitchen Tools" },
      { label: "Ambient LED Mood Lamps", subcategory: "Home Decor" },
      { label: "Wardrobe Clothes Organizers", subcategory: "Storage" },
    ],
    tagline: "Panipat Textile Hub & Rajkot Utensil Mills",
    hubBadge: "Panipat Handlooms",
  },
  "Beauty & Health": {
    col1Title: "Beauty & Grooming",
    col1Links: [
      { label: "99% Pure Organic Aloe Vera Gel", subcategory: "Skincare" },
      { label: "12-Shade Waterproof Matte Lipsticks", subcategory: "Makeup" },
      { label: "Red Onion Hair Fall Control Oil", subcategory: "Haircare" },
      { label: "14-Piece Synthetic Makeup Brush Kit", subcategory: "Makeup Tools" },
      { label: "Neem & Tea Tree Foaming Face Wash", subcategory: "Skincare" },
      { label: "Herbal Body Lotions & Care", subcategory: "Skincare" },
    ],
    col2Title: "Herbal & Salon Care",
    col2Links: [
      { label: "Natural Ayurvedic Oils", subcategory: "Haircare" },
      { label: "Anti-Acne Purifying Cleansers", subcategory: "Skincare" },
      { label: "Long-Lasting Matte Lip Colors", subcategory: "Makeup" },
      { label: "Soft Silicone Cleansing Brushes", subcategory: "Skincare" },
      { label: "Professional Blender Brushes", subcategory: "Makeup Tools" },
      { label: "Paraben & Sulphate Free Range", subcategory: "Skincare" },
    ],
    tagline: "GMP Certified Herbal & Salon Grade Products",
    hubBadge: "Haridwar Naturals",
  },
  "Jewellery & Accessories": {
    col1Title: "Jewellery & Daily Essentials",
    col1Links: [
      { label: "Kundan Choker Necklace Sets", subcategory: "Jewellery Sets" },
      { label: "Tribal Silver Oxidised Jhumkas", subcategory: "Earrings" },
      { label: "Genuine Leather RFID Men's Wallets", subcategory: "Wallets" },
      { label: "Retro Polarized UV400 Sunglasses", subcategory: "Sunglasses" },
      { label: "18K Rose Gold Plated Bangles", subcategory: "Bracelets" },
      { label: "Traditional Bridal Bangles", subcategory: "Bangles" },
    ],
    col2Title: "Craftsmanship Styles",
    col2Links: [
      { label: "Austrian Zircon Studded", subcategory: "Bracelets" },
      { label: "Full Grain Leather Goods", subcategory: "Wallets" },
      { label: "Anti-Glare Driving Glasses", subcategory: "Sunglasses" },
      { label: "Temple & Meenakari Jewels", subcategory: "Jewellery Sets" },
      { label: "Anti-Tarnish Daily Wear", subcategory: "Earrings" },
      { label: "Festive Wedding Jewellery", subcategory: "Jewellery Sets" },
    ],
    tagline: "Jaipur Kundan Artisans & Kanpur Leather",
    hubBadge: "Jaipur Johari Bazaar",
  },
  "Bags & Footwear": {
    col1Title: "Footwear & Travel Bags",
    col1Links: [
      { label: "Handcrafted Kolhapuri Chappals", subcategory: "Ethnic Footwear" },
      { label: "Faux Suede Party Tassel Loafers", subcategory: "Men's Footwear" },
      { label: "Ultralight Breathable Sneakers", subcategory: "Men Footwear" },
      { label: "Vegan Leather Shoulder Tote Bags", subcategory: "Women Handbags" },
      { label: "35L Anti-Theft Laptop Backpacks", subcategory: "Backpacks" },
      { label: "Daily Casual Slip-ons & Flats", subcategory: "Women Flats" },
    ],
    col2Title: "Materials & Designs",
    col2Links: [
      { label: "Pure Vegetable Tanned Leather", subcategory: "Ethnic Footwear" },
      { label: "Memory Foam Cushion Soles", subcategory: "Men's Footwear" },
      { label: "Waterproof Ballistic Oxford", subcategory: "Backpacks" },
      { label: "Multi-Pocket Travel Organizers", subcategory: "Backpacks" },
      { label: "Office & Formal Wear Shoes", subcategory: "Men's Footwear" },
      { label: "Sports Running Mesh Footwear", subcategory: "Men Footwear" },
    ],
    tagline: "Agra Footwear Cluster & Kolhapur Artisans",
    hubBadge: "Agra Leather City",
  },
  "Electronics": {
    col1Title: "Gadgets & Audio",
    col1Links: [
      { label: "ANC True Wireless Bluetooth Earbuds", subcategory: "Audio & Headphones" },
      { label: "1.83\" HD Bluetooth Calling Watch", subcategory: "Smartwatches" },
      { label: "65W GaN Fast Dual Port Chargers", subcategory: "Mobile Accessories" },
      { label: "10W Waterproof Bluetooth Speaker", subcategory: "Speakers" },
      { label: "Touch Dimmable LED Study Lamp", subcategory: "Gadgets" },
      { label: "Braided Fast Type-C Data Cables", subcategory: "Chargers & Cables" },
    ],
    col2Title: "Tech Features",
    col2Links: [
      { label: "40-Hour Battery Playtime", subcategory: "Audio & Headphones" },
      { label: "AMOLED SpO2 & Heart Trackers", subcategory: "Smartwatches" },
      { label: "GaN Multi-Device Rapid Power", subcategory: "Mobile Accessories" },
      { label: "Deep Bass Passive Radiators", subcategory: "Speakers" },
      { label: "Eye-Care Study & Night Lights", subcategory: "Gadgets" },
      { label: "IPX6 Waterproof Rating", subcategory: "Speakers" },
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