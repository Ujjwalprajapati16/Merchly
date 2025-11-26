"use client";

import SkeletonAddressSection from "./SkeletonAddressSection";
import SkeletonOrderSummary from "./SkeletonOrderSummary";
import SkeletonPlaceOrderButton from "./SkeletonPlaceOrderButton";

export default function SkeletonCheckoutPage() {
  return (
    <div className="container mx-auto max-w-5xl py-10 flex flex-col gap-8">
      <SkeletonAddressSection />
      <SkeletonOrderSummary />
      <SkeletonPlaceOrderButton />
    </div>
  );
}
