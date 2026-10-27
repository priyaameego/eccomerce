import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password credentials required." },
        { status: 400 }
      );
    }

    // Simulated JWT token generation
    const mockJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
      JSON.stringify({
        email,
        role: "vip",
        tier: "Obsidian VIP",
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      })
    )}.aurelia_secret_hmac_sha256_signature_verified`;

    return NextResponse.json({
      success: true,
      token: mockJwt,
      user: {
        id: "usr_aur_99182",
        name: "Lord Julian Vance",
        email,
        role: "vip",
        tier: "Obsidian VIP",
        walletBalance: 2450.0,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Authentication service error." },
      { status: 500 }
    );
  }
}
