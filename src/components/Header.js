"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  async function handleSignOut() {
    try {
      const response = await fetch("/api/signout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/signin");
        router.refresh();
      }
    } catch (error) {
      console.error("Sign-out failed:", error);
    }
  }

  return (
    <header>
      <h1>Addis Eats</h1>

      <nav>
        <Link href="/">Home</Link> <Link href="/menu">Menu</Link>{" "}
        <Link href="/cart">Cart</Link> <Link href="/checkout">Checkout</Link>{" "}
        <button onClick={handleSignOut}>Sign Out</button>
      </nav>
    </header>
  );
}
