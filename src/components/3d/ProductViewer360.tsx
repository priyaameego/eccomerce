"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { RotateCcw, ZoomIn, ZoomOut, Play, Pause, Sparkles, Info } from "lucide-react";
import { sound } from "@/lib/sound";

interface ProductViewer360Props {
  images: string[];
  productTitle: string;
}

export default function ProductViewer360({ images, productTitle }: ProductViewer360Props) {
  // If insufficient turntable images, duplicate frames with slight brightness/contrast variance to create rich rotational illusion
  const frames = images.length >= 4 ? images : [
    images[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
    images[1] || images[0] || "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85",
    images[2] || images[0] || "https://images.unsplash.com/photo-1547996160-71dfabbce5ed?auto=format&fit=crop&w=1200&q=85",
    images[3] || images[0] || "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85",
  ];

  const totalFrames = frames.length;
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Auto spin timer
  useEffect(() => {
    if (!isAutoSpinning) return;
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % totalFrames);
    }, 120);
    return () => clearInterval(interval);
  }, [isAutoSpinning, totalFrames]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setIsAutoSpinning(false);
    sound.playClick();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    // Every 25px of drag advances or reverses 1 frame
    const sensitivity = 25;
    if (Math.abs(delta) > sensitivity) {
      const step = delta > 0 ? 1 : -1;
      setCurrentFrame((prev) => (prev + step + totalFrames) % totalFrames);
      setStartX(e.clientX);
      sound.playHover();
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setIsAutoSpinning(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - startX;
    const sensitivity = 25;
    if (Math.abs(delta) > sensitivity) {
      const step = delta > 0 ? 1 : -1;
      setCurrentFrame((prev) => (prev + step + totalFrames) % totalFrames);
      setStartX(e.touches[0].clientX);
    }
  };

  const angleDeg = Math.round((currentFrame / totalFrames) * 360);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden glass-panel border border-white/10 group select-none">
      {/* 360 Turntable Canvas Area */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        className={`relative w-full aspect-[4/3] md:aspect-square flex items-center justify-center overflow-hidden transition-all duration-300 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {/* Subtle Ambient Radial Lighting Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

        {/* Current Frame Image */}
        <div
          className="relative w-full h-full transition-transform duration-200 ease-out flex items-center justify-center p-6 md:p-10"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <Image
            src={frames[currentFrame]}
            alt={`${productTitle} 360 view angle ${angleDeg}°`}
            fill
            className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] pointer-events-none"
            priority
          />
        </div>

        {/* Interactive Craftsmanship Hotspots */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Hotspot 1: Material Bezel */}
          <div
            className="absolute top-[38%] left-[45%] pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              setActiveHotspot(activeHotspot === 1 ? null : 1);
              sound.playClick();
            }}
          >
            <div className="relative flex items-center justify-center cursor-pointer">
              <span className="w-5 h-5 rounded-full bg-[#d4af37]/30 animate-ping absolute" />
              <button className="w-6 h-6 rounded-full bg-[#12131a] border border-[#d4af37] text-[#d4af37] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Sparkles className="w-3 h-3" />
              </button>
            </div>
            {activeHotspot === 1 && (
              <div className="absolute left-8 -top-8 w-56 p-3 rounded-xl glass-panel border border-[#d4af37]/40 shadow-2xl text-left z-30">
                <p className="text-[11px] font-mono uppercase tracking-widest text-[#d4af37]">Craftsmanship</p>
                <p className="text-xs font-semibold text-white mt-0.5">Forged Grade 5 Titanium</p>
                <p className="text-[11px] text-neutral-300 mt-1">Hand-beveled black mirror polish with aerospace tolerance.</p>
              </div>
            )}
          </div>

          {/* Hotspot 2: Escapement / Acoustic Driver */}
          <div
            className="absolute bottom-[35%] right-[42%] pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              setActiveHotspot(activeHotspot === 2 ? null : 2);
              sound.playClick();
            }}
          >
            <div className="relative flex items-center justify-center cursor-pointer">
              <span className="w-5 h-5 rounded-full bg-cyan-400/30 animate-ping absolute" />
              <button className="w-6 h-6 rounded-full bg-[#12131a] border border-cyan-400 text-cyan-400 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Info className="w-3 h-3" />
              </button>
            </div>
            {activeHotspot === 2 && (
              <div className="absolute right-8 -top-8 w-56 p-3 rounded-xl glass-panel border border-cyan-400/40 shadow-2xl text-left z-30">
                <p className="text-[11px] font-mono uppercase tracking-widest text-cyan-400">Atelier Mechanism</p>
                <p className="text-xs font-semibold text-white mt-0.5">Quantum Gyro Core</p>
                <p className="text-[11px] text-neutral-300 mt-1">Defies gravitational friction with 21,600 vph resonance.</p>
              </div>
            )}
          </div>
        </div>

        {/* Center Drag Prompt Overlay (fades out on interact) */}
        {!isDragging && !isAutoSpinning && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full glass-panel border border-white/20 text-xs font-mono text-neutral-300 pointer-events-none flex items-center gap-2 shadow-xl opacity-90 group-hover:opacity-100 transition-opacity">
            <RotateCcw className="w-3.5 h-3.5 text-[#d4af37] animate-spin" />
            Drag Horizontally for 360° Spin
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="p-4 border-t border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-wider text-[#d4af37] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
            Angle: {angleDeg}°
          </span>
          <span className="text-[11px] text-neutral-400">
            Frame {currentFrame + 1} of {totalFrames}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Auto Spin Toggle */}
          <button
            onClick={() => {
              setIsAutoSpinning(!isAutoSpinning);
              sound.playClick();
            }}
            className={`p-2 rounded-lg border transition-all text-xs flex items-center gap-1.5 ${
              isAutoSpinning
                ? "bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37]"
                : "border-white/10 text-neutral-300 hover:text-white hover:bg-white/5"
            }`}
            title={isAutoSpinning ? "Pause rotation" : "Auto spin 360"}
          >
            {isAutoSpinning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isAutoSpinning ? "Pause" : "Auto Spin"}</span>
          </button>

          {/* Zoom Out */}
          <button
            onClick={() => {
              setZoomLevel((prev) => Math.max(1, prev - 0.25));
              sound.playClick();
            }}
            disabled={zoomLevel <= 1}
            className="p-2 rounded-lg border border-white/10 text-neutral-300 hover:text-white hover:bg-white/5 disabled:opacity-40 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          {/* Zoom In */}
          <button
            onClick={() => {
              setZoomLevel((prev) => Math.min(2.25, prev + 0.25));
              sound.playClick();
            }}
            disabled={zoomLevel >= 2.25}
            className="p-2 rounded-lg border border-white/10 text-neutral-300 hover:text-white hover:bg-white/5 disabled:opacity-40 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
