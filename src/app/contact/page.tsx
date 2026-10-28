"use client";

import React, { useState } from "react";
import { Headphones, Phone, Mail, MapPin, Check, Send } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    issueType: "Order & Delivery",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  return (
    <div className="pt-6 pb-20 px-4 sm:px-6 max-w-5xl mx-auto min-h-screen">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-bold text-[#681a72] dark:text-rose-400 uppercase tracking-wider">
          Velora Help & Support
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-1">
          We're Here to Help You
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Have questions about your order, returns, or supplier registration? Reach out to our dedicated support team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Info */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Headphones className="w-5 h-5 text-[#681a72] dark:text-rose-400" />
              Velora Customer Care
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Available 7 days a week from 8:00 AM to 10:00 PM IST for assistance with orders, refunds, and inquiries.
            </p>

            <div className="space-y-3 pt-2 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#681a72] dark:text-rose-400 shrink-0" />
                <span>080-61799600 (Toll-Free Helpline)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#681a72] dark:text-rose-400 shrink-0" />
                <span>support@velora.in</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#681a72] dark:text-rose-400 shrink-0 mt-0.5" />
                <span>
                  Velora Technologies Pvt. Ltd.<br />
                  Velora Tech Park, Outer Ring Road, Bellandur,<br />
                  Bengaluru, Karnataka 560103
                </span>
              </div>
            </div>
          </div>

          <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-xl p-5 space-y-1.5">
            <h4 className="text-xs font-bold text-[#681a72] dark:text-rose-400">Grievance Officer</h4>
            <p className="text-[11px] text-gray-600 dark:text-gray-400">
              Name: Mr. Siddharth Rao<br />
              Email: grievance-officer@velora.in<br />
              Response SLA: Within 24-48 business hours
            </p>
          </div>
        </div>

        {/* Message Form */}
        <div className="md:col-span-7 bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xs">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
            Send Us a Message
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            Fill out the form below and our team will get back to you shortly.
          </p>

          {submitted ? (
            <div className="p-8 text-center text-emerald-600 space-y-2">
              <Check className="w-10 h-10 mx-auto" />
              <h4 className="font-bold text-sm">Message Received!</h4>
              <p className="text-xs text-gray-500">
                Our support team has logged ticket #TKT-{Math.floor(10000 + Math.random() * 90000)} and will reach out via SMS/Email within 4 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 outline-none focus:border-[#681a72]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 outline-none focus:border-[#681a72]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 outline-none focus:border-[#681a72]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Issue Category *</label>
                <select
                  value={formData.issueType}
                  onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                  className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 outline-none focus:border-[#681a72]"
                >
                  <option value="Order & Delivery">Order & Delivery Status</option>
                  <option value="Return & Refund">Return, Exchange or Refund</option>
                  <option value="Payment Inquiry">Payment or COD Query</option>
                  <option value="Supplier Registration">Supplier / Seller Registration</option>
                  <option value="Other">Other Inquiry</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Describe Your Issue *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Please provide order ID and details..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 outline-none focus:border-[#681a72]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#681a72] hover:bg-[#52135a] text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}