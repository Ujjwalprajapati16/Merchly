import express from "express";
import { addProduct, deleteProduct, getCategories, getProduct, getProducts, getProductsByCategory, updateProduct } from "../controllers/product-controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { authenticate } from "../middlewares/AuthMiddleware.js";
import { upload } from "../utils/multer.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  authenticate,
  isAdmin,
  upload.array("images", 10), 
  addProduct
);

productRouter.put(
  "/update/:id",
  authenticate,
  isAdmin,
  upload.array("images", 10), 
  updateProduct
);

productRouter.delete("/delete/:id", authenticate, isAdmin, deleteProduct);

productRouter.get("/categories/:category", getProductsByCategory);
productRouter.get("/categories", getCategories);
productRouter.get("/:slug", getProduct);
productRouter.get("/", getProducts);

export default productRouter;
