import jwt from "jsonwebtoken";
import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../types/AuthRequest.ts";
import { Unauthorized } from "./ErrorHandler.ts";
import config from "../config/config.ts";

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new Unauthorized("No token provided"));
  }

  const token : string | undefined = authHeader.split(" ")[1];

  if (!token) {
    return next(new Unauthorized("No token provided"));
  }

  try {
    const decoded = jwt.verify(token, config.jwt_secret) as any;

    req.user = decoded.user || decoded;

    next();
  } catch (error) {
    next(new Unauthorized("Invalid or expired token"));
  }
};
