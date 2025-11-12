"use client";

import Image from "next/image";

interface OrderSummaryProps {
  cart: any;
}

export default function OrderSummary({ cart }: OrderSummaryProps) {
  return (
    <div className="p-4 border rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      {cart?.items?.map((item: any) => (
        <div
          key={item._id}
          className="flex justify-between items-center py-3 border-b last:border-0"
        >
          <div className="flex items-center gap-4">
            <Image
              src={item.variant?.image || "/images/placeholder.png"}
              alt={item.product?.name || "Product"}
              width={60}
              height={60}
              className="rounded-xl border"
            />
            <div>
              <p className="font-medium">{item.product?.name}</p>
              <p className="text-sm text-muted-foreground">
                {item.variant?.color} {item.variant?.size && `- ${item.variant.size}`}
              </p>
            </div>
          </div>
          <p className="font-semibold">₹{item.subtotal}</p>
        </div>
      ))}

      <div className="flex justify-between mt-4 font-semibold text-lg">
        <p>Total</p>
        <p>₹{cart?.total}</p>
      </div>
    </div>
  );
}
