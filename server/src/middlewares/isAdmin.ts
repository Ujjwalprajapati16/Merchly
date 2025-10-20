import type { Request, Response, NextFunction } from "express";
import { Unauthorized } from "./ErrorHandler.ts";


export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user; 

  if (!user) {
    throw new Unauthorized("Unauthorized: Please login first.");
  }

  if (user.role !== "admin") {
    throw new Unauthorized("Access denied: Admins only.");
  }

  next(); 
};
