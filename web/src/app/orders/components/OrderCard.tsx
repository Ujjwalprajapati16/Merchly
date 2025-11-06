"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { OrderType } from "@/types/orderTypes";

export default function OrderCard({ order }: { order: OrderType }) {
  const router = useRouter();
  const product = order.products[0];

  const statusMap: Record<string, string> = {
    received: "bg-yellow-100 text-yellow-700",
    shipped: "bg-blue-100 text-blue-700",
    out_for_delivery: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <Card
      onClick={() => router.push(`/orders/${order._id}`)}
      className="flex flex-col md:flex-row p-4 gap-4 cursor-pointer hover:shadow-md transition rounded-xl"
    >
      {/* ✅ Left Image */}
      <div className="w-full md:w-36 flex justify-center md:justify-start">
        <Image
          src={product?.image || "/placeholder.png"}
          alt={product?.productId?.name || "Product"}
          width={150}
          height={150}
          className="rounded-md object-cover h-[150px] w-[150px]"
        />
      </div>

      {/* ✅ Right Details Section */}
      <div className="flex flex-col justify-between w-full">
        <CardHeader className="p-0">
          <h2 className="font-semibold text-lg">{product?.productId?.name}</h2>
          <p className="text-sm text-gray-500">
            Ordered on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </CardHeader>

        <CardContent className="p-0 mt-2 space-y-3">
          {/* ✅ Status Badges */}
          <div className="flex gap-2">
            <Badge className={statusMap[order.status] || ""}>
              {order.status.replace(/_/g, " ")}
            </Badge>

            <Badge
              variant={
                order.payment_status === "success"
                  ? "default"
                  : order.payment_status === "pending"
                  ? "outline"
                  : "destructive"
              }
            >
              {order.payment_status}
            </Badge>
          </div>

          {/* ✅ Order Info */}
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <span className="font-medium">Total:</span> ₹
              {order.products.reduce((sum, p) => sum + p.subtotal, 0)}
            </p>
            <p>
              <span className="font-medium">Items:</span>{" "}
              {order.products.length}
            </p>
            <p className="truncate">
              <span className="font-medium">Deliver to:</span>{" "}
              {order.address.addressLine1}, {order.address.city}
            </p>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
