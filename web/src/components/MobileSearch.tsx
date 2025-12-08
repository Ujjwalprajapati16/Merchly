"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchProducts } from "@/hooks/useProducts";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function MobileSearch({ open, onClose }: any) {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 400);
  const { data, isLoading } = useSearchProducts(debounced);
  const products = data?.products?.products || [];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-background p-4 overflow-y-auto">
      {/* Top Bar */}
      <div className="flex items-center gap-3">
        <Input
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-xl"
          autoFocus
        />

        <Button onClick={onClose}>
          <X size={24} />
        </Button>
      </div>

      {/* Results */}
      <div className="mt-4 space-y-3">
        {isLoading && (
          <p className="text-center text-muted-foreground">
            Searching<span className="animate-pulse">...</span>
          </p>
        )}

        {!isLoading && products.length === 0 && debounced.length > 0 && (
          <p className="text-center text-muted-foreground">
            No results found 🔍  
            <br />
            Try another keyword
          </p>
        )}

        {products.map((product: any) => (
          <Link
            key={product._id}
            href={`/products/${product.slug}`}
            onClick={onClose}
            className="flex items-center gap-3 p-2 rounded-lg border"
          >
            <Image
              src={product.image}
              width={55}
              height={55}
              alt={product.name}
              className="rounded-md object-cover"
            />
            <div>
              <p className="font-medium text-sm">{product.name}</p>
              <p className="font-semibold text-primary text-sm">
                ₹{product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
