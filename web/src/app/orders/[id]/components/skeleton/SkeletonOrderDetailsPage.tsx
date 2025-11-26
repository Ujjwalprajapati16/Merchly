"use client";

import SkeletonOrderImage from "./SkeletonOrderImage";
import SkeletonOrderDetailsSection from "./SkeletonOrderDetailsSection";
import SkeletonOrderTimeline from "./SkeletonOrderTimeline";

export default function SkeletonOrderDetailsPage() {
  return (
    <div className="max-w-6xl mx-auto p-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Left Image */}
      <SkeletonOrderImage />

      {/* Right scrollable details */}
      <div className="relative h-[450px] overflow-y-scroll pr-2 no-scrollbar flex flex-col gap-6">
        <SkeletonOrderDetailsSection />
        <SkeletonOrderTimeline />
      </div>

    </div>
  );
}
