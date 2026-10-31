import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProductDocument extends Document {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  freeDelivery: boolean;
  images: string[];
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  description: string;
  specs?: Record<string, string>;
  features?: string[];
  supplier?: {
    name: string;
    rating: number;
    followers: number;
    productsCount: number;
    isTrusted: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProductDocument> = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: "" },
    category: { type: String, required: true, index: true },
    subcategory: { type: String, required: true, index: true },
    brand: { type: String, default: "Velora Wholesale Direct" },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    discountBadge: { type: String },
    badge: { type: String, default: "New Arrival" },
    rating: { type: Number, default: 4.8 },
    reviewsCount: { type: Number, default: 1 },
    inStock: { type: Boolean, default: true },
    stockCount: { type: Number, default: 100 },
    freeDelivery: { type: Boolean, default: true },
    images: { type: [String], default: [] },
    colors: [
      {
        name: { type: String },
        hex: { type: String },
      },
    ],
    sizes: { type: [String], default: ["Free Size"] },
    description: { type: String, default: "" },
    specs: { type: Map, of: String },
    features: { type: [String], default: [] },
    supplier: {
      name: { type: String, default: "Verified Mill Supplier" },
      rating: { type: Number, default: 4.8 },
      followers: { type: Number, default: 10000 },
      productsCount: { type: Number, default: 25 },
      isTrusted: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
  }
);

// Prevent mongoose model overwrite error during Next.js Hot Module Replacement
export const ProductModel: Model<IProductDocument> =
  mongoose.models.Product || mongoose.model<IProductDocument>("Product", ProductSchema);

