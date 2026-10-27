import { create } from "zustand";
import { Product } from "@/data/products";

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
  { code: "AURELIA10", discountPercent: 10, description: "Atelier Welcome - 10% Off Your Curated Order" },
  { code: "VIP20", discountPercent: 20, description: "Obsidian Private Client - 20% Off Orders Over $3000" },
  { code: "CONCIERGE", discountPercent: 15, description: "Private Concierge Courtesy - 15% Off" },
];

interface CartState {
  items: CartItem[];
  savedForLater: CartItem[];
  isOpen: boolean;
  appliedCoupon: Coupon | null;
  shippingOption: "complimentary" | "express" | "courier";
  
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
  setShippingOption: (opt: "complimentary" | "express" | "courier") => void;
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
    // Pre-seed with one luxury product to give instant rich preview
    {
      product: {
        id: "prod-sound-01",
        slug: "aether-spatial-anc-headphones",
        title: "AETHER Spatial Pro Headphones",
        subtitle: "Planar Magnetic Drivers with Real-Time Acoustic Raytracing",
        category: "Acoustics",
        subcategory: "Headphones",
        brand: "AETHER Sound",
        price: 890,
        originalPrice: 1050,
        rating: 4.96,
        reviewsCount: 128,
        inStock: true,
        stockCount: 14,
        images: [
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85",
        ],
        turntableImages: [],
        colors: [
          { name: "Space Graphite", hex: "#1C1C1E" },
        ],
        description: "Spatial audio engineered with custom 50mm beryllium-coated planar magnetic drivers.",
        craftsmanship: "Memory foam ear cushions clad in organic lambskin leather.",
        specs: {},
        features: [],
        reviews: [],
      },
      quantity: 1,
      selectedColor: "Space Graphite",
      addedAt: Date.now(),
    },
  ],
  savedForLater: [],
  isOpen: false,
  appliedCoupon: null,
  shippingOption: "complimentary",

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (product, quantity = 1, selectedColor, selectedSize) => {
    const color = selectedColor || product.colors?.[0]?.name;
    const size = selectedSize || product.sizes?.[0];

    set((state) => {
      const existingIdx = state.items.findIndex(
        (i) => i.product.id === product.id && i.selectedColor === color && i.selectedSize === size
      );

      if (existingIdx > -1) {
        const next = [...state.items];
        next[existingIdx].quantity += quantity;
        return { items: next, isOpen: true };
      }

      return {
        items: [
          ...state.items,
          { product, quantity, selectedColor: color, selectedSize: size, addedAt: Date.now() },
        ],
        isOpen: true,
      };
    });
  },

  removeItem: (productId, selectedColor, selectedSize) => {
    set((state) => ({
      items: state.items.filter(
        (i) => !(i.product.id === productId && i.selectedColor === selectedColor && i.selectedSize === selectedSize)
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
        if (i.product.id === productId && i.selectedColor === selectedColor && i.selectedSize === selectedSize) {
          return { ...i, quantity };
        }
        return i;
      }),
    }));
  },

  saveForLater: (productId, selectedColor, selectedSize) => {
    const item = get().items.find(
      (i) => i.product.id === productId && i.selectedColor === selectedColor && i.selectedSize === selectedSize
    );
    if (!item) return;

    set((state) => ({
      items: state.items.filter(
        (i) => !(i.product.id === productId && i.selectedColor === selectedColor && i.selectedSize === selectedSize)
      ),
      savedForLater: [...state.savedForLater, item],
    }));
  },

  moveToCartFromSaved: (productId, selectedColor, selectedSize) => {
    const item = get().savedForLater.find(
      (i) => i.product.id === productId && i.selectedColor === selectedColor && i.selectedSize === selectedSize
    );
    if (!item) return;

    set((state) => ({
      savedForLater: state.savedForLater.filter(
        (i) => !(i.product.id === productId && i.selectedColor === selectedColor && i.selectedSize === selectedSize)
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
      return { success: true, message: `Privilege unlocked: ${found.discountPercent}% courtesy applied.` };
    }
    return { success: false, message: "Invalid access token or expired coupon." };
  },

  removeCoupon: () => set({ appliedCoupon: null }),

  setShippingOption: (shippingOption) => set({ shippingOption }),

  clearCart: () => set({ items: [], appliedCoupon: null }),

  getSubtotal: () => {
    return get().items.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  },

  getDiscountAmount: () => {
    const subtotal = get().getSubtotal();
    const coupon = get().appliedCoupon;
    if (!coupon) return 0;
    return (subtotal * coupon.discountPercent) / 100;
  },

  getShippingCost: () => {
    const subtotal = get().getSubtotal();
    // Complimentary above $1500 or default option
    const opt = get().shippingOption;
    if (opt === "express") return 45;
    if (opt === "courier") return 120;
    return subtotal > 1500 ? 0 : 25;
  },

  getTaxAmount: () => {
    const subtotal = get().getSubtotal() - get().getDiscountAmount();
    return Math.max(0, subtotal * 0.08); // 8% luxury sales tax
  },

  getTotal: () => {
    const subtotal = get().getSubtotal();
    const discount = get().getDiscountAmount();
    const shipping = get().getShippingCost();
    const tax = get().getTaxAmount();
    return Math.max(0, subtotal - discount + shipping + tax);
  },

  getTotalItemsCount: () => {
    return get().items.reduce((acc, curr) => acc + curr.quantity, 0);
  },
}));
