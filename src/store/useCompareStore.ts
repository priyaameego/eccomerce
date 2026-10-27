import { create } from "zustand";
import { Product } from "@/data/products";

interface CompareState {
  items: Product[];
  addToCompare: (product: Product) => { success: boolean; message: string };
  removeFromCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
}

export const useCompareStore = create<CompareState>((set, get) => ({
  items: [],
  addToCompare: (product) => {
    const current = get().items;
    if (current.some((i) => i.id === product.id)) {
      return { success: false, message: "Item is already in comparison atelier." };
    }
    if (current.length >= 4) {
      return { success: false, message: "Maximum 4 items can be compared side-by-side." };
    }
    set({ items: [...current, product] });
    return { success: true, message: `${product.title} added to comparison matrix.` };
  },
  removeFromCompare: (productId) => {
    set((state) => ({ items: state.items.filter((i) => i.id !== productId) }));
  },
  isInCompare: (productId) => {
    return get().items.some((i) => i.id === productId);
  },
  clearCompare: () => set({ items: [] }),
}));
