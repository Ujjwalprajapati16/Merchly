import ProductsHero from "./components/ProductsHero";
import ProductGrid from "./components/ProductGrid";


import productsData from "@/_db/product.json";

export default function Products() {
  return (
    <div className="py-6 px-6">
      <ProductsHero />
      <ProductGrid products={productsData} />
    </div>
  );
}
