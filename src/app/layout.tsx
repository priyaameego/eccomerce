import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import MobileBottomNav from "@/components/ui/MobileBottomNav";
import CartDrawer from "@/components/ui/CartDrawer";
import QuickViewModal from "@/components/ui/QuickViewModal";
import SearchModal from "@/components/ui/SearchModal";
import ThemeProvider from "@/components/ui/ThemeProvider";

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "VELORA • Premium Fashion & Wholesale Lifestyle Shopping India",
  description:
    "Experience Velora - India's favorite value & style destination. Shop authentic Banarasi sarees, designer kurtis, streetwear, home essentials, and electronics at lowest wholesale factory prices with Free Pan-India Delivery.",
  keywords: [
    "Velora",
    "Velora Fashion",
    "Online Shopping India",
    "Banarasi Sarees",
    "Designer Kurtis",
    "Men Casual Shirts",
    "Home Decor",
    "Free Delivery",
    "Cash on Delivery",
    "Wholesale Prices",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} light antialiased scroll-smooth`}
    >
      <body className="min-h-screen bg-[#f8f9fa] text-[#1e293b] flex flex-col font-sans selection:bg-[#681a72] selection:text-white pb-14 sm:pb-0">
        <ThemeProvider>
          {/* Velora Global Header */}
          <Navbar />

          {/* Page Content */}
          <div className="flex-1">{children}</div>

          {/* Mobile Bottom Navigation Bar */}
          <MobileBottomNav />

          {/* Global Modals & Drawers */}
          <CartDrawer />
          <QuickViewModal />
          <SearchModal />

          {/* Velora Global Footer */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
