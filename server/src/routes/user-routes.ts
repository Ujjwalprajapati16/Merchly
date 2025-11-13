import express from "express";
import { authenticate } from "../middlewares/AuthMiddleware.ts";
import { userProfile } from "../controllers/user-controller.ts";

const UserRouter = express.Router();

UserRouter.get("/profile", authenticate, userProfile);

export default UserRouter;