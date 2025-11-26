"use client";

import SkeletonWishlistCard from "./SkeletonWishlistCard";

export default function SkeletonWishlistPage() {
  return (
    <div>
      {/* Heading */}
      <div className="h-8 w-48 bg-muted rounded mb-6" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonWishlistCard key={i} />
        ))}
      </div>
    </div>
  );
}
