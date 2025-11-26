"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonAddressSection() {
  return (
    <div className="border p-6 rounded-lg flex flex-col gap-4">
      <Skeleton className="h-6 w-40" />

      {/* Address lines */}
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-5 w-1/2" />

      {/* Change address button */}
      <Skeleton className="h-10 w-40 rounded-md" />
    </div>
  );
}
