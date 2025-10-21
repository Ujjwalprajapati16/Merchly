import productModel from "../models/product-model.ts";
import type { ProductToAdd } from "../types/Product-types.ts";

export const createProduct = async (product: ProductToAdd) => {
    return await productModel.create(product);
}

export const getAllProducts = async (limit: number, skip: number) => {
    const products = await productModel
        .find({ status: "available" })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

    return products;
};