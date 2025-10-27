import mongoose from "mongoose";
import type { Cart, CartItem } from "../types/Cart-types.ts";

const variantSchema = new mongoose.Schema(
    {
        color: { type: String, required: true },
        size: { type: String, required: true },
        image: { type: String, required: true },
    },
    { _id: false }
);

// Individual cart item schema
const cartItemSchema = new mongoose.Schema<CartItem>(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        variant: {
            type: variantSchema,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1,
        },
        subtotal: {
            type: Number,
            required: true,
            default: 0,
        }
    },
    { _id: false }
);

// Cart schema
const cartSchema = new mongoose.Schema<Cart>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        items: {
            type: [cartItemSchema],
            default: [],
        },
        total: {
            type: Number,
            required: true,
            default: 0,
        }
    },
    { timestamps: true }
);

// Export model
export default mongoose.model<Cart>("Cart", cartSchema);
