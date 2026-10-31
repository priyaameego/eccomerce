import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderDocument extends Document {
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: {
    productId: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
    selectedColor?: string;
    selectedSize?: string;
  }[];
  totalAmount: number;
  paymentMethod: "COD" | "UPI" | "CARD";
  paymentStatus: "Pending" | "Paid" | "Failed";
  orderStatus: "Placed" | "Confirmed" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema<IOrderDocument> = new Schema(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerEmail: { type: String },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    items: [
      {
        productId: { type: String, required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },
        image: { type: String },
        selectedColor: { type: String },
        selectedSize: { type: String },
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, default: "COD" },
    paymentStatus: { type: String, default: "Pending" },
    orderStatus: { type: String, default: "Placed" },
  },
  {
    timestamps: true,
  }
);

export const OrderModel: Model<IOrderDocument> =
  mongoose.models.Order || mongoose.model<IOrderDocument>("Order", OrderSchema);

