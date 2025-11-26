"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function EmptyOrders() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      
      {/* Illustration */}
      <Image
        src="/order.svg"
        alt="No Orders Yet"
        width={260}
        height={260}
        className="opacity-90 mb-6"
      />

      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-2">No Orders Yet</h2>

      {/* Sub-text */}
      <p className="text-muted-foreground max-w-md text-sm mb-6">
        You haven’t placed any orders yet. Start shopping and your orders will
        appear here once you make a purchase.
      </p>

      {/* CTA */}
      <Button onClick={() => router.push("/products")}>
        Browse Products
      </Button>
    </div>
  );
}
