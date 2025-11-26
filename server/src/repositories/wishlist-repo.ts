import Wishlist from "../models/wishlist-model.js";

export const getWishlistByUserId = async (userId: string) => {
  return await Wishlist.findOne({ user: userId }).populate("items.productId");
};

export const createWishlist = async (userId: string) => {
  return await Wishlist.create({ user: userId, items: [] });
};

export const addItemToWishlistRepo = async (userId: string, productId: string) => {
  return await Wishlist.findOneAndUpdate(
    { user: userId },
    {
      $addToSet: {
        items: { productId },
      },
    },
    { new: true }
  );
};

export const removeFromWishlistRepo = async (userId: string, itemId: string) => {
  return await Wishlist.findOneAndUpdate(
    { user: userId },
    {
      $pull: { items: { _id: itemId } },
    },
    { new: true }
  );
};

export const isProductInWishlist = async (userId: string, productId: string) => {
  const wishlist = await Wishlist.findOne({
    user: userId,
    "items.productId": productId,
  });
  return Boolean(wishlist);
};