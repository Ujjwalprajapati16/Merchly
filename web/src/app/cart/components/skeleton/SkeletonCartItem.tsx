"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCartItem() {
  return (
    <div className="p-4 rounded-lg border flex flex-col gap-4">
      {/* Image */}
      <Skeleton className="w-full h-40 rounded-md" />

      {/* Title */}
      <Skeleton className="h-5 w-3/4" />

      {/* Price */}
      <Skeleton className="h-5 w-1/3" />

      {/* Quantity Buttons */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>

      {/* Remove / Save Buttons */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
}
