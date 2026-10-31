
import Link from "next/link";
import QueryProvider from "./QueryProvider";

export const metadata = {
  metadataBase: new URL("https://addis-eats.vercel.app"),

  title: {
    default: "Addis Eats | Ethiopian Food Ordering",
    template: "%s | Addis Eats",
  },

  description:
    "Discover Ethiopian dishes and order delicious food with Addis Eats.",

  openGraph: {
    title: "Addis Eats | Ethiopian Food Ordering",
    description:
      "Discover Ethiopian dishes and order delicious food with Addis Eats.",
    url: "https://addis-eats.vercel.app",
    siteName: "Addis Eats",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Addis Eats - Discover the Taste of Ethiopia",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Addis Eats | Ethiopian Food Ordering",
    description:
      "Discover Ethiopian dishes and order delicious food with Addis Eats.",
    images: ["/og-image.png"],
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <header>
            <h1>Addis Eats</h1>
            <nav aria-label="Main navigation">
              <Link href="/">Home</Link>{" "}
              <Link href="/menu">Menu</Link>{" "}
              <Link href="/cart">Cart</Link>{" "}
              <Link href="/checkout">Checkout</Link>
            </nav>
          </header>

          <main>{children}</main>

          <footer>
            <p>© 2026 Addis Eats</p>
          </footer>
        </QueryProvider>
      </body>
    </html>
  );
}
