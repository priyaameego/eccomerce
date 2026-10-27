"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  ShieldCheck,
  Wallet,
  Clock,
  Package,
  MapPin,
  Tag,
  Settings,
  Plus,
  Trash2,
  Sparkles,
  Award,
  Check,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useAuthStore, UserAddress } from "@/store/useAuthStore";
import { usePreferencesStore } from "@/store/usePreferencesStore";
import { formatPrice } from "@/lib/utils";
import { sound } from "@/lib/sound";

export default function AccountPage() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const addAddress = useAuthStore((s) => s.addAddress);
  const deleteAddress = useAuthStore((s) => s.deleteAddress);
  const setDefaultAddress = useAuthStore((s) => s.setDefaultAddress);

  const currency = usePreferencesStore((s) => s.currency);

  const [activeTab, setActiveTab] = useState<"orders" | "wallet" | "addresses" | "privileges">("orders");
  const [newAddrModal, setNewAddrModal] = useState(false);
  const [addrForm, setAddrForm] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    phone: "",
    isDefault: false,
  });

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrForm.street || !addrForm.city) return;
    addAddress(addrForm);
    sound.playSuccess();
    setNewAddrModal(false);
    setAddrForm({
      fullName: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "United States",
      phone: "",
      isDefault: false,
    });
  };

  if (!user) {
    return (
      <div className="pt-32 pb-24 px-6 max-w-md mx-auto min-h-screen text-center">
        <div className="p-8 rounded-3xl glass-card border border-white/10">
          <User className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
          <h2 className="text-xl font-serif font-bold text-white mb-2">Private Client Lounge</h2>
          <p className="text-xs text-neutral-400 mb-6">
            Authenticate to access your bespoke allocations, armored courier tracking, and complimentary vault wallet.
          </p>
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="w-full py-3 rounded-xl bg-[#d4af37] text-black font-mono text-xs font-bold uppercase"
          >
            Authenticate Credentials
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      {/* Top Patron Capsule Header */}
      <div className="p-8 rounded-3xl glass-card border border-white/10 mb-10 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#d4af37] shadow-xl">
              <Image src={user.avatar} alt={user.name} fill className="object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#d4af37] flex items-center gap-1.5 font-bold">
                  <Award className="w-3.5 h-3.5" />
                  {user.tier}
                </span>
                <span className="text-white/20">•</span>
                <span className="text-[11px] font-mono text-emerald-400">Private Client #99182</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">{user.name}</h1>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">{user.email} • {user.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-right">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                Vault Credit Balance
              </span>
              <span className="text-xl font-mono font-bold text-[#d4af37]">
                {formatPrice(user.walletBalance, currency)}
              </span>
            </div>

            <button
              onClick={() => {
                logout();
                sound.playClick();
              }}
              className="p-3 rounded-2xl glass-panel border border-white/10 text-neutral-400 hover:text-red-400 hover:border-red-500/40 transition-colors"
              title="Logout session"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-8 overflow-x-auto">
        {[
          { id: "orders", label: `Acquisitions (${user.orders.length})`, icon: Package },
          { id: "wallet", label: "Vault Wallet & Escrow", icon: Wallet },
          { id: "addresses", label: `Saved Estates (${user.addresses.length})`, icon: MapPin },
          { id: "privileges", label: "Privilege Passes", icon: Tag },
        ].map((t) => {
          const Icon = t.icon;
          const isSelected = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(t.id as any);
                sound.playClick();
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 whitespace-nowrap ${
                isSelected
                  ? "bg-[#d4af37] text-black font-bold shadow-lg"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Orders & Acquisitions */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          {user.orders.map((ord) => (
            <div key={ord.id} className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 text-xs font-mono">
                <div>
                  <span className="text-neutral-400">Order:</span>
                  <span className="text-white font-bold ml-2">{ord.orderNumber}</span>
                  <span className="text-white/20 mx-2">•</span>
                  <span className="text-neutral-400">{ord.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40 font-bold">
                    {ord.status}
                  </span>
                  <span className="text-sm font-bold text-white">{formatPrice(ord.total, currency)}</span>
                </div>
              </div>

              {/* Items in order */}
              <div className="space-y-3">
                {ord.items.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-black/40 border border-white/10">
                        <Image src={it.image} alt="" fill className="object-contain p-1.5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{it.title}</h4>
                        <p className="text-xs text-neutral-400 font-mono">Quantity: {it.quantity}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-neutral-300">
                      {formatPrice(it.price * it.quantity, currency)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tracking Telemetry Bar */}
              <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <span className="text-neutral-400">
                  Armored Courier Reference: <strong className="text-white">{ord.trackingCode}</strong>
                </span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Insured White-Glove Handover
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Wallet */}
      {activeTab === "wallet" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl glass-card border border-[#d4af37]/40 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">
              Atelier Vault Escrow Balance
            </span>
            <div className="text-4xl font-mono font-bold text-white">
              {formatPrice(user.walletBalance, currency)}
            </div>
            <p className="text-xs text-neutral-300 font-light leading-relaxed">
              Store credits may be applied instantly during checkout across all departments. Balances are guaranteed by Swiss banking partners.
            </p>
            <div className="pt-4 flex gap-3">
              <button
                onClick={() => sound.playSuccess()}
                className="px-6 py-2.5 rounded-xl bg-[#d4af37] text-black font-mono text-xs font-bold uppercase"
              >
                Deposit Escrow Funds
              </button>
            </div>
          </div>

          <div className="p-8 rounded-3xl glass-card border border-white/10 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              Privilege Loyalty Points
            </span>
            <div className="text-4xl font-mono font-bold text-[#d4af37]">
              {user.loyaltyPoints.toLocaleString()} PTS
            </div>
            <p className="text-xs text-neutral-300 font-light leading-relaxed">
              You earn 10 points per dollar spent. Redeem points for invitations to Geneva SIHH salon vernissages and bespoke factory tours.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: Addresses */}
      {activeTab === "addresses" && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() => setNewAddrModal(true)}
              className="px-5 py-2.5 rounded-xl bg-[#d4af37] text-black font-mono text-xs font-bold uppercase flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Register New Estate</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.addresses.map((addr) => (
              <div
                key={addr.id}
                className="p-6 rounded-3xl glass-card border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-white">{addr.fullName}</span>
                    {addr.isDefault && (
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40">
                        Default Residence
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-300">{addr.street}</p>
                  {addr.apartment && <p className="text-xs text-neutral-400">{addr.apartment}</p>}
                  <p className="text-xs text-neutral-400">
                    {addr.city}, {addr.state} {addr.postalCode} • {addr.country}
                  </p>
                  <p className="text-xs font-mono text-neutral-500 mt-2">{addr.phone}</p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-4">
                  {!addr.isDefault && (
                    <button
                      onClick={() => setDefaultAddress(addr.id)}
                      className="text-xs font-mono text-[#d4af37] hover:underline"
                    >
                      Set As Primary
                    </button>
                  )}
                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="text-neutral-500 hover:text-red-400 text-xs font-mono flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Privileges */}
      {activeTab === "privileges" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { code: "AURELIA10", discount: "10% Courtesy", desc: "Welcome voucher across all departments." },
            { code: "VIP20", discount: "20% Allocation", desc: "Obsidian client courtesy for orders over $3,000." },
            { code: "CONCIERGE", discount: "15% Courtesy", desc: "Private Salon courtesy referral pass." },
          ].map((cp) => (
            <div key={cp.code} className="p-6 rounded-3xl glass-card border border-[#d4af37]/30 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37]">
                Privilege Certificate
              </span>
              <h3 className="text-xl font-mono font-bold text-white">{cp.code}</h3>
              <p className="text-xs font-bold text-emerald-400 font-mono">{cp.discount}</p>
              <p className="text-xs text-neutral-400">{cp.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Add Address Modal */}
      {newAddrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-panel bg-[#090a0f] rounded-3xl border border-white/20 p-6 shadow-2xl">
            <h3 className="text-lg font-serif font-bold text-white mb-4">Register Delivery Residence</h3>
            <form onSubmit={handleAddAddress} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono text-neutral-400 block mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={addrForm.fullName}
                  onChange={(e) => setAddrForm({ ...addrForm, fullName: e.target.value })}
                  placeholder="Recipient Name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
                />
              </div>
              <div>
                <label className="text-[11px] font-mono text-neutral-400 block mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={addrForm.street}
                  onChange={(e) => setAddrForm({ ...addrForm, street: e.target.value })}
                  placeholder="Street / Estate"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-neutral-400 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={addrForm.city}
                    onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-neutral-400 block mb-1">State / Zip</label>
                  <input
                    type="text"
                    required
                    value={addrForm.state}
                    onChange={(e) => setAddrForm({ ...addrForm, state: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setNewAddrModal(false)}
                  className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#d4af37] text-black font-mono text-xs font-bold uppercase"
                >
                  Save Residence
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
