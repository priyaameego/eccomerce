import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, total, shippingAddress, paymentMethod } = body;

    const orderNumber = `VEL-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingCode = `DELHIVERY-EXPRESS-${Math.floor(100000 + Math.random() * 900000)}`;

    return NextResponse.json({
      success: true,
      message: "Order placed successfully on Velora!",
      order: {
        orderNumber,
        trackingCode,
        total,
        status: "Processing",
        estimatedDelivery: "3-4 Business Days via Express Courier",
        client: shippingAddress?.fullName || "Valued Customer",
        paymentMethod: paymentMethod || "Cash on Delivery",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Order creation failed." },
      { status: 500 }
    );
  }
}
