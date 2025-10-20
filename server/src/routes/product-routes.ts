import express from "express";
import { addProduct, getProducts } from "../controllers/product-controller.ts";
import { isAdmin } from "../middlewares/isAdmin.ts";
import { authenticate } from "../middlewares/AuthMiddleware.ts";

const productRouter = express.Router();

productRouter.post("/add", authenticate, isAdmin , addProduct);
productRouter.get("/", getProducts);

export default productRouter;