"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import { useProducts } from "@/hooks/useProducts";
import { ProductSkeleton } from "@/components/ProductSkeleton";

const FeaturedProducts = () => {
  const { data: products, isLoading, isError } = useProducts();

  if (isLoading) {
    return (
      <section className="w-full py-16 px-6 bg-background">
        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-20 flex flex-col items-center justify-center text-center space-y-4">
        <Image
          src="error-reload.svg"
          alt="Error loading products"
          width={200}
          height={200}
          className="opacity-80"
        />
        <h2 className="text-xl font-semibold text-foreground">
          Oops! Something went wrong.
        </h2>
        <p className="text-muted-foreground max-w-md">
          We couldn’t load our latest products right now. Please check your connection or try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-5 py-2 rounded-lg bg-primary dark:text-black text-white hover:bg-primary/90 transition"
        >
          Retry
        </button>
      </section>
    );
  }

  return (
    <section className="w-full py-16 px-6 bg-background">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-3">Featured Products</h2>
        <p className="text-muted-foreground mb-10">
          Check out our latest merchandise handpicked just for you.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products?.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="group relative border border-border/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-muted/10">
                  <Image
                    src={
                      product?.variants?.[0]?.image as string || "/images/placeholder.png"
                    }
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.status && (
                    <span className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded-full dark:bg-primary/80 dark:text-primary-foreground">
                      {product.status === "available" ? "New" : "Sold Out"}
                    </span>
                  )}
                  <Link href={`/products/${product.slug}`} className="absolute inset-0" />
                </div>

                {/* Product Details */}
                <CardContent className="p-5 flex flex-col items-center text-center space-y-2">
                  <h3 className="font-medium text-lg">{product.name}</h3>

                  <p className="text-sm text-muted-foreground truncate w-5/6">
                    ₹{product.price}
                  </p>

                  <AddToCartButton
                    productId={product._id}
                    variant={{
                      color: product?.variants?.[0]?.color,
                      size: product?.variants?.[0]?.size,
                      image: product?.variants?.[0]?.image,
                    }}
                  />
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
