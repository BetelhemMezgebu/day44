"use client";

import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message || "Failed to fetch order status.");
  }

  return response.json();
};

export default function OrderStatus({ initialOrder }) {
  const orderId = initialOrder?.orderId;

  const { data, error, isLoading } = useSWR(
    orderId
      ? `/api/orders/status?orderId=${encodeURIComponent(orderId)}`
      : null,
    fetcher,
    {
      fallbackData: { order: initialOrder },
      refreshInterval: 5000,
      revalidateOnFocus: true,
    },
  );

  const order = data?.order || initialOrder;

  if (isLoading) {
    return <p>Loading order status...</p>;
  }

  if (error) {
    return (
      <p role="alert" className="text-red-600">
        {error.message}
      </p>
    );
  }

  return (
    <section className="space-y-2 rounded-lg border p-4">
      <h2 className="text-xl font-bold">Order Status</h2>

      <p>
        <strong>Order ID:</strong> {order.orderId}
      </p>

      <p>
        <strong>Status:</strong> {order.status}
      </p>

      <p>
        <strong>Last Updated:</strong>{" "}
        {new Date(order.updatedAt).toLocaleString()}
      </p>
    </section>
  );
}
