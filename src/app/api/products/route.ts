import { NextResponse } from "next/server";
import { PRODUCTS, Product } from "@/data/products";
import { connectToDatabase } from "@/lib/mongodb";
import { ProductModel } from "@/models/Product";

// In-memory store fallback when MongoDB is not connected
let dynamicProducts: Product[] = [];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  const query = searchParams.get("search");

  try {
    await connectToDatabase();

    // Auto-seed initial 48 products if MongoDB collection is empty
    const dbCount = await ProductModel.countDocuments();
    if (dbCount === 0) {
      await ProductModel.insertMany(PRODUCTS);
    }

    // Build MongoDB query
    const filter: any = {};
    if (category && category !== "all") {
      filter.category = { $regex: new RegExp(`^${category}$`, "i") };
    }
    if (subcategory) {
      filter.$or = [
        { subcategory: { $regex: new RegExp(subcategory, "i") } },
        { title: { $regex: new RegExp(subcategory, "i") } },
      ];
    }
    if (query) {
      const qRegex = new RegExp(query, "i");
      filter.$or = [
        { title: { $regex: qRegex } },
        { subtitle: { $regex: qRegex } },
        { brand: { $regex: qRegex } },
        { category: { $regex: qRegex } },
        { subcategory: { $regex: qRegex } },
      ];
    }

    const dbProducts = await ProductModel.find(filter).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      source: "mongodb",
      count: dbProducts.length,
      data: dbProducts,
    });
  } catch (err: any) {
    // Graceful fallback to static + dynamic products if local MongoDB is not yet running
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
      source: "memory_fallback",
      count: allProducts.length,
      data: allProducts,
    });
  }
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
      slug:
        (title as string)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") + `-${Date.now().toString().slice(-4)}`,
      title,
      subtitle:
        body.subtitle || `${subcategory || category} direct from wholesale manufacturing mill`,
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
      images:
        images && images.length > 0
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
        Category: category,
        Subcategory: subcategory || "General",
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

    // Save to MongoDB if connected
    let savedInDB = false;
    try {
      await connectToDatabase();
      await ProductModel.create(newProduct);
      savedInDB = true;
    } catch (dbErr: any) {
      console.warn("MongoDB save skipped/failed, keeping in-memory fallback:", dbErr.message);
    }

    // Also store in runtime array
    dynamicProducts.unshift(newProduct);

    return NextResponse.json(
      {
        success: true,
        savedInDB,
        message: savedInDB
          ? "Product saved permanently in MongoDB and live in Velora store!"
          : "Product added to Velora catalog! Connect local MongoDB to persist permanently across server restarts.",
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

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing product id parameter." },
        { status: 400 }
      );
    }

    try {
      await connectToDatabase();
      await ProductModel.deleteOne({ id });
    } catch (dbErr: any) {
      console.warn("MongoDB delete skipped:", dbErr.message);
    }

    dynamicProducts = dynamicProducts.filter((p) => p.id !== id);

    return NextResponse.json({
      success: true,
      message: `Product ${id} removed successfully from catalog.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete product." },
      { status: 500 }
    );
  }
}
