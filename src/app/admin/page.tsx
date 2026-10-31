"use client";

import React, { useState, useEffect } from "react";
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
  ExternalLink,
  Eye,
  AlertCircle,
  X,
} from "lucide-react";
import { PRODUCTS as INITIAL_PRODUCTS, CATEGORIES, Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export default function SupplierAdminPage() {
  const [productsList, setProductsList] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeTab, setActiveTab] = useState<"overview" | "catalog" | "orders">("catalog");
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [lastCreatedSlug, setLastCreatedSlug] = useState<string | null>(null);
  const [dbStatus, setDbStatus] = useState<{
    connected: boolean;
    database?: string;
    productsInDatabase?: number;
    uri?: string;
  } | null>(null);
  const [seeding, setSeeding] = useState(false);

  // New product form states
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Women Ethnic");
  const [newSubcategory, setNewSubcategory] = useState("Sarees");
  const [newBrand, setNewBrand] = useState("Surat Silk Mills");
  const [newPrice, setNewPrice] = useState<number>(349);
  const [newOriginalPrice, setNewOriginalPrice] = useState<number>(1199);
  const [newStock, setNewStock] = useState<number>(120);
  const [newImage, setNewImage] = useState(
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
  );
  const [newDescription, setNewDescription] = useState(
    "Premium quality Jacquard woven soft silk saree direct from Surat wholesale mills. Colorfast fabric with matching unstitched blouse piece."
  );

  // Check DB status on mount
  const checkDbStatus = () => {
    fetch("/api/db-status")
      .then((res) => res.json())
      .then((data) => setDbStatus(data))
      .catch(() => setDbStatus({ connected: false }));
  };

  // Load live products from API on mount
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          setProductsList(data.data);
        }
      })
      .catch(() => {
        // Fallback to initial products
      });

    checkDbStatus();
  }, []);

  const handleSeedDatabase = async () => {
    setSeeding(true);
    try {
      const res = await fetch("/api/db-status", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        alert("✅ " + data.message);
        const pRes = await fetch("/api/products");
        const pData = await pRes.json();
        if (pData.data) setProductsList(pData.data);
        checkDbStatus();
      } else {
        alert("⚠️ " + (data.error || "Failed to seed"));
      }
    } catch (err: any) {
      alert("Error seeding: " + err.message);
    } finally {
      setSeeding(false);
    }
  };

  // Update subcategory options when category changes
  const activeCategoryObj = CATEGORIES.find((c) => c.name === newCategory);
  const subcategoryOptions = activeCategoryObj?.subcategories || ["General"];

  const handleCategoryChange = (catName: string) => {
    setNewCategory(catName);
    const cat = CATEGORIES.find((c) => c.name === catName);
    if (cat && cat.subcategories.length > 0) {
      setNewSubcategory(cat.subcategories[1] || cat.subcategories[0]);
    }
  };

  // Mock Orders
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

  // Handle Publishing Product to Backend API
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setLoading(true);
    setSuccessMsg(null);

    const payload = {
      title: newTitle,
      category: newCategory,
      subcategory: newSubcategory,
      brand: newBrand,
      price: Number(newPrice),
      originalPrice: Number(newOriginalPrice),
      stockCount: Number(newStock),
      images: [newImage],
      description: newDescription,
      badge: "New Arrival",
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success && result.product) {
        setProductsList([result.product, ...productsList]);
        setSuccessMsg(
          `Product "${result.product.title}" is now LIVE on Velora! Customers can find it under ${newCategory} > ${newSubcategory}.`
        );
        setLastCreatedSlug(result.product.slug);
        setNewModalOpen(false);

        // Reset form
        setNewTitle("");
      } else {
        alert(result.error || "Failed to publish product");
      }
    } catch (err: any) {
      alert("Error publishing product: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to remove this product from the live store?")) {
      return;
    }

    try {
      await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      setProductsList(productsList.filter((p) => p.id !== id));
    } catch (err) {
      setProductsList(productsList.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0b0f19] pt-6 pb-20 px-4 sm:px-6 transition-colors">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Notification Banner if product was just published */}
        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 flex items-center justify-between gap-3 shadow-md animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <span>{successMsg}</span>
            </div>

            <div className="flex items-center gap-2">
              {lastCreatedSlug && (
                <Link
                  href={`/product/${lastCreatedSlug}`}
                  target="_blank"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-transform active:scale-95"
                >
                  <span>View Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              )}
              <button
                onClick={() => setSuccessMsg(null)}
                className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-white dark:bg-[#151c2c] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-[#681a72] dark:text-[#c084fc] flex items-center justify-center">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-[#681a72] dark:text-[#c084fc] text-2xl tracking-tight">
                  velora
                </span>
                <span className="text-[11px] bg-purple-100 dark:bg-purple-950/60 text-[#681a72] dark:text-purple-300 font-extrabold px-2 py-0.5 rounded-md border border-purple-200 dark:border-purple-800">
                  Admin & Supplier Hub
                </span>
              </div>
              <h1 className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 mt-0.5">
                Surat Wholesale Mills Direct • Live Backend Dashboard (GST: 24AABCU9603R1ZM)
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Store</span>
            </Link>

            <button
              onClick={() => setNewModalOpen(true)}
              className="px-4 py-2 bg-[#681a72] hover:bg-[#56135e] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>
        </div>

        {/* Local MongoDB Status & 1-Click Sync Pill */}
        <div className="bg-white dark:bg-[#151c2c] border border-gray-200 dark:border-gray-800 rounded-xl p-3.5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                dbStatus?.connected
                  ? "bg-emerald-500 shadow-[0_0_8px_#10b981]"
                  : "bg-amber-500 animate-pulse"
              }`}
            />
            <div>
              <span className="font-bold text-gray-900 dark:text-white">
                {dbStatus?.connected
                  ? `MongoDB Database: Connected (${dbStatus.database || "velora_ecommerce"})`
                  : "MongoDB Status: Ready for Local Connection"}
              </span>
              <span className="text-gray-500 dark:text-gray-400 ml-2">
                {dbStatus?.connected
                  ? `• ${dbStatus.productsInDatabase ?? 0} products stored in DB`
                  : "• Start MongoDB on mongodb://127.0.0.1:27017/velora_ecommerce"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {dbStatus?.connected ? (
              <button
                onClick={handleSeedDatabase}
                disabled={seeding}
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 rounded-lg font-bold text-[11px] transition-colors cursor-pointer"
              >
                {seeding ? "Syncing 48 Items..." : "🔄 Seed 48 Catalog Items to MongoDB"}
              </button>
            ) : (
              <button
                onClick={checkDbStatus}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-bold text-[11px] transition-colors cursor-pointer"
              >
                Re-check Connection
              </button>
            )}
          </div>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-[#151c2c] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Live Catalog Items</p>
            <p className="text-xl font-black text-gray-900 dark:text-white mt-1">
              {productsList.length} Products
            </p>
            <span className="text-[10px] text-emerald-600 font-bold">100% Active in Store</span>
          </div>

          <div className="bg-white dark:bg-[#151c2c] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Orders Dispatched</p>
            <p className="text-xl font-black text-gray-900 dark:text-white mt-1">492 Orders</p>
            <span className="text-[10px] text-emerald-600 font-bold">100% on-time SLA</span>
          </div>

          <div className="bg-white dark:bg-[#151c2c] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Commission Paid</p>
            <p className="text-xl font-black text-emerald-600 mt-1">₹0 (0% Fee)</p>
            <span className="text-[10px] text-gray-400">Zero commission benefit</span>
          </div>

          <div className="bg-white dark:bg-[#151c2c] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Next Payout (Bank/UPI)</p>
            <p className="text-xl font-black text-[#681a72] dark:text-[#c084fc] mt-1">₹42,800</p>
            <span className="text-[10px] text-gray-400">Direct 7-Day Cycle</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-800 text-xs font-bold gap-6">
          <button
            onClick={() => setActiveTab("catalog")}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === "catalog"
                ? "border-[#681a72] text-[#681a72] dark:border-[#c084fc] dark:text-[#c084fc]"
                : "border-transparent text-gray-500 hover:text-black dark:hover:text-white"
            }`}
          >
            Live Catalog Inventory ({productsList.length} Items)
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === "orders"
                ? "border-[#681a72] text-[#681a72] dark:border-[#c084fc] dark:text-[#c084fc]"
                : "border-transparent text-gray-500 hover:text-black dark:hover:text-white"
            }`}
          >
            Customer Orders ({orders.length})
          </button>
        </div>

        {/* TAB 1: CATALOG INVENTORY */}
        {activeTab === "catalog" && (
          <div className="bg-white dark:bg-[#151c2c] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Live Velora Wholesale Catalog
                </h3>
                <p className="text-[11px] text-gray-400">
                  Any product added here is immediately live for customers to purchase
                </p>
              </div>

              <button
                onClick={() => setNewModalOpen(true)}
                className="px-3 py-1.5 bg-[#681a72] hover:bg-[#56135e] text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-sm cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {productsList.map((p) => (
                <div key={p.id} className="p-4 flex items-center justify-between gap-4 text-xs hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-12 h-14 rounded-lg overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700">
                      <Image src={p.images[0] || "/placeholder.png"} alt={p.title} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-gray-900 dark:text-white truncate">{p.title}</h4>
                      <p className="text-gray-500 dark:text-gray-400 text-[11px] mt-0.5">
                        <span className="font-semibold text-[#681a72] dark:text-[#c084fc]">{p.category}</span>
                        {" • "}
                        <span>{p.subcategory}</span>
                        {" • "}
                        <span>Stock: {p.stockCount || 100} units</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className="font-black text-gray-900 dark:text-white text-sm">
                        {formatPrice(p.price)}
                      </span>
                      {p.originalPrice && (
                        <p className="text-[10px] text-gray-400 line-through">
                          {formatPrice(p.originalPrice)}
                        </p>
                      )}
                    </div>

                    <Link
                      href={`/product/${p.slug}`}
                      target="_blank"
                      className="p-1.5 text-gray-500 hover:text-[#681a72] dark:hover:text-[#c084fc] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      title="View on store"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
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

        {/* TAB 2: ORDERS */}
        {activeTab === "orders" && (
          <div className="bg-white dark:bg-[#151c2c] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Customer Orders for Fulfillment
              </h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {orders.map((ord) => (
                <div key={ord.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white font-mono">{ord.id}</span>
                    <p className="text-gray-700 dark:text-gray-300 font-semibold mt-0.5">{ord.product}</p>
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
                      Print Shipping Label
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Full Add Product Modal connected to Backend API */}
      {newModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative bg-white dark:bg-[#151c2c] rounded-2xl p-6 max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl z-10 border border-gray-200 dark:border-gray-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                  Add New Product to Velora Store
                </h3>
                <p className="text-xs text-gray-400">
                  This product will immediately be published to the frontend catalog and Navbar.
                </p>
              </div>
              <button
                onClick={() => setNewModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              {/* Title */}
              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pure Banarasi Silk Zari Border Saree"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-[#681a72]"
                />
              </div>

              {/* Category & Subcategory */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    Department Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-[#681a72]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    Subcategory (Navbar match) *
                  </label>
                  <select
                    value={newSubcategory}
                    onChange={(e) => setNewSubcategory(e.target.value)}
                    className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-[#681a72]"
                  >
                    {subcategoryOptions.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Brand & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    Brand / Manufacturer Name
                  </label>
                  <input
                    type="text"
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    placeholder="e.g. Surat Handloom Mills"
                    className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-[#681a72]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    Initial Stock Inventory (Units)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-[#681a72]"
                  />
                </div>
              </div>

              {/* Price & MRP with Discount Preview */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    Wholesale Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="49"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-[#681a72]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    Original MRP (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="99"
                    value={newOriginalPrice}
                    onChange={(e) => setNewOriginalPrice(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-[#681a72]"
                  />
                </div>
              </div>

              {/* Image URL & Live Preview */}
              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Product Image URL *
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="flex-1 text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-[#681a72]"
                  />

                  {newImage && (
                    <div className="relative w-11 h-14 rounded-lg overflow-hidden border border-gray-300 shrink-0">
                      <Image src={newImage} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Product Description
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-[#681a72]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setNewModalOpen(false)}
                  className="flex-1 py-2.5 border border-gray-300 dark:border-gray-700 text-xs font-bold rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 bg-gradient-to-r from-[#681a72] to-[#e11d48] hover:opacity-95 text-white text-xs font-extrabold rounded-xl shadow-lg transition-transform active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Publishing to Live Store..." : "Publish to Live Store"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
