"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/productTypes";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/products/${product.slug}`} className="block group">
      <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group">
        {/* Image Section */}
        <div className="relative w-full aspect-square bg-muted/10 overflow-hidden">
          <Image
            src={product.variants?.[0]?.image as string || "/images/placeholder.png"}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />

          {product.status && (
            <span
              className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full text-white ${product.status === "available" ? "bg-green-600" : "bg-red-600"
                }`}
            >
              {product.status === "available" ? "Available" : "Sold Out"}
            </span>
          )}
        </div>

        {/* Content Section */}
        <CardContent className="flex flex-col items-center text-center p-4 space-y-2">
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          <p className="text-sm text-muted-foreground">₹{product.price}</p>

          <AddToCartButton productId={product._id} variant={product.variants?.[0]} />
        </CardContent>
      </Card>

    </Link>
  );
};

export default ProductCard;
