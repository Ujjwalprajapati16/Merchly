import mongoose from "mongoose";
import type { Product } from "../types/Product-types";

const variantSchema = new mongoose.Schema(
  {
    color: { type: String, required: true },
    size: { type: String, required: true },
    image: { type: String, required: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema<Product>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    variants: [variantSchema],
  },
  { timestamps: true }
);

export default mongoose.model<Product>("Product", productSchema);
