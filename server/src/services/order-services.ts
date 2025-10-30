import mongoose from "mongoose";
import { BadRequest, NotFound } from "../middlewares/ErrorHandler.ts";
import { getPreferredAddressByUserId } from "../repositories/address-repo.ts";
import { cancelOrderById, createOrder, findOrderById, getAllOrdersAdminRepo, getOrdersByUserId, updateOrderStatusRepo } from "../repositories/order-repo.ts";
import { findProductById } from "../repositories/product-repo.ts";


export const buyNowService = async (
    userId: string,
    productId: string,
    quantity: number,
    selectedVariant?: { color: string; size: string }
) => {
    const product = await findProductById(productId);
    if (!product) throw new BadRequest("Product not found");

    // 🧩 Validate and select variant
    let variant = null;
    if (selectedVariant) {
        variant = product.variants.find(
            (v) => v.color === selectedVariant.color && v.size === selectedVariant.size
        );
    } else {
        variant = product.variants[0]; // default fallback
    }

    if (!variant) {
        throw new BadRequest("Selected variant not found for this product");
    }

    // 🏬 Optional: Check stock (if using per-variant stock later)
    // if (variant.stock < quantity) throw new BadRequest("Insufficient stock");

    const address = await getPreferredAddressByUserId(userId);
    if (!address) throw new BadRequest("No preferred address found");

    const subtotal = product.price * quantity;
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const productObjectId = new mongoose.Types.ObjectId(productId);

    const orderData = {
        userId: userObjectId,
        products: [
            {
                productId: productObjectId,
                quantity,
                color: variant.color,
                size: variant.size,
                image: variant.image,
                price: product.price,
                subtotal,
            },
        ],
        totalAmount: subtotal,
        totalItems: quantity,
        status: "received" as const,
        payment_status: "pending" as const,
        address: {
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            city: address.city,
            state: address.state,
            country: address.country,
            pincode: address.pincode,
        },
    };

    const order = await createOrder(orderData);

    // 🧮 (Optional) reduce stock in product
    // variant.stock -= quantity;
    // await product.save();

    return order;
};

export const getUserOrdersService = async (userId: string, page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const { orders, totalOrders } = await getOrdersByUserId(userId, skip, limit);

    const totalPages = Math.ceil(totalOrders / limit);

    return { orders, totalOrders, totalPages };
};

export const getOrderByIdService = async (orderId: string) => {
    if (!orderId) throw new BadRequest("Order ID is required");

    const order = await findOrderById(orderId);
    if (!order) throw new NotFound("Order not found");

    return order;
};

export const cancelOrderService = async (orderId: string, userId: string) => {
    if (!orderId) throw new BadRequest("Order ID is required");

    const order = await findOrderById(orderId);
    if (!order) throw new NotFound("Order not found");

    // Ensure user owns this order
    if (order.userId._id.toString() !== userId.toString()) {
        throw new BadRequest("You are not authorized to cancel this order");
    }

    // Prevent cancelling delivered or already-cancelled orders
    if (order.status === "delivered") {
        throw new BadRequest("Delivered orders cannot be cancelled");
    }
    if (order.status === "cancelled") {
        throw new BadRequest("This order is already cancelled");
    }

    // Cancel the order
    const cancelledOrder = await cancelOrderById(orderId);
    return cancelledOrder;
};

export const getAllOrdersAdminService = async (page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const { orders, totalOrders } = await getAllOrdersAdminRepo(skip, limit);

    const totalPages = Math.ceil(totalOrders / limit);
    return { orders, totalOrders, totalPages };
};

export const updateOrderStatusService = async (orderId: string, status: string) => {
    const order = await updateOrderStatusRepo(orderId, status);
    if (!order) throw new BadRequest("Order not found");
    return order;
};
