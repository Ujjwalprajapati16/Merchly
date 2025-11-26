"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonWishlistCard() {
  return (
    <div className="border rounded-lg p-4 flex flex-col gap-4">
      {/* Product Image */}
      <Skeleton className="w-full h-40 rounded-md" />

      {/* Title */}
      <Skeleton className="h-5 w-3/4" />

      {/* Price */}
      <Skeleton className="h-5 w-1/3" />

      {/* Action Button */}
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}
