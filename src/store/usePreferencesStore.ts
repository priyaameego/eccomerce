import { create } from "zustand";
import { Currency } from "@/lib/utils";
import { Product } from "@/data/products";

interface PreferencesState {
  currency: Currency;
  isDarkMode: boolean;
  soundEnabled: boolean;
  language: "EN" | "FR" | "JA" | "AR";
  quickViewProduct: Product | null;
  isSearchOpen: boolean;
  isMegaMenuOpen: boolean;
  activeMegaCategory: string;

  setCurrency: (currency: Currency) => void;
  toggleTheme: () => void;
  setSoundEnabled: (val: boolean) => void;
  setLanguage: (lang: "EN" | "FR" | "JA" | "AR") => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  setSearchOpen: (val: boolean) => void;
  setMegaMenuOpen: (val: boolean) => void;
  setActiveMegaCategory: (cat: string) => void;
}

export const usePreferencesStore = create<PreferencesState>((set) => ({
  currency: "USD",
  isDarkMode: true,
  soundEnabled: true,
  language: "EN",
  quickViewProduct: null,
  isSearchOpen: false,
  isMegaMenuOpen: false,
  activeMegaCategory: "Horology",

  setCurrency: (currency) => set({ currency }),
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setSoundEnabled: (val) => set({ soundEnabled: val }),
  setLanguage: (language) => set({ language }),
  openQuickView: (product) => set({ quickViewProduct: product }),
  closeQuickView: () => set({ quickViewProduct: null }),
  setSearchOpen: (val) => set({ isSearchOpen: val }),
  setMegaMenuOpen: (val) => set({ isMegaMenuOpen: val }),
  setActiveMegaCategory: (cat) => set({ activeMegaCategory: cat }),
}));
