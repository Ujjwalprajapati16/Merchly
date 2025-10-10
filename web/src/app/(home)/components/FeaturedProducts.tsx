"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image.js";
import products from "@/_db/product.json"; 

const FeaturedProducts = () => {
  // Sort products by ID descending (latest first) and take top 4
  const latestProducts = [...products]
    .sort((a, b) => b.id - a.id)
    .slice(0, 4);

  return (
    <section className="w-full py-16 px-6 bg-background">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-3">Featured Products</h2>
        <p className="text-muted-foreground mb-10">
          Check out our latest merchandise handpicked just for you.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {latestProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="group relative overflow-hidden border border-border/40 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-center w-full h-56 bg-muted/10 rounded-t-2xl mb-4 overflow-hidden">
                  <Image
                    src={Array.isArray(product.image) ? product.image[0] : product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="object-contain w-full h-full rounded-2xl border"
                  />
                  {product.badge && (
                    <span className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded-full dark:bg-primary/80 dark:text-primary-foreground">
                      {product.badge}
                    </span>
                  )}
                </div>

                <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.price}</p>
                  <Button variant="outline" className="flex items-center gap-2 text-sm mt-2">
                    <FaShoppingCart className="w-4 h-4" /> Add to cart
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
