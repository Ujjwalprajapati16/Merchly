import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../types/AuthRequest.ts";
import { buyNowService, cancelOrderService, getAllOrdersAdminService, getOrderByIdService, getUserOrdersService } from "../services/order-services.ts";
import { Unauthorized } from "../middlewares/ErrorHandler.ts";

export const buyNow = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { productId, quantity, color, size } = req.body;
        const userId = req.user?.id;

        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        const selectedVariant = color && size ? { color, size } : undefined;
        const order = await buyNowService(userId!, productId, quantity, selectedVariant);

        res.status(201).json({
            message: "Order placed successfully via Buy Now",
            order,
        });
    } catch (error) {
        next(error);
    }
};

export const getUserOrders = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw new Unauthorized("User not authorized");

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const { orders, totalOrders, totalPages } = await getUserOrdersService(userId, page, limit);

        res.status(200).json({
            message: "User orders fetched successfully",
            currentPage: page,
            totalPages,
            totalOrders,
            results: orders.length,
            orders,
        });
    } catch (err) {
        next(err);
    }
};

export const getOrderById = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { orderId } = req.params;

        if (!orderId) {
            return res.status(400).json({ message: "Order ID is required" });
        }

        const order = await getOrderByIdService(orderId);

        res.status(200).json({
            message: "Order fetched successfully",
            order,
        });
    } catch (error) {
        next(error);
    }
};

export const cancelOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { orderId } = req.params;
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!orderId) {
            return res.status(400).json({ message: "Order ID is required" });
        }

        const order = await cancelOrderService(orderId, user.id);

        res.status(200).json({
            message: "Order cancelled successfully",
            order,
        });
    } catch (error) {
        next(error);
    }
};

export const updatePaymentStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
    res.json({
        message: "Payment status updated successfully",
    })
};

export const getAllOrdersAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const { orders, totalOrders, totalPages } = await getAllOrdersAdminService(page, limit);

        res.status(200).json({
            message: "All orders fetched successfully",
            currentPage: page,
            totalPages,
            totalOrders,
            results: orders.length,
            orders,
        });
    } catch (error) {
        next(error);
    }
};


export const updateOrderStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
    res.json({
        message: "Order status updated successfully",
    })
};