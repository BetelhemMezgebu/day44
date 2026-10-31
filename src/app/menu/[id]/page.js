
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getDishById,
  getDishes,
} from "../../../lib/dishes";

export async function generateStaticParams() {
  const dishes = await getDishes();

  return dishes.map((dish) => ({
    id: String(dish.id),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDishById(id);

  if (!dish) {
    return {
      title: "Dish Not Found",
      description: "This dish could not be found on Addis Eats.",
    };
  }

  return {
    title: dish.name,
    description: dish.description,
    alternates: {
      canonical: `/menu/${dish.id}`,
    },
    openGraph: {
      title: `${dish.name} | Addis Eats`,
      description: dish.description,
      url: `/menu/${dish.id}`,
      type: "article",
    },
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDishById(id);

  if (!dish) {
    notFound();
  }

  return (
    <article>
      <h2>{dish.name}</h2>

      <p>{dish.description}</p>

      <p>
        <strong>{dish.price} ETB</strong>
      </p>

      <Link href="/menu">Back to Menu</Link>
    </article>
  );
}
