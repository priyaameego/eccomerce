"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Package,
  MapPin,
  Tag,
  Coins,
  Wallet,
  Truck,
  Plus,
  Trash2,
  Check,
  ChevronRight,
  LogOut,
  IndianRupee,
  ShoppingBag,
  Phone,
  ShieldCheck,
  Edit2,
  Sparkles,
  ArrowRight,
  X,
  KeyRound,
  RotateCcw,
} from "lucide-react";
import { useAuthStore, UserAddress } from "@/store/useAuthStore";
import { formatPrice } from "@/lib/utils";

export default function AccountPage() {
  const [mounted, setMounted] = useState(false);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const loginWithOtp = useAuthStore((s) => s.loginWithOtp);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const addAddress = useAuthStore((s) => s.addAddress);
  const deleteAddress = useAuthStore((s) => s.deleteAddress);

  // View state
  const [activeTab, setActiveTab] = useState<"orders" | "wallet" | "addresses">("orders");

  // OTP Login state
  const [authStep, setAuthStep] = useState<"credentials" | "otp">("credentials");
  const [inputName, setInputName] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  // Edit Profile modal
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // Address modal
  const [newAddrModal, setNewAddrModal] = useState(false);
  const [addrForm, setAddrForm] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    phone: "",
    isDefault: false,
  });

  const otpInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Timer for OTP resend
  useEffect(() => {
    let timer: any;
    if (authStep === "otp" && countdown > 0) {
      timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [authStep, countdown]);

  // Pre-populate edit form when modal opens
  useEffect(() => {
    if (user) {
      setEditName(user.name);
      setEditPhone(user.phone.replace("+91 ", "").replace("+91", ""));
      setEditEmail(user.email);
    }
  }, [user, editProfileOpen]);

  // Step 1: Send OTP
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) {
      setOtpError("Please enter your name");
      return;
    }
    const cleanDigits = inputPhone.replace(/\D/g, "");
    if (cleanDigits.length < 10) {
      setOtpError("Please enter a valid 10-digit mobile number");
      return;
    }

    setOtpError("");
    setIsSendingOtp(true);

    setTimeout(() => {
      setIsSendingOtp(false);
      setAuthStep("otp");
      setCountdown(30);
      setOtpDigits(["", "", "", ""]);
      setTimeout(() => otpInputRefs[0].current?.focus(), 150);
    }, 600);
  };

  // Auto-fill demo OTP
  const handleAutoFillOtp = () => {
    const demo = ["4", "8", "2", "9"];
    setOtpDigits(demo);
    setOtpError("");
    otpInputRefs[3].current?.focus();
  };

  // OTP Digit changes
  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }
    const updated = [...otpDigits];
    updated[index] = val;
    setOtpDigits(updated);
    setOtpError("");

    if (val && index < 3) {
      otpInputRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputRefs[index - 1].current?.focus();
    }
  };

  // Step 2: Verify OTP & Log In
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otpDigits.join("");
    if (entered.length < 4) {
      setOtpError("Please enter the complete 4-digit code");
      return;
    }

    // Accept 4829 or any 4-digit code for testing
    loginWithOtp(inputName, inputPhone, inputEmail);
    setAuthStep("credentials");
    setInputName("");
    setInputPhone("");
    setInputEmail("");
    setOtpDigits(["", "", "", ""]);
  };

  // Edit profile handler
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;
    const formattedPhone = editPhone.startsWith("+91") ? editPhone : `+91 ${editPhone.trim()}`;
    updateProfile({
      name: editName.trim(),
      phone: formattedPhone,
      email: editEmail.trim(),
    });
    setEditProfileOpen(false);
  };

  // Add address handler
  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrForm.street || !addrForm.city) return;
    addAddress({
      ...addrForm,
      fullName: addrForm.fullName || user?.name || "Customer",
      phone: addrForm.phone || user?.phone || "+91 9876543210",
    });
    setNewAddrModal(false);
    setAddrForm({
      fullName: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
      phone: "",
      isDefault: false,
    });
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#f8f8f9] dark:bg-[#111317] flex items-center justify-center p-4">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-3 border-[#681a72] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-gray-500 font-medium">Loading Velora Account...</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW A: LOGGED OUT - OTP AUTHENTICATION
  // ==========================================
  if (!user) {
    return (
      <div className="min-h-screen bg-[#f8f8f9] dark:bg-[#111317] flex items-center justify-center p-4 py-12">
        <div className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-xl space-y-5">
          {/* Logo & Headline */}
          <div className="text-center space-y-1">
            <span className="text-3xl font-black velora-gradient-text tracking-tight">velora</span>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white pt-1">
              {authStep === "credentials" ? "Sign Up or Log In with OTP" : "Verify Mobile Number"}
            </h2>
            <p className="text-xs text-gray-500">
              {authStep === "credentials"
                ? "Enter your name and mobile number to receive a verification OTP"
                : `Enter 4-digit code sent to +91 ${inputPhone.replace(/\D/g, "")}`}
            </p>
          </div>

          {/* STEP 1: Enter Name & Phone */}
          {authStep === "credentials" && (
            <form onSubmit={handleSendOtp} className="space-y-4 pt-1">
              {/* Name Input */}
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden focus-within:border-[#681a72] focus-within:ring-1 focus-within:ring-[#681a72] transition-all bg-gray-50/50 dark:bg-gray-800/50">
                  <span className="pl-3 pr-1 text-gray-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={inputName}
                    onChange={(e) => {
                      setInputName(e.target.value);
                      setOtpError("");
                    }}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full text-xs p-2.5 outline-none bg-transparent dark:text-white"
                  />
                </div>
              </div>

              {/* Mobile Input */}
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden focus-within:border-[#681a72] focus-within:ring-1 focus-within:ring-[#681a72] transition-all bg-gray-50/50 dark:bg-gray-800/50">
                  <span className="px-3 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-2.5 font-bold border-r border-gray-200 dark:border-gray-700 flex items-center gap-1">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={inputPhone}
                    onChange={(e) => {
                      setInputPhone(e.target.value.replace(/\D/g, ""));
                      setOtpError("");
                    }}
                    placeholder="9876543210"
                    className="w-full text-xs p-2.5 outline-none bg-transparent dark:text-white font-mono tracking-wider"
                  />
                </div>
              </div>

              {/* Optional Email */}
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">
                  Email Address <span className="text-[10px] text-gray-400">(Optional for invoices)</span>
                </label>
                <input
                  type="email"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs p-2.5 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-[#681a72] bg-gray-50/30 dark:bg-gray-800/30 dark:text-white"
                />
              </div>

              {otpError && (
                <p className="text-xs text-red-500 font-semibold bg-red-50 dark:bg-red-950/30 p-2 rounded-lg text-center">
                  {otpError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSendingOtp}
                className="w-full py-3 bg-[#681a72] hover:bg-[#52135a] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSendingOtp ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending OTP...</span>
                  </>
                ) : (
                  <>
                    <span>Send Verification OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 text-[11px] text-gray-400 text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Safe & Secure • Wholesale India Direct</span>
              </div>
            </form>
          )}

          {/* STEP 2: Enter & Verify OTP */}
          {authStep === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-4 pt-1">
              {/* Realistic Demo SMS Badge */}
              <div className="p-3 bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#681a72] dark:text-rose-300 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5" />
                    Demo Verification OTP
                  </span>
                  <span className="text-[10px] bg-rose-200 dark:bg-rose-900 text-[#681a72] dark:text-rose-200 font-bold px-1.5 py-0.5 rounded-sm">
                    SMS Simulated
                  </span>
                </div>
                <p className="text-[11px] text-gray-600 dark:text-gray-300">
                  Your One-Time Password for <strong className="text-gray-900 dark:text-white">{inputName}</strong> is{" "}
                  <span className="font-mono font-black text-[#681a72] dark:text-rose-300 text-xs px-1.5 py-0.5 bg-white dark:bg-gray-800 rounded border border-rose-200 dark:border-rose-800">
                    4829
                  </span>
                </p>
                <button
                  type="button"
                  onClick={handleAutoFillOtp}
                  className="w-full py-1.5 bg-white dark:bg-gray-800 hover:bg-rose-100 text-[#681a72] dark:text-rose-300 text-xs font-bold rounded-lg border border-rose-300 dark:border-rose-800 transition-colors"
                >
                  Click to Auto-Fill 4829
                </button>
              </div>

              {/* 4 Digit Boxes */}
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-2 text-center">
                  Enter 4-Digit Code
                </label>
                <div className="flex justify-center gap-3">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={otpInputRefs[idx]}
                      type="text"
                      maxLength={1}
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-12 h-14 text-center text-lg font-black font-mono border-2 border-gray-300 dark:border-gray-700 rounded-xl outline-none focus:border-[#681a72] focus:ring-2 focus:ring-[#681a72]/20 dark:bg-gray-800 dark:text-white transition-all"
                    />
                  ))}
                </div>
              </div>

              {otpError && (
                <p className="text-xs text-red-500 font-semibold bg-red-50 dark:bg-red-950/30 p-2 rounded-lg text-center">
                  {otpError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#681a72] hover:bg-[#52135a] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Verify & Enter Account</span>
                <Check className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-xs pt-1 text-gray-500">
                <button
                  type="button"
                  onClick={() => setAuthStep("credentials")}
                  className="hover:text-[#681a72] dark:hover:text-rose-400 font-medium underline"
                >
                  ← Change details
                </button>

                <div>
                  {countdown > 0 ? (
                    <span className="text-gray-400">Resend in {countdown}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setCountdown(30)}
                      className="text-[#681a72] dark:text-rose-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Resend OTP</span>
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW B: LOGGED IN - ACCOUNT DASHBOARD
  // ==========================================
  const userInitial = user.name ? user.name.trim().charAt(0).toUpperCase() : "V";

  return (
    <div className="min-h-screen bg-[#f8f8f9] dark:bg-[#111317] pt-6 pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Profile Card Header */}
        <div className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#681a72] to-[#9f2089] text-white flex items-center justify-center font-bold text-2xl shadow-md shrink-0">
              {userInitial}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">{user.name}</h1>
                <button
                  onClick={() => setEditProfileOpen(true)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-gray-400 hover:text-[#681a72] transition-colors"
                  title="Edit profile name & phone"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">
                {user.phone} • {user.email}
              </p>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/30 text-[#681a72] dark:text-rose-400 text-[10px] font-bold border border-rose-100 dark:border-rose-900/40">
                Velora Verified Buyer ✓
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => setEditProfileOpen(true)}
              className="px-3.5 py-2 border border-gray-200 dark:border-gray-700 hover:border-gray-400 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={logout}
              className="px-3.5 py-2 border border-gray-200 dark:border-gray-700 hover:border-red-400 text-gray-600 dark:text-gray-400 hover:text-red-500 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Quick Balance Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950/30 text-[#681a72] dark:text-rose-400 flex items-center justify-center shrink-0">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Velora Balance</p>
              <p className="text-base font-black text-gray-900 dark:text-white">
                {formatPrice(user.walletBalance)}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Smart Coins</p>
              <p className="text-base font-black text-gray-900 dark:text-white">{user.coins} Coins</p>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Orders</p>
              <p className="text-base font-black text-gray-900 dark:text-white">
                {user.orders.length} Placed
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-800 text-xs font-bold gap-6">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "orders"
                ? "border-[#681a72] text-[#681a72] dark:border-rose-400 dark:text-rose-400"
                : "border-transparent text-gray-500 hover:text-black dark:hover:text-white"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders ({user.orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "addresses"
                ? "border-[#681a72] text-[#681a72] dark:border-rose-400 dark:text-rose-400"
                : "border-transparent text-gray-500 hover:text-black dark:hover:text-white"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses ({user.addresses.length})</span>
          </button>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {user.orders.length === 0 ? (
              <div className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-12 text-center">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="font-bold text-sm">No orders placed yet</p>
                <p className="text-xs text-gray-500 mt-1">Discover lowest wholesale prices direct from Surat, Jaipur & Agra mills.</p>
                <Link
                  href="/shop"
                  className="mt-3 inline-block px-4 py-2 bg-[#681a72] text-white text-xs font-bold rounded-lg hover:bg-[#52135a]"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              user.orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-xs space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800 gap-2">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-mono">
                        Order #{ord.id}
                      </span>
                      <p className="text-xs text-gray-500">Placed on {ord.date}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                        ● {ord.status}
                      </span>
                      <span className="font-bold text-sm text-gray-900 dark:text-white">
                        {formatPrice(ord.total)}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3">
                    {ord.items.map((it, idx) => {
                      const title = it.title || it.product?.title || "Velora Fashion Item";
                      const image = it.image || it.product?.images?.[0] || "/placeholder.png";
                      return (
                        <div key={idx} className="flex gap-3">
                          <div className="relative w-16 h-20 rounded-lg overflow-hidden shrink-0 border border-gray-100 dark:border-gray-700">
                            <Image src={image} alt={title} fill className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1">
                              {title}
                            </h4>
                            <p className="text-[11px] text-gray-500 mt-0.5">
                              Quantity: {it.quantity}
                              {it.selectedSize && ` • Size: ${it.selectedSize}`}
                            </p>
                            <p className="text-xs font-bold text-[#681a72] dark:text-rose-400 mt-1">
                              {formatPrice(it.price || it.product?.price || ord.total)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Tracking Bar */}
                  <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
                    <span className="text-emerald-600 font-semibold flex items-center gap-1.5">
                      <Truck className="w-4 h-4" />
                      Delivery within 3-4 days • Free Delivery
                    </span>
                    <button className="text-[#681a72] dark:text-rose-400 font-bold hover:underline">
                      Track Package →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: ADDRESSES */}
        {activeTab === "addresses" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Saved Delivery Addresses
              </h3>
              <button
                onClick={() => {
                  setAddrForm({
                    fullName: user.name,
                    street: "",
                    city: "",
                    state: "",
                    postalCode: "",
                    country: "India",
                    phone: user.phone,
                    isDefault: false,
                  });
                  setNewAddrModal(true);
                }}
                className="px-3 py-1.5 bg-[#681a72] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 hover:bg-[#52135a] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Address</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.addresses.map((a) => (
                <div
                  key={a.id}
                  className="bg-white dark:bg-[#1a1d24] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs relative"
                >
                  {a.isDefault && (
                    <span className="bg-rose-100 dark:bg-rose-950/40 text-[#681a72] dark:text-rose-300 text-[10px] font-bold px-2 py-0.5 rounded-sm mb-2 inline-block">
                      Default Delivery Address
                    </span>
                  )}
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">{a.fullName}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {a.street}, {a.apartment ? `${a.apartment}, ` : ""}
                    {a.city}, {a.state} - {a.postalCode}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Mobile: {a.phone}</p>

                  <button
                    onClick={() => deleteAddress(a.id)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 p-1"
                    title="Delete address"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: EDIT PROFILE */}
      {editProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setEditProfileOpen(false)} />
          <div className="relative bg-white dark:bg-[#1a1d24] rounded-2xl p-6 max-w-sm w-full shadow-2xl z-10 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-[#681a72]" />
                <span>Edit Profile Details</span>
              </h3>
              <button onClick={() => setEditProfileOpen(false)} className="text-gray-400 hover:text-black dark:hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-800 dark:text-white outline-none focus:border-[#681a72]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-800 dark:text-white outline-none focus:border-[#681a72]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-800 dark:text-white outline-none focus:border-[#681a72]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditProfileOpen(false)}
                  className="flex-1 py-2.5 border border-gray-300 dark:border-gray-700 text-xs font-semibold rounded-xl text-gray-600 dark:text-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#681a72] hover:bg-[#52135a] text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD NEW ADDRESS */}
      {newAddrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setNewAddrModal(false)} />
          <div className="relative bg-white dark:bg-[#1a1d24] rounded-2xl p-6 max-w-md w-full shadow-2xl z-10 space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Add New Delivery Address
            </h3>

            <form onSubmit={handleAddAddress} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Full Name *"
                value={addrForm.fullName}
                onChange={(e) => setAddrForm({ ...addrForm, fullName: e.target.value })}
                className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white"
              />
              <input
                type="tel"
                required
                placeholder="Mobile Number *"
                value={addrForm.phone}
                onChange={(e) => setAddrForm({ ...addrForm, phone: e.target.value })}
                className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white"
              />
              <input
                type="text"
                required
                placeholder="House / Flat / Building *"
                value={addrForm.street}
                onChange={(e) => setAddrForm({ ...addrForm, street: e.target.value })}
                className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Pincode *"
                  value={addrForm.postalCode}
                  onChange={(e) => setAddrForm({ ...addrForm, postalCode: e.target.value })}
                  className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white"
                />
                <input
                  type="text"
                  required
                  placeholder="City *"
                  value={addrForm.city}
                  onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })}
                  className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white"
                />
              </div>
              <input
                type="text"
                required
                placeholder="State *"
                value={addrForm.state}
                onChange={(e) => setAddrForm({ ...addrForm, state: e.target.value })}
                className="w-full text-xs p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white"
              />

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewAddrModal(false)}
                  className="flex-1 py-2 border border-gray-300 dark:border-gray-700 text-xs font-semibold rounded-lg text-gray-600 dark:text-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#681a72] hover:bg-[#52135a] text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}