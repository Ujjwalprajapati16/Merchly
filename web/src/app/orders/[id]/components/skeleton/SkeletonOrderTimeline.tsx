"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonOrderTimeline() {
  return (
    <div className="flex flex-col gap-6 py-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-start gap-4">
          {/* Step Icon */}
          <Skeleton className="w-10 h-10 rounded-full" />

          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
