import { NextResponse } from "next/server";
import { PRODUCTS } from "@/data/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const query = searchParams.get("search");

  let filtered = [...PRODUCTS];

  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    success: true,
    count: filtered.length,
    data: filtered,
  });
}
