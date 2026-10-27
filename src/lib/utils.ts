import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Currency = "USD" | "EUR" | "GBP" | "JPY" | "INR";

export const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number; name: string }> = {
  USD: { symbol: "$", rate: 1, name: "US Dollar" },
  EUR: { symbol: "€", rate: 0.92, name: "Euro" },
  GBP: { symbol: "£", rate: 0.79, name: "British Pound" },
  JPY: { symbol: "¥", rate: 155.4, name: "Japanese Yen" },
  INR: { symbol: "₹", rate: 86.5, name: "Indian Rupee" },
};

export function formatPrice(amountInUSD: number, currency: Currency = "USD"): string {
  const info = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const converted = amountInUSD * info.rate;

  if (currency === "JPY") {
    return `${info.symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${info.symbol}${converted.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
