import type mongoose from "mongoose";

type OrderProduct = {
    productId: mongoose.Types.ObjectId;
    color: string;
    size: string;
    image: string;
    quantity: number;
    price: number;
    subtotal: number;
}

export type OrderType = {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    products: OrderProduct[];
    total: number;
    status: "received" | "out_for_delivery" | "shipped" | "delivered" | "cancelled";
    payment_status: "pending" | "failed" | "success";
    paymentId?: string;
    address: {
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        country: string;
        pincode: string;
    };
    orderId: string;
    createdAt: Date;
    updatedAt: Date;
}