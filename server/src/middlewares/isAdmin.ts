import type { Response, NextFunction } from "express";
import { Unauthorized } from "./ErrorHandler.ts";
import type { AuthRequest } from "../types/AuthRequest.ts";


export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user) {
    throw new Unauthorized("Unauthorized: Please login first.");
  }

  if (user.role !== "admin") {
    throw new Unauthorized("Access denied: Admins only.");
  }

  next(); 
};
