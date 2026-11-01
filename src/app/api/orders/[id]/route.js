import { NextResponse } from "next/server";
import { getSession } from "../../../../lib/session";
import { getOrderById, updateOrderStatus } from "../../../../lib/orders";

export const dynamic = "force-dynamic";

const allowedStatuses = ["Preparing", "Ready", "Delivered"];

// GET: Retrieve an individual order.
export async function GET(request, { params }) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized. Please sign in." },
        { status: 401 },
      );
    }

    const { id } = await params;
    const order = getOrderById(id);

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
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("Failed to fetch order:", error);

    return NextResponse.json(
      { message: "Failed to fetch order." },
      { status: 500 },
    );
  }
}

// PATCH: Update an order's status (staff only).
export async function PATCH(request, { params }) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized. Please sign in." },
        { status: 401 },
      );
    }

    if (session.role !== "staff") {
      return NextResponse.json(
        { message: "Only kitchen staff can update order status." },
        { status: 403 },
      );
    }

    const { id } = await params;
    const existingOrder = getOrderById(id);

    if (!existingOrder) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 },
      );
    }

    const body = await request.json();
    const { status } = body;

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          message: "Invalid status. Use Preparing, Ready, or Delivered.",
        },
        { status: 400 },
      );
    }

    const updatedOrder = updateOrderStatus(id, status);

    return NextResponse.json(
      {
        message: "Order status updated successfully.",
        order: updatedOrder,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("Failed to update order status:", error);

    return NextResponse.json(
      { message: "Failed to update order status." },
      { status: 500 },
    );
  }
}
