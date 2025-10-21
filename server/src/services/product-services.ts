import { APIError } from "../middlewares/ErrorHandler.ts";
import { createProduct, getAllProducts, getCategories, getProductBySlug, findProductsByCategory } from "../repositories/product-repo.ts";
import type { Product, ProductToAdd, Variant } from "../types/Product-types.ts";

export const addProductService = async (name: string, price: number, description: string, category: string, variants: Variant[]) => {
    const slug = name.toLowerCase().replace(/ /g, "-");

    const product: ProductToAdd = {
        name,
        price,
        slug,
        description,
        category,
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

export const getCategoriesService = async () => {
    return await getCategories();
};

export const getProductsByCategoryService = async (
    category: string,
    limit: number,
    page: number
): Promise<Product[]> => {
    const skip = (page - 1) * limit;

    const products = await findProductsByCategory(category, limit, skip);

    return products;
};