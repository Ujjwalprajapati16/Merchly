"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonOrderImage() {
  return (
    <div className="flex justify-center">
      <Skeleton className="w-[400px] h-[400px] rounded-xl" />
    </div>
  );
}
