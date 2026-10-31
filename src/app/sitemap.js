
import { getDishes } from "../lib/dishes";

const siteUrl = "https://addis-eats.vercel.app";

export default async function sitemap() {
  const dishes = await getDishes();

  const dishPages = dishes.map((dish) => ({
    url: `${siteUrl}/menu/${dish.id}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/menu`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...dishPages,
  ];
}
