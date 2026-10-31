
import SearchableMenu from "./SearchableMenu";

export const metadata = {
  title: "Explore Our Menu",
  description:
    "Explore Ethiopian favorites and delicious meals on Addis Eats. Browse dishes and find your next meal.",
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    title: "Explore Our Menu | Addis Eats",
    description:
      "Browse delicious dishes and discover your next meal with Addis Eats.",
    url: "/menu",
    type: "website",
  },
};

export default function MenuPage() {
  return <SearchableMenu />;
}
