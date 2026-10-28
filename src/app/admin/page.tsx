"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp,
  Package,
  IndianRupee,
  Users,
  Check,
  Plus,
  Trash2,
  Sparkles,
  Truck,
  Store,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { PRODUCTS as INITIAL_PRODUCTS, Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export default function SupplierAdminPage() {
  const [productsList, setProductsList] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeTab, setActiveTab] = useState<"overview" | "catalog" | "orders">("overview");
  const [newModalOpen, setNewModalOpen] = useState(false);

  // New product form
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Women Ethnic");
  const [newPrice, setNewPrice] = useState(299);
  const [newOriginalPrice, setNewOriginalPrice] = useState(999);
  const [newStock, setNewStock] = useState(100);

  // Orders
  const [orders, setOrders] = useState([
    {
      id: "VEL-ORD-90214",
      customer: "Kavita Rao, Pune",
      product: "Kashvi Pretty Banarasi Silk Saree",
      amount: 389,
      date: "Today, 11:20 AM",
      status: "Ready to Dispatch",
    },
    {
      id: "VEL-ORD-90215",
      customer: "Amit Verma, Lucknow",
      product: "Urbane Modern Checked Casual Shirt",
      amount: 349,
      date: "Today, 09:45 AM",
      status: "In Transit",
    },
    {
      id: "VEL-ORD-90216",
      customer: "Sangeeta Nair, Bengaluru",
      product: "Elite Super Soft Glace Cotton Bedsheet",
      amount: 289,
      date: "Yesterday",
      status: "Delivered",
    },
  ]);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProd: Product = {
      id: `prod-sup-${Date.now()}`,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: newTitle,
      subtitle: `${newCategory} wholesale product direct from Surat mill`,
      category: newCategory as any,
      subcategory: "New Arrivals",
      brand: "Radhika Silk Mills",
      price: Number(newPrice),
      originalPrice: Number(newOriginalPrice),
      discountBadge: `${Math.round(((newOriginalPrice - newPrice) / newOriginalPrice) * 100)}% off`,
      badge: "New Arrival",
      rating: 4.5,
      reviewsCount: 1,
      inStock: true,
      stockCount: Number(newStock),
      freeDelivery: true,
      images: [
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
      ],
      turntableImages: [],
      colors: [{ name: "Standard", hex: "#681a72" }],
      description: "Direct factory wholesale collection listed with 0% commission on Velora.",
      craftsmanship: "Powerloom weaving with premium Indian threads.",
      specs: {
        "Fabric": "High Quality Blend",
        "Country of Origin": "India",
      },
      features: ["Colorfast", "Direct Factory Price", "Ready to ship"],
      reviews: [],
    };

    setProductsList([newProd, ...productsList]);
    setNewModalOpen(false);
    setNewTitle("");
  };

  const handleDeleteProduct = (id: string) => {
    setProductsList(productsList.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f8f8f9] dark:bg-[#111317] pt-6 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-[#681a72] dark:text-rose-400 flex items-center justify-center">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[#681a72] dark:text-rose-400 text-xl">velora</span>
                <span className="text-xs bg-rose-100 text-[#681a72] font-bold px-2 py-0.5 rounded-sm">
                  Supplier Panel
                </span>
              </div>
              <h1 className="text-sm font-bold text-gray-800 dark:text-gray-200 mt-0.5">
                Surat Wholesale Garments & Handlooms (GST: 24AABCU9603R1ZM)
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setNewModalOpen(true)}
              className="px-4 py-2 bg-[#681a72] hover:bg-[#52135a] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs">
            <p className="text-xs text-gray-500">Total Net Sales (This Month)</p>
            <p className="text-xl font-black text-gray-900 dark:text-white mt-1">₹1,84,520</p>
            <span className="text-[10px] text-emerald-600 font-bold">↑ 24% vs last month</span>
          </div>

          <div className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs">
            <p className="text-xs text-gray-500">Orders Dispatched</p>
            <p className="text-xl font-black text-gray-900 dark:text-white mt-1">492 Orders</p>
            <span className="text-[10px] text-emerald-600 font-bold">100% on-time SLA</span>
          </div>

          <div className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs">
            <p className="text-xs text-gray-500">Commission Paid</p>
            <p className="text-xl font-black text-emerald-600 mt-1">₹0 (0% Fee)</p>
            <span className="text-[10px] text-gray-400">Zero commission benefit</span>
          </div>

          <div className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs">
            <p className="text-xs text-gray-500">Next Payout</p>
            <p className="text-xl font-black text-[#681a72] dark:text-rose-400 mt-1">₹42,800</p>
            <span className="text-[10px] text-gray-400">Disbursed on Friday</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-800 text-xs font-bold gap-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === "overview"
                ? "border-[#681a72] text-[#681a72] dark:border-rose-400 dark:text-rose-400"
                : "border-transparent text-gray-500 hover:text-black dark:hover:text-white"
            }`}
          >
            Recent Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("catalog")}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === "catalog"
                ? "border-[#681a72] text-[#681a72] dark:border-rose-400 dark:text-rose-400"
                : "border-transparent text-gray-500 hover:text-black dark:hover:text-white"
            }`}
          >
            Catalog Inventory ({productsList.length} Products)
          </button>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === "overview" && (
          <div className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Recent Customer Orders
              </h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {orders.map((ord) => (
                <div key={ord.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white font-mono">{ord.id}</span>
                    <p className="text-gray-600 dark:text-gray-400 mt-0.5">{ord.product}</p>
                    <p className="text-gray-400 text-[11px] mt-0.5">Buyer: {ord.customer} • {ord.date}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-black text-gray-900 dark:text-white text-sm">
                      {formatPrice(ord.amount)}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        ord.status === "Ready to Dispatch"
                          ? "bg-amber-100 text-amber-800"
                          : ord.status === "In Transit"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {ord.status}
                    </span>
                    <button className="px-3 py-1.5 bg-[#681a72] hover:bg-[#52135a] text-white rounded-md text-[11px] font-bold transition-colors">
                      Print Label
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CATALOG INVENTORY */}
        {activeTab === "catalog" && (
          <div className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Live Wholesale Catalog
              </h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {productsList.map((p) => (
                <div key={p.id} className="p-4 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-12 h-14 rounded-md overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700">
                      <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-gray-900 dark:text-white truncate">{p.title}</h4>
                      <p className="text-gray-400 text-[11px]">{p.category} • Stock: {p.stockCount} units</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-bold text-gray-900 dark:text-white">
                      {formatPrice(p.price)}
                    </span>
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="text-gray-400 hover:text-red-500 p-1"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {newModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setNewModalOpen(false)} />
          <div className="relative bg-white dark:bg-[#1a1d24] rounded-2xl p-6 max-w-md w-full shadow-2xl z-10 space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              List New Product to Velora
            </h3>

            <form onSubmit={handleAddProduct} className="space-y-3">
              <div>
                <label className="text-xs font-semibold block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Trendy Floral Silk Saree"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs p-2.5 border border-gray-300 rounded-lg dark:bg-gray-800"
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Category *</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full text-xs p-2.5 border border-gray-300 rounded-lg dark:bg-gray-800"
                >
                  <option value="Women Ethnic">Women Ethnic</option>
                  <option value="Women Western">Women Western</option>
                  <option value="Men">Men</option>
                  <option value="Kids">Kids</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Beauty & Health">Beauty & Health</option>
                  <option value="Jewellery & Accessories">Jewellery & Accessories</option>
                  <option value="Bags & Footwear">Bags & Footwear</option>
                  <option value="Electronics">Electronics</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold block mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-lg dark:bg-gray-800"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">MRP Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newOriginalPrice}
                    onChange={(e) => setNewOriginalPrice(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-lg dark:bg-gray-800"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewModalOpen(false)}
                  className="flex-1 py-2 border border-gray-300 text-xs font-semibold rounded-lg text-gray-600 dark:text-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#681a72] hover:bg-[#52135a] text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}