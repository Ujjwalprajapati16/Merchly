"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function EmptyCart() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      {/* Cart Illustration */}
      <Image
        src="/empty-cart.svg"
        alt="Empty Cart"
        width={260}
        height={260}
        className="opacity-90 mb-6"
      />

      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-2">Your Cart is Empty</h2>

      {/* Subtext */}
      <p className="text-muted-foreground max-w-md text-sm mb-6">
        Looks like you haven’t added anything yet. Browse products and add them
        to your cart to see them here.
      </p>

      {/* CTA */}
      <Button onClick={() => router.push("/products")}>
        Continue Shopping
      </Button>
    </div>
  );
}
