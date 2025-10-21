"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import CategoriesHero from "../components/CategoriesHero";
import { useProductsByCategory } from "@/hooks/useProducts";
import { ProductSkeleton } from "@/components/ProductSkeleton";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/productTypes.js";

interface CategoryDetailsProps {
  params: { slug: string };
}

export default function CategoryDetails({ params }: CategoryDetailsProps) {
  const { slug } = params;

  const categoryName = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data: products, isLoading, isError, refetch } = useProductsByCategory(slug, page);

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Hero section */}
      <CategoriesHero
        title={categoryName}
        subtitle={`Explore all ${categoryName} products`}
      />

      {/* Loading state */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="mt-8 flex flex-col items-center gap-3 text-center text-muted-foreground">
          <p className="text-sm">Failed to load products.</p>
          <Button onClick={() => refetch?.()}>Retry</Button>
        </div>
      )}

      {/* Products grid */}
      {!isLoading && !isError && products && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          {products.map((product : Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && products && products.length === 0 && (
        <p className="mt-8 text-center text-muted-foreground">No products found in this category.</p>
      )}

      {/* Pagination */}
      {!isLoading && !isError && products && products.length > 0 && (
        <div className="flex justify-center mt-8 gap-3">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <span className="flex items-center px-2 py-1 rounded-lg bg-muted/10 text-sm">
            Page {page}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={products.length < limit} // last page
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
