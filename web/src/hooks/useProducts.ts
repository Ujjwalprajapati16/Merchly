import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductById, getProductsByCategory, getCategories } from "@/services/product-service";
import { categories } from "@/types/productTypes.js";

export const useProducts = (page = 1, limit = 6) => {
  return useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts(page, limit),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};

export const useProductsByCategory = (category: string, page = 1) => {
  return useQuery({
    queryKey: ["productsByCategory", category, page],
    queryFn: () => getProductsByCategory(category, page),
    enabled: !!category,
  });
};

export const useProductCategories = () => {
  return useQuery<categories[]>({
    queryKey: ["productCategories"],
    queryFn: () => getCategories(),
  });
};