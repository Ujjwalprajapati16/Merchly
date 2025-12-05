import type { NextFunction, Request, Response } from "express";
import type { AuthRequest } from "../types/AuthRequest.js";
import { BadRequest } from "../middlewares/ErrorHandler.js";
import { addProductService, deleteProductService, getCategoriesService, getProductsByCategoryService, getProductService, getProductsForHomePageService, getProductsService, updateProductService } from "../services/product-services.js";
import type { Variant } from "../types/Product-types.js";

export const addProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, price, description, variants, category } = req.body;

    if (!name || !price || !description || !variants || !category) {
      throw new BadRequest("Missing required fields");
    }

    let parsedVariants: Variant[];
    try {
      parsedVariants = typeof variants === "string" ? JSON.parse(variants) : variants;
    } catch (err) {
      throw new BadRequest("Invalid variants JSON format");
    }

    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      throw new BadRequest("At least one variant image is required");
    }

    const variantsWithImages = parsedVariants.map((variant, index) => ({
      ...variant,
      image: files[index]?.path || "",
    }));

    const product = await addProductService(name, price, description, category, variantsWithImages);

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string) || 6;
    const page = parseInt(req.query.page as string) || 1;

    const products = await getProductsService(limit, page);

    res.status(200).json({
      message: "Products fetched successfully",
      page,
      limit,
      products,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductsForHomePage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string) || 6;
    const page = parseInt(req.query.page as string) || 1;
    const search = req.query.search as string | undefined; // Get search term

    // Pass search to service
    const products = await getProductsForHomePageService(limit, page, search);

    res.status(200).json({
      message: "Products fetched successfully",
      page,
      limit,
      products,
    });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { slug } = req.params;
  const { userId } = req.query;

  if (!slug) {
    throw new BadRequest("Slug required to fetch product");
  }

  try {
    let result;
    
    if(userId){
      result = await getProductService(slug, userId as string);
    } else {
      result = await getProductService(slug);
    }

    if (!result) {
      throw new BadRequest("Product not found");
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product: result.product,
      isInWishlist: result.isInWishlist,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await getCategoriesService();

    res.status(200).json({
      message: "Categories fetched successfully",
      count: categories.length,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = req.params.category;
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    const products = await getProductsByCategoryService(category, limit, page);

    res.status(200).json({
      message: `Products in category "${category}" fetched successfully`,
      category,
      page,
      limit,
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const { name, price, description, category, variants, existingImages } = req.body;

    // Parse variants JSON if sent as string (multipart/form-data)
    let parsedVariants;
    if (variants) {
      parsedVariants = typeof variants === "string" ? JSON.parse(variants) : variants;
    }

    const files = req.files as Express.Multer.File[] | undefined;

    // Merge uploaded files and existing images
    const variantsWithImages = parsedVariants?.map((v: any, index: number) => {
      // Use uploaded file first, else fallback to existing image URL
      const fileImage = files?.[index]?.path;
      const existingImage = existingImages ? (Array.isArray(existingImages) ? existingImages[index] : existingImages) : null;
      return {
        ...v,
        image: fileImage || existingImage || null,
      };
    });

    const updatedProduct = await updateProductService(productId, {
      name,
      price,
      description,
      category,
      variants: variantsWithImages,
    });

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const deletedProduct = await deleteProductService(productId);

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    next(error);
  }
};