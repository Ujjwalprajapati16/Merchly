import api from "@/lib/axios";
import { Product } from "@/types/productTypes.js";

export const getProducts = async (page = 1, limit = 6): Promise<Product[]> => {
  const res = await api.get(`/product?page=${page}&limit=${limit}`);
  return res.data.products;
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await api.get(`/product/${id}`);
  return res.data.product;
};

export const getProductsByCategory = async (category: string, page = 1, limit = 6): Promise<Product[]> => {
  const res = await api.get(`/product/category/${category}?page=${page}&limit=${limit}`);
  return res.data.products;
};

export const getCategories = async (): Promise<string[]> => {
  const res = await api.get(`/product/categories`);
  return res.data.categories;
};

export const addProduct = async (formData: FormData) => {
  const res = await api.post(`/product/add`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateProduct = async (id: string, formData: FormData) => {
  const res = await api.put(`/product/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteProduct = async (id: string) => {
  const res = await api.delete(`/product/delete/${id}`);
  return res.data;
};
