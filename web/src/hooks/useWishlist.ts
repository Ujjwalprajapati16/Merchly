import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getWishlistService,
  addToWishlistService,
  removeFromWishlistService,
} from "@/services/wishlist-service";

// Query key
const WISHLIST_KEY = ["wishlist"];

// Fetch hook
export const useWishlist = () => {
  return useQuery({
    queryKey: WISHLIST_KEY,
    queryFn: getWishlistService,
    staleTime: 1000 * 60, // 1 minute
  });
};

// Add item hook
export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => addToWishlistService(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_KEY });
    },
  });
};

// Remove item hook
export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { id: string; type: "item" | "product" }) =>
      removeFromWishlistService(payload.id, payload.type),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};
