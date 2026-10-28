import { create } from "zustand";
import { Product, PRODUCTS } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  addedAt: number;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  description: string;
}

export const AVAILABLE_COUPONS: Coupon[] = [
  { code: "VELORA100", discountPercent: 15, description: "Velora Welcome - Extra 15% Off (Up to ₹100)" },
  { code: "MEESHO100", discountPercent: 15, description: "Welcome Coupon - Extra 15% Off (Up to ₹100)" },
  { code: "FESTIVE20", discountPercent: 20, description: "Festive Sale - Flat 20% Off" },
  { code: "FREESHIP", discountPercent: 10, description: "Special Courtesy - Extra 10% Off" },
];

interface CartState {
  items: CartItem[];
  savedForLater: CartItem[];
  isOpen: boolean;
  appliedCoupon: Coupon | null;
  shippingOption: "standard" | "express";

  // Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeItem: (productId: string, selectedColor?: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColor?: string, selectedSize?: string) => void;
  saveForLater: (productId: string, selectedColor?: string, selectedSize?: string) => void;
  moveToCartFromSaved: (productId: string, selectedColor?: string, selectedSize?: string) => void;
  removeSavedItem: (productId: string) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  setShippingOption: (opt: "standard" | "express") => void;
  clearCart: () => void;

  // Calculations
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingCost: () => number;
  getTaxAmount: () => number;
  getTotal: () => number;
  getTotalItemsCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [
    {
      product: PRODUCTS[0],
      quantity: 1,
      selectedColor: "Royal Magenta",
      selectedSize: "Free Size",
      addedAt: Date.now(),
    },
  ],
  savedForLater: [],
  isOpen: false,
  appliedCoupon: null,
  shippingOption: "standard",

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (product, quantity = 1, selectedColor, selectedSize) => {
    set((state) => {
      const existingIndex = state.items.findIndex(
        (i) =>
          i.product.id === product.id &&
          i.selectedColor === selectedColor &&
          i.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const newItems = [...state.items];
        newItems[existingIndex].quantity += quantity;
        return { items: newItems, isOpen: true };
      }

      return {
        items: [
          ...state.items,
          {
            product,
            quantity,
            selectedColor: selectedColor || product.colors?.[0]?.name,
            selectedSize: selectedSize || product.sizes?.[0],
            addedAt: Date.now(),
          },
        ],
        isOpen: true,
      };
    });
  },

  removeItem: (productId, selectedColor, selectedSize) => {
    set((state) => ({
      items: state.items.filter(
        (i) =>
          !(
            i.product.id === productId &&
            i.selectedColor === selectedColor &&
            i.selectedSize === selectedSize
          )
      ),
    }));
  },

  updateQuantity: (productId, quantity, selectedColor, selectedSize) => {
    if (quantity <= 0) {
      get().removeItem(productId, selectedColor, selectedSize);
      return;
    }
    set((state) => ({
      items: state.items.map((i) => {
        if (
          i.product.id === productId &&
          i.selectedColor === selectedColor &&
          i.selectedSize === selectedSize
        ) {
          return { ...i, quantity };
        }
        return i;
      }),
    }));
  },

  saveForLater: (productId, selectedColor, selectedSize) => {
    const item = get().items.find(
      (i) =>
        i.product.id === productId &&
        i.selectedColor === selectedColor &&
        i.selectedSize === selectedSize
    );
    if (!item) return;

    set((state) => ({
      items: state.items.filter(
        (i) =>
          !(
            i.product.id === productId &&
            i.selectedColor === selectedColor &&
            i.selectedSize === selectedSize
          )
      ),
      savedForLater: [...state.savedForLater, item],
    }));
  },

  moveToCartFromSaved: (productId, selectedColor, selectedSize) => {
    const item = get().savedForLater.find(
      (i) =>
        i.product.id === productId &&
        i.selectedColor === selectedColor &&
        i.selectedSize === selectedSize
    );
    if (!item) return;

    set((state) => ({
      savedForLater: state.savedForLater.filter(
        (i) =>
          !(
            i.product.id === productId &&
            i.selectedColor === selectedColor &&
            i.selectedSize === selectedSize
          )
      ),
      items: [...state.items, item],
    }));
  },

  removeSavedItem: (productId) => {
    set((state) => ({
      savedForLater: state.savedForLater.filter((i) => i.product.id !== productId),
    }));
  },

  applyCoupon: (code) => {
    const clean = code.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find((c) => c.code === clean);
    if (found) {
      set({ appliedCoupon: found });
      return { success: true, message: `Coupon ${found.code} applied! Saved ${found.discountPercent}%` };
    }
    return { success: false, message: "Invalid coupon. Try MEESHO100 or FESTIVE20" };
  },

  removeCoupon: () => set({ appliedCoupon: null }),

  setShippingOption: (opt) => set({ shippingOption: opt }),

  clearCart: () => set({ items: [] }),

  getSubtotal: () => {
    return get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  },

  getDiscountAmount: () => {
    const subtotal = get().getSubtotal();
    const coupon = get().appliedCoupon;
    if (!coupon) return 0;
    return Math.round((subtotal * coupon.discountPercent) / 100);
  },

  getShippingCost: () => {
    // Meesho features 100% Free Delivery!
    return 0;
  },

  getTaxAmount: () => {
    return 0;
  },

  getTotal: () => {
    const subtotal = get().getSubtotal();
    const discount = get().getDiscountAmount();
    return Math.max(0, subtotal - discount);
  },

  getTotalItemsCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },
}));
