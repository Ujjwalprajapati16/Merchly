import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../types/AuthRequest.ts";
import { addItemToCartService, getCartByUserId, updateCartItemQuantity } from "../services/cart-services.ts";

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
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { productId, variant, quantity } = req.body;

        if (!productId || !variant || !quantity) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const cart = await addItemToCartService(user.id, productId, variant, quantity);

        res.status(200).json({
            message: "Product added to cart successfully",
            cart,
        });
    } catch (error) {
        next(error);
    }
};  

export const updateQuantity = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const { itemId } = req.params;
        const { quantity } = req.body;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        if (!itemId || typeof quantity !== "number" || quantity < 1) {
            return res.status(400).json({ message: "Invalid item ID or quantity" });
        }

        const updatedCart = await updateCartItemQuantity(userId, itemId, quantity);

        res.status(200).json({
            message: "Cart updated successfully",
            cart: updatedCart,
        });
    } catch (error) {
        next(error);
    }
};

export const removeFromCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
    res.json({ message: "Product removed from cart successfully" });
};

export const clearCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
    res.json({ message: "Cart cleared successfully" });
};

export const checkoutCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
    res.json({ message: "Cart checked out successfully" });
};

export const saveForLater = async (req: AuthRequest, res: Response, next: NextFunction) => {
    res.json({ message: "Product saved for later successfully" });
};