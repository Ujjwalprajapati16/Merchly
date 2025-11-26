"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonPagination() {
  return (
    <div className="flex justify-center gap-3 mt-6">
      <Skeleton className="h-8 w-20 rounded-md" />
      <Skeleton className="h-8 w-8 rounded-md" />
      <Skeleton className="h-8 w-8 rounded-md" />
      <Skeleton className="h-8 w-8 rounded-md" />
      <Skeleton className="h-8 w-20 rounded-md" />
    </div>
  );
}
