import productModel from "../models/product-model.js";
import type { Product, ProductToAdd } from "../types/Product-types.js";

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

export const getProductBySlug = async (slug: string) => {
    return await productModel.findOne({ slug });
}

export const getCategories = async () => {
    const categories = await productModel.aggregate([
        { $match: { status: "available" } },
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $project: { _id: 0, category: "$_id", count: 1 } },
    ]);
    return categories;
}

export const findProductsByCategory = async (
    category: string,
    limit: number,
    skip: number
): Promise<Product[]> => {
    return await productModel
        .find({ category, status: "available" })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
};

export const updateProductById = async (
  productId: string,
  updateData: Partial<ProductToAdd>
) => {
  return await productModel.findByIdAndUpdate(productId, updateData, { new: true, runValidators: true }).lean();
};

export const findProductById = async (productId: string) => {
  return await productModel.findById(productId).lean();
};

export const deleteProductById = async (productId: string) => {
  return await productModel.findByIdAndDelete(productId);
};
