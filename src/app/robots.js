const siteUrl = "https://day44-alpha.vercel.app";

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
