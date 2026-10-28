import React from "react";
import MeeshoHomeClient from "@/components/home/MeeshoHomeClient";

export const metadata = {
  title: "Velora - Online Shopping India | Wholesale Prices, Designer Quality Fashion & Home",
  description:
    "Shop sarees, kurtis, dresses, men shirts, kids wear, electronics & home essentials at lowest wholesale prices with Free Delivery and Cash on Delivery on Velora.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <MeeshoHomeClient />
    </main>
  );
}
