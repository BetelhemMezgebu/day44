import { NextResponse } from "next/server";
import { getSession } from "../../../lib/session";
import { getOrdersByUser, getAllOrders } from "../../../lib/orders";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized. Please sign in." },
        { status: 401 },
      );
    }

    // Staff can see all customer orders.
    // Customers can only see their own orders.
    const orders =
      session.role === "staff"
        ? getAllOrders()
        : getOrdersByUser(session.userId);

    return NextResponse.json(
      { orders },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("Failed to fetch orders:", error);

    return NextResponse.json(
      { message: "Failed to fetch orders." },
      { status: 500 },
    );
  }
}
