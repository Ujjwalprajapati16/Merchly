import api from "@/lib/axios"
import { Variant } from "@/types/productTypes";

export const getCart = async () => {
    const res = await api.get("/cart");
    console.log(res.data.cart);
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