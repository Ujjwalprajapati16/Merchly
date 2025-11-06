"use client";

import dynamic from "next/dynamic";

const OrdersList = dynamic(() => import("./components/OrdersList"), {
  ssr: false,
});

export default function OrdersPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <OrdersList />
    </div>
  );
}
