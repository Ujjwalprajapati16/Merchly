import express from "express";
import { authenticate } from "../middlewares/AuthMiddleware.ts";
import { changePassword, userProfile } from "../controllers/user-controller.ts";

const UserRouter = express.Router();

UserRouter.get("/profile", authenticate, userProfile);
UserRouter.patch("/change-password", authenticate, changePassword);

export default UserRouter;