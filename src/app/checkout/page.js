"use client";

import { useState } from "react";
import { placeOrder } from "../actions";
import OrderStatus from "./OrderStatus";

export default function CheckoutPage() {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    // Save the form reference before the asynchronous operation.
    const form = event.currentTarget;

    setError("");
    setErrors({});
    setLoading(true);

    try {
      const formData = new FormData(form);

      const savedCart = localStorage.getItem("addisEatsCart");
      const items = JSON.parse(savedCart || "[]");

      if (!items.length) {
        setError("Your cart is empty. Please add dishes before checkout.");
        return;
      }

      formData.set("items", JSON.stringify(items));

      const result = await placeOrder(formData);

      if (!result.success) {
        setError(result.message || "");
        setErrors(result.errors || {});
        return;
      }

      setOrder(result.order);

      localStorage.setItem("addisEatsOrder", JSON.stringify(result.order));

      localStorage.removeItem("addisEatsCart");

      // Reset using the saved form reference.
      form.reset();
    } catch (err) {
      console.error("Checkout failed:", err);
      setError("Unable to place your order. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">Checkout</h1>

      {order ? (
        <>
          <h2 className="text-xl font-semibold text-green-700">
            Order placed successfully!
          </h2>

          <p>Your order ID: {order.orderId}</p>

          <OrderStatus initialOrder={order} />
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block">
              Name
            </label>

            <input
              id="name"
              name="name"
              required
              minLength={2}
              className="w-full rounded border p-3"
            />

            {errors.name && <p className="text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="mb-1 block">
              Phone
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="09XXXXXXXX"
              className="w-full rounded border p-3"
            />

            {errors.phone && <p className="text-red-600">{errors.phone}</p>}
          </div>

          {error && (
            <p role="alert" className="text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-black p-3 text-white disabled:opacity-50"
          >
            {loading ? "Placing order..." : "Place Order"}
          </button>
        </form>
      )}
    </section>
  );
}
