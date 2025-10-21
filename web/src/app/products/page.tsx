"use client";

import { useState } from "react";
import ProductsHero from "./components/ProductsHero";
import ProductGrid from "./components/ProductGrid";
import { useProducts } from "@/hooks/useProducts";
import { ProductSkeleton } from "@/components/ProductSkeleton";
import { Button } from "@/components/ui/button";

export default function Products() {
  const [page, setPage] = useState(1);
  const limit = 12; 

  const { data: products, isLoading, isError, refetch } = useProducts(page, limit);

  if (isLoading) {
    return (
      <div className="py-6 px-6">
        <ProductsHero />

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }


  if (isError) {
    return (
      <div className="py-16 flex flex-col items-center gap-3 text-center text-muted-foreground">
        <p className="text-sm">Failed to load products.</p>
        <button
          type="button"
          onClick={() => refetch?.()}
          className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm hover:bg-primary/20 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="py-6 px-6">
      <ProductsHero />
      <ProductGrid products={products ?? []} />

      {/* Pagination */}
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
          disabled={(products?.length ?? 0) < limit}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
