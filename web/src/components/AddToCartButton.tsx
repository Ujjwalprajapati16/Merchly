"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "sonner";

const AddToCartButton = () => {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount((prev) => prev + 1);
    toast.success("Added to cart");
  };

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
    toast.success(`Added ${count + 1} to cart`);
  };

  const handleDecrement = () => {
    setCount((prev) => {
      if (prev <= 1) return 0;
      return prev - 1;
    });
    toast.success(`Removed ${count - 1} from cart`);
  };

  // Render counter if count > 0, else show Add to Cart button
  return count === 0 ? (
    <Button onClick={handleAdd} className="flex items-center gap-2 text-sm">
      <FaShoppingCart className="w-4 h-4" /> Add to Cart
    </Button>
  ) : (
    <div className="flex items-center gap-2 border rounded-lg px-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleDecrement}
        className="px-2 py-1"
      >
        -
      </Button>
      <span className="text-sm w-6 text-center">{count}</span>
      <Button
        variant="outline"
        size="sm"
        onClick={handleIncrement}
        className="px-2 py-1"
      >
        +
      </Button>
    </div>
  );
};

export default AddToCartButton;
