"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import products from "@/_db/product.json";
import {
  FaTshirt,
  FaHatCowboy,
  FaMugHot,
  FaClipboard,
  FaShoppingBag,
} from "react-icons/fa";
import Link from "next/link";
import { JSX } from "react";

// Map category names to icons
const categoryIcons: Record<string, JSX.Element> = {
  "T-Shirts": <FaTshirt className="w-6 h-6 text-primary" />,
  "Hoodies": <FaTshirt className="w-6 h-6 text-primary" />,
  "Caps": <FaHatCowboy className="w-6 h-6 text-primary" />,
  "Mugs": <FaMugHot className="w-6 h-6 text-primary" />,
  "Posters": <FaClipboard className="w-6 h-6 text-primary" />,
  "Bags": <FaShoppingBag className="w-6 h-6 text-primary" />,
};

const ProductCategories = () => {
  // Generate unique categories dynamically
  const categories = Array.from(new Set(products.map((p) => p.category))).map(
    (cat) => ({
      name: cat,
      slug: cat.toLowerCase().replace(/\s+/g, "-"),
      icon: categoryIcons[cat] || <FaClipboard className="w-6 h-6 text-primary" />,
      description: `Explore our exclusive ${cat.toLowerCase()} collection.`,
    })
  );

  return (
    <section className="w-full py-16 px-6 bg-background">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-3">Product Categories</h2>
        <p className="text-muted-foreground mb-10">
          Browse our collection of exclusive merchandise.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Link href={`/categories/${cat.slug}`}>
                <Card className="group relative overflow-hidden border border-border/40 hover:border-primary/50 transition-all duration-300 rounded-2xl hover:shadow-lg hover:shadow-primary/10 cursor-pointer">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                      {cat.icon}
                    </div>
                    <h3 className="text-lg font-medium">{cat.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cat.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
