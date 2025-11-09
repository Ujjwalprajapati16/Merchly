"use client";

import { Button } from "@/components/ui/button";

interface CartSummaryProps {
  total: number;
  onClear?: () => void;
  onCheckout?: () => void;
  isClearing?: boolean;
  isCheckingOut?: boolean;
}

export function CartSummary({
  total,
  onClear,
  onCheckout,
  isClearing,
  isCheckingOut,
}: CartSummaryProps) {
  return (
    <div className="flex justify-between items-center mt-4 p-4 border rounded-2xl">
      <p className="text-lg font-semibold">Total: ₹{total}</p>

      <div className="flex gap-3">
        <Button
          variant="outline"
          size="lg"
          disabled={isClearing}
          onClick={onClear}
          className="rounded-2xl px-6"
        >
          {isClearing ? "Clearing..." : "Clear Cart"}
        </Button>

        <Button
          size="lg"
          disabled={isCheckingOut}
          onClick={onCheckout}
          className="rounded-2xl px-8"
        >
          {isCheckingOut ? "Processing..." : "Checkout"}
        </Button>
      </div>
    </div>
  );
}
