const orders = globalThis.addisEatsOrders || [];
globalThis.addisEatsOrders = orders;

export function createOrder({ userId, name, phone, items, total }) {
  const order = {
    orderId: `AE-${Date.now()}`,
    userId,
    name,
    phone,
    items,
    total,
    status: "Preparing",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  orders.push(order);
  return order;
}

export function getOrdersByUser(userId) {
  return orders.filter((order) => order.userId === userId);
}

// Retrieve every customer's order for kitchen staff.
export function getAllOrders() {
  return orders;
}

export function getOrderById(orderId) {
  return orders.find((order) => order.orderId === orderId) || null;
}
export function updateOrderStatus(orderId, status) {
  const order = getOrderById(orderId);

  if (!order) {
    return null;
  }

  order.status = status;
  order.updatedAt = new Date().toISOString();

  return order;
}
