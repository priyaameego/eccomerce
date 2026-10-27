"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isPointer, setIsPointer] = useState(false);

  // Smooth springs for outer luxury aura
  const mouseX = useSpring(0, { stiffness: 450, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 450, damping: 30 });

  useEffect(() => {
    // Only show on devices with fine pointer (mouse/trackpad, not touch)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("button, a, input, select, textarea, [data-cursor]");
      if (interactive) {
        setIsPointer(true);
        const customText = interactive.getAttribute("data-cursor-text");
        setCursorText(customText || "");
      } else {
        setIsPointer(false);
        setCursorText("");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Outer Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center border transition-colors duration-200"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: isPointer ? (cursorText ? 84 : 48) : 32,
          height: isPointer ? (cursorText ? 84 : 48) : 32,
          backgroundColor: isPointer ? "rgba(212, 175, 55, 0.12)" : "rgba(255, 255, 255, 0.04)",
          borderColor: isPointer ? "rgba(212, 175, 55, 0.6)" : "rgba(255, 255, 255, 0.2)",
          backdropFilter: isPointer ? "blur(4px)" : "none",
        }}
      >
        {cursorText && (
          <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase font-bold text-center px-1">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center Precise Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_10px_#d4af37]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
}
