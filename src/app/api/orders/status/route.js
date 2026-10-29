import { NextResponse } from "next/server";
import { getSession } from "../../../../lib/session";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized. Please sign in." },
      { status: 401 }
    );
  }

  return NextResponse.json({
    orderId: "DEMO-1001",
    status: "Preparing",
    updatedAt: new Date().toISOString(),
    userId: session.userId,
  });
}
