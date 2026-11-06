import React from "react";
import MaisonVellHero from "@/components/home/MaisonVellHero";

export const metadata = {
  title: "Maison Vell — Runway Depth Lookbook | Spring Summer 2027",
  description:
    "A runway lookbook where six looks stand in a line into the distance and every drag brings the next one to the front.",
};

export default function RunwayPage() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-white">
      <MaisonVellHero standalone={true} />
    </main>
  );
}

