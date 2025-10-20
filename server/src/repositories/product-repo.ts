import productModel from "../models/product-model.ts";
import type { ProductToAdd } from "../types/Product-types.ts";

export const createProduct = async (product: ProductToAdd) => {
    return await productModel.create(product);
}