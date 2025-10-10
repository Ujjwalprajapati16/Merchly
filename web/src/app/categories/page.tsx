"use client";

import products from "@/_db/product.json";
import CategoryCard from "./components/CategoryCard";
import {
  FaTshirt,
  FaShoppingBag,
  FaCoffee,
  FaHatCowboy,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { IconType } from "react-icons";

export default function CategoriesPage() {
  const iconMap: Record<string, IconType> = {
    "t-shirts": FaTshirt,
    "hoodies": FaTshirt,
    "mugs": FaCoffee,
    "bags": FaShoppingBag,
    "caps": FaHatCowboy,
  };

  const categories = Array.from(new Set(products.map((p) => p.category))).map((category) => {
    const slug = category.toLowerCase().replace(/\s+/g, "-");
    const count = products.filter((p) => p.category === category).length;
    const Icon = iconMap[slug] || FaShoppingBag;

    return { name: category, slug, count, Icon };
  });

  return (
    <section className="container mx-auto px-6 py-16">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent py-1.5">
          Shop by Category
        </h1>
        <p className="text-muted-foreground text-lg">
          Discover our collections crafted for comfort, style, and performance.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {categories.map((cat) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CategoryCard {...cat} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
