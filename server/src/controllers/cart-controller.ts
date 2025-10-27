import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../types/AuthRequest.ts";

export const getCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
    res.json({ message: "Cart fetched successfully"});
};

export const addToCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
    res.json({ message: "Product added to cart successfully"});
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