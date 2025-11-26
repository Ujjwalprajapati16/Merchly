"use client";

import SkeletonOrderCard from "./SkeletonOrderCard";
import SkeletonPagination from "./SkeletonPagination";

export default function SkeletonOrdersList() {
  return (
    <div className="space-y-6">

      {/* Orders List */}
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonOrderCard key={i} />
        ))}
      </div>

      {/* Pagination */}
      <SkeletonPagination />
    </div>
  );
}
