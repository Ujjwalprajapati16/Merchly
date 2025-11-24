"use client";

import { useState } from "react";
import ProductsHero from "./components/ProductsHero";
import ProductGrid from "./components/ProductGrid";
import { ProductSkeleton } from "@/components/ProductSkeleton";

// shadcn pagination
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { useHomePageProducts } from "@/hooks/useProducts";

export default function Products() {
  const [page, setPage] = useState(1);
  const limit = 12;

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useHomePageProducts(page, limit);

  const products = data?.products ?? [];
  const totalPages = data?.totalPages ?? 1;

  if (isLoading) {
    return (
      <div className="py-6 px-6">
        <ProductsHero />

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
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

      <ProductGrid products={products} />

      {/* Pagination */}
      <div className="flex justify-center mt-10">
        <Pagination>
          <PaginationContent>

            {/* Previous */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() =>
                  setPage((prev) => Math.max(prev - 1, 1))
                }
                aria-disabled={page === 1}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {/* Page numbers */}
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  onClick={() => setPage(i + 1)}
                  isActive={page === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* Next */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                aria-disabled={page === totalPages}
                className={
                  page === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}