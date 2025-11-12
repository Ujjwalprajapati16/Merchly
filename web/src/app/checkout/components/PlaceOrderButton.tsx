"use client";

import { Button } from "@/components/ui/button";

interface PlaceOrderButtonProps {
  isLoading: boolean;
  onPlaceOrder: () => void;
}

export default function PlaceOrderButton({
  isLoading,
  onPlaceOrder,
}: PlaceOrderButtonProps) {
  return (
    <Button
      size="lg"
      className="w-full rounded-2xl py-6 text-lg"
      disabled={isLoading}
      onClick={onPlaceOrder}
    >
      {isLoading ? "Placing Order..." : "Place Order"}
    </Button>
  );
}
