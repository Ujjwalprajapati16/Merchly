import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProduct, updateProduct, deleteProduct } from "@/services/product-service";
import { toast } from "sonner"; 
import { deleteUser, getAllUsers } from "@/services/user-service";
import { getOrdersForAdmin, updateOrderStatus } from "@/services/order-service";

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      toast.success("Product added successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateProduct(id, formData),
    onSuccess: () => {
      toast.success("Product updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// GET all users
export const useAdminUsers = () => {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: getAllUsers,
  });
};

// DELETE user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("User deleted successfully!");
    },
  });
};

// Get All Orders
export const useAdminOrders = (page = 1, limit = 5) => {
  return useQuery({
    queryKey: ["admin-orders", page, limit],
    queryFn: () => getOrdersForAdmin({ page, limit }),
    placeholderData: (previousData) => previousData, 
  });
};

// update order status
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
      updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      queryClient.invalidateQueries({ queryKey: ["order"] }); 
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update status");
    },
  });
};