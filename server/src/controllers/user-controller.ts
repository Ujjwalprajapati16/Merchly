import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../types/AuthRequest.ts";
import { Unauthorized } from "../middlewares/ErrorHandler.ts";
import { getProfileService } from "../services/user-services.ts";

export const userProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const id = req.user?.id;

    if (!id) {
        throw new Unauthorized("Unauthorized: Please login first.");
    }

    try {
        const profile = await getProfileService(id);
        res.status(200).json({ message: "User profile fetched successfully", profile});
    } catch (error) {
        next(error);
    }
}