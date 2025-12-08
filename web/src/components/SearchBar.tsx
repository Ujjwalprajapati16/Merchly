"use client";

import { useState, useRef, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchProducts } from "@/hooks/useProducts";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "./ui/button";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const debouncedSearch = useDebounce(query, 400);

  const { data, isLoading } = useSearchProducts(debouncedSearch);

  const productList = data?.products?.products || [];

  // Auto-hide results when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Open results when user types
  useEffect(() => {
    if (debouncedSearch.length > 0) setShowResults(true);
  }, [debouncedSearch]);

  // Clear input
  const clearSearch = () => {
    setQuery("");
    setShowResults(false);
  };

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <div className="relative">
        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-xl bg-muted/60 pr-10"
        />

        {/* Clear Button (X) */}
        {query.length > 0 && (
          <Button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground border-0 bg-transparent p-0 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <X size={18} />
          </Button>
        )}
      </div>

      {/* Results Box */}
      {showResults && debouncedSearch.length > 0 && (
        <Card className="absolute left-0 mt-2 w-full p-3 z-50 shadow-xl max-h-80 overflow-y-hidden">
          {/* Searching State */}
          {isLoading && (
            <div className="py-4 text-center text-sm text-muted-foreground">
              Searching
              <span className="animate-pulse">...</span>
            </div>
          )}

          {/* No Results */}
          {!isLoading && productList.length === 0 && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              <p className="font-medium">No matching products found</p>
              <p className="text-xs mt-1">Try different keywords 🔍</p>
            </div>
          )}

          {/* Product Results */}
          <div className="flex flex-col gap-2">
            {productList.map((product: any) => (
              <Link
                href={`/products/${product.slug}`}
                key={product._id}
                onClick={() => setShowResults(false)} // Hide dropdown
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition"
              >
                <Image
                  src={product.image || product.variant?.image}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />

                <div className="flex flex-col">
                  <span className="font-medium text-sm">{product.name}</span>

                  <span className="text-sm text-primary font-semibold">
                    ₹{product.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
