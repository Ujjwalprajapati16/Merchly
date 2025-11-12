"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function OrderDetailsSection({ order }: any) {
  const totalAmount = order.products.reduce(
    (sum: number, p: any) => sum + p.subtotal,
    0
  );

  return (
    <div className="space-y-8">
      
      {/* ✅ Header */}
      <div>
        <h1 className="text-2xl font-bold">Order #{order.orderId}</h1>
        <p className="text-sm text-gray-500">
          Ordered on {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* ✅ Multiple Products */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Items in this order</h2>

        <div className="space-y-4">
          {order.products.map((item: any) => (
            <div
              key={item._id}
              className="flex gap-4 p-3 rounded-lg border hover:shadow-sm transition"
            >
              <Image
                src={item.image}
                alt={item.productId?.name || "Product"}
                width={80}
                height={80}
                className="rounded-md object-cover h-[80px] w-[80px]"
              />

              <div className="flex flex-col justify-between">
                <div>
                  <p className="font-medium">
                    {item.productId?.name || "Deleted Product"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Qty: {item.quantity} • {item.color} • {item.size}
                  </p>
                </div>

                <p className="font-semibold">
                  ₹{item.subtotal}{" "}
                  <span className="text-gray-500 text-sm">
                    (₹{item.price} each)
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Payment */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Payment</h2>

        {order.payment_status === "pending" ? (
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Pay Online
          </Button>
        ) : (
          <Badge variant="outline" className="p-2 text-md">
            Cash on Delivery
          </Badge>
        )}
      </div>

      {/* ✅ Summary */}
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        <p className="text-gray-700">Items: {order.products.length}</p>
        <p className="text-gray-700 font-medium">Total: ₹{totalAmount}</p>
      </div>

      {/* ✅ Address */}
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Delivery Address</h2>
        <p className="text-gray-700">
          {order.address.addressLine1}, {order.address.addressLine2},{" "}
          {order.address.city}, {order.address.state}, {order.address.country},{" "}
          {order.address.pincode}
        </p>
      </div>
    </div>
  );
}
