import express from "express";
import { addProduct, getProduct, getProducts } from "../controllers/product-controller.ts";
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

productRouter.get("/", getProducts);
productRouter.get("/:slug", getProduct);

export default productRouter;
