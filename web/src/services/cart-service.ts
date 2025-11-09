import api from "@/lib/axios"
import { Variant } from "@/types/productTypes";

export const getCart = async () => {
    const res = await api.get("/cart");
    return res.data.cart;
}

export const addToCart = async (productId: string, quantity: number, variant: Variant) => {
    const res = await api.post("/cart/items", { productId, quantity, variant });
    return res.data.cart;
}

export const updateCartQuantity = async (itemId: string, quantity: number) => {
  const res = await api.put(`/cart/items/${itemId}`, { quantity });
  return res.data.cart; 
};

export const removeFromCart = async (itemId: string) => {
  const res = await api.delete(`/cart/items/${itemId}`);
  return res.data.cart;
};

export const clearCart = async () => {
  const res = await api.delete(`/cart`);
  return res.data.cart;
};

export const saveForLater = async (itemId: string) => {
  const res = await api.post(`/cart/items/${itemId}/save`);
  return res.data.cart;
};

export const moveToCart = async (itemId: string) => {
  const res = await api.post(`/cart/items/${itemId}/save/move`);
  return res.data.cart;
};

export const checkoutCart = async () => {
  const res = await api.post(`/cart/checkout`);
  return res.data.order;
};