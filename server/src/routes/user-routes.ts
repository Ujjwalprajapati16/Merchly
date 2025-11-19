import express from "express";
import { authenticate } from "../middlewares/AuthMiddleware.js";
import { changePassword, getUsers, userProfile, updateProfile, deleteUser } from "../controllers/user-controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const UserRouter = express.Router();

UserRouter.get("/profile", authenticate, userProfile);
UserRouter.patch("/change-password", authenticate, changePassword);
UserRouter.patch("/update", authenticate, updateProfile);

UserRouter.delete("/:id", authenticate, isAdmin, deleteUser);
UserRouter.get("/", authenticate, isAdmin, getUsers);

export default UserRouter;