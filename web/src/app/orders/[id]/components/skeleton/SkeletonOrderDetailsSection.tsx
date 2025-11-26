"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonOrderDetailsSection() {
  return (
    <div className="flex flex-col gap-4 pb-6 border-b">
      {/* Title */}
      <Skeleton className="h-6 w-1/2" />

      {/* Order Meta */}
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-5 w-40" />

      {/* Pricing */}
      <Skeleton className="h-5 w-28" />
    </div>
  );
}
