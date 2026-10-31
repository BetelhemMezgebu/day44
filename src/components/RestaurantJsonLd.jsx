
export default function RestaurantJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Addis Eats",
    description:
      "Discover Ethiopian dishes and order delicious food with Addis Eats.",
    servesCuisine: ["Ethiopian"],
    priceRange: "$$",
    url: "https://addis-eats.vercel.app",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
