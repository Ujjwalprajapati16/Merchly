"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/productTypes";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/products/${product.slug}`} className="block group">
      <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
        <div className="relative w-full h-56 bg-muted/10 flex items-center justify-center rounded-2xl">
          <Image
            src={product.image?.[0] || ""}
            alt={product.name}
            width={300}
            height={300}
            className="object-contain rounded-2xl border"
          />

          {product.badge && (
            <span className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded-full">
              {product.badge}
            </span>
          )}
        </div>

        <CardContent className="text-center flex flex-col items-center p-4 space-y-2">
          <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground">{product.price}</p>

          <Button
            variant="outline"
            className="flex items-center gap-2 text-sm mt-2"
            onClick={(e) => e.preventDefault()} // prevents link navigation on button click
          >
            <FaShoppingCart className="w-4 h-4" /> Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
