import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cinzel, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import QuickViewModal from "@/components/ui/QuickViewModal";
import SearchModal from "@/components/ui/SearchModal";
import CustomCursor from "@/components/ui/CustomCursor";

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const serifFont = Cinzel({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const monoFont = Space_Grotesk({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "AURELIA • Haute Horlogerie & Advanced Material Atelier",
  description:
    "An ultra-luxury atelier bridging Swiss mechanical horology, aerospace titanium metallurgy, planar magnetic acoustics, and generative design.",
  keywords: [
    "Luxury Tourbillon",
    "Haute Horlogerie",
    "Planar Magnetic Headphones",
    "Carbon Electric Scooter",
    "Awwwards eCommerce",
    "Swiss Watchmaking",
    "Aurelia Atelier",
  ],
  openGraph: {
    title: "AURELIA • Haute Horlogerie & Advanced Material Atelier",
    description: "The apex of material mastery and mechanical poetry.",
    type: "website",
    url: "https://aurelia-atelier.luxury",
    images: [
      {
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "Aurelia Celestial Tourbillon",
      },
    ],
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
      className={`${sansFont.variable} ${serifFont.variable} ${monoFont.variable} dark antialiased scroll-smooth`}
    >
      <body className="min-h-screen bg-[#090a0f] text-white flex flex-col font-sans selection:bg-[#d4af37] selection:text-black">
        {/* Luxury Custom Magnetic Cursor */}
        <CustomCursor />

        {/* Global Luxury Header */}
        <Navbar />

        {/* Dynamic Page Children */}
        <div className="flex-1">{children}</div>

        {/* Global Luxury Footer */}
        <Footer />

        {/* Global Modals & Drawers */}
        <CartDrawer />
        <QuickViewModal />
        <SearchModal />
      </body>
    </html>
  );
}
