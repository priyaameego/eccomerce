import { NextResponse } from "next/server";
import { PRODUCTS, Product } from "@/data/products";

// Temporary in-memory store for newly added products via API during server runtime
let dynamicProducts: Product[] = [];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  const query = searchParams.get("search");

  let allProducts = [...dynamicProducts, ...PRODUCTS];

  if (category && category !== "all") {
    allProducts = allProducts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (subcategory) {
    const sub = subcategory.toLowerCase();
    allProducts = allProducts.filter(
      (p) =>
        p.subcategory.toLowerCase().includes(sub) ||
        p.title.toLowerCase().includes(sub)
    );
  }

  if (query) {
    const q = query.toLowerCase();
    allProducts = allProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    success: true,
    count: allProducts.length,
    data: allProducts,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      category,
      subcategory,
      price,
      originalPrice,
      brand,
      images,
      description,
      colors,
      sizes,
    } = body;

    // Validation
    if (!title || !price || !category) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: 'title', 'price', and 'category' are required.",
        },
        { status: 400 }
      );
    }

    const calculatedOriginalPrice = originalPrice || Math.round(Number(price) * 3.2);
    const discountPercent = Math.round(
      ((calculatedOriginalPrice - Number(price)) / calculatedOriginalPrice) * 100
    );

    const newProduct: Product = {
      id: `prod-api-${Date.now()}`,
      slug: (title as string)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") + `-${Date.now().toString().slice(-4)}`,
      title,
      subtitle: body.subtitle || `${subcategory || category} direct from wholesale manufacturing mill`,
      category: category as any,
      subcategory: subcategory || "New Arrivals",
      brand: brand || "Velora Wholesale Direct",
      price: Number(price),
      originalPrice: calculatedOriginalPrice,
      discountBadge: `${discountPercent}% off`,
      badge: body.badge || "New Arrival",
      rating: 4.8,
      reviewsCount: 1,
      inStock: true,
      stockCount: body.stockCount || 100,
      freeDelivery: true,
      images: images && images.length > 0
        ? images
        : [
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
          ],
      turntableImages: [],
      colors: colors || [{ name: "Standard", hex: "#681a72" }],
      sizes: sizes || ["Free Size"],
      description:
        description ||
        "Premium quality wholesale product listed via Velora Supplier API with 0% commission.",
      craftsmanship: "Standard industrial powerloom weaving & quality checked.",
      specs: body.specs || {
        "Category": category,
        "Subcategory": subcategory || "General",
        "Country of Origin": "India",
      },
      features: body.features || [
        "100% Factory Direct Wholesale Price",
        "Colorfast Fabric & Quality Inspected",
        "Eligible for Free Delivery & 7-Day Returns",
      ],
      supplier: {
        name: brand || "Verified Wholesale Supplier",
        rating: 4.5,
        followers: 12000,
        productsCount: 40,
        isTrusted: true,
      },
      reviews: [],
    };

    // Store in runtime array
    dynamicProducts.unshift(newProduct);

    return NextResponse.json(
      {
        success: true,
        message: "Product successfully created and added to Velora catalog!",
        product: newProduct,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process product addition",
      },
      { status: 500 }
    );
  }
}