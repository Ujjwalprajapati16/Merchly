"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import SortDropdown from "./SortDropdown";
import { HomePageProduct } from "@/types/productTypes";

interface ProductGridProps {
  products: HomePageProduct[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [sortOption, setSortOption] = useState<"newest" | "priceLow" | "priceHigh">("newest");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "priceLow") return a.price - b.price;
    if (sortOption === "priceHigh") return b.price - a.price;
    if (sortOption === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return 0;
  });

  return (
    <div>
      {/* Sort Dropdown */}
      <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
