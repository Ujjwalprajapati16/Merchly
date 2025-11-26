import api from "@/lib/axios";
import { categories, HomePageProductsResponse, Product, ProductResponse } from "@/types/productTypes";
import { getToken, isAuthenticated } from "./auth-service";
import { useAuth } from "@/providers/AuthProvider.js";

export const getProducts = async (page = 1, limit = 6): Promise<Product[]> => {
  const res = await api.get(`/product?page=${page}&limit=${limit}`);
  return res.data.products;
};

export const getProductsForHomePage = async (page = 1, limit = 6) => {
  const res = await api.get<HomePageProductsResponse>(
    `/product/products?page=${page}&limit=${limit}`
  );

  return {
    products: res.data.products.products,
    totalProducts: res.data.products.totalProducts,
    totalPages: res.data.products.totalPages
  };
};


export const getProductById = async (id: string, userId?: string): Promise<ProductResponse> => {
  let res;
  if (isAuthenticated()) {
    res = await api.get(`/product/${id}?userId=${userId}`);
  } else {
    res = await api.get(`/product/${id}`);
  }
  return {
    product: res.data.product,
    isInWishlist: res.data.isInWishlist ?? false,
  };
};


export const getProductsByCategory = async (category: string, page = 1, limit = 6): Promise<Product[]> => {
  const res = await api.get(`/product/categories/${category}?page=${page}&limit=${limit}`);
  return res.data.products;
};

export const getCategories = async (): Promise<categories[]> => {
  const res = await api.get(`/product/categories`);
  return res.data.categories;
};

export const addProduct = async (formData: FormData) => {
  const token = getToken();

  const res = await api.post(`/product/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateProduct = async (id: string, formData: FormData) => {
  const token = getToken();

  const res = await api.put(`/product/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const deleteProduct = async (id: string) => {
  const token = getToken();

  const res = await api.delete(`/product/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
