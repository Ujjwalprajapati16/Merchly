import api from "@/lib/axios";
import { Product } from "@/types/productTypes";
import { getToken } from "./auth-service";

export const getProducts = async (page = 1, limit = 6): Promise<Product[]> => {
  const res = await api.get(`/product?page=${page}&limit=${limit}`);
  return res.data.products;
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await api.get(`/product/${id}`);
  return res.data.product;
};

export const getProductsByCategory = async (category: string, page = 1, limit = 6): Promise<Product[]> => {
  const res = await api.get(`/product/categories/${category}?page=${page}&limit=${limit}`);
  return res.data.products;
};

export const getCategories = async (): Promise<string[]> => {
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
