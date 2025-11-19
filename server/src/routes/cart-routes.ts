import express from "express";
import { authenticate } from "../middlewares/AuthMiddleware.js";
import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  checkoutCart,
  saveForLater,
  updateQuantity,
  moveToCart,
} from "../controllers/cart-controller.js";

const cartRouter = express.Router();

// Fetch current cart
cartRouter.get("/", authenticate, getCart);

// Add new item
cartRouter.post("/items", authenticate, addToCart);

// Update quantity of an item
cartRouter.put("/items/:itemId", authenticate, updateQuantity);

// Remove a specific item
cartRouter.delete("/items/:itemId", authenticate, removeFromCart);

// Clear the entire cart
cartRouter.delete("/", authenticate, clearCart);

// Checkout
cartRouter.post("/checkout", authenticate, checkoutCart);

// Save item for later 
cartRouter.post("/items/:itemId/save", authenticate, saveForLater);
cartRouter.post("/items/:itemId/save/move", authenticate, moveToCart);

export default cartRouter;
