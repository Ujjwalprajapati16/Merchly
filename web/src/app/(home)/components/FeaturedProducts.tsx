"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaTshirt, FaHatCowboy, FaMugHot } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

const featuredProducts = [
  {
    id: 1,
    name: "Classic Graphic Tee",
    price: "$29",
    icon: <FaTshirt className="w-12 h-12 text-muted-foreground" />,
    // image: "/images/tshirt.png", // Replace icon with image later
  },
  {
    id: 2,
    name: "Cozy Hoodie",
    price: "$49",
    icon: <FaTshirt className="w-12 h-12 text-muted-foreground" />,
    // image: "/images/hoodie.png",
  },
  {
    id: 3,
    name: "Stylish Cap",
    price: "$19",
    icon: <FaHatCowboy className="w-12 h-12 text-muted-foreground" />,
    // image: "/images/cap.png",
  },
  {
    id: 4,
    name: "Coffee Mug",
    price: "$15",
    icon: <FaMugHot className="w-12 h-12 text-muted-foreground" />,
    // image: "/images/mug.png",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="w-full py-16 px-6 bg-background">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-3">Featured Products</h2>
        <p className="text-muted-foreground mb-10">
          Check out our top-selling merchandise handpicked just for you.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="group relative overflow-hidden border border-border/40 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center w-full h-56 bg-muted/10 rounded-t-2xl mb-4">
                  {product.icon}
                  {/* Replace icon with Image component in future */}
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
