"use client";

import WishlistButton from "@/components/WishlistButton";
import Link from "next/link";

type WishlistCardProps = {
  item: any;
};

export default function WishlistCard({ item }: WishlistCardProps) {
  const product = item.productId;

  return (
    <div className="border rounded-xl shadow-sm bg-card hover:shadow-md transition overflow-hidden relative group">
      
      {/* Wishlist Heart */}
      <div className="absolute top-3 right-3 z-20">
        <div className="bg-white/90 dark:bg-black/60 backdrop-blur-sm p-1 rounded-full shadow">
          <WishlistButton productId={product._id} isWishlist={true} />
        </div>
      </div>

      {/* Image Section */}
      <Link href={`/products/${product.slug}`}>
        <div className="w-full h-56 bg-muted flex items-center justify-center overflow-hidden rounded-t-xl">
          <img
            src={product.variants?.[0]?.image || "/placeholder.png"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h2 className="text-lg font-semibold hover:underline line-clamp-1">
            {product.name}
          </h2>
        </Link>

        <p className="text-primary text-xl font-bold mt-1">
          ₹{product.price}
        </p>

        {product?.variants && (
          <p className="text-sm text-muted-foreground mt-1">
            {product.variants[0]?.color ? `Color: ${product.variants[0]?.color}` : ""}
            {product.variants[0]?.size ? ` • Size: ${product.variants[0]?.size}` : ""}
          </p>
        )}
      </div>
    </div>
  );
}
