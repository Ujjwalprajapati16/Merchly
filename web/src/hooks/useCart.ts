import { getCart } from "@/services/cart-service";
import { useQuery } from "@tanstack/react-query";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    staleTime: 1000 * 60 * 5, 
  });
};