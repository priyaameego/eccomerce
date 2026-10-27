"use client";

import React, { useEffect } from "react";
import { usePreferencesStore } from "@/store/usePreferencesStore";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isDarkMode = usePreferencesStore((s) => s.isDarkMode);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.remove("light");
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      root.style.colorScheme = "light";
    }
  }, [isDarkMode]);

  return <>{children}</>;
}
