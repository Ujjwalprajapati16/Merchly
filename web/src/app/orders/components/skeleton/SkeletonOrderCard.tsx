"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonOrderCard() {
  return (
    <div className="flex flex-col md:flex-row p-4 gap-4 border rounded-xl">
      
      {/* Left Image */}
      <div className="w-full md:w-36 flex justify-center md:justify-start">
        <Skeleton className="rounded-md h-[150px] w-[150px]" />
      </div>

      {/* Right Content */}
      <div className="flex flex-col justify-between w-full">
        
        {/* Header */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-3">
          <Skeleton className="h-6 w-20 rounded-md" />
          <Skeleton className="h-6 w-20 rounded-md" />
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>

        {/* Details */}
        <div className="space-y-2 mt-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-3/4" />
        </div>

      </div>
    </div>
  );
}
