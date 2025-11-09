import { addToCart, checkoutCart, clearCart, getCart, moveToCart, removeFromCart, saveForLater, updateCartQuantity } from "@/services/cart-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    staleTime: 1000 * 60 * 5, 
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-to-cart"],
    mutationFn: ({ productId, quantity, variant }: any) =>
      addToCart(productId, quantity, variant),

    // ✅ After success, refetch cart
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Added to cart");
    },
  });
};

export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-cart-qty"],
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      updateCartQuantity(itemId, quantity),

    // ✅ refetch cart after success
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

// ✅ Remove Item
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["remove-from-cart"],
    mutationFn: (itemId: string) => removeFromCart(itemId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Item removed");
    },
  });
};

// ✅ Clear Cart
export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["clear-cart"],
    mutationFn: clearCart,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Cart cleared");
    },
  });
};

// ✅ Save For Later
export const useSaveForLater = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["save-for-later"],
    mutationFn: (itemId: string) => saveForLater(itemId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Saved for later");
    },
  });
};

// ✅ Move item back to cart
export const useMoveToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["move-to-cart"],
    mutationFn: (itemId: string) => moveToCart(itemId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Moved back to cart");
    },
  });
};

// ✅ Checkout
export const useCheckoutCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["checkout-cart"],
    mutationFn: checkoutCart,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Order placed");
    },
  });
};
