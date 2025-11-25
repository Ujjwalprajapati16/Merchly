"use client";

import { Heart, HeartOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist, useAddToWishlist, useRemoveFromWishlist } from "@/hooks/useWishlist";
import { RiHeartFill } from "react-icons/ri";

type WishlistButtonProps = {
    productId: string;
    isWishlist: boolean;
};

export default function WishlistButton({ productId, isWishlist }: WishlistButtonProps) {
    const { data, isLoading: loadingWishlist } = useWishlist();
    const addMutation = useAddToWishlist();
    const removeMutation = useRemoveFromWishlist();

    // Check if product exists in wishlist
    const wishlistItem = data?.wishlist?.items?.find(
        (item: any) => item.productId._id === productId
    );

    const isInWishlist = Boolean(wishlistItem);
    const isMutating = addMutation.isPending || removeMutation.isPending;

    const handleClick = () => {
        if (isInWishlist) {
            removeMutation.mutate(wishlistItem._id);
        } else {
            addMutation.mutate(productId);
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            disabled={loadingWishlist || isMutating}
            onClick={handleClick}
            className="rounded-full hover:bg-red-50 transition p-1"
        >
            {loadingWishlist || isMutating ? (
                <Loader2 className="h-8 w-8 animate-spin text-red-500" />
            ) : isInWishlist ? (
                <RiHeartFill className="h-8 w-8 text-red-600 transition-all" />
            ) : (
                <Heart className="h-8 w-8 text-gray-600 hover:text-red-600 transition-all" />
            )}
        </Button>

    );
}
