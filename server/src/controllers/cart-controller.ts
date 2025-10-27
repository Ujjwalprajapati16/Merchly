import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../types/AuthRequest.ts";
import { getCartByUserId } from "../services/cart-services.ts";

export const getCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    const cart = await getCartByUserId(userId);

    return res.status(200).json({
      message: "Cart fetched successfully",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
    res.json({ message: "Product added to cart successfully"});
};

export const updateQuantity = async (req: AuthRequest, res: Response, next: NextFunction) => {
    res.json({ message: "Cart updated successfully"});
};

export const removeFromCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
    res.json({ message: "Product removed from cart successfully"});
};

export const clearCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
    res.json({ message: "Cart cleared successfully"});
};

export const checkoutCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
    res.json({ message: "Cart checked out successfully"});
};

export const saveForLater = async (req: AuthRequest, res: Response, next: NextFunction) => {
    res.json({ message: "Product saved for later successfully"});
};