import mongoose from "mongoose";
import type { OrderType } from "../types/Order-types.ts";

const orderSchema = new mongoose.Schema<OrderType>(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        products: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                quantity: { type: Number, required: true },
                color: { type: String, required: true },
                size: { type: String, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                subtotal: { type: Number, required: true },
            },
        ],
        status: {
            type: String,
            enum: ["received", "out_for_delivery", "shipped", "delivered", "cancelled"],
            default: "received",
        },
        payment_status: {
            type: String,
            enum: ["pending", "failed", "success"],
            default: "pending",
        },
        paymentId: { type: String },
        address: {
            addressLine1: { type: String, required: true },
            addressLine2: { type: String },
            city: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, required: true },
            pincode: { type: String, required: true },
        },
    },
    { timestamps: true }
);

export default mongoose.model<OrderType>("Order", orderSchema);
