import { create } from "zustand";
import { Product, PRODUCTS } from "@/data/products";

interface WishlistState {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [PRODUCTS[0]], // Pre-seed with Celestial Tourbillon
  toggleWishlist: (product) => {
    const exists = get().items.some((i) => i.id === product.id);
    if (exists) {
      set((state) => ({ items: state.items.filter((i) => i.id !== product.id) }));
    } else {
      set((state) => ({ items: [...state.items, product] }));
    }
  },
  isInWishlist: (productId) => {
    return get().items.some((i) => i.id === productId);
  },
  removeItem: (productId) => {
    set((state) => ({ items: state.items.filter((i) => i.id !== productId) }));
  },
  clearWishlist: () => set({ items: [] }),
}));
