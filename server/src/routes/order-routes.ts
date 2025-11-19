import express from "express";
import { authenticate } from "../middlewares/AuthMiddleware.js";
import { buyNow, cancelOrder, getAllOrdersAdmin, getOrderById, getUserOrders, updateOrderStatus, updatePaymentStatus } from "../controllers/order-controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const orderRouter = express.Router();

// Admin
orderRouter.get("/admin/all", authenticate, isAdmin, getAllOrdersAdmin);
orderRouter.patch("/:orderId/status", authenticate, isAdmin, updateOrderStatus);

// User
orderRouter.post("/buy-now", authenticate, buyNow);
orderRouter.patch("/:orderId/cancel", authenticate, cancelOrder);
orderRouter.patch("/:orderId/payment", authenticate, updatePaymentStatus);
orderRouter.get("/:orderId", authenticate, getOrderById);
orderRouter.get("/", authenticate, getUserOrders);

export default orderRouter;