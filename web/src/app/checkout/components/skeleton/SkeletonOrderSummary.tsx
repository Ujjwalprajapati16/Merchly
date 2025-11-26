"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonOrderSummary() {
  return (
    <div className="border p-6 rounded-lg flex flex-col gap-5">
      <Skeleton className="h-6 w-48" />

      {/* Cart Items */}
      <div className="flex flex-col gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-start gap-4">
            {/* Thumbnail */}
            <Skeleton className="h-20 w-20 rounded-md" />

            {/* Text */}
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        ))}
      </div>

      {/* Price summary */}
      <div className="flex flex-col gap-3 border-t pt-4">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-6 w-48" />
      </div>
    </div>
  );
}
