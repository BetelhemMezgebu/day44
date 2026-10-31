import Link from "next/link";
import RestaurantJsonLd from "../components/RestaurantJsonLd";

export const metadata = {
  title: "Addis Eats | Ethiopian Food Ordering",
  description:
    "Discover delicious Ethiopian food and order your favorite dishes with Addis Eats.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Addis Eats | Ethiopian Food Ordering",
    description:
      "Discover delicious Ethiopian food and order your favorite dishes.",
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <section>
      <RestaurantJsonLd />

      <h2>Welcome to Addis Eats</h2>

      <p>Discover delicious Ethiopian food and order your favorite dishes.</p>

      <Link href="/menu">View Menu</Link>
    </section>
  );
}
