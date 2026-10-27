"use client";

import React, { useState } from "react";
import { Sparkles, Calendar, Clock, MapPin, Mail, Phone, Check, ShieldCheck } from "lucide-react";
import { sound } from "@/lib/sound";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    salon: "Geneva (Rue du Rhône)",
    preferredDate: "",
    creationInterest: "Haute Horlogerie Tourbillons",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
    sound.playSuccess();
  };

  return (
    <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37] flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Private Client Services
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-wide">
          Bespoke Concierge & Salon Reservation
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-3 font-light leading-relaxed">
          Arrange an exclusive viewing session with a master horologist or sound architect at one of our private international salons.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Salon Contacts & Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl glass-card border border-white/10 space-y-4">
            <h3 className="text-lg font-serif font-bold text-white">Direct Concierge Telephony</h3>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Available 24 hours daily for private patrons, security escorts, and urgent allocation inquiries.
            </p>
            <div className="space-y-3 pt-2 text-xs font-mono">
              <div className="flex items-center gap-3 text-neutral-300">
                <Phone className="w-4 h-4 text-[#d4af37]" />
                <span>+41 22 819 0900 (Geneva HQ)</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <Mail className="w-4 h-4 text-[#d4af37]" />
                <span>concierge@aurelia-atelier.luxury</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                <span>Rue du Rhône 42, 1204 Genève</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl glass-card border border-[#d4af37]/30 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37]">
              White-Glove Armored Handover
            </span>
            <h4 className="text-sm font-semibold text-white">Direct Residence & Yacht Deliveries</h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              We provide discreet armored vehicle handoff with authorized diplomatic couriers worldwide.
            </p>
          </div>
        </div>

        {/* Reservation Form */}
        <div className="lg:col-span-7 rounded-3xl glass-card border border-white/10 p-8 sm:p-10 shadow-2xl">
          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">Private Salon Request Received</h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                Thank you, {formData.name}. Our Head of Private Client Relations will contact your representative within 2 hours to confirm security credentials and salon availability.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-lg font-serif font-bold text-white mb-2">Request Private Salon Appointment</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-neutral-400 block mb-1">Patron Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Lord Julian Vance"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-neutral-400 block mb-1">Private Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="julian@aurelia.luxury"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-neutral-400 block mb-1">Telephone / Signal</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-neutral-400 block mb-1">Preferred Salon</label>
                  <select
                    value={formData.salon}
                    onChange={(e) => setFormData({ ...formData, salon: e.target.value })}
                    className="w-full bg-[#12131a] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#d4af37]"
                  >
                    <option value="Geneva (Rue du Rhône)">Geneva • Rue du Rhône</option>
                    <option value="Paris (Place Vendôme)">Paris • Place Vendôme</option>
                    <option value="Tokyo (Ginza 6)">Tokyo • Ginza 6</option>
                    <option value="New York (Madison Ave)">New York • Madison & 72nd</option>
                    <option value="Private Residence / Yacht">Private Residence / Yacht</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 block mb-1">Creation of Primary Interest</label>
                <select
                  value={formData.creationInterest}
                  onChange={(e) => setFormData({ ...formData, creationInterest: e.target.value })}
                  className="w-full bg-[#12131a] border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#d4af37]"
                >
                  <option value="Haute Horlogerie Tourbillons">Haute Horlogerie Flying Tourbillons</option>
                  <option value="Spatial Acoustics Beryllium">Planar Beryllium Spatial Audio</option>
                  <option value="Electric Mobility Horizon">Vélure Horizon Electric Mobility</option>
                  <option value="Sculptural Light Monoliths">Sensory Kinetic Light Monoliths</option>
                  <option value="Bespoke Commission">Complete Bespoke One-Off Commission</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 block mb-1">Special Requirements & Security Protocols</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Detail any security clearance, dietary preferences, or private vault handoff specifications."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#d4af37] text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-[#c5a059] transition-all shadow-xl"
                >
                  Transmit Private Salon Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
