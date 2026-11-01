
import QueryProvider from "./QueryProvider";
import Header from "../components/Header";

export const metadata = {
  metadataBase: new URL("https://day44-alpha.vercel.app"),

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
    url: "https://day44-alpha.vercel.app",
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
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Header />

          <main>{children}</main>

          <footer>
            <p>© 2026 Addis Eats</p>
          </footer>
        </QueryProvider>
      </body>
    </html>
  );
}
