import type { NextFunction, Request, Response } from "express";
import type { AuthRequest } from "../types/AuthRequest.ts";
import { BadRequest } from "../middlewares/ErrorHandler.ts";
import { addProductService } from "../services/product-services.ts";

export const addProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { name, price, description, variants } = req.body;
    // todo: add image

    if (!name || !price || !description || !variants) {
        throw new BadRequest("Missing required fields");
    }

    try {
        const product = await addProductService(name, price, description, variants);
        res.status(200).json({ message: "Product added successfully", product });
    } catch (error) {
        next(error);
    }

}

export const getProducts = async (req: Request, res: Response, next: NextFunction) => { }