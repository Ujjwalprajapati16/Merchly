"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonPlaceOrderButton() {
  return (
    <div className="w-full">
      <Skeleton className="h-12 w-full rounded-md" />
    </div>
  );
}
