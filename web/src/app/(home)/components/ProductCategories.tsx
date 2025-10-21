"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { JSX } from "react";
import { useProductCategories } from "@/hooks/useProducts";
import {
  FaTshirt,
  FaHatCowboy,
  FaMugHot,
  FaClipboard,
  FaShoppingBag,
} from "react-icons/fa";
import { AlertCircle } from "lucide-react";
import { categories } from "@/types/productTypes.js";

const categoryIcons: Record<string, JSX.Element> = {
  "t-shirts": <FaTshirt className="w-6 h-6 text-primary" />,
  hoodies: <FaTshirt className="w-6 h-6 text-primary" />,
  caps: <FaHatCowboy className="w-6 h-6 text-primary" />,
  mugs: <FaMugHot className="w-6 h-6 text-primary" />,
  posters: <FaClipboard className="w-6 h-6 text-primary" />,
  bags: <FaShoppingBag className="w-6 h-6 text-primary" />,
};

const ProductCategories = () => {
  const { data, isLoading, isError } = useProductCategories();
  console.log(data);

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
      <section className="py-16 flex flex-col items-center text-muted-foreground">
        <AlertCircle className="w-5 h-5 mb-2 opacity-70" />
        <p className="text-sm">Unable to load categories</p>
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
          {categories.map((cat: string | categories, i: number) => {
            const categoryName =
              typeof cat === "string" ? cat : cat?.category ?? "category";
            const slug = categoryName.toLowerCase().replace(/\s+/g, "-");
            const icon =
              categoryIcons[slug] ||
              <FaClipboard className="w-6 h-6 text-primary" />;

            return (
              <motion.div
                key={slug + "-" + i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <Link href={`/categories/${slug}`}>
                  <Card className="group relative overflow-hidden border border-border/40 hover:border-primary/50 transition-all duration-300 rounded-2xl hover:shadow-lg hover:shadow-primary/10 cursor-pointer">
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                        {icon}
                      </div>
                      <h3 className="text-lg font-medium capitalize">
                        {categoryName}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Explore our exclusive {categoryName.toLowerCase()} collection.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
