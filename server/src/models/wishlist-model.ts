import mongoose from "mongoose";
import type { WishlistType } from "../types/Wishlist-types";

const wishlistItemSchema = new mongoose.Schema(
    {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        addedAt: { type: Date, default: Date.now },
    },
    { _id: true }
);

const wishlistSchema = new mongoose.Schema<WishlistType>(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
        items: [wishlistItemSchema],
    },
    { timestamps: true }
);

export default mongoose.model<WishlistType>("Wishlist", wishlistSchema);
