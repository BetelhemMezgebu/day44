"use server";

import { getSession } from "../lib/session";
import { createOrder } from "../lib/orders";

export async function placeOrder(formData) {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message: "Please sign in before placing an order.",
    };
  }

  const name = formData.get("name")?.trim();
  const phone = formData.get("phone")?.trim();

  const errors = {};

  if (!name || name.length < 2 || name.length > 60) {
    errors.name = "Name must contain between 2 and 60 characters.";
  }

  if (!phone || !/^09\d{8}$/.test(phone)) {
    errors.phone = "Enter a valid Ethiopian phone number.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  let items = [];

  try {
    items = JSON.parse(formData.get("items") || "[]");
  } catch {
    return {
      success: false,
      message: "Invalid order items.",
    };
  }

  if (!Array.isArray(items) || items.length === 0) {
    return {
      success: false,
      message: "Your cart is empty.",
    };
  }

  const validItems = items.every(
    (item) =>
      item &&
      typeof item.name === "string" &&
      item.name.trim().length > 0 &&
      Number.isFinite(item.price) &&
      item.price > 0 &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0 &&
      item.quantity <= 50,
  );

  if (!validItems) {
    return {
      success: false,
      message: "Invalid cart information.",
    };
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (!Number.isSafeInteger(total) || total <= 0) {
    return {
      success: false,
      message: "Invalid order total.",
    };
  }

  const order = createOrder({
    userId: session.userId,
    name,
    phone,
    items,
    total,
  });

  return {
    success: true,
    order,
  };
}
