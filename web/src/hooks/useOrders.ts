"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  buyNow,
  cancelOrder,
  updatePaymentStatus,
  getOrderById,
  getUserOrders,
} from "@/services/order-service";
import { toast } from "sonner";

export function useUserOrders(page: number) {
  return useQuery({
    queryKey: ["orders", page],
    queryFn: () => getUserOrders({ page }),
    // keepPreviousData: true,
  });
}

export function useOrder(orderId: string) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
  });
}

export function useBuyNow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: buyNow,
    onSuccess: () => {
      toast.success("Order placed successfully!");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => toast.error("Failed to place order"),
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      toast.success("Order cancelled!");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => toast.error("Failed to cancel order"),
  });
}

export function useUpdatePaymentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, paymentData }: { orderId: string; paymentData: any }) =>
      updatePaymentStatus(orderId, paymentData),
    onSuccess: () => {
      toast.success("Payment updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => toast.error("Failed to update payment status"),
  });
}
