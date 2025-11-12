import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addAddress,
  getAddresses,
  getAddressById,
  getPreferredAddress,
  updateAddress,
  deleteAddress,
  setPreferredAddress,
} from "@/services/address-service";
import { toast } from "sonner";

// Get all addresses
export const useAddresses = () => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });
};

// Get preferred address
export const usePreferredAddress = () => {
  return useQuery({
    queryKey: ["preferred-address"],
    queryFn: getPreferredAddress,
  });
};

// Get address by ID
export const useAddressById = (id: string) => {
  return useQuery({
    queryKey: ["address", id],
    queryFn: () => getAddressById(id),
    enabled: !!id,
  });
};

// Add address
export const useAddAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      queryClient.invalidateQueries({ queryKey: ["preferred-address"] });
      toast.success("Address added successfully");
    },
  });
};

// Update address
export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateAddress(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      queryClient.invalidateQueries({ queryKey: ["preferred-address"] });
      toast.success("Address updated successfully");
    },
  });
};

// Delete address
export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Address deleted successfully");
    },
  });
};

// Set preferred address
export const useSetPreferredAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setPreferredAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["preferred-address"] });
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Preferred address updated");
    },
  });
};
