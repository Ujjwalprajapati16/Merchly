import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../types/AuthRequest.ts";
import { buyNowService } from "../services/order-services.ts";

export const buyNow = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user?.id;

        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        const order = await buyNowService(userId!, productId, quantity);
        res.status(201).json({
            message: "Order placed successfully via Buy Now",
            order,
        });
    } catch (error) {
        next(error);
    }
};

export const getUserOrders = async (req: AuthRequest, res: Response, next: NextFunction) => {
    res.json({
        message: "User orders fetched successfully",
    });
};

export const getOrderById = async (req: AuthRequest, res: Response, next: NextFunction) => {
    res.json({
        message: "Order fetched successfully",
    })
};

export const cancelOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
    res.json({
        message: "Order cancelled successfully",
    })
};

export const updatePaymentStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
    res.json({
        message: "Payment status updated successfully",
    })
};

export const getAllOrdersAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
    res.json({
        message: "All orders fetched successfully",
    })
};

export const updateOrderStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
    res.json({
        message: "Order status updated successfully",
    })
};