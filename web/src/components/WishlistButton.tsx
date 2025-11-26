"use client";

import { useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { RiHeartFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { useAddToWishlist, useRemoveFromWishlist } from "@/hooks/useWishlist";
import { toast } from "sonner";

type WishlistButtonProps = {
  productId: string;
  initialState?: boolean;
  wishlistItemId?: string | null;
};

export default function WishlistButton({
  productId,
  initialState = false,
  wishlistItemId = null,
}: WishlistButtonProps) {
  const addMutation = useAddToWishlist();
  const removeMutation = useRemoveFromWishlist();

  const [isInWishlist, setIsInWishlist] = useState(initialState);

  const isMutating = addMutation.isPending || removeMutation.isPending;

  const handleClick = () => {
    const token = typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

    if (!token) {
      toast.error("You need to login first to manage wishlist");
      return;
    }

    if (isInWishlist) {
      // Removing
      setIsInWishlist(false);

      removeMutation.mutate({
        id: wishlistItemId ?? productId,
        type: wishlistItemId ? "item" : "product",
      });

    } else {
      // Adding
      setIsInWishlist(true);
      addMutation.mutate(productId);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={isMutating}
      onClick={handleClick}
      className="rounded-full hover:bg-red-50 p-1 transition"
    >
      {isMutating ? (
        <Loader2 className="h-8 w-8 animate-spin text-red-500" />
      ) : isInWishlist ? (
        <RiHeartFill className="h-8 w-8 text-red-600 transition-all" />
      ) : (
        <Heart className="h-8 w-8 text-gray-600 hover:text-red-600 transition-all" />
      )}
    </Button>
  );
}
