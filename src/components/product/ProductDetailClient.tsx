"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  RotateCcw,
  IndianRupee,
  ShieldCheck,
  Check,
  Sparkles,
  ChevronRight,
  Share2,
  MapPin,
  Store,
  Layers,
  ArrowRight,
} from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || "Free Size");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Delivery Pincode state
  const [pincode, setPincode] = useState("110001");
  const [pincodeChecked, setPincodeChecked] = useState(true);

  // Size chart modal
  const [sizeChartOpen, setSizeChartOpen] = useState(false);

  // Review modal
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewComment, setNewReviewComment] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewsList, setReviewsList] = useState(product.reviews || []);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));

  const handleAddToCart = () => {
    addItem(
      product,
      quantity,
      product.colors?.[selectedColorIdx]?.name,
      selectedSize
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(
      product,
      quantity,
      product.colors?.[selectedColorIdx]?.name,
      selectedSize
    );
    router.push("/checkout");
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeChecked(true);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      userName: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: "Just now",
      title: "Customer Review",
      comment: newReviewComment.trim(),
      verified: true,
    };

    setReviewsList([newRev, ...reviewsList]);
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewModalOpen(false);
      setReviewSubmitted(false);
      setNewReviewAuthor("");
      setNewReviewComment("");
    }, 1500);
  };

  const similarProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] pt-3 sm:pt-4 pb-28 sm:pb-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3 sm:mb-4 overflow-x-auto whitespace-nowrap scrollbar-none">
          <Link href="/" className="hover:text-[#681a72]">Home</Link>
          <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-[#681a72]">
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
          <span className="text-gray-800 dark:text-gray-200 truncate">{product.title}</span>
        </div>

        {/* Main 2-Column Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* LEFT: Image Gallery & Buy CTA Buttons */}
          <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              {/* Vertical Thumbnail Strip (Horizontal swipe on mobile) */}
              {product.images.length > 1 && (
                <div className="flex sm:flex-col gap-2 order-2 sm:order-1 overflow-x-auto sm:overflow-y-auto scrollbar-none pb-1 sm:pb-0">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative w-14 h-18 sm:w-16 sm:h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        activeImageIdx === idx
                          ? "border-[#681a72] dark:border-[#c084fc] ring-2 ring-purple-100 dark:ring-purple-900/40"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.title} - view ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Large Portrait Image with 3D Specular Sheen */}
              <div className="relative flex-1 aspect-[3/4] bg-white dark:bg-[#1e293b] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 order-1 sm:order-2 shadow-lg group sheen-overlay">
                <Image
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-104"
                  priority
                />

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-3 right-3 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-md transition-all active:scale-90 ${
                    isInWishlist
                      ? "bg-rose-50 text-[#e11d48]"
                      : "bg-white/90 text-gray-500 hover:text-[#e11d48]"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isInWishlist ? "fill-[#e11d48]" : ""}`} />
                </button>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="absolute top-14 sm:top-15 right-3 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 text-gray-500 hover:text-[#681a72] flex items-center justify-center shadow-md transition-all active:scale-90"
                  aria-label="Share product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                {copiedLink && (
                  <div className="absolute top-14 sm:top-15 right-14 bg-black text-white text-[10px] font-bold px-2 py-1 rounded-md shadow">
                    Link Copied!
                  </div>
                )}
              </div>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden sm:grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="py-3 px-4 bg-white dark:bg-transparent border-2 border-[#681a72] dark:border-[#c084fc] text-[#681a72] dark:text-[#c084fc] font-bold text-xs sm:text-sm rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-all flex items-center justify-center gap-2 shadow-xs active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isAdded ? "Added to Cart ✓" : "Add to Cart"}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="btn-3d py-3 px-4 bg-gradient-to-r from-[#681a72] to-[#e11d48] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* RIGHT: Product Details, Pricing, Size, Supplier, Specs */}
          <div className="lg:col-span-7 space-y-4">
            {/* Title & Brand Card */}
            <div className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-5 shadow-xs">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                {product.brand}
              </span>
              <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mt-1 leading-snug">
                {product.title}
              </h1>

              {/* Price & Discount */}
              <div className="flex items-baseline gap-2.5 sm:gap-3 mt-2 sm:mt-3">
                <span className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs sm:text-sm text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discountBadge && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                    {product.discountBadge}
                  </span>
                )}
              </div>

              {/* Rating and Free Delivery Pill */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                <div className="rating-pill">
                  <span>{product.rating.toFixed(1)}</span>
                  <Star className="w-3 h-3 fill-white" />
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  {product.reviewsCount.toLocaleString()} Ratings, {reviewsList.length} Reviews
                </span>
                <span className="free-delivery-badge">Free Delivery</span>
              </div>
            </div>

            {/* Size Selector Card */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-5 shadow-xs">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    Select Size
                  </span>
                  <button
                    onClick={() => setSizeChartOpen(true)}
                    className="text-xs text-[#681a72] dark:text-[#c084fc] font-bold hover:underline"
                  >
                    Size Chart
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedSize === sz
                          ? "border-[#681a72] bg-purple-50 text-[#681a72] dark:border-[#c084fc] dark:bg-purple-950/40 dark:text-[#c084fc]"
                          : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Swatch Card */}
            {product.colors && product.colors.length > 1 && (
              <div className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-5 shadow-xs">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2.5">
                  Available Colors:{" "}
                  <span className="text-[#681a72] dark:text-[#c084fc]">{product.colors[selectedColorIdx]?.name}</span>
                </p>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c, idx) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColorIdx(idx)}
                      className={`w-8 h-8 rounded-full border-2 transition-transform ${
                        selectedColorIdx === idx
                          ? "ring-2 ring-[#681a72] scale-110"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Delivery & Pincode Checker Card */}
            <div className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-5 shadow-xs">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#681a72] dark:text-[#c084fc]" />
                Delivery Details
              </p>

              <form onSubmit={handlePincodeCheck} className="flex items-center gap-2 max-w-xs mb-3">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 6-digit Pincode"
                  className="w-full text-xs px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl outline-none focus:border-[#681a72] dark:bg-gray-800"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#681a72] text-white text-xs font-bold rounded-xl hover:bg-[#56135e]"
                >
                  Check
                </button>
              </form>

              {pincodeChecked && (
                <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                  <p className="flex items-center gap-2 text-emerald-600 font-semibold">
                    <Truck className="w-4 h-4" />
                    <span>Estimated Delivery within 3-4 business days</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-gray-500" />
                    <span>Cash on Delivery (COD) Available</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-gray-500" />
                    <span>7 Days Easy Return & 100% Refund</span>
                  </p>
                </div>
              )}
            </div>

            {/* Supplier / Seller Info Card */}
            <div className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800 mb-3">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Sold By Manufacturer
                  </span>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                    <Store className="w-4 h-4 text-[#681a72] dark:text-[#c084fc]" />
                    {product.supplier?.name || "Verified Wholesale Hub"}
                  </h4>
                </div>
                <button className="px-3 py-1.5 border border-[#681a72] text-[#681a72] dark:border-[#c084fc] dark:text-[#c084fc] hover:bg-purple-50 text-xs font-bold rounded-lg">
                  Follow
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 text-center text-xs">
                <div className="bg-gray-50 dark:bg-gray-800/80 p-2 rounded-xl">
                  <div className="rating-pill mx-auto mb-1">
                    <span>{product.supplier?.rating || 4.3}</span>
                    <Star className="w-2.5 h-2.5 fill-white" />
                  </div>
                  <span className="text-[10px] text-gray-400">Supplier Rating</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/80 p-2 rounded-xl">
                  <p className="font-bold text-gray-800 dark:text-gray-200">
                    {(product.supplier?.followers || 15400).toLocaleString()}
                  </p>
                  <span className="text-[10px] text-gray-400">Followers</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/80 p-2 rounded-xl">
                  <p className="font-bold text-gray-800 dark:text-gray-200">
                    {product.supplier?.productsCount || 85}
                  </p>
                  <span className="text-[10px] text-gray-400">Products</span>
                </div>
              </div>
            </div>

            {/* Product Specifications & Details Table */}
            <div className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-5 shadow-xs">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2.5">
                Product Specifications
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3.5">
                {product.description}
              </p>

              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden text-xs">
                  {Object.entries(product.specs).map(([key, val], idx) => (
                    <div
                      key={key}
                      className={`grid grid-cols-2 p-2.5 ${
                        idx % 2 === 0
                          ? "bg-gray-50/70 dark:bg-gray-800/40"
                          : "bg-white dark:bg-transparent"
                      }`}
                    >
                      <span className="font-medium text-gray-500">{key}</span>
                      <span className="text-gray-900 dark:text-gray-100">{val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Customer Ratings & Reviews */}
            <div className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    Ratings & Reviews
                  </h3>
                  <p className="text-xs text-gray-500">From verified customers</p>
                </div>
                <button
                  onClick={() => setReviewModalOpen(true)}
                  className="px-3 py-1.5 bg-[#681a72] text-white text-xs font-bold rounded-lg hover:bg-[#56135e]"
                >
                  Write Review
                </button>
              </div>

              {/* Reviews Summary */}
              <div className="p-3.5 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center gap-6 mb-4">
                <div className="text-center">
                  <span className="text-3xl font-black text-emerald-600">
                    {product.rating.toFixed(1)}
                  </span>
                  <div className="flex justify-center text-emerald-600 mt-1">
                    <Star className="w-4 h-4 fill-emerald-600" />
                  </div>
                  <span className="text-[10px] text-gray-400 block mt-1">Overall</span>
                </div>
                <div className="flex-1 space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-4">5★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-4/5" />
                    </div>
                    <span className="text-[10px] text-gray-400">80%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4">4★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 w-1/5" />
                    </div>
                    <span className="text-[10px] text-gray-400">15%</span>
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-3">
                {reviewsList.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-3 border border-gray-100 dark:border-gray-800 rounded-xl space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rating-pill">
                        <span>{rev.rating}</span>
                        <Star className="w-2.5 h-2.5 fill-white" />
                      </span>
                      <span className="text-[10px] text-gray-400">{rev.date}</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                      {rev.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{rev.comment}</p>
                    <p className="text-[10px] text-gray-400 pt-1">
                      By <strong className="text-gray-600 dark:text-gray-300">{rev.userName}</strong> •{" "}
                      <span className="text-emerald-600 font-medium">Verified Buyer ✓</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products Grid */}
        {similarProducts.length > 0 && (
          <div className="mt-8 sm:mt-12">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              People Also Viewed in {product.category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MOBILE STICKY BOTTOM ACTION BAR (Critical for Mobile Conversion) */}
      <div className="sm:hidden fixed bottom-12 left-0 right-0 z-40 bg-white/95 dark:bg-[#1e293b]/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 p-2.5 flex items-center gap-2 shadow-[0_-4px_25px_rgba(0,0,0,0.1)]">
        <button
          onClick={handleAddToCart}
          className="flex-1 py-3 border-2 border-[#681a72] dark:border-[#c084fc] text-[#681a72] dark:text-[#c084fc] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{isAdded ? "Added to Cart ✓" : "Add to Cart"}</span>
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 py-3 bg-gradient-to-r from-[#681a72] to-[#e11d48] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
        >
          <Sparkles className="w-4 h-4" />
          <span>Buy Now</span>
        </button>
      </div>

      {/* Size Chart Modal */}
      {sizeChartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setSizeChartOpen(false)} />
          <div className="relative bg-white dark:bg-[#1e293b] rounded-2xl max-w-md w-full p-6 shadow-2xl z-10">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
              Size Chart (Inches)
            </h4>
            <p className="text-xs text-gray-500 mb-4">
              Standard Indian garment measurement guide
            </p>
            <table className="w-full text-xs text-left border border-gray-200 dark:border-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="p-2 border">Size</th>
                  <th className="p-2 border">Bust / Chest</th>
                  <th className="p-2 border">Waist</th>
                  <th className="p-2 border">Length</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border font-bold">S</td>
                  <td className="p-2 border">36"</td>
                  <td className="p-2 border">32"</td>
                  <td className="p-2 border">42"</td>
                </tr>
                <tr>
                  <td className="p-2 border font-bold">M</td>
                  <td className="p-2 border">38"</td>
                  <td className="p-2 border">34"</td>
                  <td className="p-2 border">42"</td>
                </tr>
                <tr>
                  <td className="p-2 border font-bold">L</td>
                  <td className="p-2 border">40"</td>
                  <td className="p-2 border">36"</td>
                  <td className="p-2 border">43"</td>
                </tr>
                <tr>
                  <td className="p-2 border font-bold">XL</td>
                  <td className="p-2 border">42"</td>
                  <td className="p-2 border">38"</td>
                  <td className="p-2 border">43"</td>
                </tr>
                <tr>
                  <td className="p-2 border font-bold">XXL</td>
                  <td className="p-2 border">44"</td>
                  <td className="p-2 border">40"</td>
                  <td className="p-2 border">44"</td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={() => setSizeChartOpen(false)}
              className="mt-4 w-full py-2.5 bg-[#681a72] text-white text-xs font-bold rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Review Write Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setReviewModalOpen(false)} />
          <div className="relative bg-white dark:bg-[#1e293b] rounded-2xl max-w-md w-full p-6 shadow-2xl z-10 space-y-4">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              Rate & Review Product
            </h4>

            {reviewSubmitted ? (
              <div className="p-4 text-center text-emerald-600 font-bold text-xs">
                Thank you! Your review has been published.
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold block mb-1">Your Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReviewRating(star)}
                        className="p-1"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= newReviewRating
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-xl dark:bg-gray-800 outline-none focus:border-[#681a72]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1">Review Description</label>
                  <textarea
                    rows={3}
                    required
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="Tell us about the fabric quality, color, and fitting..."
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-xl dark:bg-gray-800 outline-none focus:border-[#681a72]"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReviewModalOpen(false)}
                    className="flex-1 py-2.5 border border-gray-300 text-xs font-bold rounded-xl text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#681a72] text-white text-xs font-bold rounded-xl hover:bg-[#56135e]"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
