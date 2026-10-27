import { create } from "zustand";

export interface UserAddress {
  id: string;
  isDefault: boolean;
  fullName: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface UserOrder {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: "Order Placed" | "In Production" | "White-Glove Dispatched" | "Delivered";
  trackingCode: string;
  items: {
    title: string;
    image: string;
    quantity: number;
    price: number;
  }[];
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: "client" | "vip" | "admin" | "vendor";
  tier: "Obsidian VIP" | "Gold Atelier" | "Silver Member";
  walletBalance: number; // e.g. $1,500 credits
  loyaltyPoints: number;
  phone: string;
  avatar: string;
  addresses: UserAddress[];
  orders: UserOrder[];
}

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => { success: boolean; message: string };
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addAddress: (address: Omit<UserAddress, "id">) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addOrder: (order: UserOrder) => void;
}

const DEFAULT_VIP_USER: UserProfile = {
  id: "usr_aur_99182",
  email: "julian.v@aurelia-atelier.luxury",
  name: "Lord Julian Vance",
  role: "vip",
  tier: "Obsidian VIP",
  walletBalance: 2450.00,
  loyaltyPoints: 18400,
  phone: "+1 (555) 892-0192",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  addresses: [
    {
      id: "addr-1",
      isDefault: true,
      fullName: "Lord Julian Vance",
      street: "432 Park Avenue, Penthouse 88",
      apartment: "Tower Suite A",
      city: "New York",
      state: "NY",
      postalCode: "10022",
      country: "United States",
      phone: "+1 (555) 892-0192",
    },
  ],
  orders: [
    {
      id: "ord-88392",
      orderNumber: "AUR-2026-9041",
      date: "Oct 24, 2026",
      total: 4850.00,
      status: "In Production",
      trackingCode: "SECURE-FEDEX-PRIORITY-904128",
      items: [
        {
          title: "AURELIA Celestial Tourbillon",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
          quantity: 1,
          price: 4850.00,
        },
      ],
    },
  ],
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: DEFAULT_VIP_USER,
  token: "jwt_token_sample_aurelia_vip_secret_signature",
  isAuthenticated: true,

  login: (email, pass) => {
    if (!email || !pass) {
      return { success: false, message: "Please provide valid credentials." };
    }
    set({
      user: DEFAULT_VIP_USER,
      token: "jwt_mock_token_success",
      isAuthenticated: true,
    });
    return { success: true, message: `Welcome back, ${DEFAULT_VIP_USER.name}.` };
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
  },

  updateProfile: (updates) => {
    const current = get().user;
    if (current) {
      set({ user: { ...current, ...updates } });
    }
  },

  addAddress: (addr) => {
    const current = get().user;
    if (!current) return;
    const newAddr: UserAddress = {
      ...addr,
      id: `addr-${Date.now()}`,
    };
    set({
      user: {
        ...current,
        addresses: [...current.addresses, newAddr],
      },
    });
  },

  deleteAddress: (id) => {
    const current = get().user;
    if (!current) return;
    set({
      user: {
        ...current,
        addresses: current.addresses.filter((a) => a.id !== id),
      },
    });
  },

  setDefaultAddress: (id) => {
    const current = get().user;
    if (!current) return;
    set({
      user: {
        ...current,
        addresses: current.addresses.map((a) => ({
          ...a,
          isDefault: a.id === id,
        })),
      },
    });
  },

  addOrder: (order) => {
    const current = get().user;
    if (!current) return;
    set({
      user: {
        ...current,
        orders: [order, ...current.orders],
      },
    });
  },
}));
