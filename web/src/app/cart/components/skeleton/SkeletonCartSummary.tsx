"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCartSummary() {
  return (
    <div className="border p-6 rounded-lg flex flex-col gap-4 max-w-sm">
      <Skeleton className="h-6 w-1/2" />

      <Skeleton className="h-10 w-full rounded-md" />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}
