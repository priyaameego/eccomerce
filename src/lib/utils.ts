import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Currency = "INR" | "USD" | "EUR" | "GBP";

export const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number; name: string }> = {
  INR: { symbol: "₹", rate: 1, name: "Indian Rupee" },
  USD: { symbol: "$", rate: 0.012, name: "US Dollar" },
  EUR: { symbol: "€", rate: 0.011, name: "Euro" },
  GBP: { symbol: "£", rate: 0.0095, name: "British Pound" },
};

export function formatPrice(amountInINR: number, currency: Currency = "INR"): string {
  if (currency === "INR") {
    return `₹${Math.round(amountInINR).toLocaleString("en-IN")}`;
  }
  const info = CURRENCY_RATES[currency] || CURRENCY_RATES.INR;
  const converted = amountInINR * info.rate;
  return `${info.symbol}${converted.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
