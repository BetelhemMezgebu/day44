"use client";

import { useEffect, useState } from "react";

const CART_KEY = "addisEatsCart";
const CART_EVENT = "addisEatsCartUpdated";

function isValidCartItem(item) {
  return (
    item &&
    (typeof item.id === "string" || typeof item.id === "number") &&
    String(item.id).length > 0 &&
    typeof item.name === "string" &&
    item.name.trim().length > 0 &&
    Number.isFinite(item.price) &&
    item.price > 0 &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0 &&
    item.quantity <= 50
  );
}

export default function CartClient() {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    function loadCart() {
      try {
        const savedCart = localStorage.getItem(CART_KEY);
        const parsedCart = JSON.parse(savedCart || "[]");

        if (!Array.isArray(parsedCart)) {
          setCart([]);
          return;
        }

        const seenIds = new Set();

        const validCart = parsedCart.filter((item) => {
          if (!isValidCartItem(item)) {
            return false;
          }

          const id = String(item.id);

          if (seenIds.has(id)) {
            return false;
          }

          seenIds.add(id);
          return true;
        });

        setCart(validCart);

        // Save the cleaned cart.
        localStorage.setItem(CART_KEY, JSON.stringify(validCart));
      } catch {
        setCart([]);
        localStorage.removeItem(CART_KEY);
      }
    }

    loadCart();
    setIsLoaded(true);

    window.addEventListener(CART_EVENT, loadCart);

    return () => {
      window.removeEventListener(CART_EVENT, loadCart);
    };
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isLoaded) {
    return <p>Loading cart...</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <article key={item.id} className="rounded border p-4">
            <h3 className="font-semibold">{item.name}</h3>

            <p>
              {item.quantity} × {item.price} ETB
            </p>

            <p>Subtotal: {item.price * item.quantity} ETB</p>
          </article>
        ))
      )}

      <h3 className="text-xl font-bold">Total: {total} ETB</h3>
    </div>
  );
}
