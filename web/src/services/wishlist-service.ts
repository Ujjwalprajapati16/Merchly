import api from "@/lib/axios"

// Fetch wishlist
export const getWishlistService = async () => {
  const res = await api.get("/wishlist");
  return res.data;
};

// Add product to wishlist
export const addToWishlistService = async (productId: string) => {
  if (!productId) throw new Error("productId is required");

  const res = await api.post("/wishlist/add", { productId });
  return res.data;
};

// Remove product from wishlist
export const removeFromWishlistService = async (
  id: string,
  type: "item" | "product"
) => {
  if (!id) throw new Error("Missing id for removal");

  const url =
    type === "item"
      ? `/wishlist/remove/${id}`              
      : `/wishlist/remove?productId=${id}`;   

  const res = await api.delete(url);
  return res.data;
};

