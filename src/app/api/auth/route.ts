import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { phone, email } = await request.json();

    const mockJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
      JSON.stringify({
        phone: phone || "9876543210",
        role: "customer",
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      })
    )}.meesho_auth_token_verified`;

    return NextResponse.json({
      success: true,
      token: mockJwt,
      user: {
        id: "usr_msho_99182",
        name: "Priya Sharma",
        phone: phone || "+91 98765 43210",
        email: email || "priya.sharma@gmail.com",
        role: "customer",
        walletBalance: 250,
        coins: 140,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Authentication service error." },
      { status: 500 }
    );
  }
}
