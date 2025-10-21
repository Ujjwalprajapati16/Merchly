import cloudinary from "../config/cloudinary.ts";
import { APIError } from "../middlewares/ErrorHandler.ts";
import { createProduct, getAllProducts, getCategories, getProductBySlug, findProductsByCategory, updateProductById, findProductById, deleteProductById } from "../repositories/product-repo.ts";
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

export const updateProductService = async (
    productId: string,
    data: {
        name?: string;
        price?: number;
        description?: string;
        category?: string;
        slug?: string;
        variants?: Variant[];
    }
) => {
    if (data.name) {
        data.slug = data.name.toLowerCase().replace(/\s+/g, "-");
    }

    const updatedProduct = await updateProductById(productId, data);

    if (!updatedProduct) throw new Error("Product not found or failed to update");

    return updatedProduct;
};

export const deleteProductService = async (productId: string) => {
  const product = await findProductById(productId);
  if (!product) throw new Error("Product not found");

  for (const variant of product.variants) {
    if (variant.image) {
      const parts = variant.image.split("/");
      const filename = parts[parts.length - 1] ?? "";
      const publicId = filename ? filename.split(".")[0] : "";

      try {
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      } catch (err) {
        console.error(`Failed to delete image ${variant.image} from Cloudinary`, err);
      }
    }
  }

  const deletedProduct = await deleteProductById(productId);

  return deletedProduct;
};