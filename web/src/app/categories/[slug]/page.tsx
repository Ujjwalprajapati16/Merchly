import { notFound } from "next/navigation";
import products from "@/_db/product.json";
import ProductCard from "@/components/ProductCard";
import CategoriesHero from "../components/CategoriesHero";


export default async function CategoryDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const categoryName = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const categoryProducts = products.filter(
    (p) => p.category.toLowerCase().replace(/\s+/g, "-") === slug
  );

  if (categoryProducts.length === 0) return notFound();

  return (
    <div className="container mx-auto px-6 py-10">
      <CategoriesHero title={categoryName} subtitle={`Explore all ${categoryName} products`} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
