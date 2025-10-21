import type { NextFunction, Request, Response } from "express";
import type { AuthRequest } from "../types/AuthRequest.ts";
import { BadRequest } from "../middlewares/ErrorHandler.ts";
import { addProductService, getProductService, getProductsService } from "../services/product-services.ts";
import type { Variant } from "../types/Product-types.ts";

export const addProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, price, description, variants } = req.body;

    if (!name || !price || !description || !variants) {
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

    const product = await addProductService(name, price, description, variantsWithImages);

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

export const getProduct = async (req: Request, res: Response, next: NextFunction) => { 
  const { slug } = req.params;

  if(!slug) {
    throw new BadRequest("Slug required to fetch product");
  }

  try {
    const product = await getProductService(slug);
    res.status(200).json({ message: "Product fetched successfully", product });
  } catch (error) {
    next(error);
  }
}