"use client";

import { SkeletonCartItem } from "./SkeletonCartItem";
import { SkeletonSavedItem } from "./SkeletonSavedItem";
import { SkeletonCartSummary } from "./SkeletonCartSummary";

export function SkeletonCartPage() {
  return (
    <div className="container mx-auto max-w-6xl py-10 flex flex-col gap-10">

      {/* Cart Section */}
      <div className="flex flex-col gap-4">
        <div className="h-8 w-40 bg-muted rounded"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCartItem key={i} />
          ))}
        </div>

        <SkeletonCartSummary />
      </div>

      {/* Saved For Later */}
      <div className="flex flex-col gap-4">
        <div className="h-7 w-48 bg-muted rounded"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <SkeletonSavedItem key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
