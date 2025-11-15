import express from "express";
import { authenticate } from "../middlewares/AuthMiddleware";
import { changePassword, getUsers, userProfile, updateProfile, deleteUser } from "../controllers/user-controller";
import { isAdmin } from "../middlewares/isAdmin";

const UserRouter = express.Router();

UserRouter.get("/profile", authenticate, userProfile);
UserRouter.patch("/change-password", authenticate, changePassword);
UserRouter.patch("/update", authenticate, updateProfile);

UserRouter.delete("/:id", authenticate, isAdmin, deleteUser);
UserRouter.get("/", authenticate, isAdmin, getUsers);

export default UserRouter;