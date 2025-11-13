import express from "express";
import { authenticate } from "../middlewares/AuthMiddleware.ts";
import { changePassword, getUsers, userProfile } from "../controllers/user-controller.ts";
import { isAdmin } from "../middlewares/isAdmin.ts";

const UserRouter = express.Router();

UserRouter.get("/profile", authenticate, userProfile);
UserRouter.patch("/change-password", authenticate, changePassword);

UserRouter.get("/", authenticate, isAdmin, getUsers);

export default UserRouter;