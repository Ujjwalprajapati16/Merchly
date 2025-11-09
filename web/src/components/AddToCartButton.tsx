"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "sonner";
import {
  useAddToCart,
  useUpdateCartQuantity,
} from "../hooks/useCart";
import { AddToCart } from "@/types/cartTypes";

export default function AddToCartButton({ productId, variant }: AddToCart) {
  const [count, setCount] = useState(0);
  const [itemId, setItemId] = useState<string | null>(null);

  const { mutate: addItem, isPending: adding } = useAddToCart();
  const { mutate: updateQty, isPending: updating } = useUpdateCartQuantity();

  const isPending = adding || updating;

  // ✅ Add item to cart
  const handleAdd = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(
      { productId, quantity: 1, variant },
      {
        onSuccess: (updatedCart: any) => {
          setCount(1);

          // ✅ find correct cart itemId from backend response
          const created = updatedCart.items.find(
            (i: any) =>
              i.product._id === productId &&
              i.variant.color === variant.color &&
              i.variant.size === variant.size
          );

          if (created) setItemId(created._id);

        },
        onError: () => toast.error("Failed to add to cart"),
      }
    );
  };

  // ✅ Increase item quantity
  const handleIncrement = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!itemId) return;

    const newQty = count + 1;
    setCount(newQty);

    updateQty(
      { itemId, quantity: newQty },
      {
        onSuccess: () => toast.success(`Updated quantity to ${newQty}`),
        onError: () => toast.error("Failed to update cart"),
      }
    );
  };

  // ✅ Decrease item quantity
  const handleDecrement = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!itemId) return;

    if (count <= 1) {
      setCount(0);
      toast.success("Removed from cart");
      return;
    }

    const newQty = count - 1;
    setCount(newQty);

    updateQty(
      { itemId, quantity: newQty },
      {
        onSuccess: () => toast.success(`Updated quantity to ${newQty}`),
        onError: () => toast.error("Failed to update cart"),
      }
    );
  };

  return count === 0 ? (
    <Button
      onClick={handleAdd}
      disabled={isPending}
      className="flex items-center gap-2 text-sm"
    >
      <FaShoppingCart className="w-4 h-4" /> Add to Cart
    </Button>
  ) : (
    <div className="flex items-center gap-2 border rounded-lg px-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleDecrement}
        className="px-2 py-1"
        disabled={isPending}
      >
        -
      </Button>

      <span className="text-sm w-6 text-center">{count}</span>

      <Button
        variant="outline"
        size="sm"
        onClick={handleIncrement}
        className="px-2 py-1"
        disabled={isPending}
      >
        +
      </Button>
    </div>
  );
}
