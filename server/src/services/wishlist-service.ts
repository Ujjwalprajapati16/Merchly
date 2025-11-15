import {
  getWishlistByUserId,
  createWishlist,
  addItemToWishlistRepo,
  removeFromWishlistRepo,
} from "../repositories/wishlist-repo";

export const getWishlistService = async (userId: string) => {
  let wishlist = await getWishlistByUserId(userId);
  if (!wishlist) wishlist = await createWishlist(userId);
  return wishlist;
};

export const addToWishlistService = async (userId: string, productId: string) => {
  return await addItemToWishlistRepo(userId, productId);
};

export const removeFromWishlistService = async (userId: string, itemId: string) => {
  return await removeFromWishlistRepo(userId, itemId);
};
