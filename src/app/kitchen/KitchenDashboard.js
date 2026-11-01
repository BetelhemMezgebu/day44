"use client";

import { useState } from "react";
import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch orders.");
  }

  return data;
};

export default function KitchenDashboard() {
  const { data, error, isLoading, mutate } = useSWR("/api/orders", fetcher, {
    refreshInterval: 5000,
  });

  const [updatingId, setUpdatingId] = useState(null);
  const [message, setMessage] = useState("");
  const [updateError, setUpdateError] = useState("");

  async function updateStatus(orderId, status) {
    setUpdatingId(orderId);
    setMessage("");
    setUpdateError("");

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to update order.");
      }

      setMessage(`Order ${orderId} updated to ${status}.`);

      await mutate();
    } catch (err) {
      setUpdateError(err.message);
    } finally {
      setUpdatingId(null);
    }
  }

  if (isLoading) {
    return <p className="p-8">Loading kitchen orders...</p>;
  }

  if (error) {
    return <p className="p-8 text-red-600">{error.message}</p>;
  }

  const orders = data?.orders || [];

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Kitchen Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage incoming customer orders.</p>
        <p className="mt-1 text-sm text-gray-500">
          Orders refresh automatically every 5 seconds.
        </p>
      </div>

      {message && (
        <p className="rounded bg-green-100 p-3 text-green-800">{message}</p>
      )}

      {updateError && (
        <p className="rounded bg-red-100 p-3 text-red-800">{updateError}</p>
      )}

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-gray-100 p-4">
          <p className="text-2xl font-bold">{orders.length}</p>
          <p className="text-sm">Total Orders</p>
        </div>

        <div className="rounded-lg bg-yellow-100 p-4">
          <p className="text-2xl font-bold">
            {orders.filter((order) => order.status === "Preparing").length}
          </p>
          <p className="text-sm">Preparing</p>
        </div>

        <div className="rounded-lg bg-green-100 p-4">
          <p className="text-2xl font-bold">
            {orders.filter((order) => order.status === "Ready").length}
          </p>
          <p className="text-sm">Ready</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <p className="rounded-lg border p-6 text-center">
          No customer orders yet.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <article
              key={order.orderId}
              className="space-y-4 rounded-xl border p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold">{order.orderId}</h2>
                  <p className="text-sm text-gray-600">
                    Customer: {order.name}
                  </p>
                  <p className="text-sm text-gray-600">Phone: {order.phone}</p>
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-2 text-sm font-semibold">
                  {order.status}
                </span>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Order Items</h3>

                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b py-2 text-sm"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>
                      {(item.price * item.quantity).toLocaleString()} ETB
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{order.total.toLocaleString()} ETB</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {order.status !== "Preparing" && (
                  <button
                    onClick={() => updateStatus(order.orderId, "Preparing")}
                    disabled={updatingId === order.orderId}
                    className="rounded bg-yellow-500 px-4 py-2 text-white disabled:opacity-50"
                  >
                    Set Preparing
                  </button>
                )}

                {order.status !== "Ready" && (
                  <button
                    onClick={() => updateStatus(order.orderId, "Ready")}
                    disabled={updatingId === order.orderId}
                    className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
                  >
                    Mark Ready
                  </button>
                )}

                {order.status !== "Delivered" && (
                  <button
                    onClick={() => updateStatus(order.orderId, "Delivered")}
                    disabled={updatingId === order.orderId}
                    className="rounded bg-green-600 px-4 py-2 text-white disabled:opacity-50"
                  >
                    Mark Delivered
                  </button>
                )}
              </div>

              {updatingId === order.orderId && (
                <p className="text-sm text-gray-500">Updating order...</p>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
