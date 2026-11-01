"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  ShieldCheck,
  User,
  Store,
  Sparkles,
  ArrowRight,
  Lock,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { usePreferencesStore } from "@/store/usePreferencesStore";

export default function AuthModal() {
  const router = useRouter();
  const isOpen = usePreferencesStore((s) => s.isAuthModalOpen);
  const setOpen = usePreferencesStore((s) => s.setAuthModalOpen);

  const loginWithOtp = useAuthStore((s) => s.loginWithOtp);
  const loginAsAdmin = useAuthStore((s) => s.loginAsAdmin);
  const loginAsSeller = useAuthStore((s) => s.loginAsSeller);

  const [activeTab, setActiveTab] = useState<"customer" | "admin" | "seller">("customer");

  // Customer Form State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVal, setOtpVal] = useState("");

  // Admin Form State
  const [adminEmail, setAdminEmail] = useState("admin@velora.com");
  const [adminPassword, setAdminPassword] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerPhone.trim() && !customerEmail.trim()) {
      setErrorMsg("Please enter your mobile number or email.");
      return;
    }

    if (!otpSent) {
      setOtpSent(true);
      setErrorMsg(null);
      return;
    }

    // Verify OTP
    loginWithOtp(customerName || "Velora Customer", customerPhone || "+91 9876543210", customerEmail);
    setOpen(false);
    resetForm();
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmail.trim() || !adminPassword.trim()) {
      setErrorMsg("Please enter admin credentials.");
      return;
    }

    loginAsAdmin();
    setOpen(false);
    resetForm();
    router.push("/admin");
  };

  const handleDemoCustomerLogin = () => {
    loginWithOtp("Priya Sharma", "+91 98765 43210", "priya.sharma@gmail.com");
    setOpen(false);
    resetForm();
  };

  const handleDemoAdminLogin = () => {
    loginAsAdmin();
    setOpen(false);
    resetForm();
    router.push("/admin");
  };

  const handleDemoSellerLogin = () => {
    loginAsSeller("Surat Silk & Jacquard Hub");
    setOpen(false);
    resetForm();
    router.push("/admin");
  };

  const resetForm = () => {
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setOtpSent(false);
    setOtpVal("");
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-md bg-white dark:bg-[#131926] rounded-3xl shadow-2xl border border-gray-200/80 dark:border-gray-800 overflow-hidden text-gray-900 dark:text-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Strip */}
        <div className="h-2 w-full bg-gradient-to-r from-gray-900 via-[#681a72] to-[#c084fc]" />

        {/* Close Button */}
        <button
          onClick={() => {
            setOpen(false);
            resetForm();
          }}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Brand Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-[#681a72] dark:text-[#c084fc] mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              Velora Luxury Account
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Access fashion lookbook, seller hub & admin dashboard
            </p>
          </div>

          {/* Role Tabs */}
          <div className="grid grid-cols-2 p-1 bg-gray-100 dark:bg-gray-800/80 rounded-xl mb-5">
            <button
              type="button"
              onClick={() => {
                setActiveTab("customer");
                setErrorMsg(null);
              }}
              className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "customer"
                  ? "bg-white dark:bg-[#1f293d] text-gray-950 dark:text-white shadow-xs"
                  : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Customer</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("admin");
                setErrorMsg(null);
              }}
              className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "admin"
                  ? "bg-white dark:bg-[#1f293d] text-gray-950 dark:text-white shadow-xs"
                  : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Admin / Seller</span>
            </button>
          </div>

          {/* Error Message if any */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* CUSTOMER LOGIN FORM */}
          {activeTab === "customer" && (
            <form onSubmit={handleCustomerSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Full Name (Optional)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Mobile Number or Email *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Enter 10-digit number or email"
                    className="w-full bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-900"
                  />
                </div>
              </div>

              {otpSent && (
                <div className="animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                      Enter 6-Digit OTP *
                    </label>
                    <span className="text-[11px] text-[#681a72] dark:text-[#c084fc] font-semibold">
                      OTP sent (Use 123456)
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpVal}
                    onChange={(e) => setOtpVal(e.target.value)}
                    placeholder="123456"
                    className="w-full bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-center text-sm font-mono tracking-widest text-gray-900 dark:text-white focus:outline-none focus:border-gray-900"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gray-950 hover:bg-black text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{otpSent ? "Verify & Login" : "Send OTP"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-800" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold text-gray-400">
                  <span className="bg-white dark:bg-[#131926] px-2">Or Quick Test</span>
                </div>
              </div>

              {/* 1-Click Demo Customer Button */}
              <button
                type="button"
                onClick={handleDemoCustomerLogin}
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-xs rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer border border-gray-200 dark:border-gray-700"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>1-Click Demo Customer Login</span>
              </button>
            </form>
          )}

          {/* ADMIN & SELLER LOGIN FORM */}
          {activeTab === "admin" && (
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Admin / Seller Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="admin@velora.com"
                    className="w-full bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="admin"
                    className="w-full bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl pl-10 pr-10 py-2.5 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <span className="text-[10px] text-gray-400 mt-1 block">
                  Default credentials: <strong>admin@velora.com</strong> / <strong>admin</strong>
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gray-950 hover:bg-black text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Login to Admin Hub</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-800" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold text-gray-400">
                  <span className="bg-white dark:bg-[#131926] px-2">Instant Demo Access</span>
                </div>
              </div>

              {/* 1-Click Demo Admin Button */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleDemoAdminLogin}
                  className="py-2.5 px-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold text-xs rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5 border border-gray-300 dark:border-gray-700 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>Demo Admin</span>
                </button>

                <button
                  type="button"
                  onClick={handleDemoSellerLogin}
                  className="py-2.5 px-3 bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 dark:hover:bg-purple-900/50 text-[#681a72] dark:text-purple-300 font-bold text-xs rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5 border border-purple-300 dark:border-purple-800 cursor-pointer"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Demo Seller</span>
                </button>
              </div>
            </form>
          )}

          {/* Footer note */}
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800/80 text-center text-[11px] text-gray-400">
            By logging in, you agree to Velora Terms of Service & Privacy Policy.
          </div>
        </div>
      </div>
    </div>
  );
}
