import type { NextFunction, Request, Response } from "express";
import type { AuthRequest } from "../types/AuthRequest.ts";

export const addProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
    // const {name, price, description, variants } = req.body;
    const user = req.user;

    res.status(200).json({message: "Product added successfully", user});
}

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {}