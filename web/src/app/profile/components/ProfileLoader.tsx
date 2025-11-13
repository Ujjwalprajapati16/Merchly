"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoader() {
  return (
    <div className="container mx-auto max-w-4xl py-10 flex flex-col gap-10">
      <div className="p-6 border rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div>
            <Skeleton className="h-5 w-40 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>

      <div className="p-6 border rounded-2xl">
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      </div>

      <div className="p-6 border rounded-2xl">
        <Skeleton className="h-6 w-40 mb-4" />
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full rounded-lg mb-3" />
        ))}
      </div>
    </div>
  );
}
