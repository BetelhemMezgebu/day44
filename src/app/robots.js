
const siteUrl = "https://addis-eats.vercel.app";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/checkout", "/kitchen"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
