import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../types/AuthRequest.ts";
import {
  getWishlistService,
  addToWishlistService,
  removeFromWishlistService
} from "../services/wishlist-service.ts";

export const getWishlist = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const wishlist = await getWishlistService(userId!);
    res.status(200).json({ message: "Wishlist fetched", wishlist });
  } catch (err) {
    next(err);
  }
};

export const addToWishlist = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { productId } = req.body;

    if (!productId) throw new Error("productId is required");

    const wishlist = await addToWishlistService(userId!, productId);
    res.status(200).json({ message: "Product added to wishlist", wishlist });
  } catch (err) {
    next(err);
  }
};

export const removeFromWishlist = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { itemId } = req.params;

    if(!itemId) throw new Error("itemId is required");

    const wishlist = await removeFromWishlistService(userId!, itemId);
    res.status(200).json({ message: "Product removed from wishlist", wishlist });
  } catch (err) {
    next(err);
  }
};
