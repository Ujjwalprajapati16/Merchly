"use client";

import { Skeleton } from "@/components/ui/skeleton";
import CategoryCard from "./components/CategoryCard";
import { useProductCategories } from "@/hooks/useProducts";
import {
  FaTshirt,
  FaHatCowboy,
  FaMugHot,
  FaClipboard,
  FaShoppingBag,
} from "react-icons/fa";
import { IconType } from "react-icons";
import { categories } from "@/types/productTypes.js";

const categoryIcons: Record<string, IconType> = {
  "t-shirts": FaTshirt,
  hoodies: FaTshirt,
  caps: FaHatCowboy,
  mugs: FaMugHot,
  posters: FaClipboard,
  bags: FaShoppingBag,
};

export default function ProductCategories() {
  const { data, isLoading, isError, refetch } = useProductCategories();

  if (isLoading) {
    return (
      <section className="py-16 px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-[200px] rounded-xl" />
        ))}
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 flex flex-col items-center gap-3 text-center text-muted-foreground">
        <p className="text-sm">Failed to load categories.</p>
        <button
          onClick={() => refetch?.()}
          className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm hover:bg-primary/20 transition"
        >
          Retry
        </button>
      </section>
    );
  }

  const categories = data ?? [];

  return (
    <section className="w-full py-16 px-6 bg-background">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-3">Product Categories</h2>
        <p className="text-muted-foreground mb-10">
          Browse our collection of exclusive merchandise.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat: categories | string) => {
            const categoryName =
              typeof cat === "string" ? cat : cat?.category ?? "category";
            const slug = categoryName.toLowerCase().replace(/\s+/g, "-");
            const Icon = categoryIcons[slug] || FaClipboard;

            return (
              <CategoryCard
                key={slug}
                name={categoryName}
                slug={slug}
                count={typeof cat === "string" ? 0 : cat.count}
                Icon={Icon}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
