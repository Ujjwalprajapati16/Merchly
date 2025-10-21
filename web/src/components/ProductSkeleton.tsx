"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const ProductSkeleton = () => {
  return (
    <div className="flex flex-col items-center space-y-4 rounded-2xl border border-border/40 p-4 shadow-sm">
      {/* Image placeholder (square box) */}
      <Skeleton className="w-full aspect-square rounded-xl" />

      {/* Text placeholders */}
      <div className="w-full flex flex-col items-center space-y-2">
        <Skeleton className="h-4 w-3/4" /> {/* product name */}
        <Skeleton className="h-4 w-1/2" /> {/* price */}
        <Skeleton className="h-9 w-2/3 rounded-full" /> {/* button */}
      </div>
    </div>
  );
};
