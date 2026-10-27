"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp,
  Package,
  DollarSign,
  Users,
  AlertTriangle,
  Plus,
  Trash2,
  Edit2,
  Check,
  ShieldAlert,
  ArrowUpRight,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import { PRODUCTS as INITIAL_PRODUCTS, Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { sound } from "@/lib/sound";

export default function AdminPage() {
  const [role, setRole] = useState<"admin" | "vendor">("admin");
  const [productsList, setProductsList] = useState<Product[]>(INITIAL_PRODUCTS);
  const [newProductModal, setNewProductModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders" | "inventory">("overview");

  // Sample order management data
  const [orders, setOrders] = useState([
    {
      id: "AUR-2026-9041",
      client: "Lord Julian Vance",
      product: "AURELIA Celestial Tourbillon",
      total: 4850,
      date: "Oct 24, 2026",
      status: "In Production",
    },
    {
      id: "AUR-2026-9042",
      client: "Elena Rostova",
      product: "AETHER Spatial Pro Headphones",
      total: 890,
      date: "Oct 25, 2026",
      status: "White-Glove Dispatched",
    },
    {
      id: "AUR-2026-9043",
      client: "Kenji Sato",
      product: "VÉLURE Horizon Hyper-Scooter",
      total: 3200,
      date: "Oct 26, 2026",
      status: "Delivered",
    },
    {
      id: "AUR-2026-9044",
      client: "Baron Henri De Valois",
      product: "AURELIA Chrono Quantum Sapphire",
      total: 9200,
      date: "Oct 27, 2026",
      status: "In Production",
    },
  ]);

  // New product form
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    category: "Horology" as any,
    price: 3200,
    stockCount: 10,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;
    const newProd: Product = {
      id: `prod-custom-${Date.now()}`,
      slug: formData.title.toLowerCase().replace(/\s+/g, "-"),
      title: formData.title,
      subtitle: formData.subtitle,
      category: formData.category,
      subcategory: "Custom Atelier Edition",
      brand: "AURELIA Atelier",
      price: Number(formData.price),
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      stockCount: Number(formData.stockCount),
      images: [formData.image],
      turntableImages: [],
      colors: [{ name: "Obsidian Slate", hex: "#121214" }],
      description: "Custom commissioned bespoke prototype engineered in Geneva.",
      craftsmanship: "Aeronautic grade 5 titanium and precision hand-beveled anglage.",
      specs: { "Caliber": "Atelier Bespoke", "Reserve": "72h" },
      features: ["Custom prototype"],
      reviews: [],
    };

    setProductsList([newProd, ...productsList]);
    sound.playSuccess();
    setNewProductModal(false);
  };

  const handleDeleteProduct = (id: string) => {
    setProductsList(productsList.filter((p) => p.id !== id));
    sound.playClick();
  };

  const handleUpdateOrderStatus = (id: string, newStatus: string) => {
    setOrders(
      orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    sound.playSuccess();
  };

  return (
    <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      {/* Command Hub Header */}
      <div className="p-8 rounded-3xl glass-card border border-white/10 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37] flex items-center gap-1.5 font-bold">
              <ShieldAlert className="w-3.5 h-3.5" />
              Atelier Command Center
            </span>
            <span className="text-white/20">•</span>
            <span className="text-[11px] font-mono text-cyan-400">Geneva Master Node</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white mt-1">
            Executive & Vendor Dashboard
          </h1>
        </div>

        {/* Role Switcher Pill */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl glass-panel border border-white/10">
          <button
            onClick={() => {
              setRole("admin");
              sound.playClick();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all ${
              role === "admin"
                ? "bg-[#d4af37] text-black font-bold shadow-lg"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Atelier Executive
          </button>
          <button
            onClick={() => {
              setRole("vendor");
              sound.playClick();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all ${
              role === "vendor"
                ? "bg-[#d4af37] text-black font-bold shadow-lg"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Vendor Portal
          </button>
        </div>
      </div>

      {/* Financial Telemetry KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="p-6 rounded-3xl glass-card border border-white/10">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Gross Order Volume</span>
            <DollarSign className="w-4 h-4 text-[#d4af37]" />
          </div>
          <p className="text-3xl font-mono font-bold text-white">$428,950</p>
          <p className="text-[11px] font-mono text-emerald-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +24.8% vs last fiscal quarter
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-card border border-white/10">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Active Allocations</span>
            <Package className="w-4 h-4 text-[#d4af37]" />
          </div>
          <p className="text-3xl font-mono font-bold text-white">18 Pieces</p>
          <p className="text-[11px] font-mono text-neutral-400 mt-2">
            4 in White-Glove transit
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-card border border-white/10">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Average Acquisition</span>
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
          </div>
          <p className="text-3xl font-mono font-bold text-[#d4af37]">$3,840</p>
          <p className="text-[11px] font-mono text-emerald-400 mt-2">
            High-ticket luxury conversion
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-card border border-white/10">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">VIP Conversion</span>
            <Users className="w-4 h-4 text-[#d4af37]" />
          </div>
          <p className="text-3xl font-mono font-bold text-cyan-400">3.82%</p>
          <p className="text-[11px] font-mono text-neutral-400 mt-2">
            Awwwards benchmark: 1.8%
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-8 overflow-x-auto">
        {[
          { id: "overview", label: "Analytics Overview" },
          { id: "products", label: `Catalog Management (${productsList.length})` },
          { id: "orders", label: `Orders Queue (${orders.length})` },
          { id: "inventory", label: "Scarcity Alerts" },
        ].map((tb) => {
          const isSelected = activeTab === tb.id;
          return (
            <button
              key={tb.id}
              onClick={() => {
                setActiveTab(tb.id as any);
                sound.playClick();
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all whitespace-nowrap ${
                isSelected
                  ? "bg-[#d4af37] text-black font-bold shadow-lg"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tb.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Analytics Overview */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Revenue Curve Simulation SVG */}
          <div className="p-8 rounded-3xl glass-card border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">
                  Weekly Allocation Revenue
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                  Performance Across Salons
                </h3>
              </div>
              <span className="text-xs font-mono text-neutral-400">Past 7 Days</span>
            </div>

            {/* SVG Visual Graph */}
            <div className="relative w-full h-48 pt-6">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 700 150">
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#d4af37" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#d4af37" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 130 Q 100 80, 200 95 T 400 45 T 600 20 T 700 10 L 700 150 L 0 150 Z"
                  fill="url(#goldGradient)"
                />
                <path
                  d="M 0 130 Q 100 80, 200 95 T 400 45 T 600 20 T 700 10"
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="3"
                />
                {/* Data Points */}
                {[
                  { cx: 0, cy: 130, val: "$34k" },
                  { cx: 100, cy: 80, val: "$52k" },
                  { cx: 200, cy: 95, val: "$48k" },
                  { cx: 400, cy: 45, val: "$78k" },
                  { cx: 600, cy: 20, val: "$110k" },
                  { cx: 700, cy: 10, val: "$124k" },
                ].map((pt, i) => (
                  <circle key={i} cx={pt.cx} cy={pt.cy} r="5" fill="#ffffff" stroke="#d4af37" strokeWidth="2" />
                ))}
              </svg>
            </div>

            <div className="grid grid-cols-6 gap-2 text-center text-[10px] font-mono text-neutral-400 pt-3 border-t border-white/5">
              <span>Mon ($34k)</span>
              <span>Tue ($52k)</span>
              <span>Wed ($48k)</span>
              <span>Thu ($78k)</span>
              <span>Fri ($110k)</span>
              <span>Sat ($124k)</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Product Management CRUD */}
      {activeTab === "products" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-xs font-mono text-neutral-400">
              Manage atelier pieces, pricing, and live inventory allocations.
            </p>
            <button
              onClick={() => setNewProductModal(true)}
              className="px-5 py-2.5 rounded-xl bg-[#d4af37] text-black font-mono text-xs font-bold uppercase flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Commission New Work</span>
            </button>
          </div>

          <div className="rounded-3xl glass-card border border-white/10 overflow-x-auto shadow-2xl">
            <table className="w-full text-left border-collapse min-w-[700px] text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-neutral-400 uppercase tracking-wider bg-white/5">
                  <th className="p-4">Creation</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Price (USD)</th>
                  <th className="p-4">Vault Stock</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {productsList.map((p) => (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-black/40 border border-white/10 shrink-0">
                          <Image src={p.images[0]} alt="" fill className="object-contain p-1" />
                        </div>
                        <div>
                          <p className="font-semibold text-white truncate max-w-[200px]">{p.title}</p>
                          <p className="text-[10px] text-neutral-400">{p.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-neutral-300">{p.category}</td>
                    <td className="p-4 font-bold text-white">${p.price.toLocaleString()}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] ${
                          p.stockCount <= 5
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        }`}
                      >
                        {p.stockCount} in Vault
                      </span>
                    </td>
                    <td className="p-4 text-amber-400">★ {p.rating}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-white/10"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Order Queue Management */}
      {activeTab === "orders" && (
        <div className="space-y-4">
          <p className="text-xs font-mono text-neutral-400">
            Real-time fulfillment pipeline. Update status to notify patron via satellite telemetry.
          </p>

          <div className="rounded-3xl glass-card border border-white/10 overflow-x-auto shadow-2xl">
            <table className="w-full text-left border-collapse min-w-[700px] text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-neutral-400 uppercase tracking-wider bg-white/5">
                  <th className="p-4">Order Ref</th>
                  <th className="p-4">Patron Name</th>
                  <th className="p-4">Masterpiece</th>
                  <th className="p-4">Settlement</th>
                  <th className="p-4">Status Pipeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-[#d4af37]">{ord.id}</td>
                    <td className="p-4 text-white">{ord.client}</td>
                    <td className="p-4 text-neutral-300">{ord.product}</td>
                    <td className="p-4 font-bold text-white">${ord.total.toLocaleString()}</td>
                    <td className="p-4">
                      <select
                        value={ord.status}
                        onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white font-mono outline-none focus:border-[#d4af37] cursor-pointer"
                      >
                        <option value="Order Placed" className="bg-[#12131a]">Order Placed</option>
                        <option value="In Production" className="bg-[#12131a]">In Production</option>
                        <option value="White-Glove Dispatched" className="bg-[#12131a]">White-Glove Dispatched</option>
                        <option value="Delivered" className="bg-[#12131a]">Delivered & Inspected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Scarcity & Inventory Alerts */}
      {activeTab === "inventory" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-xs font-mono text-amber-300">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Automated Alert: 4 numbered masterpieces have reached critical atelier reserve (&lt;= 7 pieces).</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsList
              .filter((p) => p.stockCount <= 9)
              .map((p) => (
                <div key={p.id} className="p-6 rounded-3xl glass-card border border-amber-500/30 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black/40 border border-white/10">
                      <Image src={p.images[0]} alt="" fill className="object-contain p-1" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">{p.title}</h4>
                      <p className="text-[10px] font-mono text-neutral-400">${p.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-400">Vault Level:</span>
                    <span className="text-red-400 font-bold">{p.stockCount} Remaining</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* New Product Modal */}
      {newProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-panel bg-[#090a0f] rounded-3xl border border-white/20 p-6 shadow-2xl">
            <h3 className="text-lg font-serif font-bold text-white mb-4">Commission Masterpiece to Vault</h3>
            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono text-neutral-400 block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. AURELIA Chrono Monolith"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 block mb-1">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Monolithic Sapphire Chronograph"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-neutral-400 block mb-1">Department</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
                  >
                    <option value="Horology" className="bg-[#12131a]">Horology</option>
                    <option value="Acoustics" className="bg-[#12131a]">Acoustics</option>
                    <option value="Apparel" className="bg-[#12131a]">Apparel</option>
                    <option value="Mobility" className="bg-[#12131a]">Mobility</option>
                    <option value="Living" className="bg-[#12131a]">Living</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-mono text-neutral-400 block mb-1">Price (USD)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 block mb-1">Stock Count</label>
                <input
                  type="number"
                  value={formData.stockCount}
                  onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setNewProductModal(false)}
                  className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#d4af37] text-black font-mono text-xs font-bold uppercase"
                >
                  Publish Creation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
