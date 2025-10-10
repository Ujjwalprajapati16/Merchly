"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import SortDropdown from "./SortDropdown";
import { Product } from "@/types/productTypes.js";

interface ProductGridProps {
    products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
    const [sortOption, setSortOption] = useState<"newest" | "priceLow" | "priceHigh">("newest");

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOption === "priceLow") return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
        if (sortOption === "priceHigh") return parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1));
        return 0; // newest or default order
    });

    return (
        <div>
            {/* Sort Dropdown */}
            <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />


            {/* Products Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
