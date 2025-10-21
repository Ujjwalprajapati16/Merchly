import { APIError } from "../middlewares/ErrorHandler.ts";
import { createProduct, getAllProducts, getProductBySlug } from "../repositories/product-repo.ts";
import type { ProductToAdd, Variant } from "../types/Product-types.ts";

export const addProductService = async (name: string, price: number, description: string, variants: Variant[]) => {
    const slug = name.toLowerCase().replace(/ /g, "-");

    const product: ProductToAdd = {
        name,
        price,
        slug,
        description,
        variants
    };

    const newProduct = await createProduct(product);

    if (!newProduct) throw new APIError(500, "Failed to add product");

    return newProduct;
}

export const getProductsService = async (limit: number, page: number) => {
    const skip = (page - 1) * limit;
    return await getAllProducts(limit, skip);
};

export const getProductService = async (slug: string) => {
    return await getProductBySlug(slug);
}