"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FaTshirt, FaHatCowboy, FaMugHot, FaClipboard, FaShoppingBag } from "react-icons/fa";

const categories = [
  {
    id: 1,
    name: "T-Shirts",
    icon: <FaTshirt className="w-6 h-6 text-primary" />,
    description: "Soft, comfortable, and stylish tees for every occasion.",
  },
  {
    id: 2,
    name: "Hoodies",
    icon: <FaTshirt className="w-6 h-6 text-primary" />,
    description: "Cozy hoodies to keep you warm and trendy all year.",
  },
  {
    id: 3,
    name: "Caps",
    icon: <FaHatCowboy className="w-6 h-6 text-primary" />,
    description: "Classic caps to complete your casual look.",
  },
  {
    id: 4,
    name: "Mugs",
    icon: <FaMugHot className="w-6 h-6 text-primary" />,
    description: "Personalized mugs perfect for coffee lovers.",
  },
  {
    id: 5,
    name: "Posters",
    icon: <FaClipboard className="w-6 h-6 text-primary" />,
    description: "High-quality posters to decorate your space.",
  },
  {
    id: 6,
    name: "Bags",
    icon: <FaShoppingBag className="w-6 h-6 text-primary" />,
    description: "Durable and stylish bags for everyday use.",
  },
];

const ProductCategories = () => {
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
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="group relative overflow-hidden border border-border/40 hover:border-primary/50 transition-all duration-300 rounded-2xl hover:shadow-lg hover:shadow-primary/10">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-medium">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
