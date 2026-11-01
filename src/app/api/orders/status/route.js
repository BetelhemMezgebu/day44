import { NextResponse } from "next/server";
import { getSession } from "../../../../lib/session";
import { getOrderById } from "../../../../lib/orders";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized. Please sign in." },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json(
        { message: "Order ID is required." },
        { status: 400 },
      );
    }

    const order = getOrderById(orderId);

    if (!order) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 },
      );
    }

    if (session.role !== "staff" && order.userId !== session.userId) {
      return NextResponse.json(
        { message: "You are not allowed to access this order." },
        { status: 403 },
      );
    }

    return NextResponse.json(
      { order },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Failed to fetch order status:", error);

    return NextResponse.json(
      { message: "Failed to fetch order status." },
      { status: 500 },
    );
  }
}
