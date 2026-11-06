"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  SlidersHorizontal,
  Grid3X3,
  Sparkles,
  Search,
  RotateCcw,
  Star,
  X,
  ChevronRight,
  Filter,
  Check,
  Tag,
} from "lucide-react";
import { PRODUCTS, CATEGORIES, Product } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import { formatPrice } from "@/lib/utils";

// Strict & Accurate Subcategory Matching Engine (Prevents cross-category bleeds like shirts under t-shirts or jeans matching tops)
function matchProductSubcategory(p: Product, targetSubcategory: string): boolean {
  if (!targetSubcategory || targetSubcategory.toLowerCase().startsWith("all")) return true;

  const target = targetSubcategory.toLowerCase().trim();
  const pSub = p.subcategory.toLowerCase().trim();
  const pTitle = p.title.toLowerCase().trim();

  // 1. Precise Shirt vs T-shirt isolation (prevents shirts from pulling in t-shirts or vice-versa)
  const isTshirtTarget = target.includes("t-shirt") || target.includes("tshirt") || target === "t-shirts";
  const isShirtTarget =
    !isTshirtTarget &&
    (target === "shirts" || target === "shirt" || target.includes("casual shirt") || target.includes("checked shirt") || target.includes("collar shirt"));

  const isTshirtProduct = pSub.includes("t-shirt") || pSub.includes("tshirt") || pTitle.includes("t-shirt") || pTitle.includes("tshirt");
  const isShirtProduct = !isTshirtProduct && (pSub === "shirts" || pSub === "shirt" || pTitle.includes("shirt"));

  if (isShirtTarget) return isShirtProduct;
  if (isTshirtTarget) return isTshirtProduct;

  // 2. Direct exact subcategory match
  if (pSub === target) return true;

  // 3. Saree variants
  if (target === "sarees" || target === "all sarees") {
    return pSub.includes("saree") || pTitle.includes("saree");
  }
  if (target.includes("silk saree") || target.includes("banarasi")) {
    return (pSub.includes("saree") || pTitle.includes("saree")) && (pTitle.includes("silk") || pSub.includes("silk") || pTitle.includes("banarasi"));
  }
  if (target.includes("cotton saree") || target.includes("chanderi") || target.includes("jaipur")) {
    return (pSub.includes("saree") || pTitle.includes("saree")) && (pTitle.includes("cotton") || pTitle.includes("chanderi") || pTitle.includes("jaipur"));
  }

  // 4. Kurti / Kurta Sets
  if (target.includes("kurta set")) {
    return pSub.includes("kurta set") || pTitle.includes("kurta & pant") || pTitle.includes("kurta set");
  }
  if (target.includes("kurti") || target.includes("anarkali")) {
    return (pSub.includes("kurti") || pTitle.includes("kurti") || pTitle.includes("anarkali")) && !pSub.includes("kurta set");
  }

  // 5. Lehenga
  if (target.includes("lehenga")) {
    return pSub.includes("lehenga") || pTitle.includes("lehenga");
  }

  // 6. Tops vs Dresses vs Jeans
  if (target === "tops" || target.includes("top") || target.includes("peplum")) {
    return pSub === "tops" || (pTitle.includes("top") && !pSub.includes("dress"));
  }
  if (target === "dresses" || target === "dress" || target.includes("midi dress") || target.includes("maxi dress") || target.includes("bodycon")) {
    return pSub === "dresses" || pTitle.includes("dress");
  }
  if (target === "jeans" || target.includes("denim jeans") || target.includes("straight fit")) {
    return pSub === "jeans" || (pTitle.includes("jeans") && !pTitle.includes("shirt"));
  }

  // 7. Trousers / Chinos
  if (target.includes("trouser") || target.includes("chino")) {
    return pSub.includes("trouser") || pTitle.includes("trouser") || pTitle.includes("chino");
  }

  // 8. Men Ethnic
  if (target.includes("ethnic wear") || target.includes("kurta")) {
    return pSub.includes("ethnic wear") || pTitle.includes("kurta");
  }

  // 9. Footwear distinctions
  if (target.includes("kolhapuri") || target.includes("ethnic footwear")) {
    return pSub.includes("ethnic footwear") || pTitle.includes("kolhapuri");
  }
  if (target.includes("loafer")) {
    return pTitle.includes("loafer");
  }
  if (target.includes("running") || target.includes("sneaker")) {
    return pTitle.includes("running") || pTitle.includes("sneaker");
  }
  if (target === "men footwear" || target === "men's footwear" || target.includes("shoes")) {
    return pSub.includes("footwear") && !pSub.includes("women");
  }
  if (target.includes("handbag") || target.includes("sling")) {
    return pSub.includes("handbag") || pTitle.includes("handbag") || pTitle.includes("sling");
  }

  // 10. Kids
  if (target.includes("girls")) return pSub.includes("girls") || pTitle.includes("girls") || pTitle.includes("frock");
  if (target.includes("boys")) return pSub.includes("boys") || pTitle.includes("boys");
  if (target.includes("baby") || target.includes("romper") || target.includes("infant")) {
    return pSub.includes("baby") || pTitle.includes("romper") || pTitle.includes("baby");
  }
  if (target.includes("toy")) return pSub.includes("toy") || pTitle.includes("toy");
  if (target.includes("school") || target.includes("backpack")) {
    return pSub.includes("school") || pTitle.includes("school") || pSub.includes("backpack") || pTitle.includes("backpack");
  }

  // 11. Home & Kitchen
  if (target.includes("bedsheet")) return pSub.includes("bedsheet") || pTitle.includes("bedsheet");
  if (target.includes("curtain")) return pSub.includes("curtain") || pTitle.includes("curtain");
  if (target.includes("cookware") || target.includes("kadai") || target.includes("pan")) return pSub.includes("cookware") || pTitle.includes("cookware");
  if (target.includes("chopper") || target.includes("kitchen tool")) return pSub.includes("kitchen") || pTitle.includes("chopper");
  if (target.includes("diffuser") || target.includes("decor") || target.includes("lamp")) return pSub.includes("decor") || pTitle.includes("diffuser");

  // 12. Beauty
  if (target.includes("lipstick") || target === "makeup") return pSub === "makeup" || pTitle.includes("lipstick");
  if (target.includes("brush") || target.includes("makeup tool")) return pSub.includes("tool") || pTitle.includes("brush");
  if (target.includes("skincare") || target.includes("serum") || target.includes("aloe") || target.includes("face wash")) {
    return pSub === "skincare";
  }

  // 13. Jewellery
  if (target.includes("jewellery set") || target.includes("necklace") || target.includes("choker")) return pSub.includes("jewellery set") || pTitle.includes("choker");
  if (target.includes("earring") || target.includes("jhumk")) return pSub.includes("earring") || pTitle.includes("jhumk");
  if (target.includes("wallet")) return pSub.includes("wallet") || pTitle.includes("wallet");
  if (target.includes("sunglass")) return pSub.includes("sunglass") || pTitle.includes("sunglass");
  if (target.includes("bracelet") || target.includes("bangle")) return pSub.includes("bracelet") || pTitle.includes("bracelet") || pTitle.includes("bangle");

  // 14. Electronics
  if (target.includes("audio") || target.includes("headphone") || target.includes("earbud")) return pSub.includes("audio") || pTitle.includes("earbud");
  if (target.includes("smartwatch") || target.includes("watch")) return pSub.includes("smartwatch") || pTitle.includes("watch");
  if (target.includes("charger") || target.includes("mobile accessories")) return pSub.includes("mobile accessories") || pTitle.includes("charger");
  if (target.includes("speaker")) return pSub.includes("speaker") || pTitle.includes("speaker");
  if (target.includes("gadget") || target.includes("desk lamp")) return pSub.includes("gadget") || pTitle.includes("desk lamp");

  // Strict direct match on subcategory or title (never descriptions)
  return pSub.includes(target) || pTitle.includes(target);
}

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSubcategory = searchParams.get("subcategory") || "";
  const initialSearch = searchParams.get("q") || "";
  const initialFilter = searchParams.get("filter") || "";
  const initialDeal = searchParams.get("deal") === "true";

  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(initialSubcategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [priceRange, setPriceRange] = useState<number>(
    initialFilter === "under299" ? 299 : initialFilter === "under499" ? 499 : 1000
  );
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Sync state whenever URL query params change (e.g. clicking MegaMenu items)
  useEffect(() => {
    const cat = searchParams.get("category") || "all";
    const subcat = searchParams.get("subcategory") || "";
    const q = searchParams.get("q") || "";
    const filt = searchParams.get("filter") || "";

    setSelectedCategory(cat);
    setSelectedSubcategory(subcat);
    if (q) setSearchQuery(q);
    if (filt === "under299") setPriceRange(299);
    else if (filt === "under499") setPriceRange(499);
  }, [searchParams]);

  // Fetch dynamically added products from API runtime store
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          setProductsList(data.data);
        }
      })
      .catch(() => {
        // Fallback to static PRODUCTS
      });
  }, []);

  // Find subcategories for currently active category
  const currentCategoryData = useMemo(() => {
    return CATEGORIES.find(
      (c) => c.name.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [selectedCategory]);

  // Filter logic
  const filteredProducts = useMemo(() => {
    return productsList
      .filter((p) => {
        // Category filter
        if (selectedCategory !== "all" && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }

        // Subcategory filter with 100% accurate matching (No cross-category bleeding)
        if (selectedSubcategory && !matchProductSubcategory(p, selectedSubcategory)) {
          return false;
        }

        // Deal query
        if (initialDeal && !p.isDeal && !p.discountBadge) {
          return false;
        }

        // Search query
        if (
          searchQuery &&
          !p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.brand.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.category.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        // Price
        if (p.price > priceRange) return false;

        // Rating
        if (selectedRating > 0 && p.rating < selectedRating) return false;

        // Stock
        if (inStockOnly && (!p.inStock || p.stockCount === 0)) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0; // featured default
      });
  }, [
    productsList,
    selectedCategory,
    selectedSubcategory,
    initialDeal,
    searchQuery,
    priceRange,
    selectedRating,
    inStockOnly,
    sortBy,
  ]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedSubcategory("");
    setSearchQuery("");
    setPriceRange(1000);
    setSelectedRating(0);
    setInStockOnly(false);
    setSortBy("featured");
  };

  return (
    <div className="pt-4 pb-16 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <Link href="/" className="hover:text-[#681a72]">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-gray-800 dark:text-gray-200 font-medium">
          {selectedCategory === "all" ? "All Products" : selectedCategory}
        </span>
        {selectedSubcategory && (
          <>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-[#681a72] font-medium">{selectedSubcategory}</span>
          </>
        )}
      </div>

      {/* Header Banner */}
      <div className="mb-4 p-4 sm:p-6 bg-white dark:bg-[#1a1d24] rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span>{selectedCategory === "all" ? "Explore All Velora Collections" : selectedCategory}</span>
            {selectedSubcategory && (
              <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-[#681a72] dark:text-rose-400 border border-rose-200 dark:border-rose-800/40">
                {selectedSubcategory}
              </span>
            )}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Showing <strong className="text-[#681a72] dark:text-rose-400">{filteredProducts.length}</strong> wholesale items with 0% markup & Free COD
          </p>
        </div>

        {/* Search inside shop */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search in ${selectedCategory === "all" ? "catalog" : selectedCategory}...`}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-[#681a72]"
          />
        </div>
      </div>

      {/* Subcategory Pills Row (Appears when a specific category or Women Ethnic is chosen) */}
      {currentCategoryData && currentCategoryData.subcategories.length > 0 && (
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 whitespace-nowrap mr-1">
            Subcategories:
          </span>
          <button
            onClick={() => setSelectedSubcategory("")}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              !selectedSubcategory
                ? "bg-[#681a72] text-white shadow-sm shadow-[#681a72]/30 scale-105"
                : "bg-white dark:bg-[#1a1d24] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-[#681a72]"
            }`}
          >
            All {selectedCategory}
          </button>
          {currentCategoryData.subcategories
            .filter((sub) => sub !== `All ${selectedCategory}`)
            .map((sub) => {
              const isActive = selectedSubcategory.toLowerCase() === sub.toLowerCase();
              return (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(isActive ? "" : sub)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#681a72] text-white shadow-sm shadow-[#681a72]/30 scale-105"
                      : "bg-white dark:bg-[#1a1d24] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-[#681a72]"
                  }`}
                >
                  {sub}
                </button>
              );
            })}
        </div>
      )}

      {/* Main Catalog Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between p-3 rounded-lg bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 shadow-xs">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 text-xs font-semibold text-gray-800 dark:text-gray-200"
          >
            <Filter className="w-4 h-4 text-[#681a72]" />
            <span>Filter Results ({filteredProducts.length})</span>
          </button>
          <button onClick={resetFilters} className="text-xs text-[#681a72] font-semibold underline">
            Reset
          </button>
        </div>

        {/* Filter Sidebar */}
        <aside
          className={`lg:col-span-3 bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs space-y-5 sticky top-24 ${
            mobileFilterOpen ? "block" : "hidden lg:block"
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
            <span className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-[#681a72]" />
              Filter By
            </span>
            <button
              onClick={resetFilters}
              className="text-xs text-[#681a72] hover:underline font-semibold"
            >
              Reset All
            </button>
          </div>

          {/* Category List */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Category
            </p>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 cursor-pointer">
                <input
                  type="radio"
                  name="shop-cat"
                  checked={selectedCategory === "all"}
                  onChange={() => {
                    setSelectedCategory("all");
                    setSelectedSubcategory("");
                  }}
                  className="accent-[#681a72]"
                />
                <span>All Categories</span>
              </label>
              {CATEGORIES.map((c) => (
                <label
                  key={c.id}
                  className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="shop-cat"
                    checked={selectedCategory === c.name}
                    onChange={() => {
                      setSelectedCategory(c.name);
                      setSelectedSubcategory("");
                    }}
                    className="accent-[#681a72]"
                  />
                  <span>{c.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Subcategory List in Sidebar */}
          {currentCategoryData && currentCategoryData.subcategories.length > 0 && (
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Subcategories ({currentCategoryData.name})
              </p>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                <button
                  type="button"
                  onClick={() => setSelectedSubcategory("")}
                  className={`flex items-center justify-between w-full text-left text-xs px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    !selectedSubcategory
                      ? "bg-rose-50 dark:bg-rose-950/40 text-[#681a72] dark:text-rose-400 font-bold"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <span>All {currentCategoryData.name}</span>
                  {!selectedSubcategory && <Check className="w-3.5 h-3.5 text-[#681a72]" />}
                </button>
                {currentCategoryData.subcategories
                  .filter((sub) => sub !== `All ${currentCategoryData.name}`)
                  .map((sub) => {
                    const isSelected = selectedSubcategory.toLowerCase() === sub.toLowerCase();
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => setSelectedSubcategory(isSelected ? "" : sub)}
                        className={`flex items-center justify-between w-full text-left text-xs px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-rose-50 dark:bg-rose-950/40 text-[#681a72] dark:text-rose-400 font-bold"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        <span>{sub}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#681a72]" />}
                      </button>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Price Range Slider */}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Price Under
              </p>
              <span className="text-xs font-bold text-[#681a72] dark:text-rose-400">₹{priceRange}</span>
            </div>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#681a72] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>₹100</span>
              <span>₹500</span>
              <span>₹1000</span>
            </div>
          </div>

          {/* Rating Filter */}
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
                      ? "bg-rose-50 dark:bg-rose-950/30 text-[#681a72] dark:text-rose-400 font-bold"
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

          {/* In Stock Toggle */}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
            <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-[#681a72] rounded-sm"
              />
              <span>In Stock Items Only</span>
            </label>
          </div>
        </aside>

        {/* Right Main Grid */}
        <div className="col-span-1 lg:col-span-9">
          {/* Top Sort Bar */}
          <div className="flex items-center justify-between mb-4 bg-white dark:bg-[#1a1d24] p-3 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs">
            <span className="text-xs text-gray-500">
              Showing <strong>{filteredProducts.length}</strong> items
            </span>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500 hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1 text-xs text-gray-800 dark:text-gray-200 outline-none"
              >
                <option value="featured">Featured / Trending</option>
                <option value="price-asc">Price (Lowest First)</option>
                <option value="price-desc">Price (Highest First)</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {(selectedCategory !== "all" || selectedSubcategory || searchQuery || selectedRating > 0 || inStockOnly) && (
            <div className="flex flex-wrap items-center gap-2 mb-4 bg-white dark:bg-[#1a1d24] p-3 rounded-xl border border-gray-100 dark:border-gray-800">
              <span className="text-xs text-gray-400 font-medium">Active:</span>
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#681a72]/10 text-[#681a72] dark:text-rose-300">
                  Dept: {selectedCategory}
                  <button onClick={() => { setSelectedCategory("all"); setSelectedSubcategory(""); }} className="hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedSubcategory && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-600 dark:text-rose-300">
                  {selectedSubcategory}
                  <button onClick={() => setSelectedSubcategory("")} className="hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  &ldquo;{searchQuery}&rdquo;
                  <button onClick={() => setSearchQuery("")} className="hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedRating > 0 && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  {selectedRating}★ & above
                  <button onClick={() => setSelectedRating(0)} className="hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-xs text-[#681a72] dark:text-rose-400 hover:underline font-semibold ml-auto cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-12 text-center">
              <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                No products found matching your search.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-[#681a72] hover:bg-[#52135a] text-white text-xs font-semibold rounded-lg"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Loading Velora Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
