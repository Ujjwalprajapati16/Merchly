import express from "express";
import { authenticate } from "../middlewares/AuthMiddleware.ts";
import { changePassword, getUsers, userProfile, updateProfile, deleteUser } from "../controllers/user-controller.ts";
import { isAdmin } from "../middlewares/isAdmin.ts";

const UserRouter = express.Router();

UserRouter.get("/profile", authenticate, userProfile);
UserRouter.patch("/change-password", authenticate, changePassword);
UserRouter.patch("/update", authenticate, updateProfile);

UserRouter.delete("/:id", authenticate, isAdmin, deleteUser);
UserRouter.get("/", authenticate, isAdmin, getUsers);

export default UserRouter;