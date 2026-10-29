import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    let session;
    let userEmail;

    if (
      email === "user@example.com" &&
      password === "password123"
    ) {
      session = "demo-user-1";
      userEmail = email;
    } else if (
      email === "staff@example.com" &&
      password === "staff123"
    ) {
      session = "demo-staff-1";
      userEmail = email;
    } else {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Sign-in successful.",
      email: userEmail,
    });

    response.cookies.set("session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Unable to process sign-in request." },
      { status: 400 }
    );
  }
}