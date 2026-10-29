import { NextResponse } from "next/server";
import { getSession } from "../../../../lib/session";

export async function GET(request, { params }) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized. Please sign in." },
      { status: 401 }
    );
  }

  const { id } = await params;

  // Demo ownership rule: regular users may view only DEMO-1001.
  // Staff can view the demo order as well.
  if (
    session.role !== "staff" &&
    id !== "DEMO-1001"
  ) {
    return NextResponse.json(
      { message: "You are not allowed to access this order." },
      { status: 403 }
    );
  }

  return NextResponse.json({
    orderId: id,
    status: "Preparing",
    updatedAt: new Date().toISOString(),
    userId: "demo-user-1",
  });
}
