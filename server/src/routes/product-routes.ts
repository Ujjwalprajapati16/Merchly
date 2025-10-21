import express from "express";
import { addProduct, deleteProduct, getCategories, getProduct, getProducts, getProductsByCategory, updateProduct } from "../controllers/product-controller.ts";
import { isAdmin } from "../middlewares/isAdmin.ts";
import { authenticate } from "../middlewares/AuthMiddleware.ts";
import { upload } from "../utils/multer.ts";

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
