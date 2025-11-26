"use client";

import { useOrder } from "@/hooks/useOrders";
import Image from "next/image";
import OrderDetailsSection from "./components/OrderDetails";
import OrderTimeline from "./components/OrderTimeline";
import { use } from "react";
import SkeletonOrderDetailsPage from "./components/skeleton/SkeletonOrderDetailsPage";

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const {id} = use(params);
  const { data, isLoading } = useOrder(id);

  if (isLoading) {
    return <SkeletonOrderDetailsPage />;
  }

  const order = data?.order;

  if (!order) {
    return (
      <p className="text-center text-gray-600 py-8">
        Order not found or something went wrong.
      </p>
    );
  }

  const firstProduct = order.products[0];

  return (
    <div className="max-w-6xl mx-auto p-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* ✅ Left Image (main product image) */}
      <div className="flex justify-center">
        <Image
          src={firstProduct?.image || "/placeholder.png"}
          alt={
            firstProduct?.productId?.name ??
            `Product ${firstProduct?.productId?._id}`
          }
          width={400}
          height={400}
          className="rounded-xl object-cover max-h-[450px]"
        />
      </div>

      {/* ✅ Right scrollable section */}
      <div className="relative h-[450px] overflow-y-scroll pr-2 no-scrollbar">
        <OrderDetailsSection order={order} />
        <OrderTimeline status={order.status} />
      </div>

    </div>
  );
}
