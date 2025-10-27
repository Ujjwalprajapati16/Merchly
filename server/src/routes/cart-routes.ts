import express from "express";
import { authenticate } from "../middlewares/AuthMiddleware.ts";
import { addToCart, checkoutCart, clearCart, getCart, removeFromCart, saveForLater } from "../controllers/cart-controller.ts";

const cartRouter = express.Router();

cartRouter.post("/checkout", authenticate, checkoutCart);
cartRouter.post("/save", authenticate, saveForLater);
cartRouter.delete("/remove", authenticate, removeFromCart);
cartRouter.get("/", authenticate, getCart);
cartRouter.post("/", authenticate, addToCart);
cartRouter.delete("/", authenticate, clearCart);

export default cartRouter;