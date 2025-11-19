import express from "express";
import { authenticate } from "../middlewares/AuthMiddleware.js";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist
} from "../controllers/wishlist-controller.js";

const WishListRouter = express.Router();

WishListRouter.get("/", authenticate, getWishlist);
WishListRouter.post("/add", authenticate, addToWishlist);
WishListRouter.delete("/remove/:itemId", authenticate, removeFromWishlist);

export default WishListRouter;
