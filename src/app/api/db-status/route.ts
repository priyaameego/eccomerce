import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ProductModel } from "@/models/Product";
import { PRODUCTS } from "@/data/products";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    const count = await ProductModel.countDocuments();

    return NextResponse.json({
      success: true,
      connected: true,
      message: "MongoDB is connected and healthy!",
      database: conn.connection.name,
      host: conn.connection.host,
      productsInDatabase: count,
      uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/velora_ecommerce",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        connected: false,
        error: error.message || "Failed to connect to local MongoDB",
        hint: "Make sure MongoDB service is running locally on mongodb://127.0.0.1:27017",
        uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/velora_ecommerce",
      },
      { status: 200 } // Return 200 with connected:false so UI can display status gracefully
    );
  }
}

// POST endpoint to seed all 48 catalog products into MongoDB
export async function POST() {
  try {
    await connectToDatabase();
    let seededCount = 0;

    for (const prod of PRODUCTS) {
      await ProductModel.findOneAndUpdate(
        { id: prod.id },
        { ...prod },
        { upsert: true, new: true }
      );
      seededCount++;
    }

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${seededCount} products into local MongoDB!`,
      totalInDatabase: await ProductModel.countDocuments(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to seed database",
      },
      { status: 500 }
    );
  }
}

