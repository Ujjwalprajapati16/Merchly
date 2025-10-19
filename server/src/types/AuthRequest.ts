import type { Request } from "express";
import type { User } from "./User-types.ts";

export interface AuthRequest extends Request {
  user?: User;
}
