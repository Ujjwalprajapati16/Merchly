import express from "express";
import { addProduct, getCategories, getProduct, getProducts, getProductsByCategory } from "../controllers/product-controller.ts";
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

productRouter.get("/categories/:category", getProductsByCategory);
productRouter.get("/categories", getCategories);
productRouter.get("/:slug", getProduct);
productRouter.get("/", getProducts);

export default productRouter;
