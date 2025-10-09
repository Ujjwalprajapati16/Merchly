import ProductsHero from "./components/ProductsHero";
import ProductGrid from "./components/ProductGrid";


import productsData from "./_db/product.json";

export default function Products() {
  return (
    <>
      <ProductsHero />
      <ProductGrid products={productsData} />
    </>
  );
}
