import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  orderNumber?: string;
  date: string;
  total: number;
  subtotal?: number;
  discount?: number;
  shipping?: number;
  tax?: number;
  status: "Order Placed" | "Processing" | "Shipped" | "Delivered";
  trackingCode?: string;
  paymentMethod?: string;
  shippingAddress?: any;
  items: {
    product?: any;
    title?: string;
    image?: string;
    quantity: number;
    price?: number;
    selectedColor?: string;
    selectedSize?: string;
  }[];
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: "customer" | "supplier" | "admin";
  walletBalance: number; // Velora Credits (₹)
  coins: number; // Velora Smart Coins
  phone: string;
  avatar: string;
  addresses: UserAddress[];
  orders: UserOrder[];
}

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (phoneOrEmail: string, otp?: string) => { success: boolean; message: string };
  loginWithOtp: (name: string, phone: string, email?: string) => { success: boolean; message: string };
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addAddress: (address: Omit<UserAddress, "id">) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addOrder: (order: UserOrder) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null, // Starts as null so user can log in with their own name & phone
      token: null,
      isAuthenticated: false,

      // Login with custom Name & Phone via OTP verification
      loginWithOtp: (name: string, phone: string, email?: string) => {
        const cleanName = name.trim() || "Velora Customer";
        const digitsOnly = phone.replace(/\D/g, "");
        const formattedPhone = phone.startsWith("+91")
          ? phone
          : `+91 ${digitsOnly.length === 10 ? digitsOnly : phone.trim()}`;
        
        const cleanEmail =
          email?.trim() ||
          `${cleanName.toLowerCase().replace(/[^a-z0-9]/g, "") || "user"}@gmail.com`;

        const newUser: UserProfile = {
          id: `usr_vel_${Date.now()}`,
          name: cleanName,
          email: cleanEmail,
          role: "customer",
          walletBalance: 250,
          coins: 140,
          phone: formattedPhone,
          avatar: "",
          addresses: [
            {
              id: `addr-${Date.now()}`,
              isDefault: true,
              fullName: cleanName,
              street: "Flat 402, Sunshine Apartments, Sector 14",
              apartment: "Near Metro Station",
              city: "New Delhi",
              state: "Delhi",
              postalCode: "110001",
              country: "India",
              phone: formattedPhone,
            },
          ],
          orders: [
            {
              id: `VEL-${Math.floor(100000 + Math.random() * 900000)}`,
              orderNumber: `VEL-${Math.floor(100000 + Math.random() * 900000)}`,
              date: "26 Oct 2026",
              total: 389,
              status: "Shipped",
              trackingCode: "EXPRESS-DELHIVERY-981240",
              paymentMethod: "Cash on Delivery",
              items: [
                {
                  title: "Kashvi Pretty Banarasi Silk Jacquard Saree With Blouse Piece",
                  image:
                    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80",
                  quantity: 1,
                  price: 389,
                  selectedColor: "Royal Magenta",
                  selectedSize: "Free Size",
                },
              ],
            },
          ],
        };

        set({
          user: newUser,
          token: `vel_token_${Date.now()}`,
          isAuthenticated: true,
        });

        return { success: true, message: `Welcome to Velora, ${cleanName}!` };
      },

      login: (phoneOrEmail) => {
        if (!phoneOrEmail) {
          return { success: false, message: "Please enter your mobile number or email." };
        }
        return get().loginWithOtp("Velora Customer", phoneOrEmail);
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
        const updated = [newAddr, ...current.addresses];
        set({ user: { ...current, addresses: updated } });
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
    }),
    {
      name: "velora_user_auth_v2",
    }
  )
);
