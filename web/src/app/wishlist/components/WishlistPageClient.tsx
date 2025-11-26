"use client";

import { useWishlist } from "@/hooks/useWishlist";
import WishlistCard from "./WishlistCard";
import SkeletonWishlistPage from "./skeleton/SkeletonWishlistPage";

export default function WishlistPageClient() {
  const { data, isLoading } = useWishlist();

  if (isLoading) return <SkeletonWishlistPage />

  const items = data?.wishlist?.items || [];

  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Your Wishlist ❤️</h1>

      {items.length === 0 ? (
        <p className="text-muted-foreground text-lg">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item: any) => (
            <WishlistCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
